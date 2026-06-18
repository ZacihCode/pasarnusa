"use client";

import { useState, useEffect, useRef } from "react";
import {
  Link2,
  Sparkles,
  ShieldCheck,
  MapPin,
  Tag,
  Store,
  Eye,
  Heart,
  TrendingUp,
  Bookmark,
  Loader2,
  Bot,
} from "lucide-react";

const EXAMPLE_CHIPS = [
  { label: "🍢 Pempek Palembang", link: "https://tiktok.com/@pempekpalembang" },
  { label: "🥩 Rendang Padang", link: "https://instagram.com/rendangminang" },
  {
    label: "🧵 Songket Palembang",
    link: "https://tiktok.com/@songketpalembang",
  },
];

export default function AIDiscovery() {
  const [url, setUrl] = useState("https://tiktok.com/@pempekasli/video/xxxx");
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(true);
  const [scoreWidth, setScoreWidth] = useState(0);
  const barRef = useRef(null);

  useEffect(() => {
    if (showResult && !loading) {
      const timeout = setTimeout(() => setScoreWidth(97), 100);
      return () => clearTimeout(timeout);
    } else {
      setScoreWidth(0);
    }
  }, [showResult, loading]);

  const handleAnalyze = () => {
    setLoading(true);
    setShowResult(false);
    setTimeout(() => {
      setLoading(false);
      setShowResult(true);
    }, 1800);
  };

  return (
    <section id="ai-discovery" className="py-20 bg-custom-sec">
      <div className="max-w-3xl mx-auto px-4 text-center">
        {/* Label */}
        <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-brand-primary bg-teal-50 border border-teal-200 px-3 py-1.5 rounded-full mb-4">
          <Bot size={13} />
          Teknologi AI
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 leading-snug">
          Temukan Produk Lokal dengan{" "}
          <span className="text-brand-primary">AI Discovery Engine</span>
        </h2>
        <p className="text-custom-muted text-sm max-w-md mx-auto mb-10 leading-relaxed">
          Tempel link video TikTok atau Instagram — AI kami langsung
          menganalisis dan mengidentifikasi produk UMKM lokal secara otomatis.
        </p>

        {/* Card */}
        <div className="bg-custom-card border border-custom rounded-2xl p-6 sm:p-8 shadow-lg text-left space-y-5">
          {/* Input */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-custom-muted mb-2">
              <Link2 size={13} className="text-brand-primary" />
              Analisis Produk dari URL
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-custom-muted">
                  <Link2 size={15} />
                </span>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Masukkan URL TikTok / Instagram..."
                  className="w-full pl-9 pr-4 py-3 rounded-xl bg-custom-ter border border-custom focus:outline-none focus:border-brand-primary text-sm transition-colors"
                />
              </div>
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="px-5 py-3 rounded-xl bg-brand-primary text-white font-semibold text-sm hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 whitespace-nowrap"
              >
                {loading ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Menganalisis...
                  </>
                ) : (
                  <>
                    <Sparkles size={15} />
                    Analisis
                  </>
                )}
              </button>
            </div>

            {/* Chips */}
            <div className="flex items-center gap-2 mt-3 flex-wrap text-xs text-custom-muted">
              <span>Coba contoh:</span>
              {EXAMPLE_CHIPS.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => setUrl(chip.link)}
                  className="px-3 py-1 rounded-full bg-custom-ter border border-custom hover:border-brand-primary hover:text-brand-primary transition-colors"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center gap-3 py-8 border-t border-custom">
              <div className="w-9 h-9 rounded-full border-[3px] border-custom-ter border-t-brand-primary animate-spin" />
              <p className="text-sm text-custom-muted font-medium">
                Menganalisis konten video...
              </p>
            </div>
          )}

          {/* Result */}
          {showResult && !loading && (
            <div className="pt-5 border-t border-custom space-y-5">
              {/* Result header */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
                  Analisis selesai &nbsp;·&nbsp; Akurasi tinggi
                </div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-brand-primary bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full">
                  <ShieldCheck size={12} />
                  AI Verified
                </div>
              </div>

              {/* Product */}
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <div className="w-16 h-16 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-3xl flex-shrink-0">
                  🍢
                </div>
                <div className="flex-1 space-y-3">
                  <h3 className="text-xl font-extrabold text-custom-main">
                    Pempek Kapal Selam
                  </h3>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-custom-muted bg-custom-ter border border-custom px-2.5 py-1 rounded-lg">
                      <MapPin size={11} className="text-brand-primary" />
                      Palembang, Sumatera Selatan
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-custom-muted bg-custom-ter border border-custom px-2.5 py-1 rounded-lg">
                      <Tag size={11} className="text-amber-500" />
                      Kuliner Khas
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-custom-muted bg-custom-ter border border-custom px-2.5 py-1 rounded-lg">
                      <Store size={11} />
                      UMKM Terverifikasi
                    </span>
                  </div>

                  {/* Score bar */}
                  <div className="space-y-1.5 max-w-xs">
                    <div className="flex justify-between text-xs font-semibold text-custom-muted">
                      <span>Skor Akurasi AI</span>
                      <span className="text-brand-primary">97%</span>
                    </div>
                    <div className="w-full h-2 bg-custom-ter rounded-full overflow-hidden border border-custom">
                      <div
                        ref={barRef}
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${scoreWidth}%`,
                          background:
                            "linear-gradient(90deg, var(--brand-primary), var(--brand-secondary))",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Eye, label: "Estimasi Views", val: "2.4M" },
                  { icon: Heart, label: "Engagement", val: "98K" },
                  { icon: TrendingUp, label: "Potensi Pasar", val: "Tinggi" },
                ].map(({ icon: Icon, label, val }) => (
                  <div
                    key={label}
                    className="bg-custom-sec border border-custom rounded-xl p-3 text-center"
                  >
                    <Icon
                      size={18}
                      className="text-brand-primary mx-auto mb-1"
                    />
                    <p className="text-base font-extrabold text-custom-main leading-tight">
                      {val}
                    </p>
                    <p className="text-[10px] text-custom-muted mt-0.5">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3 justify-end pt-1">
                <button className="flex items-center gap-2 px-4 py-2 border border-custom rounded-xl text-xs font-semibold text-custom-muted hover:border-brand-primary hover:text-brand-primary transition-colors">
                  <Store size={14} />
                  Lihat UMKM
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-xl text-xs font-semibold hover:opacity-90 active:scale-95 transition-all">
                  <Bookmark size={14} />
                  Simpan Produk
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
