"use client";
import { useCart } from "../components/CartContext";

interface Product {
  _id: string;
  productName: string;
  imageUrl: string;
  colors: string[];
  price: number;
  description: string;
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.productName,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    });

    // Create a custom alert-like notification
    const notification = document.createElement("div");
    notification.textContent = `${product.productName} added to your bag!`;
    notification.className =
      "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <div className="relative overflow-hidden rounded-2xl shadow-xl bg-white">
            <img
              src={product.imageUrl}
              alt={product.productName}
              className="w-full max-w-xl object-contain aspect-square transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
  
  
        <div className="w-full lg:w-1/2 space-y-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {product.productName}
          </h1>
          <p className="text-2xl font-semibold text-gray-800 mb-6">
            ₹{product.price.toLocaleString()}
          </p>
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Description</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {product.description}
            </p>
          </div>
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">
                Available Colors
              </h3>
              <div className="flex gap-3">
                {product.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full shadow-md border-2 border-gray-200 transition-transform hover:scale-110 cursor-pointer"
                    style={{ backgroundColor: color }}
                    title={`Color: ${color}`}
                  />
                ))}
              </div>
            </div>
          )}
          <button
            onClick={handleAddToCart}
            className="w-full lg:w-auto px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}