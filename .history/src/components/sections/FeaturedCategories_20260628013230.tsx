import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";

export default function FeaturedCategories() {
  return (
    <section className="w-full bg">
      <div className="container-pad py-20">
        <h2 className="text-3xl font-heading font-bold text-[#1C2321] sm:text-4xl">
          What We <span className="text-[#3A7D5A]">Offer</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-4">
          {/* Dairy — full-width hero card */}
          <a
            href="/categories/dairy-livestock"
            className="group relative block h-96 w-full overflow-hidden rounded-2xl"
          >
            <Image
              src="/images/bg-img.png"
              alt="Dairy cattle grazing on the farm"
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div aria-hidden className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-y-0 left-0 flex flex-col justify-end p-8 max-w-lg">
              <span className="inline-block w-fit rounded-full bg-[#3A7D5A] px-3 py-1 text-xs font-body font-semibold uppercase tracking-widest text-white mb-3">
                Featured
              </span>
              <h3 className="text-2xl font-heading font-bold text-white sm:text-3xl">Dairy & Livestock</h3>
              <p className="mt-2 text-sm font-body leading-relaxed text-white/80">
                Fresh milk, organic manure, and quality breeding livestock produced through responsible farm management.
              </p>
              <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-[#3A7D5A] px-5 py-2.5 text-sm font-body font-medium text-white transition-colors group-hover:bg-[#2f6b4a]">
                Explore Dairy <ArrowRight className="h-4 w-4" />
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
              <div aria-hidden className="absolute inset-0 bg-black/60" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-lg font-heading font-bold text-white">{category.title}</h3>
                <p className="mt-1 text-sm font-body leading-relaxed text-white/80">{category.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-body font-medium text-[#1C2321] transition-colors group-hover:bg-white/90">
                  {category.ctaLabel} <ArrowRight className="h-4 w-4" />
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
