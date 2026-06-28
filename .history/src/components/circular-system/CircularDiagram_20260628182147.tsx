"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    number: "01",
    title: "Dairy Cattle & Livestock",
    desc: "Pasture-raised cattle produce fresh milk daily and organic manure as a natural byproduct — the starting point of the loop.",
  },
  {
    number: "02",
    title: "Organic Fertilizer",
    desc: "Manure is composted and processed into rich fertilizer that rebuilds soil health — no synthetic inputs needed.",
  },
  {
    number: "03",
    title: "Crop Production",
    desc: "Naturally enriched soil grows chemical-free crops — corn, beans, macadamia, soybeans, and mangoes.",
  },
  {
    number: "04",
    title: "Animal Feed & Loop Closes",
    desc: "Crop residues and by-products are fed back to the livestock — keeping the herd healthy and the system self-sustaining.",
  },
];

export default function CircularDiagram() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);
  const stepsRef   = useRef<(HTMLDivElement | null)[]>([]);
  const imgRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const line    = lineRef.current;
    const img     = imgRef.current;
    const steps   = stepsRef.current.filter(Boolean) as HTMLDivElement[];
    if (!section || !line || !img || steps.length < 4) return;

    gsap.set(line,  { scaleY: 0, transformOrigin: "top center" });
    gsap.set(steps, { opacity: 0, x: 24 });
    gsap.set(img,   { opacity: 0, x: -24 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: "top 70%", once: true },
    });

    tl
      .to(img,   { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" })
      .to(line,  { scaleY: 1, duration: 0.8, ease: "power3.inOut" }, "-=0.3")
      .to(steps, { opacity: 1, x: 0, duration: 0.5, stagger: 0.15, ease: "power3.out" }, "-=0.5");

    return () => { tl.kill(); };
  }, []);

  return (
    <section id="the-loop" ref={sectionRef} className="w-full bg-white">
      <div className="container-pad py-24">

        {/* Header */}
        <div className="mb-16">
          <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#3A7D5A] mb-3">The Loop</p>
          <h2 className="font-heading text-3xl font-bold text-[#1C2321] sm:text-4xl">
            How the Circular System <span className="text-[#3A7D5A]">Works</span>
          </h2>
          <p className="mt-4 max-w-xl text-[15px] font-body leading-relaxed text-[#6B6259]">
            Four connected stages. Zero waste. A farm that sustains itself season after season.
          </p>
        </div>

        {/* Two column */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">

          {/* Left — image */}
          <div ref={imgRef} className="relative h-[520px] w-full overflow-hidden rounded-3xl">
            <Image
              src="/images/circular-system."
              alt="Ingaju Farms circular agriculture"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          
          </div>

          {/* Right — stages */}
          <div className="relative">
            {/* Vertical connecting line */}
            <div
              ref={lineRef}
              className="absolute left-[19px] top-6 bottom-6 w-px bg-[#3A7D5A]/20"
            />

            <div className="flex flex-col gap-10">
              {STAGES.map(({ number, title, desc }, i) => (
                <div
                  key={number}
                  ref={(el) => { stepsRef.current[i] = el; }}
                  className="flex gap-6 items-start"
                >
                  {/* Number node */}
                  <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-white border-2 border-[#3A7D5A]/30 flex items-center justify-center shadow-sm">
                    <span className="font-heading text-xs font-bold text-[#3A7D5A]">{number}</span>
                  </div>

                  {/* Content */}
                  <div className="pt-1.5">
                    <h3 className="font-heading text-lg font-bold text-[#1C2321]">{title}</h3>
                    <p className="mt-2 text-[14px] font-body leading-relaxed text-[#6B6259]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Loop closed indicator */}
            <div className="mt-10 ml-16 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#3A7D5A]/20" />
              <span className="text-xs font-body font-semibold uppercase tracking-widest text-[#3A7D5A]">Loop Closed ↺</span>
              <div className="h-px flex-1 bg-[#3A7D5A]/20" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
