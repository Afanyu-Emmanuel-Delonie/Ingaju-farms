import CircularHero from "@/components/circular-system/CircularHero";
import CircularLoopDiagram from "@/components/circular-system/CircularLoopDiagram";
import CircularStages from "@/components/circular-system/CircularStages";
import CircularBenefits from "@/components/circular-system/CircularBenefits";
import CircularTrainings from "@/components/circular-system/CircularTrainings";
import CircularCta from "@/components/circular-system/CircularCta";
import FadeIn from "@/components/animations/FadeIn";
import JsonLd, { breadcrumbJsonLd } from "@/components/JsonLd";

export const metadata = {
  title: { absolute: "Circular Agriculture System in Rwanda | Ingaju Farms" },
  description: "See how Ingaju Farms closes the loop in Nyagatare District, Rwanda: cattle manure becomes organic fertilizer as that line scales up, and crops feed the herd.",
  alternates: { canonical: "https://ingajufarms.com/circular-system" },
  openGraph: {
    url: "https://ingajufarms.com/circular-system",
    title: "Circular Agriculture System in Rwanda | Ingaju Farms",
    description: "A farm in Eastern Province, Rwanda closing the loop, one stage at a time - resources recovered and reused, working toward a zero-waste ambition.",
    images: [{ url: "/images/circular-system.webp", width: 1200, height: 630, alt: "Ingaju Farms Circular System" }],
  },
};

export default function CircularSystemPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Circular System", path: "/circular-system" }])} />
      <CircularHero />
      <FadeIn direction="up" delay={0.05}><CircularLoopDiagram /></FadeIn>
      <FadeIn direction="up" delay={0.05}><CircularStages /></FadeIn>
      <FadeIn direction="up" delay={0.05}><CircularBenefits /></FadeIn>
      <FadeIn direction="up" delay={0.05}><CircularTrainings /></FadeIn>
      <FadeIn direction="up" delay={0.05}><CircularCta /></FadeIn>
    </main>
  );
}
