"use client";

import { Leaf, RefreshCw, Layers, ShieldCheck } from "lucide-react";

const FEATURES = [
  {
    icon: Leaf,
    title: "Zero Synthetic Inputs",
    desc: "100% free from chemical pesticides or synthetic fertilizers. Cultivated strictly using certified organic soil management and advanced biological pest controls.",
  },
  {
    icon: RefreshCw,
    title: "Closed-Loop Ecosystem",
    desc: "Processed dairy manure restores crop fields while mapped biomass returns as high-nutrition livestock feed—minimizing waste and driving resource efficiency.",
  },
  {
    icon: Layers,
    title: "Data-Driven Yields",
    desc: "Continuous soil monitoring and optimized nutrient balancing unlock highly predictable crop yields alongside superior food and feed quality.",
  },
  {
    icon: ShieldCheck,
    title: "Absolute Traceability",
    desc: "Every harvest is logged from field to fulfillment, providing verified provenance, transparent quality metrics, and pristine chemical-free assurance.",
  },
];

export default function CropsWhyChooseUs() {
  return (
    <section className="w-full bg-[#F8F6F2]">
      <div className="container-pad py-24">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12 lg:items-start">

          {/* Sticky left heading */}
          <div className="lg:sticky lg:top-32">
            <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#3A7D5A] mb-3">
              Why Ingaju
            </p>
            <h2 className="font-heading text-3xl font-bold leading-tight text-[#1C2321] sm:text-4xl">
              Grown With Purpose.
            </h2>
            <p className="mt-4 text-[15px] font-body leading-relaxed text-[#6B6259] max-w-sm">
              We replace guesswork with data-driven precision. By pairing absolute resource loop efficiency with strict corporate traceability, we deliver enterprise-grade agricultural yields built on true circular principles.
            </p>
          </div>

          {/* Feature list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map(({ icon: Icon, title, desc }, idx) => (
              <div key={idx} className="flex flex-col gap-3 rounded-2xl bg-white p-7 border-t-2 border-[#3A7D5A] shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="rounded-lg bg-[#3A7D5A]/5 p-2.5 text-[#3A7D5A]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-heading text-4xl font-bold text-[#3A7D5A]/10 select-none">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold text-[#1C2321] mt-1">{title}</h3>
                <p className="text-sm font-body text-[#6B6259] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}