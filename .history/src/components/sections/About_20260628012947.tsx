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
              More About Us
            </p>
            <h2 className="mt-3 text-3xl font-heading font-bold leading-tight text-[#1C2321] md:text-4xl">
              Building the Future Through{" "}
              <span className="text-[#3A7D5A]">Circular Farming</span>
            </h2>
          </motion.div>

          <motion.div variants={item} className="flex flex-col justify-center">
            <p className="text-[15px] font-body leading-relaxed text-[#6B6259]">
              Ingaju is a circular agriculture enterprise dedicated to producing
              organic products through sustainable farming practices. Our
              integrated system combines dairy farming, crop production, and
              natural resource recycling to create a productive and
              environmentally responsible farm. In addition to supplying quality
              products, we promote community development through training,
              employment opportunities, and educational farm experiences,
              helping build a more sustainable future for agriculture.
            </p>
            <a
              href="/about"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#3A7D5A] px-6 py-3 text-sm font-body font-medium text-white transition-colors hover:bg-[#2f6b4a]"
            >
              Learn More
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div variants={container(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-8%" }} className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div variants={item} className="relative h-72 w-full overflow-hidden rounded-xl">
            <Image
              src="/images/about/about-1.png"
              alt="Farmer walking with dairy cattle on the Ngaju farm"
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div variants={item} className="flex h-72 w-full flex-col justify-end bg-[#3A7D5A] p-6 text-white rounded-xl">
            <span className="text-4xl font-heading font-bold leading-none sm:text-5xl">6+</span>
            <p className="mt-3 text-sm font-body font-semibold tracking-wide uppercase">Years of Excellence</p>
            <p className="mt-2 text-xs font-body leading-relaxed text-white/80">
              Creating impact through training, employment, farm visits, and knowledge sharing.
            </p>
          </motion.div>

          <motion.div variants={item} className="relative h-72 w-full overflow-hidden rounded-xl">
            <Image
              src="/images/about/about-2.png"
              alt="Ngaju team engaging with farmers and the local community"
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div variants={item} className="flex h-72 w-full flex-col justify-end bg-[#1C2321] p-6 text-white rounded-xl">
            <span className="text-4xl font-heading font-bold leading-none sm:text-5xl">500+</span>
            <p className="mt-3 text-sm font-body font-semibold tracking-wide uppercase">Farmers & Community</p>
            <p className="mt-2 text-xs font-body leading-relaxed text-white/80">
              Creating impact through training, employment, farm visits, and knowledge sharing.
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
