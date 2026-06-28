import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function ExperienceCircularFarming() {
  return (
    <section className="relative w-full py-6 overflow-hidden">
      <Image
        src="/images/bg-img.png"
        alt="Circular farming in action at Ingaju Farms"
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority
      />
      {/* Layered overlays for depth */}
      <div aria-hidden className="absolute inset-0 bg-black/50" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      <div className="relative z-10 container-pad py-64 flex flex-col items-center justify-center text-center">
        <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#6DBE8C] mb-4">
          Come See It Yourself
        </p>
        <h2 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl max-w-3xl">
          Experience Circular Farming{" "}
          <span className="text-[#6DBE8C]">in Action.</span>
        </h2>
        <p className="mt-6 max-w-xl text-base font-body leading-relaxed text-white/70">
          Ingaju Farms is a living, working example of what sustainable agriculture looks like in practice. Visit us — as a student, a farmer, a partner, or simply a curious mind.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="/book-a-tour"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-body font-semibold text-[#1C2321] transition-colors hover:bg-white/90"
          >
            Book a Farm Tour <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="/trainings"
            className="inline-flex items-center justify-center rounded-full border border-white/40 px-8 py-3.5 text-sm font-body font-semibold text-white transition-colors hover:bg-white/10"
          >
            View Training Programs
          </a>
        </div>
      </div>
    </section>
  );
}
