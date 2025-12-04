"use server"

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod"; // 1. Importamos la seguridad

const prisma = new PrismaClient();

// 2. Definimos las reglas estrictas (El "Bouncer" de la discoteca)
const EsquemaRegistro = z.object({
  nombre: z.string().min(2, "El nombre es muy corto").max(50, "El nombre es muy largo"),
  ciudad: z.string().min(2, "Ciudad inválida"),
  descripcion: z.string().min(10, "Cuenta el chisme completo (mínimo 10 letras)"),
  edad: z.coerce.number().min(18, "Debe ser mayor de edad").max(99, "Edad no válida").nullable().optional(),
  ocupacion: z.string().max(50).optional().or(z.literal("")),
  redSocial: z.string().url("Debe ser un enlace válido (https://...)").optional().or(z.literal("")),
});

type TipoRegistro = "infiel" | "migajero" | "cachudo" | "bandida" | "moza";

export async function crearRegistro(formData: FormData, tipo: TipoRegistro) {
  
  // 3. Extraemos los datos "crudos" del formulario
  const rawData = {
    nombre: formData.get("nombre"),
    ciudad: formData.get("ciudad"),
    descripcion: formData.get("descripcion"),
    edad: formData.get("edad"),
    ocupacion: formData.get("ocupacion"),
    redSocial: formData.get("redSocial"),
  };

  // 4. VALIDACIÓN: Zod revisa si cumplen las reglas
  const result = EsquemaRegistro.safeParse(rawData);

  // Si la validación falla, lanzamos error (o podríamos devolverlo al usuario)
  if (!result.success) {
    // Aquí podrías ver qué falló exactamente en la consola del servidor
    console.error("Error de validación:", result.error.flatten());
    throw new Error("Datos inválidos: Revisa que la URL sea correcta y los textos tengan sentido.");
  }

  // Si pasa, usamos los datos LIMPIOS y SEGUROS (result.data)
  const dataSegura = result.data;

  // Generar iniciales
  const iniciales = dataSegura.nombre
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  // Preparamos el objeto final para Prisma
  const datosParaGuardar = {
    nombre: dataSegura.nombre,
    ciudad: dataSegura.ciudad,
    descripcion: dataSegura.descripcion,
    edad: dataSegura.edad || null, // Si es undefined, ponemos null
    ocupacion: dataSegura.ocupacion || "Desconocido",
    redSocial: dataSegura.redSocial || null,
    iniciales,
  };

  // Guardamos en la tabla correcta
  if (tipo === "infiel") {
    await prisma.infiel.create({ data: datosParaGuardar });
  } else if (tipo === "migajero") {
    await prisma.migajero.create({ data: datosParaGuardar });
  } else if (tipo === "cachudo") {
    await prisma.cachudo.create({ data: datosParaGuardar });
  } else if (tipo === "bandida") {
    await prisma.bandidaRetirada.create({ data: datosParaGuardar });
  } else if (tipo === "moza") {
    await prisma.moza.create({ data: datosParaGuardar });
  }

  revalidatePath("/");
  revalidatePath("/migajeros");
  revalidatePath("/cachudos");
  revalidatePath("/bandidas");
  revalidatePath("/mozas");
}