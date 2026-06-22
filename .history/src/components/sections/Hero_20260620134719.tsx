import Image from "next/image";
import bgImg from "../../../public/images/bg-img.png";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <Image
        src={bgImg}
        alt="Ingaju Farms"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-start justify-end px-10 pb-20 md:px-20 text-left">
        <h1 className="max-w-4xl text-3xl font-bold leading-tight text-[#F9F6F0] md:text-5xl">
          Growing Healthy Food. <br /> Empowering <span></span>.
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-[#E0D8CE] md:text-xl">
          From dairy and crops to training and community impact, Ingaju is
          building a sustainable future through circular farming and organic
          production.
        </p>

        {/* CTAs */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <a
            href="#"
            className="rounded-full bg-[#D07A53] px-8 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90"
          >
            Get Started
          </a>
          <a
            href="#"
            className="rounded-full border border-[#F9F6F0] px-8 py-3 text-base font-semibold text-[#F9F6F0] transition-colors hover:bg-[#F9F6F0]/10"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
