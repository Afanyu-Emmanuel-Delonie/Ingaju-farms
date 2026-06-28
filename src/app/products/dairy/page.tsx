import DairyHero from "@/components/products/dairy/DairyHero";
import DairyFeatures from "@/components/products/dairy/DairyFeatures";
import DairyShowcase from "@/components/products/dairy/DairyShowcase";
import DairyCircularModel from "@/components/products/dairy/DairyCircularModel";
import DairyCta from "@/components/products/dairy/DairyCta";
import DairyInsights from "@/components/products/dairy/DairyInsights";
import FadeIn from "@/components/animations/FadeIn";

export const metadata = {
  title: "Organic Dairy Products Rwanda | Pasture-Fed Milk, Yogurt & Cheese",
  description: "Fresh organic milk, yogurt, cheese, and butter from pasture-fed, hormone-free cattle at Ingaju Farms. Sustainably raised through a closed-loop integrated dairy farming system in Rwanda.",
  keywords: ["organic dairy products Rwanda", "pasture-fed milk Rwanda", "sustainable dairy farm Africa", "buy organic milk Rwanda", "value-added dairy products Rwanda", "integrated dairy farming Rwanda"],
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
