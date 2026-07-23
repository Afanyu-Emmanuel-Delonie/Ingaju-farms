"use client";

import Image from "next/image";
import { useModal } from "@/components/shared/ModalContext";

export default function DairyHero() {
  const { open } = useModal();
  return (
    <section className="relative h-screen lg:h-screen w-full overflow-hidden">
      <div className="absolute inset-0 animate-ken-burns">
        <Image
          src="/images/hero/bg-img.png"
          alt="Dairy cattle inside the Ingaju farm barn"
          fill
          priority
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 flex h-full flex-col items-start justify-end container-pad pb-20">
        <span className="mb-4 inline-block rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-xs font-body font-semibold uppercase tracking-widest text-white">
          Organic Dairy
        </span>
        <h1 className="max-w-4xl text-3xl font-heading font-bold leading-tight text-white md:text-5xl">
          Dairy Production.<br />
          <span className="text-[#6DBE8C]">Managed Responsibly.</span>
        </h1>
        <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-white/75 md:text-lg">
          Driven by climate-smart herd management, our dairy system reduces reliance on synthetic inputs and produces milk with traceable handling.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href="/contact"
            className="w-full text-center rounded-full bg-[#3A7D5A] px-8 py-3.5 text-sm font-body font-semibold text-white transition-colors hover:bg-[#2f6b4a] sm:w-auto"
          >
            Order Product
          </a>
          <button
            onClick={() => open({ variant: "tour" })}
            className="w-full text-center rounded-full border border-white/50 px-8 py-3.5 text-sm font-body font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
          >
            Book a Farm Tour
          </button>
        </div>
      </div>
    </section>
  );
}
