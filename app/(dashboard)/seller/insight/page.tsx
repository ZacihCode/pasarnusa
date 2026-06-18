"use client";

import { useState } from "react";
import { Sparkles, TrendingUp, HelpCircle, Star, RefreshCw } from "lucide-react";

export default function SellerInsights() {
  const [loading, setLoading] = useState(false);

  const triggerRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-custom-main flex items-center gap-2">
            <Sparkles size={22} className="text-brand-primary animate-pulse" />
            Rekomendasi & Insight AI
          </h2>
          <p className="text-xs text-custom-muted">
            Analisis kecerdasan bisnis untuk meningkatkan visibilitas dan penjualan produk lokal Anda
          </p>
        </div>
        <button
          onClick={triggerRefresh}
          className="p-2 border border-custom bg-custom-card hover:bg-custom-ter rounded-xl transition text-custom-muted"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        {/* Recommendation Cards */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-custom-card border border-custom p-5 rounded-2xl shadow-xs space-y-3">
            <div className="flex items-center gap-1.5 text-brand-primary font-bold">
              <TrendingUp size={16} />
              <h4>Analisis Tren Pasar Palembang</h4>
            </div>
            <p className="text-custom-muted leading-relaxed">
              Berdasarkan tren pencarian web dan sosial media di wilayah Sumatera Selatan, produk olahan ikan seperti <strong>Pempek Kulit Crispy</strong> dan <strong>Tekwan Kering</strong> mengalami peningkatan minat pembeli sebesar <strong>24%</strong> minggu ini. Anda direkomendasikan untuk menaruh produk sejenis di etalase teratas.
            </p>
            <div className="pt-2 border-t border-custom flex justify-between items-center text-[10px] text-custom-muted">
              <span>Sumber data: Google Trends & AI Discovery</span>
              <span className="font-bold text-brand-primary">Update 1 jam lalu</span>
            </div>
          </div>

          <div className="bg-custom-card border border-custom p-5 rounded-2xl shadow-xs space-y-3">
            <div className="flex items-center gap-1.5 text-amber-600 font-bold">
              <Star size={16} />
              <h4>Skor Kualitas Konten Toko</h4>
            </div>
            <p className="text-custom-muted leading-relaxed">
              Foto produk Kain Songket Anda dinilai sangat baik oleh AI. Namun, Anda dapat meningkatkan penjualan hingga <strong>18%</strong> dengan menambahkan deskripsi cerita sejarah pembuatan motif tenun tersebut untuk menarik minat pembeli budaya (Storytelling Marketing).
            </p>
            <button className="px-3 py-1.5 bg-brand-primary text-white rounded-lg font-bold text-[10px] self-start transition hover:opacity-90">
              Perbaiki Deskripsi Sekarang
            </button>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="bg-custom-card border border-custom p-5 rounded-2xl shadow-xs space-y-4">
          <h4 className="font-bold text-custom-main">Cara Kerja Insight AI</h4>
          <p className="text-custom-muted leading-relaxed text-[11px]">
            AI PasarNusantara memindai media sosial lokal, database transaksi, dan interaksi pengguna di aplikasi untuk memetakan produk mana yang sedang dicari.
          </p>
          <div className="p-3 bg-custom-ter rounded-xl border border-custom flex gap-2">
            <HelpCircle size={15} className="text-brand-primary flex-shrink-0 mt-0.5" />
            <p className="text-[10px] text-custom-muted leading-relaxed">
              Semakin lengkap dokumen verifikasi dan detail profil UMKM Anda, semakin tinggi tingkat prioritas AI untuk merekomendasikan produk Anda kepada calon pembeli.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
