"use client";

import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    id: 1,
    title: "Daily Essentials",
    desc: "Fresh, high-quality ingredients curated to support balanced and healthy living every day.",
    image: "/Daily Essentials.webp",
    gallery: ["/milk.png", "/eggs.png", "/Bread Loaf.png", "/Paneer.png", "/rice.webp"],
    href:"/shop/fruits-vegetables"
  },
  {
    id: 2,
    title: "Cravings & Treats",
    desc: "Flavor-packed snacks and baked goods crafted for moments of indulgence.",
    image: "/Cravings & Treats.png",
    gallery: ["/chocolate-cookies.png", "/Chocolate bars.webp", "/Snacks.webp", "/Muffins or cupcakes.png", "/Ice Cream.png"],
    href:"shop/snacks"
  },
  {
    id: 3,
    title: "Refresh & Recharge",
    desc: "Delicious beverages to keep you energized and refreshed anytime.",
    image: "/Refresh & Recharge.png",
    gallery: ["/milk.png", "/eggs.png", "/Bread Loaf.png", "/Paneer.png", "/rice.webp"],
    href:"/shop/beverages"
  },
];

export default function ShopByNeeds() {
  return (
    <section className="py-20 px-6 md:px-16 bg-white">
      <div className="flex justify-center ">
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
      after:to-transparent mb-4
      w-fit">
          <span className="text-[var(--primary)]">Popular</span> Categories
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8 pt-12">
        {categories.map((item) => (
          <div
            key={item.id}
            className="relative bg-gray-50 rounded-2xl p-6 shadow hover:shadow-lg transition"
          >
            {/* 10% Tag */}
            <span className="absolute -top-3 left-4 bg-[var(--secondary)] text-xs px-3 py-1 rounded-full z-10">
              10% OFF
            </span>

            {/* Top Content */}
            <div className="flex gap-4 mb-6 items-center">
              <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 112px, 128px"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-xl md:text-2xl mb-2">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  {item.desc}
                </p>
              </div>
            </div>

            {/* Shop Button */}
            <Link href={item.href}  >
              <button className="w-full bg-[var(--primary)] text-white py-2 rounded-xl font-medium hover:opacity-90 transition mb-6 cursor-pointer">
                Shop Now
              </button>
            </Link>


            {/* Bottom 5 Images */}
            <div className="flex justify-between gap-2">
              {item.gallery.map((img, index) => (
                <div
                  key={index}
                  className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-200"
                >
                  <Image
                    src={img}
                    alt="product"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}