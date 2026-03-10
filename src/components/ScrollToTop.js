"use client";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  return (
    <button
      onClick={() =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
      className="fixed bottom-12 right-6 bg-[var(--primary)]
      w-12 h-12
      text-white px-3 py-3 rounded-full z-50 cursor-pointer hover:scale-[1.05] transition"
    >
      <ArrowUp size={24} strokeWidth={2} />
    </button>
  );
}