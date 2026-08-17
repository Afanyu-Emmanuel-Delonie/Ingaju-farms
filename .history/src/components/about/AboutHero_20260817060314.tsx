import { ArrowRight } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative w-full h-[80vh] min-h-[550px] overflow-hidden bg-[#1C2321] flex items-end">

      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/images/about/about.mp4"
        poster="/images/about/about.png"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/85" />

      {/* Decorative background vectors */}
      <svg className="absolute top-0 right-0 w-[480px] h-[480px] opacity-10 pointer-events-none" viewBox="0 0 480 480" fill="none">
        <circle cx="380" cy="100" r="220" stroke="#3A7D5A" strokeWidth="1.5" />
        <circle cx="380" cy="100" r="160" stroke="#3A7D5A" strokeWidth="1" />
        <circle cx="380" cy="100" r="90" stroke="#6DBE8C" strokeWidth="1" />
      </svg>

      <svg className="absolute bottom-0 left-0 w-56 h-56 opacity-10 pointer-events-none" viewBox="0 0 200 200" fill="#6DBE8C">
        {Array.from({ length: 6 }).map((_, row) =>
          Array.from({ length: 6 }).map((_, col) => (
            <circle key={`${row}-${col}`} cx={col * 34 + 10} cy={row * 34 + 10} r="2" />
          ))
        )}
      </svg>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 pb-12 sm:px-6 lg:px-8">
        <span className="mb-4 inline-block rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-xs font-body font-semibold uppercase tracking-widest text-white">
          About Ingaju Farms
        </span>
        
        <h1 className="max-w-4xl text-3xl font-heading font-bold leading-tight text-white md:text-5xl">
            One Farm. Every Enterprise <br />
            <span className="text-[#6DBE8C]"> Feeds the Next.</span>
          </h1>

          <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-white/80 md:text-lg">
            For 6+ years, Ingaju Farms has proven that nothing has to go to waste livestock, crops, and organic recycling running as one tracked system, training farmers with us in Nyagatare, Rwanda.
          </p>
        
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href="/contact"
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#3A7D5A] px-8 py-3.5 text-sm font-body font-semibold text-white transition-colors hover:bg-[#2f6b4a] sm:w-auto"
          >
            Partner With Us     
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="/products/dairy"
            className="w-full text-center rounded-full border border-white/20 px-8 py-3.5 text-sm font-body font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
          >
            Explore Supply
          </a>
        </div>
      </div>
    </section>
  );
}