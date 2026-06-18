import Image from "next/image";
import { Mail, Phone, Pin } from "lucide-react";
import { Main } from "next/document";
export default function Footer() {
  return (
    <footer className="bg-custom-sec border-t border-custom pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
        <div className="space-y-4">
          <a href="#" className="text-xl font-bold flex items-center gap-2">
            <span className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center overflow-hidden">
              <Image
                src="https://cdn.aceimg.com/W6DtV9UeS.png"
                alt="Logo"
                width={1080}
                height={1080}
                className="object-contain"
              />
            </span>
            <span>
              Pasar<strong className="text-brand-primary">Nusantara</strong>
            </span>
          </a>
          <p className="text-xs text-custom-muted leading-relaxed">
            Platform AI untuk menemukan dan melestarikan produk lokal Indonesia
            dari Sabang sampai Merauke.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-sm mb-4">Platform</h4>
          <div className="flex flex-col gap-2.5 text-xs text-custom-muted">
            <a href="#" className="hover:text-brand-primary">
              Beranda
            </a>
            <a href="#" className="hover:text-brand-primary">
              Jelajahi Produk
            </a>
            <a href="#" className="hover:text-brand-primary">
              Peta UMKM
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-sm mb-4">Kategori</h4>
          <div className="flex flex-col gap-2.5 text-xs text-custom-muted">
            <a href="#" className="hover:text-brand-primary">
              Kuliner Nusantara
            </a>
            <a href="#" className="hover:text-brand-primary">
              Kerajinan Tangan
            </a>
            <a href="#" className="hover:text-brand-primary">
              Fashion Lokal
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-sm mb-4">Hubungi Kami</h4>
          <div className="flex flex-col gap-3 text-sm text-custom-muted">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span>pasarnusa@gmail.com</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>+62 811 234 567</span>
            </div>

            <div className="flex items-center gap-3">
              <Pin className="w-4 h-4 flex-shrink-0" />
              <span>Palembang, Indonesia</span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-custom flex flex-col sm:flex-row justify-between text-xs text-custom-muted gap-4">
        <span>© 2026 PasarNusantara. Dibuat untuk UMKM Indonesia.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">
            Kebijakan Privasi
          </a>
          <a href="#" className="hover:underline">
            Syarat & Ketentuan
          </a>
        </div>
      </div>
    </footer>
  );
}
