"use client";

import { useState, useRef } from "react";
import {
  User,
  Store,
  Lock,
  Camera,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Save,
  X,
  Eye,
  EyeOff,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Package,
  TrendingUp,
  Star,
  CheckCircle,
  AlertCircle,
  LogOut,
  Bell,
  Shield,
  CreditCard,
  Clock,
  BadgeCheck,
  Globe,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Tab = "profil" | "toko" | "transaksi" | "keamanan";

interface Transaction {
  id: string;
  buyer: string;
  product: string;
  amount: number;
  status: "Selesai" | "Diproses" | "Dikirim" | "Dibatalkan";
  date: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const transactions: Transaction[] = [
  {
    id: "TRX-001",
    buyer: "Sari D.",
    product: "Batik Tulis Parang",
    amount: 450000,
    status: "Selesai",
    date: "12 Jul 2025",
  },
  {
    id: "TRX-002",
    buyer: "Budi S.",
    product: "Kemeja Mega Mendung",
    amount: 320000,
    status: "Dikirim",
    date: "11 Jul 2025",
  },
  {
    id: "TRX-003",
    buyer: "Ratna K.",
    product: "Selendang Lereng",
    amount: 185000,
    status: "Diproses",
    date: "10 Jul 2025",
  },
  {
    id: "TRX-004",
    buyer: "Agus W.",
    product: "Batik Cap Kawung",
    amount: 250000,
    status: "Selesai",
    date: "9 Jul 2025",
  },
  {
    id: "TRX-005",
    buyer: "Dewi P.",
    product: "Daster Truntum",
    amount: 165000,
    status: "Dibatalkan",
    date: "8 Jul 2025",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const statusStyle: Record<Transaction["status"], string> = {
  Selesai: "bg-green-100 text-green-700",
  Dikirim: "bg-blue-100 text-blue-700",
  Diproses: "bg-amber-100 text-amber-700",
  Dibatalkan: "bg-red-100 text-red-600",
};

function InputField({
  label,
  value,
  onChange,
  type = "text",
  icon: Icon,
  disabled = false,
  placeholder,
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  type?: string;
  icon: React.ElementType;
  disabled?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-custom-muted mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        <Icon
          size={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-custom-muted"
        />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none ${
            disabled
              ? "bg-custom-ter text-custom-muted border-custom cursor-not-allowed"
              : "bg-custom-card border-custom text-custom-main focus:border-brand-primary"
          }`}
        />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SellerAccountPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profil");

  // Profil state
  const [editing, setEditing] = useState(false);
  const [nama, setNama] = useState("Budi Santoso");
  const [email] = useState("budi.santoso@email.com");
  const [phone, setPhone] = useState("0812-3456-7890");
  const [alamat, setAlamat] = useState("Jl. Malioboro No. 12, Yogyakarta");
  const [lahir, setLahir] = useState("1985-06-15");
  const [toast, setToast] = useState("");

  // Toko state
  const [editingToko, setEditingToko] = useState(false);
  const [namaToko, setNamaToko] = useState("Batik Nusantara Asri");
  const [deskripsitoko, setDeskripsiToko] = useState(
    "Pengrajin batik tulis dan cap tradisional sejak 1998. Menggunakan bahan berkualitas dan pewarna alami.",
  );
  const [alamatToko, setAlamatToko] = useState(
    "Jl. Malioboro No. 45, Yogyakarta",
  );
  const [instagram, setInstagram] = useState("@batiknusantaraasri");
  const [website, setWebsite] = useState("batiknusantara.co.id");

  // Keamanan state
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [oldPw, setOldPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [twoFA, setTwoFA] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleSaveProfil = () => {
    setEditing(false);
    showToast("Profil berhasil disimpan!");
  };

  const handleSaveToko = () => {
    setEditingToko(false);
    showToast("Info toko berhasil diperbarui!");
  };

  const handleSavePassword = () => {
    if (!oldPw || !newPw || !confirmPw)
      return showToast("Semua field harus diisi");
    if (newPw !== confirmPw) return showToast("Password baru tidak cocok");
    if (newPw.length < 8) return showToast("Password minimal 8 karakter");
    setOldPw("");
    setNewPw("");
    setConfirmPw("");
    showToast("Password berhasil diubah!");
  };

  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: "profil", label: "Profil", icon: User },
    { key: "toko", label: "Toko", icon: Store },
    { key: "transaksi", label: "Transaksi", icon: Package },
    { key: "keamanan", label: "Keamanan", icon: Lock },
  ];

  return (
    <div className="min-h-screen bg-custom-sec">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-custom-main text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-fade-in">
          <CheckCircle size={15} className="text-green-400" />
          {toast}
        </div>
      )}

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
        {/* Profile Header Card */}
        <div className="bg-custom-card border border-custom rounded-2xl overflow-hidden">
          <div
            className="h-24 relative"
            style={{ background: "var(--gradient-hero)" }}
          >
            <div className="absolute top-3 right-4 w-14 h-14 rounded-full bg-white/10 animate-float" />
          </div>
          <div className="px-5 pb-5">
            <div className="flex items-end gap-4 -mt-10 mb-4">
              <div className="relative">
                <div
                  className="w-20 h-20 rounded-2xl border-4 border-custom-card flex items-center justify-center text-3xl shadow-md"
                  style={{ background: "var(--gradient-hero)" }}
                >
                  👨‍💼
                </div>
                <button
                  onClick={() => fileRef.current?.click()}
                  className="absolute -bottom-1 -right-1 w-7 h-7 bg-brand-primary rounded-full border-2 border-white flex items-center justify-center hover:opacity-90 transition-opacity"
                >
                  <Camera size={12} className="text-white" />
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <div className="pb-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-custom-main font-bold text-lg">{nama}</h1>
                  <BadgeCheck size={16} className="text-brand-primary" />
                </div>
                <p className="text-custom-muted text-xs">
                  Seller Terverifikasi
                </p>
              </div>
            </div>

            {/* Mini Stats */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-custom">
              {[
                { icon: Package, label: "Produk", val: "48" },
                { icon: TrendingUp, label: "Terjual", val: "1.2K" },
                { icon: Star, label: "Rating", val: "4.9" },
              ].map(({ icon: Icon, label, val }) => (
                <div key={label} className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Icon size={13} className="text-brand-primary" />
                    <span className="font-bold text-custom-main text-base">
                      {val}
                    </span>
                  </div>
                  <p className="text-custom-muted text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-custom-card border border-custom rounded-2xl p-1 grid grid-cols-4 gap-1">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`py-2.5 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                activeTab === key
                  ? "bg-brand-primary text-white shadow-sm"
                  : "text-custom-muted hover:text-custom-main"
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>

        {/* ─ TAB: PROFIL ─ */}
        {activeTab === "profil" && (
          <div className="bg-custom-card border border-custom rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-bold text-custom-main">Data Pribadi</h2>
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-1.5 text-brand-primary text-sm font-semibold hover:opacity-80 transition-opacity"
                >
                  <Edit3 size={14} />
                  Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditing(false)}
                    className="flex items-center gap-1 text-custom-muted text-sm hover:text-custom-main transition-colors"
                  >
                    <X size={14} />
                    Batal
                  </button>
                  <button
                    onClick={handleSaveProfil}
                    className="flex items-center gap-1.5 bg-brand-primary text-white text-sm font-semibold px-3 py-1.5 rounded-xl hover:opacity-90 transition-opacity"
                  >
                    <Save size={14} />
                    Simpan
                  </button>
                </div>
              )}
            </div>

            <InputField
              label="Nama Lengkap"
              value={nama}
              onChange={setNama}
              icon={User}
              disabled={!editing}
            />
            <InputField
              label="Email"
              value={email}
              icon={Mail}
              disabled
              placeholder={email}
            />
            <InputField
              label="No. HP"
              value={phone}
              onChange={setPhone}
              icon={Phone}
              disabled={!editing}
              type="tel"
            />
            <InputField
              label="Alamat"
              value={alamat}
              onChange={setAlamat}
              icon={MapPin}
              disabled={!editing}
            />
            <InputField
              label="Tanggal Lahir"
              value={lahir}
              onChange={setLahir}
              icon={Calendar}
              disabled={!editing}
              type="date"
            />

            {!editing && (
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 flex items-center gap-2">
                <CheckCircle size={15} className="text-teal-600 shrink-0" />
                <p className="text-teal-700 text-xs">
                  Akun Anda sudah terverifikasi oleh sistem UMKM
                </p>
              </div>
            )}
          </div>
        )}

        {/* ─ TAB: TOKO ─ */}
        {activeTab === "toko" && (
          <div className="bg-custom-card border border-custom rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-bold text-custom-main">Info Toko</h2>
              {!editingToko ? (
                <button
                  onClick={() => setEditingToko(true)}
                  className="flex items-center gap-1.5 text-brand-primary text-sm font-semibold hover:opacity-80 transition-opacity"
                >
                  <Edit3 size={14} />
                  Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingToko(false)}
                    className="text-custom-muted text-sm hover:text-custom-main transition-colors flex items-center gap-1"
                  >
                    <X size={14} /> Batal
                  </button>
                  <button
                    onClick={handleSaveToko}
                    className="flex items-center gap-1.5 bg-brand-primary text-white text-sm font-semibold px-3 py-1.5 rounded-xl hover:opacity-90 transition-opacity"
                  >
                    <Save size={14} /> Simpan
                  </button>
                </div>
              )}
            </div>

            <InputField
              label="Nama Toko"
              value={namaToko}
              onChange={setNamaToko}
              icon={Store}
              disabled={!editingToko}
            />

            <div>
              <label className="block text-xs font-semibold text-custom-muted mb-1.5 uppercase tracking-wide">
                Deskripsi Toko
              </label>
              <textarea
                value={deskripsitoko}
                onChange={(e) => setDeskripsiToko(e.target.value)}
                disabled={!editingToko}
                rows={3}
                className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none resize-none ${
                  !editingToko
                    ? "bg-custom-ter text-custom-muted border-custom cursor-not-allowed"
                    : "bg-custom-card border-custom text-custom-main focus:border-brand-primary"
                }`}
              />
            </div>

            <InputField
              label="Alamat Toko"
              value={alamatToko}
              onChange={setAlamatToko}
              icon={MapPin}
              disabled={!editingToko}
            />
            <InputField
              label="Website"
              value={website}
              onChange={setWebsite}
              icon={Globe}
              disabled={!editingToko}
              placeholder="www.tokoku.com"
            />

            {/* Jam operasional info */}
            <div className="pt-2 border-t border-custom">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock size={15} className="text-brand-primary" />
                  <span className="text-sm text-custom-main font-medium">
                    Jam Operasional
                  </span>
                </div>
                <span className="text-sm text-custom-muted">
                  Sen–Sab, 08.00–17.00
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ─ TAB: TRANSAKSI ─ */}
        {activeTab === "transaksi" && (
          <div className="space-y-3">
            {/* Summary */}
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  label: "Total Pendapatan",
                  value: "Rp 4.87Jt",
                  color: "text-green-600",
                  bg: "bg-green-50",
                },
                {
                  label: "Transaksi Bulan Ini",
                  value: "23",
                  color: "text-brand-primary",
                  bg: "bg-teal-50",
                },
              ].map(({ label, value, color, bg }) => (
                <div
                  key={label}
                  className={`${bg} rounded-2xl p-4 border border-custom`}
                >
                  <p className={`text-xl font-bold ${color}`}>{value}</p>
                  <p className="text-custom-muted text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            {/* Filter pills */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {["Semua", "Selesai", "Dikirim", "Diproses", "Dibatalkan"].map(
                (f, i) => (
                  <button
                    key={f}
                    className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      i === 0
                        ? "bg-brand-primary text-white border-transparent"
                        : "border-custom text-custom-muted bg-custom-card hover:border-brand-primary hover:text-brand-primary"
                    }`}
                  >
                    {f}
                  </button>
                ),
              )}
            </div>

            {/* Transaction list */}
            <div className="space-y-3">
              {transactions.map((trx) => (
                <div
                  key={trx.id}
                  className="bg-custom-card border border-custom rounded-2xl p-4"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <p className="text-custom-muted text-xs">
                        {trx.id} · {trx.date}
                      </p>
                      <p className="text-custom-main font-semibold text-sm mt-0.5">
                        {trx.product}
                      </p>
                      <p className="text-custom-muted text-xs">
                        Pembeli: {trx.buyer}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${statusStyle[trx.status]}`}
                    >
                      {trx.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-custom">
                    <p className="text-brand-primary font-bold text-sm">
                      Rp {trx.amount.toLocaleString("id-ID")}
                    </p>
                    <button className="flex items-center gap-1 text-custom-muted text-xs hover:text-brand-primary transition-colors">
                      Detail
                      <ChevronRight size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─ TAB: KEAMANAN ─ */}
        {activeTab === "keamanan" && (
          <div className="space-y-4">
            {/* Ganti Password */}
            <div className="bg-custom-card border border-custom rounded-2xl p-5 space-y-4">
              <h2 className="font-bold text-custom-main flex items-center gap-2">
                <Lock size={16} className="text-brand-primary" />
                Ganti Password
              </h2>

              {[
                {
                  label: "Password Lama",
                  val: oldPw,
                  set: setOldPw,
                  show: showOld,
                  toggle: () => setShowOld(!showOld),
                },
                {
                  label: "Password Baru",
                  val: newPw,
                  set: setNewPw,
                  show: showNew,
                  toggle: () => setShowNew(!showNew),
                },
                {
                  label: "Konfirmasi Password",
                  val: confirmPw,
                  set: setConfirmPw,
                  show: showConfirm,
                  toggle: () => setShowConfirm(!showConfirm),
                },
              ].map(({ label, val, set, show, toggle }) => (
                <div key={label}>
                  <label className="block text-xs font-semibold text-custom-muted mb-1.5 uppercase tracking-wide">
                    {label}
                  </label>
                  <div className="relative">
                    <Lock
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-custom-muted"
                    />
                    <input
                      type={show ? "text" : "password"}
                      value={val}
                      onChange={(e) => set(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-3 rounded-xl border border-custom bg-custom-card text-custom-main text-sm focus:outline-none focus:border-brand-primary transition-colors"
                    />
                    <button
                      type="button"
                      onClick={toggle}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-custom-muted hover:text-custom-main"
                    >
                      {show ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
              ))}

              {newPw && newPw.length < 8 && (
                <div className="flex items-center gap-2 text-amber-600">
                  <AlertCircle size={14} />
                  <p className="text-xs">Password minimal 8 karakter</p>
                </div>
              )}

              <button
                onClick={handleSavePassword}
                className="w-full bg-brand-primary text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Save size={16} />
                Simpan Password
              </button>
            </div>

            {/* Pengaturan Keamanan */}
            <div className="bg-custom-card border border-custom rounded-2xl p-5 space-y-4">
              <h2 className="font-bold text-custom-main flex items-center gap-2">
                <Shield size={16} className="text-brand-primary" />
                Pengaturan Akun
              </h2>

              {[
                {
                  icon: Shield,
                  label: "Verifikasi Dua Langkah (2FA)",
                  desc: "Keamanan tambahan saat login",
                  val: twoFA,
                  set: setTwoFA,
                },
                {
                  icon: Bell,
                  label: "Notifikasi Email",
                  desc: "Info pesanan & promo via email",
                  val: emailNotif,
                  set: setEmailNotif,
                },
                {
                  icon: Phone,
                  label: "Notifikasi SMS",
                  desc: "Info pesanan via pesan singkat",
                  val: smsNotif,
                  set: setSmsNotif,
                },
              ].map(({ icon: Icon, label, desc, val, set }) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-teal-50 rounded-xl flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-brand-primary" />
                    </div>
                    <div>
                      <p className="text-custom-main text-sm font-medium">
                        {label}
                      </p>
                      <p className="text-custom-muted text-xs">{desc}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => set(!val)}
                    className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
                      val ? "bg-brand-primary" : "bg-custom-ter"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                        val ? "translate-x-5.5" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            {/* Metode Pembayaran */}
            <div className="bg-custom-card border border-custom rounded-2xl p-5">
              <h2 className="font-bold text-custom-main flex items-center gap-2 mb-4">
                <CreditCard size={16} className="text-brand-primary" />
                Rekening Pencairan
              </h2>
              <div className="flex items-center justify-between bg-custom-ter rounded-xl px-4 py-3">
                <div>
                  <p className="text-custom-muted text-xs">BCA • Tabungan</p>
                  <p className="text-custom-main font-semibold text-sm">
                    1234 5678 9012
                  </p>
                  <p className="text-custom-muted text-xs">a.n. Budi Santoso</p>
                </div>
                <CheckCircle size={18} className="text-green-500" />
              </div>
              <button className="mt-3 w-full border border-brand-primary text-brand-primary text-sm font-semibold py-2.5 rounded-xl hover:bg-teal-50 transition-colors">
                + Tambah Rekening
              </button>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
              <h2 className="font-bold text-red-600 mb-1 text-sm">
                Zona Bahaya
              </h2>
              <p className="text-red-500 text-xs mb-3">
                Tindakan ini tidak dapat dibatalkan
              </p>
              <button className="w-full border border-red-300 text-red-500 text-sm font-semibold py-2.5 rounded-xl hover:bg-red-100 transition-colors">
                Hapus Akun
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
