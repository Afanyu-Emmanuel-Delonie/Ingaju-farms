"use client";

import { motion } from "framer-motion";
import CountUp from "@/components/animations/CountUp";
import { IMPACT_STATS } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ImpactStats() {
  return (
    <section
      className="relative w-full overflow-hidden bg-fixed bg-center bg-cover"
      style={{ backgroundImage: "url('/images/bg-img.png')" }}
    >
      <div aria-hidden className="absolute inset-0 bg-black/55" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      <div className="relative z-10 container-pad py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center mb-16"
        >
          <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#6DBE8C] mb-3">
            Our Impact
          </p>
          <h2 className="text-3xl font-heading font-bold text-white sm:text-4xl">
            Growing More <span className="text-[#6DBE8C]">Than Food</span>
          </h2>
          <p className="mt-4 text-sm font-body text-white/60 sm:text-base max-w-xl mx-auto">
            Our work creates economic, social, and environmental value for the community.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-y-12 sm:grid-cols-4 sm:gap-y-0 sm:divide-x sm:divide-white/20">
          {IMPACT_STATS.map((stat, i) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              className="text-center px-6"
            >
              <div className="flex items-start justify-center">
                <CountUp to={stat.value} className="text-5xl font-heading font-bold text-white sm:text-6xl" />
                <span className="text-5xl font-heading font-bold text-[#6DBE8C] sm:text-6xl">+</span>
              </div>
              <p className="mt-3 text-sm font-body font-re uppercase tracking-widest text-white/50">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
