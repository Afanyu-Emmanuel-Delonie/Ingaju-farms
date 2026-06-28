"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import Image from "next/image";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const curtainRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const curtain = curtainRef.current;
    const logo = logoRef.current;
    if (!curtain || !logo) return;

    // Enter: curtain slides out downward, revealing the page
    const tl = gsap.timeline();
    tl.set(curtain, { yPercent: 0, display: "flex" })
      .to(logo, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 0)
      .to(curtain, { yPercent: -100, duration: 0.8, ease: "power4.inOut", delay: 0.3 })
      .set(curtain, { display: "none" });

    return () => {
      tl.kill();
    };
  }, [pathname]);

  // Exit: attach to links via NavigateEvents is handled by template.tsx
  // Here we expose the curtain for entry animation only
  return (
    <>
      {/* Curtain */}
      <div
        ref={curtainRef}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0f0d]"
        style={{ display: "flex" }}
      >
        <div ref={logoRef} className="flex flex-col items-center gap-3 opacity-0 translate-y-4">
          <div className="relative h-12 w-12">
            <Image src="/images/Logo.png" alt="Ingaju Farms" fill className="object-contain" priority />
          </div>
          <span className="font-heading text-xl font-bold text-white">
            Ingaju <span className="text-[#D07A53]">Farms</span>
          </span>
          <span className="text-[10px] font-body font-semibold uppercase tracking-widest text-[#3A7D5A]">
            Organic & Circular
          </span>
        </div>
      </div>

      {children}
    </>
  );
}
