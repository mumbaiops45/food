"use client";

import { useState } from "react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2, ShoppingCart, ArrowLeft, Check } from "lucide-react";

export default function WishlistPage() {
    const { wishlistItems, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();
    const [addedMap, setAddedMap] = useState({});
    const [selectedQuantities, setSelectedQuantities] = useState({});

    const getSelectedQty = (product) =>
        selectedQuantities[product.id] ?? product.quantities?.[0] ?? "";

    const handleAddToCart = (product) => {
        const qty = getSelectedQty(product);
        addToCart(product, qty);
        setAddedMap((prev) => ({ ...prev, [product.id]: true }));
        setTimeout(() =>
            setAddedMap((prev) => ({ ...prev, [product.id]: false })), 1500
        );
    };

    /* ── Empty State ── */
    if (wishlistItems.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-6">
                <div className="bg-[var(--primary)]/10 rounded-full p-8">
                    <Heart size={64} className="text-[var(--primary)] opacity-50" />
                </div>
                <h2 className="text-2xl font-bold">Your wishlist is empty</h2>
                <p className="text-gray-500 text-center">
                    Save products you love by clicking the heart icon on any product.
                </p>
                <Link href="/shop">
                    <button className="primary-btn px-8 py-3 rounded-xl flex items-center gap-2">
                        <ArrowLeft size={18} /> Browse Products
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <section className="px-6 md:px-16 py-10 min-h-screen bg-gradient-to-br from-[var(--secondary)]/30 to-transparent">

            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <Link href="/shop">
                    <button className="flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition">
                        <ArrowLeft size={16} /> Continue Shopping
                    </button>
                </Link>
                <span className="opacity-30">/</span>
                <h1 className="text-2xl font-bold">
                    My Wishlist{" "}
                    <span className="text-[var(--primary)] text-lg font-normal">
                        ({wishlistItems.length} item{wishlistItems.length !== 1 ? "s" : ""})
                    </span>
                </h1>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {wishlistItems.map((p) => (
                    <div
                        key={p.id}
                        className="bg-white rounded-2xl border border-[var(--primary)]/10 hover:border-[var(--primary)]/30 shadow-sm p-4 flex flex-col transition-all duration-300 hover:shadow-md"
                    >
                        {/* Image */}
                        <div className="relative w-full h-36 bg-[var(--secondary)]/40 rounded-xl overflow-hidden mb-3 flex-shrink-0">
                            <Image
                                src={p.image}
                                alt={p.name}
                                fill
                                className="object-contain p-2 transition-transform duration-300 hover:scale-105"
                            />
                            {/* Remove from wishlist */}
                            <button
                                onClick={() => removeFromWishlist(p.id)}
                                className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow hover:bg-red-50 transition group"
                                title="Remove from wishlist"
                            >
                                <Heart size={16} className="text-red-400 fill-red-400 group-hover:fill-red-500" />
                            </button>
                        </div>

                        {/* Name */}
                        <h3 className="font-semibold text-sm text-center mb-2 leading-tight">{p.name}</h3>

                        {/* Quantity selector */}
                        <select
                            className="border rounded-lg px-2 py-1.5 w-full text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
                            value={getSelectedQty(p)}
                            onChange={(e) =>
                                setSelectedQuantities((prev) => ({ ...prev, [p.id]: e.target.value }))
                            }
                        >
                            {p.quantities?.map((q) => (
                                <option key={q} value={q}>{q}</option>
                            ))}
                        </select>

                        {/* Price */}
                        <span className="font-bold text-sm mb-3">{p.price}</span>

                        {/* Actions */}
                        <div className="flex flex-col gap-2 mt-auto">
                            <button
                                onClick={() => handleAddToCart(p)}
                                className={`primary-btn rounded-xl px-3 py-2 flex items-center justify-center gap-2 text-sm transition-all ${addedMap[p.id] ? "opacity-80 scale-95" : ""}`}
                            >
                                {addedMap[p.id] ? (
                                    <><Check size={15} /> Added!</>
                                ) : (
                                    <><ShoppingCart size={15} /> Add to Cart</>
                                )}
                            </button>

                            <Link href={`/product/${p.id}`} className="w-full">
                                <button className="w-full secondary-btn rounded-xl px-3 py-2 text-sm flex items-center justify-center">
                                    View Product
                                </button>
                            </Link>

                            <button
                                onClick={() => removeFromWishlist(p.id)}
                                className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-xs text-red-400 hover:bg-red-50 transition"
                            >
                                <Trash2 size={13} /> Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}