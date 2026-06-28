import Image from "next/image";

export default function CropsHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Image
        src="/images/crops-2.png"
        alt="Ingaju Farms green crop fields"
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 flex h-full flex-col items-start justify-end container-pad pb-12">
        <span className="mb-4 inline-block rounded-full bg-[#3A7D5A] px-4 py-1.5 text-xs font-body font-semibold uppercase tracking-widest text-white">
          Organic Crops & Produce
        </span>
        <h1 className="max-w-4xl text-4xl font-heading font-bold leading-tight text-white md:text-6xl">
          Naturally Grown.<br />
          <span className="text-[#6DBE8C]">Sustainably</span> Produced.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
          From the fields of Ingaju Farms straight to your table. Our crops are grown organically without harmful synthetic chemicals, ensuring safety, quality, and a healthier planet.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href="/contact"
            className="w-full text-center rounded-full bg-[#3A7D5A] px-8 py-3.5 text-sm font-body font-semibold text-white transition-colors hover:bg-[#2f6b4a] sm:w-auto"
          >
            Book a Farm Tour
          </a>
          <a
            href="/book-a-tour"
            className="w-full text-center rounded-full border border-white/50 px-8 py-3.5 text-sm font-body font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
          >
            Book a Farm Tour
          </a>
        </div>
      </div>
    </section>
  );
}
