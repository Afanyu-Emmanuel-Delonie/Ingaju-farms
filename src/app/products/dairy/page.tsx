import DairyHero from "@/components/products/dairy/DairyHero";
import DairyShowcase from "@/components/products/dairy/DairyShowcase";
import DairyCircularModel from "@/components/products/dairy/DairyCircularModel";
import DairyCta from "@/components/products/dairy/DairyCta";
import DairyInsights from "@/components/products/dairy/DairyInsights";
import FadeIn from "@/components/animations/FadeIn";

export const metadata = {
  title: { absolute: "Livestock & Dairy Products Rwanda | Ingaju Farms" },
  description: "Buy fresh, pasture-fed milk, yogurt, cheese, and butter from Ingaju Farms, Eastern Province, Rwanda — raised through a circular farming system that's closing the loop on synthetic inputs.",
  alternates: { canonical: "https://ingajufarms.com/products/dairy" },
  openGraph: {
    url: "https://ingajufarms.com/products/dairy",
    title: "Livestock & Dairy Products Rwanda | Ingaju Farms",
    description: "Pasture-fed milk, yogurt, cheese, and butter from Ingaju Farms, Eastern Province, Rwanda — part of a circular system closing the loop on synthetic inputs.",
    images: [{ url: "/images/hero/bg-img.webp", width: 1200, height: 630, alt: "Ingaju Farms Livestock & Dairy Products" }],
  },
};

export default function DairyPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F8F6F2]">
      <DairyHero />
      <FadeIn direction="up" delay={0.05}><DairyShowcase /></FadeIn>
      <FadeIn direction="up" delay={0.05}><DairyCircularModel /></FadeIn>
      <FadeIn direction="up" delay={0.05}><DairyCta /></FadeIn>
      <FadeIn direction="up" delay={0.05}><DairyInsights /></FadeIn>
    </main>
  );
}
