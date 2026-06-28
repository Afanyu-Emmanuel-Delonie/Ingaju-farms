import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import MissionVision from "@/components/about/MissionVision";
import ImpactStats from "@/components/shared/ImpactStats";
import CoreValues from "@/components/about/CoreValues";
import JoinUsCta from "@/components/about/JoinUsCta";

export const metadata = {
  title: "About Ingaju Farms | Sustainable Integrated Dairy Farm Rwanda",
  description: "Learn about Ingaju Farms — Rwanda's pioneering circular agriculture enterprise. Our mission is to produce high-quality organic dairy and crops through a closed-loop, zero-waste integrated farming system.",
  keywords: ["about Ingaju Farms", "sustainable integrated farm Africa", "circular dairy farm Rwanda", "organic farming mission Rwanda", "regenerative agriculture enterprise"],
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
