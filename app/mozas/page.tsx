import { Gem, TrendingUp, Users, MapPin } from "lucide-react";
import { PrismaClient } from "@prisma/client";
import { HomeClient } from "@/components/HomeClient";
import { ReportarModal } from "@/components/ReportarModal";
import { Footer } from "@/components/Footer";

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function MozasPage() {
  // LEEMOS LA TABLA DE MOZAS
  const lista = await prisma.moza.findMany({ 
    take: 200, // <--- Solo las últimas 200
    orderBy: { creadoEn: 'desc' } 
  });

  // Cálculo real
  const nuevosEstaSemana = lista.filter(p => {
    const hace7dias = new Date();
    hace7dias.setDate(hace7dias.getDate() - 7);
    return new Date(p.creadoEn) > hace7dias;
  }).length;

  const stats = [
    { icon: Users, label: "Registradas", value: lista.length.toString(), color: "text-fuchsia-500" },
    { icon: TrendingUp, label: "Recientes", value: `+${nuevosEstaSemana}`, color: "text-fuchsia-600" },
    // PREVENCIÓN DE ERROR ANY
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { icon: MapPin, label: "Ciudades", value: new Set(lista.map((p: any) => p.ciudad)).size.toString(), color: "text-fuchsia-500" }
  ];

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-fuchsia-50 via-pink-50 to-rose-50 font-sans pb-20 overflow-hidden relative pt-20">
        <div className="relative p-6 md:p-12 z-10">
          <div className="max-w-4xl mx-auto text-center mb-16 space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tighter">
                Registro de <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-pink-500">Mozas</span> 💎
              </h1>
              <p className="text-gray-600 text-lg">Porque ser la oficial está sobrevalorado (según ellas).</p>
            </div>
            
             <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-fuchsia-100 shadow-md hover:shadow-lg transition-all">
                  <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-center pt-6">
              <ReportarModal tipo="moza" />
            </div>
          </div>
          
          {/* PREVENCIÓN DE ERROR ANY */}
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <HomeClient listaInicial={lista as any} />
        </div>
      </main>
      <Footer />
    </>
  );
}