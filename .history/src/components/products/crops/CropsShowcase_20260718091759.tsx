"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useModal } from "@/components/shared/ModalContext";

const CROPS = [
  {
    label: "Staple Grain",
    title: "Ingaju Maize",
    unit: "kg",
    desc: "Premium grain grown using data-driven, climate-smart agronomy. Harvested at peak maturity to guarantee high nutritional quality and absolute traceability.",
    img: "/images/crops/maiz-harvest.png",
  },
  {
    label: "Premium Nut",
    title: "Macadamia",
    unit: "kg",
    desc: "High-value export-grade nuts produced completely free of synthetic inputs. Carefully cultivated under sustainable land protocols for global and local markets.",
    img: "/images/crops/nuts.jpg",
  },
  {
    label: "Protein Crop",
    title: "Fresh Beans",
    unit: "kg",
    desc: "Nutrient-dense legumes grown through a sustainable crop rotation loop. Fixes atmospheric nitrogen naturally to regenerate soil structure and maximize field yields.",
    img: "/images/crops/beans.png",
  },
  {
    label: "Oilseed Crop",
    title: "Soybeans",
    unit: "kg",
    desc: "Premium oilseed managed under strict organic fertility frameworks. Engineered for food processors and feed manufacturers demanding clean, chemical-free ingredients.",
    img: "/images/crops/soy-beans.png",
  },
  {
    label: "Tropical Fruit",
    title: "Mangoes",
    unit: "kg",
    desc: "Orchard-grown under strict organic management and harvested at peak readiness. 100% free from synthetic post-harvest chemicals to preserve absolute purity.",
    img: "/images/crops/mangoes.png",
  },
];

export default function CropsShowcase() {
  const { open } = useModal();
  return (
    <section className="w-full bg-white">
      <div className="container-pad py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#3A7D5A] mb-3">
              Our Produce
            </p>
            <h2 className="font-heading text-3xl font-bold text-[#1C2321] sm:text-4xl">
              Harvested <span className="text-[#3A7D5A]">Tomorrow.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[15px] font-body leading-relaxed text-[#6B6259]">
            We don’t just grow crops; we build soil. Using natural compost, we grow nutrient-dense fruits and vegetables.
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
                <button
                  onClick={() => open({ variant: "order", product: prod.title, unit: prod.unit })}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-body font-semibold text-white border-b border-white/50 pb-0.5 hover:border-white transition-colors"
                >
                  Order Now <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
