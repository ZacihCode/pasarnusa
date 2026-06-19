"use client";

import { useState } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  Star,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Heart,
  SlidersHorizontal,
  X,
  Utensils,
  Shirt,
  Gem,
  Paintbrush,
  Package,
  Store,
  Hammer,
  Leaf,
  BadgeCheck,
  Flame,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// ─── Types ────────────────────────────────────────────────────────────────────

interface Product {
  id: number;
  name: string;
  seller: string;
  price: number;
  rating: number;
  sold: number;
  badge?: "authentic" | "topseller" | "new" | "promo";
  img: string;
  district: string;
  category: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "all", label: "Semua", icon: Package },
  { id: "songket", label: "Songket", icon: Shirt },
  { id: "kuliner", label: "Kuliner", icon: Utensils },
  { id: "kerajinan", label: "Kerajinan", icon: Gem },
  { id: "seni", label: "Seni & Budaya", icon: Paintbrush },
  { id: "pertanian", label: "Pertanian", icon: Leaf },
  { id: "toko", label: "Toko Umum", icon: Store },
  { id: "jasa", label: "Jasa", icon: Hammer },
];

const DISTRICTS = [
  "Ilir Barat I",
  "Ilir Barat II",
  "Ilir Timur I",
  "Ilir Timur II",
  "Seberang Ulu I",
  "Seberang Ulu II",
  "Bukit Kecil",
  "Gandus",
  "Kalidoni",
  "Sako",
  "Kertapati",
  "Jakabaring",
];

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Songket Lepus Emas Berlian Kristal",
    seller: "Songket Cek Ipah",
    price: 4500000,
    rating: 4.9,
    sold: 120,
    badge: "authentic",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBF1q_TP7RrDvLrR-aSqt712idr8DTkpOJTu5zrXEH7dEutqri5T5ye-i09bnlZv9RXaOSXPfqQ74OMh0Guh1cHNiekpcic1b0UwPRl0RWfTMopibQ1VKXZPmjQomaWaMF67G0WJkRwIKg9nYwjVEKTs4SalUGle7OzH6onopcaSzxYPkLXjzqoQRlR68NmYRcscEeU_QrgDcg9THi8qfovkhUcnuuvRjmHyNa0EsTwZUehRHyHdODdfWF8E9-U7x8yKA-3Nstf7xo",
    district: "Ilir Barat I",
    category: "songket",
  },
  {
    id: 2,
    name: "Songket Limar Motif Naga Besaung",
    seller: "Zainal Songket",
    price: 3250000,
    rating: 4.8,
    sold: 85,
    badge: "topseller",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDoYMezf9yvgFo6OJPZYAbnBcEyJvpN43zXYCe7kEuWp1Wx7pj9jNlzo0vaJu6IvI_DcNDWSJ6ck-9mLjt7ZMvkMW3fHQNRDLQ-3RRDsuRSo3DSNqY4KREJbMJrq3HgjoZeJD0rGm6ZQz3RIRb2EOTk0NlX6x2AZedbikzQpmTZ6XJIW6AyolmK5TO4YGkCWUeRhJkNLRL1_sruiSS8ElbGhEKu9NY7LeO4-uhrDUSQ9755Kp_999rQAXdfLBDytFuR45S_BZnZ4WI",
    district: "Kertapati",
    category: "songket",
  },
  {
    id: 3,
    name: "Songket Tretes Mawar Maroon",
    seller: "Rumah Songket",
    price: 1850000,
    rating: 4.7,
    sold: 42,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmN3n_QTaU2q5q4sd3d03Q7UrHA6CWZJROKoxwwZoiHAFRDIf7wQZr02GZMZFd7h35O8bNON3dLe5bD-tmLwM28mFoNB-wDCAriTsJ9thTukJWRx5tKQ1yyRrnmVTYY_sgDJcI01N6NBTbiDKd5uqEqYtACzjjYNXbRHpLxjzerMmxzrzcrswbrXsdtZxvtJIVKm5SlmqAxtLenXJ7asHFCm_FO0fGmPcJm9MbO9SuNbXr-mnRZd2fBai23mkXPkGppmLc0VcY2I4",
    district: "Bukit Kecil",
    category: "songket",
  },
  {
    id: 4,
    name: "Songket Bunga Cina Sutra Alam",
    seller: "Songket Palembang Indah",
    price: 5200000,
    rating: 5.0,
    sold: 12,
    badge: "new",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAi-zORVXL123_6cor0jtvtxY4lH61f3teDMWPX0XGB7gfGZ3_XcTzAyaenQbcIOrS2LtGkDIepJVFOkKXSeaIB5tLva1zzmxnF2KXLWZSNorNkEIMLFAccoMDbUFeFgT07bDhoSscKST2DL2NMEAPw7S8osr1eFfwaGoavrWD5txp6m4p1YXmtNmGGLxKVGuxG7cYUKO9H_6TuxnpGjcJ7H-vl0JZuWTcYsCNB71s1q2ggMmYyVXW8gsgdYIOeDsVy-2Ll78UxPG0",
    district: "Ilir Timur I",
    category: "songket",
  },
  {
    id: 5,
    name: "Songket Kombinasi Modern Pastel",
    seller: "Galeri Songket",
    price: 950000,
    rating: 4.6,
    sold: 250,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuByKKtn9gagOsWkCjr9s-c-abFjqASpl66kiIE8bQYjtarGJfMrTAQH3_0OcOkxS5kQiu6YBzjbcYQ-HUDteqR1H-018diBJ4zINhaJttg8E3h48HCFaVJfM_9jhh3XobXyKVJ3woBTCgoWVgp0G_pUSCd7PoIyjwiNSjmKVzMKDR7t8nZim9uZtVtFuKKl5iqfZeNJN1Ob8FNJCnK3WXcYGbpJuvR6vDh1WUvrF6ZVvu61u2Xc4LYZfh0b3k5dodVpy7grLtP_IFo",
    district: "Sako",
    category: "songket",
  },
  {
    id: 6,
    name: "Pempek Kapal Selam Original",
    seller: "Pempek Bu Yanti",
    price: 45000,
    rating: 4.9,
    sold: 1200,
    badge: "topseller",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBF1q_TP7RrDvLrR-aSqt712idr8DTkpOJTu5zrXEH7dEutqri5T5ye-i09bnlZv9RXaOSXPfqQ74OMh0Guh1cHNiekpcic1b0UwPRl0RWfTMopibQ1VKXZPmjQomaWaMF67G0WJkRwIKg9nYwjVEKTs4SalUGle7OzH6onopcaSzxYPkLXjzqoQRlR68NmYRcscEeU_QrgDcg9THi8qfovkhUcnuuvRjmHyNa0EsTwZUehRHyHdODdfWF8E9-U7x8yKA-3Nstf7xo",
    district: "Seberang Ulu I",
    category: "kuliner",
  },
  {
    id: 7,
    name: "Kerajinan Rotan Anyaman Premium",
    seller: "Rotan Nusantara",
    price: 320000,
    rating: 4.5,
    sold: 67,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmN3n_QTaU2q5q4sd3d03Q7UrHA6CWZJROKoxwwZoiHAFRDIf7wQZr02GZMZFd7h35O8bNON3dLe5bD-tmLwM28mFoNB-wDCAriTsJ9thTukJWRx5tKQ1yyRrnmVTYY_sgDJcI01N6NBTbiDKd5uqEqYtACzjjYNXbRHpLxjzerMmxzrzcrswbrXsdtZxvtJIVKm5SlmqAxtLenXJ7asHFCm_FO0fGmPcJm9MbO9SuNbXr-mnRZd2fBai23mkXPkGppmLc0VcY2I4",
    district: "Gandus",
    category: "kerajinan",
  },
  {
    id: 8,
    name: "Batik Jumputan Palembang Klasik",
    seller: "Batik Serasan",
    price: 275000,
    rating: 4.8,
    sold: 198,
    badge: "authentic",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDoYMezf9yvgFo6OJPZYAbnBcEyJvpN43zXYCe7kEuWp1Wx7pj9jNlzo0vaJu6IvI_DcNDWSJ6ck-9mLjt7ZMvkMW3fHQNRDLQ-3RRDsuRSo3DSNqY4KREJbMJrq3HgjoZeJD0rGm6ZQz3RIRb2EOTk0NlX6x2AZedbikzQpmTZ6XJIW6AyolmK5TO4YGkCWUeRhJkNLRL1_sruiSS8ElbGhEKu9NY7LeO4-uhrDUSQ9755Kp_999rQAXdfLBDytFuR45S_BZnZ4WI",
    district: "Ilir Timur II",
    category: "songket",
  },
];

