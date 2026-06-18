"use client";

import { useState } from "react";
import { Megaphone, Calendar, Plus, MapPin } from "lucide-react";

export default function PemkotEvents() {
  const [events] = useState([
    {
      id: "ev-1",
      title: "Festival Pempek Palembang 2026",
      date: "10 - 15 Juli 2026",
      location: "BKB (Benteng Kuto Besak)",
      status: "Mendatang",
      participants: 45,
    },
    {
      id: "ev-2",
      title: "Pameran Songket Agung Nusantara",
      date: "22 - 25 Juni 2026",
      location: "Palembang Icon Mall",
      status: "Berjalan",
      participants: 12,
    },
    {
      id: "ev-3",
      title: "Gebyar UMKM Sriwijaya",
      date: "05 Mei 2026",
      location: "Kambang Iwak Besak",
      status: "Selesai",
      participants: 110,
    },
  ]);

  return (
    <div className="space-y-6 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-custom-main flex items-center gap-2">
            <Megaphone size={22} className="text-brand-primary" />
            Promosi & Event Daerah
          </h2>
          <p className="text-xs text-custom-muted font-normal">
            Kelola event promosi pariwisata dan pameran khusus untuk pelaku UMKM lokal
          </p>
        </div>
        <button className="px-4 py-2.5 bg-brand-primary text-white rounded-xl text-xs font-bold transition flex items-center gap-2">
          <Plus size={14} />
          Buat Event Baru
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((ev) => (
          <div key={ev.id} className="bg-custom-card border border-custom p-5 rounded-2xl shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span
                  className={`inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                    ev.status === "Berjalan"
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20"
                      : ev.status === "Mendatang"
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-950/20"
                        : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800"
                  }`}
                >
                  {ev.status}
                </span>
                <span className="text-[10px] text-custom-muted">{ev.participants} UMKM Terdaftar</span>
              </div>
              <h4 className="font-bold text-sm text-custom-main leading-snug">{ev.title}</h4>
            </div>

            <div className="space-y-1.5 text-custom-muted">
              <p className="flex items-center gap-1.5">
                <Calendar size={13} className="text-brand-primary" />
                {ev.date}
              </p>
              <p className="flex items-center gap-1.5">
                <MapPin size={13} className="text-brand-primary" />
                {ev.location}
              </p>
            </div>

            <button className="w-full py-2 bg-custom-ter hover:bg-custom-card border border-custom rounded-xl font-bold transition">
              Kelola Peserta
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
