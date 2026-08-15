export default function StructuredData() {
  const organization = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "Farm"],
    "@id": "https://ingajufarms.com/#organization",
    name: "Ingaju Farms",
    url: "https://ingajufarms.com",
    logo: "https://ingajufarms.com/images/brand/Logo.png",
    image: "https://ingajufarms.com/images/hero/bg-img.png",
    description:
      "Ingaju Farms is an integrated agricultural enterprise based in Rebero Village, Nyagatare District, Eastern Province. We produce livestock, dairy, crops, and organic fertilizer through a circular farming system and train smallholder farmers across Rwanda.",
    telephone: "+250788304921",
    email: "support@ingajufarms.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rebero Village",
      addressLocality: "Nyagatare District",
      addressRegion: "Eastern Province",
      addressCountry: "RW",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -1.5,
      longitude: 30.5,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    sameAs: ["https://ingajufarms.com"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Ingaju Farms Products & Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Livestock & Dairy Products", url: "https://ingajufarms.com/products/dairy" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Climate-Smart Crop Production", url: "https://ingajufarms.com/products/crops" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Organic Fertilizer", url: "https://ingajufarms.com/products/crops" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Farmer Training Programs", url: "https://ingajufarms.com/contact" } },
      ],
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://ingajufarms.com/#website",
    url: "https://ingajufarms.com",
    name: "Ingaju Farms",
    publisher: { "@id": "https://ingajufarms.com/#organization" },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: "https://ingajufarms.com/blog?q={search_term_string}" },
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://ingajufarms.com" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://ingajufarms.com/about" },
      { "@type": "ListItem", position: 3, name: "Circular System", item: "https://ingajufarms.com/circular-system" },
      { "@type": "ListItem", position: 4, name: "Livestock & Dairy", item: "https://ingajufarms.com/products/dairy" },
      { "@type": "ListItem", position: 5, name: "Crop Products", item: "https://ingajufarms.com/products/crops" },
      { "@type": "ListItem", position: 6, name: "Blog", item: "https://ingajufarms.com/blog" },
      { "@type": "ListItem", position: 7, name: "Contact", item: "https://ingajufarms.com/contact" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
