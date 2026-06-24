import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TRAININGS } from "@/lib/constants";

export default function CircularTrainings() {
  return (
    <section className="w-full bg-white">
      <div className="container-pad py-24">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#3A7D5A] mb-3">
              Learn It Yourself
            </p>
            <h2 className="font-heading text-3xl font-bold text-[#1C2321] sm:text-4xl">
              Training Programs at <span className="text-[#3A7D5A]">Ingaju</span>
            </h2>
          </div>
          <Link
            href="/trainings"
            className="inline-flex items-center gap-2 text-sm font-body font-semibold text-[#3A7D5A] hover:underline shrink-0"
          >
            View All Programs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {TRAININGS.map((item) => (
            <Link
              key={item.key}
              href={item.ctaHref}
              className="group flex flex-col overflow-hidden rounded-2xl bg-[#FAF8F5] border border-[#1C2321]/5 transition-shadow hover:shadow-md"
            >
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-heading text-lg font-bold text-[#1C2321] group-hover:text-[#3A7D5A] transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm font-body leading-relaxed text-[#6B6259]">
                  {item.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-body font-semibold text-[#3A7D5A]">
                  {item.ctaLabel} <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
