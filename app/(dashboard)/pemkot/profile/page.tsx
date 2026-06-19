"use client";

import { useState } from "react";
import {
  Building2,
  Users,
  TrendingUp,
  Award,
  FileText,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  Download,
  ExternalLink,
  Search,
  BookOpen,
  Landmark,
  Megaphone,
  ShieldCheck,
  ArrowRight,
  Star,
  ChevronLeft,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Program {
  id: number;
  title: string;
  description: string;
  quota: number;
  deadline: string;
  icon: string;
  status: "Buka" | "Segera" | "Tutup";
}

interface News {
  id: number;
  category: string;
  title: string;
  date: string;
  excerpt: string;
}

interface Regulation {
  id: number;
  title: string;
  number: string;
  year: string;
  type: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const programs: Program[] = [
  {
    id: 1,
    title: "Pelatihan Digital Marketing UMKM",
    description:
      "Tingkatkan penjualan produk UMKM melalui platform digital dan media sosial.",
    quota: 50,
    deadline: "30 Jul 2025",
    icon: "📱",
    status: "Buka",
  },
  {
    id: 2,
    title: "Hibah Modal Usaha Mikro",
    description:
      "Bantuan permodalan bagi usaha mikro yang memenuhi kriteria dan persyaratan.",
    quota: 100,
    deadline: "15 Agu 2025",
    icon: "💰",
    status: "Buka",
  },
  {
    id: 3,
    title: "Sertifikasi Halal Gratis",
    description:
      "Fasilitasi pengurusan sertifikasi halal bagi produk pangan UMKM lokal.",
    quota: 200,
    deadline: "1 Sep 2025",
    icon: "✅",
    status: "Segera",
  },
  {
    id: 4,
    title: "Inkubasi Startup Lokal 2025",
    description:
      "Program mentoring dan pendampingan selama 6 bulan untuk startup tahap awal.",
    quota: 20,
    deadline: "Ditutup",
    icon: "🚀",
    status: "Tutup",
  },
];

const news: News[] = [
  {
    id: 1,
    category: "Pengumuman",
    title: "Bazar UMKM Kota Yogyakarta 2025 Siap Digelar di Alun-alun",
    date: "12 Jul 2025",
    excerpt:
      "Dinas Koperasi dan UMKM kota menyelenggarakan bazar tahunan untuk mempertemukan pelaku UMKM dengan konsumen.",
  },
  {
    id: 2,
    category: "Program",
    title: "Pendaftaran Pelatihan Ekspor UMKM Gelombang 2 Telah Dibuka",
    date: "10 Jul 2025",
    excerpt:
      "Kuota terbatas! Segera daftarkan usaha Anda untuk mengikuti pelatihan ekspor bersama Kementerian Perdagangan.",
  },
  {
    id: 3,
    category: "Berita",
    title: "UMKM Kota Yogyakarta Raih Penghargaan Nasional UMKM Award 2025",
    date: "8 Jul 2025",
    excerpt:
      "Tiga pelaku UMKM lokal berhasil meraih penghargaan bergengsi di ajang UMKM Award yang digelar di Jakarta.",
  },
];

const regulations: Regulation[] = [
  {
    id: 1,
    title: "Pemberdayaan Usaha Mikro, Kecil, dan Menengah",
    number: "7",
    year: "2023",
    type: "Peraturan Daerah",
  },
  {
    id: 2,
    title: "Standar Pelayanan Perizinan Berusaha UMKM",
    number: "12",
    year: "2024",
    type: "Peraturan Walikota",
  },
  {
    id: 3,
    title: "Pedoman Hibah dan Bantuan Sosial UMKM",
    number: "5",
    year: "2025",
    type: "Peraturan Walikota",
  },
];

// ─── Sub-Components ───────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  value,
  label,
  color,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div className="bg-custom-card border border-custom rounded-2xl p-4 flex items-center gap-4">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}
      >
        <Icon size={22} className="text-white" />
      </div>
      <div>
        <p className="text-custom-main font-bold text-xl leading-none">
          {value}
        </p>
        <p className="text-custom-muted text-xs mt-1">{label}</p>
      </div>
    </div>
  );
}

