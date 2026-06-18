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
      mapY: 42
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
      mapY: 28
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
      mapY: 72
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
      mapY: 22
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
      mapY: 78
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
      mapY: 48
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
      mapY: 65
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
          <div className="bg-custom-card border border-custom rounded-2xl shadow-xs p-6 flex flex-col justify-between h-[450px] relative overflow-hidden select-none">
            {/* Compass overlay */}
            <div className="absolute top-4 right-4 flex flex-col items-center opacity-40 select-none">
              <Compass size={32} className="text-custom-muted" />
              <span className="text-[8px] font-bold mt-1 text-custom-muted">PALEMBANG</span>
            </div>

            {/* Grid Map Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800d_1px,transparent_1px),linear-gradient(to_bottom,#8080800d_1px,transparent_1px)] bg-[size:16px_24px] pointer-events-none"></div>

            {/* Map Title info */}
            <div className="relative z-10">
              <h3 className="font-bold text-custom-main flex items-center gap-1.5">
                <Layers size={14} className="text-brand-primary" />
                Peta Vector Interaktif
              </h3>
              <p className="text-[10px] text-custom-muted mt-0.5">
                Klik wilayah kecamatan untuk menyaring data UMKM terverifikasi
              </p>
            </div>

            {/* Map Vector Component Wrapper */}
            <div className="relative flex-grow flex items-center justify-center p-4">
              <svg viewBox="0 0 500 300" className="w-full h-full text-custom-muted/20 opacity-90 transition duration-300">
                {/* River Musi (Divider) */}
                <path
                  d="M 10 140 Q 150 120, 250 150 T 490 130"
                  fill="none"
                  stroke="var(--brand-primary)"
                  strokeWidth="8"
                  strokeOpacity="0.18"
                  strokeDasharray="6 3"
                  className="transition-all duration-300"
                />
                
                {/* Ampera Bridge design representation */}
                <line x1="240" y1="130" x2="240" y2="160" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.8" />
                <line x1="235" y1="130" x2="235" y2="160" stroke="#f43f5e" strokeWidth="2" strokeOpacity="0.8" />
                <line x1="245" y1="130" x2="245" y2="160" stroke="#f43f5e" strokeWidth="2" strokeOpacity="0.8" />
                <rect x="233" y="125" width="16" height="5" fill="#f43f5e" rx="1" strokeOpacity="0.8" />
                <rect x="233" y="160" width="16" height="5" fill="#f43f5e" rx="1" strokeOpacity="0.8" />
                
                {/* District Polygons - Clickable */}
                
                {/* 1. SUKARAMI (Top Left/North West) */}
                <path
                  d="M 50 20 L 180 10 L 210 50 L 150 90 L 90 80 Z"
                  fill="currentColor"
                  className={`cursor-pointer transition-all duration-200 outline-none ${
                    selectedDistrict === "Sukarami"
                      ? "text-emerald-500/20 stroke-emerald-500 stroke-2"
                      : "text-custom-muted/5 hover:text-brand-primary/10 stroke-custom/50 hover:stroke-brand-primary"
                  }`}
                  onClick={() => setSelectedDistrict(selectedDistrict === "Sukarami" ? "Semua" : "Sukarami")}
                />
                <text x="110" y="45" className="fill-custom-muted/80 text-[8px] font-black pointer-events-none select-none tracking-widest">SUKARAMI</text>

                {/* 2. KEMUNING (Center North) */}
                <path
                  d="M 210 50 L 300 40 L 320 95 L 230 110 L 195 80 Z"
                  fill="currentColor"
                  className={`cursor-pointer transition-all duration-200 outline-none ${
                    selectedDistrict === "Kemuning"
                      ? "text-emerald-500/20 stroke-emerald-500 stroke-2"
                      : "text-custom-muted/5 hover:text-brand-primary/10 stroke-custom/50 hover:stroke-brand-primary"
                  }`}
                  onClick={() => setSelectedDistrict(selectedDistrict === "Kemuning" ? "Semua" : "Kemuning")}
                />
                <text x="245" y="75" className="fill-custom-muted/80 text-[8px] font-black pointer-events-none select-none tracking-widest">KEMUNING</text>

                {/* 3. ILIR BARAT I (Center West / Left of River) */}
                <path
                  d="M 90 80 L 195 80 L 230 110 L 220 140 L 120 145 L 80 110 Z"
                  fill="currentColor"
                  className={`cursor-pointer transition-all duration-200 outline-none ${
                    selectedDistrict === "Ilir Barat I"
                      ? "text-emerald-500/20 stroke-emerald-500 stroke-2"
                      : "text-custom-muted/5 hover:text-brand-primary/10 stroke-custom/50 hover:stroke-brand-primary"
                  }`}
                  onClick={() => setSelectedDistrict(selectedDistrict === "Ilir Barat I" ? "Semua" : "Ilir Barat I")}
                />
                <text x="125" y="115" className="fill-custom-muted/80 text-[8px] font-black pointer-events-none select-none tracking-widest">ILIR BARAT I</text>

                {/* 4. SEBERANG ULU I (Center South / Bottom of River) */}
                <path
                  d="M 120 145 L 220 140 L 250 170 L 230 240 L 150 220 L 110 180 Z"
                  fill="currentColor"
                  className={`cursor-pointer transition-all duration-200 outline-none ${
                    selectedDistrict === "Seberang Ulu I"
                      ? "text-emerald-500/20 stroke-emerald-500 stroke-2"
                      : "text-custom-muted/5 hover:text-brand-primary/10 stroke-custom/50 hover:stroke-brand-primary"
                  }`}
                  onClick={() => setSelectedDistrict(selectedDistrict === "Seberang Ulu I" ? "Semua" : "Seberang Ulu I")}
                />
                <text x="145" y="185" className="fill-custom-muted/80 text-[8px] font-black pointer-events-none select-none tracking-widest">SEBERANG ULU I</text>

                {/* 5. JAKABARING (South East) */}
                <path
                  d="M 250 170 L 360 160 L 390 230 L 290 260 L 230 240 Z"
                  fill="currentColor"
                  className={`cursor-pointer transition-all duration-200 outline-none ${
                    selectedDistrict === "Jakabaring"
                      ? "text-emerald-500/20 stroke-emerald-500 stroke-2"
                      : "text-custom-muted/5 hover:text-brand-primary/10 stroke-custom/50 hover:stroke-brand-primary"
                  }`}
                  onClick={() => setSelectedDistrict(selectedDistrict === "Jakabaring" ? "Semua" : "Jakabaring")}
                />
                <text x="285" y="210" className="fill-custom-muted/80 text-[8px] font-black pointer-events-none select-none tracking-widest">JAKABARING</text>

                {/* 6. PLAJU (East/River bank south) */}
                <path
                  d="M 360 160 L 470 145 L 490 210 L 420 250 L 390 230 Z"
                  fill="currentColor"
                  className={`cursor-pointer transition-all duration-200 outline-none ${
                    selectedDistrict === "Plaju"
                      ? "text-emerald-500/20 stroke-emerald-500 stroke-2"
                      : "text-custom-muted/5 hover:text-brand-primary/10 stroke-custom/50 hover:stroke-brand-primary"
                  }`}
                  onClick={() => setSelectedDistrict(selectedDistrict === "Plaju" ? "Semua" : "Plaju")}
                />
                <text x="415" y="195" className="fill-custom-muted/80 text-[8px] font-black pointer-events-none select-none tracking-widest">PLAJU</text>
              </svg>

              {/* Render dynamic markers on the map */}
              {filteredUMKMs.map((umkm) => (
                <div
                  key={umkm.id}
                  style={{ left: `${umkm.mapX}%`, top: `${umkm.mapY}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-30"
                  onClick={() => setSelectedUMKM(umkm)}
                >
                  <span className="relative flex h-6 w-6 items-center justify-center">
                    {/* Pulsing ring */}
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${umkm.category === "Kuliner" ? "bg-orange-400" : umkm.category === "Fashion & Batik" ? "bg-purple-400" : "bg-teal-400"}`}></span>
                    {/* Small pin center */}
                    <span className={`relative inline-flex rounded-full h-3.5 w-3.5 border border-white dark:border-zinc-900 shadow-md ${umkm.category === "Kuliner" ? "bg-orange-500" : umkm.category === "Fashion & Batik" ? "bg-purple-500" : "bg-teal-500"}`}></span>
                  </span>
                  
                  {/* Tooltip on marker hover */}
                  <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 px-2 py-1 rounded-lg text-[9px] font-bold shadow-md z-40 transition-all duration-150 min-w-[100px] text-center border border-custom select-none">
                    <p className="truncate font-black">{umkm.name}</p>
                    <p className="text-[7.5px] text-custom-muted font-normal">{umkm.kecamatan}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Legend */}
            <div className="relative z-10 bg-custom-card/90 backdrop-blur-md px-3 py-2 rounded-xl border border-custom flex flex-wrap gap-4 text-[9px] text-custom-muted font-semibold shadow-xs select-none max-w-max self-start">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 border border-white dark:border-zinc-900 inline-block" />
                <span>Kuliner</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 border border-white dark:border-zinc-900 inline-block" />
                <span>Fashion & Batik</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500 border border-white dark:border-zinc-900 inline-block" />
                <span>Kerajinan</span>
              </div>
              <div className="h-3 border-r border-custom"></div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-1 bg-red-400 opacity-80 inline-block rounded-xs" />
                <span>Jembatan Ampera</span>
              </div>
            </div>
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
