"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ChevronDown, ShoppingCart, Truck, RefreshCw,
    CreditCard, Package, Phone, MessageCircle,
    Tag, Users, Leaf, Shield
} from "lucide-react";

const FAQ_CATEGORIES = [
    {
        key: "orders",
        label: "Orders & Shopping",
        icon: ShoppingCart,
        color: "bg-green-50 text-green-500 border-green-100",
        questions: [
            {
                q: "How do I place an order on OJAIN FOODS?",
                a: "Placing an order is simple! Browse our shop, select your desired products, choose the quantity and pack size, then click 'Add to Cart'. Once you're done shopping, go to your cart and click 'Proceed to Checkout' to complete your purchase."
            },
            {
                q: "Can I modify or cancel my order after placing it?",
                a: "You can modify or cancel your order within 1 hour of placing it by contacting our support team. Once the order is processed and dispatched, modifications are not possible. Please reach out to us immediately via phone or chat if you need to make changes."
            },
            {
                q: "Is there a minimum order value?",
                a: "There is no minimum order value for regular orders. However, for bulk/wholesale orders, a minimum order value of ₹2,000 applies. Free delivery is available on orders above ₹499."
            },
            {
                q: "How do I track my order?",
                a: "You can track your order in real-time by visiting the 'Track Order' page from the navigation menu. Enter your order ID received in the confirmation email/SMS to see the live status of your delivery."
            },
            {
                q: "Can I schedule a delivery for a specific time?",
                a: "Yes! During checkout, you can choose a preferred delivery slot (Morning, Afternoon, or Evening). We do our best to honour your preference, though actual delivery times may vary slightly based on demand and your location."
            },
        ],
    },
    {
        key: "delivery",
        label: "Delivery & Shipping",
        icon: Truck,
        color: "bg-green-50 text-green-500 border-green-100",
        questions: [
            {
                q: "What are the delivery charges?",
                a: "Delivery is free on all orders above ₹499. For orders below ₹499, a flat delivery charge of ₹40 applies. For bulk orders, delivery charges are calculated separately and confirmed by our team."
            },
            {
                q: "How long does delivery take?",
                a: "We offer same-day delivery for orders placed before 12:00 PM. Orders placed after 12:00 PM are delivered the next day. Delivery times may vary by 1–2 hours depending on traffic and your location."
            },
            {
                q: "Which areas do you deliver to?",
                a: "We currently deliver across major cities and surrounding areas. Enter your pincode on the checkout page to check if we deliver to your location. We are constantly expanding our delivery network."
            },
            {
                q: "What happens if I'm not home during delivery?",
                a: "Our delivery partner will attempt to contact you before arriving. If you're unavailable, they will try again within the next 2 hours. If the third attempt also fails, the order may be returned and a refund will be processed."
            },
        ],
    },
    {
        key: "returns",
        label: "Returns & Refunds",
        icon: RefreshCw,
        color: "bg-green-50 text-green-500 border-green-100",
        questions: [
            {
                q: "What is your return policy?",
                a: "We accept returns for damaged, expired, or wrong items delivered. You must raise a return request within 24 hours of delivery by contacting our support team with photos of the issue. Fresh produce returns are processed within the same day."
            },
            {
                q: "How long does it take to receive a refund?",
                a: "Refunds are processed within 3–5 business days after the return is approved. The amount is credited back to the original payment method. UPI and wallet refunds are typically faster (1–2 business days)."
            },
            {
                q: "Can I return fresh fruits and vegetables?",
                a: "Yes, if the fresh produce delivered is of poor quality, damaged, or not fresh, we will replace it or issue a full refund. Please raise the issue within 12 hours of delivery with supporting photos."
            },
            {
                q: "What if I receive the wrong product?",
                a: "If you receive a wrong product, contact us immediately with your order ID and a photo of the item received. We will arrange a free replacement delivery or a full refund at your preference."
            },
        ],
    },
    {
        key: "payments",
        label: "Payments",
        icon: CreditCard,
        color: "bg-green-50 text-green-500 border-green-100",
        questions: [
            {
                q: "What payment methods do you accept?",
                a: "We accept Credit/Debit Cards (Visa, Mastercard, RuPay), UPI (Google Pay, PhonePe, Paytm, BHIM), Net Banking, and Cash on Delivery (COD). All online payments are secured with 256-bit encryption."
            },
            {
                q: "Is Cash on Delivery available?",
                a: "Yes, Cash on Delivery (COD) is available for all orders up to ₹5,000. For orders above ₹5,000, pre-payment via card or UPI is required. COD is available in most serviceable areas."
            },
            {
                q: "Are my payment details safe?",
                a: "Absolutely. We do not store your card or payment details on our servers. All transactions are processed through PCI-DSS compliant payment gateways with end-to-end encryption. Your financial data is completely secure."
            },
            {
                q: "Can I use multiple payment methods for a single order?",
                a: "Currently, we support only one payment method per order. However, you can use store credits or promotional discount codes in combination with your chosen payment method."
            },
        ],
    },
    {
        key: "bulk",
        label: "Bulk Orders",
        icon: Package,
        color: "bg-green-50 text-green-500 border-green-100",
        questions: [
            {
                q: "What discounts are available for bulk orders?",
                a: "We offer automatic volume discounts: 5% off for 5–9 units (Bulk tier), 10% off for 10–19 units (Wholesale tier), and 15% off for 20+ units (Enterprise tier). Visit our Bulk Orders page to build your order and see live discount calculations."
            },
            {
                q: "Who can place bulk orders?",
                a: "Bulk orders are open to restaurants, hotels, caterers, retailers, schools, offices, and any business requiring regular large-quantity grocery supplies. A GST number is optional but recommended for B2B invoicing."
            },
            {
                q: "How do I place a bulk order?",
                a: "Visit our dedicated Bulk Orders page, build your order using the product catalogue table, fill in your business details, and submit the inquiry. Our team will contact you within 24 hours to confirm pricing, delivery schedule, and payment terms."
            },
            {
                q: "Are there special delivery options for bulk orders?",
                a: "Yes. Bulk orders are delivered with dedicated logistics, including large-quantity packaging and scheduled delivery windows. We also offer weekly or monthly subscription delivery for regular bulk customers."
            },
        ],
    },
    {
        key: "products",
        label: "Products & Quality",
        icon: Leaf,
        color: "bg-green-50 text-green-500 border-green-100",
        questions: [
            {
                q: "Where do you source your products from?",
                a: "We partner directly with verified local farmers, certified dairy farms, and trusted FSSAI-approved suppliers. This ensures freshness, traceability, and fair pricing without unnecessary middlemen."
            },
            {
                q: "Are your products organic?",
                a: "We offer a range of certified organic options across fruits, vegetables, grains, and dairy. Look for the 'Organic' tag on product listings. Our team verifies organic certification before listing any product."
            },
            {
                q: "How do you ensure freshness of perishable items?",
                a: "All perishable items are stored in temperature-controlled facilities and dispatched within 24 hours of harvest or processing. We perform quality checks before every delivery and do not stock items past their freshness window."
            },
            {
                q: "What does the expiry date on packaged items mean?",
                a: "Packaged items on our platform always have a minimum remaining shelf life of 30% of total shelf life at the time of delivery. If you receive an item close to expiry, please contact us immediately for a replacement."
            },
        ],
    },
    {
        key: "account",
        label: "Account & Security",
        icon: Shield,
        color: "bg-green-50 text-green-500 border-green-100",
        questions: [
            {
                q: "How do I create an account?",
                a: "Click on 'Account' in the navigation bar and select 'Register'. Fill in your name, email, and phone number, create a password, and you're set. You can also place orders as a guest without creating an account."
            },
            {
                q: "I forgot my password. How do I reset it?",
                a: "On the login screen, click 'Forgot password?' and enter your registered email address. You'll receive a password reset link within a few minutes. Check your spam folder if you don't see it in your inbox."
            },
            {
                q: "How do I update my delivery address?",
                a: "Log in to your account, go to the 'Profile' section, click 'Edit', update your address details, and save. You can also enter a new address directly during checkout without updating your profile."
            },
            {
                q: "Is my personal data safe with OJAIN FOODS?",
                a: "Yes. We comply with India's data protection regulations. Your personal information is never sold to third parties and is only used to process orders and improve your shopping experience. You can request data deletion at any time."
            },
        ],
    },
];

