"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import Image from "next/image";

export default function Template({ children }: { children: React.ReactNode }) {
  const curtainRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Entry animation — curtain slides up out of view
  useEffect(() => {
    const curtain = curtainRef.current;
    const logo = logoRef.current;
    const content = contentRef.current;
    if (!curtain || !logo || !content) return;

    gsap.set(content, { opacity: 0 });

    const tl = gsap.timeline();
    tl.set(curtain, { yPercent: 0 })
      .to(logo, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" })
      .to(curtain, { yPercent: -100, duration: 0.75, ease: "power4.inOut", delay: 0.25 })
      .to(content, { opacity: 1, duration: 0.3, ease: "power2.out" }, "-=0.2");
  }, []);

  return (
    <>
      {/* Curtain overlay */}
      <div
        ref={curtainRef}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0f0d] pointer-events-none"
      >
        <div ref={logoRef} className="flex flex-col items-center gap-3 opacity-0 translate-y-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <Image src="/images/brand/Logo.webp" alt="Ingaju Farms" fill sizes="48px" className="object-contain" priority />
          </div>
          <span className="font-heading text-xl font-bold text-white">
            Ingaju <span className="text-[#D07A53]">Farms</span>
          </span>
          <span className="text-[10px] font-body font-semibold uppercase tracking-widest text-[#3A7D5A]">
            Organic & Circular
          </span>
        </div>
      </div>

      <div ref={contentRef}>{children}</div>
    </>
  );
}
