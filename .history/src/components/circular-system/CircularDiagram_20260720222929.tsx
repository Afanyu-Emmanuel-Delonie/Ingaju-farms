"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Pause, Milk, Sprout, Wheat, Leaf } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type StageKey = "cattle" | "fertilizer" | "crop" | "feed";

interface StageDetail {
  label: string;
  title: string;
  shortDesc: string;
  metric: string;
  imgSrc: string;
  imgAlt: string;
  icon: React.ComponentType<{ className?: string }>;
  angle: number; // SVG/CSS convention: 0=right, 90=bottom, 180=left, 270=top
}

// Clockwise flow: Dairy Cattle -> Organic Fertilizer -> Crop Production -> Animal Feed -> back
const STAGE_DATA: Record<StageKey, StageDetail> = {
  cattle: {
    label: "Dairy Cattle",
    title: "Dairy Cattle",
    shortDesc: "Healthy cows produce hormone-free milk and manure.",
    metric: "100% Tracked Yields",
    imgSrc: "/images/circular-system/milking.png",
    imgAlt: "Dairy cattle on the farm",
    icon: Milk,
    angle: 270, // top
  },
  fertilizer: {
    label: "Organic Fertilizer",
    title: "Organic Fertilizer",
    shortDesc: "Manure is processed into natural fertilizer to enrich the soil.",
    metric: "0% Synthetic Inputs",
    imgSrc: "/images/circular-system/organic Manure.png",
    imgAlt: "Organic manure fertilizer",
    icon: Sprout,
    angle: 0, // right
  },
  crop: {
    label: "Crop Production",
    title: "Crop Production",
    shortDesc: "Healthy soil grows nutritious maize and forage crops.",
    metric: "Enhanced Soil Health",
    imgSrc: "/images/circular-system/crop-production.png",
    imgAlt: "Maize crop production",
    icon: Wheat,
    angle: 90, // bottom
  },
  feed: {
    label: "Animal Feed",
    title: "Animal Feed",
    shortDesc: "Crop residues are milled into feed for the cattle.",
    metric: "Zero-Waste Processing",
    imgSrc: "/images/circular-system/milling.png",
    imgAlt: "Milled animal feed",
    icon: Leaf,
    angle: 180, // left
  },
};

// Traversal order matches ascending angle (clockwise): cattle(270) -> fertilizer(0/360) -> crop(90) -> feed(180) -> cattle
const STAGE_ORDER: StageKey[] = ["cattle", "fertilizer", "crop", "feed"];

const CX = 250;
const CY = 250;
const RADIUS = 190; // used only for the SVG (500x500 viewBox) — node HTML overlay uses % below
const RADIUS_PCT = (RADIUS / 500) * 100; // percentage-of-container radius, keeps nodes in sync w/ SVG on any screen size

function polar(angleDeg: number, radiusPct = RADIUS_PCT) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    left: `${50 + radiusPct * Math.cos(rad)}%`,
    top: `${50 + radiusPct * Math.sin(rad)}%`,
  };
}

function angleToStage(a: number): StageKey {
  const n = ((a % 360) + 360) % 360;
  if (n >= 225 && n < 315) return "cattle";
  if (n >= 315 || n < 45) return "fertilizer";
  if (n >= 45 && n < 135) return "crop";
  return "feed";
}

// Quarter-circle arc path between two adjacent stage angles, for the flow arrows
function arcPath(fromAngle: number, toAngle: number) {
  let end = toAngle;
  if (end <= fromAngle) end += 360;
  const startRad = (fromAngle * Math.PI) / 180;
  const endRad = (end * Math.PI) / 180;
  const x1 = CX + RADIUS * Math.cos(startRad);
  const y1 = CY + RADIUS * Math.sin(startRad);
  const x2 = CX + RADIUS * Math.cos(endRad);
  const y2 = CY + RADIUS * Math.sin(endRad);
  return `M ${x1} ${y1} A ${RADIUS} ${RADIUS} 0 0 1 ${x2} ${y2}`;
}

