import CropsHero from "@/components/products/crops/CropsHero";
import CropsShowcase from "@/components/products/crops/CropsShowcase";
import CropsCircularModel from "@/components/products/crops/CropsCircularModel";
import CropsWhyChooseUs from "@/components/products/crops/CropsWhyChooseUs";
import CropsCta from "@/components/products/crops/CropsCta";
import CropsInsights from "@/components/products/crops/CropsInsights";
import FadeIn from "@/components/animations/FadeIn";

export const metadata = {
  title: "Organic Crop Production Rwanda | Chemical-Free Corn, Beans & Macadamia",
  description: "Naturally grown corn, beans, soybeans, macadamia, and mangoes cultivated using organic fertilizer from our circular farming system. Zero synthetic inputs. Healthy soil. Better harvests.",
  keywords: ["organic crop production Rwanda", "chemical-free farming Rwanda", "sustainable crops Africa", "organic fertilizer crop production", "regenerative agriculture crops", "circular farming crop yield"],
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
