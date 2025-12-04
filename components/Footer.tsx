import { Instagram, Twitter, ShieldAlert, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-12 mt-24 font-sans border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        
        {/* COLUMNA 1: La Marca */}
        <div className="space-y-4">
          <h3 className="text-white text-lg font-bold flex items-center gap-2">
            💔 Registro Nacional
          </h3>
          <p className="leading-relaxed text-gray-500">
            La plataforma líder en transparencia de relaciones en Ecuador. 
            Ayudando a descubrir la verdad desde 2024.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
          </div>
        </div>

        {/* COLUMNA 2: Enlaces */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold tracking-wide uppercase text-xs">Navegación</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-pink-500 transition-colors">Inicio</a></li>
            <li><a href="#" className="hover:text-pink-500 transition-colors">Buscar Infiel</a></li>
            <li><a href="#" className="hover:text-pink-500 transition-colors">Politica de Privacidad</a></li>
          </ul>
          <p className="text-xs text-gray-600 pt-2">
            ¿Quieres reportar? Usa el botón rosa en la parte superior. ⬆️
          </p>
        </div>

        {/* COLUMNA 3: El Mensaje Sarcástico */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold tracking-wide uppercase text-xs">Aviso a la comunidad</h4>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs leading-5 text-gray-400">
                Los datos aquí mostrados fueron proporcionados directamente por las afectadas.
                <br /><br />
                <span className="text-white font-medium">¿Tienes alguna queja?</span> La solución era simple: <span className="text-pink-400 font-bold">no ser infiel.</span> 🤷‍♂️
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* BARRA INFERIOR */}
      <div className="max-w-6xl mx-auto px-6 mt-12 pt-8 border-t border-gray-900 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
        <p>© 2024 Registro Nacional EC. Todos los derechos reservados.</p>
        <p className="flex items-center gap-1 mt-2 md:mt-0">
          Hecho con <Heart className="w-3 h-3 text-red-600 fill-red-600" /> en Ecuador
        </p>
      </div>
    </footer>
  );
}