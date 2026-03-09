"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart, Package, Truck, BadgePercent, Phone,
  Mail, Building2, ChevronRight, CheckCircle2, Plus, Minus, Trash2, Send
} from "lucide-react";
import { allProducts } from "@/data/product";

// ─── Bulk Tier Pricing ────────────────────────────────────────────────────────
const TIERS = [
  { qty: "10–49 units",  discount: "10% OFF", icon: "📦", color: "from-sky-100 to-blue-50",      border: "border-blue-200",   label: "Starter" },
  { qty: "50–99 units",  discount: "20% OFF", icon: "🏗️",  color: "from-violet-100 to-purple-50", border: "border-violet-200", label: "Business" },
  { qty: "100–499 units",discount: "30% OFF", icon: "🏭",  color: "from-orange-100 to-amber-50",  border: "border-orange-200", label: "Wholesale" },
  { qty: "500+ units",   discount: "Custom",  icon: "🤝",  color: "from-green-100 to-emerald-50", border: "border-green-200",  label: "Enterprise" },
];

const BENEFITS = [
  { icon: <BadgePercent size={22} className="text-[var(--primary)]" />, title: "Volume Discounts",   desc: "Up to 30% off on large quantity orders across all categories." },
  { icon: <Truck        size={22} className="text-[var(--primary)]" />, title: "Free Delivery",      desc: "Complimentary delivery on all bulk orders above ₹2,000." },
  { icon: <Package      size={22} className="text-[var(--primary)]" />, title: "Custom Packaging",   desc: "Brand-ready or plain packaging options available on request." },
  { icon: <Phone        size={22} className="text-[var(--primary)]" />, title: "Dedicated Support",  desc: "A dedicated account manager for seamless bulk ordering experience." },
];

// Featured products for bulk ordering (pick a variety)
const BULK_PRODUCT_IDS = [1, 11, 21, 36, 41, 46, 51, 56];

const parsePrice = (str) => parseFloat(String(str).replace(/[^0-9.]/g, "")) || 0;

