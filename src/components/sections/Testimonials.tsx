"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import BrandPattern from "@/components/shared/BrandPattern";

// NOTE: t1 and t6 originally cited specific percentages ("over 60%", "Over
// 80%") with no source in the repo — softened to non-numeric language
// pending verification. See Ingaju Priority Fix Tracker, Needs Verification.
const testimonials = [
  {
    key: "t1",
    name: "Jean-Pierre Habimana",
    role: "Dairy Farmer, Eastern Province",
    quote: "I purchased two breeding bulls from Ingaju and within one season, my herd's milk yield increased noticeably. The quality of their livestock is unlike anything available locally — healthy, well-managed, and exactly what they promise.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    key: "t2",
    name: "Claudine Uwimana",
    role: "Smallholder Farmer, Musanze",
    quote: "The circular agriculture training changed how I think about my entire farm. I used to burn my crop waste. Now it feeds my livestock, and their manure feeds my fields. My costs dropped and my harvests improved in the same season.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
  },
  {
    key: "t3",
    name: "Olivier Nshimiyimana",
    role: "Agronomist, Rwanda Agriculture Board",
    quote: "Ingaju is the most complete example of circular agriculture I have encountered in Rwanda. They are not just talking about sustainability — they have built a farm that proves it works at commercial scale. A genuine model for the country.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  },
  {
    key: "t4",
    name: "Solange Mukamana",
    role: "Head Teacher, Kigali STEM School",
    quote: "We visited Ingaju with 40 secondary school students and it was the most impactful field trip we have ever organised. The team explains every part of the system clearly. Our students came back asking to study agriculture — that says everything.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    key: "t5",
    name: "Emmanuel Bizimana",
    role: "Supply Manager, Rwamagana Dairy Cooperative",
    quote: "We have been sourcing fresh milk from Ingaju for over a year. The consistency is remarkable — same quality, same hygiene standards, same reliability every single delivery. For a cooperative our size, that dependability is everything.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  },
  {
    key: "t6",
    name: "Diane Ingabire",
    role: "Program Officer, GreenHill Foundation Rwanda",
    quote: "We partnered with Ingaju to run farmer training workshops across three districts. Their hands-on approach and deep practical knowledge produced results we rarely see from classroom-based programs. Most participants made measurable changes within two months.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const go = useCallback((idx: number) => {
    setCurrent((idx + testimonials.length) % testimonials.length);
    setAnimKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const id = setInterval(() => go(current + 1), 6000);
    return () => clearInterval(id);
  }, [isHovered, current, go]);

  const t = testimonials[current];

  return (
    <section
      className="relative w-full py-24 bg-[#1C2321] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <BrandPattern />
      <div className="container-pad grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12 md:gap-16 items-center min-h-[320px]">

        {/* Left — heading + controls */}
        <div>
          <h2 className="text-3xl md:text-4xl font-heading font-medium text-white leading-tight">
            Trusted by Farmers<br />
            <span className="font-bold">& Partners.</span>
          </h2>
          <p className="mt-4 text-base font-body text-white/50 leading-relaxed max-w-xs">
            What farmers, partners, and agronomists say about working with Ingaju every day.
          </p>
          <div className="flex gap-3 mt-8">
            <button
              onClick={() => go(current - 1)}
              className="h-11 w-11 rounded-full border border-white/15 flex items-center justify-center transition-all hover:border-white/30 hover:bg-white/5 active:scale-95 text-white"
              aria-label="Previous"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => go(current + 1)}
              className="h-11 w-11 rounded-full border border-white/15 flex items-center justify-center transition-all hover:border-white/30 hover:bg-white/5 active:scale-95 text-white"
              aria-label="Next"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          {/* Progress dots */}
          <div className="flex gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-6 bg-[#3A7D5A]" : "w-1.5 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right — quote */}
        <div>
          <span className="block font-heading text-[80px] leading-none text-[#3A7D5A] -mb-3 select-none" aria-hidden>
            &ldquo;
          </span>
          <div key={animKey} className="animate-fade-up">
            <p className="text-base md:text-lg font-heading font-normal leading-relaxed text-white line-clamp-2">
              {t.quote}
            </p>
            <div className="mt-7 flex items-center gap-4">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/10">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  fill
                  sizes="44px"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div>
                <p className="text-sm font-body font-bold text-white">{t.name}</p>
                <p className="text-xs font-body text-white/45 mt-0.5">{t.role}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
