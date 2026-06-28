"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  { number: "01", title: "Feed Production", desc: "We grow high-quality fodder and forage crops on-site — the foundation for herd health and milk productivity." },
  { number: "02", title: "Dairy Production", desc: "Well-fed cows produce premium, hormone-free milk daily. Feed quality drives milk quality, directly." },
  { number: "03", title: "Waste Utilization", desc: "Manure enters anaerobic digesters — converted into biogas energy and nutrient-rich organic fertilizer." },
  { number: "04", title: "Nutrient Recycling", desc: "Organic matter and treated water return to the land, restoring soil fertility and restarting the loop." },
];

export default function LearnWithIngaju() {
  return (
    <section className="w-full bg-white">
      <div className="container-pad py-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center lg:gap-24">

          {/* Left — image */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="grid grid-cols-2 gap-3"
          >
            <div className="flex flex-col gap-3">
              <div className="relative h-56 w-full overflow-hidden rounded-2xl sm:h-72">
                <Image src="/images/crops/maiz.jpg" alt="Dairy cattle at Ingaju Farms" fill sizes="25vw" className="object-cover" />
              </div>
              <div className="relative h-40 w-full overflow-hidden rounded-2xl">
                <Image src="/images/crops/nuts.jpg" alt="Crops growing on the farm" fill sizes="25vw" className="object-cover" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="relative h-40 w-full overflow-hidden rounded-2xl">
                <Image src="/images/dairy/milk.jpg" alt="Organic manure being applied" fill sizes="25vw" className="object-cover" />
              </div>
              <div className="relative h-56 w-full overflow-hidden rounded-2xl sm:h-72">
                <Image src="/images/dairy/organic-manure.png" alt="Healthy harvest at Ingaju" fill sizes="25vw" className="object-cover" />
              </div>
            </div>
          </motion.div>

          {/* Right — copy */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          >
            <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#3A7D5A] mb-4">
              How We Farm
            </p>
            <h2 className="font-heading text-3xl font-bold leading-tight text-[#1C2321] sm:text-4xl">
              Eight Stages. <span className="text-[#3A7D5A]">Zero Waste.</span>
            </h2>
            <p className="mt-5 text-[15px] font-body leading-relaxed text-[#6B6259] max-w-lg">
              Most farms rely on expensive external inputs — chemical fertilizers, imported feed, synthetic treatments. Ingaju operates as a closed loop where every output from one stage feeds directly into the next.
            </p>

            {/* Loop steps */}
            <div className="relative mt-8 flex flex-col gap-6">
              <div className="absolute left-[19px] top-3 bottom-3 w-px bg-[#3A7D5A]/20" />
              {STEPS.map(({ number, title, desc }) => (
                <div key={number} className="flex gap-5 items-start">
                  <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-white border-2 border-[#3A7D5A]/30 flex items-center justify-center shadow-sm">
                    <span className="font-heading text-xs font-bold text-[#3A7D5A]">{number}</span>
                  </div>
                  <div className="pt-1.5">
                    <p className="font-heading font-bold text-[#1C2321]">{title}</p>
                    <p className="mt-1 text-sm font-body text-[#6B6259] leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
              <div className="mt-2 ml-14 flex items-center gap-3">
                <div className="h-px flex-1 bg-[#3A7D5A]/20" />
                <span className="text-xs font-body font-semibold uppercase tracking-widest text-[#3A7D5A]">Loop Closed ↺</span>
                <div className="h-px flex-1 bg-[#3A7D5A]/20" />
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="/circular-system"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3A7D5A] px-8 py-3.5 text-sm font-body font-semibold text-white transition-colors hover:bg-[#2f6b4a]"
              >
                See How the System Works <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/about"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1C2321]/20 px-8 py-3.5 text-sm font-body font-semibold text-[#1C2321] transition-colors hover:bg-[#1C2321]/5"
              >
                About Ingaju Farms
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
