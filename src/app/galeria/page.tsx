"use client"

import * as React from "react"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/ui/tabs"
import { Card, CardContent } from "@/app/ui/card"
import Footer from "../footer";

const meriendas = [
  { id: 1, name: "Rogel", description: "Delicioso croissant horneado con almendras caramelizadas y un toque de vainilla.", image: "/rogel.jpg" },
  { id: 2, name: "Brownie", description: "Tarta casera con chocolate negro de primera calidad y base de galleta crujiente.", image: "/brownie.jpg" },
  { id: 3, name: "Cheesecake de Frutos Rojos", description: "Suave cheesecake con cobertura de frutos rojos frescos de temporada.", image: "/chessecake.jpg" }
]

const cafes = [
  { id: 1, name: "Espresso Aurora", description: "Nuestro espresso signature con granos seleccionados de Colombia. Intenso y aromático.", image: "/negro.jpg" },
  { id: 2, name: "Cappuccino Cremoso", description: "Espresso con leche vaporizada y espuma aterciopelada. El equilibrio perfecto.", image: "/placeholder.svg" },
  { id: 3, name: "Latte Caramelo", description: "Café espresso con leche cremosa y un toque de caramelo casero.", image: "/placeholder.svg" },
  { id: 4, name: "Late Caramelo", description: "Café espresso con leche cremosa y un toque de caramelo casero.", image: "/placeholder.svg" },
  { id: 5, name: "Late Caramelo", description: "Café espresso con leche cremosa y un toque de caramelo casero.", image: "/placeholder.svg" }
]

export default function GaleriaPage() {
  const [activeTab, setActiveTab] = React.useState("meriendas")

  return (
    <div className="bg-black text-white flex flex-col">
      <main className="flex-1 relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/galerybackground.png')" }}>
        <div className="container mx-auto px-4 py-20">


          {/* Gallery Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex justify-center gap-4 mb-12">
  <TabsTrigger
    value="meriendas"
    onClick={() => setActiveTab("meriendas")}
    className={`px-6 py-3 text-lg font-medium rounded-full transition-all duration-300 ease-in-out
      ${activeTab === "meriendas" ? "bg-amber-500 text-black shadow-lg scale-105" : "bg-white/10 text-white hover:bg-amber-600/20 hover:text-amber-400"}`}
  >
    {/* Ícono personalizado para Meriendas */}
    <Image
      src="/cookieicon.svg"
      alt="Meriendas"
      width={24}
      height={24}
      className={`inline-block mr-2 transition-colors duration-300 ${
        activeTab === "meriendas" ? "filter invert" : "filter invert-0"
      }`}
    />
    Meriendas
  </TabsTrigger>

  <TabsTrigger
    value="cafes"
    onClick={() => setActiveTab("cafes")}
    className={`px-6 py-3 text-lg font-medium rounded-full transition-all duration-300 ease-in-out
      ${activeTab === "cafes" ? "bg-amber-500 text-black shadow-lg scale-105" : "bg-white/10 text-white hover:bg-amber-600/20 hover:text-amber-400"}`}
  >
    {/* Ícono personalizado para Cafés */}
    <Image
      src="/cafeicon.svg"
      alt="Cafés"
      width={24}
      height={24}
      className={`inline-block mr-2 transition-colors duration-300 ${
        activeTab === "cafes" ? "filter invert" : "filter invert-0"
      }`}
    />
    Cafés
  </TabsTrigger>
</TabsList>


            <TabsContent value="meriendas">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {meriendas.map((item) => (
      <Card
        key={item.id}
        className="bg-black border-b border-[#1a1a1a] overflow-hidden hover:border-amber-700 transition-colors shadow-lg"
      >
        <CardContent className="p-0 relative">
          <div className="relative h-64 w-full overflow-hidden">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          {/* Fondo con blur para la descripción */}
          <div className="p-6 bg-black/40 backdrop-blur-[1px] absolute bottom-0 w-full text-center z-10">
            <h3 className="text-xl font-serif mb-2 text-white">{item.name}</h3>
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
      <Card
        key={item.id}
        className="bg-black border-b border-[#1a1a1a] overflow-hidden hover:border-amber-700 transition-colors shadow-lg"
      >
        <CardContent className="p-0 relative">
          <div className="relative h-64 w-full overflow-hidden">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          {/* Fondo con blur para la descripción */}
          <div className="p-6 bg-black/40 backdrop-blur-[1px] absolute bottom-0 w-full text-center z-10">
            <h3 className="text-xl font-serif mb-2 text-white">{item.name}</h3>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
</TabsContent>
          </Tabs>
        </div>
      </main>

    </div>
  )
}
