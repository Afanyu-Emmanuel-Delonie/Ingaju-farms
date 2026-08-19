import CropsHero from "@/components/products/crops/CropsHero";
import CropsShowcase from "@/components/products/crops/CropsShowcase";
import CropsCircularModel from "@/components/products/crops/CropsCircularModel";
import CropsWhyChooseUs from "@/components/products/crops/CropsWhyChooseUs";
import CropsCta from "@/components/products/crops/CropsCta";
import CropsInsights from "@/components/products/crops/CropsInsights";
import FadeIn from "@/components/animations/FadeIn";

export const metadata = {
  title: { absolute: "Livestock-Fed Crop Production Rwanda | Ingaju Farms" },
  description: "Low-chemical maize, beans, soybeans, macadamia, and mangoes from Ingaju Farms, Eastern Province, Rwanda. Grown using on-farm organic fertilizer and climate-smart, organic-input practices.",
  alternates: { canonical: "https://ingajufarms.com/products/crops" },
  openGraph: {
    url: "https://ingajufarms.com/products/crops",
    title: "Livestock-Fed Crop Production Rwanda | Ingaju Farms",
    description: "Low-chemical inputs, climate-smart soil practices. Maize, beans, macadamia, and more from Ingaju Farms, Eastern Province, Rwanda.",
    images: [{ url: "/images/crops/crop-production.webp", width: 1200, height: 630, alt: "Ingaju Farms Crop Production" }],
  },
};

export default function CropsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <CropsHero />
      <FadeIn direction="up" delay={0.05}><CropsShowcase /></FadeIn>
      <FadeIn direction="up" delay={0.05}><CropsCircularModel /></FadeIn>
      <FadeIn direction="up" delay={0.05}><CropsWhyChooseUs /></FadeIn>
      <FadeIn direction="up" delay={0.05}><CropsCta /></FadeIn>
      <FadeIn direction="up" delay={0.05}><CropsInsights /></FadeIn>
    </main>
  );
}
