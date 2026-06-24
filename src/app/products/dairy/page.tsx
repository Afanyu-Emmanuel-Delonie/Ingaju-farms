import DairyHero from "@/components/products/dairy/DairyHero";
import DairyFeatures from "@/components/products/dairy/DairyFeatures";
import DairyShowcase from "@/components/products/dairy/DairyShowcase";
import DairyCircularModel from "@/components/products/dairy/DairyCircularModel";
import DairyCta from "@/components/products/dairy/DairyCta";
import DairyInsights from "@/components/products/dairy/DairyInsights";
import FadeIn from "@/components/animations/FadeIn";

export const metadata = {
  title: "Dairy Products & Livestock | Ingaju Farms",
  description: "Sustainably Raised. Naturally Produced. Discover our organic dairy products and livestock.",
};

export default function DairyPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#FAF8F5]">
      <DairyHero />
      <FadeIn direction="up" delay={0.05}><DairyFeatures /></FadeIn>
      <FadeIn direction="up" delay={0.05}><DairyShowcase /></FadeIn>
      <FadeIn direction="up" delay={0.05}><DairyCircularModel /></FadeIn>
      <FadeIn direction="up" delay={0.05}><DairyCta /></FadeIn>
      <FadeIn direction="up" delay={0.05}><DairyInsights /></FadeIn>
    </main>
  );
}
