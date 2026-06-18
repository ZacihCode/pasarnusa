"use client";

import { useState } from "react";
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Settings,
  LogOut,
  Star,
  Coins,
  Wallet,
  ChevronRight,
  RotateCcw,
  Search,
  Home,
  Compass,
  ShoppingCart,
  Store,
  Building2,
  Navigation,
} from "lucide-react";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────

type ProfileTab = "orders" | "info" | "wishlist" | "address" | "silayah";

interface Order {
  id: string;
  date: string;
  status: "selesai" | "pending" | "diproses";
  product: string;
  qty: number;
  price: number;
  img: string;
  sellerName: string;
  sellerDistrict: string;
  mapX: number;
  mapY: number;
}

interface UMKM {
  id: string;
  name: string;
  owner: string;
  category: "Kuliner" | "Fashion & Batik" | "Kerajinan";
  kecamatan: "Ilir Barat I" | "Seberang Ulu I" | "Sukarami" | "Kemuning" | "Jakabaring" | "Plaju";
  address: string;
  distance: string;
  rating: number;
  phone: string;
  mapX: number;
  mapY: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ORDERS: Order[] = [
  {
    id: "INV/20240315/UMKM/772",
    date: "15 Maret 2024",
    status: "selesai",
    product: "Songket Lepus Emas Asli Palembang",
    qty: 1,
    price: 3500000,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSpVz5O1W_YKAZfjEEwt_6J8AAS3y1zkgv-BsXgMJkqPImvD5vuqmWcS8ZyBI1X4cHQl3D3tzrlO5t8K61BPibHTT9DHXdUjlHh0E4XoCf67Id3yUqORKD8G8-ItIbQLh78gqfOx_mosEMTGoxIjZhp3SsAeoOPBN1kemB-ZRvj9I4aNJU9RzmnyvsYIc5fba7TUErgzcgYBj355fB8Kr1oGKogDGa1C3lre2NukjMMJYsdkz2Oc7JqWebl7n51vvgsHXelBAgyi4",
    sellerName: "Songket Palembang Indah",
    sellerDistrict: "Kemuning",
    mapX: 52,
    mapY: 28,
  },
  {
    id: "INV/20240318/UMKM/901",
    date: "Hari ini, 10:45",
    status: "pending",
    product: "Paket Pempek Campur Super - 50 Pcs",
    qty: 1,
    price: 265000,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVVjiB3KWtQ2zMvUrRdTayCstfwKAnpMiImw8-hWe2obLwhIVz77V5EIaOTW-qZiuIISdjfcVRm9FaxYfv0bvrfl90FZvd9i_fvvPa5w1fngu2JlSJR64Oc_mx7KSil83CMSzgQHI8lAi3bE9Bbp8S-35arduFlrCetyopQVtV8BBAtEBGLEJrn9OGX9Z3KQlxpn4XIPxuUNjiFFGmSKCgq7MIqaIjohmDX8JtD1brByxWNeRbu22ta7PGBzPep0F14JiQ241iQ0w",
    sellerName: "Pempek Bu Yanti",
    sellerDistrict: "Ilir Barat I",
    mapX: 28,
    mapY: 42,
  },
];

const STATUS_CONFIG: Record<
  Order["status"],
  { label: string; className: string }
> = {
  selesai: {
    label: "Selesai",
    className: "bg-teal-50 text-teal-700 border border-teal-200",
  },
  pending: {
    label: "Menunggu Pembayaran",
    className: "bg-orange-50 text-orange-700 border border-orange-200",
  },
  diproses: {
    label: "Diproses",
    className: "bg-blue-50 text-blue-700 border border-blue-200",
  },
};

const formatPrice = (p: number) => `Rp ${p.toLocaleString("id-ID")}`;

const UMKM_LIST: UMKM[] = [
  {
    id: "umkm-1",
    name: "Pempek Bu Yanti",
    owner: "Yanti Rahayu",
    category: "Kuliner",
    kecamatan: "Ilir Barat I",
    address: "Jl. Bukit Besar No. 45, Bukit Lama, Kec. Ilir Barat I",
    distance: "1.8 km",
    rating: 4.8,
    phone: "0812-3456-7890",
    mapX: 28,
    mapY: 42
  },
  {
    id: "umkm-2",
    name: "Songket Palembang Indah",
    owner: "Achmad Fauzi",
    category: "Fashion & Batik",
    kecamatan: "Kemuning",
    address: "Jl. Basuki Rahmat No. 12, Pipa Jaya, Kec. Kemuning",
    distance: "1.2 km",
    rating: 4.9,
    phone: "0813-9876-5432",
    mapX: 52,
    mapY: 28
  },
  {
    id: "umkm-3",
    name: "Kerajinan Tembaga Ampera",
    owner: "Hendra Wijaya",
    category: "Kerajinan",
    kecamatan: "Seberang Ulu I",
    address: "Jl. KH. Wahid Hasyim No. 88, 3-4 Ulu, Kec. Seberang Ulu I",
    distance: "3.1 km",
    rating: 4.7,
    phone: "0821-4455-6677",
    mapX: 42,
    mapY: 72
  },
  {
    id: "umkm-4",
    name: "Batik Palembang Sriwijaya",
    owner: "Siti Rahmawati",
    category: "Fashion & Batik",
    kecamatan: "Sukarami",
    address: "Jl. Kol. H. Burlian KM. 10, Karya Baru, Kec. Sukarami",
    distance: "6.5 km",
    rating: 4.6,
    phone: "0852-1122-3344",
    mapX: 35,
    mapY: 22
  },
  {
    id: "umkm-5",
    name: "Kemplang Tunu Maknyus",
    owner: "Jaka Perkasa",
    category: "Kuliner",
    kecamatan: "Jakabaring",
    address: "Samping Stadion Gelora Sriwijaya, Kec. Jakabaring",
    distance: "4.8 km",
    rating: 4.7,
    phone: "0819-5566-7788",
    mapX: 62,
    mapY: 78
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("orders");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("Semua");
  const [categoryFilter, setCategoryFilter] = useState<string>("Semua");
  const [searchQueryMap, setSearchQueryMap] = useState("");
  const [selectedUMKM, setSelectedUMKM] = useState<UMKM | null>(null);

  const handleViewShopOnMap = (sellerName: string) => {
    const found = UMKM_LIST.find((u) => u.name === sellerName);
    if (found) {
      setSelectedUMKM(found);
      setSelectedDistrict("Semua");
      setActiveTab("silayah");
    }
  };

  return (
    <div className="min-h-screen bg-custom-sec pb-16 md:pb-0">
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
          <div className="flex-1 relative hidden sm:block max-w-md">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-custom-muted"
            />
            <input
              type="text"
              placeholder="Cari kerajinan, pempek, songket..."
              className="w-full pl-9 pr-4 py-2 rounded-full border border-custom bg-custom-ter text-sm focus:outline-none focus:border-brand-primary transition-colors"
            />
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full hover:bg-custom-ter transition-colors cursor-pointer">
                <ShoppingCart size={20} className="text-custom-muted" />
              </button>
              <a href="/profile">
                <button className="p-2 rounded-full hover:bg-custom-ter transition-colors cursor-pointer">
                  <User size={20} className="text-custom-muted" />
                </button>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-custom-muted mb-6">
          <a href="/" className="hover:text-brand-primary">
            Beranda
          </a>
          <ChevronRight size={12} />
          <span className="font-semibold text-custom-main">Profile</span>
        </nav>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="bg-custom-card border border-custom rounded-2xl overflow-hidden shadow-sm">
              {/* User header */}
              <div className="p-4 bg-custom-sec border-b border-custom">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-brand-primary/10 border-2 border-brand-primary flex items-center justify-center">
                      <span className="text-lg font-extrabold text-brand-primary">
                        A
                      </span>
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                  </div>
                  <div>
                    <h2 className="text-sm font-extrabold text-custom-main">
                      Andi Pratama
                    </h2>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                      <Star
                        size={9}
                        className="fill-amber-500 text-amber-500"
                      />
                      Silver Member
                    </span>
                  </div>
                </div>
              </div>

              {/* Nav links */}
              <nav className="p-3 space-y-1">
                {[
                  {
                    id: "info" as ProfileTab,
                    label: "Info Pribadi",
                    icon: User,
                  },
                  {
                    id: "orders" as ProfileTab,
                    label: "Riwayat Pesanan",
                    icon: ShoppingBag,
                  },
                  {
                    id: "wishlist" as ProfileTab,
                    label: "Wishlist",
                    icon: Heart,
                  },
                  {
                    id: "address" as ProfileTab,
                    label: "Alamat Tersimpan",
                    icon: MapPin,
                  },
                  {
                    id: "silayah" as ProfileTab,
                    label: "SiWilayah (Peta UMKM)",
                    icon: Compass,
                  },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all text-xs font-semibold ${
                      activeTab === id
                        ? "bg-brand-primary text-white"
                        : "text-custom-muted hover:bg-custom-ter hover:text-custom-main"
                    }`}
                  >
                    <Icon size={14} />
                    {label}
                  </button>
                ))}
                <div className="h-px bg-custom-ter my-2" />
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-semibold text-custom-muted hover:bg-custom-ter">
                  <Settings size={14} /> Pengaturan
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-semibold text-red-500 hover:bg-red-50">
                  <LogOut size={14} /> Keluar
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-4">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  icon: ShoppingBag,
                  label: "Total Pesanan",
                  value: "24",
                  color: "bg-teal-50 text-brand-primary",
                },
                {
                  icon: Coins,
                  label: "Loyalty Points",
                  value: "1.250",
                  color: "bg-amber-50 text-amber-600",
                },
                {
                  icon: Wallet,
                  label: "Saldo UMKM",
                  value: "Rp 450k",
                  color: "bg-orange-50 text-orange-600",
                },
              ].map(({ icon: Icon, label, value, color }) => (
                <div
                  key={label}
                  className="bg-custom-card border border-custom rounded-2xl p-4 shadow-sm flex items-center gap-3"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-custom-muted">{label}</p>
                    <p className="text-base font-extrabold text-custom-main">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-extrabold text-custom-main">
                    Riwayat Pesanan
                  </h2>
                  <button className="text-xs font-semibold text-brand-primary hover:underline">
                    Lihat Semua
                  </button>
                </div>
                {ORDERS.map((order) => {
                  const status = STATUS_CONFIG[order.status];
                  return (
                    <div
                      key={order.id}
                      className="bg-custom-card border border-custom rounded-2xl overflow-hidden shadow-sm"
                    >
                      <div className="px-4 py-3 bg-custom-sec border-b border-custom flex flex-wrap justify-between items-center gap-2">
                        <div className="flex items-center gap-2">
                          <ShoppingBag
                            size={14}
                            className="text-brand-primary"
                          />
                          <div>
                            <p className="text-xs font-bold text-custom-main">
                              {order.id}
                            </p>
                            <p className="text-[10px] text-custom-muted">
                              {order.date}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${status.className}`}
                        >
                          {status.label}
                        </span>
                      </div>
                      <div className="p-4 flex flex-col sm:flex-row gap-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden border border-custom flex-shrink-0">
                          <img
                            src={order.img}
                            alt={order.product}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-custom-main">
                            {order.product}
                          </p>
                          <p className="text-xs text-custom-muted mt-1">
                            {order.qty} Barang ×{" "}
                            {formatPrice(order.price / order.qty)}
                          </p>
                          <div className="mt-2 pt-2 border-t border-custom flex justify-between items-end flex-wrap gap-2">
                            <div>
                              <p className="text-[10px] text-custom-muted">
                                Total Belanja
                              </p>
                              <p className="text-sm font-extrabold text-brand-primary">
                                {formatPrice(order.price)}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 bg-custom-ter/50 px-2.5 py-1 rounded-xl border border-custom">
                              <MapPin size={11} className="text-brand-primary animate-pulse" />
                              <span className="text-[9px] text-custom-muted font-bold">
                                Toko: {order.sellerName} ({order.sellerDistrict})
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 justify-center flex-shrink-0">
                          {order.status === "selesai" ? (
                            <>
                              <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-primary text-white text-xs font-bold hover:opacity-90 transition-all">
                                <RotateCcw size={12} /> Beli Lagi
                              </button>
                              <button
                                onClick={() => handleViewShopOnMap(order.sellerName)}
                                className="px-4 py-2 rounded-xl border border-custom text-xs font-semibold text-custom-muted hover:border-brand-primary hover:text-brand-primary transition-colors flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <Compass size={12} /> Lihat di Peta
                              </button>
                            </>
                          ) : (
                            <>
                              <button className="px-4 py-2 rounded-xl bg-orange-500 text-white text-xs font-bold hover:opacity-90 transition-all">
                                Bayar Sekarang
                              </button>
                              <button
                                onClick={() => handleViewShopOnMap(order.sellerName)}
                                className="px-4 py-2 rounded-xl border border-custom text-xs font-semibold text-custom-muted hover:border-brand-primary hover:text-brand-primary transition-colors flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <Compass size={12} /> Lokasi Toko
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Info Tab */}
            {activeTab === "info" && (
              <div className="bg-custom-card border border-custom rounded-2xl p-6 shadow-sm space-y-4">
                <h2 className="text-base font-extrabold text-custom-main">
                  Info Pribadi
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Nama Lengkap", value: "Andi Pratama" },
                    { label: "Email", value: "andi.pratama@email.com" },
                    { label: "No. Telepon", value: "+62 812-3456-7890" },
                    { label: "Tanggal Bergabung", value: "10 Januari 2023" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-[10px] text-custom-muted uppercase tracking-wide mb-1">
                        {label}
                      </p>
                      <p className="text-sm font-semibold text-custom-main">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
                <button className="mt-2 px-4 py-2 rounded-xl bg-brand-primary text-white text-xs font-bold hover:opacity-90">
                  Edit Profil
                </button>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === "wishlist" && (
              <div className="bg-custom-card border border-custom rounded-2xl p-6 shadow-sm">
                <h2 className="text-base font-extrabold text-custom-main mb-4">
                  Wishlist
                </h2>
                <div className="flex flex-col items-center py-10 text-center">
                  <Heart size={40} className="text-custom-muted mb-3" />
                  <p className="text-sm font-bold text-custom-main">
                    Wishlist Kosong
                  </p>
                  <p className="text-xs text-custom-muted mt-1">
                    Simpan produk favoritmu di sini.
                  </p>
                  <a
                    href="/products"
                    className="mt-4 px-4 py-2 rounded-xl bg-brand-primary text-white text-xs font-bold hover:opacity-90"
                  >
                    Jelajahi Produk
                  </a>
                </div>
              </div>
            )}

            {/* Address Tab */}
            {activeTab === "address" && (
              <div className="bg-custom-card border border-custom rounded-2xl p-6 shadow-sm space-y-4">
                <h2 className="text-base font-extrabold text-custom-main">
                  Alamat Tersimpan
                </h2>
                <div className="p-4 border-2 border-brand-primary bg-teal-50 rounded-2xl">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-brand-primary bg-white px-2 py-0.5 rounded-full border border-teal-200 mb-2 inline-block">
                        UTAMA
                      </span>
                      <p className="text-sm font-bold text-custom-main">
                        Andi Pratama
                      </p>
                      <p className="text-xs text-custom-muted mt-1 leading-relaxed">
                        Jl. Jend. Sudirman No. 123, Kel. 20 Ilir D. IV,
                        <br />
                        Kec. Ilir Timur I, Palembang, 30128
                      </p>
                    </div>
                    <button className="text-xs text-brand-primary hover:underline font-semibold">
                      Ubah
                    </button>
                  </div>
                </div>
                <button className="w-full py-2.5 rounded-xl border-2 border-dashed border-custom text-xs font-semibold text-custom-muted hover:border-brand-primary hover:text-brand-primary transition-colors">
                  + Tambah Alamat Baru
                </button>
              </div>
            )}

            {/* SiWilayah Tab */}
            {activeTab === "silayah" && (
              <div className="space-y-4">
                <div className="bg-custom-card border border-custom p-5 rounded-2xl shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h2 className="text-base font-extrabold text-custom-main flex items-center gap-1.5">
                        <Compass size={18} className="text-brand-primary" />
                        SiWilayah - Temukan UMKM Terdekat
                      </h2>
                      <p className="text-xs text-custom-muted">
                        Cari tahu lokasi fisik UMKM terverifikasi di sekeliling tempat tinggal Anda
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-custom-muted">
                          <Search size={13} />
                        </span>
                        <input
                          type="text"
                          placeholder="Cari toko/produk..."
                          value={searchQueryMap}
                          onChange={(e) => setSearchQueryMap(e.target.value)}
                          className="pl-9 pr-3 py-1.5 text-xs rounded-xl border border-custom bg-custom-ter focus:outline-none focus:border-brand-primary text-custom-main"
                        />
                      </div>
                      <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-3 py-1.5 rounded-xl border border-custom bg-custom-ter text-xs font-semibold text-custom-main focus:outline-none"
                      >
                        <option value="Semua">Semua Kategori</option>
                        <option value="Kuliner">Kuliner</option>
                        <option value="Fashion & Batik">Fashion & Batik</option>
                        <option value="Kerajinan">Kerajinan</option>
                      </select>
                    </div>
                  </div>

                  {/* District pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {["Semua", "Ilir Barat I", "Seberang Ulu I", "Sukarami", "Kemuning", "Jakabaring", "Plaju"].map((dist) => (
                      <button
                        key={dist}
                        onClick={() => setSelectedDistrict(dist)}
                        className={`px-3 py-1 rounded-lg font-bold border transition text-[10px] ${
                          selectedDistrict === dist
                            ? "bg-brand-primary text-white border-brand-primary"
                            : "bg-custom-ter text-custom-muted border-custom hover:text-custom-main"
                        }`}
                      >
                        {dist}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2">
                    {/* SVG Map (Left) */}
                    <div className="lg:col-span-8 relative h-[380px] border border-custom bg-custom-sec rounded-2xl overflow-hidden flex items-center justify-center p-4">
                      {/* Grid overlays */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800d_1px,transparent_1px),linear-gradient(to_bottom,#8080800d_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none"></div>

                      <svg viewBox="0 0 500 300" className="w-full h-full text-custom-muted/20 opacity-95">
                        {/* River Musi */}
                        <path
                          d="M 10 140 Q 150 120, 250 150 T 490 130"
                          fill="none"
                          stroke="var(--brand-primary)"
                          strokeWidth="7"
                          strokeOpacity="0.2"
                          strokeDasharray="5 3"
                        />
                        {/* Ampera Bridge */}
                        <line x1="240" y1="130" x2="240" y2="160" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" />
                        <line x1="235" y1="130" x2="235" y2="160" stroke="#f43f5e" strokeWidth="1.5" />
                        <line x1="245" y1="130" x2="245" y2="160" stroke="#f43f5e" strokeWidth="1.5" />

                        {/* Clickable District Paths */}
                        <path
                          d="M 50 20 L 180 10 L 210 50 L 150 90 L 90 80 Z"
                          fill="currentColor"
                          className={`cursor-pointer transition-colors duration-150 ${selectedDistrict === "Sukarami" ? "text-brand-primary/10 stroke-brand-primary stroke-2" : "text-custom-muted/5 hover:text-brand-primary/5 stroke-custom/60"}`}
                          onClick={() => setSelectedDistrict(selectedDistrict === "Sukarami" ? "Semua" : "Sukarami")}
                        />
                        <path
                          d="M 210 50 L 300 40 L 320 95 L 230 110 L 195 80 Z"
                          fill="currentColor"
                          className={`cursor-pointer transition-colors duration-150 ${selectedDistrict === "Kemuning" ? "text-brand-primary/10 stroke-brand-primary stroke-2" : "text-custom-muted/5 hover:text-brand-primary/5 stroke-custom/60"}`}
                          onClick={() => setSelectedDistrict(selectedDistrict === "Kemuning" ? "Semua" : "Kemuning")}
                        />
                        <path
                          d="M 90 80 L 195 80 L 230 110 L 220 140 L 120 145 L 80 110 Z"
                          fill="currentColor"
                          className={`cursor-pointer transition-colors duration-150 ${selectedDistrict === "Ilir Barat I" ? "text-brand-primary/10 stroke-brand-primary stroke-2" : "text-custom-muted/5 hover:text-brand-primary/5 stroke-custom/60"}`}
                          onClick={() => setSelectedDistrict(selectedDistrict === "Ilir Barat I" ? "Semua" : "Ilir Barat I")}
                        />
                        <path
                          d="M 120 145 L 220 140 L 250 170 L 230 240 L 150 220 L 110 180 Z"
                          fill="currentColor"
                          className={`cursor-pointer transition-colors duration-150 ${selectedDistrict === "Seberang Ulu I" ? "text-brand-primary/10 stroke-brand-primary stroke-2" : "text-custom-muted/5 hover:text-brand-primary/5 stroke-custom/60"}`}
                          onClick={() => setSelectedDistrict(selectedDistrict === "Seberang Ulu I" ? "Semua" : "Seberang Ulu I")}
                        />
                        <path
                          d="M 250 170 L 360 160 L 390 230 L 290 260 L 230 240 Z"
                          fill="currentColor"
                          className={`cursor-pointer transition-colors duration-150 ${selectedDistrict === "Jakabaring" ? "text-brand-primary/10 stroke-brand-primary stroke-2" : "text-custom-muted/5 hover:text-brand-primary/5 stroke-custom/60"}`}
                          onClick={() => setSelectedDistrict(selectedDistrict === "Jakabaring" ? "Semua" : "Jakabaring")}
                        />
                        <path
                          d="M 360 160 L 470 145 L 490 210 L 420 250 L 390 230 Z"
                          fill="currentColor"
                          className={`cursor-pointer transition-colors duration-150 ${selectedDistrict === "Plaju" ? "text-brand-primary/10 stroke-brand-primary stroke-2" : "text-custom-muted/5 hover:text-brand-primary/5 stroke-custom/60"}`}
                          onClick={() => setSelectedDistrict(selectedDistrict === "Plaju" ? "Semua" : "Plaju")}
                        />
                      </svg>

                      {/* Buyer Home Location (Ilir Timur I - Center) */}
                      <div style={{ left: "45%", top: "46%" }} className="absolute -translate-x-1/2 -translate-y-1/2 z-40">
                        <span className="relative flex h-7 w-7 items-center justify-center">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-60"></span>
                          <span className="relative inline-flex rounded-full h-4.5 w-4.5 bg-blue-600 border-2 border-white dark:border-zinc-900 shadow-md items-center justify-center">
                            <Home size={10} className="text-white" />
                          </span>
                        </span>
                        <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-2 py-0.5 rounded text-[8px] font-bold shadow whitespace-nowrap">
                          📍 Rumah Anda
                        </div>
                      </div>

                      {/* UMKM Location Pins */}
                      {UMKM_LIST.filter((u) => {
                        const mDistrict = selectedDistrict === "Semua" || u.kecamatan === selectedDistrict;
                        const mCategory = categoryFilter === "Semua" || u.category === categoryFilter;
                        const mSearch = u.name.toLowerCase().includes(searchQueryMap.toLowerCase());
                        return mDistrict && mCategory && mSearch;
                      }).map((umkm) => (
                        <div
                          key={umkm.id}
                          style={{ left: `${umkm.mapX}%`, top: `${umkm.mapY}%` }}
                          className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-30"
                          onClick={() => setSelectedUMKM(umkm)}
                        >
                          <span className="relative flex h-6 w-6 items-center justify-center">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-70 ${umkm.category === "Kuliner" ? "bg-orange-400" : umkm.category === "Fashion & Batik" ? "bg-purple-400" : "bg-teal-400"}`}></span>
                            <span className={`relative inline-flex rounded-full h-3.5 w-3.5 border border-white dark:border-zinc-900 shadow-md ${umkm.category === "Kuliner" ? "bg-orange-500" : umkm.category === "Fashion & Batik" ? "bg-purple-500" : "bg-teal-500"}`}></span>
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Nearest shops list (Right) */}
                    <div className="lg:col-span-4 flex flex-col justify-between h-[380px]">
                      <div className="space-y-2.5 overflow-y-auto flex-grow pr-1">
                        <p className="font-bold text-[10px] text-custom-muted uppercase tracking-wider">Toko UMKM Terdekat</p>
                        {UMKM_LIST.filter((u) => {
                          const mDistrict = selectedDistrict === "Semua" || u.kecamatan === selectedDistrict;
                          const mCategory = categoryFilter === "Semua" || u.category === categoryFilter;
                          const mSearch = u.name.toLowerCase().includes(searchQueryMap.toLowerCase());
                          return mDistrict && mCategory && mSearch;
                        }).map((umkm) => (
                          <div
                            key={umkm.id}
                            onClick={() => setSelectedUMKM(umkm)}
                            className={`p-3 rounded-xl border cursor-pointer transition-all ${selectedUMKM?.id === umkm.id ? "border-brand-primary bg-brand-primary/5" : "border-custom bg-custom-ter/30 hover:bg-custom-ter/50"}`}
                          >
                            <div className="flex justify-between items-start gap-1">
                              <h4 className="font-bold text-custom-main text-[11px] truncate">{umkm.name}</h4>
                              <span className="text-[9px] font-bold text-brand-primary bg-brand-primary/10 px-1.5 py-0.5 rounded-md flex-shrink-0">
                                {umkm.distance}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 mt-1 text-[10px] text-custom-muted">
                              <span className="flex items-center text-amber-500 font-bold">
                                <Star size={10} className="fill-current text-amber-500 mr-0.5" />
                                {umkm.rating}
                              </span>
                              <span>•</span>
                              <span>{umkm.kecamatan}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Selected Shop Mini-card */}
                      {selectedUMKM && (
                        <div className="mt-3 p-3 bg-custom-card border border-brand-primary/30 rounded-xl space-y-2 shadow-sm animate-float-slow">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-[8px] font-black uppercase text-brand-primary tracking-wider">{selectedUMKM.category}</p>
                              <h5 className="font-bold text-custom-main text-xs">{selectedUMKM.name}</h5>
                            </div>
                            <span className="text-[9px] font-bold text-custom-muted">{selectedUMKM.distance} dari Anda</span>
                          </div>
                          <p className="text-[10px] text-custom-muted line-clamp-2">{selectedUMKM.address}</p>
                          <div className="grid grid-cols-2 gap-2 pt-1">
                            <button
                              onClick={() => {
                                alert(`Membuka etalase produk dari ${selectedUMKM.name}`);
                              }}
                              className="py-1.5 bg-brand-primary text-white text-[10px] font-bold rounded-lg hover:opacity-95 transition-all text-center flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Store size={11} /> Kunjungi Toko
                            </button>
                            <a
                              href={`https://wa.me/${selectedUMKM.phone.replace(/[^0-9]/g, "")}`}
                              target="_blank"
                              rel="noreferrer"
                              className="py-1.5 border border-custom bg-custom-ter text-custom-main text-[10px] font-bold rounded-lg hover:bg-custom-card transition-all text-center flex items-center justify-center gap-1"
                            >
                              💬 Chat WhatsApp
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Recommendations */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-extrabold text-custom-main">
                  Mungkin Anda Suka
                </h2>
                <a
                  href="#"
                  className="text-xs font-semibold text-brand-primary hover:underline flex items-center gap-1"
                >
                  Lihat Semua <ChevronRight size={12} />
                </a>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  {
                    name: "Kriya Kayu Ukir Khas Palembang",
                    price: 280000,
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9pNbMnGtva92rAldHcplnY6ouclE-Aj1GBUskPSKAFdluc0q6Td_CpWBFgLvweim3OLYkO1MwcBLxWSVG6c59AE9LyPStceO1KGv4HldlB6hRPaG40115SduYh5mbSB7zHl9vjFjpr2dVDNzwR-b0pKGBXVIe0LsfleIjM5rlee5oEysRYhiyBYf_9xLyQ6RPWJXwkMdrF1jpHNDN6G_EYEIxgAgycowGJ_MU0UduIJzBWU_KvJOTnMJFsts1UZcK6EXnXkdDfM8",
                    badge: "TRENDING",
                  },
                  {
                    name: "Kopi Semendo Arabica Premium",
                    price: 85000,
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBM96pHo7AS4A6hXym696EQcclJ9QOrnqf9mS4--4rEqqXj-DYMwcBGeKeoW-u5AsWoHCB3urxtfQbbZ7yAimvrR_aBCRqR7UhKn2gaU0ZoqioOfJWunxBX2g9dVXiu7FMkNaU7lvFvWwVkWjaIC3Ll9XgExWrMyoTitFlTZYBhCqIynIFgUvIethZlHD39G4vVa-W8gcC59772d2TSg0B8rHJjOe-CESN4lgTGUjekKGfhV1fwSCdMkKKll0PXx8ELw8HAH28c1NM",
                  },
                  {
                    name: "Miniatur Ampera Lapis Emas",
                    price: 1200000,
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBgsL7GPoL8fQ0MPwDZqX-gqJs1I3UH7AGG0HvtVofv_kcebEPE8qEqX31i4Ev5zNl6QfPSrIntBWZt3-Fgw8aDpw_h5Xn7Zuv0kuUHLWRkzcSBtC8qYA_F2pRRSmSBpN26u95ZrSg4XdJAESXgDBMdikk61cESJMf0eCWEoCxigNIiXHxR7BZDU_LFRBgPJ8DMUF3hRXzb753DDpX8pOWu0E1vKzWQuHGT6l00c87xnBt4Id6zEUzH2TGcoiFAE-Ix901Z62O4vQ",
                  },
                ].map((p) => (
                  <div
                    key={p.name}
                    className="group bg-custom-card border border-custom rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all"
                  >
                    <div className="aspect-square relative overflow-hidden bg-custom-ter">
                      <img
                        src={p.img}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {p.badge && (
                        <span className="absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-semibold text-custom-main line-clamp-2 mb-1">
                        {p.name}
                      </p>
                      <p className="text-sm font-extrabold text-brand-primary">
                        {formatPrice(p.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom nav mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-custom-card border-t border-custom z-50 flex justify-around py-2">
        {[
          { icon: Home, label: "Beranda", href: "/" },
          { icon: Compass, label: "Eksplor", href: "/products" },
          { icon: ShoppingCart, label: "Keranjang", href: "/cart" },
          { icon: User, label: "Profil", href: "/profile", active: true },
        ].map(({ icon: Icon, label, href, active }) => (
          <a
            key={label}
            href={href}
            className={`flex flex-col items-center gap-0.5 ${active ? "text-brand-primary" : "text-custom-muted"}`}
          >
            <Icon size={20} />
            <span className="text-[9px] font-semibold">{label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
