"use client"

import { useState } from "react";
import { Search, Fingerprint, Filter, LayoutGrid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InfielCard } from "@/components/InfielCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// --- DEFINICIÓN DE TIPOS (Para eliminar el error de "any") ---
// Esto define la forma exacta de los datos que vienen de Railway
interface Infiel {
  id: number;
  nombre: string;
  edad: number | null;
  ocupacion: string | null;
  ciudad: string;
  descripcion: string;
  redSocial: string | null;
  iniciales: string | null;
  creadoEn: string | Date; // Puede ser texto o fecha dependiendo de cómo viaje el dato
}

export function HomeClient({ listaInicial }: { listaInicial: Infiel[] }) {
  // --- ESTADOS ---
  const [busqueda, setBusqueda] = useState("");
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("Todas");
  const [vista, setVista] = useState<"grid" | "list">("grid");

  // --- LÓGICA ---
  // Obtener ciudades únicas dinámicamente
  const ciudadesUnicas = Array.from(new Set(listaInicial.map((p) => p.ciudad)));

  // Filtrar la lista según lo que escriba el usuario
  const listaFiltrada = listaInicial.filter((persona) => {
    // Buscamos en nombre u ocupación (verificando que ocupación no sea null)
    const coincideTexto = 
      persona.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      (persona.ocupacion && persona.ocupacion.toLowerCase().includes(busqueda.toLowerCase()));
    
    // Filtramos por ciudad
    const coincideCiudad = ciudadSeleccionada === "Todas" || persona.ciudad === ciudadSeleccionada;

    return coincideTexto && coincideCiudad;
  });

  return (
    <>
      {/* BARRA DE HERRAMIENTAS (Buscador, Filtros, Botones de Vista) */}
      <div className="max-w-4xl mx-auto mb-12 space-y-4 bg-white/60 p-4 rounded-2xl border border-pink-100 backdrop-blur-sm shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            
            {/* INPUT DE BÚSQUEDA */}
            <div className="relative flex-grow w-full">
              <Search className="absolute left-3 top-3 h-5 w-5 text-pink-400" />
              <Input 
                placeholder="Buscar por nombre..." 
                className="pl-10 h-12 text-md border-pink-200 focus-visible:ring-pink-400 bg-white"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              {/* SELECTOR DE CIUDAD */}
              <div className="w-full md:w-[180px]">
                <Select onValueChange={setCiudadSeleccionada} defaultValue="Todas">
                  <SelectTrigger className="h-12 border-pink-200 text-gray-600 bg-white focus:ring-pink-400">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-pink-500" />
                      <SelectValue placeholder="Ciudad" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todas">🌍 Todas</SelectItem>
                    {ciudadesUnicas.map(ciudad => (
                      <SelectItem key={ciudad} value={ciudad}>📍 {ciudad}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* BOTONES PARA CAMBIAR VISTA (GRID / LISTA) */}
              <div className="flex items-center bg-white border border-pink-200 rounded-lg p-1 gap-1 flex-shrink-0 h-12">
                <Button 
                    variant={vista === "grid" ? "secondary" : "ghost"} 
                    size="icon" 
                    onClick={() => setVista("grid")} 
                    className={vista === "grid" ? "bg-pink-100 text-pink-600" : "text-gray-400"} 
                    title="Vista Cuadrícula"
                >
                    <LayoutGrid className="w-5 h-5" />
                </Button>
                <Button 
                    variant={vista === "list" ? "secondary" : "ghost"} 
                    size="icon" 
                    onClick={() => setVista("list")} 
                    className={vista === "list" ? "bg-pink-100 text-pink-600" : "text-gray-400"} 
                    title="Vista Lista"
                >
                    <List className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* CONTADOR DE RESULTADOS */}
          <div className="flex items-center justify-between px-2 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Fingerprint className="w-4 h-4 text-pink-500"/>
              Resultados: <span className="font-bold text-pink-600">{listaFiltrada.length}</span>
            </div>
            {ciudadSeleccionada !== "Todas" && (
               <span className="text-xs text-pink-400 bg-pink-50 px-2 py-1 rounded-md">
                 Filtrando por: {ciudadSeleccionada}
               </span>
            )}
          </div>
      </div>

      {/* RESULTADOS (RENDERIZADO DE TARJETAS) */}
      {listaFiltrada.length > 0 ? (
          <div className={
              vista === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto" 
              : "flex flex-col gap-4 max-w-3xl mx-auto"
          }>
            {listaFiltrada.map((persona) => (
              // @ts-expect-error: Ignoramos incompatibilidad menor de tipos null/undefined para asegurar el renderizado
              <InfielCard key={persona.id} datos={persona} vista={vista} />
            ))}
          </div>
        ) : (
          // MENSAJE CUANDO NO HAY RESULTADOS
          <div className="text-center py-20 opacity-60 space-y-3">
            <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-pink-400" />
            </div>
            <p className="text-2xl font-bold text-gray-600">Nadie por aquí... todavía.</p>
            <p className="text-gray-400">¡Sé el primero en reportar un caso!</p>
            <button 
                onClick={() => {setBusqueda(""); setCiudadSeleccionada("Todas")}} 
                className="text-pink-500 underline hover:text-pink-700 text-sm font-medium"
            >
                Limpiar filtros
            </button>
          </div>
      )}
    </>
  );
}