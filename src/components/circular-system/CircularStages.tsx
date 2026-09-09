"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CIRCULAR_STAGES } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function CircularStages() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      rowRefs.current.forEach((row) => {
        if (!row) return;
        const img = row.querySelector(".stage-img");
        const content = row.querySelector(".stage-content");

        gsap.fromTo(
          img,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 72%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          content,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 72%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="the-loop" ref={sectionRef} className="w-full bg-white py-24">
      <div className="container-pad mx-auto max-w-5xl">

        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#3A7D5A] mb-3">
            The Three Stages
          </p>
          <h2 className="font-heading text-3xl font-bold text-[#1C2321] sm:text-4xl">
            How the Loop Works
          </h2>
          <p className="mt-4 max-w-md mx-auto text-[15px] font-body leading-relaxed text-[#6B6259]">
            Three stages, zero-waste ambition — every output from one stage becomes the input for the next.
          </p>
        </div>

        {/* Stages */}
        <div className="flex flex-col gap-24">
          {CIRCULAR_STAGES.map(({ number, title, body, bullets, imgSrc, imgAlt }, i) => {
            const isEven = i % 2 === 1;
            return (
              <div
                key={number}
                ref={(el) => { rowRefs.current[i] = el; }}
                className={`flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16 ${isEven ? "lg:flex-row-reverse" : ""}`}
              >
                {/* Image */}
                <div className="stage-img lg:w-1/2 flex-shrink-0">
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                    <Image
                      src={imgSrc}
                      alt={imgAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    {/* Stage number overlay */}
                    <div className="absolute top-5 left-5 bg-[#3A7D5A] text-white font-heading font-bold text-xs tracking-widest uppercase px-3 py-1.5 rounded-full">
                      Stage {number}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="stage-content lg:w-1/2">
                  <p className="text-xs font-body font-semibold tracking-widest uppercase text-[#3A7D5A] mb-3">
                    {number} / 03
                  </p>
                  <h3 className="font-heading text-2xl font-bold text-[#1C2321] sm:text-3xl leading-tight">
                    {title}
                  </h3>
                  <p className="mt-4 text-[15px] font-body text-[#6B6259] leading-relaxed">
                    {body}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {bullets.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm font-body text-[#6B6259]">
                        <span aria-hidden className="mt-[5px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3A7D5A]" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  {/* Connector line to next stage */}
                  {i < CIRCULAR_STAGES.length - 1 && (
                    <div className="mt-10 flex items-center gap-3">
                      <div className="h-px flex-1 bg-[#3A7D5A]/20" />
                      <span className="text-xs font-body text-[#3A7D5A]/60 uppercase tracking-widest">
                        feeds into
                      </span>
                      <div className="h-px flex-1 bg-[#3A7D5A]/20" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
