"use client";

import { useState } from "react";
import {
  ChevronDown,
  Search,
  MessageCircle,
  Phone,
  Mail,
  ShoppingBag,
  Truck,
  CreditCard,
  Store,
  ShieldCheck,
  RotateCcw,
  HelpCircle,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

interface FAQCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES: FAQCategory[] = [
  { id: "all", label: "Semua", icon: <HelpCircle size={15} /> },
  { id: "belanja", label: "Cara Belanja", icon: <ShoppingBag size={15} /> },
  { id: "pengiriman", label: "Pengiriman", icon: <Truck size={15} /> },
  { id: "pembayaran", label: "Pembayaran", icon: <CreditCard size={15} /> },
  { id: "penjual", label: "Jadi Penjual", icon: <Store size={15} /> },
  { id: "retur", label: "Retur & Refund", icon: <RotateCcw size={15} /> },
  { id: "keamanan", label: "Keamanan", icon: <ShieldCheck size={15} /> },
];

const FAQS: FAQItem[] = [
  // Belanja
  {
    id: 1,
    category: "belanja",
    question: "Bagaimana cara memesan produk di Smart UMKM?",
    answer:
      "Cukup pilih produk yang kamu inginkan, klik 'Tambah ke Keranjang', lalu lanjutkan ke halaman checkout. Isi alamat pengiriman, pilih kurir, dan selesaikan pembayaran. Pesanan kamu akan segera diproses oleh penjual.",
  },
  {
    id: 2,
    category: "belanja",
    question: "Apakah saya bisa membeli produk tanpa membuat akun?",
    answer:
      "Untuk saat ini pembelian memerlukan akun terdaftar agar kamu bisa melacak pesanan, menyimpan alamat, dan menikmati program loyalitas. Pendaftaran gratis dan hanya butuh beberapa menit.",
  },
  {
    id: 3,
    category: "belanja",
    question: "Bagaimana cara menggunakan kode promo?",
    answer:
      "Masukkan kode promo di halaman keranjang belanja pada kolom 'Kode Promo', lalu klik 'Terapkan'. Diskon akan otomatis terpotong dari total belanja kamu. Pastikan syarat minimum pembelian terpenuhi.",
  },
  {
    id: 4,
    category: "belanja",
    question: "Apakah semua produk di Smart UMKM terjamin keasliannya?",
    answer:
      "Ya! Setiap UMKM yang berjualan di platform kami telah melalui proses verifikasi dan persetujuan oleh Dinas Koperasi & UMKM Kota Palembang. Produk berlabel 'Authentic' telah melewati kurasi ketat dari tim kami.",
  },
  // Pengiriman
  {
    id: 5,
    category: "pengiriman",
    question: "Berapa lama estimasi pengiriman ke luar Palembang?",
    answer:
      "Estimasi pengiriman bergantung pada kurir yang kamu pilih. JNE Reguler 2–3 hari kerja, POS Kilat 3–5 hari kerja, dan GoSend Instant 2–3 jam untuk area Palembang. Untuk produk makanan seperti pempek, kami sarankan memilih layanan ekspres agar produk tetap segar.",
  },
  {
    id: 6,
    category: "pengiriman",
    question: "Apakah produk makanan bisa dikirim ke luar kota?",
    answer:
      "Bisa! Penjual kami menggunakan kemasan vakum dan coolbox untuk menjaga kualitas produk selama pengiriman. Pilih layanan pengiriman ekspres (JNE YES atau Paxel) untuk memastikan makanan sampai dalam kondisi terbaik.",
  },
  {
    id: 7,
    category: "pengiriman",
    question: "Bagaimana cara melacak pesanan saya?",
    answer:
      "Setelah pesanan dikirim, kamu akan mendapatkan notifikasi beserta nomor resi. Kamu bisa melacak pesanan secara real-time melalui halaman 'Lacak Pesanan' di akun kamu, atau langsung di website kurir yang bersangkutan.",
  },
  // Pembayaran
  {
    id: 8,
    category: "pembayaran",
    question: "Metode pembayaran apa saja yang tersedia?",
    answer:
      "Kami menerima berbagai metode pembayaran: QRIS (OVO, Dana, ShopeePay, GoPay, m-Banking), Transfer Bank (BCA, Mandiri, BNI, BRI), dan E-Wallet. Semua transaksi dienkripsi untuk keamanan data kamu.",
  },
  {
    id: 9,
    category: "pembayaran",
    question: "Apakah ada biaya tambahan saat melakukan pembayaran?",
    answer:
      "Tidak ada biaya tambahan dari kami. Namun, beberapa bank atau e-wallet mungkin mengenakan biaya admin sesuai kebijakan masing-masing penyedia layanan. Harga yang tertera di produk sudah termasuk PPN 11%.",
  },
  {
    id: 10,
    category: "pembayaran",
    question: "Berapa lama batas waktu pembayaran setelah memesan?",
    answer:
      "Kamu memiliki waktu 24 jam untuk menyelesaikan pembayaran setelah pesanan dibuat. Jika melewati batas waktu, pesanan akan otomatis dibatalkan dan kamu perlu membuat pesanan baru.",
  },
  // Penjual
  {
    id: 11,
    category: "penjual",
    question: "Bagaimana cara mendaftarkan UMKM saya di platform ini?",
    answer:
      "Klik 'Daftar UMKM' dan lengkapi 4 langkah: Identitas Bisnis, Kategori Produk, Sejarah & Cerita, dan Verifikasi Dokumen (KTP, NIB, foto tempat usaha). Tim dari Dinas Koperasi & UMKM akan memverifikasi data kamu dalam 3–5 hari kerja.",
  },
  {
    id: 12,
    category: "penjual",
    question: "Apakah ada biaya untuk mendaftarkan UMKM?",
    answer:
      "Pendaftaran UMKM sepenuhnya GRATIS. Kami berkomitmen untuk mendukung pertumbuhan usaha lokal Palembang tanpa hambatan biaya awal. Komisi platform hanya berlaku setelah transaksi berhasil.",
  },
  {
    id: 13,
    category: "penjual",
    question: "Dokumen apa saja yang diperlukan untuk verifikasi UMKM?",
    answer:
      "Dokumen wajib: KTP Pemilik dan NIB (Nomor Induk Berusaha) dari OSS, serta foto tempat usaha. Dokumen opsional: SIUP atau izin usaha lainnya. Semua dokumen bersifat rahasia dan hanya diakses oleh tim verifikasi resmi.",
  },
  // Retur
  {
    id: 14,
    category: "retur",
    question: "Bagaimana prosedur pengembalian produk?",
    answer:
      "Ajukan retur dalam 3 hari setelah produk diterima melalui halaman 'Riwayat Pesanan'. Sertakan foto kondisi produk dan alasan pengembalian. Tim kami akan meninjau dalam 1×24 jam dan menghubungi kamu untuk langkah selanjutnya.",
  },
  {
    id: 15,
    category: "retur",
    question: "Berapa lama proses refund setelah retur disetujui?",
    answer:
      "Setelah retur disetujui dan produk diterima penjual, refund akan diproses dalam 3–7 hari kerja tergantung metode pembayaran asal. Refund ke e-wallet biasanya lebih cepat (1–2 hari kerja).",
  },
  // Keamanan
  {
    id: 16,
    category: "keamanan",
    question: "Apakah data pribadi saya aman di Smart UMKM?",
    answer:
      "Keamanan data kamu adalah prioritas kami. Semua data dienkripsi menggunakan SSL/TLS, dan kami tidak pernah menjual data pribadi kepada pihak ketiga. Platform kami mematuhi regulasi perlindungan data yang berlaku di Indonesia.",
  },
  {
    id: 17,
    category: "keamanan",
    question: "Apa yang harus saya lakukan jika akun saya diretas?",
    answer:
      "Segera hubungi tim support kami melalui WhatsApp atau email dengan menyertakan identitas akun kamu. Kami akan membantu memulihkan akun dan mengamankan data kamu. Jangan pernah memberikan password kepada siapapun, termasuk tim kami.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
        isOpen ? "border-brand-primary shadow-sm" : "border-custom"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-custom-card hover:bg-custom-sec transition-colors"
      >
        <span
          className={`text-sm font-semibold leading-snug ${isOpen ? "text-brand-primary" : "text-custom-main"}`}
        >
          {item.question}
        </span>
        <div
          className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            isOpen
              ? "bg-brand-primary text-white rotate-180"
              : "bg-custom-ter text-custom-muted"
          }`}
        >
          <ChevronDown size={14} />
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-5 pb-5 pt-1 border-t border-custom bg-custom-card">
          <p className="text-sm text-custom-muted leading-relaxed">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openId, setOpenId] = useState<number | null>(1);
  const [search, setSearch] = useState("");

  const filtered = FAQS.filter((faq) => {
    const matchCat =
      activeCategory === "all" || faq.category === activeCategory;
    const matchSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggle = (id: number) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section className="py-16 bg-custom-main">
      <div className="max-w-4xl mx-auto px-4">
        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-brand-primary bg-teal-50 border border-teal-200 px-3 py-1.5 rounded-full mb-4">
            <HelpCircle size={12} />
            Pusat Bantuan
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-custom-main mb-3">
            Pertanyaan yang Sering Ditanyakan
          </h2>
          <p className="text-sm text-custom-muted max-w-md mx-auto leading-relaxed">
            Temukan jawaban atas pertanyaan umum seputar belanja, pengiriman,
            pembayaran, dan lainnya.
          </p>
        </div>

        {/* ── Search ──────────────────────────────────────────────── */}
        <div className="relative mb-6">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-custom-muted"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setActiveCategory("all");
            }}
            placeholder="Cari pertanyaan... (contoh: retur, pembayaran, pengiriman)"
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-custom bg-custom-card text-sm focus:outline-none focus:border-brand-primary transition-colors shadow-sm"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-custom-muted hover:text-brand-primary font-semibold"
            >
              Hapus
            </button>
          )}
        </div>

        {/* ── Category Tabs ────────────────────────────────────────── */}
        {!search && (
          <div className="flex gap-2 flex-wrap mb-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenId(null);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat.id
                    ? "bg-brand-primary text-white shadow-sm"
                    : "bg-custom-card border border-custom text-custom-muted hover:border-brand-primary hover:text-brand-primary"
                }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* ── FAQ List ─────────────────────────────────────────────── */}
        {filtered.length > 0 ? (
          <div className="space-y-3 mb-10">
            {search && (
              <p className="text-xs text-custom-muted mb-4">
                Menampilkan{" "}
                <span className="font-bold text-custom-main">
                  {filtered.length}
                </span>{" "}
                hasil untuk{" "}
                <span className="font-semibold text-brand-primary">
                  "{search}"
                </span>
              </p>
            )}
            {filtered.map((faq) => (
              <AccordionItem
                key={faq.id}
                item={faq}
                isOpen={openId === faq.id}
                onToggle={() => toggle(faq.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center py-16 text-center gap-3 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-custom-ter border border-custom flex items-center justify-center">
              <HelpCircle size={24} className="text-custom-muted" />
            </div>
            <p className="text-sm font-bold text-custom-main">
              Pertanyaan tidak ditemukan
            </p>
            <p className="text-xs text-custom-muted">
              Coba kata kunci lain atau hubungi tim support kami.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("all");
              }}
              className="text-xs text-brand-primary hover:underline font-semibold"
            >
              Reset pencarian
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
