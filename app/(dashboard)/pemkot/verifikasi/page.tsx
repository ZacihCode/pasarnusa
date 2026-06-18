"use client";

import { useState } from "react";
import { ShieldCheck, Eye, Check, X, MapPin, Search } from "lucide-react";

export default function PemkotVerification() {
  const [requests, setRequests] = useState([
    {
      id: "req-1",
      businessName: "Pempek Bu Yanti",
      ownerName: "Yanti Rahayu",
      category: "Kuliner",
      kecamatan: "Ilir Barat I",
      nib: "912000342918",
      status: "pending",
    },
    {
      id: "req-2",
      businessName: "Songket Palembang Indah",
      ownerName: "Achmad Fauzi",
      category: "Fashion & Batik",
      kecamatan: "Kemuning",
      nib: "912000982312",
      status: "pending",
    },
    {
      id: "req-3",
      businessName: "Kerajinan Tembaga Ampera",
      ownerName: "Hendra Wijaya",
      category: "Kerajinan",
      kecamatan: "Seberang Ulu I",
      nib: "912000456781",
      status: "pending",
    },
    {
      id: "req-4",
      businessName: "Batik Palembang Sriwijaya",
      ownerName: "Siti Rahmawati",
      category: "Fashion & Batik",
      kecamatan: "Sukarami",
      nib: "912000129384",
      status: "pending",
    },
  ]);

  const handleApprove = (id: string) => {
    setRequests(requests.map((r) => (r.id === id ? { ...r, status: "approved" } : r)));
  };

  const handleReject = (id: string) => {
    setRequests(requests.map((r) => (r.id === id ? { ...r, status: "rejected" } : r)));
  };

  const pending = requests.filter((r) => r.status === "pending");

  return (
    <div className="space-y-6 text-xs">
      <div>
        <h2 className="text-xl font-bold text-custom-main flex items-center gap-2">
          <ShieldCheck size={22} className="text-brand-primary" />
          Verifikasi UMKM Baru
        </h2>
        <p className="text-xs text-custom-muted">
          Periksa kecocokan dokumen legalitas (NIB, KTP) usaha sebelum diterbitkan ke katalog publik
        </p>
      </div>

      <div className="bg-custom-card border border-custom rounded-2xl shadow-xs overflow-hidden">
        <div className="p-5 border-b border-custom flex items-center justify-between bg-custom-ter/15">
          <div className="relative flex-1 max-w-xs">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-custom-muted">
              <Search size={13} />
            </span>
            <input
              type="text"
              placeholder="Cari nama usaha..."
              className="pl-9 pr-3 py-1.5 w-full rounded-xl border border-custom bg-custom-ter focus:outline-none focus:border-brand-primary"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {pending.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-custom bg-custom-ter/20 font-bold uppercase text-custom-muted text-[10px]">
                  <th className="px-6 py-4">Nama Usaha / Pemilik</th>
                  <th className="px-6 py-4">Kategori</th>
                  <th className="px-6 py-4">Wilayah</th>
                  <th className="px-6 py-4">Nomor NIB</th>
                  <th className="px-6 py-4">Dokumen</th>
                  <th className="px-6 py-4 text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-custom">
                {pending.map((req) => (
                  <tr key={req.id} className="hover:bg-custom-ter/5 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-custom-main">{req.businessName}</p>
                      <p className="text-[10px] text-custom-muted">Pemilik: {req.ownerName}</p>
                    </td>
                    <td className="px-6 py-4 text-custom-muted">{req.category}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-custom-main">
                        <MapPin size={12} className="text-brand-primary" />
                        {req.kecamatan}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-custom-muted">{req.nib}</td>
                    <td className="px-6 py-4">
                      <button className="inline-flex items-center gap-1 py-1 px-2.5 rounded-lg border border-custom bg-custom-ter hover:bg-custom-card transition text-[10px] font-bold text-brand-primary">
                        <Eye size={10} />
                        Lihat Berkas
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleReject(req.id)}
                          className="p-1.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 transition"
                        >
                          <X size={13} />
                        </button>
                        <button
                          onClick={() => handleApprove(req.id)}
                          className="p-1.5 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition"
                        >
                          <Check size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-10 text-center text-custom-muted space-y-1">
              <p className="font-bold text-sm">Semua Antrean Bersih</p>
              <p>Tidak ada pengajuan verifikasi baru yang tertunda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
