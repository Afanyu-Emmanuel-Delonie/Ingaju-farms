"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CountUp from "@/components/animations/CountUp";
import { IMPACT_STATS } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ImpactStats() {
  return (
    <section className="relative w-full overflow-hidden">
      <Image
        src="/images/hero/bg-2.png"
        alt="Ingaju farm background"
        fill
        className="object-cover object-center"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

      <div className="relative z-10 container-pad py-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl font-heading font-bold text-white sm:text-3xl">
            Growing More <span className="text-[#6DBE8C]">Than Food</span>
          </h2>
          <p className="mt-3 text-sm font-body text-white/60 sm:text-base max-w-xl mx-auto">
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
                <CountUp to={stat.value} className="text-4xl font-heading font-bold text-[#6DBE8C] sm:text-5xl" />
                <span className="text-4xl font-heading font-bold text-[#6DBE8C] sm:text-5xl">+</span>
              </div>
              <p className="mt-2 text-sm font-body text-white/60">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
