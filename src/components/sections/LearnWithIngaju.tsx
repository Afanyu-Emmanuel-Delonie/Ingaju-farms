"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TRAININGS } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: EASE } }),
};

export default function LearnWithIngaju() {
  return (
    <section className="w-full bg-[#FAF8F5]">
      <div className="container-pad py-20">
        <h2 className="text-center text-3xl font-heading font-bold text-[#1C2321] sm:text-4xl">
          Learn With <span className="text-[#2E4F41]">Ingaju</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TRAININGS.map((item, i) => (
            <motion.div
              key={item.key}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-8%" }}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-heading font-bold text-[#1C2321]">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm font-body leading-relaxed text-[#6B6259]">
                  {item.description}
                </p>

                <a
                  href={item.ctaHref}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#2E4F41] px-6 py-2.5 text-sm font-body font-medium text-white transition-colors hover:bg-[#3a6352]"
                >
                  {item.ctaLabel}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
