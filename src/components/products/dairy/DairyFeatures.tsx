import { Leaf, RefreshCw, ShieldCheck } from "lucide-react";

const FEATURES = [
  { icon: Leaf,       title: "100% Organic",             desc: "No synthetic hormones, antibiotics, or pesticides. Just pure, wholesome nourishment." },
  { icon: RefreshCw,  title: "Circular System",           desc: "The end of one cycle is the beginning of another. Zero waste, pure efficiency." },
  { icon: ShieldCheck, title: "Farm-To-Table Traceability", desc: "Every product is monitored. You always know exactly where your dairy comes from." },
];

export default function DairyFeatures() {
  return (
    <section className="w-full bg-white">
      <div className="container-pad pt-16 pb-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, desc }, idx) => (
            <div key={idx} className="flex flex-col gap-4 rounded-2xl bg-white p-8 shadow-sm border border-[#1C2321]/5">
              <div className="w-fit rounded-xl bg-[#3A7D5A]/10 p-3 text-[#3A7D5A]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#1C2321]">{title}</h3>
              <p className="text-sm font-body text-[#6B6259] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
