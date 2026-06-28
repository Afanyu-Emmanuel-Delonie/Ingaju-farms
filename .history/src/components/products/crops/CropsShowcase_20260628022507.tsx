import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CROPS = [
  {
    label: "Staple Grain",
    title: "Ingaju Corn",
    desc: "High-yield, non-GMO corn grown on naturally enriched soil. Harvested at peak nutrition — ideal for households, processors, and bulk buyers.",
    img: "/images/maiz.png",
  },
  {
    label: "Premium Nut",
    title: "Ingaju Macadamia",
    desc: "Rwanda-grown macadamia with a rich, buttery flavour. Our diverse plantation conditions produce nuts of exceptional grade and consistency.",
    img: "/images/bg-img.png",
  },
  {
    label: "Protein Crop",
    title: "Ingaju Beans",
    desc: "High-protein beans cultivated through sustainable crop rotation. Naturally fertile soil means no synthetic inputs — just clean, wholesome legumes.",
    img: "/images/bg-img.png",
  },
];

export default function CropsShowcase() {
  return (
    <section className="w-full bg-[#F8F6F2]">
      <div className="container-pad py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#3A7D5A] mb-3">
              Our Produce
            </p>
            <h2 className="font-heading text-3xl font-bold text-[#1C2321] sm:text-4xl">
              Crops Grown With <span className="text-[#3A7D5A]">Purpose</span>
            </h2>
          </div>
          <p className="max-w-sm text-[15px] font-body leading-relaxed text-[#6B6259]">
            Every crop on Ingaju Farms is grown as part of a closed-loop system — no synthetic inputs, no shortcuts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CROPS.map((prod, idx) => (
            <div key={idx} className="group relative h-[480px] w-full overflow-hidden rounded-2xl">
              <Image
                src={prod.img}
                alt={prod.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <span className="inline-block rounded-full bg-[#3A7D5A] px-3 py-1 text-xs font-body font-semibold uppercase tracking-widest text-white mb-3">
                  {prod.label}
                </span>
                <h3 className="font-heading text-2xl font-bold text-white">{prod.title}</h3>
                <p className="mt-3 text-sm font-body text-white/75 leading-relaxed">{prod.desc}</p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-body font-semibold text-[#1C2321] transition-colors hover:bg-[#f0ede8]"
                >
                  Order Now <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
