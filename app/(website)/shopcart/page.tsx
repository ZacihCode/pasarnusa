"use client";

import { useState } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Store,
  Trash2,
  Plus,
  Minus,
  Tag,
  ShieldCheck,
  ArrowRight,
  ShoppingBasket,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
// ─── Types ────────────────────────────────────────────────────────────────────

interface CartItem {
  id: number;
  name: string;
  variant: string;
  price: number;
  qty: number;
  img: string;
  checked: boolean;
  shopId: number;
}

interface Shop {
  id: number;
  name: string;
  checked: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const INITIAL_SHOPS: Shop[] = [
  { id: 1, name: "Toko Songket Cek Ipah", checked: true },
  { id: 2, name: "Pempek Haji Ali", checked: true },
];

const INITIAL_ITEMS: CartItem[] = [
  {
    id: 1,
    name: "Songket Limar Klasik Emas",
    variant: "Warna: Merah Maroon",
    price: 3500000,
    qty: 1,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOCehys3q01fBBMHKyqHFlMcNL5PyqEucpxXQ3es4odkrmc0yWdKI0Q6JSTm6Z4D0KcmqbOmA-uiq7gO34Oava-9JsXkRAvJdhdN5EBQKxGz1wVAj0VhKgnuFp-aWOvdP4puV1WdKEqVHAaODhtldtl5VJhM5KVOLQfeKgvLnTP5TmG7oXkd9PpTcqvS_q9E4ZJwsRbTlNzBQ3FpUxOPhojrqSUbT2UUjfLkiOgU1HWUjGK1Ni9J8jyB3UZEfCZriv2GGQ4lQxR0M",
    checked: true,
    shopId: 1,
  },
  {
    id: 2,
    name: "Paket Pempek Campur 50 Pcs",
    variant: "Variasi: Vacuum Sealed",
    price: 250000,
    qty: 1,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBe4bDCpHG3UONymWcMtOW_BqbeyeE1GNA9Hh2uJ4BO7XV5aU_SN5pS118H0bOZqW8H5tXuON169HgGEvWJC7Y-p73aJBkcvZ7YRgPQWBd_YRqeXWf66O8IgrAXH21SxvjVaf9qn6wRZc1Et3-UBapvgUck_B5TgG-LKBvArmJk2FhZ6SP15PZSNuwnYkFzUt132-Vroud1iGVLcesaQQ2EVEPxsxQ2pBH0lSlsaVHsnP7qubt1r7qKcINvG69DFqWrF4phf744Hf8",
    checked: true,
    shopId: 2,
  },
];

const formatPrice = (p: number) => `Rp ${p.toLocaleString("id-ID")}`;

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(INITIAL_ITEMS);
  const [shops, setShops] = useState<Shop[]>(INITIAL_SHOPS);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);

  // ── Helpers ────────────────────────────────────────────────────

  const updateQty = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleItem = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  const toggleShop = (shopId: number) => {
    const allChecked = items
      .filter((i) => i.shopId === shopId)
      .every((i) => i.checked);
    setItems((prev) =>
      prev.map((item) =>
        item.shopId === shopId ? { ...item, checked: !allChecked } : item,
      ),
    );
    setShops((prev) =>
      prev.map((s) => (s.id === shopId ? { ...s, checked: !allChecked } : s)),
    );
  };

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "UMKM10") {
      setPromoApplied(true);
      setPromoError(false);
    } else {
      setPromoError(true);
      setPromoApplied(false);
    }
  };

  // ── Calculations ────────────────────────────────────────────────

  const checkedItems = items.filter((i) => i.checked);
  const subtotal = checkedItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = checkedItems.length > 0 ? 45000 : 0;
  const discount = promoApplied ? Math.floor(subtotal * 0.1) : 0;
  const total = subtotal + shipping - discount;

  const shopIds = [...new Set(items.map((i) => i.shopId))];
  const isEmpty = items.length === 0;

  // ── Render ──────────────────────────────────────────────────────

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
            <button className="relative p-2 rounded-full hover:bg-custom-ter transition-colors">
              <ShoppingCart size={20} className="text-brand-primary" />
              {items.length > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-brand-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </button>
            <button className="p-2 rounded-full hover:bg-custom-ter transition-colors">
              <User size={20} className="text-custom-muted" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-custom-muted mb-6">
          <a href="#" className="hover:text-brand-primary transition-colors">
            Beranda
          </a>
          <ChevronRight size={12} />
          <span className="font-semibold text-custom-main">
            Keranjang Belanja
          </span>
        </nav>

        {isEmpty ? (
          /* ── Empty State ─────────────────────────────────────── */
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-5">
            <div className="w-28 h-28 rounded-full bg-custom-ter border border-custom flex items-center justify-center">
              <ShoppingBasket size={52} className="text-custom-muted" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-custom-main mb-2">
                Keranjang Kosong
              </h2>
              <p className="text-sm text-custom-muted">
                Jelajahi produk UMKM autentik Palembang dan mulai belanja!
              </p>
            </div>
            <a
              href="/products"
              className="px-6 py-3 rounded-xl bg-brand-primary text-white font-bold text-sm hover:opacity-90 active:scale-95 transition-all"
            >
              Mulai Belanja
            </a>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* ── Left: Cart Items ───────────────────────────────── */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-extrabold text-custom-main">
                  Keranjang Belanja
                </h1>
                <span className="text-sm text-custom-muted">
                  <span className="font-bold text-custom-main">
                    {checkedItems.length}
                  </span>{" "}
                  produk dipilih
                </span>
              </div>

              {shopIds.map((shopId) => {
                const shop = shops.find((s) => s.id === shopId)!;
                const shopItems = items.filter((i) => i.shopId === shopId);
                const allShopChecked = shopItems.every((i) => i.checked);

                return (
                  <div
                    key={shopId}
                    className="bg-custom-card border border-custom rounded-2xl overflow-hidden shadow-sm"
                  >
                    {/* Shop header */}
                    <div className="px-4 py-3 bg-custom-sec border-b border-custom flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={allShopChecked}
                        onChange={() => toggleShop(shopId)}
                        className="w-4 h-4 rounded accent-teal-600"
                      />
                      <div className="flex items-center gap-2">
                        <Store size={15} className="text-brand-primary" />
                        <span className="text-sm font-bold text-custom-main">
                          {shop.name}
                        </span>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="divide-y divide-custom">
                      {shopItems.map((item) => (
                        <div
                          key={item.id}
                          className={`p-4 flex flex-col sm:flex-row gap-4 transition-opacity ${
                            !item.checked ? "opacity-50" : ""
                          }`}
                        >
                          {/* Checkbox + Image */}
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={item.checked}
                              onChange={() => toggleItem(item.id)}
                              className="w-4 h-4 rounded accent-teal-600 flex-shrink-0"
                            />
                            <div className="w-24 h-24 rounded-xl overflow-hidden bg-custom-ter border border-custom flex-shrink-0">
                              <img
                                src={item.img}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>

                          {/* Info */}
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="text-sm font-bold text-custom-main leading-snug">
                                {item.name}
                              </h3>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="p-1.5 rounded-lg text-custom-muted hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                            <p className="text-xs text-custom-muted">
                              {item.variant}
                            </p>
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <span className="text-base font-extrabold text-brand-primary">
                                {formatPrice(item.price)}
                              </span>
                              {/* Qty controls */}
                              <div className="flex items-center border border-custom rounded-xl overflow-hidden">
                                <button
                                  onClick={() => updateQty(item.id, -1)}
                                  className="w-8 h-8 flex items-center justify-center hover:bg-custom-ter transition-colors text-custom-muted disabled:opacity-30"
                                  disabled={item.qty <= 1}
                                >
                                  <Minus size={13} />
                                </button>
                                <span className="w-9 text-center text-sm font-bold text-custom-main">
                                  {item.qty}
                                </span>
                                <button
                                  onClick={() => updateQty(item.id, 1)}
                                  className="w-8 h-8 flex items-center justify-center hover:bg-custom-ter transition-colors text-custom-muted"
                                >
                                  <Plus size={13} />
                                </button>
                              </div>
                            </div>
                            {/* Subtotal per item */}
                            {item.qty > 1 && (
                              <p className="text-[11px] text-custom-muted">
                                Subtotal:{" "}
                                <span className="font-semibold text-brand-primary">
                                  {formatPrice(item.price * item.qty)}
                                </span>
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Right: Order Summary ───────────────────────────── */}
            <aside className="w-full lg:w-80 xl:w-96 flex-shrink-0">
              <div className="bg-custom-card border border-custom rounded-2xl p-5 sticky top-20 space-y-5 shadow-sm">
                <h2 className="text-base font-extrabold text-custom-main">
                  Ringkasan Pesanan
                </h2>

                {/* Promo Code */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-custom-muted">
                    Kode Promo
                  </label>
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <Tag
                        size={13}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-custom-muted"
                      />
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => {
                          setPromoCode(e.target.value.toUpperCase());
                          setPromoError(false);
                        }}
                        placeholder="Contoh: UMKM10"
                        className={`w-full pl-8 pr-3 py-2 text-xs rounded-xl border focus:outline-none transition-colors ${
                          promoError
                            ? "border-red-400 bg-red-50 focus:border-red-400"
                            : promoApplied
                              ? "border-green-400 bg-green-50"
                              : "border-custom bg-custom-ter focus:border-brand-primary"
                        }`}
                      />
                    </div>
                    <button
                      onClick={applyPromo}
                      disabled={!promoCode}
                      className="px-3 py-2 rounded-xl bg-brand-primary text-white text-xs font-bold hover:opacity-90 disabled:opacity-40 transition-all"
                    >
                      Pakai
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-[11px] text-green-600 font-semibold flex items-center gap-1">
                      ✓ Promo UMKM10 berhasil — hemat 10%
                    </p>
                  )}
                  {promoError && (
                    <p className="text-[11px] text-red-500">
                      Kode promo tidak valid atau sudah kadaluarsa.
                    </p>
                  )}
                </div>

                {/* Price breakdown */}
                <div className="space-y-3 border-t border-b border-custom py-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-custom-muted">
                      Subtotal ({checkedItems.length} produk)
                    </span>
                    <span className="font-semibold text-custom-main">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-custom-muted">
                      Estimasi Pengiriman
                    </span>
                    <span className="font-semibold text-custom-main">
                      {shipping > 0 ? formatPrice(shipping) : "-"}
                    </span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-sm">
                      <span className="text-custom-muted">Diskon Promo</span>
                      <span className="font-semibold text-green-600">
                        -{formatPrice(discount)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-custom-main">
                    Total
                  </span>
                  <span className="text-xl font-extrabold text-brand-primary">
                    {formatPrice(total)}
                  </span>
                </div>

                {/* Checkout button */}
                <a href="/checkout">
                  <button
                    disabled={checkedItems.length === 0}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-primary text-white font-bold text-sm hover:opacity-90 active:scale-95 transition-all shadow-md shadow-teal-700/20 disabled:opacity-40 disabled:pointer-events-none"
                  >
                    Lanjut ke Checkout
                    <ArrowRight size={16} />
                  </button>
                </a>

                {/* Security badge */}
                <div className="flex items-center justify-center gap-2 text-xs text-custom-muted">
                  <ShieldCheck size={14} className="text-brand-primary" />
                  Pembayaran Aman & Terenkripsi
                </div>

                {/* Continue shopping */}
                <a
                  href="/products"
                  className="block text-center text-xs text-brand-primary hover:underline font-semibold"
                >
                  ← Lanjut Belanja
                </a>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
