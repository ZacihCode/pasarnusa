"use client";

import { useState } from "react";
import {
  ShoppingCart,
  User,
  MapPin,
  Truck,
  CreditCard,
  Lock,
  ChevronRight,
  Check,
  Award,
  QrCode,
  Building2,
  Wallet,
  Clock,
  Zap,
  Search,
} from "lucide-react";
import Image from "next/image";
// ─── Types ────────────────────────────────────────────────────────────────────

interface CourierOption {
  id: string;
  name: string;
  estimate: string;
  price: number;
  icon: React.ReactNode;
}

interface OrderItem {
  id: number;
  name: string;
  qty: number;
  price: number;
  img: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const COURIERS: CourierOption[] = [
  {
    id: "jne",
    name: "JNE Reguler",
    estimate: "2–3 Hari",
    price: 18000,
    icon: <Truck size={16} />,
  },
  {
    id: "pos",
    name: "POS Kilat",
    estimate: "3–5 Hari",
    price: 12000,
    icon: <Clock size={16} />,
  },
  {
    id: "gosend",
    name: "GoSend Instant",
    estimate: "2–3 Jam",
    price: 25000,
    icon: <Zap size={16} />,
  },
];

const ORDER_ITEMS: OrderItem[] = [
  {
    id: 1,
    name: "Kain Songket Lepus Berlian",
    qty: 1,
    price: 2450000,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5nlVxW7DIAcT3Og6saVsvFYtfqAqMhXWLs3wxBQQVYp0tm89RmOylXOt7BIhiydz-QUBKM5lvca2zz0aNhJ8xGVGffeKG3ERoA91G3MTmeQjYRXuvR-3Eq0xm_Py6vfpSi82unNSn6b9ezOHm1fYX5lw_j83sk7D6_kSCBbNxvlFbPSu6ZGC_WjZN-Qnvj3duf2e7RsYZAqBX7up8dO_YG_KNDT5T0e2JpclFh9AMO1a_zBWXcrBj4kxstfcZQ3O2zD1iRnMCQ2o",
  },
  {
    id: 2,
    name: "Paket Pempek Vakum Premium",
    qty: 2,
    price: 125000,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIsRgPDjJwB86TPo18Ljrl0rI2AZRzM23xT1F3s1PLGGH23O_3CZSvIxUhwF0hd3q7ICCIonPM85z2G5L95F9lbBJCS6ZKHlzVNgCZ3gkHKFbZ-1b1UmFnkmQMF9OA2PzE6IXRE4x243-JiPhk2tVPusN6H2iAU6tDFVm5H5uGoEQUU_rLB8QbKDo78OrczWZPRLGKggm1g_92dDBmKvuJlWh7Cng1y09NN8fDjC27L8JoeI9_Y7mDq07xEYS8wV3tsYdehIGKwTc",
  },
];

const formatPrice = (p: number) => `Rp ${p.toLocaleString("id-ID")}`;

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const [selectedCourier, setSelectedCourier] = useState("jne");
  const [selectedPayment, setSelectedPayment] = useState("qris");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const courier = COURIERS.find((c) => c.id === selectedCourier)!;
  const subtotal = ORDER_ITEMS.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = Math.floor(subtotal * 0.11);
  const total = subtotal + courier.price + tax;

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-custom-sec flex items-center justify-center px-4">
        <div className="max-w-sm w-full text-center space-y-5">
          <div className="w-20 h-20 rounded-full bg-teal-50 border-2 border-teal-200 flex items-center justify-center mx-auto">
            <Check size={36} className="text-brand-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-custom-main mb-2">
              Pembayaran Berhasil!
            </h2>
            <p className="text-sm text-custom-muted">
              Pesanan kamu sedang diproses. Cek status di halaman{" "}
              <strong>Lacak Pesanan</strong>.
            </p>
          </div>
          <div className="p-4 bg-custom-card border border-custom rounded-2xl text-left space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-custom-muted">No. Pesanan</span>
              <span className="font-bold text-custom-main">#PLM-2024-9921</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-custom-muted">Total Bayar</span>
              <span className="font-bold text-brand-primary">
                {formatPrice(total)}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <a
              href="/tracking"
              className="w-full py-3 rounded-xl bg-brand-primary text-white font-bold text-sm text-center hover:opacity-90"
            >
              Lacak Pesanan
            </a>
            <a
              href="/products"
              className="text-xs text-brand-primary hover:underline"
            >
              Lanjut Belanja
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-custom-sec">
      {/* Navbar */}
      <header className="bg-custom-card border-b border-custom sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          {/* Logo */}
          <a
            href="/"
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
              <a href="/shopcart">
                <button className="p-2 rounded-full hover:bg-custom-ter transition-colors cursor-pointer">
                  <ShoppingCart size={20} className="text-custom-muted" />
                </button>
              </a>
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
          <a href="/shopcart" className="hover:text-brand-primary">
            Keranjang
          </a>
          <ChevronRight size={12} />
          <span className="font-semibold text-custom-main">Pembayaran</span>
        </nav>

