import DairyHero from "@/components/products/dairy/DairyHero";
import DairyShowcase from "@/components/products/dairy/DairyShowcase";
import DairyCircularModel from "@/components/products/dairy/DairyCircularModel";
import DairyCta from "@/components/products/dairy/DairyCta";
import DairyInsights from "@/components/products/dairy/DairyInsights";
import FadeIn from "@/components/animations/FadeIn";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";

export const metadata = {
  title: { absolute: "Fresh Milk & Breeding Cattle in Nyagatare | Ingaju Farms" },
  description: "Fresh, pasture-fed milk and disease-free breeding cattle from Ingaju Farms in Nyagatare, Rwanda, raised through a circular, climate-smart farming system.",
  alternates: { canonical: "https://ingajufarms.com/products/dairy" },
  openGraph: {
    url: "https://ingajufarms.com/products/dairy",
    title: "Fresh Milk & Breeding Cattle in Nyagatare | Ingaju Farms",
    description: "Pasture-fed milk and disease-free breeding cattle from Ingaju Farms, Eastern Province, Rwanda - part of a circular system closing the loop on synthetic inputs.",
    images: [{ url: "/images/dairy/dairy.webp", width: 1200, height: 630, alt: "Dairy cattle inside the Ingaju farm barn" }],
  },
};

export default function DairyPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F8F6F2]">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Livestock & Dairy", path: "/products/dairy" }])} />
      <DairyHero />
      <FadeIn direction="up" delay={0.05}><DairyShowcase /></FadeIn>
      <FadeIn direction="up" delay={0.05}><DairyCircularModel /></FadeIn>
      <FadeIn direction="up" delay={0.05}><DairyCta /></FadeIn>
      <FadeIn direction="up" delay={0.05}><DairyInsights /></FadeIn>
    </main>
  );
}
