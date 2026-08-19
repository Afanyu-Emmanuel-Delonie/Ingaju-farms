"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Mounted once in the root layout, so it plays on first page load only —
// layout.tsx never remounts on client-side navigation, unlike the old
// app/template.tsx curtain which replayed on every route change and fought
// with SmoothScroll's Lenis re-init, causing visible glitches while scrolling.
export default function Splash() {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const leave = setTimeout(() => setLeaving(true), 350);
    const remove = setTimeout(() => setGone(true), 600);
    return () => {
      clearTimeout(leave);
      clearTimeout(remove);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-2.5 bg-[#0a0f0d] pointer-events-none transition-opacity duration-250 ease-out ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative h-11 w-11 overflow-hidden rounded-full">
        <Image src="/images/brand/Logo.webp" alt="" fill sizes="44px" className="object-contain" priority />
      </div>
      <span className="font-heading text-lg font-bold text-white">
        Ingaju <span className="text-[#D07A53]">Farms</span>
      </span>
    </div>
  );
}
