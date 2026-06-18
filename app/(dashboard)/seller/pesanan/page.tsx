"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function SellerOrders() {
  const [orders] = useState([
    {
      id: "TRX-90123",
      customer: "Budi Setiawan",
      date: "18 Juni 2026",
      items: "Pempek Kapal Selam (Isi 10) x1",
      total: 150000,
      status: "Perlu Diproses",
    },
    {
      id: "TRX-90124",
      customer: "Dewi Lestari",
      date: "17 Juni 2026",
      items: "Kemplang Panggang Khas Palembang (500gr) x2",
      total: 90000,
      status: "Sedang Dikirim",
    },
    {
      id: "TRX-90125",
      customer: "Irwan Syahputra",
      date: "15 Juni 2026",
      items: "Kain Songket Palembang Motif Lepus Emas x1",
      total: 2400000,
      status: "Selesai",
    },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-custom-main">Pesanan Pelanggan</h2>
        <p className="text-xs text-custom-muted">Kelola status pengiriman dan proses pesanan yang masuk</p>
      </div>

      <div className="bg-custom-card border border-custom rounded-2xl shadow-xs overflow-hidden">
        <div className="p-5 border-b border-custom flex items-center justify-between bg-custom-ter/10">
          <div className="relative flex-1 max-w-xs text-xs">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-custom-muted">
              <Search size={14} />
            </span>
            <input
              type="text"
              placeholder="Cari transaksi / pembeli..."
              className="pl-9 pr-4 py-2 w-full rounded-xl border border-custom bg-custom-ter text-xs focus:outline-none focus:border-brand-primary"
            />
          </div>
        </div>

        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-custom bg-custom-ter/20 font-bold uppercase text-custom-muted text-[10px]">
                <th className="px-6 py-4">ID Transaksi</th>
                <th className="px-6 py-4">Pelanggan</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Item</th>
                <th className="px-6 py-4">Total Belanja</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-custom">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-custom-ter/5 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-brand-primary">{o.id}</td>
                  <td className="px-6 py-4 text-custom-main font-semibold">{o.customer}</td>
                  <td className="px-6 py-4 text-custom-muted">{o.date}</td>
                  <td className="px-6 py-4 text-custom-main max-w-xs truncate">{o.items}</td>
                  <td className="px-6 py-4 font-semibold">Rp {o.total.toLocaleString("id-ID")}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        o.status === "Perlu Diproses"
                          ? "bg-amber-50 text-amber-600 dark:bg-amber-950/20"
                          : o.status === "Sedang Dikirim"
                            ? "bg-blue-50 text-blue-600 dark:bg-blue-950/20"
                            : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20"
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="px-3 py-1.5 bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white rounded-lg transition font-semibold text-[10px]">
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
