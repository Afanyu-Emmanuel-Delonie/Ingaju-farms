"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

const IMAGES = [
  { src: "/images/farm/trainings.webp", alt: "Students observing dairy cattle during a farm training session" },
  { src: "/images/about/about-2.webp", alt: "Community members gathered at an Ingaju Farms event" },
  { src: "/images/crops/maiz.webp", alt: "Farmers harvesting maize at Ingaju Farms" },
  { src: "/images/about/about-3.webp", alt: "Dairy farmers attending a training session at Ingaju Farms" },
  { src: "/images/about/about-5.webp", alt: "Farmer transporting freshly cut fodder by motorcycle" },
  { src: "/images/about/about-8.webp", alt: "Farmers attending a dairy farming management training session" },
  { src: "/images/about/about-9.webp", alt: "Trainer leading a livestock farmer training session" },
  { src: "/images/about/about-10.webp", alt: "Farmer carrying freshly cut fodder on a motorcycle" },
  { src: "/images/about/about-11.webp", alt: "Farm worker standing beside dairy cows in the barn" },
    { src: "/images/farm/students.webp", alt: "Agriculture students gathered for a training session at Ingaju Farms" },
  { src: "/images/about/about-12.webp", alt: "Farmers attending a cooperative training meeting" },
  { src: "/images/dairy/cow-4.webp", alt: "Dairy cows and calves resting in the barn" },
  { src: "/images/about/about-13.webp", alt: "Team members in discussion at the farm" },
  { src: "/images/about/about-14.webp", alt: "Trainees in lab coats visiting the dairy barn" },
  { src: "/images/about/about-15.webp", alt: "Group gathered together outside a farm building" },
  { src: "/images/crops/crops-2.webp", alt: "Irrigation sprinklers watering the maize fields" },
];

export default function OnTheFarm() {
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
            {IMAGES.map((img) => (
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
