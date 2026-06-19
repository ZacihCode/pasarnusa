"use client";

import { useState } from "react";
import {
  TrendingUp,
  Package,
  ShoppingBag,
  Sparkles,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Filter,
  DollarSign,
  AlertCircle,
  HelpCircle,
  FileText,
  X,
  MapPin,
  Navigation,
} from "lucide-react";
import dynamic from "next/dynamic";

const UMKMMap = dynamic(() => import("@/components/UMKMMap"), { ssr: false });

const SELLER_MAP_POINTS = [
  {
    id: "toko-anda",
    name: "Toko Anda (Pempek Bu Yanti)",
    owner: "Yanti Rahayu",
    category: "Kuliner" as const,
    kecamatan: "Ilir Barat I" as const,
    address: "Jl. Bukit Besar No. 45, Bukit Lama, Kec. Ilir Barat I",
    phone: "0812-3456-7890",
    lat: -2.9904,
    lng: 104.7262,
  },
  {
    id: "sebaran-su1",
    name: "Sebaran: Seberang Ulu I (25% Pesanan)",
    owner: "Pelanggan",
    category: "Kerajinan" as const,
    kecamatan: "Seberang Ulu I" as const,
    address: "Area Distribusi Seberang Ulu I - 120 Transaksi",
    phone: "",
    lat: -3.0032,
    lng: 104.7645,
  },
  {
    id: "sebaran-sukarami",
    name: "Sebaran: Sukarami (10% Pesanan)",
    owner: "Pelanggan",
    category: "Fashion & Batik" as const,
    kecamatan: "Sukarami" as const,
    address: "Area Distribusi Sukarami - 48 Transaksi",
    phone: "",
    lat: -2.9234,
    lng: 104.7182,
  },
  {
    id: "sebaran-jakabaring",
    name: "Sebaran: Jakabaring (20% Pesanan)",
    owner: "Pelanggan",
    category: "Kuliner" as const,
    kecamatan: "Jakabaring" as const,
    address: "Area Distribusi Jakabaring - 95 Transaksi",
    phone: "",
    lat: -3.0189,
    lng: 104.7924,
  }
];

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sales: number;
  status: "verified" | "pending" | "rejected";
  aiScore: number;
}

