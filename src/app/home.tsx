"use client";

import Image from "next/image";
import Link from "next/link";

export default function Landing() {

  // Función de scroll personalizado súper suave
  const handleScrollToNosotros = (event: React.MouseEvent) => {
    event.preventDefault();

    const target = document.getElementById("nosotros");
    if (target) {
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1000;
      let startTime: number | null = null;

      const smoothScroll = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(smoothScroll);
      };

      const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      };

      requestAnimationFrame(smoothScroll);
    }
  };

  return (
    <div className="relative h-screen bg-[url('/mobile.webp')] sm:bg-[url('/prueba.png')] bg-cover bg-center transition-all duration-500">
      {/* Overlay para mejorar el contraste */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Ícono de WhatsApp ajustado */}
      <Link
        href="https://wa.me/59891775992?text=Hola,%20vengo%20de%20la%20web%20y%20tengo%20una%20consulta!"
        target="_blank"  // Abrir en nueva pestaña
      >
        <div className="fixed right-4 bottom-8 bg-white rounded-full p-3 shadow-lg transition-transform hover:scale-110 z-50">
          <Image
            src="/wspicon.png"
            alt="WhatsApp"
            width={60}   // Aumentar tamaño para evitar recortes
            height={60}  // Aumentar tamaño para evitar recortes
            className="object-contain"  // Ajustar la imagen sin recortes
          />
        </div>
      </Link>

      {/* Botón "Explorar más" con desplazamiento súper suave */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
  <button
    onClick={handleScrollToNosotros}
    className="bg-[#a67f2b] text-white px-8 py-4 rounded-full shadow-lg transition-all hover:bg-[#8b6c21] hover:scale-105 animate-bounce border-2 border-[#8b6c21] relative overflow-hidden"
  >
    <span className="absolute inset-0 bg-gradient-to-r from-[#a67f2b] to-[#8b6c21] opacity-20 blur-md"></span>
    <span className="relative">Explorar más</span>
  </button>
</div>

    </div>
  );
}
