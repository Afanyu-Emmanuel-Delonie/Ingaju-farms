import { Leaf, RefreshCw, Layers, ShieldCheck } from "lucide-react";

const FEATURES = [
  {
    icon: Leaf,
    title: "Organic Production System",
    desc: "No synthetic pesticides or chemical fertilizers at any stage. All crops are grown using organic soil amendments, biological pest controls, and sustainable agronomic practices that protect soil health and biodiversity.",
  },
  {
    icon: RefreshCw,
    title: "Climate-Smart Circular Farming",
    desc: "Dairy manure is converted into certified organic fertilizer. Crop biomass is returned to the soil. Every resource is kept in the loop — reducing emissions, conserving water, and building climate resilience into the land.",
  },
  {
    icon: Layers,
    title: "Consistent, High-Quality Harvests",
    desc: "From maize to macadamia, crops are cultivated in progressively improving soil conditions. Organic matter accumulation and balanced nutrient management deliver reliable yields with superior nutritional quality season after season.",
  },
  {
    icon: ShieldCheck,
    title: "Traceable & Transparent Supply",
    desc: "Every crop is produced within a fully documented, integrated farming system. Buyers receive consistent quality, clear provenance, and the assurance of a production process free from synthetic chemical inputs.",
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
            <p className="mt-5 text-[15px] font-body leading-relaxed text-[#6B6259] max-w-sm">
              When you choose Ingaju, you are sourcing from a farm where sustainable land management, climate-smart practices, and zero-waste circular production are not aspirations — they are the operating standard.
            </p>
          </div>

          {/* Feature list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {FEATURES.map(({ icon: Icon, title, desc }, idx) => (
              <div key={idx} className="flex flex-col gap-3 rounded-2xl bg-white p-7 border-t-2 border-[#3A7D5A] shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="rounded-lg bg-[#3A7D5A]/8 p-2.5 text-[#3A7D5A]">
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
