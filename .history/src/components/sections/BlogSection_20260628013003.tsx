import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/constants";

export default function BlogSection() {
  return (
    <section className="w-full bg-white">
      <div className="container-pad py-20">
        <div>
            <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#3A7D5A]">Our Blog</p>
            <h2 className="mt-2 text-3xl font-heading font-bold text-[#1C2321] sm:text-4xl">
              Insights from the <span className="text-[#3A7D5A]">Farm</span>
            </h2>
          </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <a key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md">
              <div className="relative h-52 w-full overflow-hidden">
                <Image src={post.image} alt={post.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="text-xs font-body font-semibold uppercase tracking-widest text-[#3A7D5A]">{post.category}</span>
                <h3 className="mt-2 text-base font-heading font-bold leading-snug text-[#1C2321] group-hover:text-[#3A7D5A] transition-colors">{post.title}</h3>
                <p className="mt-2 flex-1 text-sm font-body leading-relaxed text-[#6B6259]">{post.excerpt}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-body text-[#6B6259]">{post.date}</span>
                  <span className="inline-flex items-center gap-1 text-xs font-body font-medium text-[#1C2321] group-hover:text-[#3A7D5A] transition-colors">Read More <ArrowRight className="h-3 w-3" /></span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
