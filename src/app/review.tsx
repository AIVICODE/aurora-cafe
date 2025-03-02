"use client";

import Image from "next/image";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Micaela Cardozo",
    rating: 5,
    comment: "Muy rico todo y muy buena atención, súper recomiendo 😊",
    image: "/user.png",
  },
  {
    name: "LE P",
    rating: 5,
    comment: "Está MUY bueno, tienen buena comida y buen café además es dog friendly la gente es copada y el lugar es muy lindo 10/10",
    image: "/user.png",
  },
  {
    name: "Sofía Panessi",
    rating: 5,
    comment: "Estuvo todo riquísimo, fuimos un 14 de febrero y estaba todo ambientado muy lindo. Las galletas de Nutella son una bomba❤️",
    image: "/user.png",
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-20 bg-[#CDCDCD]">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-4xl font-serif text-black mb-8 text-center">Reseñas de Nuestros Clientes</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <Image
                  src={review.image}
                  alt={review.name}
                  width={50}
                  height={50}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-black">{review.name}</h3>
                  <div className="flex text-yellow-500">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
