"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Search, User, Heart, ShoppingCart,
    Menu, X, ChevronDown,
    Facebook, Twitter, Instagram, Youtube
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const menuItems = [
    { name: "Home", slug: "/" },
    { name: "Shop", slug: "/shop" },
    {
        name: "Categories",
        slug: "/categories",
        subCategories: [
            {
                name: "Fruits & Vegetables",
                slug: "/shop?category=fruits-vegetables",
                items: [
                    { name: "Fresh Fruits", slug: "/shop?category=fruits-vegetables&sub=fruits" },
                    { name: "Fresh Vegetables", slug: "/shop?category=fruits-vegetables&sub=vegetables" },
                ],
            },
            {
                name: "Dairy",
                slug: "/shop?category=dairy",
                items: [
                    { name: "Milk", slug: "/shop?category=dairy&sub=milk" },
                    { name: "Cheese", slug: "/shop?category=dairy&sub=cheese" },
                ],
            },
            {
                name: "Snacks",
                slug: "/shop?category=snacks",
                items: [
                    { name: "Chips", slug: "/shop?category=snacks&sub=chips" },
                    { name: "Biscuits", slug: "/shop?category=snacks&sub=biscuits" },
                ],
            },
            {
                name: "Beverages",
                slug: "/shop?category=beverages",
                items: [
                    { name: "Juices", slug: "/shop?category=beverages&sub=juices" },
                    { name: "Soft Drinks", slug: "/shop?category=beverages&sub=soft-drinks" },
                ],
            },
            {
                name: "Grains",
                slug: "/shop?category=grains",
                items: [
                    { name: "Rice", slug: "/shop?category=grains&sub=rice" },
                    { name: "Wheat", slug: "/shop?category=grains&sub=wheat" },
                ],
            },
        ],
    },
    { name: "Offers", slug: "/offers" },
    { name: "Bulk Orders", slug: "/bulk-orders" },
    { name: "Track Order", slug: "/track-order" },
];

/* ── Reusable Search Bar ── */
function SearchBar({ className = "" }) {
    const router = useRouter();
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        const q = query.trim();
        if (!q) return;
        router.push(`/shop?q=${encodeURIComponent(q)}`);
        setQuery("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearch();
    };

    return (
        <div className={`relative ${className} rounded-xl`}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search groceries..."
                className="w-full pl-12 pr-32 py-4 rounded-xl text-black outline-none"
            />
            <button
                onClick={handleSearch}
                className="primary-btn absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 rounded-xl"
            >
                Search
            </button>
        </div>
    );
}

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { cartCount } = useCart();
    const { wishlistCount } = useWishlist();

    const toggleMenu = () => setMobileOpen(!mobileOpen);
    const closeMenu = () => setMobileOpen(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setMobileOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="sticky top-0 z-50">

            {/* ================= UPPER SECTION ================= */}
            <div className="w-full py-6 px-6 flex items-center justify-between bg-[var(--secondary)]">

                {/* Logo */}
                <Link href="/" className="font-bold text-lg text-black flex-shrink-0">
                    OJAIN FOODS
                </Link>

                {/* Desktop Search */}
                <SearchBar className="hidden md:block w-1/2 bg-gray-300/30" />

                {/* Right Icons */}
                <div className="flex items-center gap-4">
                    <Link href="/account" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--secondary)]/80 text-black">
                        <User size={18} />
                        <span className="hidden md:block">Account</span>
                    </Link>

                    {/* Wishlist with badge */}
                    <Link href="/wishlist" className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--secondary)]/80 text-black">
                        <Heart size={18} />
                        <span className="hidden md:block">Wishlist</span>
                        {wishlistCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center">
                                {wishlistCount > 9 ? "9+" : wishlistCount}
                            </span>
                        )}
                    </Link>

                    {/* Cart with badge */}
                    <Link href="/cart" className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--secondary)]/80 text-black">
                        <ShoppingCart size={18} />
                        <span className="hidden md:block">Cart</span>
                        {cartCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-[var(--primary)] text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center">
                                {cartCount > 9 ? "9+" : cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* ================= LOWER SECTION ================= */}
            <div className="w-full px-6 py-3 flex items-center justify-between bg-[var(--primary)] text-white relative">

                {/* Social Media */}
                <div className="hidden md:flex items-center justify-start gap-3">
                    {[
                        { href: "https://facebook.com",  Icon: Facebook  },
                        { href: "https://twitter.com",   Icon: Twitter   },
                        { href: "https://instagram.com", Icon: Instagram },
                        { href: "https://youtube.com",   Icon: Youtube   },
                    ].map(({ href, Icon }) => (
                        <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                            className="p-3 rounded-full border border-white hover:text-black hover:bg-[var(--secondary)] transition duration-300">
                            <Icon size={20} />
                        </a>
                    ))}
                </div>

                {/* Desktop Nav Menu */}
                <div className="hidden md:flex gap-8 font-medium">
                    {menuItems.map((item, index) => (
                        <div key={index} className="relative group">
                            <Link href={item.slug} className="flex items-center gap-1 hover:text-[var(--secondary)] transition">
                                {item.name}
                                {item.subCategories && <ChevronDown size={16} />}
                            </Link>

                            {/* Level 1 Dropdown */}
                            {item.subCategories && (
                                <div className="absolute left-0 top-8 bg-white text-black shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[200px] z-50">
                                    {item.subCategories.map((sub, i) => (
                                        <div key={i} className="relative group/sub">
                                            <Link href={sub.slug} className="flex justify-between items-center px-4 py-2 hover:bg-[var(--secondary)] transition">
                                                {sub.name}
                                                <ChevronDown size={14} className="-rotate-90" />
                                            </Link>
                                            {/* Level 2 Dropdown */}
                                            <div className="absolute left-full top-0 bg-white shadow-lg rounded-md opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 min-w-[180px] z-50">
                                                {sub.items.map((child, j) => (
                                                    <Link key={j} href={child.slug} className="block px-4 py-2 hover:bg-[var(--secondary)] transition">
                                                        {child.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Mobile Search */}
                <SearchBar className="md:hidden w-3/4 bg-white" />

                {/* Mobile Hamburger */}
                <button onClick={toggleMenu} className="md:hidden">
                    {mobileOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* ================= MOBILE SLIDE MENU ================= */}
            <div
                className={`absolute top-full right-0 bg-[var(--primary)] text-white shadow-xl transform transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
                style={{ width: "70vw", zIndex: 1000 }}
            >
                <div className="p-6 flex flex-col gap-4">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.slug}
                            onClick={closeMenu}
                            className="py-2 border-b border-white/20 hover:text-[var(--secondary)] transition"
                        >
                            {item.name}
                        </Link>
                    ))}
                    {/* Mobile icon links */}
                    <div className="flex gap-4 pt-2 flex-wrap">
                        <Link href="/account" onClick={closeMenu} className="flex items-center gap-1 text-sm hover:text-[var(--secondary)] transition">
                            <User size={15} /> Account
                        </Link>
                        <Link href="/wishlist" onClick={closeMenu} className="flex items-center gap-1 text-sm hover:text-[var(--secondary)] transition">
                            <Heart size={15} /> Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
                        </Link>
                        <Link href="/cart" onClick={closeMenu} className="flex items-center gap-1 text-sm hover:text-[var(--secondary)] transition">
                            <ShoppingCart size={15} /> Cart {cartCount > 0 && `(${cartCount})`}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}