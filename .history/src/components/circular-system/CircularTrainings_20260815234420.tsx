"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { TRAININGS } from "@/lib/constants";
import { useModal } from "@/components/shared/ModalContext";

export default function CircularTrainings() {
  const { open } = useModal();
  return (
    <section className="w-full bg-[#F8F6F2]">
      <div className="container-pad py-24">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#3A7D5A] mb-3">
  Grow With Us
</p>
<h2 className="font-heading text-3xl font-bold text-[#1C2321] sm:text-4xl">
  Training Programs at <span className="text-[#3A7D5A]">Ingaju</span>
</h2>
          </div>
         
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {TRAININGS.map((item) => (
            <div key={item.key} className="relative h-[440px] w-full max-w-[340px] overflow-hidden rounded-3xl">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="340px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Label — top left */}
              <div className="absolute top-5 left-5">
                <span className="inline-block rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-3 py-1 text-[10px] font-body font-semibold uppercase tracking-widest text-white">
                  Training
                </span>
              </div>

              {/* Bottom content */}
              <div className="absolute inset-x-0 bottom-0 p-7">
                <h3 className="font-heading text-xl font-bold text-white leading-snug">{item.title}</h3>
                <p className="mt-2 text-sm font-body text-white/70 leading-relaxed">{item.description}</p>
                <button
                  onClick={() => open({ variant: "training", product: item.title })}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-body font-semibold text-white border-b border-white/50 pb-0.5 hover:border-white transition-colors"
                >
                  {item.ctaLabel} <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
