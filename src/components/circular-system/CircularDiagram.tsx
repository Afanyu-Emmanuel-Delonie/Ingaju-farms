"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.7, delayChildren: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const arrowVariants = {
  hidden: { opacity: 0, pathLength: 0 },
  visible: { opacity: 1, pathLength: 1, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] as const } },
};

const NODES = [
  {
    position: "top-0 left-1/2 -translate-x-1/2 -translate-y-2 md:-translate-y-8",
    img: "/images/bg-img.png",
    alt: "Dairy cattle at Ingaju Farms",
    label: "Dairy Cattle",
    desc: "Healthy cows produce fresh milk and organic manure.",
  },
  {
    position: "right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-8",
    img: "/images/bg-2.png",
    alt: "Organic fertilizer from manure",
    label: "Organic Fertilizer",
    desc: "Manure is composted into rich natural fertilizer.",
  },
  {
    position: "bottom-0 left-1/2 -translate-x-1/2 translate-y-2 md:translate-y-8",
    img: "/images/bg-3.png",
    alt: "Crop production at Ingaju",
    label: "Crop Production",
    desc: "Fertile soil grows nutritious, chemical-free crops.",
  },
  {
    position: "left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-8",
    img: "/images/bg-img.png",
    alt: "Animal feed from crops",
    label: "Animal Feed",
    desc: "Crop residues and harvests feed the livestock.",
  },
];

export default function CircularDiagram() {
  return (
    <section id="the-loop" className="w-full bg-[#FAF8F5]">
      <div className="container-pad py-24">

        <div className="text-center mb-16">
          <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#3A7D5A] mb-3">The Loop</p>
          <h2 className="font-heading text-3xl font-bold text-[#1C2321] sm:text-4xl">
            How the Circular System <span className="text-[#3A7D5A]">Works</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-[15px] font-body leading-relaxed text-[#6B6259]">
            Four connected stages. Zero waste. A farm that sustains itself season after season.
          </p>
        </div>

        <div className="flex justify-center items-center">
          <motion.div
            className="relative w-full max-w-[580px] aspect-square flex items-center justify-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
          >
            {/* Center badge */}
            <motion.div
              className="absolute z-20 flex flex-col items-center justify-center rounded-full bg-white shadow-2xl border-4 border-[#eef5f0] w-32 h-32 md:w-40 md:h-40 text-center"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <svg className="mb-1 text-[#3A7D5A]" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
              </svg>
              <p className="font-heading text-base font-bold text-[#3A7D5A]">Ingaju</p>
              <p className="mt-0.5 text-[9px] font-body font-semibold uppercase tracking-widest text-[#3A7D5A]/60 leading-tight">
                Circular<br />Agriculture
              </p>
            </motion.div>

            {/* 4 node cards */}
            {NODES.map(({ position, img, alt, label, desc }) => (
              <motion.div
                key={label}
                variants={itemVariants}
                className={`absolute z-10 w-36 md:w-40 ${position}`}
              >
                <div className="overflow-hidden rounded-xl bg-white shadow-lg border border-[#1C2321]/5">
                  <div className="relative h-24 w-full overflow-hidden">
                    <Image src={img} alt={alt} fill className="object-cover" sizes="160px" />
                  </div>
                  <div className="bg-[#3A7D5A] px-2 py-1.5 text-center">
                    <p className="font-heading text-xs font-bold uppercase tracking-wide text-white">{label}</p>
                  </div>
                  <div className="p-2 text-center">
                    <p className="text-[10px] font-body text-[#6B6259] leading-relaxed">{desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* SVG connecting arrows */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 580 580" fill="none">
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#3A7D5A" />
                </marker>
              </defs>
              <motion.path d="M 375 130 Q 465 185 490 250" stroke="#3A7D5A" strokeWidth="4" fill="none" markerEnd="url(#arrow)" strokeDasharray="5 4" variants={arrowVariants} />
              <motion.path d="M 490 330 Q 465 395 375 450" stroke="#3A7D5A" strokeWidth="4" fill="none" markerEnd="url(#arrow)" strokeDasharray="5 4" variants={arrowVariants} />
              <motion.path d="M 205 450 Q 115 395 90 330" stroke="#3A7D5A" strokeWidth="4" fill="none" markerEnd="url(#arrow)" strokeDasharray="5 4" variants={arrowVariants} />
              <motion.path d="M 90 250 Q 115 185 205 130" stroke="#3A7D5A" strokeWidth="4" fill="none" markerEnd="url(#arrow)" strokeDasharray="5 4" variants={arrowVariants} />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
