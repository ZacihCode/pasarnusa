"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Image from "next/image";
import {
  LayoutDashboard,
  Store,
  ShoppingBag,
  Sparkles,
  Settings,
  ShieldCheck,
  BarChart3,
  Megaphone,
  LogOut,
  Sun,
  Moon,
  Bell,
  Search,
  Menu,
  X,
  ChevronRight,
  User,
  MapPin,
  LineChart,
} from "lucide-react";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ComponentType<any>;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine current context (seller vs pemkot) based on route
  const isSeller = pathname?.includes("/seller");
  const currentRole = isSeller ? "seller" : "pemkot";

  const sellerNav: SidebarItem[] = [
    { label: "Ringkasan", href: "/seller", icon: LayoutDashboard },
    { label: "Produk Saya", href: "/seller/produk", icon: Store },
    { label: "Pesanan", href: "/seller/pesanan", icon: ShoppingBag },
    { label: "Laporan Penjualan", href: "/seller/laporan", icon: LineChart },
    { label: "Insight AI", href: "/seller/insight", icon: Sparkles },
    { label: "Pengaturan", href: "/seller/pengaturan", icon: Settings },
  ];

  const pemkotNav: SidebarItem[] = [
    { label: "Ringkasan", href: "/pemkot", icon: LayoutDashboard },
    { label: "Verifikasi UMKM", href: "/pemkot/verifikasi", icon: ShieldCheck },
    { label: "Statistik Wilayah", href: "/pemkot/statistik", icon: BarChart3 },
    { label: "SiWilayah (Peta UMKM)", href: "/pemkot/silayah", icon: MapPin },
    { label: "Promosi & Event", href: "/pemkot/event", icon: Megaphone },
    { label: "Kebijakan", href: "/pemkot/kebijakan", icon: Settings },
  ];

  const currentNav = isSeller ? sellerNav : pemkotNav;

  const handleRoleToggle = () => {
    if (isSeller) {
      router.push("/pemkot");
    } else {
      router.push("/seller");
    }
  };

  return (
    <div className="min-h-screen bg-custom-sec text-custom-main flex">
      {/* ==========================================
         SIDEBAR - DESKTOP & MOBILE WRAPPER
         ========================================== */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-custom-card border-r border-custom flex flex-col justify-between transition-transform duration-300 md:translate-x-0 md:static ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div>
          <div className="h-16 px-6 flex items-center justify-between border-b border-custom">
            <Link href="/" className="flex items-center gap-2 font-medium">
              <div className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center overflow-hidden">
                <Image
                  src="https://cdn.aceimg.com/W6DtV9UeS.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-bold tracking-tight">
                Pasar<span className="text-brand-primary">Nusantara</span>
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1.5 rounded-lg hover:bg-custom-ter text-custom-muted"
            >
              <X size={18} />
            </button>
          </div>

          {/* Sidebar Nav Items */}
          <nav className="p-4 space-y-1">
            {currentNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-brand-primary text-white shadow-md shadow-teal-700/10"
                      : "text-custom-muted hover:text-custom-main hover:bg-custom-ter"
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                  {isActive && <ChevronRight size={14} className="ml-auto" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-custom space-y-3">
          {/* User Profile Card */}
          <div className="flex items-center gap-3 p-2 rounded-xl bg-custom-ter/45">
            <div className="w-8 h-8 rounded-full bg-brand-primary/20 text-brand-primary flex items-center justify-center font-bold text-sm">
              {isSeller ? "S" : "P"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-custom-main truncate">
                {isSeller ? "Pempek Bu Yanti" : "Admin Dinas Koperasi"}
              </p>
              <p className="text-[10px] text-custom-muted truncate">
                {isSeller ? "Kec. Ilir Barat I" : "NIP. 19890412..."}
              </p>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex gap-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border border-custom bg-custom-ter hover:bg-custom-card transition text-xs font-semibold text-custom-muted hover:text-custom-main"
              >
                {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                <span>Tema</span>
              </button>
            )}
            <Link
              href="/"
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 dark:border-red-950 dark:bg-red-950/20 text-red-600 hover:text-red-700 transition text-xs font-semibold"
            >
              <LogOut size={14} />
              <span>Keluar</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile sidebar */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
        />
      )}

      {/* ==========================================
         MAIN AREA: TOPBAR & CONTENT
         ========================================== */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Topbar Header */}
        <header className="h-16 px-4 sm:px-6 bg-custom-card border-b border-custom flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-custom-ter text-custom-muted"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-base font-bold text-custom-main">
              {isSeller ? "Dashboard Seller" : "Dashboard Pemkot"}
            </h1>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Search Bar Desktop */}
            <div className="hidden sm:relative sm:block">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-custom-muted">
                <Search size={14} />
              </span>
              <input
                type="text"
                placeholder="Cari transaksi, produk, dll..."
                className="pl-9 pr-4 py-1.5 w-60 rounded-full border border-custom bg-custom-ter focus:outline-none focus:border-brand-primary text-xs transition"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-full border border-custom hover:bg-custom-ter text-custom-muted transition">
              <Bell size={15} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
            </button>

            {/* User Info Quick Dropdown Mock */}
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-full border border-custom bg-custom-ter overflow-hidden flex items-center justify-center text-custom-muted">
                <User size={16} />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content Page */}
        <main className="p-4 sm:p-6 flex-grow overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
