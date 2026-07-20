import { Leaf, RefreshCw, ShieldCheck } from "lucide-react";

const FEATURES = [
  { 
    icon: Leaf, 
    title: "Zero Synthetic Inputs", 
    desc: "100% free from synthetic hormones, antibiotics, or agrochemicals. Built entirely on organic nutrition and preventive herd health." 
  },
  { 
    icon: RefreshCw,  
    title: "Closed-Loop Ecosystem",   
    desc: "Manure is processed into organic fertilizer, while crop residues return as feed minimizing emissions and operational waste." 
  },
  { 
    icon: ShieldCheck, 
    title: "Fully Traceable Supply", 
    desc: "Monitored from herd to delivery. Strict quality protocols guarantee absolute nutritional integrity and supply transparency." 
  },
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
