import DairyHero from "@/components/products/dairy/DairyHero";
import DairyShowcase from "@/components/products/dairy/DairyShowcase";
import DairyCircularModel from "@/components/products/dairy/DairyCircularModel";
import DairyCta from "@/components/products/dairy/DairyCta";
import DairyInsights from "@/components/products/dairy/DairyInsights";
import FadeIn from "@/components/animations/FadeIn";

export const metadata = {
  title: "Organic Dairy Products Rwanda | Pasture-Fed Milk, Yogurt & Cheese — Ingaju Farms",
  description: "Buy fresh organic milk, yogurt, cheese, and butter from pasture-fed, hormone-free cattle at Ingaju Farms, Eastern Province, Rwanda. Raised through a closed-loop circular farming system with zero synthetic inputs.",
  keywords: ["organic dairy products Rwanda", "pasture-fed milk Rwanda", "buy organic milk Eastern Province Rwanda", "hormone-free dairy Rwanda", "sustainable dairy farm Africa", "organic yogurt Rwanda", "circular dairy farming Rwanda"],
  alternates: { canonical: "https://ingajufarms.com/products/dairy" },
  openGraph: {
    url: "https://ingajufarms.com/products/dairy",
    title: "Organic Dairy Products Rwanda | Pasture-Fed Milk, Yogurt & Cheese — Ingaju Farms",
    description: "Hormone-free, pasture-fed organic dairy from Ingaju Farms, Eastern Province, Rwanda. Milk, yogurt, cheese, and butter from a closed-loop circular system.",
    images: [{ url: "/images/hero/bg-img.png", width: 1200, height: 630, alt: "Ingaju Farms Organic Dairy Products" }],
  },
};

export default function DairyPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F8F6F2]">
      <DairyHero />
      <FadeIn direction="up" delay={0.05}><DairyFeatures /></FadeIn>
      <FadeIn direction="up" delay={0.05}><DairyShowcase /></FadeIn>
      <FadeIn direction="up" delay={0.05}><DairyCircularModel /></FadeIn>
      <FadeIn direction="up" delay={0.05}><DairyCta /></FadeIn>
      <FadeIn direction="up" delay={0.05}><DairyInsights /></FadeIn>
    </main>
  );
}
