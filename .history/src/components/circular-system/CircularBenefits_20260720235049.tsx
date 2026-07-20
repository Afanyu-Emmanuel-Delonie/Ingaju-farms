import { CIRCULAR_BENEFITS } from "@/lib/constants";

export default function CircularBenefits() {
  return (
    <section className="w-full bg-[#1C2321]">
      <div className="container-pad py-24">

        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-body font-semibold tracking-widest uppercase text-[#6DBE8C] mb-3">Why It Matters</p>
          <h2 className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl">
            Built to Sustain.<br />
            <span className="text-[#6DBE8C]">Designed to Regenerate.</span>
          </h2>
          <p className="mt-5 text-[15px] font-body leading-relaxed text-white/55 max-w-lg">
            Every stage of the Ingaju system is engineered to return more than it takes  from the soil to the community.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {CIRCULAR_BENEFITS.map(({ icon: Icon, title, desc, stat, statLabel }) => (
            <div key={title} className="flex flex-col gap-5 bg-[#1C2321] p-8 hover:bg-[#243028] transition-colors">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full border border-[#3A7D5A]/40 flex items-center justify-center text-[#6DBE8C]">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="text-right">
                  <p className="font-heading text-2xl font-bold text-[#6DBE8C] leading-none">{stat}</p>
                  <p className="text-[10px] font-body text-white/35 uppercase tracking-widest mt-0.5">{statLabel}</p>
                </div>
              </div>
              <div>
                <h3 className="font-heading text-sm font-bold text-white mb-2">{title}</h3>
                <p className="text-sm font-body text-white/50 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
