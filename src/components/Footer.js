"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Image from "next/image";

export default function Footer() {
    const pathname = usePathname();

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Shop", path: "/shop" },
        { name: "Categories", path: "/categories" },
        { name: "Offers", path: "/offers" },
        { name: "Bulk Orders", path: "/bulk-orders" },
        { name: "Track Order", path: "/track-order" },
    ];

    const Categories = [
        { name: "Fruits & Vegetables", path: "/shop/fruits-vegetables" },
        { name: "Dairy", path: "/shop/dairy" },
        { name: "Snacks", path: "/shop/snacks" },
        { name: "Beverages", path: "/shop/beverages" },
        { name: "Grains", path: "/shop/grainss" },
        
    ];

    const support = [
         { name: "Contact Us", path: "/contact" },
        { name: "FAQs", path: "/FAQs" },
        { name: "Shipping & Returns", path: "/Shipping&Returns" },
        { name: "Privacy Policy", path: "/Privacy&Policy" },
        { name: "Terms & Conditions", path: "/Terms&Conditions" },
    ];

    return (
        <footer className="bg-[var(--secondary)] text-black">

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-10 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

                {/* Left Section - Logo + About */}
                <div>
                    <div className="font-bold text-lg text-black">OJAIN FOODS</div>

                    <p className="text-sm leading-7 pt-5">

                        Fresh groceries and daily essentials delivered to your doorstep with quality and care.
                    </p>
                    <div className=" text-black bg-black/5 backdrop-blur-md rounded-2xl p-6 md:p-3 w-full max-w-xl shadow-lg">

                        {/* Phone */}
                        <div className="flex items-center gap-4 mb-4">
                            <Phone className="text-[var(--primary)] shrink-0" size={24} />
                            <p className="text-lg">
                                Call us: <span className="font-semibold">+91 89041 85704</span>
                            </p>
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-4 mb-4">
                            <Mail className="text-[var(--primary)] shrink-0" size={24} />
                            <p className="text-lg">
                                Email:{" "}
                                <span className="font-semibold">
                                    info@finesseessentials.co
                                </span>
                            </p>
                        </div>

                        {/* Working Hours */}
                        <p className="text-gray-500 ml-10">
                            Mon–Sat, 10 AM – 8 PM IST
                        </p>
                    </div>
                    
                </div>

                {/* Quick Links (ALL MENU OPTIONS) */}
                <div>
                    <h3 className="text-black text-lg font-semibold mb-6">
                        Quick Links
                    </h3>
                    <ul className="space-y-3">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.path}
                                    className={`transition duration-300 ${pathname === link.path
                                        ? "text-[color:var(--primary)]"
                                        : "hover:text-[color:var(--primary)]"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Our Products Section */}
                <div>
                    <h3 className="text-black text-lg font-semibold mb-6">
                        Categories
                    </h3>
                    <ul className="space-y-3">
                        {Categories.map((product) => (
                            <li key={product.name}>
                                <Link
                                    href={product.path}
                                    className={`transition duration-300 ${pathname === product.path
                                        ? "text-[color:var(--primary)]"
                                        : "hover:text-[color:var(--primary)]"
                                        }`}
                                >
                                    {product.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Quick Links (ALL MENU OPTIONS) */}
                <div>
                    <h3 className="text-black text-lg font-semibold mb-6">
                        Support
                    </h3>
                    <ul className="space-y-3">
                        {support.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.path}
                                    className={`transition duration-300 ${pathname === link.path
                                        ? "text-[color:var(--primary)]"
                                        : "hover:text-[color:var(--primary)]"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {/* ===== SOCIAL MEDIA LINKS ===== */}
                    <div className="mt-8 flex items-center justify-start gap-3">

                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full border border-white hover:text-white hover:bg-[var(--primary)] transition duration-300"
                        >
                            <Facebook size={22} />
                        </a>

                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full border border-white hover:text-white hover:bg-[var(--primary)] transition duration-300"
                        >
                            <Twitter size={22} />
                        </a>

                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full border border-white hover:text-white hover:bg-[var(--primary)] transition duration-300"
                        >
                            <Instagram size={22} />
                        </a>

                        <a
                            href="https://youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full border border-white hover:text-white hover:bg-[var(--primary)] transition duration-300"
                        >
                            <Youtube size={22} />
                        </a>

                    </div>
                </div>
                
            </div>

            {/* Bottom Copyright Section */}
            <div className="border-t border-gray-700">
                <div className="max-w-7xl mx-auto px-20 py-5 flex items-center justify-between text-sm text-gray-500">

                    {/* Left Side */}
                    <div>
                        © {new Date().getFullYear()} OJAIN. All Rights Reserved.
                    </div>

                    {/* Right Side */}
                    <div>
                        <Link
                            href="/terms-and-conditions"
                            className="text-gray-500  transition duration-300"
                        >
                            Terms & Conditions
                        </Link>
                    </div>

                </div>
            </div>

        </footer>
    );
}