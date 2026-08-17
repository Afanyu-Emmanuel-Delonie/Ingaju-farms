import BlogSection from "@/components/sections/BlogSection";
import { getPublishedBlogPosts } from "@/lib/blog";

export default async function CropsInsights() {
  const posts = await getPublishedBlogPosts();
  return (
    <BlogSection
      posts={posts}
      heading="Crop Farming Insights."
      subheading="Practical knowledge on organic crop production, soil health, nutrient recycling, and sustainable harvests from the field."
    />
  );
}
