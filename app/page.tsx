import { Sparkles } from "lucide-react";
import { PrismaClient } from "@prisma/client";
import { HomeClient } from "@/components/HomeClient";
import { ReportarModal } from "@/components/ReportarModal";
import { Footer } from "@/components/Footer";

// Inicializamos la conexión a la Base de Datos
const prisma = new PrismaClient();

// IMPORTANTE: Esta línea obliga a Next.js a NO guardar la página en memoria (caché).
// Así, cada vez que entres, buscará los datos nuevos en Railway.
export const dynamic = 'force-dynamic';

export default async function Home() {
  
  // 1. OBTENER DATOS DE RAILWAY
  // "findMany" trae todos los registros.
  // "orderBy" los ordena para que el más reciente salga primero.
  const listaInfieles = await prisma.infiel.findMany({
    orderBy: { creadoEn: 'desc' }
  });

  return (
    <>
      <main className="min-h-screen bg-rose-50 p-6 md:p-12 font-sans selection:bg-pink-200 pb-20">
        
        {/* ENCABEZADO */}
        <div className="max-w-3xl mx-auto text-center mb-10 space-y-6">
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-1.5 rounded-full text-sm font-bold animate-pulse border border-pink-200 shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span>Exposed Ecuador Edition</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tighter drop-shadow-sm">
            Registro de <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600">Infieles</span>
          </h1>
          
          <p className="text-gray-500 text-lg md:text-xl font-medium max-w-lg mx-auto">
            La base de datos del pueblo. Sube tu reporte anónimo o busca la verdad. 💅
          </p>

          {/* BOTÓN PARA SUBIR NUEVO CASO (Ventana Emergente) */}
          <div className="flex justify-center pt-4">
            <ReportarModal />
          </div>
        </div>

        {/* CARGA DEL COMPONENTE CLIENTE 
            Aquí le pasamos la lista real que trajimos de Railway (listaInfieles)
            al componente interactivo que acabas de arreglar.
        */}
        <HomeClient listaInicial={listaInfieles} />

      </main>
      
      {/* PIE DE PÁGINA */}
      <Footer />
    </>
  );
}