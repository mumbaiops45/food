"use client";

import { useState } from "react";
import Link from "next/link";
import {
    User, Mail, Lock, Phone, MapPin, Eye, EyeOff,
    ShoppingBag, Heart, LogOut, Edit3, Save, X,
    Package, ChevronRight, Shield, Bell, Trash2
} from "lucide-react";

/* ── Fake order history for demo ─────────────────────────────────────── */
const MOCK_ORDERS = [
    { id: "OJ-1042", date: "5 Mar 2026", items: 3, total: "₹648.00", status: "Delivered" },
    { id: "OJ-1038", date: "28 Feb 2026", items: 1, total: "₹189.00", status: "In Transit" },
    { id: "OJ-1021", date: "14 Feb 2026", items: 5, total: "₹1,240.00", status: "Delivered" },
];

const STATUS_COLORS = {
    Delivered: "bg-green-100 text-green-700",
    "In Transit": "bg-amber-100 text-amber-700",
    Processing: "bg-blue-100 text-blue-700",
    Cancelled: "bg-red-100 text-red-600",
};

/* ── Reusable Input ───────────────────────────────────────────────────── */
function Field({ label, name, type = "text", value, onChange, placeholder, icon: Icon, disabled, suffix }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
            <div className="relative">
                {Icon && <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />}
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`w-full ${Icon ? "pl-10" : "pl-4"} ${suffix ? "pr-10" : "pr-4"} py-3 rounded-xl border text-sm transition
                        ${disabled
                            ? "bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-white border-[var(--primary)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
                        }`}
                />
                {suffix && <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{suffix}</div>}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════════
   AUTH SCREEN  (Login / Register)
═══════════════════════════════════════════════════════════════════════ */
const DEMO_USERS = [
    { email: "demo@ojainfoods.com", password: "demo123", name: "Demo User", phone: "+91 98765 43210" },
    { email: "john@example.com",    password: "john123",  name: "John Doe",   phone: "+91 91234 56789" },
    { email: "admin@ojain.com",     password: "admin123", name: "Admin",      phone: "+91 99999 00000" },
];

