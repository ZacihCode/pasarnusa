export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10 opacity-30 pointer-events-none"></div>
      <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
        <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-bold tracking-wider">
          🚀 BERGABUNG SEKARANG
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
          Siap Menjelajahi Produk Lokal Indonesia?
        </h2>
        <p className="text-white/80 max-w-xl mx-auto text-sm sm:text-base">
          Bergabunglah dengan 85.000+ pengguna yang sudah menemukan keindahan
          produk lokal Indonesia bersama PasarNusantara.
        </p>
        <div className="flex flex-wrap gap-4 justify-center pt-2">
          <a
            href="#jelajahi"
            className="px-6 py-3 bg-white text-gray-900 font-bold rounded-xl shadow-lg hover:bg-gray-50 transition text-sm"
          >
            Mulai Sekarang — Gratis
          </a>
          <a
            href="#ai-discovery"
            className="px-6 py-3 border border-white/40 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition text-sm"
          >
            Lihat Demo AI
          </a>
        </div>
      </div>
    </section>
  );
}