export default function CircularDiagram() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const particleRef = useRef<SVGCircleElement>(null);
  const pulseRef = useRef<SVGCircleElement>(null);
  const nodeRefs = useRef<Record<StageKey, HTMLButtonElement | null>>({
    cattle: null,
    fertilizer: null,
    crop: null,
    feed: null,
  });
  const arcRefs = useRef<Record<StageKey, SVGPathElement | null>>({
    cattle: null,
    fertilizer: null,
    crop: null,
    feed: null,
  });

  const angleRef = useRef(270);
  const playingRef = useRef(true);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const prevStage = useRef<StageKey>("cattle");

  const [activeStage, setActiveStage] = useState<StageKey>("cattle");
  const [isPlaying, setIsPlaying] = useState(true);

  const applyParticle = useCallback((deg: number) => {
    const rad = (deg * Math.PI) / 180;
    const x = CX + RADIUS * Math.cos(rad);
    const y = CY + RADIUS * Math.sin(rad);
    particleRef.current?.setAttribute("cx", String(x));
    particleRef.current?.setAttribute("cy", String(y));
    pulseRef.current?.setAttribute("cx", String(x));
    pulseRef.current?.setAttribute("cy", String(y));
  }, []);

  const activateStage = useCallback((key: StageKey) => {
    if (prevStage.current === key) return;
    const prev = prevStage.current;
    prevStage.current = key;

    gsap.to(nodeRefs.current[prev], { scale: 1, duration: 0.3, ease: "power2.out" });
    gsap.to(nodeRefs.current[key], { scale: 1.08, duration: 0.35, ease: "back.out(1.7)" });

    // Light up the arc feeding INTO the newly active node
    gsap.to(arcRefs.current[prev], { opacity: 0.25, strokeWidth: 2, duration: 0.3 });
    gsap.to(arcRefs.current[key], { opacity: 1, strokeWidth: 3.5, duration: 0.35 });

    setActiveStage(key);
  }, []);

  const startOrbit = useCallback(() => {
    tweenRef.current?.kill();
    const proxy = { val: angleRef.current };
    tweenRef.current = gsap.to(proxy, {
      val: angleRef.current + 360,
      duration: 24,
      ease: "none",
      repeat: -1,
      onUpdate() {
        const deg = ((proxy.val % 360) + 360) % 360;
        angleRef.current = deg;
        applyParticle(deg);
        activateStage(angleToStage(deg));
      },
    });
  }, [applyParticle, activateStage]);

  const pauseOrbit = useCallback(() => tweenRef.current?.pause(), []);

  useEffect(() => {
    const section = sectionRef.current;
    const wrap = wrapRef.current;
    if (!section || !wrap) return;

    gsap.set(wrap, { opacity: 0, y: 40 });
    applyParticle(angleRef.current);

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 72%",
      once: true,
      onEnter() {
        gsap.to(wrap, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
        startOrbit();
      },
    });

    return () => {
      st.kill();
      tweenRef.current?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlayPause = useCallback(() => {
    const next = !playingRef.current;
    playingRef.current = next;
    setIsPlaying(next);
    if (next) startOrbit();
    else pauseOrbit();
  }, [startOrbit, pauseOrbit]);

  const handleNodeClick = useCallback(
    (key: StageKey) => {
      playingRef.current = false;
      setIsPlaying(false);
      tweenRef.current?.kill();

      let dest = STAGE_DATA[key].angle;
      if (dest <= angleRef.current) dest += 360;

      const proxy = { val: angleRef.current };
      gsap.to(proxy, {
        val: dest,
        duration: 0.65,
        ease: "power3.inOut",
        onUpdate() {
          const deg = ((proxy.val % 360) + 360) % 360;
          angleRef.current = deg;
          applyParticle(deg);
        },
        onComplete() {
          angleRef.current = STAGE_DATA[key].angle;
          applyParticle(STAGE_DATA[key].angle);
        },
      });

      activateStage(key);
    },
    [applyParticle, activateStage],
  );

  const active = STAGE_DATA[activeStage];
  const ActiveIcon = active.icon;

  return (
    <section
      id="the-loop"
      ref={sectionRef}
      className="w-full bg-white py-24 overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(circle, #3A7D5A18 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
      }}
    >
      <div className="container-pad mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-body font-semibold tracking-widest uppercase text-[#3A7D5A] mb-3">
            Ingaju SmartCycle
          </p>
          <h2 className="font-heading text-3xl font-bold leading-tight text-[#1C2321] sm:text-4xl">
            A Living, Measured Ecosystem
          </h2>
          <p className="mt-4 text-[15px] font-body text-[#6B6259] max-w-md mx-auto leading-relaxed">
            Four connected stages. Zero waste. A closed loop where every
            resource stays in use.
          </p>
        </div>

        {/* Diagram wrapper — square, scales fluidly, all children positioned in % so nothing breaks on resize */}
        <div
          ref={wrapRef}
          className="relative mx-auto aspect-square w-full"
          style={{
            maxWidth: "min(560px, 92vw)",
            padding: "clamp(56px, 12%, 90px)",
          }}
        >
          {/* Ambient background */}
          <div className="absolute top-0 left-0 w-1/3 h-1/3 rounded-full bg-[#3A7D5A]/6 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-1/3 h-1/3 rounded-full bg-[#3A7D5A]/8 blur-3xl pointer-events-none" />

          {/* Play / Pause */}
          <button
            onClick={handlePlayPause}
            aria-label={isPlaying ? "Pause cycle" : "Resume cycle"}
            className="absolute -top-1 right-2 z-30 p-2 rounded-full bg-white border border-neutral-200 hover:bg-neutral-50 transition-colors text-[#6B6259] shadow-sm"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* SVG: connecting arcs + traveling particle. Scales automatically via viewBox. */}
          <svg
            viewBox="0 0 500 500"
            className="absolute inset-0 w-full h-full select-none pointer-events-none"
          >
            <defs>
              <marker
                id="arrowHead"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M0,0 L10,5 L0,10 z" fill="#3A7D5A" />
              </marker>
            </defs>

            {/* One curved arrow per edge, feeding INTO each stage (from the previous stage) */}
            {STAGE_ORDER.map((key, i) => {
              const prevKey = STAGE_ORDER[(i - 1 + STAGE_ORDER.length) % STAGE_ORDER.length];
              const d = arcPath(STAGE_DATA[prevKey].angle, STAGE_DATA[key].angle);
              return (
                <path
                  key={key}
                  ref={(el) => {
                    arcRefs.current[key] = el;
                  }}
                  d={d}
                  fill="none"
                  stroke="#3A7D5A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="1 14"
                  opacity="0.25"
                  markerEnd="url(#arrowHead)"
                  className="animate-flow"
                />
              );
            })}

            {/* Traveling particle showing live position in the cycle */}
            <circle ref={particleRef} r="7" fill="#3A7D5A" />
            <circle
              ref={pulseRef}
              r="16"
              fill="none"
              stroke="#3A7D5A"
              strokeWidth="2"
              opacity="0.3"
              className="animate-ping"
            />
          </svg>

          {/* Center hub */}
          <div className="absolute inset-0 m-auto flex h-[26%] w-[26%] min-h-[96px] min-w-[96px] flex-col items-center justify-center rounded-full border border-[#3A7D5A]/30 bg-[#1C2321] p-3 text-center shadow-lg z-20 pointer-events-none">
            <span className="mb-1 text-[9px] font-bold uppercase tracking-wider text-[#6DBE8C] font-body">
              Ingaju Farms
            </span>
            <p className="text-[11px] font-heading font-bold leading-tight text-white">
              Circular
              <br />
              Agriculture
            </p>
            <div className="mt-2 h-0.5 w-5 animate-pulse rounded-full bg-[#3A7D5A] opacity-60" />
          </div>

          {/* Nodes — positioned with %, so they track the SVG at any viewport size */}
          {STAGE_ORDER.map((key) => {
            const s = STAGE_DATA[key];
            const Icon = s.icon;
            const pos = polar(s.angle);
            const isActive = activeStage === key;
            return (
              <button
                key={key}
                ref={(el) => {
                  nodeRefs.current[key] = el;
                }}
                onClick={() => handleNodeClick(key)}
                style={{
                  left: pos.left,
                  top: pos.top,
                  transform: "translate(-50%, -50%)",
                  width: "clamp(76px, 21%, 118px)",
                }}
                className={`group absolute z-10 aspect-square overflow-hidden rounded-2xl border-2 bg-white shadow-lg transition-[border-color,box-shadow] duration-300 ${
                  isActive
                    ? "border-[#3A7D5A] ring-4 ring-[#3A7D5A]/15 shadow-[0_8px_32px_rgba(58,125,90,0.18)]"
                    : "border-neutral-200 hover:border-[#3A7D5A]/40"
                }`}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={s.imgSrc}
                    alt={s.imgAlt}
                    fill
                    sizes="120px"
                    className="object-cover"
                    priority
                  />
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      isActive ? "opacity-0" : "bg-white opacity-20 group-hover:opacity-0"
                    }`}
                  />
                  {/* Icon + label banner, like the reference — bottom third */}
                  <div
                    className={`absolute inset-x-0 bottom-0 flex items-center justify-center gap-1 py-[6%] transition-colors ${
                      isActive ? "bg-[#3A7D5A]" : "bg-[#1C2321]/80"
                    }`}
                  >
                    <Icon className="h-[clamp(10px,2.4vw,14px)] w-[clamp(10px,2.4vw,14px)] text-white" />
                    <span className="text-[clamp(8px,2vw,10.5px)] font-bold uppercase tracking-wide text-white font-body">
                      {s.label}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active stage detail card — replaces the old hover tooltips; always legible on mobile */}
        <div className="mx-auto -mt-2 max-w-md text-center transition-all duration-300">
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3A7D5A]">
              <ActiveIcon className="h-3.5 w-3.5 text-white" />
            </span>
            <p className="font-heading text-base font-bold text-[#1C2321]">{active.title}</p>
          </div>
          <p className="text-[13.5px] font-body leading-relaxed text-[#6B6259]">
            {active.shortDesc}
          </p>
          <span className="mt-2 inline-block text-[10px] font-mono font-bold uppercase tracking-wider text-[#3A7D5A]">
            {active.metric}
          </span>
        </div>

        {/* Status bar */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-[#3A7D5A]/20" />
          <span className="text-xs font-body text-[#6B6259]">
            {isPlaying ? "System tracing running..." : "System trace paused"}
          </span>
          <div className="h-px w-16 bg-[#3A7D5A]/20" />
        </div>
      </div>

      <style jsx>{`
        @keyframes flowDash {
          to {
            stroke-dashoffset: -300;
          }
        }
        .animate-flow {
          animation: flowDash 6s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-flow {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}