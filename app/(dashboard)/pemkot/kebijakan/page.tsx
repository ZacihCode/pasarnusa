"use client";

import { useState } from "react";
import {
  FileText,
  Plus,
  Sparkles,
  TrendingUp,
  AlertCircle,
  Clock,
  CheckCircle,
  HelpCircle,
  Search,
  Filter,
  DollarSign,
  Briefcase,
  Percent,
} from "lucide-react";

interface Policy {
  id: string;
  title: string;
  category: "Subsidi" | "Insentif" | "Pelatihan" | "Relaksasi Pajak";
  targetSector: string;
  budget: number;
  status: "active" | "draft" | "expired";
  dateCreated: string;
  description: string;
}

export default function PemkotPolicies() {
  const [policies, setPolicies] = useState<Policy[]>([
    {
      id: "POL-001",
      title: "Bantuan Kemasan Higienis & Vakum Pempek",
      category: "Subsidi",
      targetSector: "Kuliner",
      budget: 120000000,
      status: "active",
      dateCreated: "10 Juni 2026",
      description: "Subsidi pembelian mesin vakum packaging dan cetak label modern untuk 100 UMKM Kuliner terverifikasi guna memperpanjang masa simpan produk.",
    },
    {
      id: "POL-002",
      title: "Bebas Pajak Reklame Event Kebudayaan Sriwijaya",
      category: "Relaksasi Pajak",
      targetSector: "Fashion & Kerajinan",
      budget: 0,
      status: "active",
      dateCreated: "05 Juni 2026",
      description: "Pembebasan pajak iklan reklame fisik dan digital bagi UMKM kriya yang berpartisipasi pada festival pariwisata Benteng Kuto Besak.",
    },
    {
      id: "POL-003",
      title: "Akses Kredit Usaha Rakyat Daerah (Kurda) Tanpa Agunan",
      category: "Insentif",
      targetSector: "Semua Sektor",
      budget: 500000000,
      status: "draft",
      dateCreated: "18 Juni 2026",
      description: "Kerjasama dengan Bank Sumsel Babel untuk menyalurkan pembiayaan usaha bunga ultra-rendah 3% bagi pengusaha lokal mikro.",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [aiGenerating, setAiGenerating] = useState(false);
  
  const [newPolicy, setNewPolicy] = useState({
    title: "",
    category: "Subsidi",
    targetSector: "Kuliner",
    budget: "",
    description: "",
  });

  const handleAddPolicy = (e: React.FormEvent) => {
    e.preventDefault();
    const policy: Policy = {
      id: `POL-00${policies.length + 1}`,
      title: newPolicy.title,
      category: newPolicy.category as any,
      targetSector: newPolicy.targetSector,
      budget: Number(newPolicy.budget) || 0,
      status: "draft",
      dateCreated: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      description: newPolicy.description,
    };
    setPolicies([policy, ...policies]);
    setNewPolicy({
      title: "",
      category: "Subsidi",
      targetSector: "Kuliner",
      budget: "",
      description: "",
    });
    setShowAddModal(false);
  };

  const generateAIPolicy = () => {
    if (!newPolicy.title) return;
    setAiGenerating(true);
    setTimeout(() => {
      setNewPolicy((prev) => ({
        ...prev,
        description: `Rencana program '${prev.title}' dirancang khusus untuk mempercepat pertumbuhan UMKM di Kota Palembang. Program ini menargetkan efisiensi biaya operasional bagi pelaku usaha di sektor ${prev.targetSector} melalui pendanaan berkelanjutan atau insentif regulasi. Output yang diharapkan adalah peningkatan omzet UMKM minimal 15% dalam 6 bulan pasca-program dan sertifikasi standar nasional (SNI/Halal).`,
      }));
      setAiGenerating(false);
    }, 1500);
  };

  const filteredPolicies = policies.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 text-xs">
      {/* Welcome/Action Banner */}
      <div className="relative p-6 rounded-2xl overflow-hidden bg-gradient-to-r from-teal-800 to-emerald-700 dark:from-teal-950 dark:to-emerald-900 text-white shadow-lg">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider">
              Sistem Regulasi & Kebijakan Daerah
            </span>
            <h2 className="text-xl sm:text-2xl font-black mt-2">
              Kebijakan & Bantuan UMKM
            </h2>
            <p className="text-white/80 text-xs mt-1 max-w-lg">
              Rumuskan regulasi, alokasi anggaran daerah, dan program pendampingan untuk
              memperkuat UMKM lokal agar naik kelas dengan dukungan teknologi AI.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="self-start md:self-center px-4 py-2.5 bg-white text-teal-800 dark:bg-zinc-900 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-zinc-800 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md"
          >
            <Plus size={15} />
            Rumuskan Kebijakan Baru
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            label: "Kebijakan Aktif",
            value: `${policies.filter((p) => p.status === "active").length} Program`,
            desc: "Sedang berjalan & diimplementasikan",
            icon: CheckCircle,
            color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20",
          },
          {
            label: "Draft Rencana Kebijakan",
            value: `${policies.filter((p) => p.status === "draft").length} Rencana`,
            desc: "Menunggu tinjauan Walikota / DPRD",
            icon: Clock,
            color: "text-amber-600 bg-amber-50 dark:bg-amber-950/20",
          },
          {
            label: "Total Anggaran Terdistribusi",
            value: "Rp 620.000.000",
            desc: "Tahun Anggaran 2026",
            icon: DollarSign,
            color: "text-teal-600 bg-teal-50 dark:bg-teal-950/20",
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
                <p className="text-[10px] text-custom-muted">{stat.desc}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                <Icon size={18} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Policies List Table */}
      <div className="bg-custom-card border border-custom rounded-2xl shadow-xs overflow-hidden">
        {/* Header Table */}
        <div className="p-5 border-b border-custom flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-custom-ter/15">
          <div>
            <h3 className="text-sm font-bold text-custom-main">
              Daftar Program & Regulasi UMKM
            </h3>
            <p className="text-[10px] text-custom-muted">
              Pantau status regulasi, kategori program, dan penyaluran dana anggaran daerah
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
                placeholder="Cari program..."
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
                <th className="px-6 py-3.5">Nama Program</th>
                <th className="px-6 py-3.5">Kategori</th>
                <th className="px-6 py-3.5">Sektor Target</th>
                <th className="px-6 py-3.5">Anggaran Daerah</th>
                <th className="px-6 py-3.5">Tanggal Dibuat</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-custom text-xs">
              {filteredPolicies.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-custom-ter/10 transition-colors"
                >
                  <td className="px-6 py-4 max-w-sm">
                    <p className="font-bold text-custom-main">{p.title}</p>
                    <p className="text-[10px] text-custom-muted line-clamp-1 mt-0.5">
                      {p.description}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-0.5 rounded-md text-[10px] font-semibold bg-custom-ter text-custom-main border border-custom">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-custom-muted">{p.targetSector}</td>
                  <td className="px-6 py-4 font-semibold">
                    {p.budget > 0
                      ? `Rp ${p.budget.toLocaleString("id-ID")}`
                      : "Non-Fiskal / Regulasi"}
                  </td>
                  <td className="px-6 py-4 text-custom-muted">{p.dateCreated}</td>
                  <td className="px-6 py-4">
                    {p.status === "active" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600">
                        <CheckCircle size={10} />
                        Aktif
                      </span>
                    ) : p.status === "draft" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/20 text-amber-600">
                        <Clock size={10} />
                        Draf Rencana
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600">
                        Selesai
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="px-3 py-1.5 bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white rounded-lg transition font-semibold text-[10px]">
                      Tinjau
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ==========================================
         MODAL: TAMBAH KEBIJAKAN BARU
         ========================================== */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-custom-card border border-custom rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-custom flex items-center justify-between">
              <h3 className="text-sm font-bold text-custom-main flex items-center gap-2">
                <Plus size={16} className="text-brand-primary" />
                Rumuskan Kebijakan Daerah
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg hover:bg-custom-ter text-custom-muted"
              >
                <Plus size={16} className="rotate-45" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleAddPolicy} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              <div className="space-y-1.5">
                <label className="block font-semibold text-custom-muted">
                  Nama Program / Regulasi <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="cth. Program Bantuan Modal Alat Produksi Batik"
                  value={newPolicy.title}
                  onChange={(e) =>
                     setNewPolicy({ ...newPolicy, title: e.target.value })
                  }
                  className="w-full px-3 py-2.5 rounded-xl border border-custom bg-custom-ter focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-semibold text-custom-muted">
                    Kategori <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newPolicy.category}
                    onChange={(e) =>
                      setNewPolicy({ ...newPolicy, category: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-custom bg-custom-ter focus:outline-none focus:border-brand-primary"
                  >
                    <option value="Subsidi">Subsidi</option>
                    <option value="Insentif">Insentif</option>
                    <option value="Pelatihan">Pelatihan</option>
                    <option value="Relaksasi Pajak">Relaksasi Pajak</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-semibold text-custom-muted">
                    Sektor Target <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newPolicy.targetSector}
                    onChange={(e) =>
                      setNewPolicy({ ...newPolicy, targetSector: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-custom bg-custom-ter focus:outline-none focus:border-brand-primary"
                  >
                    <option value="Semua Sektor">Semua Sektor</option>
                    <option value="Kuliner">Kuliner</option>
                    <option value="Fashion & Batik">Fashion & Batik</option>
                    <option value="Kerajinan">Kerajinan</option>
                    <option value="Seni & Budaya">Seni & Budaya</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block font-semibold text-custom-muted">
                  Anggaran yang Dialokasikan (Rp) - Isi 0 jika Non-Fiskal
                </label>
                <input
                  type="number"
                  placeholder="cth. 150000000"
                  value={newPolicy.budget}
                  onChange={(e) =>
                    setNewPolicy({ ...newPolicy, budget: e.target.value })
                  }
                  className="w-full px-3 py-2.5 rounded-xl border border-custom bg-custom-ter focus:outline-none focus:border-brand-primary"
                />
              </div>

              {/* Description Input + AI Draft helper */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block font-semibold text-custom-muted">
                    Deskripsi & Naskah Regulasi
                  </label>
                  <button
                    type="button"
                    onClick={generateAIPolicy}
                    disabled={!newPolicy.title || aiGenerating}
                    className="px-2.5 py-1 bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white rounded-lg transition font-bold flex items-center gap-1 disabled:opacity-50"
                  >
                    <Sparkles size={11} />
                    {aiGenerating ? "Drafting..." : "Draft dengan AI"}
                  </button>
                </div>
                <textarea
                  placeholder="Tulis draf program regulasi di sini, atau gunakan asisten AI kami untuk merumuskannya secara formal..."
                  value={newPolicy.description}
                  onChange={(e) =>
                    setNewPolicy({ ...newPolicy, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-3 py-2 rounded-xl border border-custom bg-custom-ter focus:outline-none focus:border-brand-primary resize-none"
                />
              </div>

              {/* Warning Alert */}
              <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-xl flex items-start gap-2 text-[10px] text-amber-800 dark:text-amber-300">
                <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Kebijakan baru akan didaftarkan sebagai <strong>Draf Rencana</strong> dan memerlukan otorisasi digital Kepala Dinas Koperasi & UMKM serta sinkronisasi sistem keuangan daerah sebelum diaktifkan.
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
                  Daftarkan Kebijakan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
