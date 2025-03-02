import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full py-4 bg-black/30 backdrop-blur-[2px]  z-50 flex flex-col items-center">
      {/* Logo */}
      <div className="mb-2">
        <Image
          src="/logo.svg"
          alt="Aurora Logo"
          width={100}
          height={50}
          className="opacity-90"
        />
      </div>

      {/* Navigation */}
      <nav className="flex gap-4">
        <Link
          href="/"
          className="px-6 py-2 rounded-full bg-white text-black border border-amber-200 font-medium uppercase tracking-wider text-sm hover:bg-amber-100 transition-colors"
        >
          Home
        </Link>
        <Link
          href="/nosotros"
          className="px-6 py-2 rounded-full bg-transparent text-white border border-white font-medium uppercase tracking-wider text-sm hover:bg-white/10 transition-colors"
        >
          Nosotros
        </Link>
        <Link
          href="#"
          className="px-6 py-2 rounded-full bg-transparent text-white border border-white font-medium uppercase tracking-wider text-sm hover:bg-white/10 transition-colors"
        >
          Menú
        </Link>
      </nav>
    </header>
  );
}
