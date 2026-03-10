"use client";

import Image from "next/image";
import { ShoppingCart,Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

// Main Featured Card
const mainCard = {
  title: "Essential Grocery Staples",
  text: "Stock up your pantry with fresh essentials delivered to your doorstep — from grains, vegetables, and dairy, carefully selected for quality.",
  image: "/Essential Grocery.png",
};

// All Products
const allProducts = [
  { id: 11, name: "Tomato", image: "/tomato.png", price: "₹80", quantities: ["500g", "1kg", "2kg"] },
  { id: 12, name: "Potato", image: "/potato.png", price: "₹60", quantities: ["1kg", "2kg", "5kg"] },
  { id: 51, name: "Rice", image: "/rice.webp", price: "₹200", quantities: ["1kg", "2kg", "5kg"] },
  { id: 59, name: "Wheat Flour", image: "/wheat.png", price: "₹150", quantities: ["1kg", "2kg", "5kg"] },
  { id: 61, name: "Cooking Oil", image: "/oil.png", price: "₹300", quantities: ["1L", "2L", "5L"] },
  { id: 63, name: "Sugar", image: "/sugar.png", price: "₹100", quantities: ["1kg", "2kg", "5kg"] },
  { id: 21, name: "Milk", image: "/milk.png", price: "₹60", quantities: ["1L", "2L", "5L"] },
  { id: 66, name: "Eggs", image: "/eggs.png", price: "₹120", quantities: ["6pcs", "12pcs", "24pcs"] },
];

export default function EssentialGrocerySection() {
  const { addToCart } = useCart();
    const [addedMap, setAddedMap] = useState({});
     const [selectedQuantities, setSelectedQuantities] = useState({});

     const getSelectedQty = (product) =>
    selectedQuantities[product.id] ?? product.quantities?.[0] ?? "";

     const handleAddToCart = (product) => {
    const qty = getSelectedQty(product);
    addToCart(product, qty);
    setAddedMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(
      () => setAddedMap((prev) => ({ ...prev, [product.id]: false })),
      1500
    );
  };


  return (
        <section className=" px-6 md:px-16 w-full bg-gradient-to-r from-[var(--secondary)] to-transparent">
  {/* Main Card on Top */}
  <div className="relative w-full flex flex-col md:flex-row items-center  p-6 rounded-xl mb-12 h-[350px]">
    {/* Image on the Left */}
    <div className="relative w-40 h-40 md:w-56 md:h-56 flex-shrink-0">
      <Image
        src={mainCard.image}
        alt={mainCard.title}
        fill
        className="object-contain transition-transform duration-300 hover:scale-105"
      />
    </div>

    {/* Heading and Text on the Right */}
 <div className="mt-4 md:mt-0 md:ml-6 flex-1 flex flex-col justify-center h-full relative">
  {/* Top bar: Tag + Button */}
  <div className="flex justify-between items-center mb-2 w-full">
    {/* Tag above heading */}
    <span className="text-sm font-medium text-black bg-[var(--primary)]/20 rounded-full px-4 py-2 uppercase">Featured</span>

    {/* View All Products Button */}
    <button className="primary-btn text-white px-4 py-2 rounded">
      View All Products
    </button>
  </div>

  {/* Heading */}
  <h2
    className="relative inline-block pb-2
      after:content-['']
      after:absolute
      after:left-0
      after:bottom-0
      after:w-full
      after:h-1
      after:rounded-full
      after:bg-gradient-to-r
      after:from-[var(--primary)]
      after:to-transparent mb-4
      w-fit"
  >
    <span className="text-[var(--primary)]">Essential </span> Grocery Staples
  </h2>

  {/* Description */}
  <p className="mt-2 text-gray-600">{mainCard.text}</p>
</div>
  </div>

  {/* Products Grid Below */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
    {allProducts.map((p) => (
     
        <div key={p.id}
          
          className="bg-gradient-to-b from-[var(--primary)]/10 to-transparent p-4 rounded-xl flex flex-col items-center transition-all duration-300 hover:scale-105 hover:bg-gradient-to-b hover:from-[var(--primary)]/15 hover:to-transparent w-full h-[350px]"
        >
          <div className="relative w-full h-32 bg-[var(--secondary)]/50 flex items-center justify-center overflow-hidden rounded-lg">
            <Image
              src={p.image}
              alt={p.name}
              fill
              className="object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
          <h3 className="mt-2 font-semibold text-center">{p.name}</h3>
          <select className="mt-1 border rounded px-2 py-1 w-full">
            {p.quantities.map((q) => (
              <option key={q} value={q}>{q}</option>
            ))}
          </select>
          <div className="mt-2 w-full flex justify-between items-center">
            <span className="font-bold">{p.price}</span>
            <div className="mt-auto flex justify-center">
               <div className="flex flex-col gap-2">
                    {/* Add to Cart */}
                    <button
                      onClick={() => handleAddToCart(p)}
                      className={`primary-btn flex-1 rounded-xl px-3 py-2 flex items-center justify-center gap-2 transition-all ${
                        addedMap[p.id] ? "opacity-80 scale-95" : ""
                      }`}
                    >
                      {addedMap[p.id] ? (
                        <>
                          <Check size={16} />
                          
                          <span >Added!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={16} />
                          <span className="lg:hidden">Add</span>
                          <span className="hidden lg:inline">Add to Cart</span>
                        </>
                      )}
                    </button>

                    {/* Buy Now */}
                    <Link className="w-full" href={`/product/${p.id}`}>
                      <button className="w-full secondary-btn flex-1 rounded-xl px-3 py-2 flex items-center justify-center">
                        Buy Now
                      </button>
                    </Link>
                  </div>
            </div>
          </div>
        </div>
    
      
    ))}
  </div>
</section>
  );
}