import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full py-4 bg-black/30 backdrop-blur-[2px] z-50 flex flex-col items-center">
      {/* Logo */}
      <div className="mb-2 flex justify-center">
        <Image
          src="/logo.svg"
          alt="Aurora Logo"
          width={80} // mobile
          height={40}
          className="opacity-90 sm:w-[100px] sm:h-[50px]"
        />
      </div>

      {/* Navigation */}
      <nav className="flex flex-wrap justify-center items-center gap-2 max-w-[95%] text-center">
        <Link
          href="/#home"
          className="px-4 py-2 sm:px-6 rounded-full bg-white text-black border border-amber-200 font-medium uppercase tracking-wide text-xs sm:text-sm hover:bg-amber-100 transition-colors whitespace-nowrap"
        >
          Home
        </Link>
        <Link
          href="/#nosotros"
          className="px-4 py-2 sm:px-6 rounded-full bg-transparent text-white border border-white font-medium uppercase tracking-wide text-xs sm:text-sm hover:bg-white/10 transition-colors whitespace-nowrap"
        >
          Nosotros
        </Link>
        <Link
          href="/galeria"
          className="px-4 py-2 sm:px-6 rounded-full bg-[#a67f2b] text-white border border-white font-medium uppercase tracking-wide text-xs sm:text-sm hover:bg-amber-300 transition-colors whitespace-nowrap"
        >
          Pedidos
        </Link>
      </nav>
    </header>
  );
}
