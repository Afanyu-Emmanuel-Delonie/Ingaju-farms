import Image from "next/image";
import aboutImg from "../../../public/images/bg-2.png";

export default function About() {
  return (
    <section className="bg-[#F9F6F0] py-24">
      <div className="container-pad flex flex-col gap-12 md:flex-row md:items-center">

        {/* Left — content */}
        <div className="flex flex-col flex-1">
          <span className="text-sm font-semibold uppercase tracking-widest text-[#D07A53]">
            More About Us
          </span>
          <h2 className="mt-3 text-3xl font-bold leading-snug text-[#1C2321] md:text-4xl">
            Building the Future Through Circular Farming
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[#6B6259]">
            Ngaju is a circular agriculture enterprise dedicated to producing organic
            products through sustainable farming practices. Our integrated system
            combines dairy farming, crop production, and natural resource recycling
            to create a productive and environmentally responsible farm.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#6B6259]">
            In addition to supplying quality products, we promote community
            development through training, employment opportunities, and educational
            farm experiences, helping build a more sustainable future for agriculture.
          </p>
          <a
            href="#"
            className="mt-8 self-start rounded-full bg-[#2E4F41] px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Learn More
          </a>
        </div>

        {/* Right — image */}
        <div className="flex-1 relative h-[480px] rounded-2xl overflow-hidden">
          <Image
            src={aboutImg}
            alt="Ingaju Farms circular farming"
            fill
            className="object-cover object-center"
          />
        </div>

      </div>
    </section>
  );
}
