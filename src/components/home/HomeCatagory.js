"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const categories = [
    { name: "Fruits", slug: "/shop/fruits", image: "/Fruits.png" },
    { name: "Vegetables", slug: "/shop/vegetables", image: "Vegetables.png" },
    { name: "Dairy", slug: "/shop/dairy", image: "Dairy.png" },
    { name: "Snacks", slug: "/shop/snacks", image: "/Snacks.webp" },
    { name: "Beverages", slug: "/shop/beverages", image: "/Beverages.png" },
    { name: "Grains", slug: "/shop/grains", image: "/Grains.png" },
    { name: "Household", slug: "/shop", image: "Household.png" },
];

export default function CategoriesScroll() {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth * 0.7;
            scrollRef.current.scrollTo({
                left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <section >
            <div className="text-center">
                <h2 className="relative inline-block pb-2
    after:content-['']
    after:absolute
    after:left-0
    after:bottom-0
    after:w-full
    after:h-1
    after:rounded-full
    after:bg-gradient-to-r
    after:from-[var(--primary)]
    after:to-transparent mb-4"
                >
                    Explore Our <span className="text-[var(--primary)]">Categories</span>
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                    Discover fresh, high-quality products from fruits, vegetables, dairy, snacks, and more — all sourced directly from trusted farms and suppliers.
                </p>
            </div>
            <div className="relative py-12 px-6 md:px-16">
                {/* Scroll Buttons */}
                <button
                    onClick={() => scroll("left")}
                    className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white transition z-10"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={() => scroll("right")}
                    className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white transition z-10"
                >
                    <ChevronRight size={24} />
                </button>

                {/* Horizontal Scroll Container */}
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide py-2"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // hide scrollbar for Firefox/IE
                >
                    {categories.map((cat) => (
                        <Link href={cat.slug} key={cat.slug}>
  <div
    className="flex flex-col items-center flex-shrink-0 cursor-pointer transition-transform duration-300 hover:scale-105"
  >
    {/* Circle */}
    <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-[var(--primary)]/30 bg-[var(--secondary)] flex items-center justify-center overflow-hidden transition-transform duration-300">
      <img
        src={cat.image}
        alt={cat.name}
        className="w-20 h-20 object-contain"
      />
    </div>

    {/* Category Name */}
    <span className="mt-3 text-base font-semibold transition-colors duration-300 hover:text-[var(--primary)]">
      {cat.name}
    </span>
  </div>
</Link>
                    ))}
                </div>
            </div>

        </section>
    );
}