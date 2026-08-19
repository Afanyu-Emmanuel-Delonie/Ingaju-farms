import ContactPage from "@/components/contact/ContactPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Contact Ingaju Farms | Rebero Village, Nyagatare District, Eastern Province, Rwanda" },
  description: "Contact Ingaju Farms in Rebero Village, Nyagatare District, Eastern Province, Rwanda. Reach us for product orders, farm tours, training programs, or partnership inquiries. Call +250 788 304 921 or email support@ingajufarms.com.",
  alternates: { canonical: "https://ingajufarms.com/contact" },
  openGraph: {
    url: "https://ingajufarms.com/contact",
    title: "Contact Ingaju Farms | Rebero Village, Nyagatare District, Eastern Province, Rwanda",
    description: "Reach Ingaju Farms for orders, tours, training, or partnerships. Located in Rebero Village, Nyagatare District, Eastern Province, Rwanda.",
    images: [{ url: "/images/hero/bg-img.webp", width: 1200, height: 630, alt: "Contact Ingaju Farms" }],
  },
};

export default function Contact() {
  return <ContactPage />;
}
