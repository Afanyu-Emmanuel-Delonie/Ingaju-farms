import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <section className="w-full bg-[#F9F6F0]">
      <div className="container-pad py-20">

        <div className="grid grid-cols-1 gap-10 pb-20 md:grid-cols-2 md:gap-16 items-center">
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase text-[#D07A53]">
              More About Us
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-[#1C2321] md:text-4xl">
              Building the Future Through{" "}
              <span className="text-[#D07A53]">Circular Farming</span>
            </h2>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-[15px] leading-relaxed text-[#6B6259]">
              Ngaju is a circular agriculture enterprise dedicated to producing
              organic products through sustainable farming practices. Our
              integrated system combines dairy farming, crop production, and
              natural resource recycling to create a productive and
              environmentally responsible farm. In addition to supplying quality
              products, we promote community development through training,
              employment opportunities, and educational farm experiences,
              helping build a more sustainable future for agriculture.
            </p>

            <button
              type="button"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#1C2321] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2E4F41]"
            >
              Learn More
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative h-72 w-full overflow-hidden lg:h-72 rounded-xl">
            <Image
              src="/images/bg-3.png"
              alt="Farmer walking with dairy cattle on the Ngaju farm"
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex h-72 w-full flex-col justify-end bg-[#D07A53] p-6 text-white lg:h-72 rounded-xl">
            <span className="text-4xl font-bold leading-none sm:text-5xl">
              6+
            </span>
            <p className="mt-3 text-sm font-semibold tracking-wide uppercase">
              Years of Excellence
            </p>
            <p className="mt-2 text-xs leading-relaxed text-white/85">
              Creating impact through training, employment opportunities, farm
              visits, and knowledge sharing.
            </p>
          </div>

          <div className="relative h-72 w-full overflow-hidden lg:h-72 rounded-xl">
            <Image
              src="/images/bg-2.png"
              alt="Ngaju team engaging with farmers and the local community"
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex h-72 w-full flex-col justify-end bg-[#2E4F41] p-6 text-white lg:h-72 rounded-xl">
            <span className="text-4xl font-bold leading-none sm:text-5xl">
              500+
            </span>
            <p className="mt-3 text-sm font-semibold tracking-wide uppercase">
              Farmers & Community
            </p>
            <p className="mt-2 text-xs leading-relaxed text-white/85">
              Creating impact through training, employment opportunities, farm
              visits, and knowledge sharing.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
