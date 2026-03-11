"use client";

import { useState, useMemo } from "react";
import { allProducts } from "@/data/product";
import Image from "next/image";
import { ShoppingCart, Search, ChevronDown, X, ArrowLeft ,Check,Heart} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext"; 

// ─── Slug → filter config map ───────────────────────────────────────────────
const slugConfig = {

  // Category-level slugs
  "fruits-vegetables": { category: "fruits-vegetables", subCategory: null, label: "Fruits & Vegetables" },
  "dairy":             { category: "dairy",             subCategory: null, label: "Dairy" },
  "snacks":            { category: "snacks",            subCategory: null, label: "Snacks" },
  "beverages":         { category: "beverages",         subCategory: null, label: "Beverages" },
  "grains":            { category: "grains",            subCategory: null, label: "Grains" },

  // NEW CATEGORY SLUGS
 
  "bakery":            { category: "bakery",            subCategory: null, label: "Bakery" },
  "frozen-foods":      { category: "frozen-foods",      subCategory: null, label: "Frozen Foods" },


  // SubCategory-level slugs
  "fruits":       { category: "fruits-vegetables", subCategory: "fruits",      label: "Fresh Fruits" },
  "vegetables":   { category: "fruits-vegetables", subCategory: "vegetables",  label: "Fresh Vegetables" },

  "milk":         { category: "dairy",             subCategory: "milk",        label: "Milk" },
  "cheese":       { category: "dairy",             subCategory: "cheese",      label: "Cheese" },

  "chips":        { category: "snacks",            subCategory: "chips",       label: "Chips" },
  "biscuits":     { category: "snacks",            subCategory: "biscuits",    label: "Biscuits" },

  "juices":       { category: "beverages",         subCategory: "juices",      label: "Juices" },
  "soft-drinks":  { category: "beverages",         subCategory: "soft-drinks", label: "Soft Drinks" },

  "rice":         { category: "grains",            subCategory: "rice",        label: "Rice" },
  "wheat":        { category: "grains",            subCategory: "wheat",       label: "Wheat" },


  // NEW SUBCATEGORIES

  "bread":        { category: "bakery",     subCategory: "bread",       label: "Bread" },
  "cakes":        { category: "bakery",     subCategory: "cakes",       label: "Cakes" },

  "ice-cream":    { category: "frozen-foods", subCategory: "ice-cream",    label: "Ice Cream" },
  "frozen-snacks":{ category: "frozen-foods", subCategory: "frozen-snacks",label: "Frozen Snacks" },

};

// Hero banners per slug
const heroBanners = {
  "fruits-vegetables": { image: "/shop/Fruits.avif", tag: "Farm Fresh", title: "Fruits & Vegetables" },
  "dairy":             { image: "/shop/Milk.jpg", tag: "Farm Fresh Dairy", title: "Dairy Products" },
  "snacks":            { image: "/shop/Chips.jpg", tag: "Snack Time", title: "Snacks" },
  "beverages":         { image: "/shop/Juices.avif", tag: "Refreshment", title: "Beverages" },
  "grains":            { image: "/shop/Rice.jpg", tag: "Daily Essentials", title: "Grains" },

  // NEW MAIN CATEGORIES
 
  "bakery":            { image: "/shop/Bread.jpg", tag: "Freshly Baked", title: "Bakery Items" },
  "frozen-foods":      { image: "/shop/Icecream.jpg", tag: "Frozen Treats", title: "Frozen Foods" },

  // SUBCATEGORIES
  "fruits":            { image: "/shop/Fruits.avif", tag: "Farm Fresh", title: "Fresh Fruits" },
  "vegetables":        { image: "/shop/Vegetables.jpg", tag: "Farm Fresh", title: "Fresh Vegetables" },

  "milk":              { image: "/shop/Milk.jpg", tag: "Farm Fresh Dairy", title: "Pure & Fresh Milk" },
  "cheese":            { image: "/shop/Cheese.jpg", tag: "Premium Dairy", title: "Rich & Creamy Cheese" },

  "chips":             { image: "/shop/Chips.jpg", tag: "Snack Time", title: "Crispy Chips" },
  "biscuits":          { image: "/shop/Biscuits.jpg", tag: "Snack Delight", title: "Crunchy Biscuits" },

  "juices":            { image: "/shop/Juices.avif", tag: "Fresh Refreshment", title: "Fresh Juices" },
  "soft-drinks":       { image: "/shop/Soft Drinks.avif", tag: "Cool Refreshment", title: "Soft Drinks" },

  "rice":              { image: "/shop/Rice.jpg", tag: "Daily Essentials", title: "Premium Rice" },
  "wheat":             { image: "/shop/Wheat.jpg", tag: "Daily Essentials", title: "Pure Wheat" },

  // NEW SUBCATEGORIES


  "bread":             { image: "/shop/Bread.jpg", tag: "Freshly Baked", title: "Fresh Bread" },
  "cakes":             { image: "/shop/Cakes.jpg", tag: "Sweet Delights", title: "Delicious Cakes" },

  "ice-cream":         { image: "/shop/Icecream.jpg", tag: "Frozen Treats", title: "Ice Cream" },
  "frozen-snacks":     { image: "/shop/Frozen Snacks.jpg", tag: "Quick Snacks", title: "Frozen Snacks" },
};

