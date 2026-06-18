"use client";

import { useState } from "react";
import {
  Building2,
  LayoutGrid,
  BookOpen,
  FileCheck,
  ChevronRight,
  ChevronLeft,
  Check,
  MapPin,
  Phone,
  Mail,
  User,
  Globe,
  Upload,
  AlertCircle,
  Store,
  Utensils,
  Shirt,
  Gem,
  Paintbrush,
  Leaf,
  Package,
  Hammer,
  X,
  Info,
  LucideIcon,
} from "lucide-react";
import Image from "next/image";
// ─── Types ────────────────────────────────────────────────────────────────────

interface Step1Data {
  namaUsaha: string;
  namaPemilik: string;
  alamat: string;
  kecamatan: string;
  tahunBerdiri: string;
  telepon: string;
  email: string;
  website: string;
}

interface Step2Data {
  categories: string[];
  scale: string;
  produkUnggulan: string;
  kisaranHarga: string;
  channel: string;
}

interface Step3Data {
  sejarah: string;
  keunikan: string;
  tantangan: string;
  harapan: string;
}

interface Step4Data {
  docs: Record<string, File>;
  agreements: Record<number, boolean>;
}

interface InputFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

interface TextInputProps {
  icon?: LucideIcon | null;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

interface TextareaProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  maxLength?: number;
}

interface DocField {
  id: string;
  label: string;
  required: boolean;
  accept: string;
  hint: string;
}

interface FileUploadBoxProps {
  field: DocField;
  file: File | undefined;
  onUpload: (id: string, file: File) => void;
  onRemove: (id: string) => void;
}

interface StepProps<T> {
  data: T;
  setData: React.Dispatch<React.SetStateAction<T>>;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    id: 1,
    label: "Identitas Bisnis",
    icon: Building2,
    desc: "Data utama usaha kamu",
  },
  {
    id: 2,
    label: "Kategori Produk",
    icon: LayoutGrid,
    desc: "Jenis produk yang dijual",
  },
  {
    id: 3,
    label: "Sejarah & Cerita",
    icon: BookOpen,
    desc: "Latar belakang usaha",
  },
  {
    id: 4,
    label: "Verifikasi Dokumen",
    icon: FileCheck,
    desc: "Dokumen legalitas",
  },
];

const CATEGORIES: {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
}[] = [
  { id: "kuliner", label: "Kuliner", icon: Utensils, color: "text-orange-500" },
  {
    id: "fashion",
    label: "Fashion & Batik",
    icon: Shirt,
    color: "text-purple-500",
  },
  { id: "kerajinan", label: "Kerajinan", icon: Gem, color: "text-teal-500" },
  {
    id: "seni",
    label: "Seni & Budaya",
    icon: Paintbrush,
    color: "text-pink-500",
  },
  { id: "pertanian", label: "Pertanian", icon: Leaf, color: "text-green-500" },
  {
    id: "olahan",
    label: "Produk Olahan",
    icon: Package,
    color: "text-amber-500",
  },
  { id: "toko", label: "Toko Umum", icon: Store, color: "text-blue-500" },
  { id: "jasa", label: "Jasa & Bengkel", icon: Hammer, color: "text-red-500" },
];

const SCALE_OPTIONS = [
  { id: "mikro", label: "Mikro", desc: "< 10 karyawan, omzet < 300jt/thn" },
  { id: "kecil", label: "Kecil", desc: "10–99 karyawan, omzet 300jt–2,5M/thn" },
  {
    id: "menengah",
    label: "Menengah",
    desc: "100–300 karyawan, omzet > 2,5M/thn",
  },
];

