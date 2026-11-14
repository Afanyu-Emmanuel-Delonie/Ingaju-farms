import ContactPage from "@/components/contact/ContactPage";
import { Metadata } from "next";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: { absolute: "Contact & Farm Tours, Nyagatare | Ingaju Farms" },
  description: "Contact Ingaju Farms in Nyagatare, Rwanda for product orders, farm tours, training programs, or partnerships. Call +250 788 304 921 or email us today.",
  alternates: { canonical: "https://ingajufarms.com/contact" },
  openGraph: {
    url: "https://ingajufarms.com/contact",
    title: "Contact & Farm Tours, Nyagatare | Ingaju Farms",
    description: "Reach Ingaju Farms for orders, tours, training, or partnerships. Located in Rebero Village, Nyagatare District, Eastern Province, Rwanda.",
    images: [{ url: "/images/about/about-3.webp", width: 1200, height: 630, alt: "Contact Ingaju Farms" }],
  },
};

export default function Contact() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <ContactPage />
    </>
  );
}
