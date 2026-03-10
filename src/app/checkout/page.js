"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle, ShoppingBag, MapPin, CreditCard, Truck } from "lucide-react";

const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    return parseFloat(String(priceStr).replace(/[^0-9.]/g, "")) || 0;
};

const STEPS = ["Delivery", "Payment", "Review"];

export default function CheckoutPage() {
    const { cartItems, cartCount } = useCart();
    const [step, setStep] = useState(0);
    const [placed, setPlaced] = useState(false);

    const [delivery, setDelivery] = useState({
        fullName: "", email: "", phone: "",
        address: "", city: "", state: "", pincode: "",
    });

    const [payment, setPayment] = useState({
        method: "card",
        cardNumber: "", expiry: "", cvv: "", cardName: "",
        upiId: "",
    });

    const subtotal = cartItems.reduce(
        (sum, item) => sum + parsePrice(item.price) * item.count, 0
    );
    const shipping = cartItems.length > 0 ? 40 : 0;
    const total = subtotal + shipping;

    const handleDeliveryChange = (e) =>
        setDelivery((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handlePaymentChange = (e) =>
        setPayment((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const deliveryFilled =
        delivery.fullName && delivery.email && delivery.phone &&
        delivery.address && delivery.city && delivery.state && delivery.pincode;

    const paymentFilled =
        payment.method === "card"
            ? payment.cardNumber && payment.expiry && payment.cvv && payment.cardName
            : payment.method === "upi"
                ? payment.upiId
                : true; // COD always valid

    if (cartItems.length === 0 && !placed) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-6">
                <div className="bg-[var(--primary)]/10 rounded-full p-8">
                    <ShoppingBag size={64} className="text-[var(--primary)] opacity-60" />
                </div>
                <h2 className="text-2xl font-bold">Your cart is empty</h2>
                <Link href="/shop">
                    <button className="primary-btn px-8 py-3 rounded-xl flex items-center gap-2">
                        <ArrowLeft size={18} /> Browse Products
                    </button>
                </Link>
            </div>
        );
    }

    // ── Order Placed Screen ──────────────────────────────────────────────────
    if (placed) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center gap-6 px-6 text-center">
                <div className="bg-green-50 rounded-full p-8">
                    <CheckCircle size={72} className="text-green-500" />
                </div>
                <h2 className="text-3xl font-bold">Order Placed!</h2>
                <p className="text-gray-500 max-w-sm">
                    Thank you, <strong>{delivery.fullName}</strong>! Your order has been confirmed and will be delivered to{" "}
                    <strong>{delivery.city}</strong> soon.
                </p>
                <div className="bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-2xl px-8 py-5 text-sm space-y-1">
                    <p className="font-semibold text-base mb-2">Order Summary</p>
                    <div className="flex justify-between gap-12"><span className="text-gray-500">Items</span><span>{cartCount}</span></div>
                    <div className="flex justify-between gap-12"><span className="text-gray-500">Total Paid</span><span className="font-bold text-[var(--primary)]">₹{total.toFixed(2)}</span></div>
                    <div className="flex justify-between gap-12"><span className="text-gray-500">Payment</span><span className="capitalize">{payment.method === "cod" ? "Cash on Delivery" : payment.method.toUpperCase()}</span></div>
                </div>
                <Link href="/shop">
                    <button className="primary-btn px-8 py-3 rounded-xl">
                        Continue Shopping
                    </button>
                </Link>
            </div>
        );
    }

    // ── Step Indicator ───────────────────────────────────────────────────────
    const StepBar = () => (
        <div className="flex items-center gap-0 mb-10">
            {STEPS.map((label, i) => (
                <div key={label} className="flex items-center">
                    <div className="flex flex-col items-center gap-1">
                        <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${i < step
                                    ? "bg-[var(--primary)] text-white"
                                    : i === step
                                        ? "bg-[var(--primary)] text-white ring-4 ring-[var(--primary)]/20"
                                        : "bg-gray-100 text-gray-400"
                                }`}
                        >
                            {i < step ? "✓" : i + 1}
                        </div>
                        <span className={`text-xs font-medium ${i === step ? "text-[var(--primary)]" : "text-gray-400"}`}>
                            {label}
                        </span>
                    </div>
                    {i < STEPS.length - 1 && (
                        <div className={`h-0.5 w-16 md:w-24 mx-1 mb-4 rounded-full transition-all ${i < step ? "bg-[var(--primary)]" : "bg-gray-200"}`} />
                    )}
                </div>
            ))}
        </div>
    );

    return (
        <section className="px-6 md:px-16 py-10 min-h-screen bg-gradient-to-br from-[var(--secondary)]/30 to-transparent">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <Link href="/cart">
                    <button className="flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition">
                        <ArrowLeft size={16} /> Back to Cart
                    </button>
                </Link>
                <span className="opacity-30">/</span>
                <h1 className="text-2xl font-bold">Checkout</h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">

                {/* ── Left: Steps ─────────────────────────────────────────── */}
                <div className="flex-1">
                    <StepBar />

                    {/* STEP 0 — Delivery */}
                    {step === 0 && (
                        <div className="bg-white rounded-2xl p-6 border border-[var(--primary)]/10 shadow-sm">
                            <div className="flex items-center gap-2 mb-5 text-[var(--primary)]">
                                <MapPin size={20} />
                                <h2 className="font-bold text-lg">Delivery Details</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Field label="Full Name" name="fullName" value={delivery.fullName} onChange={handleDeliveryChange} placeholder="John Doe" />
                                <Field label="Email" name="email" type="email" value={delivery.email} onChange={handleDeliveryChange} placeholder="john@example.com" />
                                <Field label="Phone" name="phone" type="tel" value={delivery.phone} onChange={handleDeliveryChange} placeholder="+91 98765 43210" />
                                <Field label="Pincode" name="pincode" value={delivery.pincode} onChange={handleDeliveryChange} placeholder="400001" />
                                <div className="md:col-span-2">
                                    <Field label="Address" name="address" value={delivery.address} onChange={handleDeliveryChange} placeholder="House No., Street, Area" />
                                </div>
                                <Field label="City" name="city" value={delivery.city} onChange={handleDeliveryChange} placeholder="Mumbai" />
                                <Field label="State" name="state" value={delivery.state} onChange={handleDeliveryChange} placeholder="Maharashtra" />
                            </div>

                            <button
                                onClick={() => setStep(1)}
                                disabled={!deliveryFilled}
                                className="primary-btn w-full mt-6 py-3 rounded-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                Continue to Payment →
                            </button>
                        </div>
                    )}

                    {/* STEP 1 — Payment */}
                    {step === 1 && (
                        <div className="bg-white rounded-2xl p-6 border border-[var(--primary)]/10 shadow-sm">
                            <div className="flex items-center gap-2 mb-5 text-[var(--primary)]">
                                <CreditCard size={20} />
                                <h2 className="font-bold text-lg">Payment Method</h2>
                            </div>

                            {/* Method Tabs */}
                            <div className="flex gap-3 mb-6">
                                {[
                                    { value: "card", label: "Credit / Debit Card" },
                                    { value: "upi", label: "UPI" },
                                    { value: "cod", label: "Cash on Delivery" },
                                ].map((m) => (
                                    <button
                                        key={m.value}
                                        onClick={() => setPayment((p) => ({ ...p, method: m.value }))}
                                        className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition ${payment.method === m.value
                                                ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]"
                                                : "border-gray-200 text-gray-500 hover:border-[var(--primary)]/30"
                                            }`}
                                    >
                                        {m.label}
                                    </button>
                                ))}
                            </div>

                            {/* Card Fields */}
                            {payment.method === "card" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <Field label="Name on Card" name="cardName" value={payment.cardName} onChange={handlePaymentChange} placeholder="John Doe" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <Field label="Card Number" name="cardNumber" value={payment.cardNumber} onChange={handlePaymentChange} placeholder="1234 5678 9012 3456" maxLength={19} />
                                    </div>
                                    <Field label="Expiry (MM/YY)" name="expiry" value={payment.expiry} onChange={handlePaymentChange} placeholder="08/27" maxLength={5} />
                                    <Field label="CVV" name="cvv" value={payment.cvv} onChange={handlePaymentChange} placeholder="•••" maxLength={3} type="password" />
                                </div>
                            )}

                            {/* UPI Field */}
                            {payment.method === "upi" && (
                                <Field label="UPI ID" name="upiId" value={payment.upiId} onChange={handlePaymentChange} placeholder="yourname@upi" />
                            )}

                            {/* COD */}
                            {payment.method === "cod" && (
                                <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                                    <Truck size={20} className="flex-shrink-0" />
                                    Pay in cash when your order arrives at your doorstep.
                                </div>
                            )}

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setStep(0)}
                                    className="flex-1 py-3 rounded-xl border border-[var(--primary)]/30 text-sm hover:bg-[var(--primary)]/5 transition"
                                >
                                    ← Back
                                </button>
                                <button
                                    onClick={() => setStep(2)}
                                    disabled={!paymentFilled}
                                    className="flex-1 primary-btn py-3 rounded-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    Review Order →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 2 — Review */}
                    {step === 2 && (
                        <div className="bg-white rounded-2xl p-6 border border-[var(--primary)]/10 shadow-sm">
                            <h2 className="font-bold text-lg mb-5">Review Your Order</h2>

                            {/* Delivery Summary */}
                            <div className="mb-4 p-4 bg-[var(--primary)]/5 rounded-xl text-sm space-y-1">
                                <p className="font-semibold flex items-center gap-2 mb-2"><MapPin size={15} className="text-[var(--primary)]" /> Delivering to</p>
                                <p>{delivery.fullName} · {delivery.phone}</p>
                                <p className="text-gray-500">{delivery.address}, {delivery.city}, {delivery.state} – {delivery.pincode}</p>
                            </div>

                            {/* Payment Summary */}
                            <div className="mb-5 p-4 bg-[var(--primary)]/5 rounded-xl text-sm space-y-1">
                                <p className="font-semibold flex items-center gap-2 mb-2"><CreditCard size={15} className="text-[var(--primary)]" /> Payment</p>
                                {payment.method === "card" && <p>Card ending in {payment.cardNumber.slice(-4)}</p>}
                                {payment.method === "upi" && <p>UPI: {payment.upiId}</p>}
                                {payment.method === "cod" && <p>Cash on Delivery</p>}
                            </div>

                            {/* Items */}
                            <div className="flex flex-col gap-3 mb-5">
                                {cartItems.map((item) => (
                                    <div key={`${item.id}-${item.selectedQuantity}`} className="flex items-center gap-3">
                                        <div className="relative w-12 h-12 flex-shrink-0 bg-[var(--secondary)]/40 rounded-lg overflow-hidden">
                                            <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-sm truncate">{item.name}</p>
                                            <p className="text-xs text-gray-400">{item.selectedQuantity} × {item.count}</p>
                                        </div>
                                        <p className="font-semibold text-sm">₹{(parsePrice(item.price) * item.count).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setStep(1)}
                                    className="flex-1 py-3 rounded-xl border border-[var(--primary)]/30 text-sm hover:bg-[var(--primary)]/5 transition"
                                >
                                    ← Back
                                </button>
                                <button
                                    onClick={() => setPlaced(true)}
                                    className="flex-1 primary-btn py-3 rounded-xl font-semibold"
                                >
                                    Place Order ✓
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* ── Right: Order Summary ─────────────────────────────────── */}
                <div className="lg:w-80 flex-shrink-0">
                    <div className="bg-white rounded-2xl p-6 border border-[var(--primary)]/10 shadow-sm sticky top-6">
                        <h2 className="font-bold text-lg mb-4">Order Summary</h2>

                        <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1 mb-4">
                            {cartItems.map((item) => (
                                <div key={`${item.id}-${item.selectedQuantity}`} className="flex items-center gap-3">
                                    <div className="relative w-10 h-10 flex-shrink-0 bg-[var(--secondary)]/40 rounded-lg overflow-hidden">
                                        <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{item.name}</p>
                                        <p className="text-xs text-gray-400">×{item.count}</p>
                                    </div>
                                    <p className="text-sm font-semibold">₹{(parsePrice(item.price) * item.count).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>

                        <div className="h-px bg-gray-100 mb-3" />

                        <div className="flex flex-col gap-2 text-sm">
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
                    </div>
                </div>

            </div>
        </section>
    );
}

// ── Reusable Input Field ─────────────────────────────────────────────────────
function Field({ label, name, value, onChange, placeholder, type = "text", maxLength }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                maxLength={maxLength}
                className="px-4 py-2.5 rounded-xl border border-[var(--primary)]/20 bg-[var(--primary)]/3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 transition text-sm"
            />
        </div>
    );
}