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
} from "lucide-react";
import Image from "next/image";
// ─── Types ────────────────────────────────────────────────────────────────────

type ProfileTab = "orders" | "info" | "wishlist" | "address";

interface Order {
  id: string;
  date: string;
  status: "selesai" | "pending" | "diproses";
  product: string;
  qty: number;
  price: number;
  img: string;
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
  },
  {
    id: "INV/20240318/UMKM/901",
    date: "Hari ini, 10:45",
    status: "pending",
    product: "Paket Pempek Campur Super - 50 Pcs",
    qty: 1,
    price: 265000,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVVjiB3KWtQ2zMvUrRdTayCstfwKAnpMiImw8-hWe2obLwhIVz77V5EIaOTW-qZiuIISdjfcVRm9FaxYfv0bvrfl90FZvd9i_fvvPa5w1fngu2JlSJR64Oc_mx7KSil83CMSzgQHI8lAi3bE9Bbp8S-35arduFlrCetyopQVtV8BBAtEBGLEJrn9OGX9Z3KQlxpn4XIPxuUNjiFFGmSKCgq7MIqaIjohmDX8JtD1brByxWNeRbu22ta7PGBzPep0F14JiQ241iQ0w",
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

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("orders");

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
                          <div className="mt-2 pt-2 border-t border-custom">
                            <p className="text-[10px] text-custom-muted">
                              Total Belanja
                            </p>
                            <p className="text-sm font-extrabold text-brand-primary">
                              {formatPrice(order.price)}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 justify-center flex-shrink-0">
                          {order.status === "selesai" ? (
                            <>
                              <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-primary text-white text-xs font-bold hover:opacity-90 transition-all">
                                <RotateCcw size={12} /> Beli Lagi
                              </button>
                              <button className="px-4 py-2 rounded-xl border border-custom text-xs font-semibold text-custom-muted hover:border-brand-primary hover:text-brand-primary transition-colors">
                                Detail Pesanan
                              </button>
                            </>
                          ) : (
                            <>
                              <button className="px-4 py-2 rounded-xl bg-orange-500 text-white text-xs font-bold hover:opacity-90 transition-all">
                                Bayar Sekarang
                              </button>
                              <button className="px-4 py-2 rounded-xl border border-custom text-xs font-semibold text-red-500 hover:border-red-300 hover:bg-red-50 transition-colors">
                                Batalkan
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
