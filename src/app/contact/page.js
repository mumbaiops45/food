"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageCircle, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const handle = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = "Name is required";
        if (!form.email.trim()) e.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
        if (!form.message.trim()) e.message = "Message is required";
        return e;
    };

    const handleSubmit = () => {
        const e = validate();
        if (Object.keys(e).length > 0) { setErrors(e); return; }
        setErrors({});
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-6 text-center bg-gradient-to-br from-[var(--secondary)]/30 to-transparent">
                <div className="bg-green-50 rounded-full p-8 border-4 border-green-100">
                    <CheckCircle size={64} className="text-green-500" />
                </div>
                <h2 className="text-3xl font-bold">Message Sent!</h2>
                <p className="text-gray-500 max-w-sm">
                    Thank you, <strong>{form.name}</strong>! We've received your message and will get back to you at <strong>{form.email}</strong> within 24 hours.
                </p>
                <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                    className="primary-btn px-8 py-3 rounded-xl font-semibold"
                >
                    Send Another Message
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[var(--secondary)]/20 to-transparent">

            {/* ── Hero ── */}
            <div className="bg-gradient-to-r from-[var(--secondary)] to-transparent px-6 md:px-16 py-14 border-b border-[var(--primary)]/10">
                <span className="text-xs font-bold tracking-widest text-[var(--primary)] uppercase bg-[var(--primary)]/10 px-3 py-1.5 rounded-full">
                    Get in Touch
                </span>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight mt-4 leading-tight">
                    Contact <span className="text-[var(--primary)]">Us</span>
                </h1>
                <p className="mt-3 text-gray-500 text-sm max-w-md leading-relaxed">
                    Have a question, feedback, or a bulk order enquiry? We'd love to hear from you. Our team responds within 24 hours.
                </p>
            </div>

            <div className="px-6 md:px-16 py-12">
                <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto">

                    {/* ── Left: Info ── */}
                    <div className="lg:w-80 flex-shrink-0 flex flex-col gap-4">

                        {/* Contact cards */}
                        {[
                            {
                                icon: Phone,
                                label: "Call Us",
                                value: "+91 98765 43210",
                                sub: "Mon–Sat, 9 AM – 7 PM",
                                href: "tel:+919876543210",
                            },
                            {
                                icon: Mail,
                                label: "Email Us",
                                value: "support@ojainfoods.com",
                                sub: "We reply within 24 hours",
                                href: "mailto:support@ojainfoods.com",
                            },
                            {
                                icon: MapPin,
                                label: "Our Address",
                                value: "12, Food Street, Sector 4",
                                sub: "Mumbai, Maharashtra – 400001",
                                href: "#",
                            },
                            {
                                icon: Clock,
                                label: "Working Hours",
                                value: "Mon – Sat: 9 AM – 7 PM",
                                sub: "Sunday: 10 AM – 4 PM",
                                href: null,
                            },
                        ].map(({ icon: Icon, label, value, sub, href }) => (
                            <div key={label} className="bg-white rounded-2xl border border-[var(--primary)]/10 shadow-sm p-5 flex items-start gap-4 hover:border-[var(--primary)]/30 transition">
                                <div className="bg-[var(--primary)]/10 p-3 rounded-xl flex-shrink-0">
                                    <Icon size={20} className="text-[var(--primary)]" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{label}</p>
                                    {href && href !== "#" ? (
                                        <a href={href} className="font-semibold text-sm hover:text-[var(--primary)] transition mt-0.5 block">{value}</a>
                                    ) : (
                                        <p className="font-semibold text-sm mt-0.5">{value}</p>
                                    )}
                                    <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                                </div>
                            </div>
                        ))}

                        {/* Social links */}
                        <div className="bg-white rounded-2xl border border-[var(--primary)]/10 shadow-sm p-5">
                            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Follow Us</p>
                            <div className="flex gap-3">
                                {[
                                    { Icon: Facebook,  href: "https://facebook.com",  label: "Facebook"  },
                                    { Icon: Twitter,   href: "https://twitter.com",   label: "Twitter"   },
                                    { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                                    { Icon: Youtube,   href: "https://youtube.com",   label: "Youtube"   },
                                ].map(({ Icon, href, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-xl border border-[var(--primary)]/20 hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition"
                                        title={label}
                                    >
                                        <Icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Right: Form ── */}
                    <div className="flex-1">
                        <div className="bg-white rounded-2xl border border-[var(--primary)]/10 shadow-sm p-8">
                            <div className="flex items-center gap-3 mb-7">
                                <div className="bg-[var(--primary)]/10 p-3 rounded-xl">
                                    <MessageCircle size={20} className="text-[var(--primary)]" />
                                </div>
                                <div>
                                    <h2 className="font-bold text-lg">Send a Message</h2>
                                    <p className="text-sm text-gray-400">Fill in the form and we'll be in touch</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                {/* Name */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Full Name *</label>
                                    <input
                                        name="name" value={form.name} onChange={handle}
                                        placeholder="John Doe"
                                        className={`px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 transition ${errors.name ? "border-red-300 bg-red-50" : "border-[var(--primary)]/20 bg-white"}`}
                                    />
                                    {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                                </div>

                                {/* Email */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email Address *</label>
                                    <input
                                        name="email" type="email" value={form.email} onChange={handle}
                                        placeholder="john@example.com"
                                        className={`px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 transition ${errors.email ? "border-red-300 bg-red-50" : "border-[var(--primary)]/20 bg-white"}`}
                                    />
                                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                                </div>

                                {/* Phone */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone (optional)</label>
                                    <input
                                        name="phone" type="tel" value={form.phone} onChange={handle}
                                        placeholder="+91 98765 43210"
                                        className="px-4 py-3 rounded-xl border border-[var(--primary)]/20 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 transition"
                                    />
                                </div>

                                {/* Subject */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject</label>
                                    <select
                                        name="subject" value={form.subject} onChange={handle}
                                        className="px-4 py-3 rounded-xl border border-[var(--primary)]/20 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 transition text-gray-600"
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="Order Issue">Order Issue</option>
                                        <option value="Delivery Problem">Delivery Problem</option>
                                        <option value="Return / Refund">Return / Refund</option>
                                        <option value="Bulk Order Enquiry">Bulk Order Enquiry</option>
                                        <option value="Product Quality">Product Quality</option>
                                        <option value="Payment Issue">Payment Issue</option>
                                        <option value="General Feedback">General Feedback</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                {/* Message */}
                                <div className="md:col-span-2 flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Message *</label>
                                    <textarea
                                        name="message" value={form.message} onChange={handle}
                                        rows={5}
                                        placeholder="Describe your issue or question in detail..."
                                        className={`px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 transition resize-none ${errors.message ? "border-red-300 bg-red-50" : "border-[var(--primary)]/20 bg-white"}`}
                                    />
                                    {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
                                    <p className="text-xs text-gray-400 text-right">{form.message.length}/500</p>
                                </div>
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="primary-btn w-full mt-6 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2"
                            >
                                <Send size={16} /> Send Message
                            </button>

                            <p className="text-xs text-center text-gray-400 mt-4">
                                By submitting, you agree to our{" "}
                                <span className="text-[var(--primary)] cursor-pointer hover:underline">Privacy Policy</span>.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}