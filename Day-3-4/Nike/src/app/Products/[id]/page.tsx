
import { client } from "@/sanity/lib/client";
import ProductDetailClient from "../../components/ProductDetailClient";


interface ProductDetailProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetail({ params }: ProductDetailProps) {
  // Await params directly because it's now a promise.
  const { id } = await params;

  if (!id) {
    return <div>Error: No product ID provided</div>;
  }

  const query = `
    *[_type == "product" && _id == "${id}"][0] {
      _id,
      productName,
      "imageUrl": image.asset->url,
      colors,
      price,
      description
    }
  `;

  try {
    const product = await client.fetch(query);

    if (!product) {
      return <div>Product not found</div>;
    }

    return <ProductDetailClient product={product} />;
  } catch (error) {
    console.error("Error fetching product:", error);
    return <div>Error fetching product details</div>;
  }
}






// import { GetServerSideProps } from 'next';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useCart } from '../../components/CartContext';
// import { client } from "@/sanity/lib/client";

// interface Product {
//   _id: string;
//   productName: string;
//   imageUrl: string;
//   colors: string[];
//   price: number;
//   description: string;
// }

// interface ProductDetailProps {
//   product: Product;
// }

// interface Params {
//   id: string;
// }

// export default function ProductDetailClient({ product }: ProductDetailProps) {
//   const { addToCart } = useCart();

//   const handleAddToCart = () => {
//     addToCart({
//       id: product._id,
//       name: product.productName,
//       price: product.price,
//       imageUrl: product.imageUrl,
//       quantity: 1,
//     });
//     toast.success(`${product.productName} added to your bag!`, {
//       position: 'top-right',
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     });
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       <div className="flex flex-col lg:flex-row gap-12">
//         {/* Image Section */}
//         <div className="w-full lg:w-1/2 flex justify-center items-center">
//           <div className="relative overflow-hidden rounded-2xl shadow-xl bg-white">
//             <img
//               src={product.imageUrl}
//               alt={product.productName}
//               className="w-full max-w-xl object-contain aspect-square transition-transform duration-300 hover:scale-105"
//             />
//           </div>
//         </div>

//         {/* Product Info Section */}
//         <div className="w-full lg:w-1/2 space-y-6">
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">
//             {product.productName}
//           </h1>
//           <p className="text-2xl font-semibold text-gray-800 mb-6">
//             ₹{product.price.toLocaleString()}
//           </p>

//           <div className="space-y-4">
//             <h3 className="text-lg font-medium text-gray-700">Description</h3>
//             <p className="text-gray-600 leading-relaxed text-lg">
//               {product.description}
//             </p>
//           </div>

//           {product.colors && product.colors.length > 0 && (
//             <div className="space-y-4">
//               <h3 className="text-lg font-medium text-gray-700">
//                 Available Colors
//               </h3>
//               <div className="flex gap-3">
//                 {product.colors.map((color, index) => (
//                   <div
//                     key={index}
//                     className="w-8 h-8 rounded-full shadow-md border-2 border-gray-200 transition-transform hover:scale-110 cursor-pointer"
//                     style={{ backgroundColor: color }}
//                     title={`Color: ${color}`}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}

//           <button
//             onClick={handleAddToCart}
//             className="w-full lg:w-auto px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>

//       <ToastContainer
//         toastClassName="rounded-lg shadow-lg"
//         progressClassName="bg-gray-900"
//       />
//     </div>
//   );
// }

// // Fetch product data on the server side
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { id } = context.params as { id?: string }; // Safely access id as string or undefined

//   if (!id) {
//     return { notFound: true }; // Return notFound if id is missing
//   }

//   // Fetch product data from your backend or Sanity CMS
//   const query = `
//     *[_type == "product" && _id == "${id}"][0] {
//       _id,
//       productName,
//       "imageUrl": image.asset->url,
//       colors,
//       price,
//       description
//     }
//   `;
//   const product = await client.fetch(query);

//   if (!product) {
//     return { notFound: true };
//   }

//   return {
//     props: {
//       product,
//     },
//   };
// };














// import { client } from "@/sanity/lib/client";
// import ProductDetailClient from "../../components/ProductDetailClient";

// interface ProductDetailProps {
//   params: { id: string };
// }

// export default async function ProductDetail({ params }: ProductDetailProps) {
//   if (!params?.id) {
//     return <div>Error: No product ID provided</div>;
//   }

//   const query = `
//     *[_type == "product" && _id == "${params.id}"][0] {
//       _id,
//       productName,
//       "imageUrl": image.asset->url,
//       colors,
//       price,
//       description
//     }
//   `;

//   try {
//     const product = await client.fetch(query);

//     if (!product) {
//       return <div>Product not found</div>;
//     }

//     return <ProductDetailClient product={product} />;
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     return <div>Error fetching product details</div>;
//   }
// }
