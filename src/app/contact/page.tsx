import ContactPage from "@/components/contact/ContactPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Ingaju Farms",
  description: "Get in touch with Ingaju Farms — for product orders, training programs, farm tours, or partnership inquiries.",
};

export default function Contact() {
  return <ContactPage />;
}