        <h1 className="text-2xl font-extrabold text-custom-main mb-6">
          Pembayaran
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column */}
          <div className="flex-1 space-y-4">
            {/* Shipping Address */}
            <div className="bg-custom-card border border-custom rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                    <MapPin size={15} className="text-brand-primary" />
                  </div>
                  <h2 className="text-sm font-bold text-custom-main">
                    Alamat Pengiriman
                  </h2>
                </div>
                <button className="text-xs font-semibold text-brand-primary hover:underline">
                  Ubah
                </button>
              </div>
              <div className="p-3 bg-custom-sec border border-custom rounded-xl">
                <p className="text-xs font-bold text-custom-main mb-1">
                  Rizky Ramadhan (+62 812-3456-7890)
                </p>
                <p className="text-xs text-custom-muted leading-relaxed">
                  Jl. Jenderal Sudirman No. 123, Kelurahan 20 Ilir D. IV,
                  Kecamatan Ilir Timur I, Kota Palembang, Sumatera Selatan,
                  30128
                </p>
              </div>
            </div>

            {/* Courier Selection */}
            <div className="bg-custom-card border border-custom rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                  <Truck size={15} className="text-brand-primary" />
                </div>
                <h2 className="text-sm font-bold text-custom-main">
                  Pilihan Pengiriman
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {COURIERS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCourier(c.id)}
                    className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                      selectedCourier === c.id
                        ? "border-brand-primary bg-teal-50"
                        : "border-custom bg-custom-ter hover:border-brand-primary/40"
                    }`}
                  >
                    {selectedCourier === c.id && (
                      <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-brand-primary flex items-center justify-center">
                        <Check size={10} className="text-white" />
                      </div>
                    )}
                    <div
                      className={`mb-2 ${selectedCourier === c.id ? "text-brand-primary" : "text-custom-muted"}`}
                    >
                      {c.icon}
                    </div>
                    <p
                      className={`text-xs font-bold ${selectedCourier === c.id ? "text-brand-primary" : "text-custom-main"}`}
                    >
                      {c.name}
                    </p>
                    <p className="text-[10px] text-custom-muted mb-1">
                      {c.estimate}
                    </p>
                    <p className="text-xs font-extrabold text-brand-primary">
                      {formatPrice(c.price)}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-custom-card border border-custom rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                  <CreditCard size={15} className="text-brand-primary" />
                </div>
                <h2 className="text-sm font-bold text-custom-main">
                  Metode Pembayaran
                </h2>
              </div>

              {/* QRIS */}
              <button
                onClick={() => setSelectedPayment("qris")}
                className={`w-full flex items-center justify-between p-4 rounded-xl border-2 mb-3 transition-all ${
                  selectedPayment === "qris"
                    ? "border-brand-primary bg-teal-50"
                    : "border-custom hover:border-brand-primary/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-custom-card rounded-xl border border-custom flex items-center justify-center">
                    <QrCode size={20} className="text-brand-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-custom-main">QRIS</p>
                    <p className="text-[10px] text-custom-muted">
                      OVO, Dana, ShopeePay, m-Banking
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-primary text-white">
                  Tercepat
                </span>
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Bank Transfer */}
                <button
                  onClick={() => setSelectedPayment("bank")}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedPayment === "bank"
                      ? "border-brand-primary bg-teal-50"
                      : "border-custom hover:border-brand-primary/40"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Building2
                      size={14}
                      className={
                        selectedPayment === "bank"
                          ? "text-brand-primary"
                          : "text-custom-muted"
                      }
                    />
                    <p className="text-xs font-bold text-custom-main">
                      Bank Transfer
                    </p>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {["BCA", "MANDIRI", "BNI"].map((b) => (
                      <span
                        key={b}
                        className="text-[9px] font-bold px-1.5 py-0.5 border border-custom rounded bg-custom-ter text-custom-muted"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </button>

                {/* E-Wallet */}
                <button
                  onClick={() => setSelectedPayment("ewallet")}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedPayment === "ewallet"
                      ? "border-brand-primary bg-teal-50"
                      : "border-custom hover:border-brand-primary/40"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Wallet
                      size={14}
                      className={
                        selectedPayment === "ewallet"
                          ? "text-brand-primary"
                          : "text-custom-muted"
                      }
                    />
                    <p className="text-xs font-bold text-custom-main">
                      E-Wallet
                    </p>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {["OVO", "DANA", "GOPAY"].map((e) => (
                      <span
                        key={e}
                        className="text-[9px] font-bold px-1.5 py-0.5 border border-custom rounded bg-custom-ter text-custom-muted"
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Summary */}
          <aside className="w-full lg:w-80 xl:w-96 flex-shrink-0">
            <div className="bg-custom-card border border-custom rounded-2xl p-5 shadow-sm sticky top-20 space-y-5">
              <h2 className="text-base font-extrabold text-custom-main">
                Ringkasan Belanja
              </h2>

              {/* Items */}
              <div className="space-y-3">
                {ORDER_ITEMS.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-custom-ter border border-custom flex-shrink-0">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-custom-main line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-custom-muted mt-0.5">
                        {item.qty} × {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-custom pt-4 space-y-2.5">
                <div className="flex justify-between text-xs">
                  <span className="text-custom-muted">
                    Subtotal ({ORDER_ITEMS.length} produk)
                  </span>
                  <span className="font-semibold text-custom-main">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-custom-muted">
                    Ongkos Kirim ({courier.name})
                  </span>
                  <span className="font-semibold text-custom-main">
                    {formatPrice(courier.price)}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-custom-muted">PPN 11%</span>
                  <span className="font-semibold text-custom-main">
                    {formatPrice(tax)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-custom pt-4">
                <span className="text-sm font-bold text-custom-main">
                  Total Bayar
                </span>
                <span className="text-xl font-extrabold text-brand-primary">
                  {formatPrice(total)}
                </span>
              </div>

              <button
                onClick={() => setOrderPlaced(true)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-primary text-white font-bold text-sm hover:opacity-90 active:scale-95 transition-all shadow-md shadow-teal-700/20"
              >
                <Lock size={15} />
                Bayar Sekarang
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-custom-muted">
                <Lock size={12} className="text-brand-primary" />
                Pembayaran Aman & Terenkripsi
              </div>

              {/* Trust banner */}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-3">
                <Award size={24} className="text-amber-600 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-amber-800">
                    Jaminan Produk Asli
                  </p>
                  <p className="text-[10px] text-amber-700 leading-snug">
                    Mendukung UMKM Lokal Palembang dengan kualitas ekspor
                    terjamin.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
