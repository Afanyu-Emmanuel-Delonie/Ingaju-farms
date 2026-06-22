import FadeIn from "@/components/animations/FadeIn";
import CountUp from "@/components/animations/CountUp";

export default function OurImpacts() {
  const impacts = [
    { value: 50, label: "Jobs Created" },
    { value: 300, label: "Farmers Trained" },
    { value: 10, label: "Organic Products Produced" },
    { value: 12, label: "Local Partnerships" },
  ];

  return (
    <section className="w-full py-20 bg-[#1C2321] text-white">
      <div className="container-pad text-center">
        <FadeIn direction="up">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-16">
            Our Impacts
          </h2>
        </FadeIn>
        <div className="grid grid-cols-2 gap-y-12 gap-x-8 md:grid-cols-4 max-w-6xl mx-auto">
          {impacts.map((impact, idx) => (
            <FadeIn key={idx} delay={idx * 0.1} className="flex flex-col items-center">
              <div className="flex items-start">
                <CountUp to={impact.value} className="font-heading text-5xl sm:text-6xl font-bold tracking-tight" />
                <span className="text-white/60 font-serif text-3xl sm:text-4xl font-light ml-1 relative -top-1">+</span>
              </div>
              <span className="mt-4 text-xs sm:text-sm font-medium tracking-wide text-white/80 uppercase">{impact.label}</span>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
