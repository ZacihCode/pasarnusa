"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-brand-primary text-white shadow-xl z-50 hover:scale-105 active:scale-95 transition duration-200"
      aria-label="Kembali ke atas"
    >
      <span className="text-lg leading-none select-none">▲</span>
    </button>
  );
}