const BADGE_CONFIG = {
  authentic: {
    label: "Authentic",
    icon: BadgeCheck,
    className: "bg-amber-100 text-amber-800 border border-amber-200",
  },
  topseller: {
    label: "Top Seller",
    icon: Flame,
    className: "bg-orange-100 text-orange-700 border border-orange-200",
  },
  new: {
    label: "New Arrival",
    icon: Sparkles,
    className: "bg-teal-50 text-teal-700 border border-teal-200",
  },
  promo: {
    label: "Promo",
    icon: TrendingUp,
    className: "bg-red-50 text-red-600 border border-red-200",
  },
};

const SORT_OPTIONS = [
  "Paling Populer",
  "Terbaru",
  "Harga Terendah",
  "Harga Tertinggi",
  "Rating Tertinggi",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatPrice = (p: number) =>
  p >= 1000000
    ? `Rp ${(p / 1000000).toFixed(1).replace(".0", "")}jt`
    : `Rp ${p.toLocaleString("id-ID")}`;

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <Star size={12} className="fill-amber-400 text-amber-400" />
      <span className="text-xs font-semibold text-custom-main">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [liked, setLiked] = useState(false);
  const badge = product.badge ? BADGE_CONFIG[product.badge] : null;

  return (
    <Link href={`/products/${product.id}`} className="block group">
      <div className="bg-custom-card border border-custom rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full">
        {/* Image */}
        <div className="relative h-52 overflow-hidden bg-custom-ter">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {badge && (
            <div
              className={`absolute top-2.5 left-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${badge.className}`}
            >
              <badge.icon size={10} />
              {badge.label}
            </div>
          )}
          {/* Like button — stopPropagation biar klik like ga trigger navigasi */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setLiked((v) => !v);
            }}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110"
          >
            <Heart
              size={15}
              className={
                liked ? "fill-red-500 text-red-500" : "text-custom-muted"
              }
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <StarRating rating={product.rating} />
            <span className="text-[10px] text-custom-muted">
              {product.sold.toLocaleString("id-ID")} terjual
            </span>
          </div>
          <h3 className="text-sm font-bold text-custom-main line-clamp-2 leading-snug mb-1.5 group-hover:text-brand-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 mb-3">
            <ShieldCheck
              size={12}
              className="text-brand-primary flex-shrink-0"
            />
            <span className="text-[11px] text-custom-muted truncate">
              {product.seller}
            </span>
          </div>
          <div className="mt-auto flex items-center justify-between gap-2">
            <span className="text-base font-extrabold text-brand-primary">
              {formatPrice(product.price)}
            </span>
            {/* Tombol cart — stopPropagation biar ga trigger navigasi */}
            <button
              onClick={(e) => {
                e.preventDefault();
              }}
              className="w-8 h-8 rounded-xl bg-brand-primary text-white flex items-center justify-center hover:opacity-90 active:scale-95 transition-all flex-shrink-0"
            >
              <ShoppingCart size={15} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ProductListPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("Paling Populer");
  const [search, setSearch] = useState("");
  const [cartCount] = useState(3);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const toggleDistrict = (d: string) =>
    setSelectedDistricts((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d],
    );

  const filtered = PRODUCTS.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchDistrict =
      selectedDistricts.length === 0 || selectedDistricts.includes(p.district);
    const matchPrice = p.price <= maxPrice;
    const matchRating = p.rating >= minRating;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.seller.toLowerCase().includes(search.toLowerCase());
    return (
      matchCat && matchDistrict && matchPrice && matchRating && matchSearch
    );
  }).sort((a, b) => {
    if (sortBy === "Harga Terendah") return a.price - b.price;
    if (sortBy === "Harga Tertinggi") return b.price - a.price;
    if (sortBy === "Rating Tertinggi") return b.rating - a.rating;
    return b.sold - a.sold;
  });

  const FilterPanel = () => (
    <div className="space-y-4">
      {/* Category */}
      <div className="bg-custom-card border border-custom rounded-2xl p-4">
        <h3 className="text-xs font-bold text-custom-main mb-3 uppercase tracking-wide">
          Kategori
        </h3>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all ${
                  active
                    ? "bg-brand-primary text-white font-semibold"
                    : "text-custom-muted hover:bg-custom-ter hover:text-custom-main"
                }`}
              >
                <Icon size={15} />
                <span className="text-xs">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price */}
      <div className="bg-custom-card border border-custom rounded-2xl p-4">
        <h3 className="text-xs font-bold text-custom-main mb-3 uppercase tracking-wide">
          Rentang Harga
        </h3>
        <input
          type="range"
          min={0}
          max={10000000}
          step={100000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-teal-600"
        />
        <div className="flex justify-between mt-2">
          <span className="text-[11px] text-custom-muted bg-custom-ter px-2 py-1 rounded-lg">
            Rp 0
          </span>
          <span className="text-[11px] font-semibold text-brand-primary bg-teal-50 px-2 py-1 rounded-lg border border-teal-200">
            {formatPrice(maxPrice)}
          </span>
        </div>
      </div>

      {/* District */}
      <div className="bg-custom-card border border-custom rounded-2xl p-4">
        <h3 className="text-xs font-bold text-custom-main mb-3 uppercase tracking-wide">
          Lokasi Distrik
        </h3>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {DISTRICTS.map((d) => (
            <label
              key={d}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedDistricts.includes(d)}
                onChange={() => toggleDistrict(d)}
                className="w-4 h-4 rounded accent-teal-600"
              />
              <span className="text-xs text-custom-muted group-hover:text-custom-main transition-colors">
                {d}
              </span>
            </label>
          ))}
        </div>
        {selectedDistricts.length > 0 && (
          <button
            onClick={() => setSelectedDistricts([])}
            className="mt-2 text-[11px] text-brand-primary hover:underline"
          >
            Hapus semua
          </button>
        )}
      </div>

      {/* Rating */}
      <div className="bg-custom-card border border-custom rounded-2xl p-4">
        <h3 className="text-xs font-bold text-custom-main mb-3 uppercase tracking-wide">
          Rating Minimum
        </h3>
        <div className="space-y-2">
          {[4.5, 4.0, 3.5, 0].map((r) => (
            <label
              key={r}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="radio"
                name="rating"
                checked={minRating === r}
                onChange={() => setMinRating(r)}
                className="accent-teal-600"
              />
              <div className="flex items-center gap-1">
                <Star size={12} className="fill-amber-400 text-amber-400" />
                <span className="text-xs text-custom-muted group-hover:text-custom-main">
                  {r > 0 ? `${r}+` : "Semua"}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-custom-sec">
      {/* Navbar */}
      <header className="bg-custom-card border-b border-custom sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 text-base font-medium text-zinc-900 dark:text-white"
          >
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center overflow-hidden">
              <Image
                src="https://cdn.aceimg.com/W6DtV9UeS.png"
                alt="Logo"
                width={1080}
                height={1080}
                className="object-contain"
              />
            </div>
            <span>
              Pasar
              <strong className="text-emerald-600 font-semibold">
                Nusantara
              </strong>
            </span>
          </a>

          {/* Search */}
          <div className="flex-1 relative hidden sm:block max-w-md">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-custom-muted"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari produk, toko UMKM..."
              className="w-full pl-9 pr-4 py-2 rounded-full border border-custom bg-custom-ter text-sm focus:outline-none focus:border-brand-primary transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <a href="/shopcart">
              <button className="relative p-2 rounded-full hover:bg-custom-ter transition-colors">
                <ShoppingCart size={20} className="text-custom-muted" />
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-brand-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </button>
            </a>
            <a href="/profile">
              <button className="p-2 rounded-full hover:bg-custom-ter transition-colors">
                <User size={20} className="text-custom-muted" />
              </button>
            </a>
            <button
              className="sm:hidden p-2 rounded-full hover:bg-custom-ter transition-colors"
              onClick={() => setMobileFilterOpen(true)}
            >
              <Menu size={20} className="text-custom-muted" />
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="sm:hidden px-4 pb-3">
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-custom-muted"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari produk..."
              className="w-full pl-9 pr-4 py-2 rounded-full border border-custom bg-custom-ter text-sm focus:outline-none focus:border-brand-primary"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-custom-muted mb-4">
          <a href="/" className="hover:text-brand-primary transition-colors">
            Beranda
          </a>
          <ChevronRight size={12} />
          <span className="font-semibold text-custom-main">Katalog Produk</span>
        </nav>

        <div className="mb-5">
          <h1 className="text-2xl font-extrabold text-custom-main">
            Katalog Produk UMKM
          </h1>
          <p className="text-sm text-custom-muted mt-1">
            Temukan produk asli terbaik dari pengrajin dan pelaku UMKM
            Palembang.
          </p>
        </div>

        <div className="flex gap-6">
          {/* Sidebar — desktop */}
          <aside className="hidden md:block w-56 flex-shrink-0">
            <div className="sticky top-20">
              <FilterPanel />
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-custom-card border border-custom rounded-2xl px-4 py-3 mb-5">
              <p className="text-xs text-custom-muted">
                Menampilkan{" "}
                <span className="font-bold text-custom-main">
                  {filtered.length}
                </span>{" "}
                produk
                {activeCategory !== "all" && (
                  <>
                    {" "}
                    dalam{" "}
                    <span className="font-semibold text-brand-primary">
                      {CATEGORIES.find((c) => c.id === activeCategory)?.label}
                    </span>
                  </>
                )}
              </p>
              <div className="flex items-center gap-2">
                <button
                  className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-custom text-xs font-semibold text-custom-muted hover:border-brand-primary hover:text-brand-primary transition-colors"
                  onClick={() => setMobileFilterOpen(true)}
                >
                  <SlidersHorizontal size={13} />
                  Filter
                  {(selectedDistricts.length > 0 || minRating > 0) && (
                    <span className="w-4 h-4 rounded-full bg-brand-primary text-white text-[9px] flex items-center justify-center">
                      {selectedDistricts.length + (minRating > 0 ? 1 : 0)}
                    </span>
                  )}
                </button>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs border border-custom rounded-xl px-3 py-1.5 bg-custom-ter focus:outline-none focus:border-brand-primary"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active filter chips */}
            {(selectedDistricts.length > 0 ||
              minRating > 0 ||
              activeCategory !== "all") && (
              <div className="flex flex-wrap gap-2 mb-4">
                {activeCategory !== "all" && (
                  <button
                    onClick={() => setActiveCategory("all")}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-[11px] font-semibold border border-brand-primary/20 hover:bg-brand-primary/20"
                  >
                    {CATEGORIES.find((c) => c.id === activeCategory)?.label}
                    <X size={10} />
                  </button>
                )}
                {selectedDistricts.map((d) => (
                  <button
                    key={d}
                    onClick={() => toggleDistrict(d)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-custom-ter text-custom-muted text-[11px] font-medium border border-custom hover:border-brand-primary hover:text-brand-primary"
                  >
                    {d} <X size={10} />
                  </button>
                ))}
                {minRating > 0 && (
                  <button
                    onClick={() => setMinRating(0)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[11px] font-medium border border-amber-200 hover:bg-amber-100"
                  >
                    <Star size={10} className="fill-amber-400" /> {minRating}+{" "}
                    <X size={10} />
                  </button>
                )}
              </div>
            )}

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-2xl bg-custom-ter border border-custom flex items-center justify-center mb-4">
                  <Package size={28} className="text-custom-muted" />
                </div>
                <p className="text-sm font-bold text-custom-main mb-1">
                  Produk tidak ditemukan
                </p>
                <p className="text-xs text-custom-muted">
                  Coba ubah filter atau kata kunci pencarian
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("all");
                    setSelectedDistricts([]);
                    setMinRating(0);
                    setMaxPrice(10000000);
                    setSearch("");
                  }}
                  className="mt-4 text-xs text-brand-primary hover:underline font-semibold"
                >
                  Reset semua filter
                </button>
              </div>
            )}

            {/* Pagination */}
            {filtered.length > 0 && (
              <div className="flex flex-col items-center gap-4 mt-8">
                <button className="px-6 py-2.5 rounded-xl border-2 border-brand-primary text-brand-primary text-sm font-bold hover:bg-brand-primary hover:text-white active:scale-95 transition-all">
                  Muat Lebih Banyak
                </button>
                <div className="flex items-center gap-1.5">
                  <button className="w-8 h-8 rounded-lg border border-custom flex items-center justify-center text-custom-muted hover:bg-custom-ter transition-colors">
                    <ChevronLeft size={16} />
                  </button>
                  {[1, 2, 3].map((n) => (
                    <button
                      key={n}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                        n === 1
                          ? "bg-brand-primary text-white"
                          : "border border-custom text-custom-muted hover:bg-custom-ter"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                  <span className="text-custom-muted text-sm px-1">...</span>
                  <button className="w-8 h-8 rounded-lg border border-custom text-xs font-bold text-custom-muted hover:bg-custom-ter">
                    12
                  </button>
                  <button className="w-8 h-8 rounded-lg border border-custom flex items-center justify-center text-custom-muted hover:bg-custom-ter transition-colors">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile filter drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-72 max-w-full h-full bg-custom-sec overflow-y-auto p-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <p className="font-bold text-custom-main">Filter Produk</p>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-8 h-8 rounded-full bg-custom-ter flex items-center justify-center"
              >
                <X size={16} className="text-custom-muted" />
              </button>
            </div>
            <FilterPanel />
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full mt-5 py-3 rounded-xl bg-brand-primary text-white font-bold text-sm"
            >
              Terapkan Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
