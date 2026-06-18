"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailLower = formData.email.toLowerCase();
    
    // Redirect logic based on email pattern
    if (emailLower.includes("pemkot") || emailLower === "admin@pemkot.go.id") {
      router.push("/pemkot");
    } else if (emailLower.includes("seller") || emailLower === "seller@umkm.com") {
      router.push("/seller");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-custom-sec flex items-center justify-center px-4 relative overflow-hidden">
      {/* Ornamen Latar Belakang (Aksen Brand) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#0f766e_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Kotak Card Login */}
      <div className="w-full max-w-md bg-custom-card border border-custom rounded-2xl p-8 shadow-xl relative z-10 space-y-6">
        {/* Header / Logo */}
        <div className="text-center space-y-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-2xl font-bold tracking-tight"
          >
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center overflow-hidden">
              <Image
                src="https://cdn.aceimg.com/W6DtV9UeS.png"
                alt="Logo"
                width={1080}
                height={1080}
                className="object-contain"
              />
            </div>
            <span>
              Pasar<strong className="text-brand-primary">Nusantara</strong>
            </span>
          </Link>
          <h2 className="text-xl font-bold tracking-tight mt-4">
            Selamat Datang Kembali
          </h2>
          <p className="text-xs text-custom-muted">
            Masuk untuk menjelajahi & mendukung produk lokal terlengkap
          </p>
        </div>

        {/* Info Hint untuk Testing */}
        <div className="p-3 bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900 rounded-xl space-y-1.5 text-xs text-custom-muted">
          <p className="font-bold text-custom-main flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-primary inline-block"></span>
            Panduan Akses Demo:
          </p>
          <ul className="list-disc pl-4 space-y-1 text-[10px]">
            <li>Akun <strong>Pemkot</strong>: gunakan email <code className="bg-custom-ter px-1 py-0.5 rounded font-mono text-brand-primary font-bold">admin@pemkot.go.id</code></li>
            <li>Akun <strong>Seller (UMKM)</strong>: gunakan email <code className="bg-custom-ter px-1 py-0.5 rounded font-mono text-brand-primary font-bold">seller@umkm.com</code></li>
            <li>Kata sandi bebas (sembarang karakter).</li>
          </ul>
        </div>

        {/* Form Login */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input Email */}
          <div className="space-y-1.5">
            <label
              className="text-xs font-semibold text-custom-muted block"
              htmlFor="email"
            >
              Alamat Email
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-custom-muted">
                <Mail size={16} />
              </span>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="nama@email.com"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-custom-ter border border-custom focus:outline-none focus:border-brand-primary transition text-sm text-custom-main"
              />
            </div>
          </div>

          {/* Input Password */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label
                className="text-xs font-semibold text-custom-muted block"
                htmlFor="password"
              >
                Kata Sandi
              </label>
              <a
                href="#"
                className="text-xs text-brand-primary hover:underline font-medium"
              >
                Lupa sandi?
              </a>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-custom-muted">
                <Lock size={16} />
              </span>
              <input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-custom-ter border border-custom focus:outline-none focus:border-brand-primary transition text-sm text-custom-main"
              />
            </div>
          </div>

          {/* Remember Me / Ingat Saya */}
          <div className="flex items-center gap-2 pt-1">
            <input
              id="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded text-brand-primary bg-custom-ter border-custom focus:ring-0 focus:ring-offset-0 accent-[var(--brand-primary)] cursor-pointer"
            />
            <label
              id="remember"
              className="text-xs text-custom-muted select-none cursor-pointer"
              htmlFor="remember"
            >
              Ingat akun saya di perangkat ini
            </label>
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-xl bg-brand-primary text-white font-semibold text-sm hover:opacity-95 shadow-md shadow-teal-700/10 transition"
          >
            Masuk ke Akun
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-custom"></div>
          <span className="flex-shrink mx-4 text-custom-muted text-[11px] font-medium tracking-wider uppercase">
            Atau masuk dengan
          </span>
          <div className="flex-grow border-t border-custom"></div>
        </div>

        {/* Metode Alternatif (Oauth Sosmed) */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 py-2.5 border border-custom rounded-xl bg-custom-ter hover:bg-custom-card transition text-xs font-medium">
            <span className="text-sm">
              <FontAwesomeIcon
                icon={faGoogle}
                className="text-red-500 text-lg"
              />
            </span>{" "}
            Google
          </button>
          <button className="flex items-center justify-center gap-2 py-2.5 border border-custom rounded-xl bg-custom-ter hover:bg-custom-card transition text-xs font-medium">
            <span className="text-sm">
              <FontAwesomeIcon
                icon={faGithub}
                className="text-black-500 text-lg"
              />
            </span>{" "}
            Github
          </button>
        </div>

        {/* Footer Card */}
        <div className="text-center pt-2">
          <p className="text-xs text-custom-muted">
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="text-brand-primary font-bold hover:underline"
            >
              Daftar Sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
