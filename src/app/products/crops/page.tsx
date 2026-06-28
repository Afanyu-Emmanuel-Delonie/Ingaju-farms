import CropsHero from "@/components/products/crops/CropsHero";
import CropsShowcase from "@/components/products/crops/CropsShowcase";
import CropsCircularModel from "@/components/products/crops/CropsCircularModel";
import CropsWhyChooseUs from "@/components/products/crops/CropsWhyChooseUs";
import CropsCta from "@/components/products/crops/CropsCta";
import CropsInsights from "@/components/products/crops/CropsInsights";
import FadeIn from "@/components/animations/FadeIn";

export const metadata = {
  title: "Top Crops & Produce | Ingaju Farms",
  description: "Naturally Grown. Sustainably Produced. Explore our top crops grown with circular farming.",
};

export default function CropsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F8F6F2]">
      <CropsHero />
      <FadeIn direction="up" delay={0.05}><CropsShowcase /></FadeIn>
      <FadeIn direction="up" delay={0.05}><CropsCircularModel /></FadeIn>
      <FadeIn direction="up" delay={0.05}><CropsWhyChooseUs /></FadeIn>
      <FadeIn direction="up" delay={0.05}><CropsCta /></FadeIn>
      <FadeIn direction="up" delay={0.05}><CropsInsights /></FadeIn>
    </main>
  );
}
