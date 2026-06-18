"use client";
import { Handshake } from "lucide-react";
export default function Partners() {
  const partnersData = [
    {
      name: "Pempek Cek Molek",
      desc: "Pelopor Pempek Vacuum kemasan premium sejak 1995. Terjamin higienis dan rasa otentik.",
      logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJdKoCijMPdZSv2gQpmK5kVcf376IX8IAlY-WUByK5F6SoMibhCkZu1Wxhf6x-uQkHf2eBZmRorTGAM8f-UnwIJZ2Cs1NiP78PKTPQEmZNxAdRrOgZjnkgrpLzbSW4JngSIzdGyasBxoMZbBEl-lGBJILSn66ba9srEnzAuhg_1-sp6-0DprvDs5bDoRgDzFyNUh5FqLKNFvU1VfnRHp1QTm1cpYyUFkWGEvAz_Bwy9DlqgwaZNL_KenNGYg12oMH3eWpoQxrfLrY",
      alt: "Logo Pempek Cek Molek - Palembang",
    },
    {
      name: "Rumah Songket Anna",
      desc: "Tenun tangan asli perajin lokal dengan benang emas berkualitas tinggi. Warisan budaya Palembang.",
      logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-Y8saTpeoSxIf7s_zlrotpUK-cSo3UcfC5W_HG6N-Wel4g2PluA7uTUBTGtE_fAhJ1ZufNZNQJV_qx1rgDaI3dR97jpL_yDa6q2cK-wOT9ObuOTIz60_F1mVs1iHmamvU_KfzdjljIM1F63TzUHzkejqpuV8QVMR9t1nKZ1jg8VAy67M-oBsWjegFUgCUCGgFoKwd2YvgMD1ajR-UfowXT0uBQPeMFCcDqLTsxuzFUUoHK2SF9Dc1TIfQKVwDNHav_c54qYkI9YU",
      alt: "Logo Rumah Songket Anna - Palembang",
    },
    {
      name: "Galeri Kriya Musi",
      desc: "Pusat kerajinan tangan, ukiran kayu, dan aksesoris khas Sumatera Selatan terlengkap.",
      logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDm3z4hBJjs35nCJ27TsxkRq2uxKQU1Nw2ucSj0gP3MaBBYaY0iv7rNIh6ftDj7SMTpVDoyjEy_79fwmLF5JuLlyQc_7SJZwsZlw1K5e-jpFiUWBk4tQrGGW6zu3aWG49JpLtvwqXbeRYEl_Yju5wdZyjN2xoylu_t14jWkHkKXFagXggugqpEV3kNPRxmYnchFbinD_fyW3kbcU3i2RTelPfQbQOEtU4Z1rDGnoXBr6_-hNDxlRv4F_HLphhsGSY2oSTc7TrWcsU",
      alt: "Logo Galeri Kriya Musi - Palembang",
    },
  ];

  // Duplikasi data agar efek scroller berjalan mulus tanpa jeda kosong (seamless loop)
  const extendedPartners = [...partnersData, ...partnersData, ...partnersData];

  return (
    <section className="py-20 bg-custom-sec overflow-hidden border-t border-b border-custom">
      <div className="max-w-7xl mx-auto px-4 mb-12 text-center space-y-3">
        <span className="text-sm font-bold text-brand-primary tracking-widest uppercase flex items-center justify-center gap-2">
          <Handshake className="w-5 h-5 flex-shrink-0" /> Jaringan UMKM
        </span>

        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Mitra Unggulan Kami
        </h2>
        <p className="text-custom-muted max-w-xl mx-auto text-sm">
          Didukung oleh pelaku usaha lokal terbaik yang telah terverifikasi
          kualitas dan keaslian produknya oleh AI.
        </p>
      </div>

      {/* Marquee Wrapper Area */}
      <div className="relative w-full flex items-center Masking-Effect">
        {/* Efek Fade Gradasi Halus di Kiri & Kanan Scroller */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[var(--bg-secondary)] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[var(--bg-secondary)] to-transparent z-10 pointer-events-none"></div>

        {/* Jalur Bergerak Card */}
        <div className="animate-marquee gap-6 py-4 px-4">
          {extendedPartners.map((partner, index) => (
            <div
              key={index}
              className="w-[300px] sm:w-[350px] bg-custom-card p-6 rounded-2xl border border-custom shadow-sm flex flex-col items-center text-center group transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-brand-primary/40 flex-shrink-0"
            >
              {/* Wadah Foto Logo */}
              <div className="w-20 h-20 rounded-full overflow-hidden bg-custom-ter mb-4 border-4 border-brand-primary/10 relative transition-transform duration-300 group-hover:scale-105">
                <img
                  src={partner.logo}
                  alt={partner.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Info Mitra */}
              <div className="flex-1 space-y-2 flex flex-col justify-between w-full">
                <div>
                  <h4 className="font-bold text-lg text-custom-main transition-colors group-hover:text-brand-primary">
                    {partner.name}
                  </h4>
                  <p className="text-xs text-custom-muted leading-relaxed line-clamp-3 pt-1">
                    {partner.desc}
                  </p>
                </div>

                {/* Button Aksi */}
                <div className="pt-4 border-t border-custom/60 w-full flex justify-center">
                  <button className="text-xs font-bold text-brand-primary flex items-center cursor-pointer gap-1.5 transition-all group-hover:gap-3">
                    <span>Kunjungi Toko</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="transition-transform"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
