import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CropsCta() {
  return (
    <section className="w-full bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="relative mx-auto h-[420px] max-w-6xl overflow-hidden rounded-3xl sm:h-[400px]">
        <Image
          src="/images/bg-img.png"
          alt="Lush crop fields at Ingaju Farms"
          fill
          sizes="(min-width: 1024px) 1152px, 100vw"
          className="object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />

        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-10 text-center sm:px-10 sm:pb-12">
          <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl max-w-xl">
            Ready to Source Organic Crops from Ingaju?
          </h2>
          <p className="mt-3 max-w-lg text-sm font-body leading-relaxed text-white/80 sm:text-base">
            Whether you're a wholesaler, retailer, institution, or individual — we supply fresh, traceable, organically grown produce on a consistent basis.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2E4F41] px-6 py-3 text-sm font-body font-medium text-white transition-colors hover:bg-[#3a6352]"
            >
              Get a Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full border border-white/70 bg-transparent px-6 py-3 text-sm font-body font-medium text-white transition-colors hover:bg-white/10"
            >
              Learn About Our Farm
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
