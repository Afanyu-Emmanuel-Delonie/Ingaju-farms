import { ArrowRight } from "lucide-react";

export default function JoinUsCta() {
  return (
    <section
      className="relative w-full min-h-[520px] overflow-hidden bg-fixed bg-center bg-cover sm:min-h-[580px] lg:min-h-[640px]"
      style={{ backgroundImage: "url('/images/hero/bg-img.png')" }}
    >
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0d1f1a]/95 via-[#0d1f1a]/60 to-black/20" />

      <div className="relative z-10 flex flex-col items-center justify-end min-h-[520px] pb-12 text-center sm:min-h-[580px] sm:pb-16 lg:min-h-[640px] lg:pb-20">
        <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
          Be Part of the Work
        </h2>
        <p className="mt-3 max-w-xl text-sm font-body leading-relaxed text-white/80 sm:text-base">
          Partner with us, source organic products, or visit the farm to see our circular system in action.
        </p>
        <div className="mt-6 flex w-full flex-col gap-3 px-6 sm:w-auto sm:flex-row sm:px-0">
          <a
            href="/products/dairy"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3A7D5A] px-6 py-3 text-sm font-body font-medium text-white transition-colors hover:bg-[#2f6b4a]"
          >
            Partner With U
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-white/70 bg-transparent px-6 py-3 text-sm font-body font-medium text-white transition-colors hover:bg-white/10"
          >
            Partner With Us
          </a>
        </div>
      </div>
    </section>
  );
}
