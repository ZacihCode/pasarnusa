"use client";

import { useState } from "react";
import {
  ChevronRight,
  ShoppingCart,
  User,
  Search,
  Star,
  ShieldCheck,
  MapPin,
  MessageCircle,
  Heart,
  Package,
  Truck,
  Clock,
  BadgeCheck,
  Flame,
  Minus,
  Plus,
  Share2,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
// ─── Types ────────────────────────────────────────────────────────────────────

interface RelatedProduct {
  id: number;
  name: string;
  price: number;
  rating: number;
  sold: string;
  badge?: string;
  img: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const THUMBNAILS = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB9I11Gz_Rzy8Uu8tyNEkyI5Z4f51VHMuqgGLJAvMRDB_kejCANpedvFKiT2GYaNce1Dv7OpaYiu_OfJlVL57qh-u5iGxhXtzx41P22WqF7S33tgtzxj4NhNDtjrBnGMBbFsVlEbwMthLt_xRLZXbHISTo-l5mVfF7Fv9Wey-oNk_Jv54I3od72wUGvz4b_Y59tInsjWfvC9R8mKwhx3kKJGL9PsxS5xUjajg2Rc0drl5h4tQdZlU-GplzXJWRQwqXq3idDxlyNjBQ",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAgQ9_dgVLkI-QDW3HWY4C9egO8zcOr0OpToLmcUErZcqAXD2U1wd66lG97-vkyWwOiWHpOi1EtcOYZSnTArh7KPFMKrJJ0AlVwA1WNYd9ozTQf3jo2V-LOuKra7pIIZWWrtl91XBqRvL9XD5FhhTR2um1Clg149VwWnaDQ7tLQ9hgCvH5Qk1eftKPRo94hRSou6RQlItaCDtuAXfRVnE8JUXts7ShauPkb_AZcWMhrzTOxeUXE7pR8foHAkjjsTCJpGJd1c-a1n7s",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBe_Zonajhh1bxegVTETc19DPRYfDONTC3LeYDywpzarWZZftrNl5zg8T73SkwUGRgSnrn3UPu2eDppXFZiqH3xRrWe7EH--sui1e5_EhZAMDR90GRGbosStIKZ1dE3ZQedar0mea5eiG6zXaOOjoC0AU4lALGYE7STAz4Nn_-kzvuSI2x2Hql1G9HQNLpqk2r1aiYvELxxSmch7e-JggqdsniIkmO5lrFi0_uoPs5Oc2aGMTZpJ6pXQ0UcgMLWsCBV11uJHvFnuls",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAO4JzvkifpsXwB0nuGpKYX8x-fp73KrsaGSV46kRFMS6BKGBBd3hLXWja1aouX1D3bXBKFDMfa3yExTHp1n5xyLLIAfhcZksfeDs0WEw8FSQBE9azaokIgmEtRil6MB3N4dU2i2JoK4rH6YUjDymtmwro7WpprBEgXSIBovNmtJ83ZyCtMlFekDJ5GKVk_aXqEaKcBVqAy33pAX0CecneE-f4A7dFbueE0j0PmKDgHJBKJys4jgJ_OvgajGTBm69-RCx2q1yD1j4",
];

const RELATED: RelatedProduct[] = [
  {
    id: 1,
    name: "Pempek Lenjer Besar Isi 3 Pcs",
    price: 45000,
    rating: 4.8,
    sold: "800+",
    badge: "Hot",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCG1Bfjlz24I6yhX9yl8IYPMzL-HSqQlfxe5hwEHJEHpd6WOTcmCdarLxbNHnu0yC2K7PZgBVXSvzBErvZRm4kvVMM4m4f96bjCM_7bykIhgIjSdmujod7cMIVL2WdylKpHp7m8sunZ-O8A-EqIjW_NX68amLeBkHqT-_BzS_cTO3tCVmcOauAM0ttjpz2ZZ5HnC48jgXoOmMQmkeLPugKgdGpTVb59GifL2cZinmrpvvUGqfnjmGBFkDoB_UZPDWHeHNGDtgLM7zk",
  },
  {
    id: 2,
    name: "Pempek Adaan Santan Gurih 10 Pcs",
    price: 35000,
    rating: 4.9,
    sold: "1k+",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiTci99e7FdUtpiVmICtZ9wC69HKT8QJfDliMjaqpvshJCPnkYfiTTSqc3Mnv0HVOgU6BxzJNTNPAImmZ6mNvmzZ5rKGiFqTv2uc6VvtYxBpFi3t6DlEnYMXrvNdQhziI6tgY2wlX1I0XgILMGQ_TB7DzN2txyzlbP8kNaLKGQf5IPxIK10osoqVRHkUsrXSWrQtwrei0qe8mSLVprP0kWiByGLOILs2uH6odBnFOTkUTZxtVRZd79goIJyQmBHolSdiZfqRQ_yO4",
  },
  {
    id: 3,
    name: "Paket Tekwan Instan 2 Porsi",
    price: 28000,
    rating: 4.7,
    sold: "300+",
    badge: "New",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqfJhRVhHKjilfN-KAvrNVEkU_J0FTRBQSLxSjM8ovLqLqqcyoEAP7sZm2SOg6L7e_lkwgHucKG-_Xf6ZZ4nVXu2dv7urc1x9n4HWlEPS5V31h8jkRFu_0yzx89unHtd-4C6l5IkmSbnGBsNyAqgXlpcJil6BVUmiG-0n76D50YEVSw94CIpV-CZR-9gb7eLC8Wf4K2J-Nx1r_OZPLxOB7xbd2Nvlbf_D_Zk8lzPwwy9OO9DSHrOO4UMOvoDPMFpFTOok5feJ_Dp8",
  },
  {
    id: 4,
    name: "Cuko Pempek Asli Palembang 500ml",
    price: 15000,
    rating: 5.0,
    sold: "500+",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNRnKeDvVmfG18vrN2aqajrzJhvicDUZPbXRQFnFEy9rqjR3LMjM8KTRVrhFsAkset3zAXeJLXKNqUQM_s4ttoOI4oU9d9lhIl1GUS0xXCFOqJYQgcOS-IU01an94OMgtsz351f6IhvshBz2F7qobse4y_T-hpsPdp2YnR02tw6eRU1TjYtrpxsMYEzPYYbujB1cRUhOQJu0nKSQjMcOsZ8wfujYMT-4-WhoWaTb0U2NpG4O_nmDMApIQ-DgfK0Pxn4AJsgaDluk8",
  },
  {
    id: 5,
    name: "Paket Pempek Campur (30 Pcs)",
    price: 120000,
    rating: 4.9,
    sold: "2k+",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnVvKN5cQmE2AKrUfJQCysUHU6BhcAon-O7gF6p0P09n-SaBW60VSs_nmg7wBptiDnAIgSjfT407cPq1gMw8xHNl_9t119KfbTn3JuCyi2qkWQ07tCA7gXZ2TZgrTsceEGBbycK5HHmtm_krQdXikDr4IFZ816Sk7O_nFzw62rf_ymw9Pwvy5cFju3Rnx_TufOLdY4gZYSGhYVxHXpR8_CDARpqHV2q14Xe9XPaSm0PErSrAAuUOJa8T6xctddAFFoRVL9AwaA",
  },
];

const REVIEWS = [
  {
    id: 1,
    name: "Andi Pratama",
    rating: 5,
    date: "2 hari lalu",
    text: "Pempeknya besar sekali, telurnya matang sempurna. Cukonya juara, kental dan terasa banget ebinya. Pengiriman ke Jakarta aman karena divakum.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9mVH8suGNOm4jBXbQMnDorZa6DALMe0zIulcb5T-uoTz0VSdzEt_-ykSbXBolwrpmge6xr7_4BqdLddI3Fiz99lVFkxiyYUC96FCWnY8uO0mI98b2X_nUJmQ4OPlq6J2_FkPDhO7HHROFGIBfzFGcLMjrge37lFT116aZxtKTQRjX-5pbFIq0Qty7TNcekJq-dFWoLKJTNC443YT4--Z6iL-nTOSXJa72abD_eTn-BChg_ZiGItiN39fwyoGsnzpT4NKu8efR2mY",
  },
  {
    id: 2,
    name: "Siti Rahayu",
    rating: 5,
    date: "5 hari lalu",
    text: "Pesan untuk oleh-oleh ke Bandung. Keluarga suka banget, autentik rasanya. Packagingnya rapi dan aman sampai tujuan.",
    img: null,
  },
];

const formatPrice = (p: number) => `Rp ${p.toLocaleString("id-ID")}`;

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProductDetailPage() {
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState<"desc" | "review" | "shipping">(
    "desc",
  );
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);
  const [cartCount] = useState(3);
  const [addedToCart, setAddedToCart] = useState(false);

  const router = useRouter();
  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
    router.push("/shopcart");
  };

  return (
    <>
      <div className="min-h-screen bg-custom-sec">
        {/* ── Navbar ─────────────────────────────────────────────────── */}
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
            <div className="flex-1 relative hidden sm:block max-w-md">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-custom-muted"
              />
              <input
                type="text"
                placeholder="Cari pempek, songket, kerajinan..."
                className="w-full pl-9 pr-4 py-2 rounded-full border border-custom bg-custom-ter text-sm focus:outline-none focus:border-brand-primary transition-colors"
              />
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <button className="relative p-2 rounded-full hover:bg-custom-ter transition-colors">
                <ShoppingCart size={20} className="text-custom-muted" />
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-brand-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </button>
              <button className="p-2 rounded-full hover:bg-custom-ter transition-colors">
                <User size={20} className="text-custom-muted" />
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-6">
          {/* ── Breadcrumb ──────────────────────────────────────────── */}
          <nav className="flex items-center gap-1 text-xs text-custom-muted mb-6 flex-wrap">
            <a href="#" className="hover:text-brand-primary transition-colors">
              Beranda
            </a>
            <ChevronRight size={12} />
            <a href="#" className="hover:text-brand-primary transition-colors">
              Kuliner
            </a>
            <ChevronRight size={12} />
            <span className="font-semibold text-custom-main">
              Pempek Kapal Selam
            </span>
          </nav>

          {/* ── Product Section ─────────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Gallery */}
            <div className="space-y-3">
              <div className="aspect-square rounded-2xl overflow-hidden bg-custom-card border border-custom shadow-sm">
                <img
                  src={THUMBNAILS[activeImg]}
                  alt="Pempek Kapal Selam"
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {THUMBNAILS.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      activeImg === i
                        ? "border-brand-primary shadow-sm"
                        : "border-custom hover:border-brand-primary/40"
                    }`}
                  >
                    <img
                      src={src}
                      alt={`Thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="space-y-5">
              {/* Badge + SKU */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  <BadgeCheck size={11} />
                  Palembang Authentic
                </span>
                <span className="text-xs text-custom-muted">
                  SKU: PMK-KS-001
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-custom-main leading-tight">
                Pempek Kapal Selam Telur Spesial (Besar)
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={14}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                  <span className="text-sm font-bold text-custom-main ml-1">
                    4.9
                  </span>
                  <span className="text-xs text-custom-muted ml-1">
                    (1.2k Penilaian)
                  </span>
                </div>
                <div className="h-4 w-px bg-custom-ter" />
                <span className="text-xs text-custom-muted">
                  Terjual{" "}
                  <span className="font-bold text-custom-main">2,450+</span>
                </span>
              </div>

              {/* Price card */}
              <div className="p-4 bg-custom-card border border-custom rounded-2xl space-y-2">
                <div className="flex items-end gap-3 flex-wrap">
                  <span className="text-3xl font-extrabold text-brand-primary">
                    Rp 25.000
                  </span>
                  <span className="text-sm text-custom-muted line-through mb-0.5">
                    Rp 32.000
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-orange-100 text-orange-700 border border-orange-200 mb-0.5">
                    Hemat 22%
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-custom-muted">
                  <Package size={13} className="text-brand-primary" />
                  <span>
                    Stok tersedia:{" "}
                    <span className="font-bold text-custom-main">142 pcs</span>
                  </span>
                </div>
              </div>

              {/* Qty selector */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-custom-muted">
                  Jumlah:
                </span>
                <div className="flex items-center border border-custom rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 flex items-center justify-center hover:bg-custom-ter transition-colors text-custom-muted"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-custom-main">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-9 h-9 flex items-center justify-center hover:bg-custom-ter transition-colors text-custom-muted"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <span className="text-xs text-custom-muted">
                  Total:{" "}
                  <span className="font-bold text-brand-primary">
                    {formatPrice(25000 * qty)}
                  </span>
                </span>
              </div>

              {/* Seller */}
              <div className="flex items-center justify-between p-3 bg-custom-card border border-custom rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-custom-ter border border-custom flex-shrink-0">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqS1sXbIFpvHoriKEMeRtc1MQ59aCSMZ1PdOr4xe5EZ5Eugsm4jTqG9fd5RpPmZqgiLxc3U21-_lAeIVo_9eQBQqhrWzIdWQiqWTizlJcCm1U25rKw4DJpX5kduhf1UWfxO2GZU9XZSzCICIJDBAnxW9uAWpoxWmBtYkfBZ0DpCXUlxRRn5jxZQgZtIAd3npwcYeiFgWDEBrZBtnMQ74NIV7JU_kjJB7CMciCE9djuEpSSdzMG2Hi5httjY9vZImUtYR934V7_a4E"
                      alt="Pempek Lani"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-custom-main">
                        Pempek Lani
                      </span>
                      <ShieldCheck size={13} className="text-brand-primary" />
                    </div>
                    <div className="flex items-center gap-1 text-xs text-custom-muted mt-0.5">
                      <MapPin size={11} />
                      <span>Seberang Ulu, Palembang</span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-2 border border-brand-primary text-brand-primary rounded-xl text-xs font-semibold hover:bg-teal-50 transition-colors">
                  <MessageCircle size={13} />
                  Chat
                </button>
              </div>

              {/* Tabs */}
              <div>
                <div className="flex border-b border-custom gap-6 mb-4">
                  {(["desc", "review", "shipping"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-3 text-xs font-semibold transition-colors relative ${
                        activeTab === tab
                          ? "text-brand-primary"
                          : "text-custom-muted hover:text-custom-main"
                      }`}
                    >
                      {tab === "desc" && "Deskripsi"}
                      {tab === "review" && "Ulasan (1.2k)"}
                      {tab === "shipping" && "Pengiriman"}
                      {activeTab === tab && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-full" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Tab: Deskripsi */}
                {activeTab === "desc" && (
                  <div className="space-y-3 text-sm text-custom-muted leading-relaxed">
                    <p>
                      Nikmati kelezatan autentik Palembang dengan Pempek Kapal
                      Selam legendaris dari Pempek Lani. Dibuat menggunakan
                      daging ikan Tenggiri segar pilihan dan sagu berkualitas
                      tinggi untuk tekstur yang pas — kenyal namun tetap lembut.
                    </p>
                    <ul className="space-y-1.5">
                      {[
                        "Isian Telur Ayam Utuh di dalam",
                        "Tanpa Bahan Pengawet & Pemutih",
                        "Sudah termasuk Cuko kental pedas-manis mantap",
                        "Dikemas vakum untuk menjaga kesegaran",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tab: Ulasan */}
                {activeTab === "review" && (
                  <div className="space-y-4">
                    {/* Summary */}
                    <div className="flex items-center gap-4 p-4 bg-custom-card border border-custom rounded-2xl">
                      <div className="text-center">
                        <p className="text-4xl font-extrabold text-custom-main">
                          4.9
                        </p>
                        <div className="flex justify-center gap-0.5 my-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              size={12}
                              className="fill-amber-400 text-amber-400"
                            />
                          ))}
                        </div>
                        <p className="text-[10px] text-custom-muted">
                          1.200 ulasan
                        </p>
                      </div>
                      <div className="flex-1 space-y-1">
                        {[5, 4, 3, 2, 1].map((s) => (
                          <div key={s} className="flex items-center gap-2">
                            <span className="text-[10px] text-custom-muted w-3">
                              {s}
                            </span>
                            <div className="flex-1 h-1.5 bg-custom-ter rounded-full overflow-hidden">
                              <div
                                className="h-full bg-amber-400 rounded-full"
                                style={{
                                  width:
                                    s === 5 ? "82%" : s === 4 ? "12%" : "4%",
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {REVIEWS.map((r) => (
                      <div
                        key={r.id}
                        className="p-4 bg-custom-card border border-custom rounded-2xl space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center">
                              <span className="text-xs font-bold text-brand-primary">
                                {r.name[0]}
                              </span>
                            </div>
                            <div>
                              <p className="text-xs font-bold text-custom-main">
                                {r.name}
                              </p>
                              <p className="text-[10px] text-custom-muted">
                                {r.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-0.5">
                            {Array.from({ length: r.rating }).map((_, i) => (
                              <Star
                                key={i}
                                size={11}
                                className="fill-amber-400 text-amber-400"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-custom-muted leading-relaxed">
                          {r.text}
                        </p>
                        {r.img && (
                          <div className="w-16 h-16 rounded-xl overflow-hidden border border-custom">
                            <img
                              src={r.img}
                              alt="Review"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Tab: Pengiriman */}
                {activeTab === "shipping" && (
                  <div className="space-y-3">
                    {[
                      {
                        icon: Truck,
                        title: "Jangkauan Pengiriman",
                        desc: "Seluruh Indonesia (Rekomendasi JNE YES / Paxel untuk menjaga kesegaran).",
                      },
                      {
                        icon: Clock,
                        title: "Estimasi Pengemasan",
                        desc: "1×24 jam setelah order dikonfirmasi.",
                      },
                      {
                        icon: Package,
                        title: "Kemasan Khusus",
                        desc: "Dikemas vakum dengan coolbox untuk menjaga kualitas produk selama pengiriman.",
                      },
                    ].map(({ icon: Icon, title, desc }) => (
                      <div
                        key={title}
                        className="flex items-start gap-3 p-4 bg-custom-card border border-custom rounded-2xl"
                      >
                        <div className="w-9 h-9 rounded-xl bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon size={16} className="text-brand-primary" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-custom-main mb-0.5">
                            {title}
                          </p>
                          <p className="text-xs text-custom-muted leading-relaxed">
                            {desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action buttons — sticky on mobile */}
              <div className="fixed bottom-0 left-0 right-0 md:static z-40 bg-custom-card/90 backdrop-blur-md border-t border-custom md:border-none p-4 md:p-0">
                <div className="flex items-center gap-3 max-w-7xl mx-auto">
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-bold text-sm transition-all active:scale-95 ${
                      addedToCart
                        ? "border-green-500 bg-green-50 text-green-600"
                        : "border-brand-primary text-brand-primary hover:bg-teal-50"
                    }`}
                  >
                    <ShoppingCart size={16} />
                    {addedToCart ? "Ditambahkan!" : "Keranjang"}
                  </button>
                  <button className="flex-[1.5] py-3 rounded-xl bg-brand-primary text-white font-bold text-sm hover:opacity-90 active:scale-95 transition-all shadow-md">
                    Beli Sekarang
                  </button>
                  <button
                    onClick={() => setLiked((v) => !v)}
                    className="w-11 h-11 rounded-xl border border-custom flex items-center justify-center hover:bg-custom-ter transition-colors flex-shrink-0"
                  >
                    <Heart
                      size={18}
                      className={
                        liked
                          ? "fill-red-500 text-red-500"
                          : "text-custom-muted"
                      }
                    />
                  </button>
                  <button className="w-11 h-11 rounded-xl border border-custom flex items-center justify-center hover:bg-custom-ter transition-colors flex-shrink-0">
                    <Share2 size={16} className="text-custom-muted" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Related Products ────────────────────────────────────── */}
          <div className="pt-8 border-t border-custom mb-20 md:mb-0">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-extrabold text-custom-main">
                Direkomendasikan untuk Anda
              </h2>
              <a
                href="#"
                className="text-xs font-semibold text-brand-primary hover:underline"
              >
                Lihat Semua
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {RELATED.map((p) => (
                <div
                  key={p.id}
                  className="group bg-custom-card border border-custom rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="aspect-square relative overflow-hidden bg-custom-ter">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {p.badge && (
                      <span
                        className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          p.badge === "Hot"
                            ? "bg-orange-100 text-orange-700 border border-orange-200"
                            : "bg-teal-50 text-teal-700 border border-teal-200"
                        }`}
                      >
                        {p.badge === "Hot" ? (
                          <Flame size={9} className="inline mr-0.5" />
                        ) : null}
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-3 space-y-1.5">
                    <p className="text-xs font-semibold text-custom-main line-clamp-2 group-hover:text-brand-primary transition-colors leading-snug">
                      {p.name}
                    </p>
                    <p className="text-sm font-extrabold text-brand-primary">
                      {formatPrice(p.price)}
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-custom-muted">
                      <Star
                        size={10}
                        className="fill-amber-400 text-amber-400"
                      />
                      <span>{p.rating}</span>
                      <span>·</span>
                      <span>Terjual {p.sold}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
