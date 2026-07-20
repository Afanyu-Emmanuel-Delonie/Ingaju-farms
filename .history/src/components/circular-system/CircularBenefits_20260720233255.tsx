import { CIRCULAR_BENEFITS } from "@/lib/constants";

export default function CircularBenefits() {
  return (
    <section className="w-full bg-[#F8F6F2]">
      <div className="container-pad py-24">

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20 lg:items-start">

          {/* Left */}
          <div className="lg:sticky lg:top-32">
            <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#3A7D5A] mb-3">Why It Matters</p>
            <h2 className="font-heading text-3xl font-bold leading-tight text-[#1C2321] sm:text-4xl">
              Better for the Farm.<br />
              <span className="text-[#3A7D5A]">Better for the Planet.</span>
            </h2>
            <p className="mt-5 text-[15px] font-body leading-relaxed text-[#6B6259] max-w-sm">
              Circular agriculture is not just an efficient way to farm — it is a commitment to leaving the land, the water, and the community better than we found them.
            </p>
            <div className="mt-10 w-16 h-px bg-[#3A7D5A]" />
          </div>

          {/* Right — cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CIRCULAR_BENEFITS.map(({ icon: Icon, title, desc }, idx) => (
              <div key={title} className="flex flex-col gap-3 rounded-2xl bg-white p-7 border-t-2 border-[#3A7D5A] shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="rounded-lg bg-[#3A7D5A]/8 p-2.5 text-[#3A7D5A]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-heading text-4xl font-bold text-[#3A7D5A]/10 select-none">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-heading text-base font-bold text-[#1C2321] mt-1">{title}</h3>
                <p className="text-sm font-body text-[#6B6259] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
