import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const POINTS = [
  "High-yield forage grown using data-driven, climate-smart agronomic practices",
  "Livestock manure processed into premium organic fertilizer",
  "Nutrient-rich compost applied to fields to naturally restore soil fertility",
  "Crop residues tracked and recycled as feed to complete the measured closed loop",
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
              A Dairy System Built on
              <br />
              <span className="text-[#3A7D5A]">Data-Driven Precision.</span>
            </h2>
            <p className="mt-4 text-[15px] font-body leading-relaxed text-[#6B6259]">
              Every stage of our dairy operation is monitored within a zero-waste loop. By merging effective management with continuous data collection, we optimize resource conversion to maximize predictability and yield season after season.
            </p>
            <ul className="mt-6 space-y-3">
              {POINTS.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-[15px] font-body text-[#6B6259]"
                >
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3A7D5A]"
                  />
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
                <Image
                  src="/images/hero/bg-img.png"
                  alt="Cows grazing at Ingaju Farms"
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative h-36 w-full overflow-hidden rounded-xl">
                <Image
                  src="/images/dairy/milk.jpg"
                  alt="Organic manure processing"
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="relative h-36 w-full overflow-hidden rounded-xl">
                <Image
                  src="/images/dairy/organic-manure.png"
                  alt="Dairy barn at Ingaju Farms"
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative h-56 w-full overflow-hidden rounded-xl sm:h-64">
                <Image
                  src="/images/dairy/cow-3.png"
                  alt="Farmer caring for livestock"
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
