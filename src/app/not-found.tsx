"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";

export default function NotFound() {
  const numRef     = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const num     = numRef.current;
    const content = contentRef.current;
    const line    = lineRef.current;
    if (!num || !content || !line) return;

    gsap.set([num, content], { opacity: 0, y: 30 });
    gsap.set(line, { scaleX: 0, transformOrigin: "left center" });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(num,     { opacity: 1, y: 0, duration: 0.7 })
      .to(line,    { scaleX: 1, duration: 0.5, ease: "power2.inOut" }, "-=0.3")
      .to(content, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2");

    return () => { tl.kill(); };
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-[#1C2321] flex items-center justify-center overflow-hidden">

      {/* Decorative concentric circles — top right */}
      <svg className="absolute top-0 right-0 w-[520px] h-[520px] opacity-10 pointer-events-none" viewBox="0 0 480 480" fill="none">
        <circle cx="380" cy="100" r="220" stroke="#3A7D5A" strokeWidth="1.5" />
        <circle cx="380" cy="100" r="160" stroke="#3A7D5A" strokeWidth="1" />
        <circle cx="380" cy="100" r="90"  stroke="#6DBE8C" strokeWidth="1" />
      </svg>

      {/* Dot grid — bottom left */}
      <svg className="absolute bottom-0 left-0 w-56 h-56 opacity-10 pointer-events-none" viewBox="0 0 200 200" fill="#6DBE8C">
        {Array.from({ length: 6 }).map((_, row) =>
          Array.from({ length: 6 }).map((_, col) => (
            <circle key={`${row}-${col}`} cx={col * 34 + 10} cy={row * 34 + 10} r="2" />
          ))
        )}
      </svg>

      {/* Decorative arc — bottom right */}
      <svg className="absolute bottom-0 right-0 w-72 h-72 opacity-[0.06] pointer-events-none" viewBox="0 0 300 300" fill="none">
        <path d="M300 300 Q 100 300 100 100" stroke="#3A7D5A" strokeWidth="60" strokeLinecap="round" />
      </svg>

      {/* Content */}
      <div className="relative z-10 container-pad flex flex-col items-start">

        {/* 404 */}
        <div ref={numRef}>
          <span className="font-heading font-bold text-[#3A7D5A]/15 select-none"
            style={{ fontSize: "clamp(120px, 20vw, 220px)", lineHeight: 1 }}>
            404
          </span>
        </div>

        {/* Green accent line */}
        <div ref={lineRef} className="w-16 h-0.5 bg-[#3A7D5A] -mt-4 mb-8" />

        {/* Copy + CTA */}
        <div ref={contentRef} className="max-w-lg">
          <p className="text-xs font-body font-semibold uppercase tracking-widest text-[#6DBE8C] mb-3">
            Page Not Found
          </p>
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl leading-tight">
            Looks like this field<br />
            <span className="text-[#6DBE8C]">hasn't been planted yet.</span>
          </h1>
          <p className="mt-5 text-[15px] font-body leading-relaxed text-white/55">
            The page you're looking for doesn't exist or may have been moved. Head back to the farm and find what you need.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-[#3A7D5A] px-7 py-3.5 text-sm font-body font-semibold text-white transition-colors hover:bg-[#2f6b4a]"
            >
              Back to Home <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-body font-semibold text-white transition-colors hover:bg-white/5"
            >
              Contact Us
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
