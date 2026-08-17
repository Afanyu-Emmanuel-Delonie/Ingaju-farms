"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useMemo } from "react";

const IMAGES = [
  { src: "/images/farm/trainings.png", alt: "Farmer training session" },
  { src: "/images/about/about-2.png", alt: "Farm operations" },
  { src: "/images/crops/maiz.jpg", alt: "Maize harvest" },
  { src: "/images/about/about-3.png", alt: "On the farm" },
  { src: "/images/about/about-5.png", alt: "Farm landscape" },
  { src: "/images/about/about-8.png", alt: "On the farm" },
  { src: "/images/about/about-9.png", alt: "On the farm" },
  { src: "/images/about/about-10.png", alt: "On the farm" },
  { src: "/images/about/about-11.png", alt: "On the farm" },
    { src: "/images/farm/students.png", alt: "Students on farm visit" },
  { src: "/images/about/about-12.png", alt: "On the farm" },
  { src: "/images/dairy/cow-4.png", alt: "Dairy production" },
  { src: "/images/about/about-13.png", alt: "On the farm" },
  { src: "/images/about/about-14.png", alt: "On the farm" },
  { src: "/images/about/about-15.jpg", alt: "On the farm" },
  { src: "/images/crops/crops-2.png", alt: "Maize harvest" },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function OnTheFarm() {
  const shuffled = useMemo(() => shuffle(IMAGES), []);

  return (
    <section className="w-full bg-[#F7F5F2] py-16 overflow-hidden">
      <div className="container-pad mb-10">
        <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#3A7D5A]">On The Farm</p>
        <h2 className="mt-2 text-3xl font-heading font-bold text-[#1C2321] md:text-4xl">
          A Working Farm, <span className="text-[#3A7D5A]">Every Day.</span>
        </h2>
      </div>

      <div className="relative flex gap-4 overflow-hidden">
        {[0, 1].map((i) => (
          <div key={i} aria-hidden={i === 1} className="flex gap-4 shrink-0 animate-marquee">
            {shuffled.map((img) => (
              <div key={img.src} className="relative h-52 w-64 shrink-0 rounded-2xl overflow-hidden sm:h-72 sm:w-80 lg:h-96 lg:w-96">
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="320px" />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="container-pad mt-8">
        <a
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-[#3A7D5A] px-6 py-3 text-sm font-body font-medium text-white transition-colors hover:bg-[#2f6b4a]"
        >
          Visit the Farm
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
