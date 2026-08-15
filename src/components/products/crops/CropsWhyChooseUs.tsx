"use client";

import { Leaf, RefreshCw, Layers, ShieldCheck } from "lucide-react";

const FEATURES = [
  {
    icon: Leaf,
    title: "Careful Pest & Soil Management",
    desc: "We keep pesticide and chemical use low, and manage soil and pests naturally wherever we can.",
  },
  {
    icon: RefreshCw,
    title: "A Growing Circular Loop",
    desc: "Manure from our livestock is composted into fertilizer as that line scales up, and crop residue goes back into the soil — reducing waste at every stage.",
  },
  {
    icon: Layers,
    title: "Careful Record-Keeping",
    desc: "We track our soil and crops through careful digital record-keeping, season after season.",
  },
  {
    icon: ShieldCheck,
    title: "Traceable From Field to Table",
    desc: "We know where every harvest comes from and how it was grown — so you can too.",
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
              The basics come first: careful soil management, honest record-keeping, and crops you can trace back to our fields in Nyagatare.
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