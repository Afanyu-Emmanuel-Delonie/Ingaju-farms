import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Image
        src="/images/bg-img.png"
        alt="Ingaju Farms"
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 flex h-full flex-col items-start justify-end container-pad pb-12">
        <span className="mb-4 inline-block rounded-full bg-[#2E4F41] px-4 py-1.5 text-xs font-body font-semibold uppercase tracking-widest text-white">
          About Ingaju Farms
        </span>
        <h1 className="max-w-4xl text-4xl font-heading font-bold leading-tight text-white md:text-6xl">
          Growing More.<br />
          <span className="text-[#6DBE8C]">Than Just Food.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
          Ingaju Farms is a circular agriculture enterprise dedicated to producing organic products, empowering communities, and building a sustainable future through responsible farming.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href="/marketplace"
            className="w-full text-center rounded-full bg-[#2E4F41] px-8 py-3.5 text-sm font-body font-semibold text-white transition-colors hover:bg-[#3a6352] sm:w-auto">
            Explore Our Products
          </a>
          <a
            href="/contact"
            className="w-full text-center rounded-full border border-white/50 px-8 py-3.5 text-sm font-body font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
          >
            Visit the Farm
          </a>
        </div>
      </div>
    </section>
  );
}
