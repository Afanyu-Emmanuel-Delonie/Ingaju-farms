"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Splash() {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let leaveTimer: ReturnType<typeof setTimeout>;
    let removeTimer: ReturnType<typeof setTimeout>;

    function dismiss() {
      setLeaving(true);
      removeTimer = setTimeout(() => setGone(true), 500);
    }

    if (document.readyState === "complete") {
      // Page already loaded (e.g. fast cache hit) — show briefly then exit
      leaveTimer = setTimeout(dismiss, 300);
    } else {
      window.addEventListener("load", dismiss, { once: true });
      // Safety cap: never hold longer than 8s on very slow connections
      leaveTimer = setTimeout(dismiss, 8000);
    }

    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(removeTimer);
      window.removeEventListener("load", dismiss);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F8F6F2] pointer-events-none transition-opacity duration-500 ease-out ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Spinner ring + logo */}
      <div className="relative flex items-center justify-center">
        <span className="loader-ring" />
        <div className="relative z-10 w-16 h-16 rounded-full overflow-hidden border-2 border-[#E0D8CE] bg-white shadow-sm">
          <Image
            src="/images/brand/Logo.webp"
            alt=""
            fill
            sizes="64px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Wordmark */}
      <p className="mt-6 font-heading text-sm font-semibold tracking-[0.2em] uppercase text-[#1C2321] loader-fade-in">
        Ingaju <span className="text-[#3A7D5A]">Farms</span>
      </p>

      {/* Tagline */}
      <p
        className="mt-1.5 font-body text-[10px] tracking-[0.25em] uppercase text-[#6B6259] loader-fade-in"
        style={{ animationDelay: "0.15s" }}
      >
        Circular Agriculture
      </p>

      {/* Indeterminate bar — pulses until page is ready */}
      <div className="mt-8 w-28 h-px bg-[#E0D8CE] overflow-hidden rounded-full">
        <div className="h-full bg-[#3A7D5A] loader-bar" />
      </div>
    </div>
  );
}