function ProgramCard({ program }: { program: Program }) {
  const statusStyle = {
    Buka: "bg-green-100 text-green-700",
    Segera: "bg-amber-100 text-amber-700",
    Tutup: "bg-gray-100 text-gray-500",
  }[program.status];

  return (
    <div className="bg-custom-card border border-custom rounded-2xl p-5 hover:shadow-md transition-all hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{program.icon}</span>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle}`}
          >
            {program.status}
          </span>
        </div>
        <div className="text-right shrink-0">
          <p className="text-custom-muted text-xs">Kuota</p>
          <p className="text-brand-primary font-bold text-sm">
            {program.quota} orang
          </p>
        </div>
      </div>

      <h3 className="text-custom-main font-semibold text-sm mb-1.5 leading-snug">
        {program.title}
      </h3>
      <p className="text-custom-muted text-xs leading-relaxed mb-3">
        {program.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-custom-muted">
          <Calendar size={13} />
          <span className="text-xs">Tutup: {program.deadline}</span>
        </div>
        <button
          disabled={program.status === "Tutup"}
          className={`text-xs font-semibold px-4 py-1.5 rounded-xl flex items-center gap-1 transition-all ${
            program.status === "Tutup"
              ? "bg-custom-ter text-custom-muted cursor-not-allowed"
              : "bg-brand-primary text-white hover:opacity-90"
          }`}
        >
          Daftar
          <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
}

function NewsCard({ item }: { item: News }) {
  const catColor: Record<string, string> = {
    Pengumuman: "bg-blue-100 text-blue-700",
    Program: "bg-teal-100 text-teal-700",
    Berita: "bg-purple-100 text-purple-700",
  };

  return (
    <div className="flex gap-4 bg-custom-card border border-custom rounded-2xl p-4 hover:shadow-md transition-all hover:-translate-y-0.5">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              catColor[item.category] || "bg-gray-100 text-gray-600"
            }`}
          >
            {item.category}
          </span>
          <span className="text-custom-muted text-xs">{item.date}</span>
        </div>
        <h3 className="text-custom-main font-semibold text-sm leading-snug mb-1.5">
          {item.title}
        </h3>
        <p className="text-custom-muted text-xs leading-relaxed line-clamp-2">
          {item.excerpt}
        </p>
      </div>
      <ExternalLink size={16} className="text-custom-muted shrink-0 mt-1" />
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PemkotPage() {
  const [activeTab, setActiveTab] = useState<
    "program" | "berita" | "regulasi" | "kontak"
  >("program");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPrograms = programs.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-custom-sec">
      {/* ── Top Navigation ── */}
      <nav className="sticky top-0 z-50 bg-custom-card border-b border-custom shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <button className="flex items-center gap-2 text-custom-muted hover:text-brand-primary transition-colors">
            <ChevronLeft size={20} />
            <span className="text-sm font-medium">Beranda</span>
          </button>
          <span className="font-semibold text-custom-main text-sm">
            Dinas Koperasi & UMKM
          </span>
          <div className="w-16" />
        </div>
      </nav>

      {/* ── Hero Banner ── */}
      <div
        className="relative overflow-hidden"
        style={{ background: "var(--gradient-hero)" }}
      >
        {/* Floating shapes */}
        <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-white/10 animate-float" />
        <div className="absolute -bottom-6 left-8 w-20 h-20 rounded-full bg-white/10 animate-float-slow" />
        <div className="absolute top-12 right-1/3 w-10 h-10 rounded-full bg-white/10 animate-float" />

        <div className="relative max-w-4xl mx-auto px-6 py-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <Landmark size={24} className="text-white" />
            </div>
            <div>
              <p className="text-white/80 text-xs">Pemerintah Kota</p>
              <p className="text-white font-bold">Yogyakarta</p>
            </div>
          </div>

          <h1 className="text-white font-bold text-2xl leading-tight mb-2">
            Pusat Layanan
            <br />
            UMKM Kota Yogyakarta
          </h1>
          <p className="text-white/80 text-sm leading-relaxed mb-6 max-w-sm">
            Mendukung pertumbuhan usaha mikro, kecil, dan menengah melalui
            program pemberdayaan yang inklusif.
          </p>

          <button className="bg-white text-brand-primary font-semibold text-sm px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-white/90 transition-colors shadow-md">
            <FileText size={16} />
            Daftar Sekarang
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-4xl mx-auto px-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mt-5">
          <StatCard
            icon={Users}
            value="12.4K"
            label="UMKM Terdaftar"
            color="bg-brand-primary"
          />
          <StatCard
            icon={Award}
            value="48"
            label="Program Aktif"
            color="bg-amber-500"
          />
          <StatCard
            icon={TrendingUp}
            value="Rp 2.1M"
            label="Dana Disalurkan"
            color="bg-purple-500"
          />
          <StatCard
            icon={Star}
            value="98%"
            label="Kepuasan Layanan"
            color="bg-green-500"
          />
        </div>

        {/* Quick Actions */}
        <div className="mt-5">
          <h2 className="text-custom-main font-bold text-base mb-3">
            Layanan Cepat
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {[
              {
                icon: FileText,
                label: "Perizinan",
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
              {
                icon: BookOpen,
                label: "Pelatihan",
                color: "text-teal-600",
                bg: "bg-teal-50",
              },
              {
                icon: ShieldCheck,
                label: "Sertifikasi",
                color: "text-green-600",
                bg: "bg-green-50",
              },
              {
                icon: Megaphone,
                label: "Pengaduan",
                color: "text-red-500",
                bg: "bg-red-50",
              },
            ].map(({ icon: Icon, label, color, bg }) => (
              <button
                key={label}
                className="flex flex-col items-center gap-2 bg-custom-card border border-custom rounded-2xl py-4 px-2 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div
                  className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center`}
                >
                  <Icon size={18} className={color} />
                </div>
                <span className="text-custom-main text-xs font-medium text-center leading-tight">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Announcement Banner */}
        <div className="mt-5 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3">
          <Megaphone size={20} className="text-amber-600 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-amber-800 text-xs font-semibold">Pengumuman</p>
            <p className="text-amber-700 text-xs truncate">
              Bazar UMKM Kota Yogyakarta dibuka 20–22 Juli 2025 di Alun-alun
              Utara
            </p>
          </div>
          <ChevronRight size={16} className="text-amber-600 shrink-0" />
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-1 mt-5 bg-custom-card border border-custom rounded-xl p-1 overflow-x-auto">
          {[
            { key: "program", label: "Program" },
            { key: "berita", label: "Berita" },
            { key: "regulasi", label: "Regulasi" },
            { key: "kontak", label: "Kontak" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as typeof activeTab)}
              className={`flex-1 shrink-0 py-2 text-xs font-semibold rounded-lg capitalize transition-all whitespace-nowrap px-2 ${
                activeTab === key
                  ? "bg-brand-primary text-white shadow-sm"
                  : "text-custom-muted hover:text-custom-main"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Tab Content ── */}
        <div className="mt-4 pb-12">
          {/* PROGRAM */}
          {activeTab === "program" && (
            <>
              <div className="relative mb-4">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-custom-muted"
                />
                <input
                  type="text"
                  placeholder="Cari program..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-custom-card border border-custom rounded-xl pl-9 pr-4 py-2.5 text-sm text-custom-main placeholder:text-custom-muted focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              <div className="space-y-3">
                {filteredPrograms.map((p) => (
                  <ProgramCard key={p.id} program={p} />
                ))}
                {filteredPrograms.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-3xl mb-2">📋</p>
                    <p className="text-custom-muted text-sm">
                      Program tidak ditemukan
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* BERITA */}
          {activeTab === "berita" && (
            <div className="space-y-3">
              {news.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
              <button className="w-full py-3 border border-custom rounded-2xl text-custom-muted text-sm font-medium hover:border-brand-primary hover:text-brand-primary transition-colors flex items-center justify-center gap-2">
                Lihat Semua Berita
                <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* REGULASI */}
          {activeTab === "regulasi" && (
            <div className="space-y-3">
              {regulations.map((reg) => (
                <div
                  key={reg.id}
                  className="bg-custom-card border border-custom rounded-2xl p-4 flex items-center gap-4"
                >
                  <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center shrink-0">
                    <FileText size={18} className="text-brand-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-custom-muted text-xs mb-0.5">
                      {reg.type} No. {reg.number} Tahun {reg.year}
                    </p>
                    <p className="text-custom-main text-sm font-medium leading-snug">
                      {reg.title}
                    </p>
                  </div>
                  <button className="w-9 h-9 bg-custom-ter rounded-xl flex items-center justify-center shrink-0 hover:bg-brand-primary hover:text-white transition-colors text-custom-muted">
                    <Download size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* KONTAK */}
          {activeTab === "kontak" && (
            <div className="space-y-4">
              <div className="bg-custom-card border border-custom rounded-2xl p-5">
                <h3 className="text-custom-main font-semibold mb-4 flex items-center gap-2">
                  <Building2 size={16} className="text-brand-primary" />
                  Dinas Koperasi & UMKM
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: MapPin,
                      label: "Alamat Kantor",
                      value:
                        "Jl. Sultan Agung No. 82, Kota Yogyakarta, DIY 55171",
                    },
                    {
                      icon: Phone,
                      label: "Telepon",
                      value: "(0274) 515-865",
                    },
                    {
                      icon: Mail,
                      label: "Email",
                      value: "dinkopumkm@jogjakota.go.id",
                    },
                    {
                      icon: Globe,
                      label: "Website",
                      value: "dinkopumkm.jogjakota.go.id",
                    },
                    {
                      icon: Clock,
                      label: "Jam Layanan",
                      value: "Senin–Jumat, 08.00–15.00 WIB",
                    },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-teal-50 rounded-xl flex items-center justify-center shrink-0">
                        <Icon size={16} className="text-brand-primary" />
                      </div>
                      <div>
                        <p className="text-custom-muted text-xs">{label}</p>
                        <p className="text-custom-main text-sm font-medium">
                          {value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-custom-ter rounded-2xl h-44 flex items-center justify-center border border-custom">
                <div className="text-center">
                  <MapPin
                    size={28}
                    className="text-brand-primary mx-auto mb-2"
                  />
                  <p className="text-custom-muted text-sm font-medium">
                    Lihat di Peta
                  </p>
                  <button className="mt-2 text-brand-primary text-xs font-semibold flex items-center gap-1 mx-auto hover:underline">
                    Buka Google Maps
                    <ExternalLink size={11} />
                  </button>
                </div>
              </div>

              {/* Emergency Contacts */}
              <div
                className="rounded-2xl p-5 text-white"
                style={{ background: "var(--gradient-hero)" }}
              >
                <p className="font-bold mb-1">Hotline Pengaduan</p>
                <p className="text-white/80 text-sm mb-3">
                  Laporkan kendala layanan atau masalah UMKM Anda
                </p>
                <div className="flex gap-3">
                  <button className="flex-1 bg-white/20 hover:bg-white/30 transition-colors text-white text-sm font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2">
                    <Phone size={15} />
                    Telepon
                  </button>
                  <button className="flex-1 bg-white text-brand-primary text-sm font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-white/90 transition-colors">
                    <Mail size={15} />
                    Email
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Missing import used in kontak tab
function Clock({ size, className }: { size: number; className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
