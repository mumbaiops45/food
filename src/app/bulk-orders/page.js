"use client";

import { useState, useMemo } from "react";
import { allProducts } from "@/data/product";
import Image from "next/image";
import Link from "next/link";
import {
    Plus, Minus, Trash2, Send, Package,
    Search, CheckCircle, Building2,
    FileText, BadgePercent, X
} from "lucide-react";

const parsePrice = (p) => parseFloat(String(p ?? "0").replace(/[^0-9.]/g, "")) || 0;

const CATEGORY_LABELS = {
    "fruits-vegetables": "Fruits & Vegetables",
    dairy: "Dairy",
    snacks: "Snacks",
    beverages: "Beverages",
    grains: "Grains",
};

const BULK_TIERS = [
    { min: 0,        max: 4,        label: "Standard",   discount: 0  },
    { min: 5,        max: 9,        label: "Bulk",        discount: 5  },
    { min: 10,       max: 19,       label: "Wholesale",   discount: 10 },
    { min: 20,       max: Infinity, label: "Enterprise",  discount: 15 },
];

function getTier(totalItems) {
    return BULK_TIERS.find((t) => totalItems >= t.min && totalItems <= t.max) || BULK_TIERS[0];
}

const STEPS = ["Build Order", "Business Details", "Confirm & Submit"];

function Field({ label, name, value, onChange, placeholder, type = "text", colSpan = 1 }) {
    return (
        <div className={`flex flex-col gap-1.5 ${colSpan === 2 ? "md:col-span-2" : ""}`}>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="px-4 py-3 rounded-xl border border-[var(--primary)]/20 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 transition text-sm"
            />
        </div>
    );
}

