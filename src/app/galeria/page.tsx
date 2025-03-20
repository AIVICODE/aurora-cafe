"use client";

import React from "react";

import Image from "next/image";
import Header from "../header";
import Footer from "../footer";
import dynamic from "next/dynamic";

import { Card, CardContent } from "@/app/ui/card";
import PrimaryButton from "../ui/button";
import useProductStock from "./product";


const MapComponent = dynamic(() => import("../../components/MapComponent"), { ssr: false });

export default function GaleriaPage() {

  const products = useProductStock();
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

  const sendToWhatsApp = () => {
    if (cart.length === 0) return alert("Tu carrito está vacío");
    if (!location) return alert("Seleccioná tu ubicación en el mapa antes de enviar el pedido!");

    const message = `¡Hola! Me gustaría pedir:\n\n${cart
      .map((item, index) => `${index + 1}. ${item.name} x${item.quantity}`)
      .join("\n")}\n\nComentario del cliente:\n${comment || "Sin comentarios"}\n\nMétodo de pago: ${paymentMethod}\n\nUbicación: https://www.google.com/maps?q=${location.lat},${location.lng}\n\n¡Gracias!`;

    const whatsappURL = `https://api.whatsapp.com/send?phone=59891775992&text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };



  return (
    <div className="bg-black text-white flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 relative overflow-hidden bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/galerybackground.webp')" }}>
      <div className="container mx-auto px-4 pt-40 py-10">
  
          {/* Meriendas */}
          <div className="text-center mb-6">
            <Image src="/cookieicon.svg" alt="Meriendas Icon" width={40} height={40} className="mx-auto mb-2" />
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-custom">
            {products
              .filter((item) => item.type === "merienda" && item.stock)
              .map((item) => {
                const cartItem = cart.find((i) => i.id === item.id && i.type === "merienda");
  
                return (
                  <Card key={`merienda-${item.id}`} className="min-w-[250px] bg-black border-b border-[#1a1a1a] overflow-hidden hover:border-amber-700 transition-colors shadow-lg flex-shrink-0">
                    <CardContent className="p-0 relative">
                      <div className="relative h-64 w-full overflow-hidden">
                        <Image src={item.image} alt={item.name} fill className="object-cover hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="p-6 bg-black/40 backdrop-blur-[1px] absolute bottom-0 w-full text-center z-10">
                        <h3 className="text-xl font-serif mb-2 text-white">{item.name}</h3>
  
                        {cartItem ? (
                          <div className="flex flex-col items-center space-y-2">
                            <div className="flex gap-2 items-center">
                              <button
                                onClick={() => updateQuantity(item.id, "merienda", cartItem.quantity - 1)}
                                className="bg-white text-black px-2 rounded-full"
                                disabled={cartItem.quantity <= 1}
                              >
                                -
                              </button>
                              <span>{cartItem.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, "merienda", cartItem.quantity + 1)}
                                className="bg-white text-black px-2 rounded-full"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id, "merienda")}
                              className="text-red-400 text-sm hover:underline"
                            >
                              Eliminar
                            </button>
                          </div>
                        ) : (
                          <PrimaryButton text="Agregar al carrito" onClick={() => addToCart(item, "merienda")} extraClasses="mt-2" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
  
          {/* Cafés */}
          <div className="text-center mt-10 mb-6">
            <Image src="/cafeicon.svg" alt="Cafés Icon" width={40} height={40} className="mx-auto mb-2" />
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-custom">
            {products
              .filter((item) => item.type === "cafe" && item.stock)
              .map((item) => {
                const cartItem = cart.find((i) => i.id === item.id && i.type === "cafe");
  
                return (
                  <Card key={`cafe-${item.id}`} className="min-w-[250px] bg-black border-b border-[#1a1a1a] overflow-hidden hover:border-amber-700 transition-colors shadow-lg flex-shrink-0">
                    <CardContent className="p-0 relative">
                      <div className="relative h-64 w-full overflow-hidden">
                        <Image src={item.image} alt={item.name} fill className="object-cover hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="p-6 bg-black/40 backdrop-blur-[1px] absolute bottom-0 w-full text-center z-10">
                        <h3 className="text-xl font-serif mb-2 text-white">{item.name}</h3>
  
                        {cartItem ? (
                          <div className="flex flex-col items-center space-y-2">
                            <div className="flex gap-2 items-center">
                              <button
                                onClick={() => updateQuantity(item.id, "cafe", cartItem.quantity - 1)}
                                className="bg-white text-black px-2 rounded-full"
                                disabled={cartItem.quantity <= 1}
                              >
                                -
                              </button>
                              <span>{cartItem.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, "cafe", cartItem.quantity + 1)}
                                className="bg-white text-black px-2 rounded-full"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id, "cafe")}
                              className="text-red-400 text-sm hover:underline"
                            >
                              Eliminar
                            </button>
                          </div>
                        ) : (
                          <PrimaryButton text="Agregar al carrito" onClick={() => addToCart(item, "cafe")} extraClasses="mt-2" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>

    {/* Pedido + Mapa (sigue igual) */}


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
