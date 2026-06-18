"use client";

import { useState } from "react";
import {
  ShoppingCart,
  User,
  ChevronRight,
  Truck,
  Package,
  PackageCheck,
  ClipboardCheck,
  ShoppingBag,
  Headphones,
  HelpCircle,
  ArrowRight,
  MapPin,
  Plus,
  Minus,
  Search,
} from "lucide-react";
import Image from "next/image";
// ─── Types ────────────────────────────────────────────────────────────────────

interface TrackingStep {
  id: number;
  label: string;
  time: string;
  desc?: string;
  icon: React.ReactNode;
  done: boolean;
  active?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STEPS: TrackingStep[] = [
  {
    id: 1,
    label: "Dalam Perjalanan",
    time: "16 Agu 2024, 09:15",
    desc: "Kurir sedang menuju alamat Anda (Area Bukit Besar, Palembang).",
    icon: <Truck size={16} />,
    done: true,
    active: true,
  },
  {
    id: 2,
    label: "Pesanan Dikirim",
    time: "15 Agu 2024, 14:30",
    desc: "Paket telah diserahkan ke pihak ekspedisi di Hub Palembang Timur.",
    icon: <Package size={16} />,
    done: true,
  },
  {
    id: 3,
    label: "Pesanan Dikemas",
    time: "15 Agu 2024, 08:00",
    desc: "Penjual (Griya Songket Palembang) sedang mengemas pesanan Anda.",
    icon: <PackageCheck size={16} />,
    done: true,
  },
  {
    id: 4,
    label: "Pesanan Diproses",
    time: "14 Agu 2024, 20:10",
    icon: <ClipboardCheck size={16} />,
    done: true,
  },
  {
    id: 5,
    label: "Pesanan Berhasil",
    time: "14 Agu 2024, 19:45",
    icon: <ShoppingBag size={16} />,
    done: true,
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TrackingPage() {
  const [mapZoom, setMapZoom] = useState(1);

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
        {/* Breadcrumb + Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <nav className="flex items-center gap-1 text-xs text-custom-muted mb-2">
              <a href="/" className="hover:text-brand-primary">
                Beranda
              </a>
              <ChevronRight size={12} />
              <a href="#" className="hover:text-brand-primary">
                Pesanan Saya
              </a>
              <ChevronRight size={12} />
              <span className="font-semibold text-custom-main">
                Lacak Pesanan
              </span>
            </nav>
            <h1 className="text-2xl font-extrabold text-custom-main">
              Lacak Pesanan
            </h1>
            <p className="text-sm text-custom-muted mt-1">
              Pesanan #PLM-202488190
            </p>
          </div>
          <div className="bg-custom-card border border-custom rounded-2xl p-4 space-y-2 shadow-sm">
            <div className="flex justify-between gap-10 text-xs">
              <span className="text-custom-muted">Tanggal Pesanan</span>
              <span className="font-bold text-custom-main">
                14 Agustus 2024
              </span>
            </div>
            <div className="flex justify-between gap-10 text-xs">
              <span className="text-custom-muted">Total Pembayaran</span>
              <span className="font-bold text-brand-primary">Rp 450.000</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left: Timeline */}
          <div className="lg:col-span-4 bg-custom-card border border-custom rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-extrabold text-custom-main mb-6">
              Status Pengiriman
            </h3>
            <div className="relative">
              {STEPS.map((step, i) => (
                <div
                  key={step.id}
                  className="relative flex gap-4 pb-6 last:pb-0"
                >
                  {/* Line */}
                  {i < STEPS.length - 1 && (
                    <div className="absolute left-4 top-8 w-0.5 h-full bg-brand-primary/30" />
                  )}
                  {/* Icon */}
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 z-10 ${
                      step.active
                        ? "bg-brand-primary text-white shadow-md shadow-teal-700/20"
                        : step.done
                          ? "bg-brand-primary/10 text-brand-primary border border-brand-primary/20"
                          : "bg-custom-ter text-custom-muted border border-custom"
                    }`}
                  >
                    {step.icon}
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs font-bold ${step.active ? "text-brand-primary" : "text-custom-main"}`}
                    >
                      {step.label}
                    </p>
                    <p className="text-[10px] text-custom-muted mt-0.5">
                      {step.time}
                    </p>
                    {step.desc && (
                      <div
                        className={`mt-2 p-3 rounded-xl text-[11px] leading-relaxed ${
                          step.active
                            ? "bg-teal-50 border border-teal-200 text-teal-800"
                            : "bg-custom-sec text-custom-muted"
                        }`}
                      >
                        {step.desc}
                        {step.active && (
                          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-teal-200">
                            <div className="w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center">
                              <User size={11} className="text-brand-primary" />
                            </div>
                            <div>
                              <p className="font-bold text-teal-900 text-[10px]">
                                M. Rizky (Kurir Ampera Express)
                              </p>
                              <p className="text-teal-700 text-[9px]">
                                ID: AMP-9921
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Map + Actions */}
          <div className="lg:col-span-8 space-y-4">
            {/* Map */}
            <div className="bg-custom-card border border-custom rounded-2xl overflow-hidden shadow-sm">
              <div className="px-4 py-3 border-b border-custom flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-brand-primary" />
                  <span className="text-xs font-bold text-custom-main">
                    Lokasi Terkini: Ampera, Palembang
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-teal-50 text-brand-primary border border-teal-200 animate-pulse">
                  LIVE TRACKING
                </span>
              </div>
              <div className="relative h-72 bg-custom-ter overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbQhBXrjjYzaT-oD6dbghWAovTL1LQd9zCVgaXEZ34-jaZZNWvdBX4YXkt-Y-T0f_MNwxs-4mZsZ3SG2yXoxIuYASqa-ktt2hRVinCmneWNqzaHz0myKKPMPVbKm6cdVW61gMIl1wQGhBClutSOwKEj0DoEhYBgHPTbAPPml4t6vsgewbg4xbRyxRsZantyItdqKI-4m-AnSX2BBzQ0qmmmEB22b4y8rdfMovxmt1PsjIzzUrOw8yIlMOXoQNCBjsLvPw8t5_ddcA"
                  alt="Map"
                  className="w-full h-full object-cover opacity-80 transition-transform duration-500"
                  style={{ transform: `scale(${mapZoom})` }}
                />
                {/* Courier marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="bg-white px-2 py-1 rounded-lg shadow-lg border border-brand-primary mb-1">
                    <p className="text-[9px] font-bold text-brand-primary whitespace-nowrap">
                      Kurir Anda di Sini
                    </p>
                  </div>
                  <div className="relative">
                    <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center shadow-xl z-10">
                      <Truck size={18} className="text-white" />
                    </div>
                    <div className="absolute inset-0 bg-brand-primary/30 rounded-full animate-ping" />
                  </div>
                </div>
                {/* Zoom controls */}
                <div className="absolute bottom-3 right-3 flex flex-col gap-1">
                  <button
                    onClick={() => setMapZoom((z) => Math.min(2, z + 0.2))}
                    className="w-8 h-8 bg-white rounded-lg border border-custom flex items-center justify-center shadow-sm hover:bg-custom-ter transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                  <button
                    onClick={() => setMapZoom((z) => Math.max(1, z - 0.2))}
                    className="w-8 h-8 bg-white rounded-lg border border-custom flex items-center justify-center shadow-sm hover:bg-custom-ter transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Support cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Headphones,
                  title: "Butuh Bantuan?",
                  desc: "Tanyakan kendala pengiriman atau produk kepada tim support kami.",
                  link: "Hubungi Support",
                  color: "bg-brand-primary/10 text-brand-primary",
                  linkColor: "text-brand-primary",
                },
                {
                  icon: HelpCircle,
                  title: "Pusat Bantuan",
                  desc: "Baca syarat pengembalian, kebijakan garansi, dan FAQ kami.",
                  link: "Buka FAQ",
                  color: "bg-orange-100 text-orange-600",
                  linkColor: "text-orange-600",
                },
              ].map(({ icon: Icon, title, desc, link, color, linkColor }) => (
                <div
                  key={title}
                  className="bg-custom-card border border-custom rounded-2xl p-5 shadow-sm hover:border-brand-primary transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-custom-main mb-1">
                        {title}
                      </h4>
                      <p className="text-xs text-custom-muted leading-relaxed mb-3">
                        {desc}
                      </p>
                      <a
                        href="#"
                        className={`text-xs font-semibold flex items-center gap-1 ${linkColor}`}
                      >
                        {link} <ArrowRight size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Summary */}
        <div className="mt-6 bg-custom-card border border-custom rounded-2xl p-5 shadow-sm">
          <h3 className="text-base font-extrabold text-custom-main mb-4">
            Ringkasan Produk
          </h3>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-24 h-24 rounded-xl overflow-hidden border border-custom flex-shrink-0">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDB3oZvus2CB1YwpcaYA-wJK3IEAQhQLlohkyQNPJGcU2lIsc_F0jQKiQjOImAbbKKj-iAP2XFycGoOx3-z7FdEnYLbD2Tkc_Mv7QdHZpQJaK6VzU9xovIEc84bRPHFinhJ0uPpuEG4Yta9_eC0Lk2BzDc8ZHl1dY5_d_GPENH50dejdRcDk12cwEMLTXcoYCTgD6aqv3njkVjhEBae1nzhMhD597-V_SyMMkhQKaDdzlTKKDWtewKlUAbL0rT6TCRVZ0Io380dXtg"
                alt="Produk"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-custom-main">
                Kain Songket Lepus Kristal Palembang
              </p>
              <p className="text-xs text-custom-muted mt-1">
                Warna: Hijau Emas | Ukuran: 2m × 1.1m
              </p>
              <div className="flex gap-2 mt-2">
                {["PREMIUM", "AUTHENTIC"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-[10px] text-custom-muted">
                Subtotal (1 Barang)
              </p>
              <p className="text-lg font-extrabold text-brand-primary">
                Rp 450.000
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
