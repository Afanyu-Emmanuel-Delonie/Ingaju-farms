"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import BrandPattern from "@/components/shared/BrandPattern";
import type { Testimonial } from "@/lib/testimonials";

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const go = useCallback((idx: number) => {
    setCurrent((idx + testimonials.length) % testimonials.length);
    setAnimKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const id = setInterval(() => go(current + 1), 6000);
    return () => clearInterval(id);
  }, [isHovered, current, go]);

  if (testimonials.length === 0) return null;
  const t = testimonials[current];

  return (
    <section
      className="relative w-full py-24 bg-[#1C2321] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <BrandPattern />
      <div className="container-pad grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12 md:gap-16 items-center min-h-[320px]">

        {/* Left — heading + controls */}
        <div>
          <h2 className="text-3xl md:text-4xl font-heading font-medium text-white leading-tight">
            Trusted by Farmers<br />
            <span className="font-bold">& Partners.</span>
          </h2>
          <p className="mt-4 text-base font-body text-white/50 leading-relaxed max-w-xs">
            What farmers, partners, and agronomists say about working with Ingaju every day.
          </p>
          <div className="flex gap-3 mt-8">
            <button
              onClick={() => go(current - 1)}
              className="h-11 w-11 rounded-full border border-white/15 flex items-center justify-center transition-all hover:border-white/30 hover:bg-white/5 active:scale-95 text-white"
              aria-label="Previous"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => go(current + 1)}
              className="h-11 w-11 rounded-full border border-white/15 flex items-center justify-center transition-all hover:border-white/30 hover:bg-white/5 active:scale-95 text-white"
              aria-label="Next"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          {/* Progress dots */}
          <div className="flex gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-6 bg-[#3A7D5A]" : "w-1.5 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right — quote */}
        <div>
          <span className="block font-heading text-[80px] leading-none text-[#3A7D5A] -mb-3 select-none" aria-hidden>
            &ldquo;
          </span>
          <div key={animKey} className="animate-fade-up">
            <p className="text-base md:text-lg font-heading font-normal leading-relaxed text-white">
              {t.quote}
            </p>
            <div className="mt-7 flex items-center gap-4">
              <div className={`h-11 w-11 shrink-0 rounded-full flex items-center justify-center text-sm font-body font-bold text-white ${current % 2 === 0 ? "bg-[#3A7D5A]" : "bg-[#1C2321] border border-white/20"}`}>
                {t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div>
                <p className="text-sm font-body font-bold text-white">{t.name}</p>
                <p className="text-xs font-body text-white/45 mt-0.5">{t.role}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
