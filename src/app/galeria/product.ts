import { useEffect, useState } from "react";
import { meriendas, cafes } from "../data/productos";

type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  stock: boolean;
  type: string;
};

export default function useProductStock() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        const sheetData = data.data.slice(1);

        const availabilityMap = new Map<number, boolean>();
        sheetData.forEach((row: string[]) => {
          const id = parseInt(row[0]);
          const disponible = row[2].toLowerCase() === "sí";
          availabilityMap.set(id, disponible);
        });

        const updatedMeriendas = meriendas.map((item) => ({
          ...item,
          stock: availabilityMap.get(item.id) ?? true,
          type: "merienda",
        }));

        const updatedCafes = cafes.map((item) => ({
          ...item,
          stock: availabilityMap.get(item.id) ?? true,
          type: "cafe",
        }));

        setProducts([...updatedMeriendas, ...updatedCafes]);
      } catch (error) {
        console.error("Error cargando stock", error);
      }
    };

    fetchStock();
  }, []);

  return products;
}
