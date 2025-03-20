"use client";
import * as React from "react";
import Image from "next/image";
import Header from "../header";
import Footer from "../footer";
import dynamic from "next/dynamic";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/ui/tabs";
import { Card, CardContent } from "@/app/ui/card";
import PrimaryButton from "../ui/button";
import { meriendas, cafes } from "../data/productos";

const MapComponent = dynamic(() => import("../../components/MapComponent"), { ssr: false });

export default function GaleriaPage() {
  const [activeTab, setActiveTab] = React.useState("meriendas");
  const [cart, setCart] = React.useState<
    { id: number; name: string; description: string; image: string; quantity: number; type: string }[]
  >([]);
  const [comment, setComment] = React.useState<string>("");
  const [paymentMethod, setPaymentMethod] = React.useState<string>("Efectivo");
  const [location, setLocation] = React.useState<{ lat: number; lng: number } | null>(null);
  const pedidoRef = React.useRef<HTMLDivElement>(null);

  const addToCart = (item: { id: number; name: string; description: string; image: string }, type: string) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id && i.type === type);
      if (existing) {
        return prevCart.map((i) =>
          i.id === item.id && i.type === type ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevCart, { ...item, quantity: 1, type }];
      }
    });
  };

  const updateQuantity = (id: number, type: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.type === type ? { ...item, quantity: quantity < 1 ? 1 : quantity } : item
      )
    );
  };

  const removeFromCart = (id: number, type: string) => {
    setCart((prevCart) => prevCart.filter((item) => !(item.id === id && item.type === type)));
  };

  const scrollToPedido = () => {
    pedidoRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendToWhatsApp = () => {
    if (cart.length === 0) return alert("Tu carrito está vacío");
    if (!location) return alert("Seleccioná tu ubicación en el mapa antes de enviar el pedido!");

    const message = `¡Hola! Me gustaría pedir:\n\n${cart
      .map((item, index) => `${index + 1}. ${item.name} x${item.quantity}`)
      .join("\n")}\n\nComentario del cliente:\n${comment || "Sin comentarios"}\n\nMétodo de pago: ${paymentMethod}\n\nUbicación: https://www.google.com/maps?q=${location.lat},${location.lng}\n\n¡Gracias!`;

    const whatsappURL = `https://api.whatsapp.com/send?phone=59898916370&text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="bg-black text-white flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/galerybackground.png')" }}>
        <div className="container mx-auto px-4 pt-40 py-10">

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
              <TabsTrigger
                value="meriendas"
                onClick={() => setActiveTab("meriendas")}
                className={`flex items-center justify-center min-w-[110px] px-3 py-2 sm:px-6 sm:py-3 text-sm sm:text-lg font-medium rounded-full transition-all duration-300 ease-in-out
                ${activeTab === "meriendas" ? "bg-amber-500 text-black shadow-lg scale-105" : "bg-white/10 text-white hover:bg-amber-600/20 hover:text-amber-400"}`}
              >
                <Image src="/cookieicon.svg" alt="Meriendas" width={20} height={20} className={`inline-block mr-2 ${activeTab === "meriendas" ? "filter invert" : ""}`} />
                Meriendas
              </TabsTrigger>

              <TabsTrigger
                value="cafes"
                onClick={() => setActiveTab("cafes")}
                className={`flex items-center justify-center min-w-[110px] px-3 py-2 sm:px-6 sm:py-3 text-sm sm:text-lg font-medium rounded-full transition-all duration-300 ease-in-out
                ${activeTab === "cafes" ? "bg-amber-500 text-black shadow-lg scale-105" : "bg-white/10 text-white hover:bg-amber-600/20 hover:text-amber-400"}`}
              >
                <Image src="/cafeicon.svg" alt="Cafés" width={20} height={20} className={`inline-block mr-2 ${activeTab === "cafes" ? "filter invert" : ""}`} />
                Cafés
              </TabsTrigger>
            </TabsList>

            {/* Meriendas Content */}
            <TabsContent value="meriendas">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {meriendas.map((item) => (
                  <Card key={`merienda-${item.id}`} className="bg-black border-b border-[#1a1a1a] overflow-hidden hover:border-amber-700 transition-colors shadow-lg">
                    <CardContent className="p-0 relative">
                      <div className="relative h-64 w-full overflow-hidden">
                        <Image src={item.image} alt={item.name} fill className="object-cover hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="p-6 bg-black/40 backdrop-blur-[1px] absolute bottom-0 w-full text-center z-10">
                        <h3 className="text-xl font-serif mb-2 text-white">{item.name}</h3>
                        <PrimaryButton text="Agregar al carrito" onClick={() => addToCart(item, "merienda")} extraClasses="mt-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Cafés Content */}
            <TabsContent value="cafes">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cafes.map((item) => (
                  <Card key={`cafe-${item.id}`} className="bg-black border-b border-[#1a1a1a] overflow-hidden hover:border-amber-700 transition-colors shadow-lg">
                    <CardContent className="p-0 relative">
                      <div className="relative h-64 w-full overflow-hidden">
                        <Image src={item.image} alt={item.name} fill className="object-cover hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="p-6 bg-black/40 backdrop-blur-[1px] absolute bottom-0 w-full text-center z-10">
                        <h3 className="text-xl font-serif mb-2 text-white">{item.name}</h3>
                        <PrimaryButton text="Agregar al carrito" onClick={() => addToCart(item, "cafe")} extraClasses="mt-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Pedido + Mapa */}
          <div ref={pedidoRef} className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pedido */}
            <div className="p-6 bg-white/10 rounded-lg shadow-lg">
              <h2 className="text-2xl mb-4 text-center">Tu Pedido</h2>
              {cart.length === 0 ? (
                <p className="text-center">No has agregado productos aún.</p>
              ) : (
                <ul className={`space-y-4 mb-4 overflow-y-auto ${cart.length > 4 ? "max-h-64" : ""}`}>
                  {cart.map((item) => (
                    <li key={`${item.type}-${item.id}`} className="flex flex-col gap-2 border-b border-white/20 pb-2">
                      <div className="flex justify-between items-center">
                        <span>{item.name}</span>
                        <button onClick={() => removeFromCart(item.id, item.type)} className="text-red-500">❌</button>
                      </div>
                      <div className="flex gap-2 items-center">
                        <label>Cantidad:</label>
                        <input
                          type="number"
                          value={item.quantity}
                          min={1}
                          onChange={(e) => updateQuantity(item.id, item.type, parseInt(e.target.value))}
                          className="w-16 p-1 rounded text-white bg-black"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mb-4">
                <label htmlFor="payment" className="block mb-2 text-white">Método de Pago:</label>
                <select
                  id="payment"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-3 rounded-lg bg-black/50 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Efectivo">Efectivo</option>
                  <option value="Transferencia">Transferencia</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="comment" className="block mb-2 text-white">Comentario (opcional):</label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className="w-full p-3 rounded-lg bg-black/50 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Dirección o pedido especial..."
                />
              </div>
            </div>

            {/* Mapa */}
            <div className="relative z-10 h-[400px] min-h-[400px] w-full rounded-lg overflow-hidden">
              <MapComponent location={location} setLocation={setLocation} />
              <p className="mt-4 text-center text-white text-sm">
                {location
                  ? `Ubicación seleccionada: Lat ${location.lat.toFixed(4)}, Lng ${location.lng.toFixed(4)}`
                  : "Hacé click en el mapa para seleccionar tu ubicación"}
              </p>
            </div>
          </div>

          {/* Enviar Pedido debajo del mapa */}
          <div className="flex justify-center mt-8">
            <PrimaryButton
              text="Enviar Pedido por WhatsApp"
              onClick={sendToWhatsApp}
              extraClasses="w-full max-w-md bg-green-600 hover:bg-green-700 border-green-700"
            />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
