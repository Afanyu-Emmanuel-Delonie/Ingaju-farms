import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Blog | Ingaju Farms",
  description: "Insights on circular agriculture, dairy farming, organic crop production, and sustainable food systems from the team at Ingaju Farms.",
};

export default function BlogPage() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <main className="min-h-screen bg-[#FAF8F5] pt-32 pb-20">
      <div className="container-pad">

        <div className="mb-14">
          <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#3A7D5A]">Ingaju Blog</p>
          <h1 className="mt-3 text-4xl font-heading font-bold text-[#1C2321] sm:text-5xl">
            Insights from the <span className="text-[#3A7D5A]">Farm</span>
          </h1>
          <p className="mt-4 max-w-xl text-[15px] font-body leading-relaxed text-[#6B6259]">
            Practical knowledge on sustainable farming, dairy management, circular agriculture, and building resilient food systems.
          </p>
        </div>

        {/* Featured post */}
        <Link
          href={`/blog/${featured.slug}`}
          className="group relative mb-10 flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md lg:flex-row"
        >
          <div className="relative h-64 w-full shrink-0 overflow-hidden lg:h-auto lg:w-2/5">
            <Image
              src={featured.image}
              alt={featured.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center p-8 lg:p-12">
            <span className="inline-block rounded-full bg-[#3A7D5A]/10 px-3 py-1 text-xs font-body font-semibold uppercase tracking-widest text-[#3A7D5A]">
              {featured.category}
            </span>
            <h2 className="mt-4 text-2xl font-heading font-bold leading-snug text-[#1C2321] group-hover:text-[#3A7D5A] transition-colors sm:text-3xl">
              {featured.title}
            </h2>
            <p className="mt-3 text-[15px] font-body leading-relaxed text-[#6B6259]">{featured.excerpt}</p>
            <div className="mt-6 flex items-center gap-4">
              <span className="text-sm font-body text-[#6B6259]">{featured.date}</span>
              <span className="text-sm font-body text-[#A89F94]">·</span>
              <span className="text-sm font-body text-[#6B6259]">{featured.readTime}</span>
            </div>
            <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#3A7D5A] px-6 py-2.5 text-sm font-body font-medium text-white transition-colors group-hover:bg-[#2f6b4a]">
              Read Article <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </Link>

        {/* Remaining posts */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="text-xs font-body font-semibold uppercase tracking-widest text-[#3A7D5A]">{post.category}</span>
                <h3 className="mt-2 text-base font-heading font-bold leading-snug text-[#1C2321] group-hover:text-[#3A7D5A] transition-colors">{post.title}</h3>
                <p className="mt-2 flex-1 text-sm font-body leading-relaxed text-[#6B6259]">{post.excerpt}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-body text-[#6B6259]">{post.date} · {post.readTime}</span>
                  <span className="inline-flex items-center gap-1 text-xs font-body font-medium text-[#1C2321] group-hover:text-[#3A7D5A] transition-colors">
                    Read More <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
