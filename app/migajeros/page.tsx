import { Sparkles, Cookie, TrendingUp, Users } from "lucide-react";
import { PrismaClient } from "@prisma/client";
import { HomeClient } from "@/components/HomeClient";
import { ReportarModal } from "@/components/ReportarModal";
import { Footer } from "@/components/Footer";

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function MigajerosPage() {
  const lista = await prisma.migajero.findMany({ 
    take: 200, // <--- Solo los últimos 200
    orderBy: { creadoEn: 'desc' } 
  });

  // CÁLCULO REAL: Filtramos los que se crearon hace menos de 7 días
  const nuevosEstaSemana = lista.filter(p => {
    const hace7dias = new Date();
    hace7dias.setDate(hace7dias.getDate() - 7);
    return new Date(p.creadoEn) > hace7dias;
  }).length;

  const stats = [
    { icon: Users, label: "Migajeros", value: lista.length.toString(), color: "text-amber-500" },
    // AHORA SÍ: Usamos el cálculo real
    { icon: TrendingUp, label: "Esta Semana", value: `+${nuevosEstaSemana}`, color: "text-amber-600" },
    { icon: Cookie, label: "Ciudades", value: new Set(lista.map(p => p.ciudad)).size.toString(), color: "text-amber-500" }
  ];

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 font-sans pb-20 overflow-hidden relative pt-20">
        <div className="relative p-6 md:p-12 z-10">
          <div className="max-w-4xl mx-auto text-center mb-16 space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tighter">
                Registro de <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Migajeros</span> 🍪
              </h1>
              <p className="text-gray-600 text-lg">Aceptando sobras de amor desde tiempos inmemorables.</p>
            </div>
            
             <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-amber-100 shadow-md hover:shadow-lg transition-all">
                  <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-center pt-6">
              <ReportarModal tipo="migajero" />
            </div>
          </div>
          
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <HomeClient listaInicial={lista as any} />
        </div>
      </main>
      <Footer />
    </>
  );
}