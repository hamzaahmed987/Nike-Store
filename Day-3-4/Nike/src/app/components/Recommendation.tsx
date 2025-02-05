"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { client } from "../../sanity/lib/client";

interface Product {
  _id: string;
  productName: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  status: string;
  colors?: string[];
  slug: { current: string }; // Added slug
  imageUrl: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "product"] [5..8] {
        _id,
        productName,
        description,
        price,
        category,
        inventory,
        status,
        colors,
        slug, // Include slug
        "imageUrl": image.asset->url
      }`;
      const result: Product[] = await client.fetch(query);
      setProducts(result);
    };

    fetchProducts();
  }, []);

  return (
   <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8 py-8 max-w-[1440px] h-604 mx-auto">
        {products.map((product) => (
         <Link href={`/Products/${product._id}`} key={product._id}>
            <div className="relative w-full aspect-square bg-[#f5f5f5] mb-8 rounded-lg overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.productName}
                fill
                className="object-contain p-4 transform group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="space-y-1 text-center sm:text-left mb-10">
              <h2 className="font-medium text-sm sm:text-base">
                {product.productName}
              </h2>
              <p className="font-medium text-sm sm:text-base">
                ₹ {product.price.toLocaleString("en-IN")}
              </p>
              <p className="text-gray-500 text-xs sm:text-sm">
                Category: {product.category}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}


