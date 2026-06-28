import { ArrowRight } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative w-full h-[70vh] lg:h-[80vh] overflow-hidden bg-[#1C2321] flex items-end">

      {/* Decorative circles — top right */}
      <svg className="absolute top-0 right-0 w-[480px] h-[480px] opacity-10 pointer-events-none" viewBox="0 0 480 480" fill="none">
        <circle cx="380" cy="100" r="220" stroke="#3A7D5A" strokeWidth="1.5" />
        <circle cx="380" cy="100" r="160" stroke="#3A7D5A" strokeWidth="1" />
        <circle cx="380" cy="100" r="90" stroke="#6DBE8C" strokeWidth="1" />
      </svg>

      {/* Decorative dot grid — bottom left */}
      <svg className="absolute bottom-0 left-0 w-56 h-56 opacity-10 pointer-events-none" viewBox="0 0 200 200" fill="#6DBE8C">
        {Array.from({ length: 6 }).map((_, row) =>
          Array.from({ length: 6 }).map((_, col) => (
            <circle key={`${row}-${col}`} cx={col * 34 + 10} cy={row * 34 + 10} r="2" />
          ))
        )}
      </svg>

      {/* Decorative arc — bottom right */}
      <svg className="absolute bottom-0 right-0 w-72 h-72 opacity-[0.07] pointer-events-none" viewBox="0 0 300 300" fill="none">
        <path d="M300 300 Q 100 300 100 100" stroke="#3A7D5A" strokeWidth="60" strokeLinecap="round" />
      </svg>

      {/* Thin horizontal rule accent */}
      <div className="absolute top-1/2 left-0 w-24 h-px bg-[#3A7D5A]/30" />

      {/* Content */}
      <div className="relative z-10 container-pad pb-12 w-full">
        <span className="mb-4 inline-block rounded-full bg-[#3A7D5A]/20 border border-[#3A7D5A]/30 px-4 py-1.5 text-xs font-body font-semibold uppercase tracking-widest text-[#b3ecc9]">
          About Ingaju Farms
        </span>
        <h1 className="max-w-4xl text-4xl font-heading font-bold leading-tight text-white md:text-5xl lg:text-6xl">
          Growing More
          <span className="text-[#6DBE8C]">Than Just Food.</span>
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/60 md:text-lg">
          Ingaju Farms is a circular agriculture enterprise dedicated to producing organic products, empowering communities, and building a sustainable future through responsible farming.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href="/marketplace"
            className="w-full text-center rounded-full bg-[#3A7D5A] px-8 py-3.5 text-sm font-body font-semibold text-white transition-colors hover:bg-[#2f6b4a] sm:w-auto"
          >
            Explore Our Products
          </a>
          <a
            href="/contact"
            className="w-full text-center rounded-full border border-white/20 px-8 py-3.5 text-sm font-body font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
          >
            Visit the Farm
          </a>
        </div>
      </div>
    </section>
  );
}
