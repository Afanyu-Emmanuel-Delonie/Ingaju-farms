"use client";

import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { BlogPost } from "@/lib/blog";

const VISIBLE = 3;

interface Props {
  posts: BlogPost[];
  heading?: string;
  subheading?: string;
}

export default function BlogSection({
  posts,
  heading = "Insights From the Field.",
  subheading = "Practical knowledge on circular farming, livestock and dairy production, and sustainable agriculture written by people who farm every day.",
}: Props) {
  const [start, setStart] = useState(0);
  const total = posts.length;

  if (total === 0) return null;

  // Paginates in fixed VISIBLE-sized pages (no wraparound) so the "X – Y of
  // Z" label is always a real, non-decreasing range instead of wrapping back
  // past the end (e.g. the old "3 – 1 of 4").
  const prev = () => setStart((s) => Math.max(0, s - VISIBLE));
  const next = () => setStart((s) => (s + VISIBLE < total ? s + VISIBLE : s));

  const visible = posts.slice(start, start + VISIBLE);
  const rangeEnd = Math.min(start + VISIBLE, total);

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

          <div className="flex items-center gap-4">
            {total > VISIBLE && (
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  disabled={start === 0}
                  aria-label="Previous posts"
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-[#1C2321]/15 text-[#1C2321] hover:bg-[#3A7D5A] hover:border-[#3A7D5A] hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-[#1C2321]/15 disabled:hover:text-[#1C2321]"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-xs font-body text-[#6B6259] tabular-nums">
                  {start + 1} – {rangeEnd} of {total}
                </span>
                <button
                  onClick={next}
                  disabled={rangeEnd >= total}
                  aria-label="Next posts"
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-[#1C2321]/15 text-[#1C2321] hover:bg-[#3A7D5A] hover:border-[#3A7D5A] hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-[#1C2321]/15 disabled:hover:text-[#1C2321]"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
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
