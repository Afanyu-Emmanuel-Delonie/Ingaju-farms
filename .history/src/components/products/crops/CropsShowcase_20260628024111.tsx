import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CROPS = [
  {
    label: "Staple Grain",
    title: "Ingaju Corn",
    desc: "High-yield, non-GMO corn grown on naturally enriched soil. Harvested at peak nutrition — ideal for households, processors, and bulk buyers.",
    img: "/images/maiz.jpg",
  },
  {
    label: "Premium Nut",
    title: "Ingaju Macadamia",
    desc: "Rwanda-grown macadamia with a rich, buttery flavour. Our diverse plantation conditions produce nuts of exceptional grade and consistency.",
    img: "/images/nuts.jpg",
  },
  {
    label: "Protein Crop",
    title: "Ingaju Beans",
    desc: "High-protein beans cultivated through sustainable crop rotation. Naturally fertile soil means no synthetic inputs — just clean, wholesome legumes.",
    img: "/images/bg-img.png",
  },
  {
    label: "Oilseed Crop",
    title: "Ingaju Soybeans",
    desc: "Nutrient-dense soybeans grown through regenerative farming practices. Rich in protein and natural oils — ideal for processors, feed producers, and bulk buyers.",
    img: "/images/bg-img.png",
  },
  {
    label: "Tropical Fruit",
    title: "Ingaju Mangoes",
    desc: "Sun-ripened mangoes harvested from our orchard at peak sweetness. Naturally grown without synthetic chemicals — fresh, fragrant, and full of flavour.",
    img: "/images/bg-img.png",
  },
];

export default function CropsShowcase() {
  return (
    <section className="w-full bg-white">
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

        <div className="flex flex-wrap justify-center gap-6">
          {CROPS.map((prod, idx) => (
            <div key={idx} className="relative h-[500px] w-full max-w-[340px] overflow-hidden rounded-3xl">
              {/* Image */}
              <Image
                src={prod.img}
                alt={prod.title}
                fill
                className="object-cover"
              />

              {/* Dark base */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Label — top left */}
              <div className="absolute top-5 left-5">
                <span className="inline-block rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-3 py-1 text-[10px] font-body font-semibold uppercase tracking-widest text-white">
                  {prod.label}
                </span>
              </div>

              {/* Bottom content */}
              <div className="absolute inset-x-0 bottom-0 p-7">
                <h3 className="font-heading text-2xl font-bold text-white leading-snug">
                  {prod.title}
                </h3>
                <p className="mt-3 text-sm font-body text-white/75 leading-relaxed">
                  {prod.desc}
                </p>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-body font-semibold text-white border-b border-white/50 pb-0.5 hover:border-white transition-colors"
                >
                  Order Now <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
