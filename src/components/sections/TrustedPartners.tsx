"use client";

import Image from "next/image";
import { PARTNERS } from "@/lib/constants";

export default function TrustedPartners() {
  return (
    <section className="w-full py-12 overflow-hidden bg-white">
      <p className="container-pad text-sm font-body font-semibold uppercase tracking-widest text-[#1C2321] mb-8 text-center">
        Trusted Partners
      </p>

      {/* Marquee track */}
      <div className="relative flex">
        <div className="flex animate-marquee gap-6 items-center whitespace-nowrap">
          {[...PARTNERS, ...PARTNERS].map((partner, i) => {
            // The marquee only loops seamlessly because PARTNERS is rendered
            // twice back-to-back; the second copy is a visual duplicate, not
            // new content, so it's hidden from assistive tech.
            const isDuplicate = i >= PARTNERS.length;
            return (
              <div key={i} aria-hidden={isDuplicate} className="flex items-center justify-center w-32 h-12">
                <Image
                  src={partner.logo}
                  alt={isDuplicate ? "" : partner.name}
                  width={120}
                  height={48}
                  className="object-contain h-10 w-auto"
                  unoptimized
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
