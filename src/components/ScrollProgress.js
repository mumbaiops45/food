"use client";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

          const scrolled = (scrollTop / height) * 100;
          setScroll(scrolled);

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[1.5px] z-[9999]
      bg-[var(--primary)] transition-all duration-200 ease-out"
      style={{ width: `${scroll}%` }}
    />
  );
}