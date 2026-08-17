import CircularHero from "@/components/circular-system/CircularHero";
import CircularDiagram from "@/components/circular-system/CircularDiagram";
import CircularStages from "@/components/circular-system/CircularStages";
import CircularBenefits from "@/components/circular-system/CircularBenefits";
import CircularTrainings from "@/components/circular-system/CircularTrainings";
import CircularCta from "@/components/circular-system/CircularCta";
import FadeIn from "@/components/animations/FadeIn";

export const metadata = {
  title: "Circular Agriculture System | Closing the Loop — Ingaju Farms",
  description: "Discover how Ingaju Farms is closing the loop on a circular agriculture system in Eastern Province, Rwanda — cattle manure becomes organic fertilizer as that line scales up, crops feed the herd, and resources stay in use toward a zero-waste ambition.",
  alternates: { canonical: "https://ingajufarms.com/circular-system" },
  openGraph: {
    url: "https://ingajufarms.com/circular-system",
    title: "Circular Agriculture System | Closing the Loop — Ingaju Farms",
    description: "A farm in Eastern Province, Rwanda closing the loop, one stage at a time — resources recovered and reused, working toward a zero-waste ambition.",
    images: [{ url: "/images/hero/bg-img.webp", width: 1200, height: 630, alt: "Ingaju Farms Circular System" }],
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
