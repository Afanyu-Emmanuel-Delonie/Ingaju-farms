import { Leaf, RefreshCw, Layers, ShieldCheck } from "lucide-react";

const FEATURES = [
  {
    icon: Leaf,
    title: "100% Organic",
    desc: "No synthetic pesticides. No chemical fertilizers. Just pure, natural crops grown exactly how nature intended.",
  },
  {
    icon: RefreshCw,
    title: "Zero Waste",
    desc: "Our dairy manure feeds our fields. Our crop waste feeds the soil. A perfect circular system.",
  },
  {
    icon: Layers,
    title: "Rich Harvests",
    desc: "From corn to macadamia. Grown in nutrient-dense soil to guarantee peak flavor and health.",
  },
  {
    icon: ShieldCheck,
    title: "Total Transparency",
    desc: "You know exactly where your food comes from. Traceable, responsible, and grown with purpose.",
  },
];

export default function CropsWhyChooseUs() {
  return (
    <section className="w-full bg-[#F8F6F2]">
      <div className="container-pad py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 lg:items-start">

          {/* Sticky left heading */}
          <div className="lg:sticky lg:top-32">
            <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#3A7D5A] mb-3">
              Why Ingaju
            </p>
            <h2 className="font-heading text-3xl font-bold leading-tight text-[#1C2321] sm:text-4xl">
              Grown With Purpose.
            </h2>
            <p className="mt-5 text-[15px] font-body leading-relaxed text-[#6B6259] max-w-sm">
              When you choose Ingaju, you aren’t just buying food. You are supporting a zero-waste farming system. You are choosing a better future for agriculture.
            </p>
          </div>

          {/* Feature list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
