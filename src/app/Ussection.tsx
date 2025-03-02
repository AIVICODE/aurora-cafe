"use client";

import Image from "next/image";
import Link from "next/link";

export default function Nosotros() {
  return (
    <section
      id="nosotros"
      className="py-20 px-8 bg-cover bg-center scroll-margin-top-20"
      style={{
        backgroundImage: "url('/bean.png')",
        minHeight: "80vh",
      }}
    >
      <div className="container mx-auto max-w-6xl bg-[#1b1c20]/80 p-12 rounded-lg shadow-xl border border-[#a67f2b]/30">
        {/* Título y subtítulo */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif mb-4 text-white">Sobre Nosotros</h2>
          <p className="text-lg text-[#a67f2b]">
            La pasión por el buen café y los pequeños momentos que hacen la vida especial.
          </p>
        </div>

        {/* Contenido principal con texto e imágenes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-white leading-relaxed">
              Aurora Café nació del deseo de crear un espacio acogedor donde el aroma del café y el sabor de nuestros postres caseros inviten a quedarse. 
              Utilizamos productos seleccionados, frescos, para brindar una experiencia auténtica y memorable.
            </p>
            <p className="text-white leading-relaxed">
              Creemos en la calidez de un servicio amable y en la importancia
              de compartir momentos con quienes más queremos. Desde los clásicos espressos 
              hasta nuestras creaciones originales, cada taza cuenta una historia.
            </p>
            <blockquote className="border-l-4 border-[#a67f2b] pl-4 italic text-[#a67f2b]/70">
              “El café no es solo una bebida, es una experiencia para el alma.”
            </blockquote>
          </div>

          {/* Imágenes */}
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/negro.jpg"
              alt="Barista preparando café"
              width={400}
              height={300}
              className="object-cover rounded-lg shadow-lg border border-[#a67f2b]/20"
            />
            <Image
              src="/lluvia.jpg"
              alt="Equipo de Aurora Café"
              width={400}
              height={300}
              className="object-cover rounded-lg shadow-lg border border-[#a67f2b]/20"
            />
            <Image
              src="/chicate.jpg"
              alt="Taza de café"
              width={400}
              height={300}
              className="object-cover rounded-lg shadow-lg border border-[#a67f2b]/20"
            />
            <Image
              src="/auropergola.jpg"
              alt="Interior de Aurora Café"
              width={400}
              height={300}
              className="object-cover rounded-lg shadow-lg border border-[#a67f2b]/20"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
