import Image from "next/image";
import { ArrowRight } from "lucide-react";

const INSIGHTS = [
  { title: "How We Learned to Run a Farm on Its Own Remnants.", desc: "A deeper look at the circular farming model in practice. Learn how waste becomes value." },
  { title: "Rooting the Macadamia Nut into Rwandan Soil", desc: "Understanding the challenges and triumphs of cultivating diverse crops alongside dairy farming." },
  { title: "What Happens When Strangers Walk Our Fields.", desc: "A narrative on our farm tours and how they build a community of conscious consumers." },
];

export default function DairyInsights() {
  return (
    <section className="container-pad py-16 mb-20 bg-white">
      <div className="text-center mb-12">
        <p className="text-xs font-bold tracking-widest text-[#D07A53] uppercase mb-3">INGAJU'S INSIGHTS</p>
        <h2 className="font-heading text-3xl font-bold text-[#1C2321]">Learn from Ingaju Dairy.</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {INSIGHTS.map((insight, idx) => (
          <div key={idx} className="group cursor-pointer">
            <div className="relative h-60 w-full overflow-hidden rounded-2xl mb-6">
              <Image src="/images/bg-img.png" alt={insight.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <h3 className="font-heading text-xl font-bold text-[#1C2321] group-hover:text-[#3A7D5A] transition-colors">{insight.title}</h3>
            <p className="mt-3 text-sm font-body text-[#1C2321]/70 line-clamp-3">{insight.desc}</p>
            <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#D07A53]">
              Read The Article <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
