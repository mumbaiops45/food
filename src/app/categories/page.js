"use client";

import Link from "next/link";
import { ChevronRight, Leaf, ShoppingBasket } from "lucide-react";
import Image from "next/image";

const CATEGORIES = [
    {
        slug: "fruits-vegetables",
        label: "Fruits & Vegetables",
        description: "Farm-fresh produce delivered straight from trusted farms. Handpicked daily for maximum freshness, nutrition, and flavour.",
        image: "/shop/Fruits.avif",
        icon: "🥦",
        color: "from-emerald-400 to-green-300",
        bg: "",
        border: "border-emerald-200",
        count: 20,
        subCategories: [
            {
                slug: "fruits",
                label: "Fresh Fruits",
                image: "/shop/Fruits.avif",
                icon: "/CATEGORIES/fruits.png",
                desc: "Seasonal & exotic fruits sourced from the finest orchards across India.",
                count: 10,
                highlights: ["Apples", "Mangoes", "Strawberries", "Kiwi"],
                color: "from-green-100 to-emerald-50",
                border: "border-red-200",
                accent: "green",
            },
            {
                slug: "vegetables",
                label: "Fresh Vegetables",
                image: "/shop/Vegetables.jpg",
                icon: "/CATEGORIES/Vegetables.webp",
                desc: "Crisp, pesticide-tested vegetables for everyday healthy cooking.",
                count: 10,
                highlights: ["Tomatoes", "Potatoes", "Spinach", "Capsicum"],
                color: "from-green-100 to-emerald-50",
                border: "border-green-200",
                accent: "green",
            },
        ],
    },
    {
        slug: "dairy",
        label: "Dairy",
        description: "Pure, pasteurised dairy products from trusted co-operatives and local farms. Fresh milk, artisan cheeses, and more.",
        image: "/shop/Milk.jpg",
        icon: "🥛",
        color: "from-sky-400 to-blue-300",
        bg: "",
        border: "border-sky-200",
        count: 10,
        subCategories: [
            {
                slug: "milk",
                label: "Milk",
                image: "/shop/Milk.jpg",
                icon: "/CATEGORIES/milk.png",
                desc: "Fresh full-cream, toned, and A2 cow milk from verified dairy farms.",
                count: 5,
                highlights: ["Amul Milk", "Mother Dairy", "Cow Milk", "Buffalo Milk"],
                color: "from-green-100 to-emerald-50",
                border: "border-blue-200",
                accent: "green",
            },
            {
                slug: "cheese",
                label: "Cheese",
                image: "/shop/Cheese.jpg",
                icon: "/CATEGORIES/cheese.png",
                desc: "Premium cheddar, mozzarella, slices & spreads for every craving.",
                count: 5,
                highlights: ["Cheddar", "Mozzarella", "Cheese Slices", "Cheese Spread"],
                color: "from-green-100 to-emerald-50",
                border: "border-yellow-200",
                accent: "green",
            },
        ],
    },
    {
        slug: "snacks",
        label: "Snacks",
        description: "From crispy chips to indulgent biscuits — your favourite munchies for every mood, movie, and chai-time moment.",
        image: "/shop/Chips.jpg",
        icon: "🍟",
        color: "from-orange-400 to-amber-300",
        bg: "",
        border: "border-orange-200",
        count: 10,
        subCategories: [
            {
                slug: "chips",
                label: "Chips",
                image: "/shop/Chips.jpg",
                icon: "/CATEGORIES/chips.png",
                desc: "Lays, Doritos, Pringles & more — the crunchiest selection on the shelf.",
                count: 5,
                highlights: ["Lays Classic", "Lays Masala", "Doritos", "Pringles"],
                color: "from-green-100 to-emerald-50",
                border: "border-orange-200",
                accent: "green",
            },
            {
                slug: "biscuits",
                label: "Biscuits",
                image: "/shop/Biscuits.jpg",
                icon: "/CATEGORIES/biscuits.png",
                desc: "Parle-G, Oreo, Good Day & more — biscuits for every tea-time mood.",
                count: 5,
                highlights: ["Parle-G", "Oreo", "Good Day", "Hide & Seek"],
                color: "from-green-100 to-emerald-50",
                border: "border-yellow-200",
                accent: "green",
            },
        ],
    },
    {
        slug: "beverages",
        label: "Beverages",
        description: "Stay refreshed with cold-pressed juices, fizzy drinks, and tropical sips. The perfect drink for every occasion.",
        image: "/shop/Juices.avif",
        icon: "🧃",
        color: "from-violet-400 to-purple-300",
        bg: "from-green-100 to-emerald-50",
        border: "border-violet-200",
        count: 10,
        subCategories: [
            {
                slug: "juices",
                label: "Juices",
                image: "/shop/Juices.avif",
                icon: "/CATEGORIES/juices.png",
                desc: "Dabur Real, Tropicana, Paper Boat & more — no artificial additives.",
                count: 5,
                highlights: ["Real Orange", "Real Mango", "Tropicana", "Paper Boat"],
                color: "from-green-100 to-emerald-50",
                border: "border-orange-200",
                accent: "green",
            },
            {
                slug: "soft-drinks",
                label: "Soft Drinks",
                image: "/shop/Soft Drinks.avif",
                icon: "/CATEGORIES/soft-drinks.png",
                desc: "Chilled Coke, Pepsi, Sprite & more — instant fizzy refreshment.",
                count: 5,
                highlights: ["Coca Cola", "Pepsi", "Sprite", "Mountain Dew"],
                color: "from-green-100 to-emerald-50",
                border: "border-violet-200",
                accent: "green",
            },
        ],
    },
    {
        slug: "grains",
        label: "Grains",
        description: "Premium staples that feed India every day — from fragrant basmati to wholesome multigrain atta, sourced from the finest farms.",
        image: "/shop/Rice.jpg",
        icon: "🌾",
        color: "from-yellow-400 to-amber-300",
        bg: "from-green-100 to-emerald-50",
        border: "border-yellow-200",
        count: 10,
        subCategories: [
            {
                slug: "rice",
                label: "Rice",
                image: "/shop/Rice.jpg",
                icon: "/CATEGORIES/rice.webp",
                desc: "Aged Basmati, Sona Masoori, Brown Rice & more for every palate.",
                count: 5,
                highlights: ["Basmati Rice", "Sona Masoori", "Brown Rice", "Jasmine Rice"],
                color: "from-green-100 to-emerald-50",
                border: "border-yellow-200",
                accent: "green",
            },
            {
                slug: "wheat",
                label: "Wheat & Atta",
                image: "/shop/Wheat.jpg",
                icon: "/CATEGORIES/wheat.png",
                desc: "Aashirvaad, Fortune, Patanjali & organic atta for softest rotis.",
                count: 5,
                highlights: ["Aashirvaad Atta", "Fortune Atta", "Multigrain Atta", "Organic Atta"],
                color: "from-green-100 to-emerald-50",
                border: "border-amber-200",
                accent: "green",
            },
        ],
    },
   
{
    slug: "bakery",
    label: "Bakery",
    description: "Freshly baked breads and delicious cakes made with quality ingredients for breakfast, snacks, and celebrations.",
    image: "/shop/Bakery.jpg",
    icon: "🍞",
    color: "from-orange-400 to-amber-300",
    bg: "",
    border: "border-orange-200",
    count: 10,
    subCategories: [
        {
            slug: "bread",
            label: "Bread",
            image: "/shop/Bread.jpg",
            icon: "/CATEGORIES/Bread.png",
            desc: "Fresh breads including white, brown, multigrain and garlic bread.",
            count: 5,
            highlights: ["Brown Bread", "White Bread", "Multigrain Bread", "Garlic Bread"],
            color: "from-green-100 to-emerald-50",
            border: "border-orange-200",
            accent: "green",
        },
        {
            slug: "cakes",
            label: "Cakes",
            image: "/shop/Cakes.jpg",
            icon: "/CATEGORIES/Cakes.png",
            desc: "Fresh cream cakes perfect for desserts, parties, and celebrations.",
            count: 5,
            highlights: ["Chocolate Cake", "Vanilla Cake", "Black Forest", "Strawberry Cake"],
            color: "from-green-100 to-emerald-50",
            border: "border-pink-200",
            accent: "green",
        },
    ],
},

{
    slug: "frozen-foods",
    label: "Frozen Foods",
    description: "Convenient frozen treats and snacks including ice creams, fries, nuggets, and quick-cook favourites.",
    image: "/shop/Frozen.jpg",
    icon: "❄️",
    color: "from-blue-400 to-cyan-300",
    bg: "",
    border: "border-blue-200",
    count: 10,
    subCategories: [
        {
            slug: "ice-cream",
            label: "Ice Cream",
            image: "/shop/Icecream.jpg",
            icon: "/CATEGORIES/Ice Cream.png",
            desc: "Creamy ice creams in classic flavours like vanilla, chocolate, and mango.",
            count: 5,
            highlights: ["Vanilla", "Chocolate", "Strawberry", "Butterscotch"],
            color: "from-green-100 to-emerald-50",
            border: "border-blue-200",
            accent: "green",
        },
        {
            slug: "frozen-snacks",
            label: "Frozen Snacks",
            image: "/shop/Frozen Snacks.jpg",
            icon: "/CATEGORIES/frozen-snacks.webp",
            desc: "Quick frozen snacks like fries, nuggets, spring rolls, and momos.",
            count: 5,
            highlights: ["French Fries", "Veg Momos", "Chicken Nuggets", "Spring Rolls"],
            color: "from-green-100 to-emerald-50",
            border: "border-cyan-200",
            accent: "green",
        },
    ],
},
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function CategoriesPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-[var(--secondary)] via-white to-[var(--secondary)]/40">

            {/* ── Hero ── */}
            <section className="relative overflow-hidden px-6 md:px-16 pt-14 pb-12">
                <div className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[var(--primary)]/10 blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 -left-10 w-60 h-60 rounded-full bg-emerald-300/10 blur-2xl" />

                <div className="relative z-10 max-w-2xl">
                    <span className="inline-flex items-center gap-1.5 bg-[var(--primary)]/15 text-[var(--primary)] text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
                        <ShoppingBasket size={13} /> All Categories
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
                        Shop by <span className="text-[var(--primary)]">Category</span>
                    </h1>
                    <p className="mt-3 text-gray-500 max-w-lg text-base">
                        Browse our full range of fresh groceries, dairy, snacks, beverages, and daily staples — all carefully sourced for quality and freshness.
                    </p>
                </div>

                {/* Category pill quick-links */}
                <div className="relative z-10 flex flex-wrap gap-3 mt-8">
                    {CATEGORIES.map((cat) => (
                        <a key={cat.slug} href={`#${cat.slug}`}
                            className="flex items-center gap-2 px-4 py-2 bg-white/70 border border-[var(--primary)]/20 rounded-full text-sm font-semibold text-gray-700 hover:bg-[var(--primary)]/10 transition backdrop-blur-sm">
                            <span>{cat.icon}</span> {cat.label}
                        </a>
                    ))}
                </div>
            </section>

            {/* ── Category Sections ── */}
            <div className="px-6 md:px-16 pb-20 flex flex-col gap-20">
                {CATEGORIES.map((cat) => (
                    <section key={cat.slug} id={cat.slug}>

                        {/* ── Category Header Card ── */}
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
                                <span className="text-[var(--primary)]">{cat.slug}</span>
                            </h2>
                            <Link href={"/shop"}>
                                <button className="primary-btn w-fit rounded-xl px-4 py-2 flex items-center justify-center gap-2">
                                    View All
                                </button>
                            </Link>

                        </div>

                        {/* ── SubCategory Cards ── */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {cat.subCategories.map((sub) => (
                                <div
                                    key={sub.slug}
                                    className={`group relative bg-gradient-to-br ${sub.color} border ${sub.border} rounded-2xl overflow-hidden  transition-all duration-300 `}
                                >
                                    {/* background image faint */}
                                    <div className="absolute inset-0 opacity-[0.07]">
                                        <img src={sub.image} alt="" className="w-full h-full object-cover" />
                                    </div>

                                    <div className="relative z-10 p-6 flex flex-col gap-4">
                                        {/* Top row */}
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <span>
                                                    <Image
                                                        src={sub.icon}
                                                        alt={sub.slug}
                                                        width={40}
                                                        height={40}
                                                    />
                                                </span>
                                                <div>
                                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{sub.count} Products</p>
                                                    <h3 className="text-xl font-extrabold text-gray-900">{sub.label}</h3>
                                                </div>
                                            </div>
                                            <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/60 shadow-sm flex-shrink-0">

                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-sm text-gray-600 leading-relaxed">{sub.desc}</p>

                                        {/* Highlights */}
                                        <div className="flex flex-wrap gap-2">
                                            {sub.highlights.map((h) => (
                                                <span
                                                    key={h}
                                                    className="text-[11px] font-semibold px-3 py-1 rounded-full bg-white/70 border border-white/80 text-gray-700 flex items-center gap-1"
                                                >
                                                    <Leaf size={10} style={{ color: sub.accent }} /> {h}
                                                </span>
                                            ))}
                                        </div>

                                        {/* CTA */}
                                        <Link
                                            href={`/shop/${sub.slug}`}
                                            className="self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:opacity-90  primary-btn"
                                            style={{ backgroundColor: sub.accent }}
                                        >
                                            View All {sub.label} <ChevronRight size={15} />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </section>
                ))}
            </div>

        </main>
    );
}