const DOC_FIELDS: DocField[] = [
  {
    id: "ktp",
    label: "KTP Pemilik",
    required: true,
    accept: "image/*,.pdf",
    hint: "Format JPG, PNG, atau PDF. Maks 5MB.",
  },
  {
    id: "nik",
    label: "NIB (Nomor Induk Berusaha)",
    required: true,
    accept: ".pdf,image/*",
    hint: "Dokumen resmi dari OSS. Format PDF atau gambar.",
  },
  {
    id: "siup",
    label: "SIUP / Izin Usaha",
    required: false,
    accept: ".pdf,image/*",
    hint: "Opsional. Jika belum ada, bisa dilengkapi kemudian.",
  },
  {
    id: "foto",
    label: "Foto Tempat Usaha",
    required: true,
    accept: "image/*",
    hint: "Foto tampak depan yang jelas. Format JPG/PNG.",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function InputField({
  label,
  required = false,
  error,
  hint,
  children,
}: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-custom-muted">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="text-[11px] text-custom-muted flex items-center gap-1">
          <Info size={10} /> {hint}
        </p>
      )}
      {error && (
        <p className="text-[11px] text-red-500 flex items-center gap-1">
          <AlertCircle size={10} /> {error}
        </p>
      )}
    </div>
  );
}

