"use client";

import { motion } from "framer-motion";
import { Leaf, Lightbulb, ShieldCheck, Users, Star, Globe2, RefreshCcw } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const values = [
  { title: "Sustainability", description: "Protecting the environment, preserving soil and water resources, and ensuring long-term agricultural productivity.", icon: Leaf },
  { title: "Innovation", description: "Embracing biotechnology, climate-smart agriculture, and renewable energy to enhance efficiency, quality, and resilience.", icon: Lightbulb },
  { title: "Integrity", description: "Operating with honesty, transparency, and accountability across all processes, from farm to market.", icon: ShieldCheck },
  { title: "Community Empowerment", description: "Partnering with farmers, youth, women, and local stakeholders to build skills, promote gender equity, and strengthen rural economies.", icon: Users },
  { title: "Excellence", description: "Pursuing the highest standards in production, processing, and service delivery to provide consistent quality and value.", icon: Star },
  { title: "Inclusivity", description: "Developing agricultural systems that actively involve women, youth, and marginalized groups across Africa.", icon: Globe2 },
  { title: "Resilience", description: "Creating adaptable systems and communities that can withstand climate, market, and economic shocks to ensure long-term viability.", icon: RefreshCcw },
];

export default function CoreValues() {
  return (
    <section className="w-full bg-[#F8F6F2] py-20">
      <div className="container-pad">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-14"
        >
          <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#3A7D5A]">What We Stand For</p>
          <h2 className="mt-3 text-3xl font-heading font-bold text-[#1C2321] sm:text-4xl">
            Our Core <span className="text-[#D07A53]">Values</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-px bg-[#1C2321]/10 sm:grid-cols-2 lg:grid-cols-3 rounded-2xl overflow-hidden">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
              className="bg-[#F8F6F2] p-8 flex flex-col gap-4 hover:bg-[#f0ede7] transition-colors duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-full bg-[#3A7D5A]/10 text-[#3A7D5A] flex items-center justify-center">
                  <value.icon className="w-5 h-5" />
                </div>
                <span className="font-heading text-4xl font-bold text-[#1C2321]/10 select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-heading text-lg font-bold text-[#1C2321]">{value.title}</h3>
              <p className="text-sm font-body leading-relaxed text-[#6B6259]">{value.description}</p>
            </motion.div>
          ))}

          {/* Empty filler cell to balance 7 items in a 3-col grid */}
          <div className="hidden lg:block bg-[#F8F6F2]" />
          <div className="hidden lg:block bg-[#F8F6F2]" />
        </div>
      </div>
    </section>
  );
}
