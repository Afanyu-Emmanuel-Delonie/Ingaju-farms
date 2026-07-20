import CircularHero from "@/components/circular-system/CircularHero";
import CircularDiagram from "@/components/circular-system/CircularDiagram";
import CircularStages from "@/components/circular-system/CircularStages";
import CircularBenefits from "@/components/circular-system/CircularBenefits";
import CircularTrainings from "@/components/circular-system/CircularTrainings";
import CircularCta from "@/components/circular-system/CircularCta";
import FadeIn from "@/components/animations/FadeIn";

export const metadata = {
  title: "Circular Agriculture System | Closed-Loop Farming — Ingaju Farms Rwanda",
  description: "Discover how Ingaju Farms operates a closed-loop circular agriculture system in Eastern Province, Rwanda — where cattle manure becomes organic fertilizer, crops feed the herd, and nothing leaves the loop. Zero waste. Full circle.",
  keywords: ["circular agriculture system Rwanda", "closed-loop farming Rwanda", "circular economy agriculture Africa", "zero waste farming Eastern Province", "organic fertilizer from manure Rwanda", "integrated dairy farming Rwanda", "circular farming model Africa"],
  alternates: { canonical: "https://ingajufarms.com/circular-system" },
  openGraph: {
    url: "https://ingajufarms.com/circular-system",
    title: "Circular Agriculture System | Closed-Loop Farming — Ingaju Farms Rwanda",
    description: "A closed-loop farm in Eastern Province, Rwanda where every resource is recovered and reused. Zero synthetic inputs. Zero waste.",
    images: [{ url: "/images/hero/bg-img.png", width: 1200, height: 630, alt: "Ingaju Farms Circular System" }],
  },
};

export default function CircularSystemPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <CircularHero />
      <FadeIn direction="up" delay={0.05}><CircularDiagram /></FadeIn>
      <FadeIn direction="up" delay={0.05}><CircularStages /></FadeIn>
      <FadeIn direction="up" delay={0.05}><CircularBenefits /></FadeIn>
      <FadeIn direction="up" delay={0.05}><CircularTrainings /></FadeIn>
      <FadeIn direction="up" delay={0.05}><CircularCta /></FadeIn>
    </main>
  );
}
