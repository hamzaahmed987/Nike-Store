import React, { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from "next/image";
import { useWishList } from "../WishList";

type Product = {
  _id: string;
  productName: string;
  imageUrl: string;
  colors?: string[];
  price: number;
};

export default function Mens() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null); // Custom alert message state
  const { wishList, addToWishList, removeFromWishList } = useWishList();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product" && category in ["Sales"]]{
          _id,
          productName,
          category,
          price,
          inventory,
          colors,
          status,
          "imageUrl": image.asset->url,
          description
        }`;
        const fetchedProducts = await client.fetch(query);
        if (fetchedProducts.length === 0) {
          setError("No products found in the Kids category.");
        } else {
          setProducts(fetchedProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products. Please try again later.");
      }
    };
    fetchProducts();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const showAlert = (message: string) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(null), 3000); // Automatically hide the alert after 3 seconds
  };

  const toggleWishList = (product: Product) => {
    if (wishList.some((item) => item.id === product._id)) {
      removeFromWishList(product._id);
      showAlert(`${product.productName} removed from your wish list.`);
    } else {
      addToWishList({
        id: product._id,
        name: product.productName,
        price: product.price,
        imageUrl: product.imageUrl,
      });
      showAlert(`${product.productName} added to your wish list!`);
    }
  };

  return (
    <>
      {/* Custom Alert Message */}
      {alertMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {alertMessage}
        </div>
      )}

      {error ? (
        <div className="flex w-full h-screen items-center justify-center bg-gray-100">
          <h1 className="text-4xl font-bold text-red-600 bg-white px-8 py-4 rounded-lg shadow-lg">
            Out Of Stock
          </h1>
        </div>
      ) : (
        <main className="w-full lg:w-3/4 p-6">
          <div className="flex justify-between items-center mb-4">
            {!isSidebarOpen && (
              <button
                className="lg:hidden top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-full"
                onClick={toggleSidebar}
              >
                {/* <BsFillFilterCircleFill /> */}
              </button>
            )}
            <h2 className="text-xl font-semibold">Sort By</h2>
            <button className="text-gray-600">Hide Filters</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product._id} className="border p-4">
                <Link href={`/Products/${product._id}`}>
                  <img
                    src={product.imageUrl}
                    alt={product.productName}
                    className="w-full mb-4"
                  />
                </Link>
                <h3 className="text-lg font-medium">{product.productName}</h3>
                <p className="text-gray-500">{product.colors?.join(", ")}</p>
                <p className="text-gray-900">MRP: {product.price}</p>
                <button
                  className="relative top-2 right-2 text-xl"
                  onClick={() => toggleWishList(product)}
                >
                  {wishList.some((item) => item.id === product._id) ? (
                    <Image
                      src={"/fill.png"}
                      alt={"fill"}
                      width={20}
                      height={20}
                    />
                  ) : (
                    <Image
                      src={"/outliner.png"}
                      alt={"outliner"}
                      width={20}
                      height={20}
                    />
                  )}
                </button>
              </div>
            ))}
          </div>
        </main>
      )}
    </>
  );
}