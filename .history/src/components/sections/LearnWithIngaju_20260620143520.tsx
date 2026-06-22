import Image from "next/image";

const trainings = [
  {
    key: "dairy",
    title: "Dairy Farming Training",
    description: "Practical skills in livestock management and milk production.",
    ctaLabel: "Learn More",
    ctaHref: "/trainings/dairy-farming",
    image: "/images/bg-img.png",
    alt: "Farmer working with dairy cattle",
  },
  {
    key: "organic",
    title: "Organic Farming Training",
    description: "Sustainable farming techniques for healthier production systems.",
    ctaLabel: "Learn More",
    ctaHref: "/trainings/organic-farming",
    image: "/images/bg-2.png",
    alt: "Farmer demonstrating organic farming techniques to a group",
  },
  {
    key: "circular",
    title: "Circular Agriculture Training",
    description: "Hands-on methods for turning farm waste into fertilizer and feed.",
    ctaLabel: "Learn More",
    ctaHref: "/trainings/circular-agriculture",
    image: "/images/bg-3.png",
    alt: "Group training session on circular agriculture practices",
  },
];

export default function LearnWithIngaju() {
  return (
    <section className="w-full bg-[#FAF8F5]">
      <div className="container-pad py-20">
        <h2 className="text-center text-3xl font-heading font-bold text-[#1C2321] sm:text-4xl">
          Learn With <span className="text-[#D07A53]">Ingaju</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trainings.map((item) => (
            <div
              key={item.key}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-heading font-bold text-[#1C2321]">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm font-body leading-relaxed text-[#6B6259]">
                  {item.description}
                </p>

                <a
                  href={item.ctaHref}
                  className="mt-5 inline-flex w-fit items-center justify-center rounded-full border border-[#E0D8CE] px-6 py-2.5 text-sm font-body font-medium text-[#1C2321] transition-colors hover:bg-[#F0EBE3]"
                >
                  {item.ctaLabel}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
