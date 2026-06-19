"use client";

import { useState } from "react";
import {
  MapPin,
  Search,
  Filter,
  Sparkles,
  Layers,
  Building2,
  Phone,
  FileBadge,
  Eye,
  X,
  Compass,
  TrendingUp,
  Globe
} from "lucide-react";
import dynamic from "next/dynamic";

const UMKMMap = dynamic(() => import("@/components/UMKMMap"), { ssr: false });

interface UMKM {
  id: string;
  name: string;
  owner: string;
  category: "Kuliner" | "Fashion & Batik" | "Kerajinan";
  kecamatan: "Ilir Barat I" | "Seberang Ulu I" | "Sukarami" | "Kemuning" | "Jakabaring" | "Plaju";
  address: string;
  phone: string;
  nib: string;
  status: "verified" | "pending";
  // relative map coords (percentage)
  mapX: number;
  mapY: number;
  lat: number;
  lng: number;
}

export default function PemkotSilayah() {
  const [selectedDistrict, setSelectedDistrict] = useState<string>("Semua");
  const [categoryFilter, setCategoryFilter] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUMKM, setSelectedUMKM] = useState<UMKM | null>(null);

  const umkmList: UMKM[] = [
    {
      id: "umkm-1",
      name: "Pempek Bu Yanti",
      owner: "Yanti Rahayu",
      category: "Kuliner",
      kecamatan: "Ilir Barat I",
      address: "Jl. Bukit Besar No. 45, Bukit Lama, Kec. Ilir Barat I",
      phone: "0812-3456-7890",
      nib: "912000342918",
      status: "verified",
      mapX: 28,
      mapY: 42,
      lat: -2.9904,
      lng: 104.7262
    },
    {
      id: "umkm-2",
      name: "Songket Palembang Indah",
      owner: "Achmad Fauzi",
      category: "Fashion & Batik",
      kecamatan: "Kemuning",
      address: "Jl. Basuki Rahmat No. 12, Pipa Jaya, Kec. Kemuning",
      phone: "0813-9876-5432",
      nib: "912000982312",
      status: "verified",
      mapX: 52,
      mapY: 28,
      lat: -2.9634,
      lng: 104.7521
    },
    {
      id: "umkm-3",
      name: "Kerajinan Tembaga Ampera",
      owner: "Hendra Wijaya",
      category: "Kerajinan",
      kecamatan: "Seberang Ulu I",
      address: "Jl. KH. Wahid Hasyim No. 88, 3-4 Ulu, Kec. Seberang Ulu I",
      phone: "0821-4455-6677",
      nib: "912000456781",
      status: "verified",
      mapX: 42,
      mapY: 72,
      lat: -3.0032,
      lng: 104.7645
    },
    {
      id: "umkm-4",
      name: "Batik Palembang Sriwijaya",
      owner: "Siti Rahmawati",
      category: "Fashion & Batik",
      kecamatan: "Sukarami",
      address: "Jl. Kol. H. Burlian KM. 10, Karya Baru, Kec. Sukarami",
      phone: "0852-1122-3344",
      nib: "912000129384",
      status: "verified",
      mapX: 35,
      mapY: 22,
      lat: -2.9234,
      lng: 104.7182
    },
    {
      id: "umkm-5",
      name: "Kemplang Tunu Maknyus",
      owner: "Jaka Perkasa",
      category: "Kuliner",
      kecamatan: "Jakabaring",
      address: "Samping Stadion Gelora Sriwijaya, Kec. Jakabaring",
      phone: "0819-5566-7788",
      nib: "912000223412",
      status: "verified",
      mapX: 62,
      mapY: 78,
      lat: -3.0189,
      lng: 104.7924
    },
    {
      id: "umkm-6",
      name: "Pempek & Es Kacang Vico",
      owner: "Vico Wijaya",
      category: "Kuliner",
      kecamatan: "Ilir Barat I",
      address: "Jl. Jenderal Sudirman No. 135, Kec. Ilir Barat I",
      phone: "0811-7128-392",
      nib: "912000551102",
      status: "verified",
      mapX: 33,
      mapY: 48,
      lat: -2.9774,
      lng: 104.7512
    },
    {
      id: "umkm-7",
      name: "Tenun Songket Melati",
      owner: "Melati Indah",
      category: "Fashion & Batik",
      kecamatan: "Plaju",
      address: "Jl. Sentosa Jaya No. 19, Komperta, Kec. Plaju",
      phone: "0812-7799-8811",
      nib: "912000889921",
      status: "pending",
      mapX: 78,
      mapY: 65,
      lat: -3.0076,
      lng: 104.8143
    }
  ];

  // Filter list of UMKMs based on filters chosen
  const filteredUMKMs = umkmList.filter((umkm) => {
    const matchesDistrict = selectedDistrict === "Semua" || umkm.kecamatan === selectedDistrict;
    const matchesCategory = categoryFilter === "Semua" || umkm.category === categoryFilter;
    const matchesSearch =
      umkm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      umkm.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      umkm.nib.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDistrict && matchesCategory && matchesSearch;
  });

  // Count metrics
  const totalUMKM = umkmList.length;
  const filteredCount = filteredUMKMs.length;
  const verifiedCount = filteredUMKMs.filter(u => u.status === "verified").length;
  const pendingCount = filteredUMKMs.filter(u => u.status === "pending").length;

  const getCategoryColor = (cat: UMKM["category"]) => {
    switch (cat) {
      case "Kuliner":
        return "text-orange-500 bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900";
      case "Fashion & Batik":
        return "text-purple-500 bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900";
      case "Kerajinan":
        return "text-teal-500 bg-teal-50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-900";
    }
  };

  return (
    <div className="space-y-6 text-xs relative">
      {/* Title Header */}
      <div>
        <h2 className="text-xl font-bold text-custom-main flex items-center gap-2">
          <Compass size={22} className="text-brand-primary animate-spin-slow" />
          SiWilayah - Geografis Penyebaran UMKM
        </h2>
        <p className="text-xs text-custom-muted">
          Peta sebaran interaktif pelaku usaha UMKM lokal binaan Dinas Koperasi di seluruh kecamatan Kota Palembang
        </p>
      </div>

      {/* Main Container grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Map View + Filters */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Filters Bar */}
          <div className="bg-custom-card border border-custom p-4 rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2 flex-grow sm:flex-grow-0">
              {/* Search */}
              <div className="relative w-full sm:w-48">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-custom-muted">
                  <Search size={13} />
                </span>
                <input
                  type="text"
                  placeholder="Cari UMKM..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-1.5 w-full text-xs rounded-xl border border-custom bg-custom-ter focus:outline-none focus:border-brand-primary"
                />
              </div>

              {/* Category selector */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-custom bg-custom-ter font-semibold text-custom-main focus:outline-none focus:border-brand-primary"
              >
                <option value="Semua">Semua Kategori</option>
                <option value="Kuliner">Kuliner</option>
                <option value="Fashion & Batik">Fashion & Batik</option>
                <option value="Kerajinan">Kerajinan</option>
              </select>
            </div>

            {/* Quick District Selector pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0">
              {["Semua", "Ilir Barat I", "Seberang Ulu I", "Sukarami", "Kemuning", "Jakabaring", "Plaju"].map((dist) => (
                <button
                  key={dist}
                  onClick={() => setSelectedDistrict(dist)}
                  className={`px-2.5 py-1 rounded-lg font-bold border transition text-[10px] ${
                    selectedDistrict === dist
                      ? "bg-brand-primary text-white border-brand-primary"
                      : "bg-custom-ter text-custom-muted border-custom hover:text-custom-main"
                  }`}
                >
                  {dist}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive GIS Map Area */}
          <div className="bg-custom-card border border-custom rounded-2xl shadow-xs overflow-hidden h-[450px] relative">
            <UMKMMap
              umkmList={filteredUMKMs}
              selectedUMKM={selectedUMKM}
              onSelectUMKM={setSelectedUMKM}
              selectedDistrict={selectedDistrict}
              onSelectDistrict={setSelectedDistrict}
              categoryFilter={categoryFilter}
              searchQuery={searchQuery}
            />
          </div>
        </div>

        {/* Right 1 Column: District Stats & Selected UMKM detail */}
        <div className="space-y-4">
          
          {/* Active stats overview */}
          <div className="bg-custom-card border border-custom p-5 rounded-2xl shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-custom-main flex items-center gap-1.5">
                <TrendingUp size={15} className="text-brand-primary" />
                Kepadatan Wilayah
              </h3>
              <p className="text-[10px] text-custom-muted">
                Statistik penyebaran aktif wilayah terpilih
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-custom-ter/50 border border-custom rounded-xl space-y-1">
                <p className="text-[10px] text-custom-muted uppercase font-bold tracking-wider">Terdaftar</p>
                <p className="text-lg font-black text-custom-main">{filteredCount} UMKM</p>
                <p className="text-[9px] text-custom-muted">Kecamatan: {selectedDistrict}</p>
              </div>

              <div className="p-3 bg-custom-ter/50 border border-custom rounded-xl space-y-1">
                <p className="text-[10px] text-custom-muted uppercase font-bold tracking-wider">Verifikasi</p>
                <p className="text-lg font-black text-emerald-600">{verifiedCount} Usaha</p>
                <p className="text-[9px] text-custom-muted">{pendingCount} Menunggu</p>
              </div>
            </div>

            {/* AI Advisor policy recommendation */}
            <div className="p-3.5 bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900 rounded-xl space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-teal-800 dark:text-teal-300">
                <Sparkles size={13} className="text-brand-primary" />
                AI Kawasan Policy
              </div>
              <p className="text-[10.5px] text-teal-950/80 dark:text-teal-400/90 leading-relaxed font-medium">
                {selectedDistrict === "Semua" ? (
                  "AI mendeteksi 65% UMKM terpusat di Seberang Ilir (utara sungai Musi). Disarankan memperluas promosi batik/fashion khas Plaju & Jakabaring untuk mengimbangi kemajuan wilayah selatan."
                ) : selectedDistrict === "Ilir Barat I" ? (
                  "Kecamatan Ilir Barat I didominasi Sektor Kuliner Pempek. Disarankan menyelenggarakan Festival Kreatif Non-Kuliner untuk mendorong diversifikasi kerajinan tangan lokal."
                ) : selectedDistrict === "Jakabaring" ? (
                  "Jakabaring memiliki wisata olahraga padat namun kepadatan UMKM rendah (12%). Potensi besar jika ditambahkan klaster pusat oleh-oleh di kawasan dekat Stadion."
                ) : (
                  `Wilayah kecamatan ${selectedDistrict} aman terkendali. Tingkatkan eksposur pemasaran digital di PasarNusa untuk menaikkan omzet pelaku usaha lokal.`
                )}
              </p>
            </div>
          </div>

          {/* List of UMKMs in Selected District */}
          <div className="bg-custom-card border border-custom p-5 rounded-2xl shadow-xs space-y-3 flex flex-col h-[230px]">
            <h3 className="font-bold text-custom-main flex items-center gap-1.5 text-xs">
              <Building2 size={13} className="text-brand-primary" />
              Daftar Pelaku Usaha ({filteredCount})
            </h3>
            
            <div className="overflow-y-auto flex-grow space-y-2 pr-1">
              {filteredUMKMs.map((umkm) => (
                <div
                  key={umkm.id}
                  onClick={() => setSelectedUMKM(umkm)}
                  className={`p-2.5 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                    selectedUMKM?.id === umkm.id
                      ? "border-brand-primary bg-brand-primary/5"
                      : "border-custom bg-custom-ter/25 hover:bg-custom-ter/50"
                  }`}
                >
                  <div className="space-y-0.5 max-w-[75%]">
                    <p className="font-bold text-custom-main truncate text-[11px]">{umkm.name}</p>
                    <p className="text-[9.5px] text-custom-muted truncate">{umkm.address}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full border text-[8px] font-bold ${getCategoryColor(umkm.category)}`}>
                    {umkm.category.split(" ")[0]}
                  </span>
                </div>
              ))}

              {filteredUMKMs.length === 0 && (
                <div className="p-8 text-center text-custom-muted select-none">
                  Tidak ada UMKM di area ini dengan kriteria filter terpilih.
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Selected UMKM Detail Drawer / Modal popover */}
      {selectedUMKM && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-custom-card border border-custom rounded-2xl shadow-xl overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-4 border-b border-custom flex items-center justify-between bg-custom-ter/20">
              <h3 className="font-bold text-custom-main flex items-center gap-2">
                <MapPin size={15} className="text-brand-primary" />
                Informasi Geografis UMKM
              </h3>
              <button
                onClick={() => setSelectedUMKM(null)}
                className="p-1 rounded-lg hover:bg-custom-ter text-custom-muted"
              >
                <X size={15} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <span className={`px-2.5 py-0.5 rounded-full border text-[9px] font-bold inline-block ${getCategoryColor(selectedUMKM.category)}`}>
                  {selectedUMKM.category}
                </span>
                <h4 className="text-base font-black text-custom-main mt-2">{selectedUMKM.name}</h4>
                <p className="text-xs text-custom-muted mt-0.5">Pemilik: {selectedUMKM.owner}</p>
              </div>

              <div className="space-y-2.5 border-t border-b border-custom py-4 text-xs">
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="text-custom-muted flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-custom-muted text-[10px] uppercase">Alamat Operasional</p>
                    <p className="text-custom-main font-medium leading-relaxed">{selectedUMKM.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-custom-muted flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-custom-muted text-[10px] uppercase">Nomor Kontak WhatsApp</p>
                    <p className="text-custom-main font-mono">{selectedUMKM.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <FileBadge size={14} className="text-custom-muted flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-custom-muted text-[10px] uppercase">Nomor Induk Berusaha (NIB)</p>
                    <p className="text-custom-main font-mono">{selectedUMKM.nib}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Globe size={14} className="text-custom-muted flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-custom-muted text-[10px] uppercase">Status Kemitraan Pemkot</p>
                    <span className={`inline-flex items-center gap-1 font-bold text-[9px] mt-0.5 px-2 py-0.5 rounded-full ${
                      selectedUMKM.status === "verified"
                        ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600"
                        : "bg-amber-50 dark:bg-amber-950/20 text-amber-600"
                    }`}>
                      {selectedUMKM.status === "verified" ? "Terverifikasi Aktif" : "Menunggu Verifikasi"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  onClick={() => setSelectedUMKM(null)}
                  className="px-4 py-2 border border-custom rounded-xl hover:bg-custom-ter font-semibold text-custom-muted"
                >
                  Tutup
                </button>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(selectedUMKM.name + ", " + selectedUMKM.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-brand-primary text-white hover:opacity-90 rounded-xl font-bold flex items-center gap-1.5 shadow-md shadow-teal-700/10"
                >
                  <Eye size={12} />
                  Buka Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
