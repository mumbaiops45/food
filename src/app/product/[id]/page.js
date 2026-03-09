"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { allProducts } from "@/data/product";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart, Star, StarHalf, ArrowLeft, ChevronRight,
  ShieldCheck, Truck, RefreshCw, Leaf, Heart, Share2, Minus, Plus
} from "lucide-react";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const parsePrice = (str) => parseFloat(String(str).replace(/[^0-9.]/g, "")) || 0;

const categoryLabels = {
  "fruits-vegetables": "Fruits & Vegetables",
  "dairy":    "Dairy",
  "snacks":   "Snacks",
  "beverages":"Beverages",
  "grains":   "Grains",
};

function StarRating({ rating }) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <div className="flex items-center gap-0.5">
      {Array(full).fill(0).map((_, i) => <Star  key={`f${i}`} size={16} className="text-amber-400 fill-amber-400" />)}
      {half &&                             <StarHalf              size={16} className="text-amber-400 fill-amber-400" />}
      {Array(empty).fill(0).map((_, i) => <Star  key={`e${i}`} size={16} className="text-gray-200 fill-gray-200" />)}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProductPage() {
  const params  = useParams();
  const id      = Number(params?.id);
  const product = allProducts.find((p) => p.id === id);

  const [selectedQty, setSelectedQty]   = useState(0);
  const [cartQty, setCartQty]           = useState(1);
  const [addedToCart, setAddedToCart]   = useState(false);
  const [wishlisted, setWishlisted]     = useState(false);

  // related products (same subCategory, exclude self)
  const related = useMemo(
    () => allProducts.filter((p) => p.subCategory === product?.subCategory && p.id !== id).slice(0, 4),
    [id, product]
  );

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-6">
        <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
        <p className="text-gray-400">We couldn't find a product with ID #{id}.</p>
        <Link href="/shop" className="primary-btn px-6 py-2.5 rounded-xl">← Back to Shop</Link>
      </div>
    );
  }

  const basePrice    = parsePrice(product.price);
  const unitLabel    = product.quantities[selectedQty];
  const discountedPrice = Math.round(basePrice * 0.95); // small 5% online-exclusive discount

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[var(--secondary)] via-white to-[var(--secondary)]/40">

      {/* ── Breadcrumb ── */}
      <nav className="px-6 md:px-16 pt-6 flex items-center gap-2 text-sm text-gray-400 flex-wrap">
        <Link href="/"    className="hover:text-[var(--primary)] transition">Home</Link>
        <ChevronRight size={14} />
        <Link href="/shop" className="hover:text-[var(--primary)] transition">Shop</Link>
        <ChevronRight size={14} />
        <Link href={`/shop/${product.category}`} className="hover:text-[var(--primary)] transition capitalize">
          {categoryLabels[product.category] || product.category}
        </Link>
        <ChevronRight size={14} />
        <Link href={`/shop/${product.subCategory}`} className="hover:text-[var(--primary)] transition capitalize">
          {product.subCategory}
        </Link>
        <ChevronRight size={14} />
        <span className="text-gray-700 font-medium truncate max-w-[160px]">{product.name}</span>
      </nav>

      {/* ── Main Content ── */}
      <section className="px-6 md:px-16 py-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

        {/* Left — Image Card */}
        <div className="sticky top-6">
          <div className="relative bg-gradient-to-b from-[var(--primary)]/10 to-white/60 backdrop-blur-sm border border-[var(--primary)]/15 rounded-3xl overflow-hidden p-6 shadow-xl aspect-square flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-8 transition-transform duration-500 hover:scale-105"
              priority
            />

            {/* Wishlist btn */}
            <button
              onClick={() => setWishlisted((w) => !w)}
              className={`absolute top-4 right-4 w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                wishlisted
                  ? "bg-rose-500 border-rose-500 text-white"
                  : "bg-white/80 border-gray-200 text-gray-400 hover:text-rose-500"
              }`}
            >
              <Heart size={18} fill={wishlisted ? "currentColor" : "none"} />
            </button>

            {/* Online exclusive badge */}
            <span className="absolute top-4 left-4 bg-[var(--primary)] text-white text-[11px] font-bold px-3 py-1 rounded-full">
              5% Online Discount
            </span>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { icon: <Truck size={16} />,       label: "Free Delivery", sub: "Above ₹499" },
              { icon: <ShieldCheck size={16} />, label: "Quality Tested", sub: "Certified fresh" },
              { icon: <RefreshCw size={16} />,   label: "Easy Returns",  sub: "Within 24h" },
            ].map((b) => (
              <div key={b.label} className="bg-white/60 border border-[var(--primary)]/15 rounded-xl p-3 flex flex-col items-center text-center gap-1">
                <span className="text-[var(--primary)]">{b.icon}</span>
                <span className="text-[11px] font-bold text-gray-700">{b.label}</span>
                <span className="text-[10px] text-gray-400">{b.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Product Details */}
        <div className="flex flex-col gap-5">

          {/* Category tags */}
          <div className="flex items-center gap-2 flex-wrap">
            <Link href={`/shop/${product.category}`}
              className="text-xs font-semibold bg-[var(--primary)]/15 text-[var(--primary)] px-3 py-1 rounded-full hover:bg-[var(--primary)]/25 transition">
              {categoryLabels[product.category]}
            </Link>
            <Link href={`/shop/${product.subCategory}`}
              className="text-xs font-semibold bg-gray-100 text-gray-500 px-3 py-1 rounded-full hover:bg-gray-200 transition capitalize">
              {product.subCategory}
            </Link>
          </div>

          {/* Name */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <StarRating rating={product.rating} />
            <span className="font-bold text-gray-800">{product.rating}</span>
            <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-black text-[var(--primary)]">₹{discountedPrice}</span>
            <span className="text-xl text-gray-400 line-through">{product.price}</span>
            <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">5% OFF</span>
          </div>

          <p className="text-sm text-gray-400">per {unitLabel} · incl. of all taxes</p>

          {/* Quantity Size Selector */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Select Size / Quantity</p>
            <div className="flex flex-wrap gap-2">
              {product.quantities.map((q, i) => (
                <button
                  key={q}
                  onClick={() => setSelectedQty(i)}
                  className={`px-4 py-2 rounded-xl border text-sm font-semibold transition-all ${
                    selectedQty === i
                      ? "border-[var(--primary)] bg-[var(--primary)]/15 text-[var(--primary)]"
                      : "border-gray-200 bg-white/70 text-gray-600 hover:border-[var(--primary)]/50"
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Cart quantity stepper */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Number of Items</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCartQty((q) => Math.max(1, q - 1))}
                className="w-10 h-10 rounded-xl border border-[var(--primary)]/30 bg-white flex items-center justify-center hover:bg-[var(--primary)]/10 transition"
              >
                <Minus size={16} />
              </button>
              <span className="w-10 text-center font-black text-lg tabular-nums">{cartQty}</span>
              <button
                onClick={() => setCartQty((q) => q + 1)}
                className="w-10 h-10 rounded-xl border border-[var(--primary)]/30 bg-white flex items-center justify-center hover:bg-[var(--primary)]/10 transition"
              >
                <Plus size={16} />
              </button>
              <span className="text-sm text-gray-400 ml-1">
                Total: <span className="font-bold text-gray-800">₹{(discountedPrice * cartQty).toLocaleString()}</span>
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={handleAddToCart}
              className={`flex-1 primary-btn py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                addedToCart ? "opacity-80 scale-95" : ""
              }`}
            >
              <ShoppingCart size={18} />
              {addedToCart ? "Added to Cart ✓" : "Add to Cart"}
            </button>
            <button className="w-12 h-12 rounded-xl border border-gray-200 bg-white/60 flex items-center justify-center hover:bg-gray-50 transition">
              <Share2 size={18} className="text-gray-500" />
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Description */}
          <div>
            <h3 className="font-bold text-gray-800 mb-2">About this product</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="font-bold text-gray-800 mb-3">Highlights</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-gray-600">
                  <Leaf size={15} className="text-[var(--primary)] mt-0.5 flex-shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Product Info Table */}
          <div className="bg-white/60 border border-[var(--primary)]/15 rounded-2xl p-4">
            <h3 className="font-bold text-gray-800 mb-3 text-sm">Product Info</h3>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              {[
                { label: "Origin",    value: product.origin },
                { label: "Shelf Life",value: product.shelf },
                { label: "Category",  value: categoryLabels[product.category] },
                { label: "Sub-type",  value: product.subCategory },
              ].map(({ label, value }) => (
                <div key={label} className="contents">
                  <span className="text-gray-400 font-medium">{label}</span>
                  <span className="text-gray-700 font-semibold capitalize">{value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── Related Products ── */}
      {related.length > 0 && (
        <section className="px-6 md:px-16 pb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">You might also like</h2>
            <Link href={`/shop/${product.subCategory}`} className="text-sm text-[var(--primary)] font-semibold hover:underline flex items-center gap-1">
              View all <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.id}`}
                className="bg-white/70 backdrop-blur-sm border border-[var(--primary)]/15 rounded-2xl p-4 flex flex-col items-center gap-3 hover:scale-105 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative w-full h-28 bg-[var(--secondary)]/50 rounded-xl overflow-hidden">
                  <Image src={p.image} alt={p.name} fill className="object-contain p-2 group-hover:scale-105 transition-transform duration-300" />
                </div>
                <p className="font-semibold text-sm text-center text-gray-800">{p.name}</p>
                <div className="flex items-center gap-1.5">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  <span className="text-xs text-gray-500">{p.rating}</span>
                </div>
                <span className="font-black text-[var(--primary)]">{p.price}</span>
                <button className="w-full primary-btn rounded-xl py-2 text-xs flex items-center justify-center gap-1">
                  <ShoppingCart size={12} /> Add to Cart
                </button>
              </Link>
            ))}
          </div>
        </section>
      )}

    </main>
  );
}