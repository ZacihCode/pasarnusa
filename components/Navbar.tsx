"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-sm border-b border-zinc-200 dark:border-zinc-800 py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 text-base font-medium text-zinc-900 dark:text-white"
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
            Pasar
            <strong className="text-emerald-600 font-semibold">
              Nusantara
            </strong>
          </span>
        </a>

        {/* Nav Links - Desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { label: "Beranda", href: "#beranda" },
            { label: "Jelajahi", href: "#jelajahi" },
            { label: "Peta UMKM", href: "#peta" },
            { label: "AI Discovery", href: "#ai-discovery" },
            { label: "Tentang Kami", href: "#tentang" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 px-3 py-2 rounded-lg transition-all duration-150"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              aria-label="Toggle tema"
            >
              {theme === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          )}

          {/* Divider */}
          <div className="hidden sm:block w-px h-5 bg-zinc-200 dark:bg-zinc-700" />

          {/* Daftar UMKM - outline */}
          <Link
            href="/register"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition"
          >
            Daftar UMKM
          </Link>

          {/* Masuk Akun - solid */}
          <Link
            href="/login"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition"
          >
            Masuk Akun
          </Link>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] w-6 ml-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`h-px w-full bg-zinc-700 dark:bg-zinc-300 transition-transform duration-200 ${isOpen ? "rotate-45 translate-y-[7px]" : ""}`}
            />
            <span
              className={`h-px w-full bg-zinc-700 dark:bg-zinc-300 transition-opacity duration-200 ${isOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`h-px w-full bg-zinc-700 dark:bg-zinc-300 transition-transform duration-200 ${isOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 pt-2 pb-4 flex flex-col gap-1 border-t border-zinc-100 dark:border-zinc-800 mt-2">
          {[
            { label: "Beranda", href: "#beranda" },
            { label: "Jelajahi", href: "#jelajahi" },
            { label: "Peta UMKM", href: "#peta" },
            { label: "AI Discovery", href: "#ai-discovery" },
            { label: "Tentang Kami", href: "#tentang" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            >
              {item.label}
            </a>
          ))}

          <div className="border-t border-zinc-100 dark:border-zinc-800 mt-2 pt-3 flex flex-col gap-2">
            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-4 py-2 rounded-full text-sm font-medium border border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition"
            >
              Daftar UMKM
            </Link>
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-4 py-2 rounded-full text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition"
            >
              Masuk Akun
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
