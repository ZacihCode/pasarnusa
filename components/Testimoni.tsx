"use client";

import { Quote, MessageCircle } from "lucide-react";

export default function Testimonials() {
  const testimonialsData = [
    {
      name: "Siti Aminah",
      role: "Pecinta Kuliner, Jakarta",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZftG3ACJp8iNPZ88uUy4edVInW7prXYckceB-qF76vRhDM7uFpoHXxybUONyAgqJdDXfaNd6lCnaLNaMm6e6NhAT1-hzRueL-jjV0voOkq0CwfR2kpPDqOIlOy-pIDQwnvNXZVKyLB0vfRzPTY8jzlV92tPnnK-J_cF5YXF4E_bSoo-lfzY7lZMG8A8DiVsWaAjKvU-rYLT1Cpag4qF21oZjDC5QnT_payUseOJq3Z9tgvoGQaawfrcAawl3cZh50HJza5PAOFRo",
      text: '"Pempeknya benar-benar terasa ikannya, cukonya juga mantap. Pengiriman ke Jakarta aman karena divacuum dengan sangat baik. Recomended!"',
    },
    {
      name: "Andi Pratama",
      role: "Arsitek, Bandung",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkd4QDtsabsP_ZZBNpLsqMGLYq7Cpo5R-vSsYuQrTAYYMgoQjC4c3kF3wqtJ3iXsNxhWPKAaWRJUImuNhv2J7s1ZhztmxeWBoBfcUpGcgoAqfu3uiHt03Npf8Y_LdlLok4q7bAWpaDCOnjZ-YsO1KnsxvlENQ05ZusahFVjPeuUxMKhKkABiNVl4KtA4KQAFabWC4mc70XaY629cRkdFaUrbjIpDg8vIn1bLy_WPMnMK5guRyBmCpn2-SJcUyfcWVWsSmSsBdOs88",
      text: '"Beli Songket untuk kado pernikahan adik, kualitasnya luar biasa. Motifnya sangat detail dan warnanya elegan. Terima kasih Smart UMKM!"',
    },
    {
      name: "Maya Sari",
      role: "Entrepreneur, Surabaya",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCloUefezV8gp1_zLbGhN7kxti2BpR-ODRhih_p3k4e5bLxtTOFECube7smvHnKhgHQNGt9_H06dY1QM_KjkU8wXEYEH6K0iSDNxqoUFg90kaiJ8cKsBKmfZMQRhg-vhodJQ7xBp75tE1G0fAq7tWP3L4woqpEV3kNPRxmYnchFbinD_fyW3kbcU3i2RTelPfQbQOEtU4Z1rDGnoXBr6_-hNDxlRv4F_HLphhsGSY2oSTc7TrWcsU",
      text: '"Kemplang panggangnya bikin nagih! Senang sekali sekarang bisa pesan produk UMKM Palembang langsung dari aplikasinya, sangat mudah."',
    },
  ];

  const extendedTestimonials = [
    ...testimonialsData,
    ...testimonialsData,
    ...testimonialsData,
  ];

  return (
    <section className="py-20 bg-custom-sec overflow-hidden border-b border-custom">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 mb-12 text-center space-y-3">
        <span className="text-sm font-bold text-brand-primary tracking-widest uppercase inline-flex items-center justify-center gap-2 select-none">
          <MessageCircle className="w-5 h-5 flex-shrink-0" strokeWidth={2.5} />
          <span className="leading-none">Suara Konsumen</span>
        </span>

        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Apa Kata Mereka?
        </h2>
        <p className="text-custom-muted max-w-xl mx-auto text-sm">
          Simak pengalaman langsung dari para pembeli yang telah bertransaksi
          dan merasakan kualitas produk asli nusantara.
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full flex items-center">
        {/* Gradasi Blur Samping Kiri & Kanan */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[var(--bg-secondary)] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[var(--bg-secondary)] to-transparent z-10 pointer-events-none"></div>

        {/* PERBAIKAN: Menggunakan 'animate-marquee-reverse' agar gerak berlawanan arah dengan section mitra */}
        <div className="animate-marquee-reverse gap-6 py-4 px-4">
          {extendedTestimonials.map((item, index) => (
            <div
              key={index}
              className="w-[320px] sm:w-[380px] bg-custom-card p-6 rounded-2xl border border-custom shadow-sm relative flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-brand-primary/30 flex-shrink-0"
            >
              {/* PERBAIKAN: Ukuran ikon Quote diubah jadi w-8 h-8 agar terlihat proporsional */}
              <Quote className="absolute top-4 right-6 w-4 h-4 text-brand-primary/10 transition-colors group-hover:text-brand-primary/20 pointer-events-none" />

              {/* Isi Konten Review */}
              <div className="space-y-4">
                <p className="text-sm text-custom-muted italic leading-relaxed pt-2">
                  {item.text}
                </p>

                {/* Profil User */}
                <div className="flex items-center gap-3 pt-4 border-t border-custom/60">
                  <div className="w-11 h-11 rounded-full overflow-hidden bg-custom-ter relative flex-shrink-0 border border-custom">
                    <img
                      src={item.img}
                      alt={`Foto profil ${item.name}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-custom-main">
                      {item.name}
                    </h4>
                    <p className="text-xs text-custom-muted">{item.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
