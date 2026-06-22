import Hero from "@/components/sections/Hero";
import TrustedPartners from "@/components/sections/TrustedPartners";
import DairySpotlight from "@/components/sections/DairySpotlight";
import About from "@/components/sections/About";
import FeaturedCategories from "@/components/sections/FeaturedCategories";
import ImpactStats from "@/components/sections/ImpactStats";
import LearnWithIngaju from "@/components/sections/LearnWithIngaju";
import ExperienceCircularFarming from "@/components/sections/ExperienceCircularFarming";
import Testimonials from "@/components/sections/Testimonials";
import BlogSection from "@/components/sections/BlogSection";
import ReadyToExperienceCta from "@/components/sections/ReadyToExperienceCta";
import FaqSection from "@/components/sections/FaqSection";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <TrustedPartners />
      <About />
      <FeaturedCategories />
      <ImpactStats />
      <LearnWithIngaju />
      <ExperienceCircularFarming />
      <Testimonials />
      <BlogSection />
      <ReadyToExperienceCta />
      <FaqSection />
    </main>
  );
}
