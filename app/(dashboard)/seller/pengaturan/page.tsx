"use client";

import { useState } from "react";
import { Store, User, MapPin, Phone, Mail, Save, ShieldCheck } from "lucide-react";

export default function SellerSettings() {
  const [formData, setFormData] = useState({
    shopName: "Pempek Bu Yanti",
    ownerName: "Yanti Rahayu",
    address: "Jl. Jend. Sudirman No. 12, RT 01/RW 03, Bukit Besar",
    kecamatan: "Ilir Barat I",
    phone: "081234567890",
    email: "yanti.rahayu@gmail.com",
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-2xl text-xs">
      <div>
        <h2 className="text-xl font-bold text-custom-main">Pengaturan Toko</h2>
        <p className="text-xs text-custom-muted">Kelola profil usaha dan kontak operasional UMKM Anda</p>
      </div>

      <form onSubmit={handleSave} className="bg-custom-card border border-custom p-6 rounded-2xl shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block font-semibold text-custom-muted">Nama Usaha</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-custom-muted">
                <Store size={14} />
              </span>
              <input
                type="text"
                value={formData.shopName}
                onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-custom bg-custom-ter focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block font-semibold text-custom-muted">Nama Pemilik</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-custom-muted">
                <User size={14} />
              </span>
              <input
                type="text"
                value={formData.ownerName}
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-custom bg-custom-ter focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block font-semibold text-custom-muted">Alamat Toko</label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-custom-muted">
              <MapPin size={14} />
            </span>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              rows={3}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-custom bg-custom-ter focus:outline-none focus:border-brand-primary resize-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block font-semibold text-custom-muted">Nomor Telepon</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-custom-muted">
                <Phone size={14} />
              </span>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-custom bg-custom-ter focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block font-semibold text-custom-muted">Email</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-custom-muted">
                <Mail size={14} />
              </span>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-custom bg-custom-ter focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>
        </div>

        {/* Verification Status info */}
        <div className="p-4 bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900 rounded-xl flex items-center gap-3">
          <ShieldCheck size={20} className="text-brand-primary" />
          <div>
            <p className="font-bold text-custom-main">Legalitas Bisnis Terverifikasi</p>
            <p className="text-[10px] text-custom-muted mt-0.5">
              Status NIB dan dokumen usaha Anda telah terverifikasi resmi oleh Dinas Koperasi & UMKM.
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-4 py-2.5 bg-brand-primary text-white rounded-xl font-bold hover:opacity-90 flex items-center gap-1.5 transition"
          >
            <Save size={14} />
            {saved ? "Tersimpan!" : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
}
