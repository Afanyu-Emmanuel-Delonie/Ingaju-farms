import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/constants";

export default function BlogSection() {
  return (
    <section className="w-full bg-white">
      <div className="container-pad py-20">
        <div>
            <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#3A7D5A]">From the Farm</p>
            <h2 className="mt-2 text-3xl font-heading font-bold text-[#1C2321] sm:text-4xl">
              Insights From <span className="text-[#3A7D5A]">the Field.</span>
            </h2>
            <p className="mt-3 text-[15px] font-body leading-relaxed text-[#6B6259] max-w-xl">
              Practical knowledge on circular farming, dairy production, and sustainable agriculture — written by people who farm every day.
            </p>
          </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <a key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md">
              <div className="relative h-52 w-full overflow-hidden">
                <Image src={post.image} alt={post.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {/* Frosted category label */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-3 py-1 text-[10px] font-body font-semibold uppercase tracking-widest text-white">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="mt-1 text-base font-heading font-bold leading-snug text-[#1C2321] group-hover:text-[#3A7D5A] transition-colors">{post.title}</h3>
                <p className="mt-2 flex-1 text-sm font-body leading-relaxed text-[#6B6259]">{post.excerpt}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-body text-[#6B6259]">{post.date} · {post.readTime}</span>
                  <span className="inline-flex items-center gap-1 text-xs font-body font-semibold text-[#3A7D5A] border-b border-[#3A7D5A]/40 pb-0.5 group-hover:border-[#3A7D5A] transition-colors">Read More <ArrowRight className="h-3 w-3" /></span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
