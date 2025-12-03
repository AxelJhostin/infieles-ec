"use client"

import { useState } from "react";
import { Sparkles, Search, Fingerprint, Filter, LayoutGrid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InfielCard } from "@/components/InfielCard";
import { Footer } from "@/components/Footer"; // Importamos tu nuevo Footer
import { listaInfieles } from "@/app/data/lista";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  // --- ESTADOS ---
  const [busqueda, setBusqueda] = useState("");
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("Todas");
  const [vista, setVista] = useState<"grid" | "list">("grid");

  // --- LÓGICA ---
  // 1. Obtener ciudades únicas para el filtro
  const ciudadesUnicas = Array.from(new Set(listaInfieles.map(p => p.ciudad)));

  // 2. Filtrar la lista según búsqueda y ciudad
  const listaFiltrada = listaInfieles.filter((persona) => {
    const coincideTexto = 
      persona.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      persona.ocupacion.toLowerCase().includes(busqueda.toLowerCase());
    
    const coincideCiudad = ciudadSeleccionada === "Todas" || persona.ciudad === ciudadSeleccionada;

    return coincideTexto && coincideCiudad;
  });

  return (
    <>
      {/* 1. CONTENIDO PRINCIPAL (Fondo Rosa) */}
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
            La base de datos más temida. Filtra, busca y descubre la verdad. 💅
          </p>
        </div>

        {/* BARRA DE HERRAMIENTAS (Buscador + Filtros + Vistas) */}
        <div className="max-w-4xl mx-auto mb-12 space-y-4 bg-white/60 p-4 rounded-2xl border border-pink-100 backdrop-blur-sm shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            
            {/* BUSCADOR */}
            <div className="relative flex-grow w-full">
              <Search className="absolute left-3 top-3 h-5 w-5 text-pink-400" />
              <Input 
                placeholder="Buscar por nombre u ocupación..." 
                className="pl-10 h-12 text-md border-pink-200 focus-visible:ring-pink-400 bg-white"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              {/* FILTRO CIUDAD */}
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

              {/* BOTONES DE VISTA (GRID / LISTA) */}
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
          
          {/* INFO RESULTADOS */}
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

        {/* GRID DE RESULTADOS */}
        {listaFiltrada.length > 0 ? (
          <div className={
              vista === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto" 
              : "flex flex-col gap-4 max-w-3xl mx-auto"
          }>
            {listaFiltrada.map((persona) => (
              <InfielCard key={persona.id} datos={persona} vista={vista} />
            ))}
          </div>
        ) : (
          // MENSAJE "NO ENCONTRADO"
          <div className="text-center py-20 opacity-60 space-y-3">
            <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-pink-400" />
            </div>
            <p className="text-2xl font-bold text-gray-600">No hay nadie con esos datos.</p>
            <p className="text-gray-400">Intenta buscar en otra ciudad o quita los filtros.</p>
            <button 
                onClick={() => {setBusqueda(""); setCiudadSeleccionada("Todas")}}
                className="text-pink-500 underline hover:text-pink-700 text-sm font-medium"
            >
                Limpiar filtros
            </button>
          </div>
        )}

      </main>

      {/* 2. FOOTER (Fuera del main para ser 100% ancho y negro) */}
      <Footer />
    </>
  );
}