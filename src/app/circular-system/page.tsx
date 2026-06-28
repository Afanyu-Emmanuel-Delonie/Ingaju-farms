import CircularHero from "@/components/circular-system/CircularHero";
import CircularDiagram from "@/components/circular-system/CircularDiagram";
import CircularStages from "@/components/circular-system/CircularStages";
import CircularBenefits from "@/components/circular-system/CircularBenefits";
import CircularTrainings from "@/components/circular-system/CircularTrainings";
import CircularCta from "@/components/circular-system/CircularCta";
import ImpactStats from "@/components/shared/ImpactStats";

export const metadata = {
  title: "The Circular System | Ingaju Farms",
  description: "Discover how Ingaju Farms uses a zero-waste circular agriculture model — where every output becomes an input.",
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
