"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";

const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    return parseFloat(String(priceStr).replace(/[^0-9.]/g, "")) || 0;
};

export default function CartPage() {
    const { cartItems, removeFromCart, updateCount } = useCart();

    const subtotal = cartItems.reduce(
        (sum, item) => sum + parsePrice(item.price) * item.count,
        0
    );
    const shipping = cartItems.length > 0 ? 40 : 0;
    const total = subtotal + shipping;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-6">
                <div className="bg-[var(--primary)]/10 rounded-full p-8">
                    <ShoppingBag size={64} className="text-[var(--primary)] opacity-60" />
                </div>
                <h2 className="text-2xl font-bold">Your cart is empty</h2>
                <p className="text-gray-500 text-center">
                    Looks like you haven't added anything yet. Start shopping!
                </p>
                <Link href="/shop">
                    <button className="primary-btn px-8 py-3 rounded-xl flex items-center gap-2">
                        <ArrowLeft size={18} />
                        Browse Products
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
                        <ArrowLeft size={16} />
                        Continue Shopping
                    </button>
                </Link>
                <span className="opacity-30">/</span>
                <h1 className="text-2xl font-bold">
                    My Cart{" "}
                    <span className="text-[var(--primary)] text-lg font-normal">
                        ({cartItems.length} item{cartItems.length !== 1 ? "s" : ""})
                    </span>
                </h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="flex-1 flex flex-col gap-4">
                    {cartItems.map((item) => (
                        <div
                            key={`${item.id}-${item.selectedQuantity}`}
                            className="bg-[var(--primary)]/5 rounded-2xl p-4 shadow-sm border border-[var(--primary)]/10 hover:border-[var(--primary)]/30 transition"
                        >
                            <div className="flex justify-center md:items-center just gap-4">

                                {/* Image */}
                                <div className="relative w-20 h-20 flex-shrink-0 bg-[var(--secondary)]/40 rounded-xl overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-contain p-1"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-sm text-gray-500 mt-0.5">
                                        Qty: {item.selectedQuantity}
                                    </p>
                                    <p className="text-[var(--primary)] font-bold mt-1">{item.price}</p>

                                    {/* Mobile Controls */}
                                    <div className="flex items-center justify-between mt-3 md:hidden">

                                        {/* Counter */}
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateCount(item.id, item.selectedQuantity, -1)}
                                                className="w-8 h-8 rounded-lg border border-[var(--primary)]/30 flex items-center justify-center"
                                            >
                                                <Minus size={14} />
                                            </button>

                                            <span className="w-6 text-center font-semibold">{item.count}</span>

                                            <button
                                                onClick={() => updateCount(item.id, item.selectedQuantity, 1)}
                                                className="w-8 h-8 rounded-lg border border-[var(--primary)]/30 flex items-center justify-center"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>

                                        {/* Price */}
                                        <p className="font-bold">
                                            ₹{(parsePrice(item.price) * item.count).toFixed(2)}
                                        </p>

                                        {/* Delete */}
                                        <button
                                            onClick={() => removeFromCart(item.id, item.selectedQuantity)}
                                            className="p-2 rounded-lg text-red-400 hover:bg-red-50"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>

                                {/* Desktop Controls */}
                                <div className="hidden md:flex items-center gap-6">

                                    {/* Counter */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => updateCount(item.id, item.selectedQuantity, -1)}
                                            className="w-8 h-8 rounded-lg border border-[var(--primary)]/30 flex items-center justify-center"
                                        >
                                            <Minus size={14} />
                                        </button>

                                        <span className="w-6 text-center font-semibold">{item.count}</span>

                                        <button
                                            onClick={() => updateCount(item.id, item.selectedQuantity, 1)}
                                            className="w-8 h-8 rounded-lg border border-[var(--primary)]/30 flex items-center justify-center"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>

                                    {/* Price */}
                                    <p className="font-bold w-20 text-right">
                                        ₹{(parsePrice(item.price) * item.count).toFixed(2)}
                                    </p>

                                    {/* Delete */}
                                    <button
                                        onClick={() => removeFromCart(item.id, item.selectedQuantity)}
                                        className="p-2 rounded-lg text-red-400 hover:bg-red-50"
                                    >
                                        <Trash2 size={18} />
                                    </button>

                                </div>

                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:w-80 flex-shrink-0">
                    <div className="bg-[var(--primary)]/5 rounded-2xl p-6 shadow-sm border border-[var(--primary)]/10 sticky top-6">
                        <h2 className="text-lg font-bold mb-4">Order Summary</h2>

                        <div className="flex flex-col gap-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Subtotal</span>
                                <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Shipping</span>
                                <span className="font-medium">₹{shipping.toFixed(2)}</span>
                            </div>
                            <div className="h-px bg-gray-100 my-1" />
                            <div className="flex justify-between text-base font-bold">
                                <span>Total</span>
                                <span className="text-[var(--primary)]">₹{total.toFixed(2)}</span>
                            </div>
                        </div>

                        <Link href="/checkout">
                            <button className="primary-btn w-full mt-6 py-3 rounded-xl font-semibold">
                                Proceed to Checkout
                            </button>
                        </Link>

                        <Link href="/shop">
                            <button className="w-full mt-3 py-3 rounded-xl border border-[var(--primary)]/30 text-sm hover:bg-[var(--primary)]/5 transition">
                                Add More Items
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}