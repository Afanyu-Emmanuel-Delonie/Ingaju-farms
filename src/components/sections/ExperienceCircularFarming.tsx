import Image from "next/image";
import { ArrowRight } from "lucide-react";

const experiences = [
  "Educational Tours",
  "School Visits",
  "Corporate Visits",
  "Agricultural Learning Experiences",
];

export default function ExperienceCircularFarming() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-3">
              <div className="relative h-56 w-full overflow-hidden rounded-lg sm:h-64">
                <Image
                  src="/images/bg-img.png"
                  alt="Dairy cattle grazing on the farm"
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative h-32 w-full overflow-hidden rounded-lg sm:h-36">
                <Image
                  src="/images/bg-2.png"
                  alt="Freshly harvested beans"
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="relative h-32 w-full overflow-hidden rounded-lg sm:h-36">
                <Image
                  src="/images/bg-3.png"
                  alt="Macadamia nuts, shelled and whole"
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative h-56 w-full overflow-hidden rounded-lg sm:h-64">
                <Image
                  src="/images/bg-img.png"
                  alt="Farmers harvesting corn in the field"
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-heading text-3xl font-bold leading-tight text-[#1C2321] sm:text-4xl">
              Experience Circular
              <br />
              <span className="text-[#3A7D5A]">Farming in Action</span>
            </h2>

            <p className="mt-4 text-[15px] font-body leading-relaxed text-[#6B6259]">
              See how dairy farming, crop production, and natural resource
              recycling work together on a real working farm.
            </p>

            <ul className="mt-4 space-y-2">
              {experiences.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[15px] font-body text-[#6B6259]"
                >
                  <span
                    aria-hidden
                    className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3A7D5A]"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="/book-a-tour"
              className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-[#3A7D5A] px-6 py-3 text-sm font-body font-medium text-white transition-colors hover:bg-[#2f6b4a]"
            >
              Book A Farm Tour
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
