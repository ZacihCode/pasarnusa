export default function KategoriProduk() {
  const categories = [
    {
      name: "Makanan",
      desc: "Kuliner khas nusantara",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" />
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
      ),
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDg_fidBsYB4CTpueCYonyj06hpeVcklna_O54_67C3PB0EkKE_jjNY3zL1sW_aw5WBfvRs8W4xYrOwYu46dSXf1zwXn4jiQha1QpYSYRldU-T_0rtZvlVQtrx2Xfq6vYmdWFGaXSV3rgieK7vsJcYUzBSUYgEA12WQWGStt-ICBDrLswQ4gMf714seLeIxoH5SvPo39331UFUObxSxrA3g__-WF6JzYqjuB4vCpEyi-SLj0GbSm05STRifrQmA96LONqNtYna-dyA",
      count: "3.2K produk",
      color: "from-amber-900/80",
    },
    {
      name: "Songket & Batik",
      desc: "Warisan tenun tradisional",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z" />
        </svg>
      ),
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDdQfnbVg03xuz5Bpy0bN1yOwhXL_rHx59oaT_7P6smo2T4yfVsl0PSHmv_lqO_k_34m3m4HTBMkhgSH_OZk7BluBC3tAxIFX9bTfCVABCjutNHj0X7RIqlWWBKM5rqiS7i3Tne9Ga0pGPG7uwnWCkHsACcfqE3TJKlbBlsLlnEM7t-VmIp75vP91UdW10MWva_wtEKtwSoVO5vwQ4etaRW2waP1lbjLaUzVaLhmngNm7lklMbymRu-S01ocR-kK6DzRf7lC3Wn99g",
      count: "1.8K produk",
      color: "from-rose-900/80",
    },
    {
      name: "Kerajinan",
      desc: "Karya tangan pengrajin lokal",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m12 19 7-7 3 3-7 7-3-3z" />
          <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="m2 2 7.586 7.586" />
          <circle cx="11" cy="11" r="2" />
        </svg>
      ),
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDZ7d-wyi2-zDQBQGgD7aEWeUK5VFnnni_Ud_DdVZtN4YHKihbjDGBrRBfbiW3GnR5jjAtT6EMpFgjbRXoQ1zMfAiN0WhqASiN-U6hukoR7Bai0e3ppKGMY3XoiwBEBsB2mQH-tMafu-W7-VAViWPyQuxR-A2PV2VJtAP5qlplk-xKEwtuKLbVcF9vxgn2w45eu9hgCZHQ-Kzx36asRW2MJhA6j1-8NFnpIeZ_2eCvzwEDHYVF6XcVgMkPyG4WAJ80zdgN9u4sT-yc",
      count: "2.4K produk",
      color: "from-teal-900/80",
    },
    {
      name: "Oleh-oleh",
      desc: "Buah tangan khas daerah",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 12 20 22 4 22 4 12" />
          <rect x="2" y="7" width="20" height="5" />
          <line x1="12" y1="22" x2="12" y2="7" />
          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
      ),
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAbrw_8zYRjmZtud1Rn9BZF7sj_sRBFfp5FvhzNe57IhuJibXOydaEqpI_-dE7wSEFV5nLg9cYUIBg-wX-uSVYA-FlmLn_zev7FF8EmQ-_JPtuxY0B7eJ64BOkZf0gvqiD3qSz-xvZil1sh8jLW1kvbdJKyr7noIwiAB2nybWI8Bmn4LYCEA3iMuqFDgV_Aq4Hpha9KSq5AB-KploiB14w4-YqS-7ViDGj5Si2pB7-R6alSf8V8B-Xi0qpqM795DAg-G2hInlFK8U4",
      count: "980 produk",
      color: "from-indigo-900/80",
    },
  ];

  return (
    <section id="kategori" className="py-20 bg-custom-sec">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-semibold tracking-widest text-brand-primary uppercase mb-2 block">
              Kategori
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Kategori Produk
            </h2>
            <p className="text-custom-muted mt-1.5 text-base">
              Warisan budaya terbaik dalam satu genggaman
            </p>
          </div>
          <a
            href="/products"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-brand-primary hover:opacity-80 transition"
          >
            Lihat Semua
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t ${cat.color} via-black/20 to-transparent`}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center flex-shrink-0">
                    {cat.icon}
                  </div>
                  <h3 className="font-semibold text-base leading-tight">
                    {cat.name}
                  </h3>
                </div>
                <p className="text-white/65 text-xs">{cat.desc}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-white/50">{cat.count}</span>
                  <span className="text-xs text-white/80 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Jelajahi
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile "Lihat Semua" */}
        <div className="sm:hidden mt-6 text-center">
          <a
            href="#jelajahi"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-primary hover:opacity-80 transition"
          >
            Lihat Semua Kategori
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
