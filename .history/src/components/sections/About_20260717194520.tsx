"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const item = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const container = (stagger = 0.1) => ({ hidden: {}, show: { transition: { staggerChildren: stagger } } });

export default function About() {
  return (
    <section className="w-full bg-white">
      <div className="container-pad py-20">

        <motion.div variants={container(0.15)} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-8%" }} className="grid grid-cols-1 gap-10 pb-20 md:grid-cols-2 md:gap-16 items-center">
          <motion.div variants={item}>
            <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#3A7D5A]">
              Who We Are
            </p>
            <h2 className="mt-3 text-3xl font-heading font-bold leading-tight text-[#1C2321] md:text-4xl">
              Integrated Farming.{" "}
              <span className="text-[#3A7D5A]">Regenerative Results.</span>
            </h2>
          </motion.div>

          <motion.div variants={item} className="flex flex-col justify-center">
            <p className="text-[15px] font-body leading-relaxed text-[#6B6259]">
             We operate a closed-loop agribusiness in Rwanda that integrates dairy farming and crop cultivation. By recycling livestock manure into high-quality organic fertilizer, we eliminate the need for expensive synthetic inputs, lower production costs, and actively restore soil health.
            <p className="mt-4 text-[15px] font-body leading-relaxed text-[#6B6259]">
              The result is safer food, healthier soils, lower production costs, and a farming system that actively restores the land, mitigates climate risk, and strengthens the rural communities that depend on it.
            </p>
            <a
              href="/about"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#3A7D5A] px-6 py-3 text-sm font-body font-medium text-white transition-colors hover:bg-[#2f6b4a]"
            >
              Our Full Story
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div variants={container(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-8%" }} className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div variants={item} className="relative h-72 w-full overflow-hidden rounded-xl">
            <Image
              src="/images/dairy/cow-3.png"
              alt="Farmer walking with dairy cattle on the Ngaju farm"
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div variants={item} className="flex h-72 w-full flex-col justify-end bg-[#3A7D5A] p-6 text-white rounded-xl border-t-4 border-[#2f6b4a] relative overflow-hidden">
            {/* Dot grid decoration */}
            <svg className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none" viewBox="0 0 200 200" fill="white">
              {Array.from({ length: 5 }).map((_, row) =>
                Array.from({ length: 5 }).map((_, col) => (
                  <circle key={`${row}-${col}`} cx={col * 38 + 10} cy={row * 38 + 10} r="2.5" />
                ))
              )}
            </svg>
            <span className="text-4xl font-heading font-bold leading-none sm:text-5xl">6+</span>
            <p className="mt-3 text-sm font-body font-semibold tracking-wide uppercase">Years in Operation</p>
            <p className="mt-2 text-xs font-body leading-relaxed text-white/80">
              Building a track record of commercial production, farmer training, and sustainable land management.
            </p>
          </motion.div>

          <motion.div variants={item} className="relative h-72 w-full overflow-hidden rounded-xl">
            <Image
              src="/images/about/about-4.png"
              alt="Ngaju team engaging with farmers and the local community"
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div variants={item} className="flex h-72 w-full flex-col justify-end bg-[#1C2321] p-6 text-white rounded-xl border-t-4 border-[#3A7D5A] relative overflow-hidden">
            {/* Decorative arc */}
            <svg className="absolute bottom-0 right-0 w-40 h-40 opacity-5 pointer-events-none" viewBox="0 0 300 300" fill="none">
              <path d="M300 300 Q 100 300 100 100" stroke="#6DBE8C" strokeWidth="60" strokeLinecap="round" />
            </svg>
            <span className="text-4xl font-heading font-bold leading-none sm:text-5xl">500+</span>
            <p className="mt-3 text-sm font-body font-semibold tracking-wide uppercase">Farmers & Community Members Reached</p>
            <p className="mt-2 text-xs font-body leading-relaxed text-white/80">
              Farmers trained, employed, and engaged through on-farm programmes, cooperative partnerships, and knowledge transfer initiatives.
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
