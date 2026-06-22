import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import MissionVision from "@/components/about/MissionVision";
import ImpactStats from "@/components/shared/ImpactStats";
import CoreValues from "@/components/about/CoreValues";
import JoinUsCta from "@/components/about/JoinUsCta";

export const metadata = {
  title: "About Us | Ingaju Farms",
  description: "Learn more about Ingaju Farms' story, mission, vision, and core values.",
};

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col w-full">
      <AboutHero />
      <OurStory />
      <MissionVision />
      <ImpactStats />
      <CoreValues />
      <JoinUsCta />
    </main>
  );
}
