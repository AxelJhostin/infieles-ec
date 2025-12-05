"use client"

import { useState } from "react";
import { Search, List, ChevronLeft, ChevronRight, Filter, X, Loader2, LayoutGrid } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InfielCard } from "@/components/InfielCard";
import { Label } from "@/components/ui/label";
import { buscarRegistros } from "@/app/actions";

// Tipo de dato para una persona
interface Infiel {
  id: number;
  nombre: string;
  edad: number | null;
  ocupacion: string | null;
  ciudad: string;
  descripcion: string;
  redSocial: string | null;
  iniciales: string | null;
  creadoEn: string;
}

// NUEVO: Tipo de dato para los filtros (Adiós 'any')
interface FiltrosCliente {
  nombre: string;
  ciudad: string;
  ocupacion: string;
  edadMin: string;
  edadMax: string;
}

interface HomeClientProps {
  tipo: "infiel" | "migajero" | "cachudo" | "bandida" | "moza";
  totalInicial: number;
}

export function HomeClient({ tipo, totalInicial }: HomeClientProps) {
  const [modo, setModo] = useState<"inicio" | "lista">("inicio");
  const [cargando, setCargando] = useState(false);
  const [vista, setVista] = useState<"grid" | "list">("grid");
  
  const [registros, setRegistros] = useState<Infiel[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalResultados, setTotalResultados] = useState(totalInicial);
  
  // Usamos la interfaz aquí
  const [filtros, setFiltros] = useState<FiltrosCliente>({
    nombre: "",
    ciudad: "",
    ocupacion: "",
    edadMin: "",
    edadMax: ""
  });
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  // AQUÍ CORREGIMOS EL ERROR: Ya no usamos 'any', usamos 'FiltrosCliente'
  const cargarDatos = async (pagina: number, filtrosActuales: FiltrosCliente) => {
    setCargando(true);
    try {
      const resultado = await buscarRegistros(pagina, filtrosActuales, tipo);
      setRegistros(resultado.datos);
      setTotalResultados(resultado.total);
      setPaginaActual(pagina);
      setModo("lista");
    } catch (error) {
      console.error("Error cargando datos", error);
    } finally {
      setCargando(false);
    }
  };

  const manejarVerTodo = () => {
    const filtrosVacios = { nombre: "", ciudad: "", ocupacion: "", edadMin: "", edadMax: "" };
    setFiltros(filtrosVacios);
    cargarDatos(1, filtrosVacios);
  };

  const manejarBusqueda = (e: React.FormEvent) => {
    e.preventDefault();
    cargarDatos(1, filtros);
  };

  const cambiarPagina = (nuevaPagina: number) => {
    cargarDatos(nuevaPagina, filtros);
    window.scrollTo({ top: 400, behavior: 'smooth' }); 
  };

  const totalPaginas = Math.ceil(totalResultados / 80);

  return (
    <div className="max-w-7xl mx-auto space-y-8 min-h-[400px]">
      
      {modo === "inicio" && (
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center py-10 animate-in fade-in zoom-in duration-500">
          
          <div className="w-full max-w-sm bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg text-center space-y-4 hover:scale-105 transition-all cursor-pointer"
               onClick={() => setMostrarFiltros(true)}>
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-blue-600 mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Búsqueda Avanzada</h3>
            <p className="text-gray-600 text-sm">Filtra por nombre, ciudad, edad u ocupación.</p>
            <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 mt-2">
              Abrir Filtros
            </Button>
          </div>

          <div className="w-full max-w-sm bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg text-center space-y-4 hover:scale-105 transition-all cursor-pointer"
               onClick={manejarVerTodo}>
            <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-pink-600 mb-4">
              <List className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Ver Lista Completa</h3>
            <p className="text-gray-600 text-sm">Explora los {totalResultados} registros más recientes.</p>
            <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white mt-2">
              {cargando ? <Loader2 className="animate-spin" /> : "Ver Todos"}
            </Button>
          </div>
        </div>
      )}

      {(mostrarFiltros || (modo === "lista" && mostrarFiltros)) && (
        <form onSubmit={manejarBusqueda} className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 animate-in slide-in-from-top-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-gray-700 flex items-center gap-2">
              <Filter className="w-5 h-5" /> Filtros de Búsqueda
            </h3>
            <Button variant="ghost" size="sm" onClick={() => setMostrarFiltros(false)} type="button"><X className="w-4 h-4"/></Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Nombre / Apodo</Label>
              <Input placeholder="Ej: Juan" value={filtros.nombre} onChange={e => setFiltros({...filtros, nombre: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Ciudad</Label>
              <Input placeholder="Ej: Quito" value={filtros.ciudad} onChange={e => setFiltros({...filtros, ciudad: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Ocupación</Label>
              <Input placeholder="Ej: Médico" value={filtros.ocupacion} onChange={e => setFiltros({...filtros, ocupacion: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Edad (Rango)</Label>
              <div className="flex gap-2">
                <Input placeholder="Min" type="number" value={filtros.edadMin} onChange={e => setFiltros({...filtros, edadMin: e.target.value})} />
                <Input placeholder="Max" type="number" value={filtros.edadMax} onChange={e => setFiltros({...filtros, edadMax: e.target.value})} />
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => {
              setFiltros({ nombre: "", ciudad: "", ocupacion: "", edadMin: "", edadMax: "" });
              setModo("inicio");
              setMostrarFiltros(false);
            }}>Cancelar</Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]">
              {cargando ? <Loader2 className="animate-spin" /> : "Buscar Ahora"}
            </Button>
          </div>
        </form>
      )}

      {modo === "lista" && (
        <div className="animate-in fade-in duration-700">
          <div className="flex flex-wrap justify-between items-center bg-white/80 p-4 rounded-xl border border-gray-100 mb-6 gap-4">
            <div className="text-sm text-gray-600">
              Mostrando <span className="font-bold text-gray-900">{registros.length}</span> resultados de <span className="font-bold text-gray-900">{totalResultados}</span>
            </div>
            
            <div className="flex gap-2 items-center">
               <Button variant="outline" size="sm" onClick={() => setMostrarFiltros(!mostrarFiltros)}>
                 <Filter className="w-4 h-4 mr-2" /> {mostrarFiltros ? "Ocultar Filtros" : "Filtrar"}
               </Button>
               <div className="bg-gray-100 p-1 rounded-lg flex">
                  <Button variant={vista === "grid" ? "secondary" : "ghost"} size="icon" className="h-8 w-8" onClick={() => setVista("grid")}><LayoutGrid className="w-4 h-4"/></Button>
                  <Button variant={vista === "list" ? "secondary" : "ghost"} size="icon" className="h-8 w-8" onClick={() => setVista("list")}><List className="w-4 h-4"/></Button>
               </div>
            </div>
          </div>

          {cargando ? (
            <div className="py-20 text-center">
              <Loader2 className="w-12 h-12 animate-spin mx-auto text-gray-300" />
              <p className="text-gray-400 mt-4">Buscando en los archivos...</p>
            </div>
          ) : registros.length > 0 ? (
            <>
              <div className={
                  vista === "grid" 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
                  : "flex flex-col gap-4 max-w-3xl mx-auto"
              }>
                {registros.map((persona) => (
                  // @ts-expect-error: Tipos compatibles
                  <InfielCard key={persona.id} datos={persona} vista={vista} />
                ))}
              </div>

              {totalPaginas > 1 && (
                <div className="flex justify-center items-center gap-6 mt-12 mb-8">
                  <Button variant="outline" onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
                    <ChevronLeft className="w-4 h-4 mr-2" /> Anterior
                  </Button>
                  <span className="text-sm font-medium">Página {paginaActual} de {totalPaginas}</span>
                  <Button variant="outline" onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
                    Siguiente <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-white/50 rounded-2xl border border-dashed border-gray-300">
              <p className="text-xl text-gray-500 font-medium">No se encontraron resultados.</p>
              <Button variant="link" onClick={() => setMostrarFiltros(true)} className="text-blue-500">Intentar otra búsqueda</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}