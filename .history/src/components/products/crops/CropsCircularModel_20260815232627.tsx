"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const POINTS = [
  "Manure from our livestock becomes fertilizer for the soil, as we scale up this line",
  "We keep chemical use low across our fields",
  "Leftover crop matter goes back into the soil to keep it healthy",
  "We manage pests naturally to protect our crops",
];

export default function CropsCircularModel() {
  return (
    <section className="w-full bg-white">
      <div className="container-pad py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">

          {/* Staggered image grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-3">
              <div className="relative h-56 w-full overflow-hidden rounded-xl sm:h-64">
                <Image src="/images/crops/maiz.jpg" alt="Maize growing in rich organic soil" fill sizes="25vw" className="object-cover" />
              </div>
              <div className="relative h-36 w-full overflow-hidden rounded-xl">
                <Image src="/images/crops/nuts.jpg" alt="Macadamia nuts ready for harvest" fill sizes="25vw" className="object-cover" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="relative h-36 w-full overflow-hidden rounded-xl">
                <Image src="/images/hero/bg-3.png" alt="Harvested beans at Ingaju Farms" fill sizes="25vw" className="object-cover" />
              </div>
              <div className="relative h-56 w-full overflow-hidden rounded-xl sm:h-64">
                <Image src="/images/crops/crops-2.png" alt="Farmer tending crop rows" fill sizes="25vw" className="object-cover" />
              </div>
            </div>
          </div>

          {/* Copy */}
          <div>
            <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#3A7D5A] mb-3">
              Ingaju Circular Model
            </p>
            <h2 className="font-heading text-3xl font-bold leading-tight text-[#1C2321] sm:text-4xl">
              Sustainable Crop Production.<br />
              <span className="text-[#3A7D5A]">Careful Management.</span>
            </h2>
            <p className="mt-4 text-[15px] font-body leading-relaxed text-[#6B6259]">
              Every stage of our cultivation loop follows an integrated farm system, tracked through careful record-keeping. As we build toward fuller digital tracking systems, this discipline already helps us manage soil nutrients and support consistent crop yields season after season.
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
              href="/circular-system"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#3A7D5A] px-6 py-3 text-sm font-body font-medium text-white transition-colors hover:bg-[#2f6b4a]"
            >
              Explore Our Model <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}