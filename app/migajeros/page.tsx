import { Sparkles, Cookie, TrendingUp, Users } from "lucide-react";
import { PrismaClient } from "@prisma/client";
import { HomeClient } from "@/components/HomeClient";
import { ReportarModal } from "@/components/ReportarModal";
import { Footer } from "@/components/Footer";

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function MigajerosPage() {
  
  const totalRegistros = await prisma.migajero.count();
  
  const nuevosSemana = await prisma.migajero.count({
    where: { creadoEn: { gte: new Date(new Date().setDate(new Date().getDate() - 7)) } }
  });

  const ciudadesGroup = await prisma.migajero.groupBy({ by: ['ciudad'] });
  const totalCiudades = ciudadesGroup.length;

  const stats = [
    { icon: Users, label: "Migajeros Totales", value: totalRegistros.toString(), color: "text-amber-500" },
    { icon: TrendingUp, label: "Esta Semana", value: `+${nuevosSemana}`, color: "text-amber-600" },
    { icon: Cookie, label: "Ciudades", value: totalCiudades.toString(), color: "text-amber-500" }
  ];

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 font-sans pb-20 overflow-hidden relative pt-20">
        <div className="relative p-6 md:p-12 z-10">
          <div className="max-w-4xl mx-auto text-center mb-10 space-y-8">
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
          
          <HomeClient tipo="migajero" totalInicial={totalRegistros} />
        </div>
      </main>
      <Footer />
    </>
  );
}