function TextInput({
  icon: Icon,
  placeholder,
  value,
  onChange,
  type = "text",
}: TextInputProps) {
  return (
    <div className="relative">
      {Icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-custom-muted">
          <Icon size={14} />
        </span>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full ${Icon ? "pl-9" : "pl-3"} pr-3 py-2.5 text-sm rounded-xl border border-custom bg-custom-ter focus:outline-none focus:border-brand-primary focus:bg-custom-card transition-colors`}
      />
    </div>
  );
}

function Textarea({
  placeholder,
  value,
  onChange,
  rows = 4,
  maxLength,
}: TextareaProps) {
  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        className="w-full px-3 py-2.5 text-sm rounded-xl border border-custom bg-custom-ter focus:outline-none focus:border-brand-primary focus:bg-custom-card transition-colors resize-none"
      />
      {maxLength && (
        <span className="absolute bottom-2 right-3 text-[10px] text-custom-muted">
          {value?.length || 0}/{maxLength}
        </span>
      )}
    </div>
  );
}

function FileUploadBox({
  field,
  file,
  onUpload,
  onRemove,
}: FileUploadBoxProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-custom-muted">
        {field.label}
        {field.required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {file ? (
        <div className="flex items-center gap-3 p-3 rounded-xl border border-teal-200 bg-teal-50">
          <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
            <FileCheck size={15} className="text-brand-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-custom-main truncate">
              {file.name}
            </p>
            <p className="text-[10px] text-custom-muted">
              {(file.size / 1024).toFixed(0)} KB
            </p>
          </div>
          <button
            onClick={() => onRemove(field.id)}
            className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500 hover:bg-red-200 transition-colors flex-shrink-0"
          >
            <X size={11} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center gap-2 p-5 rounded-xl border-2 border-dashed border-custom bg-custom-ter hover:border-brand-primary hover:bg-teal-50/30 transition-colors cursor-pointer group">
          <div className="w-9 h-9 rounded-xl bg-custom-card border border-custom flex items-center justify-center group-hover:border-brand-primary transition-colors">
            <Upload
              size={16}
              className="text-custom-muted group-hover:text-brand-primary transition-colors"
            />
          </div>
          <div className="text-center">
            <p className="text-xs font-semibold text-custom-muted group-hover:text-brand-primary transition-colors">
              Klik untuk unggah
            </p>
            <p className="text-[10px] text-custom-muted mt-0.5">{field.hint}</p>
          </div>
          <input
            type="file"
            accept={field.accept}
            className="hidden"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files && e.target.files[0]) {
                onUpload(field.id, e.target.files[0]);
              }
            }}
          />
        </label>
      )}
    </div>
  );
}

// ─── Step Components ──────────────────────────────────────────────────────────

function Step1({ data, setData }: StepProps<Step1Data>) {
  const update =
    (key: keyof Step1Data) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setData((d) => ({ ...d, [key]: e.target.value }));

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField label="Nama Usaha" required>
          <TextInput
            icon={Store}
            placeholder="cth. Pempek Bu Yanti"
            value={data.namaUsaha}
            onChange={update("namaUsaha")}
          />
        </InputField>
        <InputField label="Nama Pemilik" required>
          <TextInput
            icon={User}
            placeholder="Nama lengkap sesuai KTP"
            value={data.namaPemilik}
            onChange={update("namaPemilik")}
          />
        </InputField>
      </div>

      <InputField
        label="Alamat Usaha"
        required
        hint="Tuliskan alamat lengkap termasuk RT/RW, kelurahan, dan kecamatan."
      >
        <Textarea
          placeholder="Jl. Jend. Sudirman No. 12, RT 01/RW 03, Bukit Besar..."
          value={data.alamat}
          onChange={update("alamat")}
          rows={3}
        />
      </InputField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField label="Kecamatan" required>
          <div className="relative">
            <MapPin
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-custom-muted"
            />
            <select
              value={data.kecamatan}
              onChange={update("kecamatan")}
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-custom bg-custom-ter focus:outline-none focus:border-brand-primary appearance-none"
            >
              <option value="">Pilih Kecamatan</option>
              {[
                "Ilir Barat I",
                "Ilir Barat II",
                "Ilir Timur I",
                "Ilir Timur II",
                "Seberang Ulu I",
                "Seberang Ulu II",
                "Bukit Kecil",
                "Gandus",
                "Kalidoni",
                "Sako",
                "Sukarami",
                "Alang-Alang Lebar",
                "Plaju",
                "Kemuning",
                "Jakabaring",
                "Sematang Borang",
              ].map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>
        </InputField>
        <InputField label="Tahun Berdiri" required>
          <TextInput
            icon={null}
            placeholder="cth. 2018"
            value={data.tahunBerdiri}
            onChange={update("tahunBerdiri")}
            type="number"
          />
        </InputField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField label="Nomor Telepon" required>
          <TextInput
            icon={Phone}
            placeholder="08xxxxxxxxxx"
            value={data.telepon}
            onChange={update("telepon")}
            type="tel"
          />
        </InputField>
        <InputField label="Email" required>
          <TextInput
            icon={Mail}
            placeholder="usaha@email.com"
            value={data.email}
            onChange={update("email")}
            type="email"
          />
        </InputField>
      </div>

      <InputField
        label="Website / Media Sosial"
        hint="Opsional. Bisa diisi link Instagram, TikTok, atau website usaha."
      >
        <TextInput
          icon={Globe}
          placeholder="https://instagram.com/namaakun"
          value={data.website}
          onChange={update("website")}
        />
      </InputField>
    </div>
  );
}

function Step2({ data, setData }: StepProps<Step2Data>) {
  const toggle = (id: string) => {
    setData((d) => ({
      ...d,
      categories: d.categories.includes(id)
        ? d.categories.filter((c: string) => c !== id)
        : [...d.categories, id],
    }));
  };

  const update =
    (key: keyof Step2Data) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setData((d) => ({ ...d, [key]: e.target.value }));

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-custom-muted mb-3">
          Kategori Produk <span className="text-red-500">*</span>
          <span className="font-normal ml-1">(pilih satu atau lebih)</span>
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const selected = data.categories.includes(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => toggle(cat.id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-center ${
                  selected
                    ? "border-brand-primary bg-teal-50 shadow-sm"
                    : "border-custom bg-custom-ter hover:border-brand-primary/40"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${selected ? "bg-brand-primary/10" : "bg-custom-card border border-custom"}`}
                >
                  <Icon
                    size={18}
                    className={selected ? "text-brand-primary" : cat.color}
                  />
                </div>
                <span
                  className={`text-xs font-semibold leading-tight ${selected ? "text-brand-primary" : "text-custom-main"}`}
                >
                  {cat.label}
                </span>
                {selected && (
                  <div className="w-4 h-4 rounded-full bg-brand-primary flex items-center justify-center">
                    <Check size={10} className="text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-custom-muted mb-3">
          Skala Usaha <span className="text-red-500">*</span>
        </p>
        <div className="space-y-2.5">
          {SCALE_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setData((d) => ({ ...d, scale: opt.id }))}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                data.scale === opt.id
                  ? "border-brand-primary bg-teal-50"
                  : "border-custom bg-custom-ter hover:border-brand-primary/40"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${data.scale === opt.id ? "border-brand-primary bg-brand-primary" : "border-custom"}`}
              >
                {data.scale === opt.id && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <div>
                <p
                  className={`text-sm font-bold ${data.scale === opt.id ? "text-brand-primary" : "text-custom-main"}`}
                >
                  {opt.label}
                </p>
                <p className="text-xs text-custom-muted mt-0.5">{opt.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <InputField
        label="Produk Unggulan"
        required
        hint="Sebutkan 3–5 produk utama yang paling banyak dijual."
      >
        <Textarea
          placeholder="cth. Pempek Kapal Selam, Tekwan, Model, Lenggang, Pempek Kulit..."
          value={data.produkUnggulan}
          onChange={update("produkUnggulan")}
          rows={3}
        />
      </InputField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="Kisaran Harga"
          hint="Harga terendah hingga tertinggi produk kamu."
        >
          <TextInput
            icon={null}
            placeholder="cth. Rp 15.000 – Rp 150.000"
            value={data.kisaranHarga}
            onChange={update("kisaranHarga")}
          />
        </InputField>
        <InputField
          label="Channel Penjualan"
          hint="Offline, online, atau keduanya?"
        >
          <select
            value={data.channel}
            onChange={update("channel")}
            className="w-full px-3 py-2.5 text-sm rounded-xl border border-custom bg-custom-ter focus:outline-none focus:border-brand-primary appearance-none"
          >
            <option value="">Pilih channel</option>
            <option value="offline">Offline (Toko/Pasar)</option>
            <option value="online">Online (Marketplace/Sosmed)</option>
            <option value="keduanya">Offline + Online</option>
          </select>
        </InputField>
      </div>
    </div>
  );
}

function Step3({ data, setData }: StepProps<Step3Data>) {
  const update =
    (key: keyof Step3Data) => (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      setData((d) => ({ ...d, [key]: e.target.value }));

  return (
    <div className="space-y-5">
      <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 flex gap-3">
        <Info size={16} className="text-brand-primary flex-shrink-0 mt-0.5" />
        <p className="text-xs text-teal-800 leading-relaxed">
          Bagian ini akan ditampilkan di profil publik UMKM kamu dan digunakan
          oleh tim Pemkot untuk memahami latar belakang usahamu. Ceritakan
          dengan jujur dan detail.
        </p>
      </div>

      <InputField
        label="Sejarah Singkat Usaha"
        required
        hint="Kapan, bagaimana, dan mengapa usaha ini dimulai?"
      >
        <Textarea
          placeholder="Usaha ini dimulai sejak tahun 2015 ketika saya memutuskan untuk meneruskan resep pempek nenek yang sudah turun-temurun..."
          value={data.sejarah}
          onChange={update("sejarah")}
          rows={5}
          maxLength={800}
        />
      </InputField>

      <InputField
        label="Keunikan & Keunggulan Produk"
        required
        hint="Apa yang membuat produk kamu berbeda dari yang lain?"
      >
        <Textarea
          placeholder="Pempek kami menggunakan ikan belida asli sungai Musi yang semakin langka..."
          value={data.keunikan}
          onChange={update("keunikan")}
          rows={4}
          maxLength={500}
        />
      </InputField>

      <InputField
        label="Tantangan yang Dihadapi"
        hint="Opsional. Ceritakan kendala yang masih dihadapi usahamu saat ini."
      >
        <Textarea
          placeholder="Kendala utama kami saat ini adalah keterbatasan modal..."
          value={data.tantangan}
          onChange={update("tantangan")}
          rows={3}
          maxLength={400}
        />
      </InputField>

      <InputField
        label="Harapan & Rencana ke Depan"
        required
        hint="Apa target usaha kamu dalam 1–2 tahun ke depan?"
      >
        <Textarea
          placeholder="Kami berharap dapat membuka cabang baru di kawasan Jakabaring..."
          value={data.harapan}
          onChange={update("harapan")}
          rows={3}
          maxLength={400}
        />
      </InputField>
    </div>
  );
}

function Step4({ data, setData }: StepProps<Step4Data>) {
  const handleUpload = (id: string, file: File) => {
    setData((d) => ({ ...d, docs: { ...d.docs, [id]: file } }));
  };
  const handleRemove = (id: string) => {
    setData((d) => {
      const docs = { ...d.docs };
      delete docs[id];
      return { ...d, docs };
    });
  };

  return (
    <div className="space-y-5">
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex gap-3">
        <AlertCircle
          size={16}
          className="text-amber-600 flex-shrink-0 mt-0.5"
        />
        <p className="text-xs text-amber-800 leading-relaxed">
          Dokumen yang diunggah bersifat <strong>rahasia</strong> dan hanya
          dapat diakses oleh tim verifikasi Dinas Koperasi & UMKM Kota
          Palembang. Pastikan dokumen terbaca jelas sebelum diunggah.
        </p>
      </div>

      <div className="space-y-4">
        {DOC_FIELDS.map((field) => (
          <FileUploadBox
            key={field.id}
            field={field}
            file={data.docs?.[field.id]}
            onUpload={handleUpload}
            onRemove={handleRemove}
          />
        ))}
      </div>

      <div className="p-4 rounded-xl border border-custom bg-custom-ter space-y-3">
        <p className="text-xs font-bold text-custom-main">
          Pernyataan & Persetujuan
        </p>
        {[
          "Saya menyatakan bahwa seluruh data yang diisi adalah benar dan dapat dipertanggungjawabkan.",
          "Saya bersedia mengikuti proses verifikasi lapangan jika diperlukan oleh pihak Pemkot.",
          "Saya menyetujui bahwa data usaha saya dapat ditampilkan di platform UMKM Palembang.",
        ].map((text, i) => (
          <label
            key={i}
            className="flex items-start gap-3 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={data.agreements?.[i] || false}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setData((d) => ({
                  ...d,
                  agreements: {
                    ...(d.agreements || {}),
                    [i]: e.target.checked,
                  },
                }))
              }
              className="mt-0.5 w-4 h-4 rounded accent-teal-600 flex-shrink-0"
            />
            <span className="text-xs text-custom-muted leading-relaxed group-hover:text-custom-main transition-colors">
              {text}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function RegisterUMKM() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [step1, setStep1] = useState<Step1Data>({
    namaUsaha: "",
    namaPemilik: "",
    alamat: "",
    kecamatan: "",
    tahunBerdiri: "",
    telepon: "",
    email: "",
    website: "",
  });
  const [step2, setStep2] = useState<Step2Data>({
    categories: [],
    scale: "",
    produkUnggulan: "",
    kisaranHarga: "",
    channel: "",
  });
  const [step3, setStep3] = useState<Step3Data>({
    sejarah: "",
    keunikan: "",
    tantangan: "",
    harapan: "",
  });
  const [step4, setStep4] = useState<Step4Data>({ docs: {}, agreements: {} });

  const canNext = (): boolean => {
    if (step === 1)
      return !!(
        step1.namaUsaha &&
        step1.namaPemilik &&
        step1.alamat &&
        step1.telepon &&
        step1.email
      );
    if (step === 2)
      return (
        step2.categories.length > 0 && !!step2.scale && !!step2.produkUnggulan
      );
    if (step === 3) return !!(step3.sejarah && step3.keunikan && step3.harapan);
    if (step === 4) {
      const requiredDocs = DOC_FIELDS.filter((f) => f.required).every(
        (f) => step4.docs?.[f.id],
      );
      const allAgreed = ([0, 1, 2] as const).every(
        (i) => step4.agreements?.[i],
      );
      return requiredDocs && allAgreed;
    }
    return true;
  };

  const handleSubmit = () => setSubmitted(true);

  if (submitted) {
    return (
      <div className="min-h-screen bg-custom-main flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-5">
          <div className="w-20 h-20 rounded-full bg-teal-50 border-2 border-teal-200 flex items-center justify-center mx-auto">
            <Check size={36} className="text-brand-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-custom-main mb-2">
              Pendaftaran Terkirim!
            </h2>
            <p className="text-sm text-custom-muted leading-relaxed">
              Data UMKM{" "}
              <strong className="text-custom-main">{step1.namaUsaha}</strong>{" "}
              sedang dalam proses verifikasi oleh tim Dinas Koperasi & UMKM Kota
              Palembang. Kami akan menghubungi kamu melalui email atau telepon
              dalam 3–5 hari kerja.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-custom-sec border border-custom text-left space-y-2">
            <p className="text-xs font-bold text-custom-muted uppercase tracking-wide">
              Langkah selanjutnya
            </p>
            {[
              "Tim verifikasi akan meninjau dokumen kamu",
              "Survei lapangan mungkin dilakukan (jika diperlukan)",
              "Akun penjual aktif setelah disetujui Pemkot",
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold text-brand-primary">
                    {i + 1}
                  </span>
                </div>
                <p className="text-xs text-custom-muted">{t}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              setSubmitted(false);
              setStep(1);
            }}
            className="text-xs text-brand-primary hover:underline"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-custom-sec">
      {/* Top bar */}
      <div className="bg-custom-card border-b border-custom sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-brand-primary flex items-center justify-center">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center overflow-hidden">
                <Image
                  src="https://cdn.aceimg.com/W6DtV9UeS.png"
                  alt="Logo"
                  width={1080}
                  height={1080}
                  className="object-contain"
                />
              </div>
            </div>
            <span className="text-sm font-bold text-custom-main">
              Daftar UMKM
            </span>
          </div>
          <span className="text-xs text-custom-muted">
            Langkah <span className="font-bold text-custom-main">{step}</span>{" "}
            dari 4
          </span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Step indicator */}
        <div className="flex items-center gap-0">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const done = step > s.id;
            const active = step === s.id;
            return (
              <div key={s.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all border-2 ${
                      done
                        ? "bg-brand-primary border-brand-primary"
                        : active
                          ? "bg-teal-50 border-brand-primary"
                          : "bg-custom-card border-custom"
                    }`}
                  >
                    {done ? (
                      <Check size={16} className="text-white" />
                    ) : (
                      <Icon
                        size={15}
                        className={
                          active ? "text-brand-primary" : "text-custom-muted"
                        }
                      />
                    )}
                  </div>
                  <span
                    className={`text-[9px] font-semibold hidden sm:block text-center leading-tight max-w-[60px] ${
                      active
                        ? "text-brand-primary"
                        : done
                          ? "text-brand-primary"
                          : "text-custom-muted"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-1 rounded-full transition-colors ${step > s.id ? "bg-brand-primary" : "bg-custom-ter"}`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Card */}
        <div className="bg-custom-card border border-custom rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-custom">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                {(() => {
                  const Icon = STEPS[step - 1].icon;
                  return <Icon size={18} className="text-brand-primary" />;
                })()}
              </div>
              <div>
                <h2 className="text-base font-extrabold text-custom-main">
                  {STEPS[step - 1].label}
                </h2>
                <p className="text-xs text-custom-muted">
                  {STEPS[step - 1].desc}
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 py-6">
            {step === 1 && <Step1 data={step1} setData={setStep1} />}
            {step === 2 && <Step2 data={step2} setData={setStep2} />}
            {step === 3 && <Step3 data={step3} setData={setStep3} />}
            {step === 4 && <Step4 data={step4} setData={setStep4} />}
          </div>

          {/* Footer nav */}
          <div className="px-6 py-4 border-t border-custom flex items-center justify-between gap-3 bg-custom-sec">
            <button
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 1}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-custom text-sm font-semibold text-custom-muted hover:border-brand-primary hover:text-brand-primary transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft size={16} />
              Kembali
            </button>

            <div className="flex items-center gap-1.5">
              {STEPS.map((s) => (
                <div
                  key={s.id}
                  className={`rounded-full transition-all ${s.id === step ? "w-5 h-2 bg-brand-primary" : s.id < step ? "w-2 h-2 bg-brand-primary/40" : "w-2 h-2 bg-custom-ter"}`}
                />
              ))}
            </div>

            {step < 4 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canNext()}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-brand-primary text-white text-sm font-semibold hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:pointer-events-none"
              >
                Lanjut
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canNext()}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-brand-primary text-white text-sm font-semibold hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:pointer-events-none"
              >
                <Check size={15} />
                Kirim Pendaftaran
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-[11px] text-custom-muted pb-6">
          Butuh bantuan?{" "}
          <a
            href="#"
            className="text-brand-primary hover:underline font-semibold"
          >
            Hubungi Dinas Koperasi & UMKM
          </a>
        </p>
      </div>
    </div>
  );
}
