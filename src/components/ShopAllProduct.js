"use client";


import { useState, useMemo, useEffect } from "react";
import { allProducts } from "@/data/product";
import Image from "next/image";
import { ShoppingCart, Search, ChevronDown, X, Check, Heart } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const mainCard = {
    title: "Fresh Groceries Delivered to Your Doorstep",
    text: `Browse our wide collection of fresh vegetables, fruits, dairy,
and daily essentials carefully selected for your everyday needs.`,
    image: "/shop/Everything You Need in One Place.png",
};

const categoryLabels = {
    "fruits-vegetables": "Fruits & Vegetables",
    dairy: "Dairy",
    snacks: "Snacks",
    beverages: "Beverages",
    grains: "Grains",
};

const subCategoryLabels = {
    fruits: "Fruits",
    vegetables: "Vegetables",
    milk: "Milk",
    cheese: "Cheese",
    chips: "Chips",
    biscuits: "Biscuits",
    juices: "Juices",
    "soft-drinks": "Soft Drinks",
    rice: "Rice",
    wheat: "Wheat",
};

function buildCategoryMap(products) {
    const map = {};
    products.forEach((p) => {
        const cat = p.category;
        const sub = p.subCategory;
        if (!map[cat]) map[cat] = new Set();
        if (sub) map[cat].add(sub);
    });
    const result = {};
    Object.entries(map).forEach(([cat, subs]) => {
        result[cat] = Array.from(subs);
    });
    return result;
}

const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    return parseFloat(String(priceStr).replace(/[^0-9.]/g, "")) || 0;
};

const ShopSlides = [
    { id: 1, image: "/shop/Fruits.avif", tag: "Farm Fresh", title: "Fresh & Juicy Fruits", description: "Discover a delicious selection of farm-fresh fruits packed with natural sweetness, vitamins, and nutrients. From everyday favorites to seasonal picks, enjoy quality fruits carefully sourced to keep you healthy and energized.", button: "Shop Fruits" },
    { id: 2, image: "/shop/Vegetables.webp", tag: "Farm Fresh", title: "Fresh & Healthy Vegetables", description: "Explore a wide variety of fresh, crisp vegetables sourced directly from trusted farms. Packed with essential nutrients and natural goodness, our vegetables are perfect for healthy meals every day.", button: "Shop Vegetables" },
    { id: 3, image: "/shop/Milk.jpg", tag: "Farm Fresh Dairy", title: "Pure & Fresh Milk", description: "Enjoy the goodness of fresh, pure milk sourced from trusted dairy farms. Rich in calcium, protein, and essential nutrients, our milk ensures quality and freshness for your daily nutrition.", button: "Shop Milk" },
    { id: 4, image: "/shop/Cheese.jpg", tag: "Premium Dairy", title: "Rich & Creamy Cheese", description: "Indulge in the rich taste and smooth texture of our premium cheese selection. Perfect for sandwiches, snacks, and cooking, our cheese is crafted to bring delicious flavor and quality to every meal.", button: "Shop Cheese" },
    { id: 5, image: "/shop/Chips.jpg", tag: "Snack Time", title: "Crispy & Tasty Chips", description: "Enjoy a delicious range of crispy chips perfect for every snack moment. From classic flavors to exciting varieties, our chips are packed with crunch and taste for every craving.", button: "Shop Chips" },
    { id: 6, image: "/shop/Biscuits.jpg", tag: "Snack Delight", title: "Crunchy & Delicious Biscuits", description: "Treat yourself to a delightful range of crunchy and flavorful biscuits perfect for tea time or quick snacks. From classic favorites to rich buttery varieties, enjoy biscuits made to satisfy every craving.", button: "Shop Biscuits" },
    { id: 7, image: "/shop/Juices.avif", tag: "Fresh Refreshment", title: "Fresh & Healthy Juices", description: "Quench your thirst with our refreshing range of fruit juices made from quality ingredients. Packed with natural flavor and nutrients, our juices are perfect for a healthy and refreshing drink anytime.", button: "Shop Juices" },
    { id: 8, image: "/shop/Soft Drinks.avif", tag: "Cool Refreshment", title: "Chilled & Refreshing Soft Drinks", description: "Enjoy a wide variety of chilled and refreshing soft drinks perfect for every moment. From classic fizzy favorites to flavorful beverages, find the perfect drink to refresh and energize your day.", button: "Shop Soft Drinks" },
    { id: 9, image: "/shop/Rice.jpg", tag: "Daily Essentials", title: "Premium Quality Rice", description: "Discover a range of premium quality rice perfect for everyday cooking. Carefully sourced and processed for purity and taste, our rice ensures fluffy, delicious meals for your family every day.", button: "Shop Rice" },
    { id: 10, image: "/shop/Wheat.jpg", tag: "Daily Essentials", title: "Pure & Nutritious Wheat", description: "Choose from high-quality wheat grains carefully sourced to ensure freshness and nutrition. Perfect for making soft rotis, wholesome breads, and a variety of healthy meals for your family.", button: "Shop Wheat" },
];

