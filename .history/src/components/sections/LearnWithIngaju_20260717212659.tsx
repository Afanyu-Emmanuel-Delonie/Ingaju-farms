"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  { number: "01", title: "Forage & Feed Production", desc: "High-quality fodder and forage crops are cultivated on-site using climate-smart agronomic practices to meet the full nutritional requirements of the dairy herd — reducing dependence on purchased feed and ensuring consistent, traceable feed quality year-round." },
  { number: "02", title: "Dairy Herd Management", desc: "Well-nourished cattle under sound animal husbandry, preventive health management, and welfare-oriented housing produce premium, hormone-free milk. Feed quality, animal welfare, and responsible herd management directly determine milk yield and composition." },
  { number: "03", title: "Manure Collection & Biogas Production", desc: "Livestock manure is collected and fed into anaerobic digesters, where microbial decomposition generates clean biogas for on-farm energy use and nutrient-rich digestate for organic soil amendment — eliminating waste and reducing greenhouse gas emissions." },
  { number: "04", title: "Nutrient Recycling & Soil Restoration", desc: "Processed digestate and compost are returned to the land, replenishing soil organic matter, improving microbial activity, and restoring nutrient levels — completing the production cycle and building long-term climate resilience into the farming system." },
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
             Circular. Integrated. Zero <span className="text-[#3A7D5A]"> Waste.</span>
            </h2>
            <p className="mt-5 text-[15px] font-body leading-relaxed text-[#6B6259] max-w-lg">
              Conventional farms rely on costly synthetic inputs. Ingaju operates as a closed loop where every output becomes a next-stage input—eliminating waste and driving down costs.
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
                Explore the Full System <ArrowRight className="h-4 w-4" />
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
