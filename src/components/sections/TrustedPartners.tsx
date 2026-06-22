"use client";

import Image from "next/image";
import { PARTNERS } from "@/lib/constants";

export default function TrustedPartners() {
  return (
    <section className=" py-12 overflow-hidden">
      <p className="container-pad text-sm font-body font-semibold uppercase tracking-widest text-[#1C2321] mb-8 text-center">
        Trusted Partners
      </p>

      {/* Marquee track */}
      <div className="relative flex">
        <div className="flex animate-marquee gap-16 items-center whitespace-nowrap">
          {[...PARTNERS, ...PARTNERS].map((partner, i) => (
            <div key={i} className="flex items-center justify-center w-32 h-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={48}
                className="object-contain h-10 w-auto"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
