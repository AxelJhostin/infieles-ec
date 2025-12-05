import { Sparkles, Shield, TrendingUp, Users } from "lucide-react";
import { PrismaClient } from "@prisma/client";
import { HomeClient } from "@/components/HomeClient";
import { ReportarModal } from "@/components/ReportarModal";
import { Footer } from "@/components/Footer";

const prisma = new PrismaClient();

// CAMBIO CLAVE: En lugar de 'force-dynamic', usamos revalidate.
// Esto guarda la página en memoria por 60 segundos.
// Si entran 1000 personas en ese minuto, la base de datos solo trabaja 1 vez.
export const revalidate = 60; 

export default async function Home() {
  
  // Estas consultas ahora se hacen solo 1 vez por minuto
  const totalRegistros = await prisma.infiel.count();
  
  const nuevosSemana = await prisma.infiel.count({
    where: {
        creadoEn: { gte: new Date(new Date().setDate(new Date().getDate() - 7)) }
    }
  });

  const ciudadesGroup = await prisma.infiel.groupBy({ by: ['ciudad'] });
  const totalCiudades = ciudadesGroup.length;

  const stats = [
    { icon: Users, label: "Reportes Totales", value: totalRegistros.toString(), color: "text-pink-500" },
    { icon: TrendingUp, label: "Esta Semana", value: `+${nuevosSemana}`, color: "text-rose-500" },
    { icon: Shield, label: "Ciudades", value: totalCiudades.toString(), color: "text-purple-500" }
  ];

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 font-sans selection:bg-pink-200 pb-20 overflow-hidden relative">
        {/* ... (Todo el resto de tu diseño se mantiene igual) ... */}
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative p-6 md:p-12 z-10">
          <div className="max-w-4xl mx-auto text-center mb-10 space-y-8">
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 px-5 py-2 rounded-full text-sm font-bold border border-pink-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span>Exposed Ecuador Edition</span>
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-gray-900 tracking-tighter drop-shadow-sm leading-tight">
                Registro de <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 animate-gradient">Infieles</span>
              </h1>
              <p className="text-gray-600 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                La base de datos del pueblo. Sube tu reporte anónimo o busca la verdad. 💅
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-pink-100 shadow-md hover:shadow-lg transition-all">
                  <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-center pt-6">
              <ReportarModal tipo="infiel" />
            </div>
          </div>

          <HomeClient tipo="infiel" totalInicial={totalRegistros} />
        </div>
      </main>
      <Footer />
    </>
  );
}