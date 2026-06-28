import { Leaf, TrendingDown, Globe, Users, Zap, Droplets, Sprout, RefreshCw } from "lucide-react";

const BENEFITS = [
  {
    icon: Leaf,
    title: "Zero Synthetic Inputs",
    desc: "By producing our own fertilizer and feed on-site, we have eliminated reliance on chemical inputs entirely — safer food, healthier soil, and lower costs.",
  },
  {
    icon: TrendingDown,
    title: "Lower Operating Costs",
    desc: "A closed-loop system dramatically reduces what we spend on external supplies, making the farm more resilient to market fluctuations and price shocks.",
  },
  {
    icon: Sprout,
    title: "Healthier Soil, Better Yields",
    desc: "Returning organic matter and nutrients to the land continuously improves soil structure and fertility — leading to higher crop yields and better feed quality each season.",
  },
  {
    icon: Zap,
    title: "Renewable Energy On-Site",
    desc: "Biogas captured from organic waste powers cooking, heating, and electricity generation on the farm — reducing energy costs and cutting carbon emissions.",
  },
  {
    icon: Droplets,
    title: "Water Conservation",
    desc: "Treated wastewater is reclaimed for irrigation and farm cleaning, conserving fresh water sources and reducing the farm's impact on local water systems.",
  },
  {
    icon: Globe,
    title: "Minimal Environmental Impact",
    desc: "No chemical runoff, no wasted organic matter, no soil depletion. Circular farming actively regenerates the land it operates on rather than extracting from it.",
  },
  {
    icon: Users,
    title: "A Model Others Can Learn",
    desc: "We have trained 300+ farmers using this system. What works at Ingaju can work across Rwanda — and beyond. Knowledge is part of the loop.",
  },
  {
    icon: RefreshCw,
    title: "Full Resource Recovery",
    desc: "Every output — manure, crop residue, wastewater, biogas — is captured and fed back into the system. Nothing is discarded. Everything has a next purpose.",
  },
];

export default function CircularBenefits() {
  return (
    <section className="w-full bg-[#F8F6F2]">
      <div className="container-pad py-24">

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20 lg:items-start">

          {/* Left */}
          <div className="lg:sticky lg:top-32">
            <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#3A7D5A] mb-3">Why It Matters</p>
            <h2 className="font-heading text-3xl font-bold leading-tight text-[#1C2321] sm:text-4xl">
              Better for the Farm.<br />
              <span className="text-[#3A7D5A]">Better for the Planet.</span>
            </h2>
            <p className="mt-5 text-[15px] font-body leading-relaxed text-[#6B6259] max-w-sm">
              Circular agriculture is not just an efficient way to farm — it is a commitment to leaving the land, the water, and the community better than we found them.
            </p>
            <div className="mt-10 w-16 h-px bg-[#3A7D5A]" />
          </div>

          {/* Right — cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {BENEFITS.map(({ icon: Icon, title, desc }, idx) => (
              <div key={title} className="flex flex-col gap-3 rounded-2xl bg-white p-7 border-t-2 border-[#3A7D5A] shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="rounded-lg bg-[#3A7D5A]/8 p-2.5 text-[#3A7D5A]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-heading text-4xl font-bold text-[#3A7D5A]/10 select-none">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-heading text-base font-bold text-[#1C2321] mt-1">{title}</h3>
                <p className="text-sm font-body text-[#6B6259] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