const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  return parseFloat(String(priceStr).replace(/[^0-9.]/g, "")) || 0;
};

// ─── Page Component ───────────────────────────────────────────────────────────
export default function ShopSlugPage() {
   const { toggleWishlist, isWishlisted } = useWishlist();
    const { addToCart } = useCart();
  const [addedMap, setAddedMap] = useState({});
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const params = useParams();
  const slug = params?.slug ?? "";

  const config = slugConfig[slug];
  const banner = heroBanners[slug];

  const [searchQuery, setSearchQuery]       = useState("");
  const [sortOrder, setSortOrder]           = useState("");
  const [sortOpen, setSortOpen]             = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(12);

  // ── Filter products based on slug config ────────────────────────────────
  const filteredProducts = useMemo(() => {
    if (!config) return [];

    let result = allProducts.filter((p) => {
      const matchCat = p.category === config.category;
      const matchSub = config.subCategory ? p.subCategory === config.subCategory : true;
      return matchCat && matchSub;
    });

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.subCategory?.toLowerCase().includes(q)
      );
    }

    if (sortOrder === "asc") result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    if (sortOrder === "desc") result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));

    return result;
  }, [slug, searchQuery, sortOrder, config]);

  const handleSortSelect = (val) => { setSortOrder(val); setSortOpen(false); };
  const loadMore = () => setVisibleProducts((prev) => prev + 8);

 const getSelectedQty = (product) =>
    selectedQuantities[product.id] ?? product.quantities?.[0] ?? "";

   const handleAddToCart = (product) => {
    const qty = getSelectedQty(product);
    addToCart(product, qty);
    setAddedMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(
      () => setAddedMap((prev) => ({ ...prev, [product.id]: false })),
      1500
    );
  };

  // ── 404-like state for unknown slugs ────────────────────────────────────
  if (!config) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-6">
        <h2 className="text-2xl font-bold">Category not found</h2>
        <p className="text-gray-500">The page <code className="bg-gray-100 px-2 py-1 rounded">/shop/{slug}</code> does not exist.</p>
        <Link href="/shop" className="primary-btn px-6 py-2 rounded-xl">← Back to Shop</Link>
      </div>
    );
  }

  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="relative w-full h-[40vh] overflow-hidden">
        <img
          src={banner?.image ?? "/Essential Grocery.png"}
          alt={banner?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 text-white">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-4">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-white transition">Shop</Link>
            {config.subCategory && (
              <>
                <span>/</span>
                <Link
                  href={`/shop/${config.category}`}
                  className="hover:text-white transition capitalize"
                >
                  {slugConfig[config.category]?.label}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-white font-medium">{config.label}</span>
          </nav>

          <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm w-fit mb-3">
            {banner?.tag}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold">{banner?.title}</h1>
        </div>
      </section>

      {/* ── Products Section ── */}
      <section className="px-6 md:px-16 py-10 w-full bg-gradient-to-r from-[var(--secondary)] to-transparent">

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setVisibleProducts(12); }}
              placeholder={`Search in ${config.label}...`}
              className="w-full pl-9 pr-8 py-2 rounded-xl border border-[var(--primary)]/30 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition text-sm"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 transition">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => setSortOpen((o) => !o)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--primary)]/30 bg-white/70 backdrop-blur-sm hover:bg-[var(--primary)]/10 transition text-sm"
            >
              {sortOrder === "asc" ? "Price: Low → High" : sortOrder === "desc" ? "Price: High → Low" : "Sort by Price"}
              <ChevronDown size={15} className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
            </button>
            {sortOpen && (
              <div className="absolute z-20 mt-1 w-48 bg-white rounded-xl shadow-lg border border-[var(--primary)]/20 overflow-hidden">
                {[
                  { val: "",     label: "Default" },
                  { val: "asc",  label: "Price: Low → High" },
                  { val: "desc", label: "Price: High → Low" },
                ].map(({ val, label }) => (
                  <button
                    key={val}
                    onClick={() => handleSortSelect(val)}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[var(--primary)]/10 transition ${sortOrder === val ? "bg-[var(--primary)]/15 font-semibold" : ""}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Result count */}
          <span className="ml-auto text-sm opacity-50">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* SubCategory quick-links (only on category-level pages) */}
        {!config.subCategory && (
          <div className="flex flex-wrap gap-3 mb-8">
            {allProducts
              .filter((p) => p.category === config.category)
              .reduce((acc, p) => {
                if (p.subCategory && !acc.includes(p.subCategory)) acc.push(p.subCategory);
                return acc;
              }, [])
              .map((sub) => (
                <Link
                  key={sub}
                  href={`/shop/${sub}`}
                  className="px-4 py-2 rounded-full border border-[var(--primary)]/30 bg-white/60 hover:bg-[var(--primary)]/10 text-sm capitalize transition"
                >
                  {sub.replace("-", " ")}
                </Link>
              ))}
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center py-20 gap-3 opacity-50">
            <Search size={44} className="opacity-30" />
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
            {filteredProducts.slice(0, visibleProducts).map((p) => (
                
                   <div
                key={p.id}
                className="bg-gradient-to-b from-[var(--primary)]/10 to-transparent p-4 rounded-xl flex flex-col items-center transition-all duration-300 hover:scale-105 hover:from-[var(--primary)]/15 w-full h-[350px]"
              >
                <div className="relative w-full h-32 bg-[var(--secondary)]/50 flex items-center justify-center overflow-hidden rounded-lg">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-contain transition-transform duration-300 hover:scale-105"
                  />
                  {/* ── Wishlist Heart Button ── */}
                  <button
                    onClick={() => toggleWishlist(p)}
                    className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow hover:scale-110 transition-transform"
                    title={isWishlisted(p.id) ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart
                      size={16}
                      className={`transition-colors ${isWishlisted(p.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                    />
                  </button>
                </div>

                <h3 className="mt-2 font-semibold text-center">{p.name}</h3>

                <select className="mt-1 border rounded px-2 py-1 w-full text-sm">
                  {p.quantities.map((q) => (
                    <option key={q} value={q}>{q}</option>
                  ))}
                </select>

                <div className="mt-2 w-full">
                  <span className="font-bold block mb-2">{p.price}</span>

                  <div className="flex flex-col gap-2">
                    {/* Add to Cart */}
                    <button
                      onClick={() => handleAddToCart(p)}
                      className={`primary-btn flex-1 rounded-xl px-3 py-2 flex items-center justify-center gap-2 transition-all ${
                        addedMap[p.id] ? "opacity-80 scale-95" : ""
                      }`}
                    >
                      {addedMap[p.id] ? (
                        <>
                          <Check size={16} />
                          
                          <span >Added!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={16} />
                          <span className="lg:hidden">Add</span>
                          <span className="hidden lg:inline">Add to Cart</span>
                        </>
                      )}
                    </button>

                    {/* Buy Now */}
                    <Link className="w-full" href={`/product/${p.id}`}>
                      <button className="w-full secondary-btn flex-1 rounded-xl px-3 py-2 flex items-center justify-center">
                        Buy Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div> 
    
              
            ))}
          </div>
        )}

        {/* Show More */}
        {visibleProducts < filteredProducts.length && (
          <div className="flex justify-center mt-10">
            <button onClick={loadMore} className="primary-btn px-6 py-3 rounded-lg">
              Show More Products
            </button>
          </div>
        )}

        {/* Back link */}
        <div className="mt-12">
          <Link href="/shop" className="flex items-center gap-2 text-sm opacity-50 hover:opacity-100 transition w-fit">
            <ArrowLeft size={14} /> Back to all products
          </Link>
        </div>
      </section>
    </>
  );
}