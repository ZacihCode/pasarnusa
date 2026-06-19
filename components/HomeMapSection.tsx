"use client";

import { useState } from "react";
import { Compass, Search, Star, Store, MapPin } from "lucide-react";
import dynamic from "next/dynamic";

const UMKMMap = dynamic(() => import("@/components/UMKMMap"), { ssr: false });

interface UMKM {
  id: string;
  name: string;
  owner: string;
  category: "Kuliner" | "Fashion & Batik" | "Kerajinan";
  kecamatan:
    | "Ilir Barat I"
    | "Seberang Ulu I"
    | "Sukarami"
    | "Kemuning"
    | "Jakabaring"
    | "Plaju";
  address: string;
  distance: string;
  rating: number;
  phone: string;
  mapX: number;
  mapY: number;
  lat: number;
  lng: number;
}

const UMKM_DATA: UMKM[] = [
  {
    id: "umkm-1",
    name: "Pempek Bu Yanti",
    owner: "Yanti Rahayu",
    category: "Kuliner",
    kecamatan: "Ilir Barat I",
    address: "Jl. Bukit Besar No. 45, Bukit Lama, Kec. Ilir Barat I",
    distance: "1.8 km",
    rating: 4.8,
    phone: "0812-3456-7890",
    mapX: 28,
    mapY: 42,
    lat: -2.9904,
    lng: 104.7262,
  },
  {
    id: "umkm-2",
    name: "Songket Palembang Indah",
    owner: "Achmad Fauzi",
    category: "Fashion & Batik",
    kecamatan: "Kemuning",
    address: "Jl. Basuki Rahmat No. 12, Pipa Jaya, Kec. Kemuning",
    distance: "1.2 km",
    rating: 4.9,
    phone: "0813-9876-5432",
    mapX: 52,
    mapY: 28,
    lat: -2.9634,
    lng: 104.7521,
  },
  {
    id: "umkm-3",
    name: "Kerajinan Tembaga Ampera",
    owner: "Hendra Wijaya",
    category: "Kerajinan",
    kecamatan: "Seberang Ulu I",
    address: "Jl. KH. Wahid Hasyim No. 88, 3-4 Ulu, Kec. Seberang Ulu I",
    distance: "3.1 km",
    rating: 4.7,
    phone: "0821-4455-6677",
    mapX: 42,
    mapY: 72,
    lat: -3.0032,
    lng: 104.7645,
  },
  {
    id: "umkm-4",
    name: "Batik Palembang Sriwijaya",
    owner: "Siti Rahmawati",
    category: "Fashion & Batik",
    kecamatan: "Sukarami",
    address: "Jl. Kol. H. Burlian KM. 10, Karya Baru, Kec. Sukarami",
    distance: "6.5 km",
    rating: 4.6,
    phone: "0852-1122-3344",
    mapX: 35,
    mapY: 22,
    lat: -2.9234,
    lng: 104.7182,
  },
  {
    id: "umkm-5",
    name: "Kemplang Tunu Maknyus",
    owner: "Jaka Perkasa",
    category: "Kuliner",
    kecamatan: "Jakabaring",
    address: "Samping Stadion Gelora Sriwijaya, Kec. Jakabaring",
    distance: "4.8 km",
    rating: 4.7,
    phone: "0819-5566-7788",
    mapX: 62,
    mapY: 78,
    lat: -3.0189,
    lng: 104.7924,
  },
  {
    id: "umkm-6",
    name: "Pempek & Es Kacang Vico",
    owner: "Vico Wijaya",
    category: "Kuliner",
    kecamatan: "Ilir Barat I",
    address: "Jl. Jenderal Sudirman No. 135, Kec. Ilir Barat I",
    distance: "2.1 km",
    rating: 4.8,
    phone: "0811-7128-392",
    mapX: 33,
    mapY: 48,
    lat: -2.9774,
    lng: 104.7512,
  },
  {
    id: "umkm-7",
    name: "Tenun Songket Melati",
    owner: "Melati Indah",
    category: "Fashion & Batik",
    kecamatan: "Plaju",
    address: "Jl. Sentosa Jaya No. 19, Komperta, Kec. Plaju",
    distance: "5.3 km",
    rating: 4.5,
    phone: "0812-7799-8811",
    mapX: 78,
    mapY: 65,
    lat: -3.0076,
    lng: 104.8143,
  },
];

