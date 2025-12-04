"use server"

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// Agregamos "moza" a los tipos
type TipoRegistro = "infiel" | "migajero" | "cachudo" | "bandida" | "moza";

export async function crearRegistro(formData: FormData, tipo: TipoRegistro) {
  const nombre = formData.get("nombre") as string;
  const ciudad = formData.get("ciudad") as string;
  const descripcion = formData.get("descripcion") as string;
  
  const edadRaw = formData.get("edad");
  const edad = edadRaw ? parseInt(edadRaw as string) : null;
  
  const ocupacion = (formData.get("ocupacion") as string) || "Desconocido";
  const redSocial = (formData.get("redSocial") as string) || null;

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

  // Lógica de guardado
  if (tipo === "infiel") {
    await prisma.infiel.create({ data: datos });
  } else if (tipo === "migajero") {
    await prisma.migajero.create({ data: datos });
  } else if (tipo === "cachudo") {
    await prisma.cachudo.create({ data: datos });
  } else if (tipo === "bandida") {
    await prisma.bandidaRetirada.create({ data: datos });
  } else if (tipo === "moza") {
    await prisma.moza.create({ data: datos });
  }

  // Recargamos todas las rutas
  revalidatePath("/");
  revalidatePath("/migajeros");
  revalidatePath("/cachudos");
  revalidatePath("/bandidas");
  revalidatePath("/mozas");
}