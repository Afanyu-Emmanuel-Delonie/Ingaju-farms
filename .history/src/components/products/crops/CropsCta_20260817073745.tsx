"use client";

import { ArrowRight } from "lucide-react";
import { useModal } from "@/components/shared/ModalContext";

export default function CropsCta() {
  const { open } = useModal();
  return (
    <section
      className="relative w-full min-h-[520px] overflow-hidden bg-fixed bg-center bg-cover sm:min-h-[580px] lg:min-h-[640px]"
      style={{ backgroundImage: "url('/images/crops/nuts.jp')" }}
    >
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />

      <div className="relative z-10 flex flex-col items-center justify-end min-h-[520px] pb-12 text-center sm:min-h-[580px] sm:pb-16 lg:min-h-[640px] lg:pb-20">
        <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl max-w-xl">
          Source Climate-Smart Crops from Our Farm
        </h2>
        <p className="mt-3 max-w-lg text-sm font-body leading-relaxed text-white/80 sm:text-base">
          Whether you are a wholesaler, processor, institution, or individual buyer, we supply fresh, traceable produce grown with organic-input, climate-smart practices.
        </p>
        <div className="mt-6 flex flex-col gap-3 px-6 sm:flex-row sm:px-0">
          <button
            onClick={() => open({ variant: "order", product: "Organic Crops", unit: "kg" })}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3A7D5A] px-6 py-3 text-sm font-body font-medium text-white transition-colors hover:bg-[#2f6b4a]"
          >
            Get a Quote <ArrowRight className="h-4 w-4" />
          </button>
          <a
            href="/about"
            className="inline-flex items-center justify-center rounded-full border border-white/70 bg-transparent px-6 py-3 text-sm font-body font-medium text-white transition-colors hover:bg-white/10"
          >
            Learn About Our Farm
          </a>
        </div>
      </div>
    </section>
  );
}
