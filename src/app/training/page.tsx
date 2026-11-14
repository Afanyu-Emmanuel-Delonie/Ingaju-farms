import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TRAININGS, TRAINING_DATES_CONFIRMED } from "@/lib/constants";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: { absolute: "Farmer Training Programs in Nyagatare | Ingaju Farms" },
  description:
    "Hands-on training in livestock management, climate-smart crop production, and circular agriculture at Ingaju Farms in Nyagatare, Rwanda. Book a program today.",
  alternates: { canonical: "https://ingajufarms.com/training" },
  openGraph: {
    url: "https://ingajufarms.com/training",
    title: "Farmer Training Programs in Nyagatare | Ingaju Farms",
    description:
      "Hands-on, on-farm training programs in livestock management, climate-smart crop production, and circular agriculture at Ingaju Farms, Nyagatare, Rwanda.",
    images: [{ url: "/images/farm/trainings.webp", width: 1200, height: 630, alt: "Farmers attending a practical training session at Ingaju Farms" }],
  },
};

// Only emitted once real session dates exist - see TRAINING_DATES_CONFIRMED's
// TODO in src/lib/constants.ts. Shipping placeholder dates in Event schema
// would be invented data that Google could index as real.
const eventsJsonLd = TRAINING_DATES_CONFIRMED
  ? TRAININGS.map((t) => ({
      "@context": "https://schema.org",
      "@type": "Event",
      name: t.title,
      description: t.description,
      image: `https://ingajufarms.com${t.image}`,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: "Ingaju Farms",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Rebero Village",
          addressLocality: "Nyagatare",
          addressRegion: "Eastern Province",
          addressCountry: "RW",
        },
      },
      organizer: { "@type": "Organization", name: "Ingaju Farms", url: "https://ingajufarms.com" },
    }))
  : [];

export default function TrainingPage() {
  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Training", path: "/training" }])} />
      {eventsJsonLd.length > 0 && <JsonLd data={eventsJsonLd} />}

      {/* Header */}
      <section className="relative w-full h-[50vh] min-h-[380px] overflow-hidden bg-[#1C2321] flex items-end">
        <Image
          src="/images/farm/trainings.webp"
          alt=""
          aria-hidden
          fill
          priority
          className="object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 container-pad pb-12 w-full">
          <span className="mb-4 inline-block rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-xs font-body font-semibold uppercase tracking-widest text-white">
            Training & Education
          </span>
          <h1 className="max-w-3xl text-3xl font-heading font-bold leading-tight text-white md:text-5xl">
            Learn Circular Agriculture <br />
            <span className="text-[#6DBE8C]">On a Working Farm.</span>
          </h1>
          <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-white/75">
            Hands-on programs for smallholder farmers, cooperatives, students, and agribusiness professionals.
          </p>
        </div>
      </section>

      {/* Course list */}
      <section className="container-pad py-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {TRAININGS.map((t) => (
            <div key={t.key} className="flex flex-col overflow-hidden rounded-3xl bg-[#F8F6F2]">
              <div className="relative h-52 w-full overflow-hidden">
                <Image src={t.image} alt={t.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h2 className="font-heading text-xl font-bold text-[#1C2321] leading-snug">{t.title}</h2>
                <p className="mt-3 flex-1 text-sm font-body leading-relaxed text-[#6B6259]">{t.description}</p>
                <Link
                  href={t.ctaHref}
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#3A7D5A] px-5 py-2.5 text-sm font-body font-semibold text-white transition-colors hover:bg-[#2f6b4a]"
                >
                  {t.ctaLabel} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-[#1C2321]">
        <div className="container-pad py-16 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">Ready to book a training program?</h2>
            <p className="mt-2 max-w-lg text-sm font-body text-white/60">
              Tell us which program fits your group and we&apos;ll follow up with available dates.
            </p>
          </div>
          <Link
            href="/contact?topic=Training%20Program"
            className="inline-flex items-center gap-2 rounded-full bg-[#3A7D5A] px-6 py-3 text-sm font-body font-semibold text-white transition-colors hover:bg-[#2f6b4a] whitespace-nowrap"
          >
            Book a Training Program <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
