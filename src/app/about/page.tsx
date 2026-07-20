import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import MissionVision from "@/components/about/MissionVision";
import ImpactStats from "@/components/shared/ImpactStats";
import CoreValues from "@/components/about/CoreValues";
import JoinUsCta from "@/components/about/JoinUsCta";

export const metadata = {
  title: "About Ingaju Farms | Circular Agriculture Enterprise — Eastern Province, Rwanda",
  description: "Ingaju Farms is Rwanda's pioneering circular agriculture enterprise based in Rubero Village, Eastern Province. Learn about our mission to produce organic dairy and crops through a closed-loop, zero-waste integrated farming system that has trained 300+ smallholder farmers.",
  keywords: ["about Ingaju Farms", "circular agriculture enterprise Rwanda", "sustainable integrated farm Eastern Province", "organic farming mission Rwanda", "regenerative agriculture Rwanda", "Rubero Village farm Rwanda"],
  alternates: { canonical: "https://ingajufarms.com/about" },
  openGraph: {
    url: "https://ingajufarms.com/about",
    title: "About Ingaju Farms | Circular Agriculture Enterprise — Eastern Province, Rwanda",
    description: "Rwanda's pioneering circular agriculture enterprise in Rubero Village, Eastern Province. 300+ farmers trained. Zero synthetic inputs.",
    images: [{ url: "/images/hero/bg-img.png", width: 1200, height: 630, alt: "Ingaju Farms — About Us" }],
  },
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
