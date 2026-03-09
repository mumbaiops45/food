"use client";

import { useState, useEffect, useRef } from "react";
import { allProducts } from "@/data/product";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Clock, Tag, Zap, Gift, ChevronRight, Copy, Check } from "lucide-react";

// ─── Offer Data ───────────────────────────────────────────────────────────────
const COUPONS = [
  { code: "FRESH20",  discount: "20% OFF",  desc: "On all Fruits & Vegetables",  color: "#4ade80", bg: "from-green-400/20 to-emerald-300/10",  category: "fruits-vegetables" },
  { code: "DAIRY15",  discount: "15% OFF",  desc: "On Dairy products",            color: "#60a5fa", bg: "from-blue-400/20 to-sky-300/10",        category: "dairy" },
  { code: "SNACK30",  discount: "30% OFF",  desc: "On all Snacks",               color: "#f97316", bg: "from-orange-400/20 to-amber-300/10",     category: "snacks" },
  { code: "SIPS10",   discount: "10% OFF",  desc: "On Beverages",                color: "#a78bfa", bg: "from-violet-400/20 to-purple-300/10",    category: "beverages" },
  { code: "GRAIN25",  discount: "25% OFF",  desc: "On Grains & Staples",         color: "#fbbf24", bg: "from-yellow-400/20 to-amber-300/10",     category: "grains" },
  { code: "FIRST50",  discount: "₹50 OFF",  desc: "On your first order above ₹299", color: "#f43f5e", bg: "from-rose-400/20 to-pink-300/10",   category: null },
];

const FLASH_DEALS = [
  { id: 1,  label: "Flash Deal" },
  { id: 9,  label: "Hot Pick" },
  { id: 36, label: "Best Value" },
  { id: 46, label: "Fan Fav" },
  { id: 21, label: "Daily Deal" },
  { id: 31, label: "Trending" },
];

const BANNERS = [
  {
    tag: "Weekend Special",
    title: "Buy 2 Get 1 Free",
    sub: "On all fresh fruits this weekend",
    link: "/shop/fruits",
    gradient: "from-emerald-500 to-teal-400",
    icon: "🍉",
  },
  {
    tag: "Member Exclusive",
    title: "Free Delivery",
    sub: "On orders above ₹499 — today only",
    link: "/shop",
    gradient: "from-violet-500 to-indigo-400",
    icon: "🚚",
  },
  {
    tag: "Combo Saver",
    title: "Snacks + Drinks",
    sub: "Save ₹80 on any combo pack",
    link: "/shop/snacks",
    gradient: "from-orange-500 to-amber-400",
    icon: "🎉",
  },
];

// countdown target: next midnight
function getSecondsUntilMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return Math.floor((midnight - now) / 1000);
}

