"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function MissionVision() {
  return (
    <section className="w-full bg-white">
      <div className="container-pad pb-20">
        <div className="flex flex-col md:flex-row gap-6">
          {[{
            label: "Our Vision",
            text: "To become Africa's leading model for integrated, climate-smart, and circular agriculture delivering sustainable food systems, environmental stewardship, and prosperous farming communities across the continent.",
            bg: "bg-[#3A7D5A]",
            textColor: "text-white",
            subColor: "text-white/75",
          }, {
            label: "Our Mission",
            text: "To produce high-quality dairy and crop products through integrated circular systems, promote responsible resource utilisation, empower farmers through knowledge and innovation, and contribute to food security, climate resilience, and rural economic development.",
            bg: "bg-[#1C2321]",
            textColor: "text-white",
            subColor: "text-white/75",
          }].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: EASE }}
              className={`${card.bg} rounded-2xl p-10 sm:p-14 flex flex-col justify-end min-h-[240px] flex-1`}
            >
              <h3 className={`font-heading text-2xl font-bold ${card.textColor}`}>{card.label}</h3>
              <p className={`mt-4 text-[15px] font-body leading-relaxed ${card.subColor}`}>{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
