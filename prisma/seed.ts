import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// LISTA DE DATOS FICTICIOS PARA RELLENAR
const datosFalsos = [
  {
    nombre: "Carlos 'El Intenso' M.",
    edad: 28,
    ocupacion: "Community Manager",
    ciudad: "Quito",
    descripcion: "Dijo que se quedaba en la oficina editando reels, pero lo vieron en Cumbayá perreando hasta el suelo.",
    iniciales: "CM",
    redSocial: "https://instagram.com"
  },
  {
    nombre: "Mafer L.",
    edad: 24,
    ocupacion: "Estudiante de Diseño",
    ciudad: "Guayaquil",
    descripcion: "Salió a comprar telas al centro y regresó 3 días después bronceada de Montañita.",
    iniciales: "ML",
    redSocial: "https://twitter.com"
  },
  {
    nombre: "Javier 'El Ingeniero'",
    edad: 35,
    ocupacion: "Ingeniero Civil",
    ciudad: "Cuenca",
    descripcion: "Tenía una 'inspección de obra' nocturna. La obra resultó ser una discoteca en la Remigio.",
    iniciales: "JI",
    redSocial: null
  },
  {
    nombre: "Andrea S.",
    edad: 22,
    ocupacion: "Influencer",
    ciudad: "Samborondón",
    descripcion: "Subió una historia a Mejores Amigos con su 'primo' de Manabí. Spoiler: No son familia.",
    iniciales: "AS",
    redSocial: "https://tiktok.com"
  },
  {
    nombre: "Luis P.",
    edad: 31,
    ocupacion: "Abogado",
    ciudad: "Ambato",
    descripcion: "Tiene dos celulares. Uno para la esposa y otro para 'contactos judiciales' (Tinder).",
    iniciales: "LP",
    redSocial: null
  },
  {
    nombre: "Dayana R.",
    edad: 26,
    ocupacion: "Enfermera",
    ciudad: "Manta",
    descripcion: "Dijo que tenía turno doble en el hospital, pero el GPS del carro marcaba un motel en la vía a Portoviejo.",
    iniciales: "DR",
    redSocial: "https://facebook.com"
  },
  {
    nombre: "Kevin J.",
    edad: 20,
    ocupacion: "DJ",
    ciudad: "Machala",
    descripcion: "Le dedicó la misma canción de Romeo Santos a tres chicas diferentes en la misma fiesta.",
    iniciales: "KJ",
    redSocial: "https://instagram.com"
  },
  {
    nombre: "Sofia T.",
    edad: 29,
    ocupacion: "Contadora",
    ciudad: "Quito",
    descripcion: "En pleno cierre fiscal desapareció. La encontraron en el teleférico con el pasante.",
    iniciales: "ST",
    redSocial: null
  },
  {
    nombre: "Roberto B.",
    edad: 40,
    ocupacion: "Gerente de Banco",
    ciudad: "Loja",
    descripcion: "Fue al gimnasio por 3 horas y regresó oliendo a perfume de mujer y sin sudar ni una gota.",
    iniciales: "RB",
    redSocial: "https://linkedin.com"
  },
  {
    nombre: "Jessica M.",
    edad: 25,
    ocupacion: "Marketing",
    ciudad: "Guayaquil",
    descripcion: "Su jefe le daba 'aventones' a la casa todos los días. Vivían en polos opuestos de la ciudad.",
    iniciales: "JM",
    redSocial: null
  },
  {
    nombre: "Esteban Q.",
    edad: 33,
    ocupacion: "Músico",
    ciudad: "Ibarra",
    descripcion: "Le escribió una canción de amor a su novia, pero se le olvidó cambiar el nombre de su ex en el coro.",
    iniciales: "EQ",
    redSocial: "https://soundcloud.com"
  },
  {
    nombre: "Valeria C.",
    edad: 27,
    ocupacion: "Arquitecta",
    ciudad: "Riobamba",
    descripcion: "Dijo que iba al Chimborazo a tomar fotos de paisajes. Las fotos eran selfies en un jacuzzi.",
    iniciales: "VC",
    redSocial: "https://instagram.com"
  },
  {
    nombre: "Byron L.",
    edad: 23,
    ocupacion: "Futbolista Amateur",
    ciudad: "Esmeraldas",
    descripcion: "Jugaba partido todos los viernes. Lo raro es que siempre regresaba con el uniforme limpio y oliendo a jabón chiquito.",
    iniciales: "BL",
    redSocial: null
  },
  {
    nombre: "Camila V.",
    edad: 21,
    ocupacion: "Estudiante",
    ciudad: "Quito",
    descripcion: "Se fue de intercambio a estudiar inglés y regresó comprometida con un gringo, sin avisarle al novio de aquí.",
    iniciales: "CV",
    redSocial: "https://tiktok.com"
  },
  {
    nombre: "Jorge A.",
    edad: 38,
    ocupacion: "Taxista",
    ciudad: "Santo Domingo",
    descripcion: "Apagaba la ubicación en tiempo real justo cuando pasaba por cierta zona residencial todos los días a la misma hora.",
    iniciales: "JA",
    redSocial: null
  },
  {
    nombre: "Gabriela N.",
    edad: 30,
    ocupacion: "Profesora",
    ciudad: "Latacunga",
    descripcion: "Se quedaba 'calificando exámenes' hasta tarde con el profesor de Educación Física.",
    iniciales: "GN",
    redSocial: "https://facebook.com"
  },
  {
    nombre: "Ricardo F.",
    edad: 45,
    ocupacion: "Empresario",
    ciudad: "Guayaquil",
    descripcion: "Tenía un segundo celular escondido en la llanta de repuesto del carro.",
    iniciales: "RF",
    redSocial: null
  },
  {
    nombre: "Daniela X.",
    edad: 24,
    ocupacion: "Call Center",
    ciudad: "Quito",
    descripcion: "Se enamoró de un cliente por teléfono y se fue a conocerlo a Colombia diciendo que era un viaje de trabajo.",
    iniciales: "DX",
    redSocial: "https://instagram.com"
  },
  {
    nombre: "Miguel O.",
    edad: 29,
    ocupacion: "Chef",
    ciudad: "Baños",
    descripcion: "Decía que los fines de semana eran temporada alta en el restaurante. En realidad, era temporada alta en Tinder.",
    iniciales: "MO",
    redSocial: null
  },
  {
    nombre: "Patricia G.",
    edad: 34,
    ocupacion: "Vendedora",
    ciudad: "Quevedo",
    descripcion: "Vendía productos por catálogo, pero pasaba mucho tiempo haciendo demostraciones privadas en casa del vecino.",
    iniciales: "PG",
    redSocial: null
  },
  {
    nombre: "Santiago U.",
    edad: 26,
    ocupacion: "Programador",
    ciudad: "Loja",
    descripcion: "Dijo que estaba en una Hackathon de 48 horas. La Hackathon era con su ex en Vilcabamba.",
    iniciales: "SU",
    redSocial: "https://twitter.com"
  },
  {
    nombre: "Lucía H.",
    edad: 22,
    ocupacion: "Modelo",
    ciudad: "Manta",
    descripcion: "Fue a una sesión de fotos en yate. El fotógrafo no tenía cámara.",
    iniciales: "LH",
    redSocial: "https://instagram.com"
  },
  {
    nombre: "Fernando Z.",
    edad: 36,
    ocupacion: "Mecánico",
    ciudad: "Quito",
    descripcion: "Arreglaba el carro de la vecina gratis todos los sábados por la noche.",
    iniciales: "FZ",
    redSocial: null
  },
  {
    nombre: "Monica K.",
    edad: 28,
    ocupacion: "Recepcionista",
    ciudad: "Guayaquil",
    descripcion: "Reservaba la suite presidencial del hotel para 'verificar que esté limpia' junto con el gerente.",
    iniciales: "MK",
    redSocial: null
  },
  {
    nombre: "Andrés W.",
    edad: 31,
    ocupacion: "Piloto",
    ciudad: "Quito",
    descripcion: "Tenía una familia en Quito y otra novia oficial en Galápagos. Se le cruzaron los horarios de vuelo.",
    iniciales: "AW",
    redSocial: "https://instagram.com"
  },
  {
    nombre: "Teresa Y.",
    edad: 42,
    ocupacion: "Ama de casa",
    ciudad: "Cuenca",
    descripcion: "Iba al mercado todos los días, pero la canasta siempre regresaba vacía y ella muy contenta.",
    iniciales: "TY",
    redSocial: null
  },
  {
    nombre: "Victor R.",
    edad: 25,
    ocupacion: "Bartender",
    ciudad: "Montañita",
    descripcion: "Lo que pasa en Montañita se queda en Montañita... hasta que alguien sube la foto a Facebook.",
    iniciales: "VR",
    redSocial: "https://facebook.com"
  },
  {
    nombre: "Ximena P.",
    edad: 29,
    ocupacion: "Dentista",
    ciudad: "Ambato",
    descripcion: "Tenía muchas citas nocturnas de 'emergencia'. Al parecer había una epidemia de dolor de muelas a las 11pm.",
    iniciales: "XP",
    redSocial: null
  },
  {
    nombre: "Eduardo S.",
    edad: 33,
    ocupacion: "Vendedor de Autos",
    ciudad: "Quito",
    descripcion: "Salía a probar los autos con las clientas y tardaba 4 horas en dar la vuelta a la manzana.",
    iniciales: "ES",
    redSocial: null
  },
  {
    nombre: "Diana B.",
    edad: 27,
    ocupacion: "Veterinaria",
    ciudad: "Guayaquil",
    descripcion: "Cuidaba al perro del vecino. Y al vecino también.",
    iniciales: "DB",
    redSocial: "https://instagram.com"
  }
]

async function main() {
  console.log(`🌱 Empezando a sembrar datos...`)
  
  for (const persona of datosFalsos) {
    const infiel = await prisma.infiel.create({
      data: persona,
    })
    console.log(`✅ Creado: ${infiel.nombre}`)
  }
  
  console.log(`🏁 ¡Listo! Base de datos llena con ${datosFalsos.length} infieles.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })