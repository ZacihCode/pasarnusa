"use client";

import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Tag,
  Calendar,
  MapPin,
  ArrowRight,
  Clock,
} from "lucide-react";

const SLIDES = [
  {
    type: "promo",
    badge: "🎉 Festival Musi",
    title: "Promo Kemerdekaan!",
    desc: "Diskon hingga 45% untuk seluruh produk kategori Songket dan Kriya pilihan.",
    cta: "Gunakan Voucher",
    discount: "45%",
    expiry: "Berakhir 31 Agt",
    bg: "from-teal-700 to-teal-500",
    accent: "bg-amber-400 text-amber-900",
    emoji: "🧵",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1600&q=80",
  },
  {
    type: "event",
    badge: "📍 Pameran UMKM",
    title: "Bazar Produk Lokal Palembang",
    desc: "Temukan ratusan produk UMKM terbaik dari seluruh Sumatera Selatan dalam satu tempat.",
    cta: "Daftar Sekarang",
    date: "12–14 Sep 2025",
    location: "Jakabaring Sport City",
    bg: "from-emerald-700 to-emerald-500",
    accent: "bg-white/20 text-white",
    emoji: "🏪",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1600&q=80",
  },
  {
    type: "promo",
    badge: "⚡ Flash Sale",
    title: "Harbolnas UMKM Lokal",
    desc: "Belanja produk asli Palembang mulai Rp 25.000. Gratis ongkir ke seluruh Indonesia.",
    cta: "Belanja Sekarang",
    discount: "Mulai 25K",
    expiry: "Hari ini saja",
    bg: "from-orange-600 to-amber-500",
    accent: "bg-white/20 text-white",
    emoji: "🛍️",
    image:
      "https://images.unsplash.com/photo-1481437156560-3205f6a55735?w=1600&q=80",
  },
];

export default function EventBanner() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startX = useRef<number | null>(null);
  const isDragging = useRef(false);

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
  };

  const goTo = (idx: number, dir: "left" | "right" = "right") => {
    if (animating || idx === current) return;

    setDirection(dir);
    setAnimating(true);
    resetTimer();
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 300);
  };

  const prev = () =>
    goTo((current - 1 + SLIDES.length) % SLIDES.length, "left");

  const next = () => goTo((current + 1) % SLIDES.length, "right");

  useEffect(() => {
    const startAutoSlide = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % SLIDES.length);
      }, 5000);
    };

    startAutoSlide();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const slide = SLIDES[current];

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || startX.current === null) return;

    const diff = e.clientX - startX.current;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        prev();
      } else {
        next();
      }
    }

    isDragging.current = false;
    startX.current = null;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    startX.current = null;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (startX.current === null) return;

    const diff = e.changedTouches[0].clientX - startX.current;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        prev();
      } else {
        next();
      }
    }

    startX.current = null;
  };

  return (
    <section className="py-16 bg-custom-main overflow-hidden">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-1">
              Promo & Event
            </p>
            <h2 className="text-2xl font-extrabold text-custom-main">
              Yang Sedang Berlangsung
            </h2>
          </div>
        </div>

        {/* Banner */}
        <div
          className="relative overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={`transition-all duration-500 ease-out ${
              animating
                ? direction === "right"
                  ? "-translate-x-4 opacity-0"
                  : "translate-x-4 opacity-0"
                : "translate-x-0 opacity-100"
            }`}
          >
            <div
              className={`relative overflow-hidden rounded-2xl min-h-[280px] flex items-center bg-gradient-to-br ${slide.bg}`}
            >
              {/* Navigation */}
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/25 transition-all duration-300"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/25 transition-all duration-300"
              >
                <ChevronRight size={20} />
              </button>
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20" />

              {/* Decoration */}
              <div className="absolute right-0 top-0 w-72 h-72 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/3" />
              <div className="absolute right-16 bottom-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/3" />

              <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[120px] opacity-10 select-none">
                {slide.emoji}
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 sm:p-10 md:p-14 max-w-lg pr-16">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full mb-4 ${slide.accent}`}
                >
                  {slide.badge}
                </span>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                  {slide.title}
                </h3>

                <p className="text-white/80 text-sm leading-relaxed mb-6">
                  {slide.desc}
                </p>

                <div className="flex flex-wrap gap-3 mb-6">
                  {slide.type === "promo" && (
                    <>
                      <span className="inline-flex items-center gap-1.5 text-xs text-white/80 bg-white/10 px-3 py-1.5 rounded-lg">
                        <Tag size={12} />
                        Diskon {slide.discount}
                      </span>

                      <span className="inline-flex items-center gap-1.5 text-xs text-white/80 bg-white/10 px-3 py-1.5 rounded-lg">
                        <Clock size={12} />
                        {slide.expiry}
                      </span>
                    </>
                  )}

                  {slide.type === "event" && (
                    <>
                      <span className="inline-flex items-center gap-1.5 text-xs text-white/80 bg-white/10 px-3 py-1.5 rounded-lg">
                        <Calendar size={12} />
                        {slide.date}
                      </span>

                      <span className="inline-flex items-center gap-1.5 text-xs text-white/80 bg-white/10 px-3 py-1.5 rounded-lg">
                        <MapPin size={12} />
                        {slide.location}
                      </span>
                    </>
                  )}
                </div>

                <button className="inline-flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-100 active:scale-95 transition-all">
                  {slide.cta}
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-5">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx, idx > current ? "right" : "left")}
              className={`rounded-full transition-all duration-300 ${
                idx === current
                  ? "w-6 h-2 bg-brand-primary"
                  : "w-2 h-2 bg-custom-ter border border-custom"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
