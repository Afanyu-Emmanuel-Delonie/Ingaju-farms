import React from "react";
import { Recycle, Wheat, ShoppingCart, GraduationCap, type LucideProps } from "lucide-react";
import { CIRCULAR_LOOP_STAGES } from "@/lib/constants";

type IconComponent = (p: { className?: string }) => React.ReactElement;

function wrap(C: React.ComponentType<LucideProps>): IconComponent {
  function Wrapped({ className }: { className?: string }) {
    return <C {...({ className } as LucideProps)} />;
  }
  Wrapped.displayName = `Wrapped(${C.displayName ?? "Icon"})`;
  return Wrapped;
}

function CropIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V12" />
      <path d="M12 12C12 7 7 4 3 5c0 5 3 8 9 7" />
      <path d="M12 12c0-5 5-8 9-7-1 5-4 8-9 7" />
      <path d="M6 17c1.5 1.5 3.5 2.5 6 2.5s4.5-1 6-2.5" />
    </svg>
  );
}

function CowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8c0-1.5 1-3 3-3h10c2 0 3 1.5 3 3v2c0 3-2 5-5 5H9c-3 0-5-2-5-5V8z" />
      <path d="M9 15v4" />
      <path d="M15 15v4" />
      <path d="M7 5L5 3" />
      <path d="M17 5l2-2" />
      <circle cx="9.5" cy="9.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="9.5" r="1" fill="currentColor" stroke="none" />
      <path d="M10 12.5c.5.5 1 .8 2 .8s1.5-.3 2-.8" />
    </svg>
  );
}

// Matches the icon set used in the ring diagram above this section.
const STAGE_ICONS: Record<string, IconComponent> = {
  soil: CropIcon,
  livestock: CowIcon,
  manure: wrap(Recycle),
  resources: wrap(Wheat),
  processing: wrap(ShoppingCart),
  learning: wrap(GraduationCap),
};

export default function CircularLoopRoadmap() {
  return (
    <section className="w-full bg-white py-24">
      <div className="container-pad mx-auto max-w-4xl">
        <div className="text-center mb-20">
        
          <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
            How Each Stage Works
          </h2>
          <p className="mt-4 max-w-md mx-auto text-[15px] font-body leading-relaxed text-neutral-600">
            A closer look at each of the six stages that keep the farm circular.
          </p>
        </div>

        {/* Mobile: stacked cards, no left/right alternation */}
        <div className="flex flex-col gap-6 sm:hidden">
          {CIRCULAR_LOOP_STAGES.map(({ key, label, sublabel, description }, i) => {
            const Icon = STAGE_ICONS[key];
            const dark = i % 2 === 1;
            return (
              <div
                key={key}
                className={`relative rounded-[28px] px-6 pt-10 pb-6 text-white shadow-lg ${dark ? "bg-primary" : "bg-secondary"}`}
              >
                <div className="absolute -top-6 left-6 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md">
                  <Icon className={dark ? "h-5 w-5 text-primary" : "h-5 w-5 text-secondary"} />
                </div>
                <p className="text-[11px] font-body font-bold uppercase tracking-widest text-white/70">
                  Step {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-heading text-lg font-bold mt-1">
                  {label}
                  {sublabel && <span className="font-body font-normal text-white/70"> ({sublabel})</span>}
                </h3>
                <p className="mt-2 text-sm font-body leading-relaxed text-white/85">{description}</p>
              </div>
            );
          })}
        </div>

        {/* Desktop: alternating pill cards with a dotted spine and step numbers */}
        <div className="relative hidden sm:block">
          <div
            className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 border-l-2 border-dashed border-secondary/25"
            aria-hidden
          />
          {CIRCULAR_LOOP_STAGES.map(({ key, label, sublabel, description }, i) => {
            const Icon = STAGE_ICONS[key];
            const dark = i % 2 === 1;
            const pillOnRight = i % 2 === 1;
            const bg = dark ? "bg-primary" : "bg-secondary";
            const iconColor = dark ? "text-primary" : "text-secondary";

            const pill = (
              <div className="relative flex-1">
                <div className={`rounded-full ${bg} text-white shadow-lg px-10 py-6 ${pillOnRight ? "pl-14" : "pr-14"}`}>
                  <h3 className="font-heading text-base font-bold leading-snug">
                    {label}
                    {sublabel && <span className="font-body font-normal text-white/70"> ({sublabel})</span>}
                  </h3>
                  <p className="mt-1.5 text-[13px] font-body leading-relaxed text-white/85">{description}</p>
                </div>
                <div
                  className={`absolute top-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md ${
                    pillOnRight ? "-left-7" : "-right-7"
                  }`}
                >
                  <Icon className={`h-6 w-6 ${iconColor}`} />
                </div>
              </div>
            );

            const stepLabel = (
              <div className={`flex-1 ${pillOnRight ? "text-right pr-10" : "text-left pl-10"}`}>
                <p className="text-xs font-body font-bold uppercase tracking-widest text-secondary">Step</p>
                <p className="font-heading text-4xl font-bold text-primary leading-none mt-1">
                  {String(i + 1).padStart(2, "0")}
                </p>
              </div>
            );

            return (
              <div key={key} className="relative flex items-center gap-4 py-8">
                <span
                  className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary"
                  aria-hidden
                />
                {pillOnRight ? (
                  <>
                    {stepLabel}
                    {pill}
                  </>
                ) : (
                  <>
                    {pill}
                    {stepLabel}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
