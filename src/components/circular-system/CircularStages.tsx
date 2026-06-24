import Image from "next/image";

const STAGES = [
  {
    number: "01",
    label: "Stage One",
    title: "Dairy Cattle & Livestock",
    body: "Everything starts with our herd. Pasture-raised cattle produce fresh milk for market and organic manure as a natural byproduct. No hormones, no antibiotics — just healthy animals living as they should.",
    bullets: ["Pasture-fed, hormone-free herd", "Fresh milk produced daily", "Manure collected and processed on-site"],
    img: "/images/bg-img.png",
    alt: "Dairy cattle at Ingaju Farms",
    reverse: false,
  },
  {
    number: "02",
    label: "Stage Two",
    title: "Organic Fertilizer Production",
    body: "Manure doesn't go to waste — it goes to work. We compost and process it into rich organic fertilizer that rebuilds soil health naturally. This eliminates the need for synthetic inputs and cuts external costs significantly.",
    bullets: ["100% natural composting process", "Replaces synthetic fertilizers entirely", "Improves soil structure and microbial life"],
    img: "/images/bg-2.png",
    alt: "Organic manure composting at Ingaju",
    reverse: true,
  },
  {
    number: "03",
    label: "Stage Three",
    title: "Crop Production",
    body: "Soil enriched by organic fertilizer grows healthy, chemical-free crops. From corn and beans to macadamia nuts, our diverse produce benefits from naturally fertile ground — delivering better nutrition and consistent yields.",
    bullets: ["Zero synthetic pesticides or fertilizers", "Diverse crop varieties grown year-round", "Higher nutritional value from healthy soil"],
    img: "/images/bg-3.png",
    alt: "Crops growing at Ingaju Farms",
    reverse: false,
  },
  {
    number: "04",
    label: "Stage Four",
    title: "Animal Feed & the Loop Closes",
    body: "Crop residues, husks, and by-products that would otherwise be discarded are fed back to the livestock. The herd stays healthy, input costs stay low, and the cycle begins again — completely self-sustaining.",
    bullets: ["Crop waste repurposed as animal feed", "Reduces external feed purchasing costs", "Completes the zero-waste loop"],
    img: "/images/bg-img.png",
    alt: "Livestock being fed at Ingaju",
    reverse: true,
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
        </div>

        <div className="flex flex-col gap-24">
          {STAGES.map(({ number, label, title, body, bullets, img, alt, reverse }) => (
            <div key={number} className={`grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-20 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="relative h-[420px] w-full overflow-hidden rounded-2xl shadow-md">
                <Image src={img} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <span className="font-heading text-5xl font-bold text-[#1C2321]/8 leading-none">{number}</span>
                  <span className="text-xs font-body font-semibold uppercase tracking-widest text-[#3A7D5A]">{label}</span>
                </div>
                <h3 className="font-heading text-2xl font-bold text-[#1C2321] sm:text-3xl">{title}</h3>
                <p className="mt-4 text-[15px] font-body leading-relaxed text-[#6B6259]">{body}</p>
                <ul className="mt-6 space-y-3">
                  {bullets.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-[15px] font-body text-[#6B6259]">
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
