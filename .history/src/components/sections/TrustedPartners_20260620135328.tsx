"use client";

import Image from "next/image";

const partners = [
  { name: "Partner 1", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Simple_CV.svg/200px-Simple_CV.svg.png" },
  { name: "Partner 2", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/200px-Amazon_logo.svg.png" },
  { name: "Partner 3", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/200px-Google_2015_logo.svg.png" },
  { name: "Partner 4", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/200px-Netflix_2015_logo.svg.png" },
  { name: "Partner 5", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Apple-logo.png/200px-Apple-logo.png" },
  { name: "Partner 6", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/200px-Microsoft_logo.svg.png" },
];

export default function TrustedPartners() {
  return (
    <section className="bg-[#F0EBE3] py-12 overflow-hidden">
      <p className="container-pad text-sm font-semibold uppercase tracking-widest text-[#1C2321] mb-8 text-center">
        Trusted Partners
      </p>

      {/* Marquee track */}
      <div className="relative flex">
        <div className="flex animate-marquee gap-16 items-center whitespace-nowrap">
          {[...partners, ...partners].map((partner, i) => (
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
