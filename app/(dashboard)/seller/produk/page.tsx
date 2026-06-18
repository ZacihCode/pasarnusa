"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  Filter,
  LayoutGrid,
  List,
  Star,
  Package,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sales: number;
  status: "verified" | "pending";
  aiScore: number;
  rating: number;
  img: string;
}

export default function SellerProducts() {
  const [viewMode, setViewMode] = useState<"table" | "grid">("grid");
  const [products] = useState<Product[]>([
    {
      id: "prod-1",
      name: "Pempek Kapal Selam Asli Belida (Isi 10)",
      category: "Kuliner",
      price: 150000,
      stock: 45,
      sales: 124,
      status: "verified",
      aiScore: 98,
      rating: 4.9,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBwnL-_GnSGQREne-2xPSgUpWefARMR_bvO2kU3Q6nOivHl-lXkfnkZg7AWxc1YEimiX-l9iLWxnbwlSdhQsZ0VpL_bzztHiCCoIBQcChM7lHQE0EykZHRr-97Rls5nEYnIW6pjLygMfkHtRGBPoSrpIn0GcU2Y_2yYnmuc9BHvfLqTIyNyQd1OxN1ArHSlALFyPZqg0f-kz3Sx91By3ZWVSkKcKDWhMW6GtR2uBXPoWNTXsj8xxtxS3Ea8rMLAvHMOHVd0pTYhc3o",
    },
    {
      id: "prod-2",
      name: "Kain Songket Palembang Motif Lepus Emas",
      category: "Fashion & Batik",
      price: 2400000,
      stock: 5,
      sales: 12,
      status: "verified",
      aiScore: 95,
      rating: 5.0,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjnyqVpBEn4-QDitN8HB8SauK0taNrviyg9jW8IhpclbZ9_LjyN7H2oqhtbKAC5pd9oIkkbsCNYCb09uJbhfYRR9zRPtNEEyV6T1PJRKDZN5lE3wcsjmYOioAC9GZiaZieBWik2SqN9am0Ovc_SE3WYUCIi0UtUwWNQnLb7OBbEYaSEb9jLnSjiTLYUZ1MRNXYwgzI8HKXNUBoKnzx2b8hCmpwKXYcbxzwTpzHWpkB1KaQX1IEBGaHkudqNZo71dL6xK48YdJ6iGY",
    },
    {
      id: "prod-3",
      name: "Kemplang Panggang Khas Palembang (500gr)",
      category: "Kuliner",
      price: 45000,
      stock: 120,
      sales: 340,
      status: "verified",
      aiScore: 92,
      rating: 4.8,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB84OwaBqRRl3_lGhiO0ZvJgLT9-BmcVbyv0gFowSpCxWp_k0svqwfywzuwb5UWF_1FOHGZMRKQunjlQkNBBkiZ4KWa3GW0MFqtUIAWK1rrZHfnvBPc3e1Ws-Vgs1i5K6lKyWbYUJR3yfJoGNLKwF4jHNWddec2bpLuTPhlcEr0GnMpZMveozuXKWDv-cJzizMu0qKEy8crrch6guv_VS591gKOITQ6LUwhJgZiJtr4gKZOD2oLf_FwOYJeqDcacQRpv3BNl3jS2Pg",
    },
    {
      id: "prod-4",
      name: "Ukiran Kayu Khas Palembang Motif Bunga Melati",
      category: "Kerajinan",
      price: 750000,
      stock: 3,
      sales: 2,
      status: "pending",
      aiScore: 89,
      rating: 4.5,
      img: "https://cdn.aceimg.com/W6DtV9UeS.png",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 text-xs">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-custom-main">Kelola Produk Anda</h2>
          <p className="text-xs text-custom-muted">Kelola stok, harga, dan lihat kecocokan visual katalog</p>
        </div>
        <button className="self-start sm:self-auto px-4 py-2.5 bg-brand-primary text-white hover:opacity-90 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md shadow-teal-700/10">
          <Plus size={14} />
          Tambah Produk Baru
        </button>
      </div>

      {/* Control panel (Search & view toggle) */}
      <div className="bg-custom-card border border-custom p-4 rounded-2xl shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-xs">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-custom-muted">
            <Search size={14} />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari produk..."
            className="pl-9 pr-4 py-2 w-full rounded-xl border border-custom bg-custom-ter text-xs focus:outline-none focus:border-brand-primary transition"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Filter button */}
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-custom bg-custom-ter hover:bg-custom-card transition text-xs font-semibold text-custom-muted">
            <Filter size={14} />
            Filter
          </button>

          {/* View mode toggle switcher */}
          <div className="flex bg-custom-ter p-1 rounded-xl border border-custom">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === "grid"
                  ? "bg-brand-primary text-white shadow-sm"
                  : "text-custom-muted hover:text-custom-main"
              }`}
              title="Katalog Grid (Desain Pembeli)"
            >
              <LayoutGrid size={15} />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === "table"
                  ? "bg-brand-primary text-white shadow-sm"
                  : "text-custom-muted hover:text-custom-main"
              }`}
              title="Tabel Detail"
            >
              <List size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Catalog Grid View (Consistent with Buyer/Customer UI) */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-custom-card rounded-2xl overflow-hidden border border-custom hover:shadow-lg transition-all group flex flex-col justify-between"
            >
              {/* Product Image and status badges */}
              <div className="relative h-44 overflow-hidden bg-custom-ter">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Status Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  {p.status === "verified" ? (
                    <span className="text-[9px] font-bold px-2 py-0.5 bg-emerald-500/90 text-white rounded-md backdrop-blur-xs shadow-sm uppercase">
                      Aktif
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold px-2 py-0.5 bg-amber-500/90 text-white rounded-md backdrop-blur-xs shadow-sm uppercase">
                      Verifikasi
                    </span>
                  )}
                  <span className="text-[9px] font-bold px-2 py-0.5 bg-brand-primary/90 text-white rounded-md backdrop-blur-xs shadow-sm">
                    AI: {p.aiScore}%
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-custom-muted uppercase tracking-widest">
                    {p.category}
                  </p>
                  <h4 className="font-bold text-sm text-custom-main line-clamp-2 leading-snug">
                    {p.name}
                  </h4>
                </div>

                {/* Rating matching buyer design */}
                <div className="flex items-center gap-1 text-[11px] font-semibold">
                  <span className="text-amber-500">
                    <Star size={12} className="fill-amber-500" />
                  </span>
                  <span className="text-custom-main">{p.rating.toFixed(1)}</span>
                  <span className="text-custom-muted font-normal">
                    ({p.sales} Terjual)
                  </span>
                </div>

                {/* Pricing and Action buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-custom">
                  <div className="space-y-0.5">
                    <p className="text-[9px] text-custom-muted">Harga Jual</p>
                    <p className="font-extrabold text-brand-primary text-sm">
                      Rp {p.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      className="p-1.5 rounded-lg border border-custom bg-custom-ter hover:bg-custom-card transition text-custom-muted hover:text-custom-main"
                      title="Edit Produk"
                    >
                      <Edit size={13} />
                    </button>
                    <button
                      className="p-1.5 rounded-lg border border-custom bg-custom-ter hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/20 transition text-custom-muted"
                      title="Hapus Produk"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                {/* Stock info banner */}
                <div className="pt-2 flex items-center gap-1.5 text-[10px] text-custom-muted bg-custom-ter/50 p-2 rounded-xl border border-custom/60">
                  <Package size={11} className="text-brand-primary" />
                  <span>Stok Toko: <strong>{p.stock} pcs</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Traditional Table View */
        <div className="bg-custom-card border border-custom rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-custom bg-custom-ter/20 font-bold uppercase text-custom-muted text-[10px]">
                  <th className="px-6 py-4">Produk</th>
                  <th className="px-6 py-4">Kategori</th>
                  <th className="px-6 py-4">Harga</th>
                  <th className="px-6 py-4">Stok</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Akurasi AI</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-custom">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-custom-ter/5 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img
                        src={p.img}
                        alt={p.name}
                        className="w-10 h-10 object-cover rounded-lg border border-custom"
                      />
                      <div>
                        <p className="font-bold text-custom-main">{p.name}</p>
                        <p className="text-[10px] text-custom-muted">Rating: ⭐ {p.rating} ({p.sales} terjual)</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-custom-muted">{p.category}</td>
                    <td className="px-6 py-4 font-semibold">Rp {p.price.toLocaleString("id-ID")}</td>
                    <td className="px-6 py-4 text-custom-muted">{p.stock} pcs</td>
                    <td className="px-6 py-4">
                      {p.status === "verified" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600">
                          <CheckCircle size={10} />
                          Aktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/20 text-amber-600">
                          <Clock size={10} />
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-bold text-brand-primary">{p.aiScore}%</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 rounded-lg border border-custom bg-custom-ter hover:bg-custom-card transition text-custom-muted">
                          <Edit size={12} />
                        </button>
                        <button className="p-1.5 rounded-lg border border-custom bg-custom-ter hover:bg-red-50 text-custom-muted hover:text-red-600 transition">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
