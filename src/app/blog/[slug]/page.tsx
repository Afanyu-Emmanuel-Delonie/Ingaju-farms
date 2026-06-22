import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import { BLOG_POSTS } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | Ingaju Farms Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.image, alt: post.alt }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <main className="min-h-screen bg-[#FAF8F5]">

      {/* Hero */}
      <div className="relative h-[50vh] min-h-[360px] w-full overflow-hidden">
        <Image src={post.image} alt={post.alt} fill priority className="object-cover object-center" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="relative z-10 flex h-full flex-col justify-end container-pad pb-12">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-2 text-sm font-body text-white/70 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          <span className="mb-3 inline-block rounded-full bg-[#2E4F41] px-3 py-1 text-xs font-body font-semibold uppercase tracking-widest text-white w-fit">
            {post.category}
          </span>
          <h1 className="max-w-3xl text-3xl font-heading font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-5 text-sm font-body text-white/60">
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{post.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{post.readTime}</span>
          </div>
        </div>
      </div>

      {/* Article body */}
      <div className="container-pad py-16">
        <div className="mx-auto max-w-2xl">

          {/* Excerpt / lead */}
          <p className="mb-10 text-lg font-body leading-relaxed text-[#1C2321] border-l-4 border-[#2E4F41] pl-5">
            {post.excerpt}
          </p>

          {/* Content blocks */}
          <div className="space-y-6">
            {post.content.map((block, i) => {
              if (block.type === "heading") {
                return (
                  <h2 key={i} className="pt-4 text-2xl font-heading font-bold text-[#1C2321]">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "list") {
                return (
                  <ul key={i} className="space-y-3 pl-1">
                    {block.items!.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-[15px] font-body leading-relaxed text-[#6B6259]">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2E4F41]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="text-[15px] font-body leading-relaxed text-[#6B6259]">
                  {block.text}
                </p>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-14 rounded-2xl bg-[#2E4F41] p-8 text-white">
            <h3 className="text-xl font-heading font-bold">Want to Learn More?</h3>
            <p className="mt-2 text-sm font-body leading-relaxed text-white/75">
              Visit Ingaju Farms for hands-on training, farm tours, and practical learning experiences in sustainable agriculture.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/trainings"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-body font-semibold text-[#2E4F41] transition-colors hover:bg-[#F0EBE3]"
              >
                Explore Trainings <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/50 px-6 py-2.5 text-sm font-body font-medium text-white transition-colors hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mx-auto mt-20 max-w-2xl">
            <h2 className="mb-6 text-xl font-heading font-bold text-[#1C2321]">Related Articles</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={rel.image}
                      alt={rel.alt}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-body font-semibold uppercase tracking-widest text-[#2E4F41]">{rel.category}</span>
                    <h3 className="mt-1 text-sm font-heading font-bold leading-snug text-[#1C2321] group-hover:text-[#2E4F41] transition-colors">{rel.title}</h3>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs font-body text-[#6B6259]">{rel.date}</span>
                      <span className="inline-flex items-center gap-1 text-xs font-body font-medium text-[#2E4F41]">
                        Read <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
