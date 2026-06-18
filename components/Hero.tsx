export default function Hero() {
  return (
    <section
      id="beranda"
      className="pt-32 pb-20 relative overflow-hidden min-h-screen flex items-center"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA2Tk1g3DZnct-MjWOhKde0s-AlVDi8oT9_IS88wlCQcdJvplX6i_7O6-aty_WVejHlsF_p3b--r3EfeUHenjdB7cG--yN6hOxDoNVGfMkkslY2M8iqVabpDPRhIrLHAiMgZSm1iv23FLtTFef07PUGspJKDTehT7PJwxaoPkqAw_2E9PejHaRTNoyk0K56SxuA4WAPnEecpw_8gYBs4u6gAYxu0tC_2nE3ZjkQOQkJY7uuoAGhuq25QzYPLRsVjA4TZ1cKmxvUeIU')",
        }}
      />

      {/* Overlay gradient - gelap di bawah supaya teks terbaca */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/30" />

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10 w-full">
        {/* Left Content */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            AI-Powered Platform Indonesia
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Temukan Produk Lokal Indonesia
            <br />
            <span className="text-emerald-400">dengan AI</span>
          </h1>

          <p className="text-lg text-white/70 max-w-xl leading-relaxed">
            Jelajahi ribuan UMKM, kuliner khas daerah, dan produk budaya
            Indonesia melalui teknologi AI dan peta interaktif yang cerdas.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#jelajahi"
              className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-medium flex items-center gap-2 hover:bg-emerald-700 transition shadow-lg shadow-emerald-900/40"
            >
              <span>Mulai Jelajah</span>
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#ai-discovery"
              className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/25 text-white font-medium flex items-center gap-2 hover:bg-white/20 transition"
            >
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-emerald-400"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>Lihat Demo</span>
            </a>
          </div>

          {/* Stats */}
          <div className="pt-6 border-t border-white/15 flex gap-8">
            <div>
              <strong className="text-2xl font-bold block text-white">
                12.5K+
              </strong>
              <span className="text-sm text-white/55">UMKM Terdaftar</span>
            </div>
            <div className="w-px bg-white/15 self-stretch" />
            <div>
              <strong className="text-2xl font-bold block text-white">
                85K+
              </strong>
              <span className="text-sm text-white/55">Pengguna Aktif</span>
            </div>
            <div className="w-px bg-white/15 self-stretch" />
            <div>
              <strong className="text-2xl font-bold block text-white">
                150+
              </strong>
              <span className="text-sm text-white/55">Kota di Indonesia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
