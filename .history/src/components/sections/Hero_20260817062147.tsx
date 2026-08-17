"use client";

import { useModal } from "@/components/shared/ModalContext";

export default function Hero() {
  const { open } = useModal();
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/images/about/about.mp4"
        poster="/images/hero/bg-img.png"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
      />
      <div className="absolute inset-0 bg-black/80" />

      <div className="relative z-10 flex h-full flex-col items-start justify-end container-pad pb-20">
        <h1 className="max-w-4xl text-3xl font-heading font-bold leading-tight text-white md:text-5xl">
          From Farm Waste <br />
          <span className="text-[#6DBE8C]">to Farm Wealth.</span>
        </h1>
        <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-white/75 md:text-lg">
         Ingaju Farms is an integrated circular agriculture enterprise in Nyagatare District, Rwanda turning livestock & dairy, crops, and organic waste into food, income, and training for our farming community one farm, multiple enterprises, closing the loop toward zero waste.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href="/contact"
            className="w-full text-center rounded-full bg-[#3A7D5A] px-8 py-3.5 text-sm font-body font-semibold text-white transition-colors hover:bg-[#2f6b4a] sm:w-auto">
            Partner With Us
          </a>
          <a
            href="/about"
            className="w-full text-center rounded-full border border-white/50 px-8 py-3.5 text-sm font-body font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
          >
            About Ingaju Farms
          </a>
        </div>
      </div>
    </section>
  );
}
