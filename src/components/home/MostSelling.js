"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, FreeMode, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ShoppingCart, ShoppingBag, Star, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
 import Link from "next/link";

// Products
const bestSellers = [
    { id: 1, name: "Chocolate Cookies", image: "/chocolate-cookies.png", price: "₹120", rating: 4 },
    { id: 2, name: "Potato Chips", image: "/chips.png", price: "₹60", rating: 5 },
    { id: 3, name: "Soft Drink", image: "/soft-drink.png", price: "₹50", rating: 4 },
    { id: 4, name: "Ice Cream", image: "/Ice Cream.png", price: "₹150", rating: 5 },
    { id: 5, name: "Paneer", image: "/Paneer.png", price: "₹200", rating: 4 },
    { id: 6, name: "Mango Juice", image: "/Mango Juice.png", price: "₹80", rating: 4 },
    { id: 7, name: "Bread Loaf", image: "/Bread Loaf.png", price: "₹40", rating: 3 },
    { id: 8, name: "Cashew Nuts", image: "/Cashew Nuts.png", price: "₹250", rating: 5 },
];

export default function BestSellersSection() {

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <section className="py-20 px-6 md:px-16 w-full bg-gradient-to-r from-[var(--secondary)] to-transparent">

            {/* Header */}
            <div className="flex justify-between items-center mb-10">
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
                    <span className="text-[var(--primary)]">Popular</span> Products
                </h2>
                <Link href="/shop">
                <button className="primary-btn w-fit rounded-xl px-4 py-2 flex items-center justify-center gap-2">
                    View All 
                </button>
                </Link>
                
            </div>

            {/* Swiper */}
            <Swiper
                modules={[Navigation, Mousewheel, FreeMode, Autoplay]}
                spaceBetween={25}
                slidesPerView={2}
                navigation={{
                    prevEl: ".prev-btn",
                    nextEl: ".next-btn",
                }}
                mousewheel={{
                    forceToAxis: true,
                    sensitivity: 1,
                }}
                freeMode={true}
                grabCursor={true}
                speed={3000} // smooth movement
                autoplay={{
                    delay: 0, // continuous
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                loop={true}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                    1280: { slidesPerView: 5 },
                }}
                className="relative"
            >
                {bestSellers.map((product) => (
                    <SwiperSlide key={product.id}>
                        <motion.div
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            className="group bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-500 flex flex-col h-[380px]"
                        >

                            {/* Image */}
                            <div className="relative w-full aspect-square bg-[var(--secondary)]/30 rounded-xl overflow-hidden">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* Wishlist */}
                                <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-[var(--primary)]/10 transition">
                                    <Heart size={16} className="text-[var(--primary)]" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex flex-col flex-grow mt-4">

                                {/* Rating */}
                                <div className="flex items-center justify-between gap-1 mb-2">
                                    <div className=" flex">{[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={12}
                                            className={i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                                        />
                                    ))}
                                    </div>

                                    <span className="font-bold text-lg ">{product.price}</span>
                                </div>

                                <h3 className="font-semibold text-sm mb-1">{product.name}</h3>


                                <div className="mt-auto flex justify-center">
                                    <button className="secondary-btn w-fit rounded-xl px-4 py-2 flex items-center justify-center gap-2">
                                        <ShoppingCart size={16} /> Add to Cart
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </SwiperSlide>
                ))}

                {/* Navigation */}
                <div className="prev-btn absolute top-1/2 -left-0 z-10 bg-[var(--primary)] text-white p-3 rounded-full shadow cursor-pointer -translate-y-1/2">
                    <ChevronLeft size={20} />
                </div>

                <div className="next-btn absolute top-1/2 -right-0 z-10 bg-[var(--primary)] text-white p-3 rounded-full shadow cursor-pointer -translate-y-1/2">
                    <ChevronRight size={20} />
                </div>

            </Swiper>
        </section>
    );
}