export default function BulkOrderPage() {
    const [step, setStep] = useState(0);
    const [orderItems, setOrderItems] = useState([]);
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [submitted, setSubmitted] = useState(false);

    const [biz, setBiz] = useState({
        company: "", contact: "", email: "", phone: "",
        gst: "", address: "", city: "", pincode: "", notes: "",
    });

    const categories = ["all", ...Object.keys(CATEGORY_LABELS)];

    const filtered = useMemo(() => {
        let r = [...allProducts];
        if (activeCategory !== "all") r = r.filter((p) => p.category === activeCategory);
        if (search.trim()) {
            const q = search.toLowerCase();
            r = r.filter((p) => p.name?.toLowerCase().includes(q));
        }
        return r;
    }, [activeCategory, search]);

    const addItem = (product) => {
        setOrderItems((prev) => {
            if (prev.find((i) => i.id === product.id)) return prev;
            return [...prev, { ...product, qty: 1, selectedQty: product.quantities?.[0] ?? "" }];
        });
    };

    const removeItem = (id) => setOrderItems((prev) => prev.filter((i) => i.id !== id));

    const changeQty = (id, delta) =>
        setOrderItems((prev) =>
            prev.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
        );

    const setQtyDirect = (id, val) => {
        const n = parseInt(val, 10);
        if (!isNaN(n) && n >= 1)
            setOrderItems((prev) => prev.map((i) => i.id === id ? { ...i, qty: n } : i));
    };

    const totalItems = orderItems.reduce((s, i) => s + i.qty, 0);
    const tier = getTier(totalItems);
    const nextTier = BULK_TIERS[BULK_TIERS.indexOf(tier) + 1];

    const subtotal = orderItems.reduce((s, i) => s + parsePrice(i.price) * i.qty, 0);
    const discountAmt = (subtotal * tier.discount) / 100;
    const total = subtotal - discountAmt;

    const bizFilled = biz.company && biz.contact && biz.email && biz.phone && biz.address;
    const handleBiz = (e) => setBiz((p) => ({ ...p, [e.target.name]: e.target.value }));

    /* ── Submitted Screen ── */
    if (submitted) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center gap-6 px-6 text-center bg-gradient-to-br from-[var(--secondary)]/30 to-transparent">
                <div className="bg-green-50 rounded-full p-8 border-4 border-green-100">
                    <CheckCircle size={64} className="text-green-500" />
                </div>
                <h2 className="text-3xl font-black">Bulk Order Submitted!</h2>
                <p className="text-gray-500 max-w-sm">
                    Our team will contact <strong>{biz.email}</strong> within 24 hours to confirm pricing and delivery.
                </p>
                <div className="bg-white border border-[var(--primary)]/15 rounded-2xl px-8 py-6 text-sm space-y-2 w-full max-w-sm shadow-sm">
                    <p className="font-bold text-base mb-3 text-left">Order Summary</p>
                    {[
                        ["Company", biz.company],
                        ["Total Units", `${totalItems} units`],
                        ["Discount Tier", tier.label],
                        ["Estimated Total", `₹${total.toFixed(2)}`],
                    ].map(([k, v]) => (
                        <div key={k} className="flex justify-between">
                            <span className="text-gray-500">{k}</span>
                            <span className={`font-semibold ${k === "Estimated Total" ? "text-[var(--primary)]" : ""}`}>{v}</span>
                        </div>
                    ))}
                </div>
                <Link href="/shop">
                    <button className="primary-btn px-10 py-3 rounded-xl font-bold">Back to Shop</button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[var(--secondary)]/20 to-transparent">

            {/* ══ HERO ═════════════════════════════════════════════════════ */}
            <div className="px-6 md:px-16 py-12 bg-gradient-to-r from-[var(--secondary)] to-transparent border-b border-[var(--primary)]/10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <span className="text-xs font-bold tracking-widest text-[var(--primary)] uppercase bg-[var(--primary)]/10 px-3 py-1.5 rounded-full">
                            For Businesses
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight mt-4 leading-tight">
                            Bulk <span className="text-[var(--primary)]">Orders</span>
                        </h1>
                        <p className="mt-3 text-gray-500 max-w-lg text-sm leading-relaxed">
                            For restaurants, hotels, caterers &amp; retailers. Build your order and unlock automatic volume discounts.
                        </p>
                    </div>

                    {/* Discount tier cards */}
                    <div className="flex gap-3 flex-wrap">
                        {BULK_TIERS.slice(1).map((t) => (
                            <div
                                key={t.label}
                                className={`border rounded-2xl px-5 py-4 text-center min-w-[88px] transition-all ${
                                    tier.label === t.label
                                        ? "border-[var(--primary)] bg-[var(--primary)]/10 shadow-md scale-105"
                                        : "border-[var(--primary)]/20 bg-white"
                                }`}
                            >
                                <p className="text-[var(--primary)] font-black text-2xl">{t.discount}%</p>
                                <p className="text-xs font-bold mt-0.5">{t.label}</p>
                                <p className="text-[10px] text-gray-400">{t.min}+ units</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step bar */}
                <div className="flex items-center mt-10">
                    {STEPS.map((s, i) => (
                        <div key={s} className="flex items-center">
                            <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => i < step && setStep(i)}>
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                                    i < step ? "bg-[var(--primary)] text-white"
                                    : i === step ? "bg-[var(--primary)] text-white ring-4 ring-[var(--primary)]/20"
                                    : "bg-gray-100 text-gray-400"
                                }`}>
                                    {i < step ? "✓" : i + 1}
                                </div>
                                <span className={`text-xs font-semibold hidden md:block ${
                                    i === step ? "text-[var(--primary)]" : i < step ? "text-gray-600" : "text-gray-400"
                                }`}>{s}</span>
                            </div>
                            {i < STEPS.length - 1 && (
                                <div className={`h-0.5 w-12 md:w-20 mx-2 mb-4 rounded-full ${i < step ? "bg-[var(--primary)]" : "bg-gray-200"}`} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* ══ STEP 0 — BUILD ORDER ════════════════════════════════════ */}
            {step === 0 && (
                <div className="flex flex-col lg:flex-row min-h-[calc(100vh-320px)]">

                    {/* LEFT — Product table */}
                    <div className="flex-1 border-r border-[var(--primary)]/10">

                        {/* Filter bar */}
                        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-[var(--primary)]/10 px-6 py-4 flex flex-wrap gap-3 items-center">
                            <div className="relative flex-1 min-w-[180px]">
                                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search products..."
                                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[var(--primary)]/20 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 transition"
                                />
                                {search && (
                                    <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                        <X size={14} />
                                    </button>
                                )}
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                {categories.map((c) => (
                                    <button
                                        key={c}
                                        onClick={() => setActiveCategory(c)}
                                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                                            activeCategory === c
                                                ? "bg-[var(--primary)] text-white"
                                                : "bg-[var(--primary)]/10 text-gray-600 hover:bg-[var(--primary)]/20"
                                        }`}
                                    >
                                        {c === "all" ? "All" : CATEGORY_LABELS[c]}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Table header */}
                        <div className="grid grid-cols-[2fr_1fr_1fr_auto] gap-4 px-6 py-3 bg-[var(--primary)]/5 border-b border-[var(--primary)]/10 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                            <span>Product</span>
                            <span>Pack Size</span>
                            <span>Unit Price</span>
                            <span>Add</span>
                        </div>

                        {/* Rows */}
                        <div className="divide-y divide-[var(--primary)]/5">
                            {filtered.map((p) => {
                                const inOrder = !!orderItems.find((i) => i.id === p.id);
                                return (
                                    <div
                                        key={p.id}
                                        className={`grid grid-cols-[2fr_1fr_1fr_auto] gap-4 px-6 py-4 items-center hover:bg-[var(--primary)]/5 transition ${
                                            inOrder ? "bg-[var(--primary)]/8 border-l-[3px] border-l-[var(--primary)]" : ""
                                        }`}
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="relative w-11 h-11 flex-shrink-0 bg-[var(--secondary)]/50 rounded-xl overflow-hidden">
                                                <Image src={p.image} alt={p.name} fill className="object-contain p-1" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold truncate">{p.name}</p>
                                                <p className="text-[10px] text-gray-400 uppercase tracking-wider">{CATEGORY_LABELS[p.category] || p.category}</p>
                                            </div>
                                        </div>

                                        <select className="border border-[var(--primary)]/20 bg-white rounded-lg px-2 py-1.5 text-xs text-gray-600 focus:outline-none focus:ring-1 focus:ring-[var(--primary)]/40">
                                            {p.quantities?.map((q) => <option key={q} value={q}>{q}</option>)}
                                        </select>

                                        <span className="font-bold text-sm text-[var(--primary)]">{p.price}</span>

                                        <button
                                            onClick={() => inOrder ? removeItem(p.id) : addItem(p)}
                                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                                                inOrder
                                                    ? "bg-red-50 text-red-400 hover:bg-red-100 border border-red-200"
                                                    : "bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white border border-[var(--primary)]/20"
                                            }`}
                                        >
                                            {inOrder ? "✕ Remove" : "+ Add"}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* RIGHT — Order Sheet */}
                    <div className="lg:w-96 flex flex-col bg-white border-t lg:border-t-0 border-[var(--primary)]/10">
                        <div className="sticky top-0 bg-white border-b border-[var(--primary)]/10 px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FileText size={16} className="text-[var(--primary)]" />
                                <span className="font-bold text-sm">Order Sheet</span>
                                {orderItems.length > 0 && (
                                    <span className="bg-[var(--primary)] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                        {orderItems.length}
                                    </span>
                                )}
                            </div>
                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                                tier.discount > 0 ? "bg-[var(--primary)]/15 text-[var(--primary)]" : "bg-gray-100 text-gray-500"
                            }`}>
                                {tier.label} Tier
                            </span>
                        </div>

                        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                            {orderItems.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
                                    <div className="bg-[var(--primary)]/10 rounded-full p-6">
                                        <Package size={36} className="text-[var(--primary)] opacity-40" />
                                    </div>
                                    <p className="text-gray-500 text-sm font-medium">No items added yet</p>
                                    <p className="text-gray-400 text-xs">Click "+ Add" on any product from the list</p>
                                </div>
                            ) : (
                                orderItems.map((item) => (
                                    <div key={item.id} className="flex items-center gap-3 bg-[var(--primary)]/5 border border-[var(--primary)]/10 rounded-xl p-3">
                                        <div className="relative w-10 h-10 flex-shrink-0 bg-[var(--secondary)]/50 rounded-lg overflow-hidden">
                                            <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-semibold truncate">{item.name}</p>
                                            <p className="text-[10px] text-gray-400">{item.selectedQty} · {item.price}/unit</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <button onClick={() => changeQty(item.id, -1)} className="w-6 h-6 rounded-lg border border-[var(--primary)]/30 flex items-center justify-center hover:bg-[var(--primary)]/10 transition">
                                                <Minus size={10} />
                                            </button>
                                            <input
                                                type="number"
                                                value={item.qty}
                                                onChange={(e) => setQtyDirect(item.id, e.target.value)}
                                                className="w-10 text-center border border-[var(--primary)]/20 rounded-lg text-xs py-1 focus:outline-none focus:ring-1 focus:ring-[var(--primary)]/30"
                                            />
                                            <button onClick={() => changeQty(item.id, 1)} className="w-6 h-6 rounded-lg border border-[var(--primary)]/30 flex items-center justify-center hover:bg-[var(--primary)]/10 transition">
                                                <Plus size={10} />
                                            </button>
                                        </div>
                                        <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 transition ml-1">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {orderItems.length > 0 && (
                            <div className="border-t border-[var(--primary)]/10 px-6 py-5 space-y-4">
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-gray-500">{totalItems} unit{totalItems !== 1 ? "s" : ""} added</span>
                                        {nextTier && (
                                            <span className="text-[var(--primary)] font-medium">
                                                {nextTier.min - totalItems} more for {nextTier.discount}% off
                                            </span>
                                        )}
                                    </div>
                                    <div className="w-full h-2 bg-[var(--primary)]/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[var(--primary)] rounded-full transition-all duration-500"
                                            style={{ width: `${Math.min(100, (totalItems / 20) * 100)}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between text-gray-500">
                                        <span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span>
                                    </div>
                                    {tier.discount > 0 && (
                                        <div className="flex justify-between text-[var(--primary)] font-medium">
                                            <span className="flex items-center gap-1.5"><BadgePercent size={14} /> {tier.discount}% {tier.label} discount</span>
                                            <span>−₹{discountAmt.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between font-bold text-base pt-2 border-t border-[var(--primary)]/10">
                                        <span>Estimated Total</span>
                                        <span className="text-[var(--primary)]">₹{total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button onClick={() => setStep(1)} className="primary-btn w-full py-3 rounded-xl font-bold text-sm">
                                    Continue → Business Details
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ══ STEP 1 — BUSINESS DETAILS ═══════════════════════════════ */}
            {step === 1 && (
                <div className="max-w-2xl mx-auto px-6 py-12">
                    <div className="bg-white rounded-2xl border border-[var(--primary)]/10 shadow-sm p-8">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="bg-[var(--primary)]/10 p-3 rounded-xl">
                                <Building2 size={22} className="text-[var(--primary)]" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">Business Details</h2>
                                <p className="text-sm text-gray-400">Tell us about your business for the bulk order</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Field label="Company / Business Name *" name="company" value={biz.company} onChange={handleBiz} placeholder="Ojain Restaurants Pvt Ltd" />
                            <Field label="Contact Person *" name="contact" value={biz.contact} onChange={handleBiz} placeholder="Rahul Sharma" />
                            <Field label="Email Address *" name="email" type="email" value={biz.email} onChange={handleBiz} placeholder="orders@company.com" />
                            <Field label="Phone Number *" name="phone" type="tel" value={biz.phone} onChange={handleBiz} placeholder="+91 98765 43210" />
                            <Field label="GST Number (optional)" name="gst" value={biz.gst} onChange={handleBiz} placeholder="22AAAAA0000A1Z5" />
                            <Field label="Pincode" name="pincode" value={biz.pincode} onChange={handleBiz} placeholder="400001" />
                            <Field label="Delivery Address *" name="address" value={biz.address} onChange={handleBiz} placeholder="Building, Street, Area, City" colSpan={2} />
                            <div className="md:col-span-2 flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Special Instructions</label>
                                <textarea
                                    name="notes" rows={3} value={biz.notes} onChange={handleBiz}
                                    placeholder="Preferred delivery time, packaging requirements..."
                                    className="px-4 py-3 rounded-xl border border-[var(--primary)]/20 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 transition text-sm resize-none"
                                />
                            </div>
                        </div>
                        <div className="flex gap-3 mt-8">
                            <button onClick={() => setStep(0)} className="flex-1 py-3 rounded-xl border border-[var(--primary)]/30 text-sm font-semibold hover:bg-[var(--primary)]/5 transition">
                                ← Back
                            </button>
                            <button onClick={() => setStep(2)} disabled={!bizFilled} className="flex-1 primary-btn py-3 rounded-xl font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed">
                                Review Order →
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ══ STEP 2 — CONFIRM ════════════════════════════════════════ */}
            {step === 2 && (
                <div className="max-w-3xl mx-auto px-6 py-12 space-y-5">
                    <div className="bg-white rounded-2xl border border-[var(--primary)]/10 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Building2 size={16} className="text-[var(--primary)]" />
                            <p className="font-bold">Business Info</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                            {[["Company", biz.company], ["Contact", biz.contact], ["Email", biz.email], ["Phone", biz.phone], ["Address", biz.address], ["GST", biz.gst || "N/A"]].map(([k, v]) => (
                                <div key={k}>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">{k}</p>
                                    <p className="font-medium mt-0.5 truncate">{v}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-[var(--primary)]/10 shadow-sm overflow-hidden">
                        <div className="flex items-center gap-2 px-6 py-4 border-b border-[var(--primary)]/10">
                            <FileText size={16} className="text-[var(--primary)]" />
                            <p className="font-bold">Order Items</p>
                        </div>
                        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 px-6 py-3 bg-[var(--primary)]/5 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                            <span>Product</span><span>Pack</span><span>Qty</span><span className="text-right">Line Total</span>
                        </div>
                        <div className="divide-y divide-[var(--primary)]/5">
                            {orderItems.map((item) => (
                                <div key={item.id} className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 px-6 py-3.5 items-center text-sm">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="relative w-9 h-9 flex-shrink-0 bg-[var(--secondary)]/40 rounded-lg overflow-hidden">
                                            <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                                        </div>
                                        <span className="truncate text-sm font-medium">{item.name}</span>
                                    </div>
                                    <span className="text-gray-500 text-xs">{item.selectedQty}</span>
                                    <span className="font-bold text-[var(--primary)]">{item.qty}</span>
                                    <span className="text-right font-semibold">₹{(parsePrice(item.price) * item.qty).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-[var(--primary)]/10 shadow-sm p-6 space-y-2 text-sm">
                        <div className="flex justify-between text-gray-500">
                            <span>Subtotal ({totalItems} units)</span><span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        {tier.discount > 0 && (
                            <div className="flex justify-between text-[var(--primary)] font-medium">
                                <span className="flex items-center gap-1.5"><BadgePercent size={14} /> {tier.label} discount ({tier.discount}%)</span>
                                <span>−₹{discountAmt.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex justify-between font-bold text-lg pt-3 border-t border-[var(--primary)]/10">
                            <span>Estimated Total</span>
                            <span className="text-[var(--primary)]">₹{total.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-gray-400 pt-1">Final pricing confirmed by our team. GST &amp; delivery charges may apply.</p>
                    </div>

                    <div className="flex gap-3">
                        <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl border border-[var(--primary)]/30 text-sm font-semibold hover:bg-[var(--primary)]/5 transition">
                            ← Back
                        </button>
                        <button onClick={() => setSubmitted(true)} className="flex-1 primary-btn py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
                            <Send size={16} /> Submit Bulk Order
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}