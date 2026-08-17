export default function CircularHero() {
  return (
    <section className="relative w-full h-[80vh] lg:h-[80vh] overflow-hidden bg-[#1C2321] flex items-end">

      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/images/about/about.mp4"
        poster="/images/about/about-1.png"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
      />
      <div aria-hidden className="absolute inset-0 bg-bla/65" />

      {/* Content */}
      <div className="relative z-10 container-pad pb-12 w-full">
        <h1 className="max-w-4xl text-3xl font-heading font-bold leading-tight text-white md:text-5xl">
          One System.
          <br />
          <span className="text-[#6DBE8C]">Closing the Loop.</span>
        </h1>
        <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-white/80 md:text-lg">
          Guided by careful record-keeping, our farm turns outputs into useful
          inputs closing the loop one stage at a time, and supporting
          steady production along the way.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          
            <a href="#the-loop"
            className="w-full text-center rounded-full bg-[#3A7D5A] px-8 py-3.5 text-sm font-body font-semibold text-white transition-colors hover:bg-[#2f6b4a] sm:w-auto"
          >
            See The Loop
          </a>
          
           <a href="/contact"
            className="w-full text-center rounded-full border border-white/20 px-8 py-3.5 text-sm font-body font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}