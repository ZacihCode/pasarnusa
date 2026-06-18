"use client";

import { BarChart3, Sparkles } from "lucide-react";

export default function PemkotStats() {
  const sectors = [
    { name: "Kuliner (Makanan & Minuman)", count: 720, percentage: 65, color: "bg-orange-500" },
    { name: "Fashion & Kain Tradisional", count: 240, percentage: 22, color: "bg-purple-500" },
    { name: "Kerajinan & Seni Rupa", count: 98, percentage: 9, color: "bg-teal-500" },
    { name: "Lain-lain (Jasa & Pertanian)", count: 44, percentage: 4, color: "bg-zinc-500" },
  ];

  return (
    <div className="space-y-6 text-xs">
      <div>
        <h2 className="text-xl font-bold text-custom-main flex items-center gap-2">
          <BarChart3 size={22} className="text-brand-primary" />
          Statistik Wilayah & Sektor Usaha
        </h2>
        <p className="text-xs text-custom-muted">
          Pantau penyebaran usaha mikro, kecil, dan menengah di setiap kecamatan Kota Palembang
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sektor Usaha */}
        <div className="md:col-span-2 bg-custom-card border border-custom p-6 rounded-2xl shadow-xs space-y-4">
          <div>
            <h4 className="font-bold text-sm text-custom-main">Dominasi Kategori Sektor Usaha</h4>
            <p className="text-[10px] text-custom-muted">Breakdown perbandingan kategori produk lokal</p>
          </div>

          <div className="space-y-4">
            {sectors.map((s, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-center font-semibold text-custom-main">
                  <span>{s.name}</span>
                  <span className="text-custom-muted">
                    {s.count} UMKM <span className="text-[10px] font-normal">({s.percentage}%)</span>
                  </span>
                </div>
                <div className="w-full bg-custom-ter rounded-full h-2 overflow-hidden">
                  <div
                    style={{ width: `${s.percentage}%` }}
                    className={`${s.color} h-full rounded-full transition-all duration-500`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insight Sidebar */}
        <div className="bg-custom-card border border-custom p-5 rounded-2xl shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-1.5 text-brand-primary font-bold">
              <Sparkles size={16} />
              <h4>Rekomendasi Distribusi AI</h4>
            </div>
            <p className="text-custom-muted leading-relaxed mt-2 text-[11px]">
              AI mendeteksi konsentrasi kuliner (65%) terlalu padat di wilayah pusat kota. Pemkot direkomendasikan mengalihkan program bantuan modal ke subsektor Kerajinan Khas (Batik & Tenun Songket) di area pinggiran sungai Musi untuk menyeimbangkan perekonomian pariwisata.
            </p>
          </div>
          <button className="w-full py-2 bg-brand-primary text-white font-bold rounded-xl hover:opacity-90 transition shadow-sm">
            Buat Program Sosialisasi
          </button>
        </div>
      </div>
    </div>
  );
}
