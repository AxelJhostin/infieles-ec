"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Loader2 } from "lucide-react";
import { crearInfiel } from "@/app/actions"; // Importamos la lógica que acabamos de crear

export function ReportarModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Evita que se recargue la página a la antigua
    setLoading(true);
    
    const formData = new FormData(event.currentTarget);
    await crearInfiel(formData); // Mandamos los datos a Railway
    
    setLoading(false);
    setOpen(false); // Cerramos el modal
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-pink-600 hover:bg-pink-700 text-white gap-2 font-bold shadow-lg shadow-pink-200 animate-pulse hover:animate-none">
          <PlusCircle className="w-5 h-5" />
          Reportar Nuevo Caso
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-pink-600 font-bold text-2xl">📝 Reportar Infiel</DialogTitle>
          <DialogDescription>
            Llena los datos con responsabilidad. Tu reporte aparecerá al instante.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre" className="font-bold">Nombre Completo *</Label>
              <Input id="nombre" name="nombre" placeholder="Ej: Juan Pérez" required className="border-pink-200 focus-visible:ring-pink-500"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ciudad" className="font-bold">Ciudad *</Label>
              <Input id="ciudad" name="ciudad" placeholder="Ej: Quito" required className="border-pink-200 focus-visible:ring-pink-500"/>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edad">Edad</Label>
              <Input id="edad" name="edad" type="number" placeholder="29" className="border-pink-200 focus-visible:ring-pink-500"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ocupacion">Ocupación</Label>
              <Input id="ocupacion" name="ocupacion" placeholder="Contador" className="border-pink-200 focus-visible:ring-pink-500"/>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion" className="font-bold">La Historia (El Incidente) *</Label>
            <Textarea id="descripcion" name="descripcion" placeholder="Cuenta qué pasó con lujo de detalles..." required className="border-pink-200 focus-visible:ring-pink-500 min-h-[100px]" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="redSocial">Link Red Social (Opcional)</Label>
            <Input id="redSocial" name="redSocial" placeholder="https://instagram.com/..." className="border-pink-200 focus-visible:ring-pink-500"/>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={loading} className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold text-lg">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "🔥 Publicar en el Registro"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}