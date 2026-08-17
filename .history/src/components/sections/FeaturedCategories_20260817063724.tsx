import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";

export default function FeaturedCategories() {
  return (
    <section className="w-full bg-white">
      <div className="container-pad py-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#3A7D5A] mb-3">What We Produce</p>
            <h2 className="text-3xl font-heading font-bold text-[#1C2321] sm:text-4xl">
              Produced With <span className="text-[#3A7D5A]">Purpose.</span>
            </h2>
          </div>
            <p className="max-w-sm text-[15px] font-body leading-relaxed text-[#6B6259]">
            Our products come from an integrated farm system with traceable production and managed environmental impact.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4">
          {/* Dairy — full-width hero card */}
          <a
            href="/products/dairy"
            className="group relative block h-[28rem] w-full overflow-hidden rounded-2xl sm:h-[32rem]"
          >
            <Image
              src="/images/dairy/cow-2.png"
              alt="Dairy cattle grazing on the farm"
              fill
              sizes="100vw"
              className="object-cover object-[70%_top] transition-transform duration-500 group-hover:scale-105 sm:object-[center_20]"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            {/* Frosted label */}
            <div className="absolute top-5 left-5">
              <span className="inline-block rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-3 py-1 text-[10px] font-body font-semibold uppercase tracking-widest text-white">
                Featured
              </span>
            </div>
            <div className="absolute inset-y-0 left-0 flex flex-col justify-end p-8 max-w-lg">
              <h3 className="text-2xl font-heading font-bold text-white sm:text-3xl">Livestock & Dairy</h3>
            {/* NOTE: "with no added hormones" removed — not a confirmed practice. See Priority Fix Tracker, Needs Verification. */}
            <p className="mt-2 text-sm font-body leading-relaxed text-white/75">
             Milk and breeding livestock raised to strict welfare and nutrition standards.
            </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-body font-semibold text-white border-b border-white/50 pb-0.5 w-fit hover:border-white transition-colors">
                Explore Dairy <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </a>

          {/* Remaining 3 categories — single row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {CATEGORIES.slice(1).map((category) => (
            <a
              key={category.key}
              href={category.ctaHref}
              className="group relative block h-72 w-full overflow-hidden rounded-2xl"
            >
              <Image
                src={category.image}
                alt={category.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 680px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/30 to-transparent" />
              {/* Frosted label */}
              <div className="absolute top-4 left-4">
                <span className="inline-block rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-3 py-1 text-[10px] font-body font-semibold uppercase tracking-widest text-white">
                  {category.title}
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="mt-1 text-sm font-body leading-relaxed text-white/75">{category.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-body font-semibold text-white border-b border-white/50 pb-0.5 hover:border-white transition-colors">
                  {category.ctaLabel} <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </a>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
