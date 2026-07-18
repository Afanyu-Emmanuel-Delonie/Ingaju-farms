"use client";

import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/constants";
import { useState } from "react";

const VISIBLE = 3;

interface Props {
  heading?: string;
  subheading?: string;
}

export default function BlogSection({
  heading = "Insights From the Field.",
  subheading = "Practical knowledge on circular farming, dairy production, and sustainable agriculture  written by people who farm every day.",
}: Props) {
  const [start, setStart] = useState(0);
  const total = BLOG_POSTS.length;

  const prev = () => setStart((s) => (s - 1 + total) % total);
  const next = () => setStart((s) => (s + 1) % total);

  const visible = Array.from({ length: VISIBLE }, (_, i) => BLOG_POSTS[(start + i) % total]);

  return (
    <section className="w-full bg-white">
      <div className="container-pad py-20">

        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#3A7D5A]">From the Farm</p>
            <h2 className="mt-2 text-3xl font-heading font-bold text-[#1C2321] sm:text-4xl">
              {heading}
            </h2>
            <p className="mt-3 text-[15px] font-body leading-relaxed text-[#6B6259] max-w-xl">
              {subheading}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              aria-label="Previous posts"
              className="flex items-center justify-center w-9 h-9 rounded-full border border-[#1C2321]/15 text-[#1C2321] hover:bg-[#3A7D5A] hover:border-[#3A7D5A] hover:text-white transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs font-body text-[#6B6259] tabular-nums">
              {start + 1} – {((start + VISIBLE - 1) % total) + 1} of {total}
            </span>
            <button
              onClick={next}
              aria-label="Next posts"
              className="flex items-center justify-center w-9 h-9 rounded-full border border-[#1C2321]/15 text-[#1C2321] hover:bg-[#3A7D5A] hover:border-[#3A7D5A] hover:text-white transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((post) => (
            <a key={`${post.slug}-${start}`} href={`/blog/${post.slug}`} className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md">
              <div className="relative h-52 w-full overflow-hidden">
                <Image src={post.image} alt={post.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
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
