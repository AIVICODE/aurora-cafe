
import Header from "./header";
import Footer from "./footer";
import GaleriaPage from "./galeria/page";
import Nosotros from "./Ussection";
import Landing from "./home"
import ReviewsSection from "./review";
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#CDCDCD] text-white">
      <Header />

      <main className="flex-1 relative">
        <Landing/>
        <Nosotros />  {/* Fondo personalizado aquí */}
        <GaleriaPage />
        <ReviewsSection/>
      </main>

      <Footer />
    </div>
  );
}
