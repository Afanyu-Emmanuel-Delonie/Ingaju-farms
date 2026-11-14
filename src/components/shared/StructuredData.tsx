import JsonLd from "@/components/JsonLd";
import { SOCIAL_LINKS } from "@/lib/constants";

export default function StructuredData() {
  const organization = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "Farm"],
    "@id": "https://ingajufarms.com/#org",
    name: "Ingaju Farms",
    url: "https://ingajufarms.com",
    logo: "https://ingajufarms.com/images/brand/Logo.webp",
    image: "https://ingajufarms.com/images/hero/bg-img.webp",
    description:
      "Ingaju Farms is an integrated agricultural enterprise based in Rebero Village, Nyagatare District, Eastern Province. We produce livestock, dairy, crops, and organic fertilizer through a circular farming system and train smallholder farmers across Rwanda.",
    telephone: "+250788304921",
    email: "support@ingajufarms.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rebero Village",
      addressLocality: "Nyagatare",
      addressRegion: "Eastern Province",
      addressCountry: "RW",
    },
    // NOTE: no `geo` field - the previous build shipped invented GPS
    // coordinates (-1.5, 30.5), which Google's Rich Results Test would treat
    // as real data. Don't add one back without a verified reading.
    // TODO(owner): provide verified GPS coordinates for the farm, then add
    // `geo: { "@type": "GeoCoordinates", latitude, longitude }` here.
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    areaServed: "Rwanda",
    // Populated from the single SOCIAL_LINKS config (src/lib/constants.ts) so
    // the footer and this schema can never drift apart. Empty until the
    // owner confirms real profile URLs - see TODO there.
    sameAs: SOCIAL_LINKS.map((link) => link.href),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Ingaju Farms Products & Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Livestock & Dairy Products", url: "https://ingajufarms.com/products/dairy" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Climate-Smart Crop Production", url: "https://ingajufarms.com/products/crops" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Organic Fertilizer", url: "https://ingajufarms.com/products/organic-fertilizer" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Farmer Training Programs", url: "https://ingajufarms.com/training" } },
      ],
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://ingajufarms.com/#website",
    url: "https://ingajufarms.com",
    name: "Ingaju Farms",
    publisher: { "@id": "https://ingajufarms.com/#org" },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: "https://ingajufarms.com/blog?q={search_term_string}" },
      "query-input": "required name=search_term_string",
    },
  };

  return <JsonLd data={[organization, website]} />;
}
