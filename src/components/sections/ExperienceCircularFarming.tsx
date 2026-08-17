"use client";

import { ArrowRight } from "lucide-react";
import { useModal } from "@/components/shared/ModalContext";

export default function ExperienceCircularFarming() {
  const { open } = useModal();
  return (
    <section
      className="relative w-full overflow-hidden bg-fixed bg-center bg-cover"
      style={{ backgroundImage: "url('/images/hero/bg-img.webp')" }}
    >
      <div aria-hidden className="absolute inset-0 bg-black/60" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      {/* Decorative concentric circles */}
      <svg className="absolute top-0 right-0 w-[480px] h-[480px] opacity-10 pointer-events-none" viewBox="0 0 480 480" fill="none">
        <circle cx="380" cy="100" r="220" stroke="#6DBE8C" strokeWidth="1.5" />
        <circle cx="380" cy="100" r="160" stroke="#6DBE8C" strokeWidth="1" />
        <circle cx="380" cy="100" r="90" stroke="#6DBE8C" strokeWidth="1" />
      </svg>

      <div className="relative z-10 container-pad py-24 flex flex-col items-center justify-center text-center">
        <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#6DBE8C] mb-4">
          Come See It Yourself
        </p>
        <h2 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl max-w-3xl">
          See It.<br />
          <span className="text-[#6DBE8C]">Live It.</span>
        </h2>
        <p className="mt-6 max-w-xl text-base font-body leading-relaxed text-white/70">
          Ingaju is a working farm, not a showroom. Visit as a student, farmer, business, or curious mind — and see circular agriculture in action.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => open({ variant: "tour" })}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-body font-semibold text-[#1C2321] transition-colors hover:bg-white/90"
          >
            Book a Farm Tour <ArrowRight className="h-4 w-4" />
          </button>
          <a
            href="/contact?topic=Training%20Program"
            className="inline-flex items-center justify-center rounded-full border border-white/40 px-8 py-3.5 text-sm font-body font-semibold text-white transition-colors hover:bg-white/10"
          >
            View Training Programs
          </a>
        </div>
      </div>
    </section>
  );
}
