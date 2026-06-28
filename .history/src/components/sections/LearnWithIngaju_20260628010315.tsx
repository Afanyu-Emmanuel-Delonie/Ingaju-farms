"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  { number: "01", title: "Livestock produce manure",       desc: "Our dairy herd generates organic waste that would otherwise go unused." },
  { number: "02", title: "Manure becomes fertilizer",      desc: "Waste is composted and applied back to the fields — no synthetic inputs needed." },
  { number: "03", title: "Crops feed the farm",            desc: "Harvests feed both people and livestock, completing a self-sustaining loop." },
];

export default function LearnWithIngaju() {
  return (
    <section className="w-full bg-[#FAF8F5]">
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
                <Image src="/images/crops.png" alt="Dairy cattle at Ingaju Farms" fill sizes="25vw" className="object-cover" />
              </div>
              <div className="relative h-40 w-full overflow-hidden rounded-2xl">
                <Image src="/images/bg-3.png" alt="Crops growing on the farm" fill sizes="25vw" className="object-cover" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="relative h-40 w-full overflow-hidden rounded-2xl">
                <Image src="/images/bg-2.png" alt="Organic manure being applied" fill sizes="25vw" className="object-cover" />
              </div>
              <div className="relative h-56 w-full overflow-hidden rounded-2xl sm:h-72">
                <Image src="/images/bg-img.png" alt="Healthy harvest at Ingaju" fill sizes="25vw" className="object-cover" />
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
              Circular Agriculture
            </p>
            <h2 className="font-heading text-3xl font-bold leading-tight text-[#1C2321] sm:text-4xl">
              A Farm That <span className="text-[#3A7D5A]">Feeds Itself.</span>
            </h2>
            <p className="mt-5 text-[15px] font-body leading-relaxed text-[#6B6259] max-w-lg">
              Circular agriculture is a system where nothing is wasted — every output becomes an input. At Ingaju, we've built a farm that sustains itself through an integrated loop of livestock, crops, and soil.
            </p>

            {/* Loop steps */}
            <div className="mt-8 flex flex-col gap-6">
              {STEPS.map(({ number, title, desc }) => (
                <div key={number} className="flex gap-5">
                  <span className="flex-shrink-0 font-heading text-3xl font-bold text-[#1C2321]/10 leading-none mt-0.5">{number}</span>
                  <div>
                    <p className="font-body font-semibold text-[#1C2321]">{title}</p>
                    <p className="mt-1 text-sm font-body text-[#6B6259] leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="/circular-system"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3A7D5A] px-8 py-3.5 text-sm font-body font-semibold text-white transition-colors hover:bg-[#2f6b4a]"
              >
                Learn How It Works <ArrowRight className="h-4 w-4" />
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
