"use server"

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const prisma = new PrismaClient();

// --- 1. DEFINICIÓN DE TIPOS (Para eliminar los 'any') ---

// Tipo para los filtros que vienen del cliente
interface FiltrosBusqueda {
  nombre?: string;
  ciudad?: string;
  ocupacion?: string;
  edadMin?: string;
  edadMax?: string;
}

// Tipo para la cláusula de búsqueda de Prisma
type WhereClause = {
  nombre?: { contains: string; mode: 'insensitive' };
  ciudad?: { contains: string; mode: 'insensitive' };
  ocupacion?: { contains: string; mode: 'insensitive' };
  edad?: { gte?: number; lte?: number };
}

// Tipo genérico para un modelo de Prisma (cubre Infiel, Migajero, etc.)
interface ModeloGenerico {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  findMany: (args: any) => Promise<any[]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  count: (args: any) => Promise<number>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create: (args: any) => Promise<any>;
}

// --- 2. VALIDACIÓN (ZOD) ---
const EsquemaRegistro = z.object({
  nombre: z.string().min(2, "El nombre es muy corto").max(50, "El nombre es muy largo"),
  ciudad: z.string().min(2, "Ciudad inválida"),
  descripcion: z.string().min(10, "Cuenta el chisme completo (mínimo 10 letras)"),
  edad: z.coerce.number().min(18, "Debe ser mayor de edad").max(99, "Edad no válida").nullable().optional(),
  ocupacion: z.string().max(50).optional().or(z.literal("")),
  redSocial: z.string().url("Debe ser un enlace válido (https://...)").optional().or(z.literal("")),
});

type TipoRegistro = "infiel" | "migajero" | "cachudo" | "bandida" | "moza";

// --- 3. FUNCIÓN PARA GUARDAR (CREAR) ---
export async function crearRegistro(formData: FormData, tipo: TipoRegistro) {
  const rawData = {
    nombre: formData.get("nombre"),
    ciudad: formData.get("ciudad"),
    descripcion: formData.get("descripcion"),
    edad: formData.get("edad"),
    ocupacion: formData.get("ocupacion"),
    redSocial: formData.get("redSocial"),
  };

  const result = EsquemaRegistro.safeParse(rawData);

  if (!result.success) {
    console.error("Error validación:", result.error.flatten());
    throw new Error("Datos inválidos. Revisa los campos.");
  }

  const dataSegura = result.data;

  const iniciales = dataSegura.nombre
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const datosParaGuardar = {
    nombre: dataSegura.nombre,
    ciudad: dataSegura.ciudad,
    descripcion: dataSegura.descripcion,
    edad: dataSegura.edad || null,
    ocupacion: dataSegura.ocupacion || "Desconocido",
    redSocial: dataSegura.redSocial || null,
    iniciales,
  };

  // Guardar según el tipo
  if (tipo === "infiel") await prisma.infiel.create({ data: datosParaGuardar });
  else if (tipo === "migajero") await prisma.migajero.create({ data: datosParaGuardar });
  else if (tipo === "cachudo") await prisma.cachudo.create({ data: datosParaGuardar });
  else if (tipo === "bandida") await prisma.bandidaRetirada.create({ data: datosParaGuardar });
  else if (tipo === "moza") await prisma.moza.create({ data: datosParaGuardar });

  revalidatePath("/");
  revalidatePath("/migajeros");
  revalidatePath("/cachudos");
  revalidatePath("/bandidas");
  revalidatePath("/mozas");
}

// --- 4. FUNCIÓN: BÚSQUEDA AVANZADA ---
export async function buscarRegistros(
  pagina: number, 
  filtros: FiltrosBusqueda,  // AQUÍ CORREGIMOS EL 'any'
  tipo: TipoRegistro
) {
  const ITEMS_POR_PAGINA = 80; 
  const skip = (pagina - 1) * ITEMS_POR_PAGINA;

  // Construir filtro dinámico tipado
  const where: WhereClause = {}; // AQUÍ CORREGIMOS EL 'any'

  if (filtros.nombre) {
    where.nombre = { contains: filtros.nombre, mode: 'insensitive' };
  }
  if (filtros.ciudad && filtros.ciudad !== "Todas") {
    where.ciudad = { contains: filtros.ciudad, mode: 'insensitive' };
  }
  if (filtros.ocupacion) {
    where.ocupacion = { contains: filtros.ocupacion, mode: 'insensitive' };
  }
  
  if (filtros.edadMin || filtros.edadMax) {
    where.edad = {};
    if (filtros.edadMin) where.edad.gte = parseInt(filtros.edadMin);
    if (filtros.edadMax) where.edad.lte = parseInt(filtros.edadMax);
  }

  // Seleccionar tabla con casting seguro
  let modelo: ModeloGenerico; // AQUÍ CORREGIMOS EL 'any'

  // Asignamos y hacemos un 'cast' (as unknown as ModeloGenerico) porque Prisma tiene tipos complejos
  // Esto es seguro porque sabemos que todos nuestros modelos tienen los mismos métodos.
  if (tipo === "infiel") modelo = prisma.infiel as unknown as ModeloGenerico;
  else if (tipo === "migajero") modelo = prisma.migajero as unknown as ModeloGenerico;
  else if (tipo === "cachudo") modelo = prisma.cachudo as unknown as ModeloGenerico;
  else if (tipo === "bandida") modelo = prisma.bandidaRetirada as unknown as ModeloGenerico;
  else modelo = prisma.moza as unknown as ModeloGenerico;

  // Ejecutar consulta optimizada
  const [datos, total] = await Promise.all([
    modelo.findMany({
      where,
      take: ITEMS_POR_PAGINA,
      skip: skip,
      orderBy: { creadoEn: 'desc' },
    }),
    modelo.count({ where })
  ]);

  const datosLimpio = JSON.parse(JSON.stringify(datos));

  return { datos: datosLimpio, total };
}