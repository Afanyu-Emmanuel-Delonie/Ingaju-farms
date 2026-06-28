import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const POINTS = [
  "Cows graze on naturally grown feed produced on the farm",
  "Manure is collected and processed into organic fertilizer",
  "Fertilizer enriches the soil used to grow crops and feed",
  "Healthy livestock, healthy soil — the cycle never stops",
];

export default function DairyCircularModel() {
  return (
    <section className="w-full bg-white">
      <div className="container-pad py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">

          {/* Copy */}
          <div>
            <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#3A7D5A] mb-3">
              Ingaju Circular Model
            </p>
            <h2 className="font-heading text-3xl font-bold leading-tight text-[#1C2321] sm:text-4xl">
              A Dairy System That<br />
              <span className="text-[#3A7D5A]">Feeds Itself.</span>
            </h2>
            <p className="mt-5 text-[15px] font-body leading-relaxed text-[#6B6259]">
              Every element of our dairy operation connects back to the farm. Nothing is wasted — manure becomes fertilizer, crops become feed, and the cycle sustains itself season after season.
            </p>
            <ul className="mt-6 space-y-3">
              {POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[15px] font-body text-[#6B6259]">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3A7D5A]" />
                  {point}
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#3A7D5A] px-6 py-3 text-sm font-body font-medium text-white transition-colors hover:bg-[#2f6b4a]"
            >
              Our Farming Model <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Staggered image grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-3">
              <div className="relative h-56 w-full overflow-hidden rounded-xl sm:h-64">
                <Image src="/images/bg-img.png" alt="Cows grazing at Ingaju Farms" fill sizes="25vw" className="object-cover" />
              </div>
              <div className="relative h-36 w-full overflow-hidden rounded-xl">
                <Image src="/images/milk.jpg" alt="Organic manure processing" fill sizes="25vw" className="object-cover" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="relative h-36 w-full overflow-hidden rounded-xl">
                <Image src="/images/cow-2.png" alt="Dairy barn at Ingaju Farms" fill sizes="25vw" className="object-cover" />
              </div>
              <div className="relative h-56 w-full overflow-hidden rounded-xl sm:h-64">
                <Image src="/images/bg-img.png" alt="Farmer caring for livestock" fill sizes="25vw" className="object-cover" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