function useCountdown(initial) {
  const [secs, setSecs] = useState(initial);
  useEffect(() => {
    const t = setInterval(() => setSecs((s) => (s <= 0 ? 0 : s - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  const h = String(Math.floor(secs / 3600)).padStart(2, "0");
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  return { h, m, s };
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function OffersPage() {
  const [copiedCode, setCopiedCode] = useState(null);
  const [activeBanner, setActiveBanner] = useState(0);
  const { h, m, s } = useCountdown(getSecondsUntilMidnight());

  // auto-rotate banners
  useEffect(() => {
    const t = setInterval(() => setActiveBanner((p) => (p + 1) % BANNERS.length), 3500);
    return () => clearInterval(t);
  }, []);

  const flashProducts = FLASH_DEALS.map(({ id, label }) => ({
    ...allProducts.find((p) => p.id === id),
    label,
  })).filter(Boolean);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const parsePrice = (str) => parseFloat(String(str).replace(/[^0-9.]/g, "")) || 0;
  const discountedPrice = (str, pct) => {
    const base = parsePrice(str);
    return Math.round(base * (1 - pct / 100));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[var(--secondary)] via-white to-[var(--secondary)]/40">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-6 md:px-16 pt-14 pb-10">
        {/* decorative blobs */}
        <div className="pointer-events-none absolute -top-16 -right-16 w-72 h-72 rounded-full bg-[var(--primary)]/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-56 h-56 rounded-full bg-emerald-400/10 blur-2xl" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-[var(--primary)]/15 text-[var(--primary)] text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
              <Zap size={13} fill="currentColor" /> Today&apos;s Offers
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
              Big Savings,<br />
              <span className="text-[var(--primary)]">Fresh Deals</span>
            </h1>
            <p className="mt-3 text-gray-500 max-w-md">
              Handpicked discounts on your everyday groceries. New offers drop daily — grab them before they&apos;re gone.
            </p>
            <Link href="/shop" className="mt-6 primary-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold">
              Shop All Deals <ChevronRight size={18} />
            </Link>
          </div>

          {/* Countdown Timer */}
          <div className="bg-white/70 backdrop-blur-md border border-[var(--primary)]/20 rounded-2xl p-6 shadow-xl flex flex-col items-center gap-2 min-w-[220px]">
            <span className="flex items-center gap-1.5 text-xs text-gray-400 uppercase tracking-widest font-semibold">
              <Clock size={13} /> Deals reset in
            </span>
            <div className="flex gap-3 mt-1">
              {[{ val: h, label: "Hrs" }, { val: m, label: "Min" }, { val: s, label: "Sec" }].map(({ val, label }) => (
                <div key={label} className="flex flex-col items-center">
                  <span className="text-3xl font-black text-[var(--primary)] tabular-nums">{val}</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Rotating Promo Banners ── */}
      <section className="px-6 md:px-16 mb-10">
        <div className="relative h-36 overflow-hidden rounded-2xl">
          {BANNERS.map((b, i) => (
            <div
              key={i}
              className={`absolute inset-0 bg-gradient-to-r ${b.gradient} flex items-center justify-between px-8 transition-all duration-700 ${i === activeBanner ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"}`}
            >
              <div>
                <span className="text-white/70 text-xs font-semibold uppercase tracking-widest">{b.tag}</span>
                <h2 className="text-white text-2xl md:text-3xl font-black mt-0.5">{b.title}</h2>
                <p className="text-white/80 text-sm mt-1">{b.sub}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-5xl">{b.icon}</span>
                <Link href={b.link} className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-sm font-semibold transition backdrop-blur-sm">
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
          {/* dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {BANNERS.map((_, i) => (
              <button key={i} onClick={() => setActiveBanner(i)}
                className={`rounded-full bg-white transition-all duration-300 ${i === activeBanner ? "w-6 h-2" : "w-2 h-2 opacity-50"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Coupon Codes ── */}
      <section className="px-6 md:px-16 mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Tag size={20} className="text-[var(--primary)]" />
          <h2 className="text-xl font-bold">Coupon Codes</h2>
          <span className="text-xs text-gray-400 ml-auto">Click to copy</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COUPONS.map((c) => (
            <button
              key={c.code}
              onClick={() => copyCode(c.code)}
              className={`relative group bg-gradient-to-br ${c.bg} border border-white/60 rounded-2xl p-5 text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-lg backdrop-blur-sm overflow-hidden`}
            >
              {/* dashed right edge (ticket feel) */}
              <div className="absolute right-14 top-0 bottom-0 border-dashed border-r-2 border-white/40" />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/30 flex items-center justify-center">
                {copiedCode === c.code
                  ? <Check size={16} className="text-green-600" />
                  : <Copy size={14} className="text-gray-500 group-hover:text-gray-700 transition" />
                }
              </div>

              <span className="text-2xl font-black tracking-tight" style={{ color: c.color }}>{c.discount}</span>
              <p className="text-sm font-semibold text-gray-700 mt-0.5">{c.desc}</p>

              <div className="mt-3 inline-block bg-white/60 backdrop-blur-sm rounded-lg px-3 py-1 font-mono text-sm font-bold text-gray-800 tracking-widest border border-white/80">
                {c.code}
              </div>

              {copiedCode === c.code && (
                <span className="absolute top-3 right-3 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Copied!</span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* ── Flash Deals Products ── */}
      <section className="px-6 md:px-16 mb-16">
        <div className="flex items-center gap-3 mb-6">
          <Zap size={20} className="text-orange-500" fill="currentColor" />
          <h2 className="text-xl font-bold">Flash Deals</h2>
          <span className="ml-2 bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
            Limited Time
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {flashProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white/70 backdrop-blur-sm border border-[var(--primary)]/15 rounded-2xl p-4 flex flex-col items-center gap-2 hover:scale-105 hover:shadow-xl transition-all duration-300 group"
            >
              {/* badge */}
              <span className="self-start bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                {p.label}
              </span>

              <div className="relative w-20 h-20">
                <Image src={p.image} alt={p.name} fill className="object-contain" />
              </div>

              <p className="text-xs font-semibold text-center text-gray-800 leading-tight">{p.name}</p>

              <div className="w-full flex flex-col items-center gap-0.5">
                <span className="text-[10px] text-gray-400 line-through">{p.price}</span>
                <span className="font-black text-[var(--primary)]">
                  ₹{discountedPrice(p.price, 20)}
                </span>
                <span className="text-[10px] text-green-600 font-semibold">Save 20%</span>
              </div>

              <button className="w-full primary-btn rounded-xl py-1.5 text-xs flex items-center justify-center gap-1 mt-auto">
                <ShoppingCart size={12} /> Add
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── Category Deals ── */}
      <section className="px-6 md:px-16 mb-16">
        <div className="flex items-center gap-3 mb-6">
          <Gift size={20} className="text-[var(--primary)]" />
          <h2 className="text-xl font-bold">Shop by Category Deals</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { slug: "fruits-vegetables", label: "Fruits & Veg",  icon: "🥦", off: "20%", color: "from-green-100 to-emerald-50",   border: "border-green-200" },
            { slug: "dairy",             label: "Dairy",          icon: "🥛", off: "15%", color: "from-blue-100 to-sky-50",        border: "border-blue-200" },
            { slug: "snacks",            label: "Snacks",         icon: "🍟", off: "30%", color: "from-orange-100 to-amber-50",    border: "border-orange-200" },
            { slug: "beverages",         label: "Beverages",      icon: "🧃", off: "10%", color: "from-violet-100 to-purple-50",   border: "border-violet-200" },
            { slug: "grains",            label: "Grains",         icon: "🌾", off: "25%", color: "from-yellow-100 to-amber-50",    border: "border-yellow-200" },
          ].map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop/${cat.slug}`}
              className={`bg-gradient-to-b ${cat.color} border ${cat.border} rounded-2xl p-5 flex flex-col items-center gap-2 hover:scale-105 hover:shadow-lg transition-all duration-300 group`}
            >
              <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{cat.icon}</span>
              <span className="font-bold text-gray-800 text-sm">{cat.label}</span>
              <span className="bg-white/80 border border-white text-xs font-black text-gray-700 px-3 py-1 rounded-full shadow-sm">
                Up to {cat.off} OFF
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Terms Strip ── */}
      <section className="px-6 md:px-16 pb-14">
        <div className="bg-white/50 border border-gray-200 rounded-xl px-6 py-4 text-xs text-gray-400 text-center">
          *Offers valid for a limited time only. Coupons cannot be clubbed with other offers. Prices & discounts subject to change without notice.
          <Link href="/shop" className="ml-2 text-[var(--primary)] font-semibold hover:underline">Browse all products →</Link>
        </div>
      </section>

    </main>
  );
}