import { Star, ShoppingCart, Heart } from "lucide-react";
export default function Products() {
  const productList = [
    {
      name: "Pempek Kapal Selam (Isi 5)",
      cat: "Makanan",
      price: "Rp 75.000",
      rating: "4.9",
      sold: "1.2k Terjual",
      badge: "favorite",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBwnL-_GnSGQREne-2xPSgUpWefARMR_bvO2kU3Q6nOivHl-lXkfnkZg7AWxc1YEimiX-l9iLWxnbwlSdhQsZ0VpL_bzztHiCCoIBQcChM7lHQE0EykZHRr-97Rls5nEYnIW6pjLygMfkHtRGBPoSrpIn0GcU2Y_2yYnmuc9BHvfLqTIyNyQd1OxN1ArHSlALFyPZqg0f-kz3Sx91By3ZWVSkKcKDWhMW6GtR2uBXPoWNTXsj8xxtxS3Ea8rMLAvHMOHVd0pTYhc3o",
    },
    {
      name: "Syal Songket Limar Mas",
      cat: "Songket",
      price: "Rp 1.250.000",
      rating: "5.0",
      sold: "45 Terjual",
      badge: "premium",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjnyqVpBEn4-QDitN8HB8SauK0taNrviyg9jW8IhpclbZ9_LjyN7H2oqhtbKAC5pd9oIkkbsCNYCb09uJbhfYRR9zRPtNEEyV6T1PJRKDZN5lE3wcsjmYOioAC9GZiaZieBWik2SqN9am0Ovc_SE3WYUCIi0UtUwWNQnLb7OBbEYaSEb9jLnSjiTLYUZ1MRNXYwgzI8HKXNUBoKnzx2b8hCmpwKXYcbxzwTpzHWpkB1KaQX1IEBGaHkudqNZo71dL6xK48YdJ6iGY",
    },
    {
      name: "Kemplang Panggang Ikan",
      cat: "Makanan",
      price: "Rp 35.000",
      rating: "4.8",
      sold: "2.5k Terjual",
      badge: "favorite",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB84OwaBqRRl3_lGhiO0ZvJgLT9-BmcVbyv0gFowSpCxWp_k0svqwfywzuwb5UWF_1FOHGZMRKQunjlQkNBBkiZ4KWa3GW0MFqtUIAWK1rrZHfnvBPc3e1Ws-Vgs1i5K6lKyWbYUJR3yfJoGNLKwF4jHNWddec2bpLuTPhlcEr0GnMpZMveozuXKWDv-cJzizMu0qKEy8crrch6guv_VS591gKOITQ6LUwhJgZiJtr4gKZOD2oLf_FwOYJeqDcacQRpv3BNl3jS2Pg",
    },
    {
      name: "Paket Lenggang Panggang",
      cat: "Makanan",
      price: "Rp 45.000",
      rating: "4.9",
      sold: "890 Terjual",
      badge: "favorite",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_RMy0LzfOzq3Q6wQFgF3bpPNqHq0r38cRCCQm6t26QswwUjuuGLP_KkhFvj_e7dlefoCGtNyokcRFAGiMqephsps8mvJMWoOdnKt5x83bwdLQ_gMGQ8CyZcNr9zUPANz6oBQqKOBf1rAuTSBENV1uw_VDO1KAgpfkYSVJQJWRBU-cOFjhwR-JYn8gQa7Ou0Y6L5QdoqSdrLJ0b3-0Fz_4TG5N6O9pvVdHC5s6DxajMQPrGlrmwEFQokQ7Ydi-ht2FsEFiClpHZgA",
    },
  ];

  return (
    <section id="jelajahi" className="py-20 bg-custom-main">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-semibold tracking-widest text-brand-primary uppercase mb-2 block">
              Produk
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Produk Terlaris
            </h2>
            <p className="text-custom-muted mt-1.5 text-base">
              Belanja Produk Lokal Sekarang
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {productList.map((prod, index) => (
            <div
              key={index}
              className="bg-custom-card rounded-xl overflow-hidden border border-custom hover:shadow-xl transition-all group"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={prod.img}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {prod.badge === "premium" ? (
                  /* Badge Premium: Transparan dengan Efek Backdrop Blur (Glassmorphism) */
                  <span className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 bg-black/20 text-white rounded-md border border-white/20 backdrop-blur-md tracking-wide uppercase shadow-sm select-none">
                    Premium
                  </span>
                ) : (
                  /* Tombol Love: Menggunakan Lucide React, Terkunci Sempurna di Tengah */
                  <button className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 active:scale-90 transition-all shadow-sm group/btn">
                    <Heart className="w-4 h-4 transition-colors group-hover/btn:fill-red-500 group-hover/btn:text-red-500" />
                  </button>
                )}
              </div>
              {/* Body */}
              <div className="p-4">
                <p className="text-xs font-bold text-custom-muted uppercase tracking-widest mb-1">
                  {prod.cat}
                </p>
                <h4 className="font-bold text-base text-custom-main mb-2 truncate">
                  {prod.name}
                </h4>
                <div className="flex items-center gap-1.5 mb-3 text-sm">
                  <span style={{ color: "var(--brand-accent)" }}>
                    <Star />
                  </span>
                  <span className="font-semibold text-custom-main">
                    {prod.rating}
                  </span>
                  <span className="text-custom-muted text-xs">
                    ({prod.sold})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-brand-primary">
                    {prod.price}
                  </span>
                  <button
                    className="p-2 rounded-lg hover:opacity-80 active:scale-90 transition-all"
                    style={{
                      backgroundColor:
                        "color-mix(in srgb, var(--brand-primary) 15%, transparent)",
                      color: "var(--brand-primary)",
                    }}
                  >
                    <ShoppingCart />
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
