import CropsHero from "@/components/products/crops/CropsHero";
import CropsShowcase from "@/components/products/crops/CropsShowcase";
import CropsCircularModel from "@/components/products/crops/CropsCircularModel";
import CropsWhyChooseUs from "@/components/products/crops/CropsWhyChooseUs";
import CropsCta from "@/components/products/crops/CropsCta";
import CropsInsights from "@/components/products/crops/CropsInsights";
import FadeIn from "@/components/animations/FadeIn";

export const metadata = {
  title: "Organic Crop Production Rwanda | Chemical-Free Maize, Beans & Macadamia — Ingaju Farms",
  description: "Naturally grown maize, beans, soybeans, macadamia, and mangoes from Ingaju Farms, Eastern Province, Rwanda. Cultivated using on-farm organic fertilizer with zero synthetic pesticides or chemicals.",
  keywords: ["organic crop production Rwanda", "chemical-free farming Eastern Province Rwanda", "organic maize Rwanda", "macadamia farming Rwanda", "sustainable crops Africa", "organic fertilizer crop production Rwanda", "circular farming crop yield Rwanda"],
  alternates: { canonical: "https://ingajufarms.com/products/crops" },
  openGraph: {
    url: "https://ingajufarms.com/products/crops",
    title: "Organic Crop Production Rwanda | Chemical-Free Maize, Beans & Macadamia — Ingaju Farms",
    description: "Zero synthetic inputs. Organically enriched soil. Maize, beans, macadamia, and more from Ingaju Farms, Eastern Province, Rwanda.",
    images: [{ url: "/images/crops/crop-production.png", width: 1200, height: 630, alt: "Ingaju Farms Organic Crop Production" }],
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