function AccordionItem({ question, answer, isOpen, onToggle }) {
    return (
        <div className={`border rounded-xl overflow-hidden transition-all duration-200 ${isOpen ? "border-[var(--primary)]/40 shadow-sm" : "border-[var(--primary)]/10"}`}>
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-[var(--primary)]/3 transition"
            >
                <span className={`font-semibold text-sm leading-snug ${isOpen ? "text-[var(--primary)]" : "text-gray-800"}`}>
                    {question}
                </span>
                <ChevronDown
                    size={18}
                    className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-[var(--primary)]" : "text-gray-400"}`}
                />
            </button>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-96" : "max-h-0"}`}>
                <p className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-[var(--primary)]/10 pt-4">
                    {answer}
                </p>
            </div>
        </div>
    );
}

export default function FAQPage() {
    const [activeCategory, setActiveCategory] = useState("orders");
    const [openIndex, setOpenIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    const currentCategory = FAQ_CATEGORIES.find((c) => c.key === activeCategory);

    // Search across all categories
    const searchResults = searchQuery.trim()
        ? FAQ_CATEGORIES.flatMap((cat) =>
            cat.questions
                .filter(
                    (item) =>
                        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.a.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((item) => ({ ...item, categoryLabel: cat.label, categoryKey: cat.key }))
        )
        : [];

    const toggle = (i) => setOpenIndex(openIndex === i ? -1 : i);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[var(--secondary)]/20 to-transparent">

            {/* ── Hero ── */}
            <div className="bg-gradient-to-r from-[var(--secondary)] to-transparent px-6 md:px-16 py-16 border-b border-[var(--primary)]/10">
                <div className="max-w-2xl">
                    <span className="text-xs font-bold tracking-widest text-[var(--primary)] uppercase bg-[var(--primary)]/10 px-3 py-1.5 rounded-full">
                        Help Center
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mt-4 leading-tight">
                        Frequently Asked <span className="text-[var(--primary)]">Questions</span>
                    </h1>
                    <p className="mt-3 text-gray-500 text-sm leading-relaxed max-w-lg">
                        Find answers to the most common questions about ordering, delivery, payments, and more.
                    </p>

                    {/* Search */}
                    {/* <div className="relative mt-6 max-w-md">
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); }}
                            placeholder="Search your question..."
                            className="w-full pl-10 pr-10 py-3.5 rounded-xl border border-[var(--primary)]/20 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 transition text-sm shadow-sm"
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
                            </button>
                        )}
                    </div> */}
                </div>
            </div>

            <div className="px-6 md:px-16 py-0">

                {/* ── Search Results ── */}
                {searchQuery.trim() ? (
                    <div className="max-w-3xl mx-auto">
                        <p className="text-sm text-gray-500 mb-5">
                            {searchResults.length > 0
                                ? `${searchResults.length} result${searchResults.length !== 1 ? "s" : ""} for "${searchQuery}"`
                                : `No results found for "${searchQuery}"`}
                        </p>
                        {searchResults.length === 0 ? (
                            <div className="flex flex-col items-center py-16 gap-4 text-center opacity-60">
                                <MessageCircle size={48} className="opacity-30" />
                                <p className="font-medium">No matching questions found</p>
                                <p className="text-sm">Try different keywords or browse the categories below</p>
                                <button onClick={() => setSearchQuery("")} className="primary-btn px-6 py-2 rounded-xl text-sm mt-2 opacity-100">
                                    Browse All FAQs
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {searchResults.map((item, i) => (
                                    <div key={i} className="bg-white rounded-xl border border-[var(--primary)]/10 p-5 shadow-sm">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-1 rounded-full mb-3 inline-block">
                                            {item.categoryLabel}
                                        </span>
                                        <p className="font-semibold text-sm mb-2">{item.q}</p>
                                        <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    /* ── Category Layout ── */
                    <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">

                        {/* Sidebar */}
                        <aside className="lg:w-64 flex-shrink-0">
                            <div className="bg-white rounded-2xl border border-[var(--primary)]/10 shadow-sm overflow-hidden sticky top-24">
                                <div className="px-4 py-3 border-b border-[var(--primary)]/10">
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Categories</p>
                                </div>
                                {FAQ_CATEGORIES.map((cat) => {
                                    const Icon = cat.icon;
                                    const isActive = activeCategory === cat.key;
                                    return (
                                        <button
                                            key={cat.key}
                                            onClick={() => { setActiveCategory(cat.key); setOpenIndex(0); }}
                                            className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium transition border-b border-gray-50 last:border-0 text-left ${
                                                isActive
                                                    ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                                                    : "text-gray-600 hover:bg-gray-50"
                                            }`}
                                        >
                                            <div className={`p-1.5 rounded-lg border ${cat.color}`}>
                                                <Icon size={14} />
                                            </div>
                                            <span>{cat.label}</span>
                                            {isActive && (
                                                <span className="ml-auto text-xs bg-[var(--primary)] text-white px-1.5 py-0.5 rounded-full">
                                                    {cat.questions.length}
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Still need help */}
                           
                        </aside>

                        {/* Main content */}
                        <div className="flex-1 min-w-0">
                            {currentCategory && (
                                <>
                                    {/* Category header */}
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className={`p-3 rounded-xl border ${currentCategory.color}`}>
                                            <currentCategory.icon size={22} />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold">{currentCategory.label}</h2>
                                            <p className="text-sm text-gray-400">{currentCategory.questions.length} questions</p>
                                        </div>
                                    </div>

                                    {/* Accordion */}
                                    <div className="flex flex-col gap-3">
                                        {currentCategory.questions.map((item, i) => (
                                            <AccordionItem
                                                key={i}
                                                question={item.q}
                                                answer={item.a}
                                                isOpen={openIndex === i}
                                                onToggle={() => toggle(i)}
                                            />
                                        ))}
                                    </div>

                                    {/* Other categories quick links */}
                                    <div className="mt-10 border-t border-[var(--primary)]/10 pt-8">
                                        <p className="text-sm font-semibold text-gray-500 mb-4">Browse other topics</p>
                                        <div className="flex flex-wrap gap-2">
                                            {FAQ_CATEGORIES.filter((c) => c.key !== activeCategory).map((cat) => {
                                                const Icon = cat.icon;
                                                return (
                                                    <button
                                                        key={cat.key}
                                                        onClick={() => { setActiveCategory(cat.key); setOpenIndex(0); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                                                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--primary)]/15 bg-white text-sm hover:bg-[var(--primary)]/5 hover:border-[var(--primary)]/30 transition"
                                                    >
                                                        <Icon size={14} className="text-[var(--primary)]" />
                                                        {cat.label}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* ── Bottom CTA ── */}
                <div className="max-w-2xl mx-auto mt-16 bg-gradient-to-r from-[var(--secondary)] to-transparent rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-[var(--primary)]/10">
                    <div>
                        <p className="font-bold text-lg">Couldn't find your answer?</p>
                        <p className="text-gray-500 text-sm mt-1">Reach out to us directly — we're happy to help.</p>
                    </div>
                    <div className="flex gap-3 flex-shrink-0">
                        <Link href="tel:+919999999999">
                            <button className="flex bg-[var(--primary)]/15 items-center gap-2 px-5 py-3 rounded-xl border border-[var(--primary)]/30 text-sm font-semibold hover:bg-[var(--primary)]/20 transition">
                                Contact Us
                            </button>
                        </Link>
                        <Link href="/bulk-orders">
                            <button className="primary-btn flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold">
                                <Users size={15} /> Bulk Orders
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}