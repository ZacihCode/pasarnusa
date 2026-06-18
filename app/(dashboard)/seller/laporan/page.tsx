"use client";

import { useState } from "react";
import {
  TrendingUp,
  ShoppingBag,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  Printer,
  Sparkles,
  Award,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  customer: string;
  products: string;
  amount: number;
  payment: string;
  status: "Success" | "Processing" | "Shipped" | "Cancelled";
}

export default function SellerSalesReport() {
  const [period, setPeriod] = useState<"7days" | "30days" | "year">("30days");
  const [categoryFilter, setCategoryFilter] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showExportToast, setShowExportToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleExport = (type: string) => {
    setToastMessage(`Laporan berhasil diekspor sebagai berkas ${type}!`);
    setShowExportToast(true);
    setTimeout(() => {
      setShowExportToast(false);
    }, 3000);
  };

  // State-based dynamic KPI data depending on selected period
  const kpiData = {
    "7days": [
      {
        label: "Omzet Penjualan",
        value: "Rp 3.420.000",
        diff: "+18.4%",
        isPositive: true,
        desc: "vs 7 hari sebelumnya",
        icon: DollarSign,
        color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20"
      },
      {
        label: "Total Pesanan",
        value: "112 Pesanan",
        diff: "+12.1%",
        isPositive: true,
        desc: "vs 7 hari sebelumnya",
        icon: ShoppingBag,
        color: "text-blue-600 bg-blue-50 dark:bg-blue-950/20"
      },
      {
        label: "Rata-rata Transaksi",
        value: "Rp 30.535",
        diff: "+5.6%",
        isPositive: true,
        desc: "vs 7 hari sebelumnya",
        icon: TrendingUp,
        color: "text-amber-600 bg-amber-50 dark:bg-amber-950/20"
      },
      {
        label: "Estimasi Keuntungan",
        value: "Rp 2.394.000",
        diff: "+20.1%",
        isPositive: true,
        desc: "vs 7 hari sebelumnya",
        icon: Award,
        color: "text-purple-600 bg-purple-50 dark:bg-purple-950/20"
      }
    ],
    "30days": [
      {
        label: "Omzet Penjualan",
        value: "Rp 12.450.000",
        diff: "+14.2%",
        isPositive: true,
        desc: "vs bulan lalu",
        icon: DollarSign,
        color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20"
      },
      {
        label: "Total Pesanan",
        value: "478 Pesanan",
        diff: "+8.3%",
        isPositive: true,
        desc: "vs bulan lalu",
        icon: ShoppingBag,
        color: "text-blue-600 bg-blue-50 dark:bg-blue-950/20"
      },
      {
        label: "Rata-rata Transaksi",
        value: "Rp 26.046",
        diff: "+5.4%",
        isPositive: true,
        desc: "vs bulan lalu",
        icon: TrendingUp,
        color: "text-amber-600 bg-amber-50 dark:bg-amber-950/20"
      },
      {
        label: "Estimasi Keuntungan",
        value: "Rp 8.715.000",
        diff: "+12.4%",
        isPositive: true,
        desc: "vs bulan lalu",
        icon: Award,
        color: "text-purple-600 bg-purple-50 dark:bg-purple-950/20"
      }
    ],
    year: [
      {
        label: "Omzet Penjualan",
        value: "Rp 134.800.000",
        diff: "+28.1%",
        isPositive: true,
        desc: "vs tahun lalu",
        icon: DollarSign,
        color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20"
      },
      {
        label: "Total Pesanan",
        value: "4.890 Pesanan",
        diff: "+19.7%",
        isPositive: true,
        desc: "vs tahun lalu",
        icon: ShoppingBag,
        color: "text-blue-600 bg-blue-50 dark:bg-blue-950/20"
      },
      {
        label: "Rata-rata Transaksi",
        value: "Rp 27.566",
        diff: "+7.0%",
        isPositive: true,
        desc: "vs tahun lalu",
        icon: TrendingUp,
        color: "text-amber-600 bg-amber-50 dark:bg-amber-950/20"
      },
      {
        label: "Estimasi Keuntungan",
        value: "Rp 94.360.000",
        diff: "+30.5%",
        isPositive: true,
        desc: "vs tahun lalu",
        icon: Award,
        color: "text-purple-600 bg-purple-50 dark:bg-purple-950/20"
      }
    ]
  };

  // Graphical Data representation for different periods
  const graphData = {
    "7days": [
      { label: "Sen", value: 30, revenue: "Rp 450k" },
      { label: "Sel", value: 45, revenue: "Rp 675k" },
      { label: "Rab", value: 20, revenue: "Rp 300k" },
      { label: "Kam", value: 65, revenue: "Rp 975k" },
      { label: "Jum", value: 55, revenue: "Rp 825k" },
      { label: "Sab", value: 90, revenue: "Rp 1.35M" },
      { label: "Min", value: 80, revenue: "Rp 1.20M" }
    ],
    "30days": [
      { label: "Minggu 1", value: 95, revenue: "Rp 2.8M" },
      { label: "Minggu 2", value: 130, revenue: "Rp 3.5M" },
      { label: "Minggu 3", value: 110, revenue: "Rp 2.9M" },
      { label: "Minggu 4", value: 143, revenue: "Rp 3.2M" }
    ],
    year: [
      { label: "Jan", value: 35, revenue: "Rp 8.5M" },
      { label: "Feb", value: 48, revenue: "Rp 11.2M" },
      { label: "Mar", value: 65, revenue: "Rp 15.0M" },
      { label: "Apr", value: 55, revenue: "Rp 13.5M" },
      { label: "Mei", value: 80, revenue: "Rp 19.8M" },
      { label: "Jun", value: 95, revenue: "Rp 23.4M" },
      { label: "Jul", value: 70, revenue: "Rp 17.5M" },
      { label: "Agu", value: 85, revenue: "Rp 20.1M" },
      { label: "Sep", value: 60, revenue: "Rp 14.8M" },
      { label: "Okt", value: 75, revenue: "Rp 18.2M" },
      { label: "Nov", value: 90, revenue: "Rp 22.0M" },
      { label: "Des", value: 110, revenue: "Rp 27.5M" }
    ]
  };

  const transactions: Transaction[] = [
    {
      id: "TX-98231",
      date: "18 Jun 2026, 14:23",
      customer: "Rian Hidayat",
      products: "Pempek Kapal Selam x2, Kemplang Panggang x1",
      amount: 345000,
      payment: "QRIS",
      status: "Success"
    },
    {
      id: "TX-98230",
      date: "18 Jun 2026, 11:05",
      customer: "Siti Aisyah",
      products: "Kain Songket Lepus Emas x1",
      amount: 2400000,
      payment: "Transfer Bank",
      status: "Success"
    },
    {
      id: "TX-98229",
      date: "17 Jun 2026, 16:45",
      customer: "Budi Pratama",
      products: "Kemplang Panggang Khas Palembang (500gr) x3",
      amount: 135000,
      payment: "QRIS",
      status: "Shipped"
    },
    {
      id: "TX-98228",
      date: "17 Jun 2026, 09:12",
      customer: "Yanti Melasari",
      products: "Pempek Lenjer Spesial x5",
      amount: 125000,
      payment: "E-Wallet",
      status: "Success"
    },
    {
      id: "TX-98227",
      date: "16 Jun 2026, 18:30",
      customer: "Hendra Wijaya",
      products: "Ukiran Kayu Motif Melati x1",
      amount: 750000,
      payment: "Transfer Bank",
      status: "Processing"
    },
    {
      id: "TX-98226",
      date: "15 Jun 2026, 13:00",
      customer: "Dewi Lestari",
      products: "Pempek Kapal Selam x1, Kemplang Panggang x2",
      amount: 2400000, // custom price mock
      payment: "QRIS",
      status: "Cancelled"
    },
    {
      id: "TX-98225",
      date: "14 Jun 2026, 10:15",
      customer: "Ahmad Faisal",
      products: "Kain Songket Lepus Emas x1",
      amount: 2400000,
      payment: "Transfer Bank",
      status: "Success"
    }
  ];

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.products.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getStatusBadge = (status: Transaction["status"]) => {
    switch (status) {
      case "Success":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600">
            <CheckCircle2 size={10} />
            Selesai
          </span>
        );
      case "Shipped":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-950/20 text-blue-600">
            <ArrowUpRight size={10} />
            Dikirim
          </span>
        );
      case "Processing":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/20 text-amber-600">
            <Clock size={10} />
            Diproses
          </span>
        );
      case "Cancelled":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 dark:bg-red-950/20 text-red-600">
            <AlertCircle size={10} />
            Batal
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 text-xs relative">
      {/* Toast Notification for Export */}
      {showExportToast && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 px-4 py-3 rounded-xl shadow-lg border border-custom animate-bounce text-xs font-bold transition duration-300">
          <CheckCircle2 size={16} className="text-emerald-500" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header section with Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-custom-main flex items-center gap-2">
            <TrendingUp size={22} className="text-brand-primary" />
            Laporan Penjualan UMKM
          </h2>
          <p className="text-xs text-custom-muted">
            Analisis detail kinerja omzet, volume transaksi, dan pertumbuhan usaha Anda
          </p>
        </div>
        
        {/* Period selection pills */}
        <div className="flex items-center bg-custom-card border border-custom p-1 rounded-xl self-start sm:self-center">
          <button
            onClick={() => { setPeriod("7days"); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded-lg font-bold transition text-[11px] ${
              period === "7days"
                ? "bg-brand-primary text-white"
                : "text-custom-muted hover:text-custom-main"
            }`}
          >
            7 Hari Terakhir
          </button>
          <button
            onClick={() => { setPeriod("30days"); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded-lg font-bold transition text-[11px] ${
              period === "30days"
                ? "bg-brand-primary text-white"
                : "text-custom-muted hover:text-custom-main"
            }`}
          >
            30 Hari Terakhir
          </button>
          <button
            onClick={() => { setPeriod("year"); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded-lg font-bold transition text-[11px] ${
              period === "year"
                ? "bg-brand-primary text-white"
                : "text-custom-muted hover:text-custom-main"
            }`}
          >
            Tahun Ini
          </button>
        </div>
      </div>

      {/* Dynamic KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData[period].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="bg-custom-card border border-custom p-5 rounded-2xl shadow-xs flex items-center justify-between transition-transform hover:scale-[1.01]"
            >
              <div className="space-y-1">
                <p className="text-[11px] font-semibold text-custom-muted uppercase tracking-wider">
                  {kpi.label}
                </p>
                <p className="text-lg font-black text-custom-main">
                  {kpi.value}
                </p>
                <div className="flex items-center gap-1">
                  <span className={`inline-flex items-center font-bold text-[10px] ${kpi.isPositive ? "text-emerald-600" : "text-red-500"}`}>
                    {kpi.isPositive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                    {kpi.diff}
                  </span>
                  <span className="text-[10px] text-custom-muted font-medium">
                    {kpi.desc}
                  </span>
                </div>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${kpi.color}`}>
                <Icon size={18} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Graph Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart Card */}
        <div className="lg:col-span-2 bg-custom-card border border-custom p-5 rounded-2xl shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-custom-main">
                Grafik Kinerja Penjualan ({period === "7days" ? "Harian" : period === "30days" ? "Mingguan" : "Bulanan"})
              </h3>
              <p className="text-[10px] text-custom-muted">
                Tren visual pertumbuhan omzet & volume pemesanan
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[10px] font-bold text-brand-primary">
                <span className="w-2 h-2 rounded-full bg-brand-primary inline-block"></span>
                Omzet Penjualan
              </span>
            </div>
          </div>

          {/* SVG Custom High-Fidelity Chart */}
          <div className="h-56 w-full flex items-end justify-between pt-8 px-2 border-b border-custom/60 pb-2 relative">
            {/* Grid Line Marks */}
            <div className="absolute left-0 right-0 top-1/4 border-t border-custom/10 pointer-events-none"></div>
            <div className="absolute left-0 right-0 top-2/4 border-t border-custom/10 pointer-events-none"></div>
            <div className="absolute left-0 right-0 top-3/4 border-t border-custom/10 pointer-events-none"></div>

            {graphData[period].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 group flex-1">
                <div className="relative w-8 sm:w-12 bg-custom-ter hover:bg-teal-50 dark:hover:bg-zinc-800 rounded-t-lg h-40 flex items-end justify-center overflow-hidden">
                  <div
                    style={{ height: `${item.value}%` }}
                    className="w-full bg-brand-primary hover:bg-brand-secondary rounded-t-md transition-all duration-500"
                  />
                  {/* Styled Tooltip hover */}
                  <div className="absolute bottom-full mb-1 scale-0 group-hover:scale-100 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-[9px] px-2 py-1 rounded-lg font-black transition-all duration-150 z-20 shadow-md flex flex-col items-center min-w-[65px] border border-custom">
                    <span>{item.revenue}</span>
                    <span className="text-[8px] text-custom-muted font-normal">{item.value} Pcs</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-custom-muted mt-1 select-none">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insight & Export Card */}
        <div className="bg-custom-card border border-custom p-5 rounded-2xl shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-brand-primary">
              <Sparkles size={16} />
              <h3 className="text-sm font-bold text-custom-main">
                Analisis Kinerja AI
              </h3>
            </div>
            
            <div className="p-3 bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900 rounded-xl space-y-2">
              <p className="font-bold text-teal-800 dark:text-teal-300 flex items-center gap-1 text-[11px]">
                🚀 Rekomendasi Pertumbuhan
              </p>
              <p className="text-[10px] text-teal-950/80 dark:text-teal-400/90 leading-relaxed">
                Penjualan Pempek meningkat <strong>25%</strong> pada akhir pekan. Disarankan mengaktifkan kampanye <em>Bundle Hemat Weekend</em> untuk memaksimalkan margin keuntungan.
              </p>
            </div>

            <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-xl space-y-2">
              <p className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1 text-[11px]">
                📊 Retensi Pembeli
              </p>
              <p className="text-[10px] text-amber-950/80 dark:text-amber-400/90 leading-relaxed">
                Rata-rata pembeli mengulangi pembelian (repeat order) dalam waktu <strong>14 hari</strong>. Mengirim kupon loyalitas otomatis via PasarNusa akan menjaga minat belanja.
              </p>
            </div>
          </div>

          <div className="space-y-2 border-t border-custom pt-4">
            <p className="font-bold text-[10px] text-custom-muted uppercase tracking-wider mb-2">Ekspor Laporan</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleExport("PDF")}
                className="py-2 border border-custom bg-custom-ter hover:bg-custom-card rounded-xl font-bold text-custom-muted hover:text-custom-main flex items-center justify-center gap-1.5 transition text-[11px]"
              >
                <Download size={13} />
                PDF Laporan
              </button>
              <button
                onClick={() => handleExport("CSV")}
                className="py-2 border border-custom bg-custom-ter hover:bg-custom-card rounded-xl font-bold text-custom-muted hover:text-custom-main flex items-center justify-center gap-1.5 transition text-[11px]"
              >
                <Download size={13} />
                Excel CSV
              </button>
            </div>
            <button
              onClick={() => window.print()}
              className="w-full py-2.5 bg-brand-primary text-white rounded-xl font-bold hover:opacity-90 transition flex items-center justify-center gap-2 mt-1 shadow-md shadow-teal-700/10"
            >
              <Printer size={14} />
              Cetak Dokumen Laporan
            </button>
          </div>
        </div>
      </div>

      {/* Transaction History Section */}
      <div className="bg-custom-card border border-custom rounded-2xl shadow-xs overflow-hidden">
        {/* Table Filter Controls */}
        <div className="p-5 border-b border-custom flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-custom-ter/15">
          <div>
            <h3 className="text-sm font-bold text-custom-main">
              Riwayat Transaksi Penjualan
            </h3>
            <p className="text-[10px] text-custom-muted">
              Daftar transaksi penjualan UMKM terdaftar
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {/* Search Input */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-custom-muted">
                <Search size={13} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari transaksi..."
                className="pl-9 pr-3 py-1.5 text-xs rounded-xl border border-custom bg-custom-ter focus:outline-none focus:border-brand-primary w-full sm:w-48 transition"
              />
            </div>

            {/* Category Dropdown */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-custom bg-custom-ter text-xs font-semibold text-custom-main"
            >
              <option value="Semua">Semua Pembayaran</option>
              <option value="QRIS">QRIS</option>
              <option value="Transfer Bank">Transfer Bank</option>
              <option value="E-Wallet">E-Wallet</option>
            </select>
          </div>
        </div>

        {/* Responsive Table Grid */}
        <div className="overflow-x-auto">
          {filteredTransactions.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-custom bg-custom-ter/30 text-[10px] uppercase font-bold text-custom-muted">
                  <th className="px-6 py-3.5">ID Transaksi</th>
                  <th className="px-6 py-3.5">Tanggal</th>
                  <th className="px-6 py-3.5">Pelanggan</th>
                  <th className="px-6 py-3.5">Produk</th>
                  <th className="px-6 py-3.5 text-right">Total Tagihan</th>
                  <th className="px-6 py-3.5">Metode</th>
                  <th className="px-6 py-3.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-custom text-xs">
                {filteredTransactions.map((trx) => (
                  <tr key={trx.id} className="hover:bg-custom-ter/10 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-custom-main">{trx.id}</td>
                    <td className="px-6 py-4 text-custom-muted">{trx.date}</td>
                    <td className="px-6 py-4 font-bold text-custom-main">{trx.customer}</td>
                    <td className="px-6 py-4 text-custom-muted max-w-xs truncate">{trx.products}</td>
                    <td className="px-6 py-4 text-right font-bold text-custom-main">
                      Rp {trx.amount.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4 font-semibold text-brand-primary">{trx.payment}</td>
                    <td className="px-6 py-4 text-center">{getStatusBadge(trx.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-10 text-center text-xs text-custom-muted space-y-2">
              <ShoppingBag size={30} className="mx-auto text-custom-muted opacity-40" />
              <p className="font-semibold">Tidak ada transaksi ditemukan</p>
              <p>Coba sesuaikan pencarian atau filter Anda.</p>
            </div>
          )}
        </div>

        {/* Pagination footer */}
        <div className="p-4 border-t border-custom flex items-center justify-between bg-custom-ter/10">
          <p className="text-[10px] text-custom-muted font-medium">
            Menampilkan 1-{filteredTransactions.length} dari {filteredTransactions.length} transaksi
          </p>
          <div className="flex gap-1.5">
            <button className="p-1 px-2.5 rounded-lg border border-custom bg-custom-ter hover:bg-custom-card transition text-[10px] text-custom-muted disabled:opacity-50" disabled>
              Sebelumnya
            </button>
            <button className="p-1 px-2.5 rounded-lg border border-custom bg-custom-ter hover:bg-custom-card transition text-[10px] text-custom-muted disabled:opacity-50" disabled>
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