export default function HomeMapSection() {
  const [selectedDistrict, setSelectedDistrict] = useState<string>("Semua");
  const [categoryFilter, setCategoryFilter] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUMKM, setSelectedUMKM] = useState<UMKM | null>(null);

  const filteredUMKMs = UMKM_DATA.filter((u) => {
    const mDistrict =
      selectedDistrict === "Semua" || u.kecamatan === selectedDistrict;
    const mCategory =
      categoryFilter === "Semua" || u.category === categoryFilter;
    const mSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.address.toLowerCase().includes(searchQuery.toLowerCase());
    return mDistrict && mCategory && mSearch;
  });

  return (
    <section id="peta" className="py-20 bg-custom-main border-y border-custom">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest text-brand-primary uppercase bg-brand-primary/10 px-3 py-1 rounded-full">
            <Compass size={12} className="animate-spin-slow" />
            Peta Geografis UMKM
          </div>
          <h2 className="text-3xl font-extrabold text-custom-main sm:text-4xl tracking-tight">
            Peta Lokasi Fisik UMKM Palembang
          </h2>
          <p className="text-sm text-custom-muted leading-relaxed">
            Temukan sebaran lokasi toko fisik kuliner lokal, perajin kain
            songket, dan batik khas langsung di peta interaktif kota Palembang.
          </p>
        </div>

        {/* Filter and Content Controls */}
        <div className="bg-custom-card border border-custom p-5 rounded-2xl shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left: Search & Category Filter */}
          <div className="flex flex-wrap gap-2.5 items-center flex-grow">
            <div className="relative w-full sm:w-64">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-custom-muted"
              />
              <input
                type="text"
                placeholder="Cari toko atau produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-custom bg-custom-ter text-xs focus:outline-none focus:border-brand-primary text-custom-main"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 rounded-xl border border-custom bg-custom-ter text-xs font-semibold text-custom-main focus:outline-none focus:border-brand-primary cursor-pointer"
            >
              <option value="Semua">Semua Kategori</option>
              <option value="Kuliner">Kuliner</option>
              <option value="Fashion & Batik">Fashion & Batik</option>
              <option value="Kerajinan">Kerajinan</option>
            </select>
          </div>

          {/* Right: District Selection Pills */}
          <div className="flex flex-wrap gap-1.5 items-center">
            {[
              "Semua",
              "Ilir Barat I",
              "Seberang Ulu I",
              "Sukarami",
              "Kemuning",
              "Jakabaring",
              "Plaju",
            ].map((dist) => (
              <button
                key={dist}
                onClick={() => setSelectedDistrict(dist)}
                className={`px-3 py-1.5 rounded-lg font-bold border transition text-[10px] cursor-pointer ${
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

        {/* Map Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Map Viewer Column */}
          <div className="lg:col-span-8 h-[400px] rounded-2xl overflow-hidden border border-custom shadow-xs relative">
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

          {/* Sidebar Shop Lists / Details Column */}
          <div className="lg:col-span-4 flex flex-col justify-between h-[400px]">
            {/* Store Listing */}
            <div className="space-y-3 overflow-y-auto flex-grow pr-1.5">
              <p className="font-bold text-[10px] text-custom-muted uppercase tracking-wider mb-2">
                Daftar Gerai Terdekat
              </p>
              {filteredUMKMs.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-custom rounded-xl bg-custom-ter/20">
                  <MapPin
                    size={24}
                    className="mx-auto text-custom-muted mb-2"
                  />
                  <p className="text-xs font-bold text-custom-main">
                    Toko Tidak Ditemukan
                  </p>
                  <p className="text-[10px] text-custom-muted mt-0.5">
                    Coba ubah kata kunci pencarian Anda.
                  </p>
                </div>
              ) : (
                filteredUMKMs.map((umkm) => (
                  <div
                    key={umkm.id}
                    onClick={() => setSelectedUMKM(umkm)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedUMKM?.id === umkm.id
                        ? "border-brand-primary bg-brand-primary/5 ring-1 ring-brand-primary"
                        : "border-custom bg-custom-card hover:bg-custom-ter/40"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-1">
                      <h4 className="font-bold text-custom-main text-xs truncate">
                        {umkm.name}
                      </h4>
                      <span className="text-[9px] font-bold text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-md flex-shrink-0">
                        {umkm.distance}
                      </span>
                    </div>
                    <p className="text-[10px] text-custom-muted truncate mt-1">
                      {umkm.address}
                    </p>
                    <div className="flex items-center gap-1.5 mt-2 text-[10px] text-custom-muted">
                      <span className="flex items-center text-amber-500 font-bold">
                        <Star
                          size={11}
                          className="fill-current text-amber-500 mr-0.5"
                        />
                        {umkm.rating}
                      </span>
                      <span>•</span>
                      <span>{umkm.kecamatan}</span>
                      <span>•</span>
                      <span className="font-semibold text-brand-primary bg-brand-primary/5 px-1.5 py-0.2 rounded text-[9px]">
                        {umkm.category}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Selected Store Mini-card Details */}
            {selectedUMKM && (
              <div className="mt-4 p-4 bg-custom-card border border-brand-primary/30 rounded-xl space-y-3 shadow-md animate-float-slow">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[8px] font-black uppercase text-brand-primary tracking-wider px-2 py-0.5 bg-brand-primary/10 rounded-md">
                      {selectedUMKM.category}
                    </span>
                    <h5 className="font-bold text-custom-main text-sm mt-1.5">
                      {selectedUMKM.name}
                    </h5>
                  </div>
                  <span className="text-[10px] font-semibold text-custom-muted">
                    {selectedUMKM.distance} dari pusat acuan
                  </span>
                </div>
                <p className="text-[10px] text-custom-muted leading-relaxed line-clamp-2">
                  {selectedUMKM.address}
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => {
                      alert(`Membuka etalase produk dari ${selectedUMKM.name}`);
                    }}
                    className="py-2 bg-brand-primary text-white text-[10px] font-bold rounded-lg hover:opacity-95 transition-all text-center flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Store size={12} /> Kunjungi Toko
                  </button>
                  <a
                    href={`https://wa.me/${selectedUMKM.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2 border border-custom bg-custom-ter text-custom-main text-[10px] font-bold rounded-lg hover:bg-custom-card transition-all text-center flex items-center justify-center gap-1"
                  >
                    💬 Chat WhatsApp
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
