import { ArrowDown, RefreshCw } from "lucide-react";
import { CIRCULAR_LOOP_STAGES } from "@/lib/constants";

const CENTER = 50;
const RING_R = 42;
const GAP_DEG = 8;

function polar(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CENTER + r * Math.cos(rad), y: CENTER - r * Math.sin(rad) };
}

// Samples points along the ring between two angles so the connector renders
// as a curve (not a straight chord) without needing SVG arc sweep flags.
function arcPath(fromAngle: number, toAngle: number) {
  const steps = 24;
  const pts = Array.from({ length: steps + 1 }, (_, s) => {
    const t = fromAngle + (toAngle - fromAngle) * (s / steps);
    return polar(t, RING_R);
  });
  return "M " + pts.map((p) => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" L ");
}

// Six positions evenly spaced around the ring, starting at 12 o'clock and
// proceeding clockwise (decreasing angle) to match the flow of the stages.
const ANGLES = [90, 30, -30, -90, -150, -210];

export default function CircularLoopDiagram() {
  return (
    <section className="w-full bg-white pt-24">
      <div className="container-pad mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#3A7D5A] mb-3">
            The Full Loop
          </p>
          <h2 className="font-heading text-3xl font-bold text-[#1C2321] sm:text-4xl">
            A Climate-Smart, Circular Food System
          </h2>
          <p className="mt-4 max-w-md mx-auto text-[15px] font-body leading-relaxed text-[#6B6259]">
            Six connected stages, one continuous cycle - from soil to table and back again.
          </p>
        </div>

        {/* Mobile: vertical list with loop arrows */}
        <div className="flex flex-col items-center sm:hidden">
          {CIRCULAR_LOOP_STAGES.map(({ key, label, sublabel, icon: Icon }, i) => (
            <div key={key} className="flex flex-col items-center w-full">
              <div className="flex items-center gap-3 rounded-full bg-white border border-secondary px-3 py-2 shadow-sm w-full">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-secondary">
                  <Icon className="h-3.5 w-3.5 text-white" aria-hidden />
                </span>
                <span className="flex flex-col">
                  <span className="text-[13px] font-semibold leading-none text-primary">{label}</span>
                  {sublabel && <span className="text-[11px] font-normal leading-none text-neutral-600 mt-0.5">{sublabel}</span>}
                </span>
              </div>
              {i < CIRCULAR_LOOP_STAGES.length - 1 ? (
                <ArrowDown className="my-1.5 h-4 w-4 text-secondary/60" aria-hidden />
              ) : (
                <div className="mt-2 flex items-center gap-2 text-secondary/60">
                  <RefreshCw className="h-3.5 w-3.5" aria-hidden />
                  <span className="text-[10px] font-semibold uppercase tracking-widest">loop restarts</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop: circular diagram */}
        <div className="hidden sm:block w-full overflow-x-auto pb-2">
          <div className="relative mx-auto aspect-square w-full max-w-[560px] min-w-[480px]">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
              <defs>
                <marker
                  id="loop-arrowhead"
                  viewBox="0 0 10 10"
                  refX="7"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto-start-reverse"
                >
                  <path d="M0,0 L10,5 L0,10 Z" fill="#3A7D5A" />
                </marker>
              </defs>
              {ANGLES.map((angle, i) => {
                const next = ANGLES[(i + 1) % ANGLES.length] - (i === ANGLES.length - 1 ? 360 : 0);
                return (
                  <path
                    key={i}
                    d={arcPath(angle - GAP_DEG, next + GAP_DEG)}
                    fill="none"
                    stroke="#3A7D5A"
                    strokeWidth={0.6}
                    strokeLinecap="round"
                    markerEnd="url(#loop-arrowhead)"
                  />
                );
              })}
            </svg>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-32 w-32 items-center justify-center rounded-full bg-secondary shadow-md sm:h-36 sm:w-36">
              <p className="font-heading text-[10px] font-bold uppercase tracking-widest leading-snug text-white text-center sm:text-xs">
                Zero-Waste Ambition
              </p>
            </div>

            {CIRCULAR_LOOP_STAGES.map(({ key, label, sublabel, icon: Icon }, i) => {
              const { x, y } = polar(ANGLES[i], RING_R);
              return (
                <div
                  key={key}
                  className="absolute flex items-center gap-2 rounded-full bg-white border border-secondary px-3 py-2 shadow-md"
                  style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
                >
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-secondary">
                    <Icon className="h-3.5 w-3.5 text-white" aria-hidden />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[11px] font-semibold leading-none text-primary whitespace-nowrap">
                      {label}
                    </span>
                    {sublabel && (
                      <span className="text-[10px] font-normal leading-none text-neutral-600 whitespace-nowrap mt-0.5">
                        {sublabel}
                      </span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
