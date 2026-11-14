import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";
import { FERTILIZER_LINE_STATUS } from "@/lib/constants";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: { absolute: "Organic Fertilizer Waitlist | Ingaju Farms" },
  description:
    "Join the waitlist for Ingaju Farms' organic fertilizer, a nutrient-rich compost made from livestock manure in Nyagatare, Rwanda, as our composting line scales up.",
  alternates: { canonical: "https://ingajufarms.com/products/organic-fertilizer" },
  openGraph: {
    url: "https://ingajufarms.com/products/organic-fertilizer",
    title: "Organic Fertilizer Waitlist | Ingaju Farms",
    description:
      "Nutrient-rich organic fertilizer processed from Ingaju Farms' own livestock manure, currently scaling up. Join the waitlist to be notified first.",
    images: [{ url: "/images/dairy/organic-manure.webp", width: 1200, height: 630, alt: "Organic fertilizer produced at Ingaju Farms" }],
  },
};

// No price exists yet (the line hasn't reached commercial volume), so no
// `offers` field is emitted — see the Ingaju SEO Rules guide on not inventing
// business facts. `availability: PreOrder` is accurate, not invented: this is
// genuinely a waitlist for a product line that is scaling up.
// TODO(owner): once pricing is set, add `offers: { "@type": "Offer", price, priceCurrency: "RWF", availability: "https://schema.org/PreOrder" }`.
const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Organic Fertilizer",
  image: "https://ingajufarms.com/images/dairy/organic-manure.webp",
  description: `Nutrient-rich organic fertilizer processed from Ingaju Farms' own livestock manure, ${FERTILIZER_LINE_STATUS}.`,
  brand: { "@type": "Brand", name: "Ingaju Farms" },
};

export default function OrganicFertilizerPage() {
  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={productJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Organic Fertilizer", path: "/products/organic-fertilizer" },
        ])}
      />

      <section className="container-pad py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#3A7D5A]/10 px-4 py-1.5 text-xs font-body font-semibold uppercase tracking-widest text-[#3A7D5A]">
              <Leaf className="h-3.5 w-3.5" /> Coming Online
            </span>
            <h1 className="max-w-lg text-3xl font-heading font-bold leading-tight text-[#1C2321] md:text-5xl">
              Organic Fertilizer, <span className="text-[#3A7D5A]">Made On This Farm.</span>
            </h1>
            <p className="mt-4 max-w-lg font-body text-base leading-relaxed text-[#6B6259]">
              Our organic fertilizer is nutrient-rich compost processed from our own livestock
              manure — a soil amendment designed to rebuild long-term soil health. The line is{" "}
              {FERTILIZER_LINE_STATUS}, and we&apos;re opening a waitlist for farmers who want
              early access once it reaches commercial volume.
            </p>
            <Link
              href="/contact?topic=Product%20Order&product=Organic%20Fertilizer"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#3A7D5A] px-6 py-3.5 text-sm font-body font-semibold text-white transition-colors hover:bg-[#2f6b4a]"
            >
              Join the Waitlist <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative h-[420px] w-full overflow-hidden rounded-3xl">
            <Image
              src="/images/dairy/organic-manure.webp"
              alt="Organic fertilizer processing at Ingaju Farms"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
