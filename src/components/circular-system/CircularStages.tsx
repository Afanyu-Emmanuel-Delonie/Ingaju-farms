const STAGES = [
  {
    number: "01",
    title: "Feed Production",
    body: "The cycle begins with growing high-quality fodder and forage crops specifically for dairy animals. Excellent crop production is the foundation for animal health and milk productivity.",
    bullets: ["Fodder and forage crops grown on-site", "Foundation of herd health and productivity", "Reduces dependency on external feed sources"],
  },
  {
    number: "02",
    title: "Dairy Production",
    body: "Healthy, well-fed cows produce high-quality milk. The quality of feed directly determines the productivity and health of the herd, ensuring consistently premium output.",
    bullets: ["Pasture-fed, hormone-free herd", "Feed quality directly drives milk quality", "Fresh milk produced daily"],
  },
  {
    number: "03",
    title: "Milk Processing",
    body: "Raw milk is processed into value-added consumer dairy products such as yogurt, cheese, and butter. This stage drives market opportunities and increases farm income.",
    bullets: ["Yogurt, cheese, and butter produced on-site", "Value addition increases market reach", "Higher income per litre of milk"],
  },
  {
    number: "04",
    title: "Waste Utilization",
    body: "Manure and organic waste are collected and converted via anaerobic digesters into biogas and organic fertilizer — turning a potential pollutant into a valuable resource.",
    bullets: ["Anaerobic digesters convert waste to biogas", "Organic fertilizer extracted from manure", "Zero waste leaves the system"],
  },
  {
    number: "05",
    title: "Crop Production",
    body: "Organic fertilizer from the waste stage is applied back to the fields, improving soil fertility and supporting the growth of food crops and fodder for the next cycle.",
    bullets: ["Zero synthetic pesticides or fertilizers", "Diverse crop varieties grown year-round", "Higher nutritional value from healthy soil"],
  },
  {
    number: "06",
    title: "Energy Recovery",
    body: "Biogas captured during waste utilization is harnessed as a clean energy source — used for cooking, heating, electricity generation, and meeting farm operational needs.",
    bullets: ["Biogas powers farm cooking and heating", "Renewable energy reduces operational costs", "Lowers the farm's carbon emissions"],
  },
  {
    number: "07",
    title: "Water Reuse",
    body: "Wastewater from farming and processing operations is treated and reclaimed for field irrigation and farm cleaning, conserving fresh water sources and reducing local pollution.",
    bullets: ["Treated wastewater reused for irrigation", "Reduces freshwater consumption significantly", "Minimises local water pollution"],
  },
  {
    number: "08",
    title: "Nutrient Recycling",
    body: "Organic matter and treated water are returned to the land, safely recycling nutrients into the soil. This reduces reliance on chemical fertilizers and brings the cycle back to stage one.",
    bullets: ["Nutrients returned directly to the soil", "Reduces chemical fertilizer costs", "Completes and restarts the full loop"],
  },
];

export default function CircularStages() {
  return (
    <section className="w-full bg-[#F8F6F2]">
      <div className="container-pad py-24">

        <div className="text-center mb-16">
          <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#3A7D5A] mb-3">Deep Dive</p>
          <h2 className="font-heading text-3xl font-bold text-[#1C2321] sm:text-4xl">
            The Eight Stages <span className="text-[#3A7D5A]">Explained</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-[15px] font-body leading-relaxed text-[#6B6259]">
            Eight interconnected stages. Zero waste. Every output from one stage becomes the input for another.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map(({ number, title, body, bullets }) => (
            <div key={number} className="flex flex-col rounded-2xl bg-white border border-[#1C2321]/5 p-6">
              <span className="font-heading text-xs font-bold text-[#3A7D5A] mb-4">{number}</span>
              <h3 className="font-heading text-base font-bold text-[#1C2321] leading-snug">{title}</h3>
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
          ))}
        </div>

      </div>
    </section>
  );
}
