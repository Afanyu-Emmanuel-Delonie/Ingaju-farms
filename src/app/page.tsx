import Hero from "@/components/sections/Hero";
import TrustedPartners from "@/components/sections/TrustedPartners";
import About from "@/components/sections/About";
import FeaturedCategories from "@/components/sections/FeaturedCategories";
import ImpactStats from "@/components/shared/ImpactStats";
import LearnWithIngaju from "@/components/sections/LearnWithIngaju";
import Testimonials from "@/components/sections/Testimonials";
import BlogSection from "@/components/sections/BlogSection";
import ReadyToExperienceCta from "@/components/sections/ReadyToExperienceCta";
import FaqSection from "@/components/sections/FaqSection";
import FadeIn from "@/components/animations/FadeIn";
import { getPublishedBlogPosts } from "@/lib/blog";
import { getPublishedTestimonials } from "@/lib/testimonials";

export default async function Home() {
  const [posts, testimonials] = await Promise.all([
    getPublishedBlogPosts(),
    getPublishedTestimonials(),
  ]);

  return (
    <main className="flex flex-col">
      <Hero />
      <FadeIn direction="none" duration={0.6}><TrustedPartners /></FadeIn>
      <FadeIn direction="up" delay={0.05}><About /></FadeIn>
      <FadeIn direction="up" delay={0.05}><FeaturedCategories /></FadeIn>
      <FadeIn direction="none" duration={1}><ImpactStats /></FadeIn>
      <FadeIn direction="up" delay={0.05}><LearnWithIngaju /></FadeIn>
      {testimonials.length > 0 && (
        <FadeIn direction="up" delay={0.05}><section id="testimonials"><Testimonials testimonials={testimonials} /></section></FadeIn>
      )}
      {posts.length > 0 && (
        <FadeIn direction="up" delay={0.05}><section id="blog"><BlogSection posts={posts} /></section></FadeIn>
      )}
      <FadeIn direction="up" delay={0.05}><ReadyToExperienceCta /></FadeIn>
      <FadeIn direction="up" delay={0.05}><FaqSection /></FadeIn>
    </main>
  );
}
