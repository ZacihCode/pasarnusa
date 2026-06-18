"use client";

import { useState } from "react";
import {
  Users,
  ShieldAlert,
  ShoppingBag,
  Megaphone,
  Check,
  X,
  Eye,
  FileText,
  MapPin,
  TrendingUp,
  Sparkles,
  BarChart3,
  Calendar,
  Search,
  Filter,
} from "lucide-react";

interface VerificationRequest {
  id: string;
  businessName: string;
  ownerName: string;
  category: string;
  kecamatan: string;
  nib: string;
  status: "pending" | "approved" | "rejected";
}

export default function PemkotDashboard() {
  const [requests, setRequests] = useState<VerificationRequest[]>([
    {
      id: "req-1",
      businessName: "Pempek Bu Yanti",
      ownerName: "Yanti Rahayu",
      category: "Kuliner",
      kecamatan: "Ilir Barat I",
      nib: "912000342918",
      status: "pending",
    },
    {
      id: "req-2",
      businessName: "Songket Palembang Indah",
      ownerName: "Achmad Fauzi",
      category: "Fashion & Batik",
      kecamatan: "Kemuning",
      nib: "912000982312",
      status: "pending",
    },
    {
      id: "req-3",
      businessName: "Kerajinan Tembaga Ampera",
      ownerName: "Hendra Wijaya",
      category: "Kerajinan",
      kecamatan: "Seberang Ulu I",
      nib: "912000456781",
      status: "pending",
    },
    {
      id: "req-4",
      businessName: "Batik Palembang Sriwijaya",
      ownerName: "Siti Rahmawati",
      category: "Fashion & Batik",
      kecamatan: "Sukarami",
      nib: "912000129384",
      status: "pending",
    },
  ]);

  const [activeTab, setActiveTab] = useState<"verifikasi" | "statistik" | "promosi">("verifikasi");
  const [filterKecamatan, setFilterKecamatan] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const handleApprove = (id: string) => {
    setRequests(
      requests.map((r) => (r.id === id ? { ...r, status: "approved" } : r))
    );
  };

  const handleReject = (id: string) => {
    setRequests(
      requests.map((r) => (r.id === id ? { ...r, status: "rejected" } : r))
    );
  };

  // Filter requests that are pending
  const pendingRequests = requests.filter(
    (r) =>
      r.status === "pending" &&
      (filterKecamatan === "Semua" || r.kecamatan === filterKecamatan) &&
      r.businessName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const districtsData = [
    { name: "Ilir Barat I", count: 48, percentage: 80 },
    { name: "Sukarami", count: 36, percentage: 60 },
    { name: "Kemuning", count: 30, percentage: 50 },
    { name: "Seberang Ulu I", count: 24, percentage: 40 },
    { name: "Jakabaring", count: 18, percentage: 30 },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative p-6 rounded-2xl overflow-hidden bg-gradient-to-r from-teal-800 to-emerald-700 dark:from-teal-950 dark:to-emerald-900 text-white shadow-lg">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider">
              Portal Dinas Koperasi & UMKM
            </span>
            <h2 className="text-xl sm:text-2xl font-black mt-2">
              Dinas Koperasi & UMKM Palembang
            </h2>
            <p className="text-white/80 text-xs mt-1 max-w-lg">
              Panel resmi untuk mengelola pendaftaran UMKM, memantau pertumbuhan ekonomi kreatif lokal,
              dan memberikan program bantuan promosi berbasis AI.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("verifikasi")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${activeTab === "verifikasi" ? "bg-white text-teal-800 dark:bg-zinc-900 dark:text-teal-400" : "bg-white/10 text-white hover:bg-white/20"}`}
            >
              Verifikasi ({requests.filter((r) => r.status === "pending").length})
            </button>
            <button
              onClick={() => setActiveTab("statistik")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${activeTab === "statistik" ? "bg-white text-teal-800 dark:bg-zinc-900 dark:text-teal-400" : "bg-white/10 text-white hover:bg-white/20"}`}
            >
              Statistik Wilayah
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total UMKM Terverifikasi",
            value: "1,248 Usaha",
            trend: "+24 Bulan Ini",
            icon: Users,
            color: "text-teal-600 bg-teal-50 dark:bg-teal-950/20",
          },
          {
            label: "Menunggu Verifikasi",
            value: `${requests.filter((r) => r.status === "pending").length} Pengajuan`,
            trend: "Butuh tindak lanjut",
            icon: ShieldAlert,
            color: "text-amber-600 bg-amber-50 dark:bg-amber-950/20",
          },
          {
            label: "Total Produk Aktif",
            value: "4,512 Produk",
            trend: "Didominasi kuliner",
            icon: ShoppingBag,
            color: "text-blue-600 bg-blue-50 dark:bg-blue-950/20",
          },
          {
            label: "Event Promosi Aktif",
            value: "2 Event",
            trend: "Festival Songket & Pempek",
            icon: Megaphone,
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
                  <span className="text-[10px] font-bold text-teal-600">
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

      {/* Main Tab Content Panels */}
      {activeTab === "verifikasi" && (
        <div className="bg-custom-card border border-custom rounded-2xl shadow-xs overflow-hidden">
          {/* Header Filter */}
          <div className="p-5 border-b border-custom flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-custom-ter/15">
            <div>
              <h3 className="text-sm font-bold text-custom-main">
                Antrean Verifikasi Bisnis Baru
              </h3>
              <p className="text-[10px] text-custom-muted">
                Periksa dokumen legalitas dan deskripsi usaha sebelum menyetujui publikasi
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-custom-muted">
                  <Search size={13} />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari nama UMKM..."
                  className="pl-9 pr-3 py-1.5 text-xs rounded-xl border border-custom bg-custom-ter focus:outline-none focus:border-brand-primary w-full sm:w-48 transition"
                />
              </div>
              <select
                value={filterKecamatan}
                onChange={(e) => setFilterKecamatan(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-custom bg-custom-ter text-xs font-semibold"
              >
                <option value="Semua">Semua Kecamatan</option>
                <option value="Ilir Barat I">Ilir Barat I</option>
                <option value="Kemuning">Kemuning</option>
                <option value="Seberang Ulu I">Seberang Ulu I</option>
                <option value="Sukarami">Sukarami</option>
              </select>
            </div>
          </div>

          {/* Queue List Table */}
          <div className="overflow-x-auto">
            {pendingRequests.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-custom bg-custom-ter/30 text-[10px] uppercase font-bold text-custom-muted">
                    <th className="px-6 py-3.5">Nama Usaha / Pemilik</th>
                    <th className="px-6 py-3.5">Kategori</th>
                    <th className="px-6 py-3.5">Wilayah</th>
                    <th className="px-6 py-3.5">Nomor NIB</th>
                    <th className="px-6 py-3.5">Dokumen</th>
                    <th className="px-6 py-3.5 text-right">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-custom text-xs">
                  {pendingRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-custom-ter/10 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-custom-main">{req.businessName}</p>
                        <p className="text-[10px] text-custom-muted">Pemilik: {req.ownerName}</p>
                      </td>
                      <td className="px-6 py-4 text-custom-muted">{req.category}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 text-custom-main">
                          <MapPin size={12} className="text-brand-primary" />
                          {req.kecamatan}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-custom-muted">{req.nib}</td>
                      <td className="px-6 py-4">
                        <button className="inline-flex items-center gap-1 py-1 px-2.5 rounded-lg border border-custom bg-custom-ter hover:bg-custom-card transition text-[10px] font-bold text-brand-primary">
                          <Eye size={10} />
                          Lihat Berkas
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleReject(req.id)}
                            className="p-1.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 transition"
                            title="Tolak Pengajuan"
                          >
                            <X size={13} />
                          </button>
                          <button
                            onClick={() => handleApprove(req.id)}
                            className="p-1.5 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition"
                            title="Setujui Pengajuan"
                          >
                            <Check size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-10 text-center text-xs text-custom-muted space-y-2">
                <ShieldAlert size={30} className="mx-auto text-custom-muted opacity-40" />
                <p className="font-semibold">Semua antrean bersih</p>
                <p>Tidak ada pengajuan verifikasi baru untuk kriteria saat ini.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "statistik" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Regional Distribution Chart */}
          <div className="lg:col-span-2 bg-custom-card border border-custom p-5 rounded-2xl shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-custom-main">Pertumbuhan UMKM per Kecamatan</h3>
              <p className="text-[10px] text-custom-muted">Distribusi data UMKM terverifikasi di Palembang</p>
            </div>

            <div className="space-y-4">
              {districtsData.map((d, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-custom-main">{d.name}</span>
                    <span className="text-custom-muted">
                      {d.count} UMKM <span className="text-[10px] font-normal">({d.percentage}%)</span>
                    </span>
                  </div>
                  <div className="w-full bg-custom-ter rounded-full h-2 overflow-hidden">
                    <div
                      style={{ width: `${d.percentage}%` }}
                      className="bg-brand-primary h-full rounded-full transition-all duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Policy Recommendations */}
          <div className="bg-custom-card border border-custom p-5 rounded-2xl shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 text-brand-primary">
                <Sparkles size={16} />
                <h3 className="text-sm font-bold text-custom-main">Analisis Rekomendasi AI</h3>
              </div>
              <p className="text-[10px] text-custom-muted mt-1 leading-relaxed">
                Rekomendasi otomatis pembuatan program bantuan modal & promosi
              </p>
            </div>

            <div className="space-y-3 flex-1 py-2 text-xs">
              <div className="p-3 bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900 rounded-xl space-y-1.5">
                <div className="flex items-center gap-1 font-bold text-teal-800 dark:text-teal-300">
                  <BarChart3 size={13} />
                  Kesenjangan Sektor Kreatif
                </div>
                <p className="text-[10px] text-teal-900/80 dark:text-teal-400/90 leading-relaxed">
                  Kecamatan Seberang Ulu I kekurangan sektor Kerajinan lokal meskipun minat wisatawan meningkat. Disarankan alokasi pelatihan kriya daerah.
                </p>
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-xl space-y-1.5">
                <div className="flex items-center gap-1 font-bold text-amber-800 dark:text-amber-300">
                  <Calendar size={13} />
                  Target Kampanye Regional
                </div>
                <p className="text-[10px] text-amber-950/80 dark:text-amber-400/90 leading-relaxed">
                  Menyambut festival budaya bulan depan, optimasi promosi Kain Songket dapat dipusatkan di platform dengan kampanye terpadu.
                </p>
              </div>
            </div>

            <button className="w-full py-2.5 rounded-xl bg-brand-primary text-white text-xs font-bold transition shadow-md shadow-teal-700/10">
              Buat Rencana Kebijakan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
