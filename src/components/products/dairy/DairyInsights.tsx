import BlogSection from "@/components/sections/BlogSection";
import { getPublishedBlogPosts } from "@/lib/blog";

export default async function DairyInsights() {
  const posts = await getPublishedBlogPosts();
  return (
    <BlogSection
      posts={posts}
      heading="Livestock Insights from Ingaju Farms."
      subheading="Insights on livestock farming, milk quality, organic-input production, and the circular system behind everything we produce."
    />
  );
}