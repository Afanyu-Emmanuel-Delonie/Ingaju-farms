"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    key: "t1",
    name: "James Mwangi",
    role: "Dairy Farmer, Nakuru",
    quote:
      "The breeding bulls I got from Ingaju completely transformed my herd's productivity. My milk output doubled within a year. I can't recommend them enough.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    key: "t2",
    name: "Grace Wanjiku",
    role: "Smallholder Farmer, Nyeri",
    quote:
      "The dairy farming training at Ingaju was the best investment I've made. Practical, hands-on, and the trainers really understand the realities of small-scale farming in Kenya.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
  },
  {
    key: "t3",
    name: "Peter Otieno",
    role: "Agricultural Extension Officer",
    quote:
      "I've visited many farms across East Africa. Ingaju's circular farming model is one of the most impressive I've seen — sustainable, productive, and genuinely community-driven.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  },
  {
    key: "t4",
    name: "Sarah Kamau",
    role: "School Principal, Nairobi",
    quote:
      "We brought our students for an educational tour and it was an incredible experience. The team was welcoming, knowledgeable, and deeply passionate about their work.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    key: "t5",
    name: "David Kiprop",
    role: "Cooperative Manager, Eldoret",
    quote:
      "Ingaju's bulk supply of raw organic milk is the cleanest we've tested. Their professional approach and reliable delivery schedules make them a key partner for our dairy cooperative.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  },
  {
    key: "t6",
    name: "Mary Atieno",
    role: "Food Distributor, Kisumu",
    quote:
      "Their circular farming model delivers consistent quality year-round. Our retail customers specifically ask for Ingaju products because they value organic farming practices.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = testimonials.length - visibleCount;

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(Math.max(0, maxIndex));
    }
  }, [visibleCount, maxIndex, currentIndex]);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, maxIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section
      className="w-full bg-[#1C2321] text-white overflow-hidden py-24"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container-pad">
        {/* Header and Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#6DBE8C]">
              Testimonials
            </p>
            <h2 className="mt-2 text-3xl font-heading font-bold text-white sm:text-4xl">
              Trusted by <span className="text-[#D07A53]">Farmers & Partners</span>
            </h2>
            <p className="mt-4 max-w-xl text-base font-body leading-relaxed text-white/60">
              Real stories from the people who work with, learn from, and depend on Ingaju Farms every day.
            </p>
          </div>

          {/* Slider controls */}
          {maxIndex > 0 && (
            <div className="flex gap-3 mt-6 md:mt-0">
              <button
                onClick={prevSlide}
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#252E2B] text-white transition-all duration-300 hover:bg-[#2E4F41] hover:border-white/20 hover:scale-105 active:scale-95"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
              </button>
              <button
                onClick={nextSlide}
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#252E2B] text-white transition-all duration-300 hover:bg-[#2E4F41] hover:border-white/20 hover:scale-105 active:scale-95"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          )}
        </div>

        {/* Carousel Window */}
        <div className="relative overflow-hidden -mx-4 px-4 py-4">
          <div
            className="flex transition-transform duration-500 ease-out gap-6"
            style={{
              transform: `translateX(calc(-${currentIndex} * (100% + 24px) / ${visibleCount}))`,
            }}
          >
            {testimonials.map((t) => (
              <div
                key={t.key}
                className="flex flex-col rounded-2xl bg-[#252E2B] border border-white/5 p-8 shadow-md shrink-0 transition-colors duration-300 hover:border-white/10"
                style={{
                  width: `calc(100% / ${visibleCount} - ${(visibleCount - 1) * 24 / visibleCount}px)`,
                }}
              >
                {/* Rating stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 fill-[#d3a33c] text-[#d3a33c]" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="flex-1 text-base font-body leading-relaxed text-white/80 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author Info */}
                <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                  <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-full border border-white/10">
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
                    <p className="text-sm font-body font-bold text-white tracking-wide">
                      {t.name}
                    </p>
                    <p className="text-xs font-body text-white/50 mt-0.5">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        {maxIndex > 0 && (
          <div className="mt-8 flex justify-center gap-2.5">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? "w-6 bg-[#6DBE8C]" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

