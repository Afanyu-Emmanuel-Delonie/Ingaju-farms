import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import MissionVision from "@/components/about/MissionVision";
import ImpactStats from "@/components/shared/ImpactStats";
import CoreValues from "@/components/about/CoreValues";
import OnTheFarm from "@/components/about/OnTheFarm";
import JoinUsCta from "@/components/about/JoinUsCta";

export const metadata = {
  title: "About Ingaju Farms | Circular Agriculture Enterprise, Rwanda",
  description:
    "Ingaju Farms is an integrated agricultural enterprise based in Rebero Village, Nyagatare District, Eastern Province. Learn about our work in livestock, dairy, crops, organic fertilizer, and farmer training.",
  alternates: { canonical: "https://ingajufarms.com/about" },
  openGraph: {
    url: "https://ingajufarms.com/about",
    title: "About Ingaju Farms | Circular Agriculture Enterprise, Rwanda",
    description:
      "Ingaju Farms is an integrated farm in Rebero Village, Nyagatare District, Eastern Province. We produce livestock, dairy, crops, and organic fertilizer and train farmers in circular agriculture.",
    images: [
      {
        url: "/images/hero/bg-img.png",
        width: 1200,
        height: 630,
        alt: "Ingaju Farms - About Us",
      },
    ],
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
