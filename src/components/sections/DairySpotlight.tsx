import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const products = [
  {
    key: "milk",
    title: "Fresh Organic Milk",
    description: "Pure, unprocessed milk from pasture-raised cattle. No additives, no shortcuts.",
  },
  {
    key: "bulls",
    title: "Breeding Bulls",
    description: "High-quality bulls for genetic improvement and productivity on your farm.",
  },
  {
    key: "manure",
    title: "Organic Manure",
    description: "Nutrient-rich fertilizer produced from our circular farming system.",
  },
];

export default function DairySpotlight() {
  return (
    <section className="w-full bg-[#3A7D5A]">
      <div className="container-pad py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-body font-semibold uppercase tracking-widest text-white/80">
              Our Core Business
            </span>
            <h2 className="mt-4 text-3xl font-heading font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Our Finest<br />
              <span className="text-[#6DBE8C]">Dairy Operation</span>
            </h2>
            <p className="mt-5 text-[15px] font-body leading-relaxed text-white/70">
              At the heart of Ingaju is a world-class dairy operation. Our cattle are
              pasture-raised on rich organic land, producing premium milk and
              breeding stock that farmers trust.
            </p>

            <ul className="mt-8 space-y-4">
              {products.map((p) => (
                <li key={p.key} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#6DBE8C]" />
                  <div>
                    <p className="text-sm font-body font-semibold text-white">{p.title}</p>
                    <p className="text-sm font-body text-white/60">{p.description}</p>
                  </div>
                </li>
              ))}
            </ul>

            <a
              href="/categories/dairy-livestock"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-body font-semibold text-[#3A7D5A] transition-colors hover:bg-white/90"
            >
              Explore Dairy Products
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="relative h-64 w-full overflow-hidden rounded-2xl sm:h-80">
              <Image
                src="/images/bg-img.png"
                alt="Dairy cattle at Ingaju farm"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="relative h-40 w-full overflow-hidden rounded-2xl sm:h-48">
                <Image
                  src="/images/bg-2.png"
                  alt="Fresh milk produced at Ingaju"
                  fill
                  sizes="(min-width: 1024px) 20vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center rounded-2xl bg-[#1C2321] p-5">
                <span className="text-3xl font-heading font-bold text-white">98%</span>
                <p className="mt-1 text-xs font-body font-semibold uppercase tracking-wide text-[#6DBE8C]">
                  Customer Satisfaction
                </p>
                <p className="mt-2 text-xs font-body text-white/60 leading-relaxed">
                  Trusted by farmers and households everywhere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
