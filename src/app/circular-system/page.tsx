import CircularHero from "@/components/circular-system/CircularHero";
import CircularDiagram from "@/components/circular-system/CircularDiagram";
import CircularStages from "@/components/circular-system/CircularStages";
import CircularBenefits from "@/components/circular-system/CircularBenefits";
import CircularTrainings from "@/components/circular-system/CircularTrainings";
import CircularCta from "@/components/circular-system/CircularCta";
import ImpactStats from "@/components/shared/ImpactStats";
import FadeIn from "@/components/animations/FadeIn";

export const metadata = {
  title: "The Circular System | Ingaju Farms",
  description: "Discover how Ingaju Farms uses a zero-waste circular agriculture model — where every output becomes an input.",
};

export default function CircularSystemPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F8F6F2]">
      <CircularHero />
      <FadeIn direction="up" delay={0.05}><CircularDiagram /></FadeIn>
      <FadeIn direction="up" delay={0.05}><CircularStages /></FadeIn>
      <FadeIn direction="none" duration={1}><ImpactStats /></FadeIn>
      <FadeIn direction="up" delay={0.05}><CircularBenefits /></FadeIn>
      <FadeIn direction="up" delay={0.05}><CircularTrainings /></FadeIn>
      <FadeIn direction="up" delay={0.05}><CircularCta /></FadeIn>
    </main>
  );
}
