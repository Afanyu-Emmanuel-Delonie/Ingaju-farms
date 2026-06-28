"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const item = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const container = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } };

export default function OurStory() {
  return (
    <section className="w-full bg-white">
      <div className="container-pad py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16 items-center">

          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-8%" }} className="grid grid-cols-2 gap-3 h-[420px]">
            <motion.div variants={item} className="flex flex-col gap-3 h-full">
              <div className="relative flex-1 w-full rounded-2xl overflow-hidden">
                <Image src="/images/training-1.png" alt="Farmers gathering" fill className="object-cover" />
              </div>
              <div className="relative flex-1 w-full rounded-2xl overflow-hidden">
                <Image src="/images/about/about-2.png" alt="Classroom learning" fill className="object-cover" />
              </div>
            </motion.div>
            <motion.div variants={item} className="relative h-full w-full rounded-2xl overflow-hidden">
              <Image src="/images/cow.png" alt="Farmers in field" fill className="object-cover" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          >
            <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#3A7D5A]">Our Story</p>
            <h2 className="mt-3 text-3xl font-heading font-bold leading-tight text-[#1C2321] md:text-4xl">
              Built on <span className="text-[#3A7D5A]">Circular Principles</span>
            </h2>
            <p className="mt-5 text-[15px] font-body leading-relaxed text-[#6B6259]">
              Ingaju was founded on the belief that healthy food begins with healthy farming systems. By integrating livestock, crops, and natural resource management, we created a circular farming model that produces quality food while protecting the environment and supporting local communities.
            </p>
            <a
              href="/marketplace"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#3A7D5A] px-6 py-3 text-sm font-body font-medium text-white transition-colors hover:bg-[#2f6b4a]"
            >
              Explore Our Products
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