const getTierDiscount = (qty) => {
  if (qty >= 500) return 0.35;
  if (qty >= 100) return 0.30;
  if (qty >= 50)  return 0.20;
  if (qty >= 10)  return 0.10;
  return 0;
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function BulkOrdersPage() {
  const [cart, setCart]       = useState({});   // { productId: qty }
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm]       = useState({ name: "", business: "", phone: "", email: "", note: "" });
  const [formError, setFormError] = useState("");

  const bulkProducts = BULK_PRODUCT_IDS
    .map((id) => allProducts.find((p) => p.id === id))
    .filter(Boolean);

  const updateCart = (id, delta) => {
    setCart((prev) => {
      const next = { ...prev };
      const current = next[id] || 0;
      const updated = Math.max(0, current + delta);
      if (updated === 0) delete next[id];
      else next[id] = updated;
      return next;
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const cartEntries = Object.entries(cart).map(([id, qty]) => ({
    product: allProducts.find((p) => p.id === Number(id)),
    qty,
  })).filter((e) => e.product);

  const subtotal = cartEntries.reduce((sum, { product, qty }) => sum + parsePrice(product.price) * qty, 0);
  const totalQty = cartEntries.reduce((sum, { qty }) => sum + qty, 0);
  const discount = getTierDiscount(totalQty);
  const savings  = Math.round(subtotal * discount);
  const total    = subtotal - savings;

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.email) {
      setFormError("Please fill in Name, Phone and Email.");
      return;
    }
    if (cartEntries.length === 0) {
      setFormError("Please add at least one product to your order.");
      return;
    }
    setFormError("");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[var(--secondary)] via-white to-[var(--secondary)]/40 flex items-center justify-center px-6">
        <div className="bg-white/80 backdrop-blur-md border border-[var(--primary)]/20 rounded-3xl p-10 max-w-md w-full text-center shadow-2xl">
          <CheckCircle2 size={56} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-gray-900">Order Enquiry Sent!</h2>
          <p className="text-gray-500 mt-2 text-sm">
            Thank you, <span className="font-semibold text-gray-800">{form.name}</span>! Our team will contact you on <span className="font-semibold text-gray-800">{form.phone}</span> within 24 hours to confirm your bulk order.
          </p>
          <div className="mt-6 bg-[var(--secondary)]/50 rounded-xl p-4 text-left text-sm space-y-1">
            <p><span className="font-semibold">Items:</span> {cartEntries.length} product{cartEntries.length > 1 ? "s" : ""}</p>
            <p><span className="font-semibold">Total Qty:</span> {totalQty} units</p>
            <p><span className="font-semibold">Estimated Total:</span> ₹{total.toLocaleString()}</p>
            {discount > 0 && <p className="text-green-600 font-semibold">You save: ₹{savings.toLocaleString()} ({Math.round(discount * 100)}% off)</p>}
          </div>
          <button
            onClick={() => { setSubmitted(false); setCart({}); setForm({ name: "", business: "", phone: "", email: "", note: "" }); }}
            className="mt-6 primary-btn w-full py-3 rounded-xl font-semibold"
          >
            Place Another Order
          </button>
          <Link href="/shop" className="mt-3 block text-sm text-[var(--primary)] hover:underline">← Continue Shopping</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[var(--secondary)] via-white to-[var(--secondary)]/40">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-6 md:px-16 pt-14 pb-10">
        <div className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[var(--primary)]/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 -left-10 w-60 h-60 rounded-full bg-emerald-400/10 blur-2xl" />

        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 bg-[var(--primary)]/15 text-[var(--primary)] text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            <Building2 size={13} /> For Businesses & Institutions
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
            Bulk Orders,<br />
            <span className="text-[var(--primary)]">Bigger Savings</span>
          </h1>
          <p className="mt-3 text-gray-500 max-w-lg">
            Supply your restaurant, office, school or store with fresh groceries at wholesale prices. Select your products, set quantities and we'll handle the rest.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href="#products" className="primary-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold">
              Start Your Order <ChevronRight size={18} />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border border-[var(--primary)]/30 bg-white/60 hover:bg-[var(--primary)]/10 transition">
              <Phone size={16} /> Talk to Us
            </a>
          </div>
        </div>
      </section>

      {/* ── Tier Pricing ── */}
      <section className="px-6 md:px-16 mb-12">
        <div className="flex items-center gap-3 mb-6">
          <BadgePercent size={20} className="text-[var(--primary)]" />
          <h2 className="text-xl font-bold">Volume Pricing Tiers</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TIERS.map((tier) => (
            <div key={tier.label} className={`bg-gradient-to-b ${tier.color} border ${tier.border} rounded-2xl p-5 flex flex-col gap-2`}>
              <span className="text-3xl">{tier.icon}</span>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{tier.label}</span>
              <span className="text-2xl font-black text-gray-900">{tier.discount}</span>
              <span className="text-sm text-gray-500">{tier.qty}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="px-6 md:px-16 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {BENEFITS.map((b) => (
            <div key={b.title} className="bg-white/60 backdrop-blur-sm border border-[var(--primary)]/15 rounded-2xl p-5 flex flex-col gap-2 hover:shadow-md transition">
              {b.icon}
              <span className="font-bold text-gray-800 text-sm">{b.title}</span>
              <span className="text-xs text-gray-500 leading-relaxed">{b.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Product Selection + Cart ── */}
      <section id="products" className="px-6 md:px-16 mb-12">
        <div className="flex items-center gap-3 mb-6">
          <ShoppingCart size={20} className="text-[var(--primary)]" />
          <h2 className="text-xl font-bold">Select Products</h2>
          <span className="text-xs text-gray-400 ml-auto">Minimum 10 units per product for bulk pricing</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Product Grid */}
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-2 gap-4">
            {bulkProducts.map((p) => {
              const qty = cart[p.id] || 0;
              const tierDisc = getTierDiscount(qty);
              const unitPrice = parsePrice(p.price);
              const discUnit = Math.round(unitPrice * (1 - tierDisc));

              return (
                <div key={p.id} className="bg-white/70 backdrop-blur-sm border border-[var(--primary)]/15 rounded-2xl p-4 flex flex-col gap-3 hover:shadow-lg transition">
                  <div className="relative w-full h-28 bg-[var(--secondary)]/50 rounded-xl overflow-hidden">
                    <Image src={p.image} alt={p.name} fill className="object-contain p-2" />
                  </div>

                  <div>
                    <p className="font-bold text-sm text-gray-800">{p.name}</p>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="font-black text-[var(--primary)]">₹{discUnit}</span>
                      {tierDisc > 0 && <span className="text-xs text-gray-400 line-through">{p.price}</span>}
                      <span className="text-xs text-gray-400">/ unit</span>
                    </div>
                    {tierDisc > 0 && (
                      <span className="text-[10px] font-bold text-green-600">{Math.round(tierDisc * 100)}% bulk discount applied</span>
                    )}
                  </div>

                  {/* Quantity control */}
                  <div className="flex items-center gap-2 mt-auto">
                    <button
                      onClick={() => updateCart(p.id, -10)}
                      disabled={qty === 0}
                      className="w-8 h-8 rounded-lg border border-[var(--primary)]/30 bg-white flex items-center justify-center hover:bg-[var(--primary)]/10 transition disabled:opacity-30"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="flex-1 text-center font-bold tabular-nums text-sm">{qty || 0}</span>
                    <button
                      onClick={() => updateCart(p.id, 10)}
                      className="w-8 h-8 rounded-lg border border-[var(--primary)]/30 bg-white flex items-center justify-center hover:bg-[var(--primary)]/10 transition"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-400 text-center">+10 / −10 per tap</p>
                </div>
              );
            })}
          </div>

          {/* Order Summary + Form */}
          <div className="flex flex-col gap-5" id="contact">

            {/* Cart Summary */}
            <div className="bg-white/70 backdrop-blur-md border border-[var(--primary)]/20 rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Package size={16} className="text-[var(--primary)]" /> Order Summary
              </h3>

              {cartEntries.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">No products added yet.</p>
              ) : (
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {cartEntries.map(({ product, qty }) => (
                    <div key={product.id} className="flex items-center gap-3 text-sm">
                      <div className="relative w-8 h-8 flex-shrink-0">
                        <Image src={product.image} alt={product.name} fill className="object-contain" />
                      </div>
                      <span className="flex-1 text-gray-700 font-medium truncate">{product.name}</span>
                      <span className="text-gray-400 tabular-nums">×{qty}</span>
                      <button onClick={() => removeFromCart(product.id)} className="text-red-400 hover:text-red-600 transition">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-gray-100 space-y-1.5 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal ({totalQty} units)</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>Bulk Discount ({Math.round(discount * 100)}%)</span>
                    <span>−₹{savings.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between font-black text-gray-900 text-base pt-1">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                {totalQty > 0 && totalQty < 10 && (
                  <p className="text-[11px] text-orange-500 font-medium pt-1">Add {10 - totalQty} more units to unlock 10% discount!</p>
                )}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/70 backdrop-blur-md border border-[var(--primary)]/20 rounded-2xl p-5 shadow-sm flex flex-col gap-3">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <Mail size={16} className="text-[var(--primary)]" /> Your Details
              </h3>

              {[
                { key: "name",     placeholder: "Full Name *",         type: "text" },
                { key: "business", placeholder: "Business / Company",  type: "text" },
                { key: "phone",    placeholder: "Phone Number *",      type: "tel" },
                { key: "email",    placeholder: "Email Address *",     type: "email" },
              ].map(({ key, placeholder, type }) => (
                <input
                  key={key}
                  type={type}
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--primary)]/25 bg-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 transition"
                />
              ))}

              <textarea
                rows={3}
                placeholder="Special requirements or notes..."
                value={form.note}
                onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--primary)]/25 bg-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 transition resize-none"
              />

              {formError && <p className="text-xs text-red-500 font-medium">{formError}</p>}

              <button
                onClick={handleSubmit}
                className="primary-btn w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 mt-1"
              >
                <Send size={16} /> Submit Bulk Order Enquiry
              </button>
              <p className="text-[10px] text-gray-400 text-center">Our team will reach out within 24 hours to confirm.</p>
            </div>
          </div>

        </div>
      </section>

      {/* ── FAQ Strip ── */}
      <section className="px-6 md:px-16 pb-14">
        <div className="bg-white/50 border border-gray-200 rounded-xl px-6 py-5 flex flex-wrap gap-6 justify-between items-center text-sm text-gray-500">
          <span>📞 Need help? Call us at <span className="font-semibold text-gray-800">+91 98765 43210</span></span>
          <span>📧 Email: <span className="font-semibold text-gray-800">bulk@essentialgrocery.in</span></span>
          <span>🕗 Mon–Sat, 9 AM – 7 PM</span>
          <Link href="/shop" className="text-[var(--primary)] font-semibold hover:underline">Browse all products →</Link>
        </div>
      </section>

    </main>
  );
}