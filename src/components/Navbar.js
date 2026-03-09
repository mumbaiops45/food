    "use client";

    import { useState, useEffect } from "react";
    import Link from "next/link";
    import {
        Search,
        User,
        Heart,
        ShoppingCart,
        Menu,
        X,
        ChevronDown,
        Facebook,Twitter ,Instagram,Youtube
    } from "lucide-react";

    /* ================= MENU DATA ================= */

            const menuItems = [
                { name: "Home", slug: "/" },
                { name: "Shop", slug: "/shop" },
                {
                    name: "Categories",
                    slug: "/categories",
                    subCategories: [
                        {
                            name: "Fruits & Vegetables",
                            slug: "/shop/fruits-vegetables",
                            items: [
                                { name: "Fresh Fruits", slug: "/shop/fruits" },
                                { name: "Fresh Vegetables", slug: "/shop/vegetables" },
                            ],
                        },
                        {
                            name: "Dairy",
                            slug: "/shop/dairy",
                            items: [
                                { name: "Milk", slug: "/shop/milk" },
                                { name: "Cheese", slug: "/shop/cheese" },
                            ],
                        },
                        {
                            name: "Snacks",
                            slug: "/shop/snacks",
                            items: [
                                { name: "Chips", slug: "/shop/chips" },
                                { name: "Biscuits", slug: "/shop/biscuits" },
                            ],
                        },
                        {
                            name: "Beverages",
                            slug: "/shop/beverages",
                            items: [
                                { name: "Juices", slug: "/shop/juices" },
                                { name: "Soft Drinks", slug: "/shop/soft-drinks" },
                            ],
                        },
                        {
                            name: "Grains",
                            slug: "/shop/grains",
                            items: [
                                { name: "Rice", slug: "/shop/rice" },
                                { name: "Wheat", slug: "/shop/wheat" },
                            ],
                        },
                        
                    ],
                },
                { name: "Offers", slug: "/offers" },
                { name: "Bulk Orders", slug: "/bulk-orders" },
                { name: "Track Order", slug: "/track-order" },
            ];

    export default function Navbar() {
        const [mobileOpen, setMobileOpen] = useState(false);

        const toggleMenu = () => setMobileOpen(!mobileOpen);
        const closeMenu = () => setMobileOpen(false);

        /* FIX: Close mobile menu on resize */
        useEffect(() => {
            const handleResize = () => {
                if (window.innerWidth >= 768) setMobileOpen(false);
            };
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);

        return (
            <>
                {/* ================= UPPER SECTION ================= */}
                <div className=" w-full py-6 px-6 flex items-center justify-between bg-[var(--secondary)]">

                    {/* Logo */}
                    <div className="font-bold text-lg text-black">OJAIN FOODS</div>

                    {/* Desktop Search */}
                    <div className="hidden md:flex items-center w-1/2 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search groceries..."
                            className="w-full pl-12 pr-32 py-4 rounded-xl  bg-white text-black outline-none"
                        />
                        <button className="primary-btn absolute right-2 px-6 py-2 rounded-xl">
                            Search
                        </button>
                    </div>

                    {/* Right Icons */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/account"
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--secondary)]/80 text-black"
                        >
                            <User size={18} />
                            <span className="hidden md:block">Account</span>
                        </Link>

                        <Link
                            href="/wishlist"
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--secondary)]/80 text-black"
                        >
                            <Heart size={18} />
                            <span className="hidden md:block">Wishlist</span>
                        </Link>

                        <Link
                            href="/cart"
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--secondary)]/80 text-black"
                        >
                            <ShoppingCart size={18} />
                            <span className="hidden md:block">Cart</span>
                        </Link>
                    </div>
                </div>

                {/* ================= LOWER SECTION ================= */}
                <div className="w-full px-6 py-3 flex items-center justify-between bg-[var(--primary)] text-white relative">

                    {/* ===== SOCIAL MEDIA LINKS ===== */}
                        <div className=" hidden md:flex items-center justify-start gap-3">

                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-full border border-white hover:text-black hover:bg-[var(--secondary)] transition duration-300"
                            >
                                <Facebook size={20} />
                            </a>

                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-full border border-white hover:text-black hover:bg-[var(--secondary)] transition duration-300"
                            >
                                <Twitter size={20} />
                            </a>

                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-full border border-white hover:text-black hover:bg-[var(--secondary)] transition duration-300"
                            >
                                <Instagram size={20} />
                            </a>

                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-full border border-white hover:text-black hover:bg-[var(--secondary)] transition duration-300"
                            >
                                <Youtube size={20} />
                            </a>

                        </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-8 font-medium">
                        {menuItems.map((item, index) => (
                            <div key={index} className="relative group">
                                <Link
                                    href={item.slug}
                                    className="flex items-center gap-1 hover:text-[var(--secondary)] transition"
                                >
                                    {item.name}
                                    {item.subCategories && <ChevronDown size={16} />}
                                </Link>

                                {/* LEVEL 1 DROPDOWN */}
                                {item.subCategories && (
                                    <div className="z-1 absolute left-0 top-8 bg-white text-black shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[200px]">

                                        {item.subCategories.map((sub, i) => (
                                            <div key={i} className="relative group/sub">

                                                <Link
                                                    href={sub.slug}
                                                    className="flex justify-between items-center px-4 py-2 hover:bg-[var(--secondary)] transition"
                                                >
                                                    {sub.name}
                                                    <ChevronDown size={14} className="-rotate-90" />
                                                </Link>

                                                {/* LEVEL 2 DROPDOWN */}
                                                <div className="absolute left-full top-0 bg-white shadow-lg rounded-md opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 min-w-[180px]">
                                                    {sub.items.map((child, j) => (
                                                        <Link
                                                            key={j}
                                                            href={child.slug}
                                                            className="block px-4 py-2 hover:bg-[var(--secondary)] transition"
                                                        >
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

                    {/* Mobile Left: Search */}
                    <div className="md:hidden w-3/4 relative">
                        
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="text"
                                placeholder="Search groceries..."
                                className="w-full pl-12 pr-32 py-4 rounded-xl  bg-white text-black outline-none"
                            />
                            <button className="primary-btn absolute right-2 bottom-2 px-6 py-2 rounded-xl">
                                Search
                            </button>
                    </div>

                    {/* Mobile Right: Hamburger */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden"
                    >
                        {mobileOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* ================= MOBILE SLIDE MENU ================= */}
                <div
                    className={`absolute top-40 right-0 h-full bg-[var(--primary)] shadow-lg transform transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                    style={{ width: "70vw", zIndex: 1000 }}
                >
                    <div className="p-6 flex flex-col gap-4">
                        {menuItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.slug}
                                onClick={closeMenu}
                                className="py-2 border-b"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </>
        );
    }