function AuthScreen({ onLogin }) {
    const [mode, setMode] = useState("login"); // "login" | "register"
    const [showPass, setShowPass] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
    const [error, setError] = useState("");

    const handle = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

const submit = () => {
    setError("");
    if (mode === "login") {
        if (!form.email || !form.password) return setError("Please fill in all fields.");
        const match = DEMO_USERS.find(
            (u) => u.email === form.email && u.password === form.password
        );
        if (!match) return setError("Invalid email or password.");
        onLogin({ name: match.name, email: match.email, phone: match.phone });
    } else {
        if (!form.name || !form.email || !form.password || !form.confirm)
            return setError("Please fill in all fields.");
        if (form.password !== form.confirm)
            return setError("Passwords do not match.");
        if (form.password.length < 6)
            return setError("Password must be at least 6 characters.");
        onLogin({ name: form.name, email: form.email, phone: form.phone });
    }
};

    return (
        <section className="min-h-screen bg-gradient-to-br from-[var(--secondary)]/40 to-transparent flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md">

                {/* Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-[var(--primary)]/10 overflow-hidden">

                    {/* Top stripe */}
                    <div className="bg-[var(--primary)] px-8 pt-10 pb-8 text-white">
                        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                            <User size={28} className="text-white" />
                        </div>
                        <h1 className="text-2xl font-bold">
                            {mode === "login" ? "Welcome back" : "Create account"}
                        </h1>
                        <p className="text-white/70 text-sm mt-1">
                            {mode === "login" ? "Sign in to your OJAIN FOODS account" : "Join OJAIN FOODS today"}
                        </p>
                    </div>

                    {/* Form */}
                    <div className="px-8 py-8 flex flex-col gap-4">

                        {/* Tab toggle */}
                        <div className="flex bg-gray-100 rounded-xl p-1 mb-2">
                            {["login", "register"].map((m) => (
                                <button
                                    key={m}
                                    onClick={() => { setMode(m); setError(""); }}
                                    className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${mode === m ? "bg-white shadow text-[var(--primary)]" : "text-gray-500"}`}
                                >
                                    {m === "login" ? "Sign In" : "Register"}
                                </button>
                            ))}
                        </div>

                        {mode === "register" && (
                            <Field label="Full Name" name="name" value={form.name} onChange={handle} placeholder="John Doe" icon={User} />
                        )}

                        <Field label="Email" name="email" type="email" value={form.email} onChange={handle} placeholder="john@example.com" icon={Mail} />

                        {mode === "register" && (
                            <Field label="Phone (optional)" name="phone" type="tel" value={form.phone} onChange={handle} placeholder="+91 98765 43210" icon={Phone} />
                        )}

                        <Field
                            label="Password"
                            name="password"
                            type={showPass ? "text" : "password"}
                            value={form.password}
                            onChange={handle}
                            placeholder="••••••••"
                            icon={Lock}
                            suffix={
                                <button onClick={() => setShowPass((p) => !p)} className="text-gray-400 hover:text-gray-600">
                                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            }
                        />

                        {mode === "register" && (
                            <Field label="Confirm Password" name="confirm" type="password" value={form.confirm} onChange={handle} placeholder="••••••••" icon={Lock} />
                        )}

                        {error && (
                            <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-2">{error}</p>
                        )}

                        {mode === "login" && (
                            <p className="text-right text-xs text-[var(--primary)] hover:underline cursor-pointer">Forgot password?</p>
                        )}

                        <button
                            onClick={submit}
                            className="primary-btn w-full py-3.5 rounded-xl font-semibold mt-1"
                        >
                            {mode === "login" ? "Sign In →" : "Create Account →"}
                        </button>

                        <p className="text-center text-xs text-gray-400 mt-2">
                            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                            <span
                                onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
                                className="text-[var(--primary)] font-semibold cursor-pointer hover:underline"
                            >
                                {mode === "login" ? "Register" : "Sign In"}
                            </span>
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}

/* ═══════════════════════════════════════════════════════════════════════
   DASHBOARD SCREEN
═══════════════════════════════════════════════════════════════════════ */
const TABS = [
    { key: "profile", label: "Profile", icon: User },
    { key: "orders", label: "My Orders", icon: Package },
    { key: "wishlist", label: "Wishlist", icon: Heart },
    { key: "settings", label: "Settings", icon: Shield },
];

function Dashboard({ user, onLogout }) {
    const [activeTab, setActiveTab] = useState("profile");
    const [editing, setEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        address: "",
        city: "",
        pincode: "",
    });
    const [saved, setSaved] = useState(false);

    const handleProfile = (e) => setProfile((p) => ({ ...p, [e.target.name]: e.target.value }));

    const saveProfile = () => {
        setEditing(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-[var(--secondary)]/30 to-transparent px-6 md:px-16 py-10">

            {/* ── Page Header ── */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold">My Account</h1>
                    <p className="text-gray-500 text-sm mt-0.5">Welcome back, <span className="text-[var(--primary)] font-semibold">{profile.name}</span></p>
                </div>
                <button
                    onClick={onLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition text-sm"
                >
                    <LogOut size={16} /> Sign Out
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">

                {/* ── Sidebar ── */}
                <aside className="lg:w-64 flex-shrink-0">
                    {/* Avatar card */}
                    <div className="bg-[var(--primary)] text-white rounded-2xl p-6 mb-4 flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold mb-3">
                            {profile.name.charAt(0).toUpperCase()}
                        </div>
                        <p className="font-bold text-lg leading-tight">{profile.name}</p>
                        <p className="text-white/70 text-xs mt-1 truncate max-w-full">{profile.email}</p>
                    </div>

                    {/* Nav */}
                    <div className="bg-white rounded-2xl border border-[var(--primary)]/10 overflow-hidden shadow-sm">
                        {TABS.map(({ key, label, icon: Icon }) => (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key)}
                                className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition border-b border-gray-50 last:border-0 ${activeTab === key
                                        ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                                        : "text-gray-600 hover:bg-gray-50"
                                    }`}
                            >
                                <Icon size={17} />
                                {label}
                                {activeTab === key && <ChevronRight size={14} className="ml-auto" />}
                            </button>
                        ))}
                    </div>

                    {/* Quick links */}
                    <div className="mt-4 flex flex-col gap-2">
                        <Link href="/cart" className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-[var(--primary)]/10 text-sm hover:border-[var(--primary)]/30 transition">
                            <ShoppingBag size={15} className="text-[var(--primary)]" /> Go to Cart
                        </Link>
                        <Link href="/shop" className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-[var(--primary)]/10 text-sm hover:border-[var(--primary)]/30 transition">
                            <Package size={15} className="text-[var(--primary)]" /> Browse Shop
                        </Link>
                    </div>
                </aside>

                {/* ── Main Panel ── */}
                <div className="flex-1">

                    {/* PROFILE TAB */}
                    {activeTab === "profile" && (
                        <div className="bg-white rounded-2xl border border-[var(--primary)]/10 shadow-sm p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-bold text-lg">Personal Details</h2>
                                {!editing ? (
                                    <button
                                        onClick={() => setEditing(true)}
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--primary)]/30 text-sm text-[var(--primary)] hover:bg-[var(--primary)]/5 transition"
                                    >
                                        <Edit3 size={14} /> Edit
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button onClick={() => setEditing(false)} className="flex items-center gap-1 px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition">
                                            <X size={14} /> Cancel
                                        </button>
                                        <button onClick={saveProfile} className="flex items-center gap-1 px-4 py-2 rounded-xl primary-btn text-sm">
                                            <Save size={14} /> Save
                                        </button>
                                    </div>
                                )}
                            </div>

                            {saved && (
                                <div className="mb-4 px-4 py-2.5 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl">
                                    ✓ Profile saved successfully!
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Field label="Full Name" name="name" value={profile.name} onChange={handleProfile} placeholder="John Doe" icon={User} disabled={!editing} />
                                <Field label="Email" name="email" type="email" value={profile.email} onChange={handleProfile} placeholder="john@example.com" icon={Mail} disabled={!editing} />
                                <Field label="Phone" name="phone" type="tel" value={profile.phone} onChange={handleProfile} placeholder="+91 98765 43210" icon={Phone} disabled={!editing} />
                                <Field label="Pincode" name="pincode" value={profile.pincode} onChange={handleProfile} placeholder="400001" icon={MapPin} disabled={!editing} />
                                <div className="md:col-span-2">
                                    <Field label="Address" name="address" value={profile.address} onChange={handleProfile} placeholder="House No., Street, Area" icon={MapPin} disabled={!editing} />
                                </div>
                                <Field label="City" name="city" value={profile.city} onChange={handleProfile} placeholder="Mumbai" disabled={!editing} />
                            </div>
                        </div>
                    )}

                    {/* ORDERS TAB */}
                    {activeTab === "orders" && (
                        <div className="bg-white rounded-2xl border border-[var(--primary)]/10 shadow-sm p-6">
                            <h2 className="font-bold text-lg mb-6">My Orders</h2>
                            {MOCK_ORDERS.length === 0 ? (
                                <div className="flex flex-col items-center py-16 gap-3 opacity-50">
                                    <Package size={48} />
                                    <p>No orders yet</p>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    {MOCK_ORDERS.map((order) => (
                                        <div key={order.id} className="flex items-center justify-between p-4 rounded-xl border border-[var(--primary)]/10 hover:border-[var(--primary)]/30 transition bg-[var(--primary)]/3">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
                                                    <ShoppingBag size={18} className="text-[var(--primary)]" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-sm">{order.id}</p>
                                                    <p className="text-xs text-gray-400">{order.date} · {order.items} item{order.items > 1 ? "s" : ""}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_COLORS[order.status] || "bg-gray-100 text-gray-600"}`}>
                                                    {order.status}
                                                </span>
                                                <span className="font-bold text-sm">{order.total}</span>
                                                <Link href="/track-order" className="text-xs text-[var(--primary)] hover:underline">
                                                    Track
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* WISHLIST TAB */}
                    {activeTab === "wishlist" && (
                        <div className="bg-white rounded-2xl border border-[var(--primary)]/10 shadow-sm p-6">
                            <h2 className="font-bold text-lg mb-6">My Wishlist</h2>
                            <div className="flex flex-col items-center py-16 gap-3 opacity-50">
                                <Heart size={48} />
                                <p className="font-medium">Your wishlist is empty</p>
                                <Link href="/shop">
                                    <button className="primary-btn px-6 py-2 rounded-xl text-sm mt-2 opacity-100">
                                        Browse Products
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* SETTINGS TAB */}
                    {activeTab === "settings" && (
                        <div className="bg-white rounded-2xl border border-[var(--primary)]/10 shadow-sm p-6">
                            <h2 className="font-bold text-lg mb-6">Settings</h2>

                            <div className="flex flex-col gap-4">
                                {/* Change Password */}
                                <div className="p-5 rounded-xl border border-[var(--primary)]/10 bg-[var(--primary)]/3">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Lock size={18} className="text-[var(--primary)]" />
                                        <p className="font-semibold">Change Password</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Field label="Current Password" name="current" type="password" value="" onChange={() => {}} placeholder="••••••••" />
                                        <Field label="New Password" name="new" type="password" value="" onChange={() => {}} placeholder="••••••••" />
                                    </div>
                                    <button className="primary-btn px-5 py-2 rounded-xl text-sm mt-4">Update Password</button>
                                </div>

                                {/* Notifications */}
                                <div className="p-5 rounded-xl border border-[var(--primary)]/10 bg-[var(--primary)]/3">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Bell size={18} className="text-[var(--primary)]" />
                                        <p className="font-semibold">Notifications</p>
                                    </div>
                                    {[
                                        { label: "Order updates via Email", defaultChecked: true },
                                        { label: "Promotional offers & deals", defaultChecked: false },
                                        { label: "New product arrivals", defaultChecked: true },
                                    ].map(({ label, defaultChecked }) => (
                                        <label key={label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 cursor-pointer">
                                            <span className="text-sm text-gray-700">{label}</span>
                                            <input type="checkbox" defaultChecked={defaultChecked} className="accent-[var(--primary)] w-4 h-4" />
                                        </label>
                                    ))}
                                </div>

                                {/* Danger Zone */}
                                <div className="p-5 rounded-xl border border-red-200 bg-red-50">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Trash2 size={18} className="text-red-500" />
                                        <p className="font-semibold text-red-600">Danger Zone</p>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-3">Permanently delete your account and all data.</p>
                                    <button className="px-5 py-2 rounded-xl border border-red-300 text-red-500 text-sm hover:bg-red-100 transition">
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════════════════════════════════════
   ROOT EXPORT
═══════════════════════════════════════════════════════════════════════ */
export default function AccountPage() {
    const [user, setUser] = useState(null);

    if (!user) {
        return <AuthScreen onLogin={(u) => setUser(u)} />;
    }

    return <Dashboard user={user} onLogout={() => setUser(null)} />;
}