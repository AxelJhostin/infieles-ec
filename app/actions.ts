"use server"

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function crearInfiel(formData: FormData) {
  const nombre = formData.get("nombre") as string;
  const ciudad = formData.get("ciudad") as string;
  const descripcion = formData.get("descripcion") as string;
  
  // Datos opcionales: Si vienen vacíos, ponemos null o valores por defecto
  const edadRaw = formData.get("edad");
  const edad = edadRaw ? parseInt(edadRaw as string) : null;
  
  const ocupacion = (formData.get("ocupacion") as string) || "Desconocido";
  const redSocial = (formData.get("redSocial") as string) || null;

  // Calcular iniciales automáticamente (ej: Juan Perez -> JP)
  const iniciales = nombre
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  // Guardar en la base de datos (Railway)
  await prisma.infiel.create({
    data: {
      nombre,
      ciudad,
      descripcion,
      edad,
      ocupacion,
      redSocial,
      iniciales,
    },
  });

  // Recargar la página automáticamente para ver el nuevo registro
  revalidatePath("/");
}