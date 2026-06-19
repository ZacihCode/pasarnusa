"use client";

import { useState } from "react";
import {
  Sparkles,
  TrendingUp,
  ShoppingCart,
  User,
  Search,
  Heart,
  ThumbsDown,
  Plus,
  Star,
  ChevronRight,
  Zap,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  match?: number;
  img: string;
  badge?: string;
  liked?: boolean;
  hidden?: boolean;
}

const formatPrice = (p: number) => `Rp ${p.toLocaleString("id-ID")}`;

// ─── Data ─────────────────────────────────────────────────────────────────────

const TRENDING: Product[] = [
  {
    id: 1,
    name: "Songket Palembang Cantik Manis",
    category: "Authentic Craft",
    price: 1200000,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBX24gysnTPC6rkpcYu6aVI2nl4kEdUHCWFh82tIA1PB_GOze9pspES9Cmvc0xZ7lTiDtuoOkF2ql_5XoMReno4iRUUT8G_6xCI1eEg21L0qY_HCQBVw1GYO35woVdLdd8QUpd9n_2NpSiBDexL5OcnKzubRwPVVFhHoH8gAuNdcNIh0Fj0xVHqNjJxqhZ_xYd0zxyoiMU3W_1uSPqGoneea2t45ha2GGPuGicq8v0MYmb8qepbH-8xS4H-ZYXId6ql12KWDAJtIoU",
    badge: "#1",
  },
  {
    id: 2,
    name: "Kulit Ikan Crispy 250g",
    category: "Popular Snacks",
    price: 55000,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDg5rNGiHBsFzwcX8fJhec2bVWde6zP_OULC0dkmdr0TrV48XEP8zj6HlyH19BfnYK9-rNctWial4DG3iLpja3S6jq53g3WBlGN9rNN6Kv-j0eheIPjdakWvx_cSML4he4HltiU5-d1IrkceEQUMZCtkvAc3Fga-l-8v9YmCOS8h5SPKv0oKLKZnhfoBqCGBUpkidKLZUOnfKyGPNPW70vBAnK7bYR9iQBDUY_13Qkf9Qsl0QmCtax_tXRclQWbl09BuG5R_0BwenM",
  },
  {
    id: 3,
    name: "Wadah Lakuer Ukir Palembang",
    category: "Home & Decor",
    price: 280000,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZBUh_l9jxlNjoLrUh-tDhuYxiaTT79__mwT2DIn2IEhXJalkcdbgqeJAD6j90McVnmkdbUZNwP0QNypakFq74SxegZhLmRYP5WPVo3r1lNpZfj1WOYgN_mJLPNeMpeXjc_snlZxleaz8aLmHesFawnTl5G4mwaE85EZGUS33RAuqSl519dAtd8Se32x-Q3pFS1NES2GOLusZIRYYTbgZT7alsV9VUdL6cgIgNYCKqTNlE_zSfBhGB4Q6dF-jhdsjWP6Vd4T_BJXc",
  },
  {
    id: 4,
    name: "Kopi Semendo Arabica 500g",
    category: "Local Beverage",
    price: 95000,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsQ655j-6cr9zeNdB78PJdRCLiWpjRKqUwSZU0c_YnyitWkz6nxcDKHHQtKrxOSrgXvl_9UGIA-GjNQypJBHUrvkOwhXh1qrEuGXGBVsqxrqmnJ42CStzbVWLe5tiycEVB1QR8rwj72uvSf74tSDpyYvP9gfbEuEUfQ6j21hWzTFnYhAiYp5MUxO9a_TmzkcGBYu83UWS0MHgEvcInxPRQWlijAHnGrgfUJjEvBl0p6NamubyxcStz2Dm4U0g7yE51TY_KpB54dwo",
  },
  {
    id: 5,
    name: "Gulo Puan Premium Jar",
    category: "Rare Traditional",
    price: 150000,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMaxj8aSJaZ51F0OMuW5X_zKGXATan1kIwStG5tve5Er_qiP8n-Bl97XkGTKZ-gXLkdvlE2BbSC40zfsnlld5_cr_PHvt93ppBuNnwwf-m7fsgFrC_yv1c_gMpBwE2VItwxOJrdFDLF0lMEe5oyj5LNp3iRoDZXY-l7yaqGKC4I_fS2pLqMXrwPulRunQaPyfvnxrjLPE4SGvuzqjMHYzMUnBINm8U4DXyBZhM9SqkkcmERLZb2hJgVFcmHlJNabmHklnTgt8j_MA",
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function RecommendationsPage() {
  const [heroLiked, setHeroLiked] = useState(false);
  const [heroHidden, setHeroHidden] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => setCartCount((c) => c + 1);

  return (
    <div className="min-h-screen bg-custom-main">
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-10">
        {/* ── AI Header ─────────────────────────────────────────────── */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2"></div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-custom-main leading-tight">
                Dipilih untukmu berdasarkan
                <br className="hidden sm:block" />
                <span className="text-brand-primary">
                  {" "}
                  kesukaan produk Palembang
                </span>
              </h1>
            </div>
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-custom bg-custom-card text-xs font-semibold text-custom-muted hover:border-brand-primary hover:text-brand-primary transition-colors whitespace-nowrap">
              <Zap size={13} /> Update Preferensi
            </button>
          </div>

          {/* Bento */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Hero Card */}
            {!heroHidden ? (
              <div className="md:col-span-8 bg-custom-card border border-custom rounded-2xl overflow-hidden shadow-sm group">
                <div className="aspect-video overflow-hidden">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjqj13ILGN0U8FPjumWsfQddoMZRm6CkRV-_9VnBGW0blNMi6NWxFo91-9EDm8Msh48wzCwoVHmOv_E0cdK0UeADrblKPNuRYhj-wLzY845wWoRchzVbr5rag5ov-n1BgM4_uP4aExoIwIR_CFPwjiOxpUMyJ6Ke1HY9naQyq6udTfh6Rrx8eg1QVVT8dKrO2fpLmPxocPQWKN4nqE8NlNhrzhcg2DMQpjsdxTshz8UYkpDWEuE52D4-ZGwDDUM9rxmqcxZ-ZIl1Q"
                    alt="AI Pick"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start gap-3 mb-3">
                    <div>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200 mb-2 inline-block">
                        Best Match: 98%
                      </span>
                      <h3 className="text-lg font-extrabold text-custom-main">
                        Paket Premium Pempek Leni (Sultan Edition)
                      </h3>
                    </div>
                    <div className="flex gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => setHeroLiked((v) => !v)}
                        className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${
                          heroLiked
                            ? "bg-red-50 border-red-300 text-red-500"
                            : "border-custom text-custom-muted hover:border-brand-primary hover:text-brand-primary"
                        }`}
                      >
                        <Heart
                          size={15}
                          className={heroLiked ? "fill-red-500" : ""}
                        />
                      </button>
                      <button
                        onClick={() => setHeroHidden(true)}
                        className="w-9 h-9 rounded-xl border border-custom text-custom-muted hover:border-red-300 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-all"
                      >
                        <ThumbsDown size={15} />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-custom-muted leading-relaxed mb-4">
                    Karena kamu sering membeli camilan gurih, kami pikir kamu
                    akan menyukai seleksi premium buatan tangan ini dengan cuko
                    pedas-manis ekstra.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-extrabold text-brand-primary">
                      Rp 125.000
                    </span>
                    <button
                      onClick={addToCart}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-primary text-white font-bold text-sm hover:opacity-90 active:scale-95 transition-all"
                    >
                      <ShoppingCart size={14} /> Tambah Keranjang
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="md:col-span-8 bg-custom-card border border-custom rounded-2xl flex flex-col items-center justify-center py-16 text-center gap-3 shadow-sm">
                <ThumbsDown size={28} className="text-custom-muted" />
                <p className="text-sm font-bold text-custom-main">
                  Oke, kami mengerti
                </p>
                <p className="text-xs text-custom-muted">
                  Kami tidak akan menampilkan produk ini lagi.
                </p>
                <button
                  onClick={() => setHeroHidden(false)}
                  className="text-xs text-brand-primary hover:underline font-semibold"
                >
                  Batalkan
                </button>
              </div>
            )}

            {/* Side cards */}
            <div className="md:col-span-4 flex flex-col gap-4">
              {[
                {
                  name: "Kemplang Tunu Asli Kerupuk",
                  price: 35000,
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBA7Ar8Ofii7LQ71YR5f2QqS5QRxe9BDEV62LtDjycpkbLmf89Q1gESUY7hleYuJ1jKpuCpP4h_9c_Bqt_W-pPuNxo5xs554cOiXbPzw7u6xc3GtwsXJ7lexskcTzpBsz5E8r3w-BahSFvvr6pRdtEMRHSk--ECoDjAcEr0CDSVtH5pBYwJtr-sTEO2xpxnBZAffRzDFds_YYY7fqxybRL3ITDuz1UMqbWUUYTdzL2PWt4q4o0_2bNAH5cUbPEal-PywdNeOtrxIkM",
                },
                {
                  name: "Lapis Legit Palembang Mini",
                  price: 45000,
                  img: "https://asset.kompas.com/crops/vDnxqvmvtey4L00mxyjirZFQtYI=/0x365:1080x1085/1200x800/data/photo/2022/01/19/61e7ac147a315.jpg",
                },
              ].map((p) => (
                <div
                  key={p.name}
                  className="bg-custom-card border border-custom rounded-2xl p-3 shadow-sm flex gap-3 group hover:border-brand-primary transition-colors"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-custom-ter">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <p className="text-xs font-bold text-custom-main line-clamp-2">
                      {p.name}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-extrabold text-brand-primary">
                        {formatPrice(p.price)}
                      </span>
                      <button
                        onClick={addToCart}
                        className="w-7 h-7 rounded-lg bg-brand-primary text-white flex items-center justify-center hover:opacity-90 active:scale-95 transition-all"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* AI insight */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col items-center text-center relative overflow-hidden">
                <Sparkles size={28} className="text-amber-500 mb-2" />
                <span className="text-[10px] font-bold uppercase tracking-wide text-amber-600 mb-1">
                  AI Insight
                </span>
                <p className="text-2xl font-extrabold text-amber-800 mb-1">
                  85%
                </p>
                <p className="text-[11px] text-amber-700 leading-snug mb-3">
                  Pembeli lain di Palembang yang suka Pempek juga menyukai
                  camilan ini.
                </p>
                <button className="px-3 py-1.5 rounded-full bg-amber-800 text-white text-[11px] font-bold hover:opacity-90">
                  Lihat Alasannya
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Frequently Bought Together ────────────────────────────── */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-xl font-extrabold text-custom-main whitespace-nowrap">
              Sering Dibeli Bersama
            </h2>
            <div className="flex-1 h-px bg-custom-ter" />
          </div>
          <div className="bg-custom-card border border-custom rounded-2xl p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {[
                {
                  name: "Pempek Kapal Selam",
                  price: 25000,
                  img: "https://awsimages.detik.net.id/community/media/visual/2021/05/20/pempek-kapal-selam_169.jpeg?w=600&q=90",
                },
                {
                  name: "Kemplang Super Pack",
                  price: 45000,
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCw2A-7tKGENa1FyWjVa7mFUQaUidk4H2V-72JEMllb9REgsxapaINCkvorLr5dpJ-q7mkymyrlP3UlOS7_soyQxbgBZjJVdLMJ8KewMcfRY0p1AGvAiFGOjKPlYdTS_ANugpUbMvFT7-Kd7-_4NwxE6RXQMuo_9U9lSYQsY9Y9nlWbnk79eaxVnxCvWCm2pVWgaH8ArEmNmldkKTDVEK55j1hqnv6yKEuOkKG_Jy4rfensx5IXKLKF4Twz40fyNT7DRSknP-mKV64",
                },
              ].map((item, i) => (
                <div key={item.name} className="flex items-center gap-4">
                  <div className="bg-custom-card border border-custom rounded-2xl p-4 text-center w-52 shadow-sm">
                    <div className="aspect-square rounded-xl overflow-hidden mb-3">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs font-bold text-custom-main mb-1">
                      {item.name}
                    </p>
                    <p className="text-xs text-custom-muted">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                  {i === 0 && (
                    <div className="text-2xl font-bold text-custom-muted">
                      +
                    </div>
                  )}
                </div>
              ))}
              <div className="hidden sm:block w-px h-24 bg-custom-ter" />
              <div className="text-center space-y-2 flex-shrink-0">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 border border-orange-200">
                  Combo Diskon 10%
                </span>
                <div>
                  <p className="text-sm text-custom-muted line-through">
                    Rp 70.000
                  </p>
                  <p className="text-2xl font-extrabold text-brand-primary">
                    Rp 63.000
                  </p>
                </div>
                <button
                  onClick={addToCart}
                  className="w-full px-5 py-2.5 rounded-xl bg-brand-primary text-white font-bold text-xs hover:opacity-90 active:scale-95 transition-all"
                >
                  Bundle Keduanya
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Trending ──────────────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-brand-primary" />
              <h2 className="text-xl font-extrabold text-custom-main">
                Trending di Palembang
              </h2>
            </div>
            <a
              href="/products"
              className="text-xs font-semibold text-brand-primary hover:underline flex items-center gap-1"
            >
              Lihat Semua <ChevronRight size={12} />
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {TRENDING.map((p) => (
              <div
                key={p.id}
                className="group bg-custom-card border border-custom rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-[4/5] relative overflow-hidden bg-custom-ter">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {p.badge && (
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-bold text-custom-main flex items-center gap-1 shadow-sm border border-custom">
                      <Star
                        size={9}
                        className="fill-amber-400 text-amber-400"
                      />
                      {p.badge}
                    </div>
                  )}
                  <button
                    onClick={addToCart}
                    className="absolute bottom-2 right-2 w-8 h-8 rounded-xl bg-brand-primary text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:opacity-90 active:scale-95 transition-all shadow-md"
                  >
                    <ShoppingCart size={13} />
                  </button>
                </div>
                <div className="p-3">
                  <p className="text-xs font-bold text-custom-main line-clamp-1 mb-0.5 group-hover:text-brand-primary transition-colors">
                    {p.name}
                  </p>
                  <p className="text-[10px] text-custom-muted mb-1">
                    {p.category}
                  </p>
                  <p className="text-sm font-extrabold text-brand-primary">
                    {formatPrice(p.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
