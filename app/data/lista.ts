// Exportamos la interfaz para usarla en los componentes
export interface Infiel {
  id: number;
  nombre: string;
  edad: number;
  ocupacion: string;
  ciudad: string;
  descripcion: string;
  redSocial?: string;
  iniciales: string;
}

// Nuestra lista gigante (puedes agregar cientos aquí y no molesta)
export const listaInfieles: Infiel[] = [
  {
    id: 1,
    nombre: "Juan Pérez",
    edad: 29,
    ocupacion: "Contador",
    ciudad: "Quito",
    descripcion: "Juró por su madre que estaba en cierre fiscal, pero sus historias de 'Mejores Amigos' lo mostraron en un karaoke.",
    redSocial: "https://instagram.com",
    iniciales: "JP"
  },
  {
    id: 2,
    nombre: "Roberto G.",
    edad: 32,
    ocupacion: "Ingeniero Civil",
    ciudad: "Cuenca",
    descripcion: "Tenía una 'reunión de obra' a las 11pm un sábado. Spoiler: La obra era una discoteca.",
    redSocial: "https://twitter.com",
    iniciales: "RG"
  },
  {
    id: 3,
    nombre: "Esteban D.",
    edad: 24,
    ocupacion: "DJ",
    ciudad: "Manta",
    descripcion: "Dijo que su celular no tenía señal en la playa, pero subió 15 TikToks bailando con otra.",
    iniciales: "ED"
  },
  {
    id: 4,
    nombre: "Carla M.",
    edad: 27,
    ocupacion: "Marketing",
    ciudad: "Guayaquil",
    descripcion: "Salió al 'gym' pero regresó con el cabello planchado y oliendo a perfume de hombre caro.",
    iniciales: "CM"
  },
  {
    id: 5,
    nombre: "Luis 'El Santo'",
    edad: 35,
    ocupacion: "Abogado",
    ciudad: "Ambato",
    descripcion: "Tiene dos celulares. Uno para la esposa y otro para 'temas laborales' (Tinder).",
    iniciales: "LA"
  }
];