export default function SellerDashboard() {
  const [selectedDistrict, setSelectedDistrict] = useState<string>("Semua");
  const [categoryFilter, setCategoryFilter] = useState<string>("Semua");
  const [searchQueryMap, setSearchQueryMap] = useState("");
  const [selectedUMKM, setSelectedUMKM] = useState<any | null>(null);

  const [products, setProducts] = useState<Product[]>([
    {
      id: "prod-1",
      name: "Pempek Kapal Selam Asli Belida (Isi 10)",
      category: "Kuliner",
      price: 150000,
      stock: 45,
      sales: 124,
      status: "verified",
      aiScore: 98,
    },
    {
      id: "prod-2",
      name: "Kain Songket Palembang Motif Lepus Emas",
      category: "Fashion & Batik",
      price: 2400000,
      stock: 5,
      sales: 12,
      status: "verified",
      aiScore: 95,
    },
    {
      id: "prod-3",
      name: "Kemplang Panggang Khas Palembang (500gr)",
      category: "Kuliner",
      price: 45000,
      stock: 120,
      sales: 340,
      status: "verified",
      aiScore: 92,
    },
    {
      id: "prod-4",
      name: "Ukiran Kayu Khas Palembang Motif Bunga Melati",
      category: "Kerajinan",
      price: 750000,
      stock: 3,
      sales: 2,
      status: "pending",
      aiScore: 89,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Kuliner",
    price: "",
    stock: "",
    description: "",
  });
  const [aiGenerating, setAiGenerating] = useState(false);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const prod: Product = {
      id: `prod-${products.length + 1}`,
      name: newProduct.name,
      category: newProduct.category,
      price: Number(newProduct.price) || 0,
      stock: Number(newProduct.stock) || 0,
      sales: 0,
      status: "pending",
      aiScore: 85 + Math.floor(Math.random() * 15),
    };
    setProducts([prod, ...products]);
    setNewProduct({
      name: "",
      category: "Kuliner",
      price: "",
      stock: "",
      description: "",
    });
    setShowAddModal(false);
  };

  const generateAIDescription = () => {
    if (!newProduct.name) return;
    setAiGenerating(true);
    setTimeout(() => {
      setNewProduct((prev) => ({
        ...prev,
        description: `Produk asli ${prev.name} premium diolah menggunakan bahan berkualitas tinggi secara higienis. Memiliki rasa otentik dan dikemas dengan rapi untuk menjaga kualitas rasa khas Nusantara. Sangat cocok dijadikan oleh-oleh atau dinikmati bersama keluarga tercinta. (Rekomendasi kata kunci: Kuliner Khas, Produk Lokal Terbaik, UMKM Palembang)`,
      }));
      setAiGenerating(false);
    }, 1500);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative p-6 rounded-2xl overflow-hidden bg-gradient-to-r from-emerald-800 to-teal-600 dark:from-emerald-950 dark:to-teal-850 text-white shadow-lg">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider">
              Toko Terverifikasi AI
            </span>
            <h2 className="text-xl sm:text-2xl font-black mt-2">
              Halo, Pempek Bu Yanti!
            </h2>
            <p className="text-white/80 text-xs mt-1 max-w-lg">
              Toko Anda memiliki skor verifikasi AI sebesar{" "}
              <strong>96%</strong>. Tingkatkan deskripsi dan kualitas produk Anda
              untuk mendapatkan eksposur lebih besar dari Pemkot.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="self-start md:self-center px-4 py-2.5 bg-white text-emerald-800 dark:bg-zinc-900 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-zinc-800 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md"
          >
            <Plus size={15} />
            Tambah Produk Baru
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Omzet",
            value: "Rp 12.450.000",
            trend: "+14.2%",
            icon: DollarSign,
            color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20",
          },
          {
            label: "Produk Terjual",
            value: "478 Pcs",
            trend: "+8.3%",
            icon: ShoppingBag,
            color: "text-blue-600 bg-blue-50 dark:bg-blue-950/20",
          },
          {
            label: "Skor Kualitas AI",
            value: "96.4 / 100",
            trend: "Sangat Baik",
            icon: Sparkles,
            color: "text-amber-600 bg-amber-50 dark:bg-amber-950/20",
          },
          {
            label: "Menunggu Verifikasi",
            value: "1 Produk",
            trend: "Dalam antrean",
            icon: Clock,
            color: "text-purple-600 bg-purple-50 dark:bg-purple-950/20",
          },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-custom-card border border-custom p-5 rounded-2xl shadow-xs flex items-center justify-between"
            >
              <div className="space-y-1">
                <p className="text-[11px] font-semibold text-custom-muted">
                  {stat.label}
                </p>
                <p className="text-lg font-black text-custom-main">
                  {stat.value}
                </p>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-bold text-emerald-600">
                    {stat.trend}
                  </span>
                </div>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                <Icon size={18} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics & AI Insights Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Trend Chart (SVG Layout) */}
        <div className="lg:col-span-2 bg-custom-card border border-custom p-5 rounded-2xl shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-custom-main">
                Grafik Penjualan Mingguan
              </h3>
              <p className="text-[10px] text-custom-muted">
                Performa penjualan 7 hari terakhir
              </p>
            </div>
            <select className="px-3 py-1.5 rounded-lg border border-custom bg-custom-ter text-[10px] font-semibold">
              <option>Minggu Ini</option>
              <option>Bulan Ini</option>
            </select>
          </div>

          {/* SVG Sparkline / Bar chart mockup */}
          <div className="h-48 w-full flex items-end justify-between pt-6 px-2">
            {[
              { day: "Sen", value: 30 },
              { day: "Sel", value: 45 },
              { day: "Rab", value: 20 },
              { day: "Kam", value: 65 },
              { day: "Jum", value: 55 },
              { day: "Sab", value: 90 },
              { day: "Min", value: 80 },
            ].map((bar, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 group flex-1"
              >
                <div className="relative w-7 sm:w-10 bg-custom-ter hover:bg-teal-50 dark:hover:bg-zinc-800 rounded-lg h-36 flex items-end justify-center overflow-hidden">
                  <div
                    style={{ height: `${bar.value}%` }}
                    className="w-full bg-brand-primary rounded-t-md transition-all duration-500 group-hover:bg-brand-secondary"
                  />
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-1 scale-0 group-hover:scale-100 bg-zinc-900 text-white text-[9px] px-2 py-0.5 rounded-md font-bold transition-all duration-150 z-10">
                    {bar.value} Pcs
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-custom-muted">
                  {bar.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Marketing Agent Insights */}
        <div className="bg-custom-card border border-custom p-5 rounded-2xl shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-brand-primary">
              <Sparkles size={16} />
              <h3 className="text-sm font-bold text-custom-main">
                Rekomendasi AI Marketing
              </h3>
            </div>
            <p className="text-[10px] text-custom-muted mt-1 leading-relaxed">
              Strategi berbasis tren data pencarian di Palembang
            </p>
          </div>

          <div className="space-y-3 flex-1 py-2">
            {[
              {
                title: "Tren Kemplang Panggang Meningkat",
                desc: "Pencarian Kemplang di wilayah Jakabaring melonjak 35% karena event olahraga besok. Naikkan stok Anda.",
                type: "alert",
              },
              {
                title: "Optimasi Judul Produk Kain",
                desc: "AI mendeteksi kata kunci 'Koleksi Lebaran' pada produk Songket akan meningkatkan klik sebesar 20%.",
                type: "action",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border border-custom bg-custom-ter/40 space-y-1"
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent inline-block" />
                  <p className="text-xs font-bold text-custom-main">
                    {item.title}
                  </p>
                </div>
                <p className="text-[10px] text-custom-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <button className="w-full py-2 rounded-xl bg-brand-primary/10 hover:bg-brand-primary hover:text-white text-brand-primary text-xs font-bold transition flex items-center justify-center gap-1.5">
            <Sparkles size={13} />
            Buat Promosi AI Sekarang
          </button>
        </div>
      </div>

      {/* Lokasi Penjualan & Distribusi Toko (Map Section) */}
      <div className="bg-custom-card border border-custom p-6 rounded-2xl shadow-xs space-y-4">
        <div>
          <h3 className="text-sm font-bold text-custom-main flex items-center gap-1.5">
            <MapPin size={16} className="text-brand-primary" />
            Lokasi Penjualan & Jangkauan Distribusi UMKM
          </h3>
          <p className="text-[10px] text-custom-muted">
            Memantau lokasi fisik usaha Anda serta wilayah sebaran pembeli produk Anda di Palembang
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Leaflet Map */}
          <div className="lg:col-span-2 relative h-64 border border-custom bg-custom-ter/30 rounded-2xl overflow-hidden shadow-sm">
            <UMKMMap
              umkmList={SELLER_MAP_POINTS}
              selectedUMKM={selectedUMKM}
              onSelectUMKM={setSelectedUMKM}
              selectedDistrict={selectedDistrict}
              onSelectDistrict={setSelectedDistrict}
              categoryFilter={categoryFilter}
              searchQuery={searchQueryMap}
              hideHomeMarker={true}
            />
          </div>

          {/* Regional Sales details */}
          <div className="bg-custom-card border border-custom p-4 rounded-2xl shadow-xs space-y-4 text-xs flex flex-col justify-between">
            <div className="space-y-3">
              <h4 className="font-bold text-custom-main flex items-center gap-1.5">
                <Navigation size={13} className="text-brand-primary" />
                Detail Wilayah Operasional
              </h4>
              <div className="p-3 bg-custom-ter/50 border border-custom rounded-xl space-y-1">
                <p className="text-[10px] text-custom-muted uppercase font-bold tracking-wider">Kecamatan Asal Toko</p>
                <p className="font-bold text-sm text-custom-main">Kec. Ilir Barat I</p>
                <p className="text-[10px] text-custom-muted leading-relaxed">
                  Semua transaksi penjualan Anda dikirim dari lokasi ini. Anda terdaftar sebagai pelaku usaha binaan kecamatan setempat.
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-[10px] text-custom-muted uppercase tracking-wider">Sebaran Wilayah Pembeli</p>
                {[
                  { name: "Ilir Barat I (Lokal)", val: "45%", count: "215 Transaksi" },
                  { name: "Seberang Ulu I", val: "25%", count: "120 Transaksi" },
                  { name: "Jakabaring", val: "20%", count: "95 Transaksi" },
                  { name: "Sukarami", val: "10%", count: "48 Transaksi" },
                ].map((reg, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[11px] font-semibold border-b border-custom pb-1.5 last:border-b-0 last:pb-0">
                    <span className="text-custom-main">{reg.name}</span>
                    <div className="text-right">
                      <span className="text-brand-primary">{reg.val}</span>
                      <span className="text-[9px] text-custom-muted font-normal block">{reg.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full py-2 bg-brand-primary text-white font-bold rounded-xl hover:opacity-90 transition shadow-sm text-xs shadow-teal-700/10">
              Perbarui Lokasi Operasional
            </button>
          </div>
        </div>
      </div>

      {/* Inventory Management Table */}
      <div className="bg-custom-card border border-custom rounded-2xl shadow-xs overflow-hidden">
        {/* Header Table */}
        <div className="p-5 border-b border-custom flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-custom-ter/15">
          <div>
            <h3 className="text-sm font-bold text-custom-main">
              Katalog Produk Toko
            </h3>
            <p className="text-[10px] text-custom-muted">
              Kelola stok, verifikasi, dan performa katalog Anda
            </p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-custom-muted">
                <Search size={13} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari produk..."
                className="pl-9 pr-3 py-1.5 text-xs rounded-xl border border-custom bg-custom-ter focus:outline-none focus:border-brand-primary w-full sm:w-48 transition"
              />
            </div>
            <button className="p-2 rounded-xl border border-custom bg-custom-ter hover:bg-custom-card text-custom-muted hover:text-custom-main transition">
              <Filter size={13} />
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-custom bg-custom-ter/30 text-[10px] uppercase font-bold text-custom-muted">
                <th className="px-6 py-3.5">Nama Produk</th>
                <th className="px-6 py-3.5">Kategori</th>
                <th className="px-6 py-3.5">Harga</th>
                <th className="px-6 py-3.5">Stok</th>
                <th className="px-6 py-3.5">Terjual</th>
                <th className="px-6 py-3.5">Verifikasi</th>
                <th className="px-6 py-3.5">Akurasi AI</th>
                <th className="px-6 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-custom text-xs">
              {filteredProducts.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-custom-ter/10 transition-colors"
                >
                  <td className="px-6 py-4 font-bold text-custom-main max-w-xs truncate">
                    {p.name}
                  </td>
                  <td className="px-6 py-4 text-custom-muted">{p.category}</td>
                  <td className="px-6 py-4 font-semibold">
                    Rp {p.price.toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-4 text-custom-muted">{p.stock} pcs</td>
                  <td className="px-6 py-4 font-medium">{p.sales} pcs</td>
                  <td className="px-6 py-4">
                    {p.status === "verified" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600">
                        <CheckCircle size={10} />
                        Aktif
                      </span>
                    ) : p.status === "pending" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/20 text-amber-600">
                        <Clock size={10} />
                        Verifikasi
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-50 dark:bg-red-950/20 text-red-600">
                        <AlertCircle size={10} />
                        Ditolak
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-12 bg-custom-ter rounded-full h-1.5 overflow-hidden">
                        <div
                          style={{ width: `${p.aiScore}%` }}
                          className={`h-full rounded-full ${p.aiScore > 90 ? "bg-emerald-500" : "bg-brand-accent"}`}
                        />
                      </div>
                      <span className="font-bold text-custom-main">{p.aiScore}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 rounded-lg border border-custom bg-custom-ter hover:bg-custom-card text-custom-muted hover:text-custom-main transition">
                        <Edit size={12} />
                      </button>
                      <button className="p-1.5 rounded-lg border border-custom bg-custom-ter hover:bg-red-50 dark:hover:bg-red-950/20 text-custom-muted hover:text-red-600 transition">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ==========================================
         MODAL: TAMBAH PRODUK BARU
         ========================================== */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-custom-card border border-custom rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-custom flex items-center justify-between">
              <h3 className="text-sm font-bold text-custom-main flex items-center gap-2">
                <Plus size={16} className="text-brand-primary" />
                Tambah Produk UMKM
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg hover:bg-custom-ter text-custom-muted"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleAddProduct} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-semibold text-custom-muted">
                    Nama Produk <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="cth. Pempek Kulit Crispy"
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-custom bg-custom-ter focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-semibold text-custom-muted">
                    Kategori <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, category: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-custom bg-custom-ter focus:outline-none focus:border-brand-primary"
                  >
                    <option>Kuliner</option>
                    <option>Fashion & Batik</option>
                    <option>Kerajinan</option>
                    <option>Seni & Budaya</option>
                    <option>Pertanian</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-semibold text-custom-muted">
                    Harga (Rupiah) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="cth. 35000"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-custom bg-custom-ter focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-semibold text-custom-muted">
                    Stok Awal <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="cth. 50"
                    value={newProduct.stock}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, stock: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-custom bg-custom-ter focus:outline-none focus:border-brand-primary"
                  />
                </div>
              </div>

              {/* Description Input + AI assist */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block font-semibold text-custom-muted">
                    Deskripsi Produk
                  </label>
                  <button
                    type="button"
                    onClick={generateAIDescription}
                    disabled={!newProduct.name || aiGenerating}
                    className="px-2.5 py-1 bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white rounded-lg transition font-bold flex items-center gap-1 disabled:opacity-50"
                  >
                    <Sparkles size={11} />
                    {aiGenerating ? "Generating..." : "Generate AI"}
                  </button>
                </div>
                <textarea
                  placeholder="Tuliskan deskripsi lengkap produk Anda, atau gunakan asisten AI kami..."
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-3 py-2 rounded-xl border border-custom bg-custom-ter focus:outline-none focus:border-brand-primary resize-none"
                />
              </div>

              {/* Doc Alert */}
              <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-xl flex items-start gap-2 text-[10px] text-amber-800 dark:text-amber-300">
                <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Produk baru akan masuk ke antrean <strong>verifikasi Pemkot</strong> sebelum
                  ditampilkan ke publik. Proses verifikasi biasanya memakan waktu maksimal 1x24 jam.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-custom rounded-xl hover:bg-custom-ter font-semibold text-custom-muted"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-primary text-white hover:opacity-90 rounded-xl font-bold"
                >
                  Simpan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
