import Image from "next/image";

const STAGES = [
  {
    number: "01",
    title: "Dairy Cattle & Livestock",
    body: "Everything starts with our herd. Pasture-raised cattle produce fresh milk for market and organic manure as a natural byproduct. No hormones, no antibiotics — just healthy animals living as they should.",
    bullets: ["Pasture-fed, hormone-free herd", "Fresh milk produced daily", "Manure collected and processed on-site"],
    img: "/images/hero/bg-img.png",
    alt: "Dairy cattle at Ingaju Farms",
  },
  {
    number: "02",
    title: "Organic Fertilizer Production",
    body: "Manure doesn't go to waste — it goes to work. We compost and process it into rich organic fertilizer that rebuilds soil health naturally, eliminating the need for synthetic inputs.",
    bullets: ["100% natural composting process", "Replaces synthetic fertilizers entirely", "Improves soil structure and microbial life"],
    img: "/images/dairy/organic-manure.png",
    alt: "Organic manure composting at Ingaju",
  },
  {
    number: "03",
    title: "Crop Production",
    body: "Soil enriched by organic fertilizer grows healthy, chemical-free crops. From corn and beans to macadamia nuts, our diverse produce benefits from naturally fertile ground.",
    bullets: ["Zero synthetic pesticides or fertilizers", "Diverse crop varieties grown year-round", "Higher nutritional value from healthy soil"],
    img: "/images/crops/maiz.jpg",
    alt: "Crops growing at Ingaju Farms",
  },
  {
    number: "04",
    title: "Animal Feed & the Loop Closes",
    body: "Crop residues, husks, and by-products are fed back to the livestock. The herd stays healthy, costs stay low, and the cycle begins again — completely self-sustaining.",
    bullets: ["Crop waste repurposed as animal feed", "Reduces external feed purchasing costs", "Completes the zero-waste loop"],
    img: "/images/dairycow-feed.png",
    alt: "Livestock being fed at Ingaju",
  },
];

export default function CircularStages() {
  return (
    <section className="w-full bg-white">
      <div className="container-pad py-24">

        <div className="text-center mb-16">
          <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#3A7D5A] mb-3">Deep Dive</p>
          <h2 className="font-heading text-3xl font-bold text-[#1C2321] sm:text-4xl">
            The Four Stages <span className="text-[#3A7D5A]">Explained</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-[15px] font-body leading-relaxed text-[#6B6259]">
            Every stage feeds the next. Nothing leaves the system — everything becomes something else.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {STAGES.map(({ number, title, body, bullets, img, alt }) => (
            <div key={number} className="flex flex-col rounded-3xl overflow-hidden bg-[#F8F6F2] border border-[#1C2321]/5">
              {/* Image */}
              <div className="relative h-70 w-full overflow-hidden">
                <Image src={img} alt={alt} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
                {/* Number overlay */}
                <div className="absolute top-4 left-4 flex items-center justify-center w-9 h-9 rounded-full bg-[#0a0f0d]/60 backdrop-blur-sm border border-white/20">
                  <span className="font-heading text-xs font-bold text-white">{number}</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6 border-t-2 border-[#3A7D5A]">
                <h3 className="font-heading text-lg font-bold text-[#1C2321] leading-snug">{title}</h3>
                <p className="mt-3 text-sm font-body text-[#6B6259] leading-relaxed">{body}</p>
                <ul className="mt-5 space-y-2">
                  {bullets.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm font-body text-[#6B6259]">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3A7D5A]" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
