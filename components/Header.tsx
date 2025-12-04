"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, Cookie, HeartCrack, Crown } from "lucide-react"; // Importamos Crown

export function Header() {
  const pathname = usePathname();

  const menu = [
    { name: "Infieles", path: "/", icon: Flame, color: "text-rose-500", bg: "bg-rose-100" },
    { name: "Migajeros", path: "/migajeros", icon: Cookie, color: "text-amber-500", bg: "bg-amber-100" },
    { name: "Cachudos", path: "/cachudos", icon: HeartCrack, color: "text-blue-500", bg: "bg-blue-100" },
    // Nueva categoría Morada
    { name: "Bandidas", path: "/bandidas", icon: Crown, color: "text-purple-500", bg: "bg-purple-100" },
  ];

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl rounded-full p-1.5 flex gap-1 flex-wrap justify-center">
        {menu.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 text-sm font-bold ${
                isActive 
                  ? `${item.bg} ${item.color} shadow-sm scale-105` 
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <item.icon className={`w-4 h-4 ${isActive ? item.color : "text-gray-400"}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}