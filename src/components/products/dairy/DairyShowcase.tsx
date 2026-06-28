"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useModal } from "@/components/shared/ModalContext";

const PRODUCTS = [
  {
    label: "Fresh Dairy",
    title: "Fresh Milk",
    unit: "liters",
    desc: "Pasture-raised. No synthetic hormones. Just rich, creamy milk that tastes exactly how nature intended.",
    img: "/images/dairy/milk.jpg",
  },
  {
    label: "Farm Input",
    title: "Organic Manure",
    unit: "kg",
    desc: "In circular farming, nothing goes to waste. Give your own soil the foundation it needs to thrive.",
    img: "/images/manure.jpg",
  },
  {
    label: "Livestock",
    title: "Breeding Bulls",
    unit: "head",
    desc: "Genetically healthy and disease-free. Raised carefully for superior dairy and beef performance.",
    img: "/images/bools.png",
  },
];

export default function DairyShowcase() {
  const { open } = useModal();
  return (
    <section className="w-full bg-[#F8F6F2]">
      <div className="container-pad py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#3A7D5A] mb-3">
              Our Products
            </p>
            <h2 className="font-heading text-3xl font-bold text-[#1C2321] sm:text-4xl">
              Fresh. Rich. <span className="text-[#3A7D5A]">Organic.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[15px] font-body leading-relaxed text-[#6B6259]">
            Three products, one circular system. Every jar, every drop supports local biodiversity.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {PRODUCTS.map((prod, idx) => (
            <div key={idx} className="relative h-[500px] w-full max-w-[340px] overflow-hidden rounded-3xl">
              <Image
                src={prod.img}
                alt={prod.title}
                fill
                className="object-cover"
              />
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
