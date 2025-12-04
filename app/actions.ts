"use server"

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// Definimos los 3 tipos de categorías que vamos a manejar
type TipoRegistro = "infiel" | "migajero" | "cachudo";

export async function crearRegistro(formData: FormData, tipo: TipoRegistro) {
  const nombre = formData.get("nombre") as string;
  const ciudad = formData.get("ciudad") as string;
  const descripcion = formData.get("descripcion") as string;
  
  // Manejo de datos opcionales
  const edadRaw = formData.get("edad");
  const edad = edadRaw ? parseInt(edadRaw as string) : null;
  
  const ocupacion = (formData.get("ocupacion") as string) || "Desconocido";
  const redSocial = (formData.get("redSocial") as string) || null;

  // Generar iniciales
  const iniciales = nombre
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const datos = {
    nombre,
    ciudad,
    descripcion,
    edad,
    ocupacion,
    redSocial,
    iniciales,
  };

  // DECIDIMOS EN QUÉ TABLA GUARDAR SEGÚN EL TIPO
  if (tipo === "infiel") {
    await prisma.infiel.create({ data: datos });
  } else if (tipo === "migajero") {
    await prisma.migajero.create({ data: datos });
  } else if (tipo === "cachudo") {
    await prisma.cachudo.create({ data: datos });
  }

  // Recargamos todas las rutas posibles para ver los cambios
  revalidatePath("/");
  revalidatePath("/migajeros");
  revalidatePath("/cachudos");
}