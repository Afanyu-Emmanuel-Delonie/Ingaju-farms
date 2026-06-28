import CircularHero from "@/components/circular-system/CircularHero";
import CircularDiagram from "@/components/circular-system/CircularDiagram";
import CircularStages from "@/components/circular-system/CircularStages";
import CircularBenefits from "@/components/circular-system/CircularBenefits";
import CircularTrainings from "@/components/circular-system/CircularTrainings";
import CircularCta from "@/components/circular-system/CircularCta";
import ImpactStats from "@/components/shared/ImpactStats";

export const metadata = {
  title: "Circular Economy in Agriculture | 8-Stage Closed-Loop Farming System",
  description: "Discover how Ingaju Farms uses an 8-stage closed-loop circular economy system — from feed production and dairy to biogas energy recovery, water reuse, and nutrient recycling. Zero waste. Full circle.",
  keywords: ["circular economy in agriculture", "closed-loop farming system", "farm waste utilization system", "biogas energy recovery farm", "agricultural water reuse", "organic nutrient recycling soil", "integrated dairy farming Rwanda"],
};

export default function CircularSystemPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <CircularHero />
      <CircularDiagram />
      <CircularStages />
      <ImpactStats />
      <CircularBenefits />
      <CircularTrainings />
      <CircularCta />
    </main>
  );
}
