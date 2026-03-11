"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Leaf, Coffee, ShoppingCart } from "lucide-react";
import CategoriesScroll from "@/components/home/HomeCatagory";
import EssentialGrocerySection from "@/components/home/EssentialGrocery";
import Image from "next/image";
import MostSellingProducts from "@/components/home/MostSelling";
import ShopByNeeds from "@/components/home/ShopByNeeds";
import Link from "next/link";
const cards = [
  {
    id: 1,
    icon: <Leaf size={24} className="text-[var(--primary)]" />,
    title: "Fresh Produce",
    text: "Crisp vegetables and juicy fruits delivered straight from the farm.",
  },
  {
    id: 2,
    icon: <Coffee size={24} className="text-[var(--primary)]" />,
    title: "Dairy Delights",
    text: "Fresh milk, yogurt, and cheese sourced daily for your family.",
  },
  {
    id: 3,
    icon: <ShoppingCart size={24} className="text-[var(--primary)]" />,
    title: "Bakery Fresh",
    text: "Soft, warm bread and pastries baked daily to perfection.",
  },
];

const slides = [
  {
    id: 1,
    image: "/vegetables-and-fruits1.jpg",
    tag: "Get Fresh",
    title: "Fresh Groceries, Delivered Fast",
    description:
      "Quality fruits and vegetables straight to your door.",
    button: "Explore the collection",
  },
  {
    id: 2,
    image: "/vegetables-and-fruits2.jpg",
    tag: "Quality Assured",
    title: "Pure Freshness, Every Day",
    description:
      "Handpicked fruits, vegetables, and essentials delivered with care.",
    button: "Buy Fresh",
  },
  {
    id: 3,
    image: "/vegetables-and-fruits3.jpg",
    tag: "Farm Fresh Dairy",
    title: "Pure Milk, Every Morning",
    description:
      "Fresh, rich, and full of nutrition — delivered straight to your doorstep.",
    button: "Shop Dairy",
  },
  {
    id: 4,
    image: "/vegetables-and-fruits4.jpg",
    tag: "Snack Time",
    title: "Crunch Into Happiness",
    description:
      "Discover chips, biscuits, and treats perfect for every craving.",
    button: "Shop Snacks",
  },
];

const page = () => {
  const [current, setCurrent] = useState(0);
  // animation lower hero section
  const container = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2, duration: 0.8 },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <section className="relative w-full  h-[54vh] md:h-[85vh] overflow-hidden">

        {/* Slides */}
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide) => (

            <div
              key={slide.id}
              className="w-full flex-shrink-0 relative h-full"
            >
              {/* Background Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30"></div>

              {/* Content */}
              <div className="absolute inset-0 flex items-center px-6 md:px-16">
                <div className="max-w-xl text-white">

                  <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm">
                    {slide.tag}
                  </span>

                  <h1 className="mt-6 text-3xl md:text-5xl font-bold leading-tight">
                    {slide.title}
                  </h1>

                  <p className="mt-4 text-base md:text-lg text-gray-200">
                    {slide.description}
                  </p>

                  <button className="mt-6 primary-btn px-6 py-3 rounded-xl">
                    {slide.button}
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
          {slides.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              className={`transition-all duration-300 cursor-pointer rounded-full bg-white ${current === index
                ? "w-8 h-2"
                : "w-2 h-2 opacity-60"
                }`}
            ></div>
          ))}
        </div>
      </section>
      <motion.section 
        className="py-16 px-6 md:px-16 grid gap-6 md:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
      >
        {cards.map((c) => (
          <motion.div
            key={c.id}
            variants={card}
            className="flex items-center gap-4 p-6 rounded-xl bg-[var(--secondary)] transform transition-transform duration-300 hover:-translate-y-2"
          >
            {/* Icon inside white circle */}
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-white">
              <span className="text-[var(--primery)]">{c.icon}</span>
            </div>

            {/* Text */}
            <div>
              <h3 className="text-xl font-bold mb-2">{c.title}</h3>
              <p>{c.text}</p>
            </div>
          </motion.div>
        ))}
      </motion.section>
      <CategoriesScroll />
      <EssentialGrocerySection />
      <section className="bg-white py-12 px-6 md:px-15">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center md:space-x-12">

          {/* Left Image */}
          <div className="md:w-1/2 w-full mb-8 md:mb-0 relative h-64 md:h-96">
            <Image
              src="/Fresh & Healthy Meals.jpg"
              alt="Delicious Food"
              fill
              className="rounded-lg object-cover shadow-lg"
            />
          </div>

          {/* Right Content */}
          <div className="md:w-1/2 w-full text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Fresh & Healthy Meals</h2>
            <p className="text-gray-600 mb-6">
              Our Fresh & Healthy Meals are carefully curated to bring you the perfect balance of taste and nutrition. Made with high-quality ingredients and sourced with care, every product is selected to ensure freshness, rich flavor, and wholesome goodness in every bite. We focus on delivering options that support a balanced lifestyle while maintaining the authentic taste you love.
            </p>

            <p className="text-gray-600 mb-6">
              Whether you're preparing everyday meals or choosing healthier options for your family, we make it simple to enjoy nutritious food without compromising on quality or convenience. From thoughtfully chosen ingredients to dependable freshness, our collection is designed to help you serve meals that are both satisfying and nourishing, every single day.
            </p>
            <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition">
              Shop Now
            </button>
          </div>

        </div>
      </section>
      <MostSellingProducts />
      <ShopByNeeds/>
    </>
  )
}

export default page