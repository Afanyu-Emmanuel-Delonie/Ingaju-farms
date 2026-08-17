"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "@/components/animations/CountUp";
import { IMPACT_STATS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function ImpactStats() {
  const headingRef = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const heading = headingRef.current;
    const stats   = statsRef.current.filter(Boolean) as HTMLDivElement[];
    if (!heading || !stats.length) return;

    gsap.set(heading, { opacity: 0, y: 20 });
    gsap.set(stats,   { opacity: 0, y: 24 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: heading, start: "top 85%", once: true },
    });

    tl.to(heading, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
      .to(stats, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" }, "-=0.3");

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden bg-fixed bg-center bg-cover"
      style={{ backgroundImage: "url('/images/hero/bg-img.webp')" }}
    >
      <div aria-hidden className="absolute inset-0 bg-[#0a0f0d]/75" />

      <div className="relative z-10 container-pad py-24">
        <div ref={headingRef} className="text-center mb-16">
          <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#6DBE8C] mb-3">
            Our Impact
          </p>
          <h2 className="text-3xl font-heading font-bold text-white sm:text-4xl">
            Growing More <span className="text-[#6DBE8C]">Than Food</span>
          </h2>
          <p className="mt-4 text-sm font-body text-white/55 sm:text-base max-w-xl mx-auto">
            Ingaju Farms generates measurable economic, social, and environmental value through direct employment, farmer training, organic production, and community partnerships.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-y-12 sm:grid-cols-4 sm:gap-y-0 sm:divide-x sm:divide-white/10">
          {IMPACT_STATS.map((stat, i) => (
            <div
              key={stat.key}
              ref={(el) => { statsRef.current[i] = el; }}
              className="text-center px-6"
            >
              <div className="flex items-start justify-center">
                {stat.value !== undefined ? (
                  <>
                    <CountUp to={stat.value} className="text-5xl font-heading font-bold text-white sm:text-6xl" />
                    <span className="text-5xl font-heading font-bold text-[#6DBE8C] sm:text-6xl">+</span>
                  </>
                ) : (
                  <span className="text-5xl font-heading font-bold text-white sm:text-6xl">{stat.display}</span>
                )}
              </div>
              <p className="mt-3 text-sm font-body tracking-widest text-white/45">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
