import { MapPin, Briefcase, HeartCrack, ExternalLink, User, Instagram } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import { Infiel } from "@/app/data/lista";

interface InfielCardProps {
  datos: Infiel;
  vista: "grid" | "list"; // Ahora la tarjeta sabe en qué vista está
}

export function InfielCard({ datos, vista }: InfielCardProps) {
  
  // --- DISEÑO 1: VISTA LISTA (HORIZONTAL - TU DIBUJO) ---
  if (vista === "list") {
    return (
      <Card className="flex flex-col md:flex-row items-center p-4 gap-6 border-gray-200 shadow-sm hover:shadow-md transition-all bg-white group">
        
        {/* 1. IZQUIERDA: FOTO GRANDE (Como en tu dibujo) */}
        <div className="flex-shrink-0">
          <Avatar className="h-24 w-24 md:h-20 md:w-20 border-4 border-rose-50 shadow-inner">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${datos.nombre}`} />
            <AvatarFallback className="bg-gray-100 text-gray-500 font-bold text-xl">{datos.iniciales}</AvatarFallback>
          </Avatar>
        </div>

        {/* 2. CENTRO: DATOS PERSONALES */}
        <div className="flex-grow text-center md:text-left space-y-2 w-full">
          <div className="flex flex-col md:flex-row md:items-center gap-2 justify-center md:justify-start">
            <h3 className="text-xl font-bold text-gray-900">{datos.nombre}</h3>
            <Badge variant="secondary" className="bg-rose-100 text-rose-700 w-fit mx-auto md:mx-0">
              {datos.ocupacion}
            </Badge>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-500 justify-center md:justify-start">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {datos.ciudad}</span>
            <span className="flex items-center gap-1"><User className="w-3 h-3" /> {datos.edad} años</span>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mt-2">
             <p className="text-sm text-gray-600 italic line-clamp-2">{datos.descripcion}</p>
          </div>
        </div>

        {/* 3. DERECHA: BOTÓN (Acción rápida) */}
        <div className="flex-shrink-0 w-full md:w-auto mt-2 md:mt-0">
          {datos.redSocial ? (
            <Button 
              asChild 
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold shadow-rose-100 shadow-lg"
            >
              <a href={datos.redSocial} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Ver Perfil
              </a>
            </Button>
          ) : (
            <Button disabled variant="outline" className="w-full opacity-50">Sin red social</Button>
          )}
        </div>
      </Card>
    );
  }

  // --- DISEÑO 2: VISTA CUADRÍCULA (VERTICAL - EL ANTERIOR) ---
  return (
    <Card className="border-pink-100 shadow-md hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm group overflow-hidden h-full flex flex-col">
      <div className="h-2 w-full bg-gradient-to-r from-pink-300 to-rose-400" />
      
      <CardHeader className="flex flex-row items-center gap-4 pb-3 pt-6">
        <Avatar className="h-16 w-16 border-2 border-pink-200 group-hover:border-pink-400 transition-colors">
          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${datos.nombre}`} />
          <AvatarFallback className="bg-pink-100 text-pink-600 font-bold">{datos.iniciales}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold text-gray-800">{datos.nombre}</CardTitle>
          <CardFooter className="p-0 text-pink-500 font-semibold text-xs uppercase tracking-wide">
             {datos.ocupacion}
          </CardFooter>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 flex-grow">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="border-pink-200 text-gray-500">{datos.ciudad}</Badge>
          <Badge variant="outline" className="border-pink-200 text-gray-500">{datos.edad} años</Badge>
        </div>
        <Separator className="bg-pink-50" />
        <p className="text-sm text-gray-600 italic bg-rose-50/30 p-3 rounded-md border border-rose-100">
           {datos.descripcion}
        </p>
      </CardContent>

      {datos.redSocial && (
        <CardFooter className="pt-2 pb-6">
           <Button asChild className="w-full bg-pink-500 hover:bg-pink-600 text-white">
            <a href={datos.redSocial} target="_blank"><Instagram className="w-4 h-4 mr-2"/> Stalkear</a>
           </Button>
        </CardFooter>
      )}
    </Card>
  );
}