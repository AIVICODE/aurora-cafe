import Link from "next/link";
import { Instagram } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#1b1c20] text-[#a67f2b] border-b border-[#1a1a1a]">
      <div className="container mx-auto px-4 py-12">

        {/* Ajuste a 4 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Columna 1: Información de contacto */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-serif mb-6 text-[#a67f2b] border-b border-[#a67f2b]/50 pb-2 inline-block">
              Contacto
            </h3>
            <p className="mb-2 text-sm text-[#a67f2b]">Calle Paloma, en frente a escuela N° 52</p>
            <p className="mb-2 text-sm text-[#a67f2b]">La Paloma, Rocha, Uruguay</p>
            <p className="mb-2 text-sm text-[#a67f2b]">Tel: +598 91 775 992</p>
            <p className="hover:text-white transition-colors">

            </p>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-serif mb-6 text-[#a67f2b] border-b border-[#a67f2b]/50 pb-2 inline-block">
              Enlaces rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#home" className="hover:text-white transition-colors text-sm text-[#a67f2b]">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/#nosotros" className="hover:text-white transition-colors text-sm text-[#a67f2b]">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/galeria" className="hover:text-white transition-colors text-sm text-[#a67f2b]">
                  Pedidos y menú
                </Link>
              </li>
            </ul>
          </div>



          {/* Columna 3: Redes sociales y horario */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-serif mb-6 text-[#a67f2b] border-b border-[#a67f2b]/50 pb-2 inline-block">
              Síguenos
            </h3>
            <div className="flex justify-center md:justify-start space-x-6 mb-6">
              {[Instagram].map((Icon, idx) => (
                <a
                  key={idx}
                  href="https://www.instagram.com/aurora_cafe_la_paloma/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  <Icon size={28} className="text-[#a67f2b] hover:text-white transition duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Columna 4: Logo */}
          <div className="text-center flex flex-col items-center">
            <Image
              src="/logo.svg"
              alt="Aurora Logo"
              width={120}
              height={60}
              className="opacity-90 mb-4"
            />
          </div>
        </div>

        {/* Decorative line */}
        <div className="my-8 border-t border-[#a67f2b]/30"></div>

        {/* Copyright */}
        <div className="text-center text-sm text-[#a67f2b]">
          <p>&copy; {new Date().getFullYear()} Aurora Café. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
