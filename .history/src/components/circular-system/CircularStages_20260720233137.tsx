"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    number: "01",
    title: "Dairy Cattle",
    body: "Everything begins with the herd. Healthy, well-fed cattle are the engine of the entire system producing premium milk daily while generating the organic matter that powers every other stage of the loop.",
    bullets: [
      "Pasture-fed, hormone-free herd managed under strict welfare protocols",
      "Milk yield directly tied to feed quality and animal health",
      "Manure collected daily as the primary input for the next stage",
    ],
    imgSrc: "/images/dairy/diary-production.png",
    imgAlt: "Dairy cattle being milked at Ingaju Farms",
  },
  {
    number: "02",
    title: "Organic Fertilizer",
    body: "Manure from the cattle is not discarded  it is processed into nutrient-rich organic fertilizer. This stage eliminates synthetic chemical dependency and returns natural nutrients directly to the soil.",
    bullets: [
      "Manure composted and processed into pathogen-reduced organic fertilizer",
      "Replaces synthetic agrochemicals entirely across all crop fields",
      "Improves soil microbial activity and long-term fertility season after season",
    ],
    imgSrc: "/images/dairy/organic-manure.png",
    imgAlt: "Organic manure fertilizer produced at Ingaju Farms",
  },
  {
    number: "03",
    title: "Crop Production",
    body: "Enriched by organic fertilizer, the fields produce high-yield food and fodder crops. Healthy soil grows nutritious crops and those crops feed both the market and the herd, closing the loop.",
    bullets: [
      "Zero synthetic pesticides or fertilizers applied at any stage",
      "Diverse crop varieties grown year-round on organically enriched soil",
      "Higher nutritional density from biologically active, living soil",
    ],
    imgSrc: "/images/crops/crops-2.png",
    imgAlt: "Maize crop production at Ingaju Farms",
  },
  {
    number: "04",
    title: "Animal Feed",
    body: "Harvested crops and crop residues are milled and formulated into balanced animal feed. This final stage returns nutrition back to the herd restarting the cycle with stronger, healthier cattle.",
    bullets: [
      "Crop residues and by-products fully utilized nothing leaves the system",
      "Feed formulated on-site to match herd nutritional requirements",
      "Closes the loop: feed quality improves with every cycle of the system",
    ],
    imgSrc: "/images/dairy/feed-production.png",
    imgAlt: "Milled animal feed produced at Ingaju Farms",
  },
];

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
    <section ref={sectionRef} className="w-full bg-white py-24">
      <div className="container-pad mx-auto max-w-5xl">

        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#3A7D5A] mb-3">
            The Four Stages
          </p>
          <h2 className="font-heading text-3xl font-bold text-[#1C2321] sm:text-4xl">
            How the Loop Works
          </h2>
          <p className="mt-4 max-w-md mx-auto text-[15px] font-body leading-relaxed text-[#6B6259]">
            Four stages. Zero waste. Every output from one stage becomes the input for the next.
          </p>
        </div>

        {/* Stages */}
        <div className="flex flex-col gap-24">
          {STAGES.map(({ number, title, body, bullets, imgSrc, imgAlt }, i) => {
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
                    {number} / 04
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
                  {i < STAGES.length - 1 && (
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
