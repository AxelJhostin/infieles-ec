"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Loader2 } from "lucide-react";
import { crearRegistro } from "@/app/actions";

// Agregamos "moza" a los tipos
export function ReportarModal({ tipo }: { tipo: "infiel" | "migajero" | "cachudo" | "bandida" | "moza" }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Configuración de colores
  const configs = {
    infiel: { btn: "Reportar Infiel", color: "bg-rose-600 hover:bg-rose-700", ring: "focus-visible:ring-rose-500" },
    migajero: { btn: "Exponer Migajero", color: "bg-amber-500 hover:bg-amber-600", ring: "focus-visible:ring-amber-500" },
    cachudo: { btn: "Confesar / Reportar", color: "bg-blue-600 hover:bg-blue-700", ring: "focus-visible:ring-blue-500" },
    bandida: { btn: "Registrar Jubilación", color: "bg-purple-600 hover:bg-purple-700", ring: "focus-visible:ring-purple-500" },
    moza: { btn: "Exponer la Otra/o", color: "bg-fuchsia-600 hover:bg-fuchsia-700", ring: "focus-visible:ring-fuchsia-500" },
  };

  const estilo = configs[tipo];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    
    const formData = new FormData(event.currentTarget);
    await crearRegistro(formData, tipo);
    
    setLoading(false);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={`${estilo.color} text-white gap-2 font-bold shadow-lg animate-pulse hover:animate-none`}>
          <PlusCircle className="w-5 h-5" />
          {estilo.btn}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white mt-10 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-gray-900 font-bold text-2xl capitalize">📝 Registro: {tipo}</DialogTitle>
          <DialogDescription>
            100% Anónimo. La verdad siempre sale a la luz.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre" className="font-bold">Nombre / Alias *</Label>
              <Input id="nombre" name="nombre" required className="border-gray-200"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ciudad" className="font-bold">Ciudad *</Label>
              <Input id="ciudad" name="ciudad" required className="border-gray-200"/>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
              <Label htmlFor="edad">Edad</Label>
              <Input id="edad" name="edad" type="number" className="border-gray-200"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ocupacion">Ocupación</Label>
              <Input id="ocupacion" name="ocupacion" className="border-gray-200"/>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion" className="font-bold">La Historia (Contexto) *</Label>
            <Textarea id="descripcion" name="descripcion" required className="border-gray-200 min-h-[100px]" placeholder="¿Cómo pasó todo?..." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="redSocial">Link Red Social (Opcional)</Label>
            <Input id="redSocial" name="redSocial" className="border-gray-200"/>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={loading} className={`w-full ${estilo.color} text-white font-bold text-lg`}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "🔥 Publicar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}