export default function ShopAllProduct() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const { addToCart } = useCart();
    const { toggleWishlist, isWishlisted } = useWishlist();

    const [addedMap, setAddedMap] = useState({});
    const [selectedQuantities, setSelectedQuantities] = useState({});
    const [current, setCurrent] = useState(0);
    const [visibleProducts, setVisibleProducts] = useState(12);

    // ── Read URL params on mount / param change ──────────────────────────
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
    const [selectedSubCategory, setSelectedSubCategory] = useState(searchParams.get("sub") || "");
    const [sortOrder, setSortOrder] = useState("");

    // Sync state when URL params change (e.g. navbar search)
    useEffect(() => {
        const q = searchParams.get("q") || "";
        const cat = searchParams.get("category") || "";
        const sub = searchParams.get("sub") || "";
        setSearchQuery(q);
        setSelectedCategory(cat);
        setSelectedSubCategory(sub);
        setVisibleProducts(12);

        // If any param arrived, scroll down to products
        if (q || cat || sub) {
            setTimeout(() => {
                document.getElementById("products-section")?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    }, [searchParams]);

    const [categoryOpen, setCategoryOpen] = useState(false);
    const [subCategoryOpen, setSubCategoryOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);

    const categoryMap = useMemo(() => buildCategoryMap(allProducts), []);
    const categories = Object.keys(categoryMap);
    const subCategories = selectedCategory ? categoryMap[selectedCategory] || [] : [];

    const filteredProducts = useMemo(() => {
        let result = [...allProducts];

        if (searchQuery.trim()) {
            const q = searchQuery.trim().toLowerCase();
            result = result.filter(
                (p) =>
                    p.name?.toLowerCase().includes(q) ||
                    p.category?.toLowerCase().includes(q) ||
                    p.subCategory?.toLowerCase().includes(q) ||
                    categoryLabels[p.category]?.toLowerCase().includes(q) ||
                    subCategoryLabels[p.subCategory]?.toLowerCase().includes(q)
            );
        }

        if (selectedCategory) result = result.filter((p) => p.category === selectedCategory);
        if (selectedSubCategory) result = result.filter((p) => p.subCategory === selectedSubCategory);

        if (sortOrder === "asc") result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        else if (sortOrder === "desc") result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));

        return result;
    }, [searchQuery, selectedCategory, selectedSubCategory, sortOrder]);

    const loadMore = () => setVisibleProducts((prev) => prev + 8);

    // Update URL when filters change locally
    const updateURL = (q, cat, sub) => {
        const params = new URLSearchParams();
        if (q) params.set("q", q);
        if (cat) params.set("category", cat);
        if (sub) params.set("sub", sub);
        const query = params.toString();
        router.replace(`/shop${query ? `?${query}` : ""}`, { scroll: false });
    };

    const handleCategorySelect = (cat) => {
        setSelectedCategory(cat);
        setSelectedSubCategory("");
        setCategoryOpen(false);
        setVisibleProducts(12);
        updateURL(searchQuery, cat, "");
    };

    const handleSubCategorySelect = (sub) => {
        setSelectedSubCategory(sub);
        setSubCategoryOpen(false);
        setVisibleProducts(12);
        updateURL(searchQuery, selectedCategory, sub);
    };

    const handleSortSelect = (val) => {
        setSortOrder(val);
        setSortOpen(false);
    };

    const handleLocalSearch = (val) => {
        setSearchQuery(val);
        setVisibleProducts(12);
        updateURL(val, selectedCategory, selectedSubCategory);
    };

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedCategory("");
        setSelectedSubCategory("");
        setSortOrder("");
        setVisibleProducts(12);
        router.replace("/shop", { scroll: false });
    };

    const hasActiveFilters = searchQuery || selectedCategory || selectedSubCategory || sortOrder;

    const getSelectedQty = (product) =>
        selectedQuantities[product.id] ?? product.quantities?.[0] ?? "";

    const handleAddToCart = (product) => {
        const qty = getSelectedQty(product);
        addToCart(product, qty);
        setAddedMap((prev) => ({ ...prev, [product.id]: true }));
        setTimeout(() => setAddedMap((prev) => ({ ...prev, [product.id]: false })), 1500);
    };

    // Auto Slide
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev === ShopSlides.length - 1 ? 0 : prev + 1));
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* Hero Slider */}
            <section className="relative w-full h-[64vh] md:h-[50vh] lg:h-[85vh]  2xl:h-[50vh] overflow-hidden">
                <div className="flex transition-transform duration-700 ease-in-out h-full" style={{ transform: `translateX(-${current * 100}%)` }}>
                    {ShopSlides.map((slide) => (
                        <div key={slide.id} className="w-full flex-shrink-0 relative h-full">
                            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/30" />
                            <div className="absolute inset-0 flex items-center px-6 md:px-16 2xl:px-50">
                                <div className="w-full xl:max-w-[50vw] text-white">
                                    <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm">{slide.tag}</span>
                                    <h1 className="mt-6 text-3xl md:text-5xl font-bold leading-tight">{slide.title}</h1>
                                    <p className="mt-4 text-base md:text-lg text-gray-200">{slide.description}</p>
                                    <button className="mt-6 primary-btn px-6 py-3 rounded-xl">{slide.button}</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                    {ShopSlides.map((_, index) => (
                        <div key={index} onClick={() => setCurrent(index)}
                            className={`transition-all duration-300 cursor-pointer rounded-full bg-white ${current === index ? "w-8 h-2" : "w-2 h-2 opacity-60"}`} />
                    ))}
                </div>
            </section>

            <section id="products-section" className="px-6 md:px-16 w-full bg-gradient-to-r from-[var(--secondary)] to-transparent">

                {/* Main Card */}
                <div className="relative w-full flex flex-col md:flex-row items-center p-6 rounded-xl mb-12 h-[350px]">
                    <div className="relative w-40 h-40 md:w-56 md:h-56 flex-shrink-0">
                        <Image src={mainCard.image} alt={mainCard.title} fill className="object-contain transition-transform duration-300 hover:scale-105" />
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6 flex-1 flex flex-col justify-center h-full relative">
                        <div className="flex justify-between items-center mb-2 w-full">
                            <span className="text-sm font-medium bg-[var(--primary)]/20 rounded-full px-4 py-2 uppercase">Featured</span>
                        </div>
                        <h2 className="relative inline-block pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-1 after:rounded-full after:bg-gradient-to-r after:from-[var(--primary)] after:to-transparent mb-4 w-fit">
                            <span className="text-[var(--primary)]">Everything </span> You Need in One Place
                        </h2>
                        <p className="mt-2 text-gray-600">{mainCard.text}</p>
                    </div>
                </div>

                {/* Search Bar — synced with URL */}
                <div className="flex justify-between w-full mb-6">
                    <div className="relative w-full md:w-1/2">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => handleLocalSearch(e.target.value)}
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--primary)]/30 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition"
                        />
                        {searchQuery && (
                            <button onClick={() => handleLocalSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 transition">
                                <X size={16} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Filters & Sort */}
                <div className="flex flex-wrap items-center gap-3 mb-6">

                    {/* Category */}
                    <div className="relative">
                        <button onClick={() => { setCategoryOpen((o) => !o); setSubCategoryOpen(false); setSortOpen(false); }}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--primary)]/30 bg-white/70 backdrop-blur-sm hover:bg-[var(--primary)]/10 transition">
                            {selectedCategory ? (categoryLabels[selectedCategory] || selectedCategory) : "All Categories"}
                            <ChevronDown size={16} className={`transition-transform ${categoryOpen ? "rotate-180" : ""}`} />
                        </button>
                        {categoryOpen && (
                            <div className="absolute z-20 mt-1 w-56 bg-white rounded-xl shadow-lg border border-[var(--primary)]/20 overflow-hidden">
                                <button onClick={() => handleCategorySelect("")} className={`w-full text-left px-4 py-2.5 hover:bg-[var(--primary)]/10 transition text-sm ${selectedCategory === "" ? "bg-[var(--primary)]/15 font-semibold" : ""}`}>All Categories</button>
                                {categories.map((cat) => (
                                    <button key={cat} onClick={() => handleCategorySelect(cat)} className={`w-full text-left px-4 py-2.5 hover:bg-[var(--primary)]/10 transition text-sm ${selectedCategory === cat ? "bg-[var(--primary)]/15 font-semibold" : ""}`}>
                                        {categoryLabels[cat] || cat}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* SubCategory */}
                    {selectedCategory && subCategories.length > 0 && (
                        <div className="relative">
                            <button onClick={() => { setSubCategoryOpen((o) => !o); setCategoryOpen(false); setSortOpen(false); }}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--primary)]/30 bg-white/70 backdrop-blur-sm hover:bg-[var(--primary)]/10 transition">
                                {selectedSubCategory ? (subCategoryLabels[selectedSubCategory] || selectedSubCategory) : "All Subcategories"}
                                <ChevronDown size={16} className={`transition-transform ${subCategoryOpen ? "rotate-180" : ""}`} />
                            </button>
                            {subCategoryOpen && (
                                <div className="absolute z-20 mt-1 w-52 bg-white rounded-xl shadow-lg border border-[var(--primary)]/20 overflow-hidden">
                                    <button onClick={() => handleSubCategorySelect("")} className={`w-full text-left px-4 py-2.5 hover:bg-[var(--primary)]/10 transition text-sm ${selectedSubCategory === "" ? "bg-[var(--primary)]/15 font-semibold" : ""}`}>All Subcategories</button>
                                    {subCategories.map((sub) => (
                                        <button key={sub} onClick={() => handleSubCategorySelect(sub)} className={`w-full text-left px-4 py-2.5 hover:bg-[var(--primary)]/10 transition text-sm ${selectedSubCategory === sub ? "bg-[var(--primary)]/15 font-semibold" : ""}`}>
                                            {subCategoryLabels[sub] || sub}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Sort */}
                    <div className="relative">
                        <button onClick={() => { setSortOpen((o) => !o); setCategoryOpen(false); setSubCategoryOpen(false); }}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--primary)]/30 bg-white/70 backdrop-blur-sm hover:bg-[var(--primary)]/10 transition">
                            {sortOrder === "asc" ? "Price: Low to High" : sortOrder === "desc" ? "Price: High to Low" : "Sort by Price"}
                            <ChevronDown size={16} className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
                        </button>
                        {sortOpen && (
                            <div className="absolute z-20 mt-1 w-52 bg-white rounded-xl shadow-lg border border-[var(--primary)]/20 overflow-hidden">
                                {[["", "Default"], ["asc", "Price: Low to High"], ["desc", "Price: High to Low"]].map(([val, label]) => (
                                    <button key={val} onClick={() => { setSortOrder(val); setSortOpen(false); }}
                                        className={`w-full text-left px-4 py-2.5 hover:bg-[var(--primary)]/10 transition text-sm ${sortOrder === val ? "bg-[var(--primary)]/15 font-semibold" : ""}`}>
                                        {label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {hasActiveFilters && (
                        <button onClick={clearFilters} className="flex items-center gap-1 px-3 py-2 rounded-xl border border-red-300 bg-red-50 hover:bg-red-100 transition text-sm">
                            <X size={14} /> Clear Filters
                        </button>
                    )}

                    <span className="ml-auto text-sm opacity-60">
                        {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
                    </span>
                </div>

                {/* Active search indicator */}
                {searchQuery && (
                    <div className="mb-4 flex items-center gap-2 text-sm text-[var(--primary)] bg-[var(--primary)]/10 px-4 py-2.5 rounded-xl w-fit">
                        <Search size={14} />
                        Showing results for <strong>"{searchQuery}"</strong>
                        <button onClick={() => handleLocalSearch("")} className="ml-2 hover:opacity-70 transition">
                            <X size={14} />
                        </button>
                    </div>
                )}

                {/* Products Grid */}
                {filteredProducts.length === 0 ? (
                    <div className="w-full flex flex-col items-center justify-center py-20 gap-4 opacity-60">
                        <Search size={48} className="opacity-30" />
                        <p className="text-lg font-medium">No products found for "{searchQuery}"</p>
                        <p className="text-sm">Try a different keyword or clear the filters</p>
                        <button onClick={clearFilters} className="primary-btn px-6 py-2 rounded-xl text-sm mt-1">Clear Filters</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                        {filteredProducts.slice(0, visibleProducts).map((p) => (
                            <div key={p.id} className="bg-gradient-to-b from-[var(--primary)]/10 to-transparent p-4 rounded-xl flex flex-col items-center transition-all duration-300 hover:scale-105 hover:from-[var(--primary)]/15 w-full h-[350px]">
                                <div className="relative w-full h-32 bg-[var(--secondary)]/50 flex items-center justify-center overflow-hidden rounded-lg">
                                    <Image src={p.image} alt={p.name} fill className="object-contain transition-transform duration-300 hover:scale-105" />
                                    <button
                                        onClick={() => toggleWishlist(p)}
                                        className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow hover:scale-110 transition-transform"
                                    >
                                        <Heart size={16} className={`transition-colors ${isWishlisted(p.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
                                    </button>
                                </div>

                                <h3 className="mt-2 font-semibold text-center">{p.name}</h3>

                                <select
                                    className="mt-1 border rounded px-2 py-1 w-full"
                                    value={getSelectedQty(p)}
                                    onChange={(e) => setSelectedQuantities((prev) => ({ ...prev, [p.id]: e.target.value }))}
                                >
                                    {p.quantities.map((q) => <option key={q} value={q}>{q}</option>)}
                                </select>

                                <div className="mt-2 w-full">
                                    <span className="font-bold block mb-2">{p.price}</span>
                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => handleAddToCart(p)}
                                            className={`primary-btn flex-1 rounded-xl px-3 py-2 flex items-center justify-center gap-2 transition-all ${addedMap[p.id] ? "opacity-80 scale-95" : ""}`}
                                        >
                                            {addedMap[p.id] ? <><Check size={16} /><span>Added!</span></> : <><ShoppingCart size={16} /><span className="lg:hidden">Add</span><span className="hidden lg:inline">Add to Cart</span></>}
                                        </button>
                                        <Link className="w-full" href={`/product/${p.id}`}>
                                            <button className="w-full secondary-btn flex-1 rounded-xl px-3 py-2 flex items-center justify-center">Buy Now</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {visibleProducts < filteredProducts.length && (
                    <div className="flex justify-center mt-10">
                        <button onClick={loadMore} className="primary-btn px-6 py-3 rounded-lg">Show More Products</button>
                    </div>
                )}
            </section>
        </>
    );
}