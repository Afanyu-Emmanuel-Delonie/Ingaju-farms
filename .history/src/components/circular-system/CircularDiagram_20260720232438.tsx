"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Pause, Leaf } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type StageKey = "cattle" | "fertilizer" | "crop" | "feed";

interface StageDetail {
  label: string;
  imgSrc: string;
  imgAlt: string;
  angle: number;
}

// Clockwise loop: Dairy Cattle -> Organic Fertilizer -> Crop Production -> Animal Feed -> back
const STAGE_DATA: Record<StageKey, StageDetail> = {
  cattle: {
    label: "Dairy Cattle",
    imgSrc: "/images/dairy/diary-production.png",
    imgAlt: "Dairy cattle on the farm",
    angle: 270,
  },
  fertilizer: {
    label: "Organic Fertilizer",
    imgSrc: "/images/dairy/organic-manure.png",
    imgAlt: "Organic manure fertilizer",
    angle: 0,
  },
  crop: {
    label: "Crop Production",
    imgSrc: "/images/crops/crops-2.png",
    imgAlt: "Maize crop production",
    angle: 90,
  },
  feed: {
    label: "Animal Feed",
    imgSrc: "/images/dairy/feed-production.png",
    imgAlt: "Milled animal feed",
    angle: 180,
  },
};

const STAGE_ORDER: StageKey[] = ["cattle", "fertilizer", "crop", "feed"];
const CYCLE_SECONDS = 3.2;

// ---- Geometry, all in a fixed 500x500 SVG space (scales via viewBox — keeps
// the HTML node overlay and the SVG arcs perfectly in sync via % conversion) ----
const SIZE = 520;
const CENTER = 260;
const NODE_ORBIT_R = 222; // distance from center to each circle's center
const NODE_R = 70; // each photo-circle's own radius
const RING_R = 80; // thin center brand ring
const ARC_R = NODE_ORBIT_R + NODE_R + 6; // just outside the node circles, so arrows form one smooth round loop
const ARC_ANGLE_PAD = 20; // degrees kept clear at each end, near the circles

const toRad = (deg: number) => (deg * Math.PI) / 180;
const pointOnCircle = (angleDeg: number, r: number) => ({
  x: CENTER + r * Math.cos(toRad(angleDeg)),
  y: CENTER + r * Math.sin(toRad(angleDeg)),
});
const toPct = (v: number) => `${(v / SIZE) * 100}%`;

// A true circular arc (concentric with the loop) between two adjacent stages —
// stays perfectly round the whole way instead of bulging like a bezier curve.
function arcBetween(a1: number, a2: number) {
  let end = a2;
  if (end <= a1) end += 360; // wrap the 270 -> 360(0) edge
  const startAngle = a1 + ARC_ANGLE_PAD;
  const endAngle = end - ARC_ANGLE_PAD;
  const start = pointOnCircle(startAngle, ARC_R);
  const stop = pointOnCircle(endAngle, ARC_R);
  return `M ${start.x} ${start.y} A ${ARC_R} ${ARC_R} 0 0 1 ${stop.x} ${stop.y}`;
}

export default function CircularDiagram() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<StageKey, HTMLDivElement | null>>({
    cattle: null,
    fertilizer: null,
    crop: null,
    feed: null,
  });
  const bannerRefs = useRef<Record<StageKey, HTMLDivElement | null>>({
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
  const dotRefs = useRef<Record<StageKey, SVGCircleElement | null>>({
    cattle: null,
    fertilizer: null,
    crop: null,
    feed: null,
  });

  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const prevStage = useRef<StageKey>("feed"); // so first activation of "cattle" always animates in

  const [activeStage, setActiveStage] = useState<StageKey>("cattle");
  const [isPlaying, setIsPlaying] = useState(true);

  const activateStage = useCallback((key: StageKey) => {
    if (prevStage.current === key) return;
    const prev = prevStage.current;
    prevStage.current = key;

    gsap.to(nodeRefs.current[prev], {
      scale: 1,
      boxShadow: "0 4px 14px rgba(28,35,33,0.08)",
      duration: 0.35,
      ease: "power2.out",
    });
    gsap.to(nodeRefs.current[key], {
      scale: 1.06,
      boxShadow: "0 14px 34px rgba(58,125,90,0.28)",
      duration: 0.4,
      ease: "back.out(1.6)",
    });
    gsap.to(bannerRefs.current[prev], { backgroundColor: "#2E5F45", duration: 0.35 });
    gsap.to(bannerRefs.current[key], { backgroundColor: "#3A7D5A", duration: 0.4 });

    gsap.to(arcRefs.current[key], { opacity: 1, strokeWidth: 5, duration: 0.4 });
    gsap.to(arcRefs.current[prev], { opacity: 0.4, strokeWidth: 3.5, duration: 0.35 });

    gsap.to(dotRefs.current[key], { scale: 1.5, duration: 0.35, transformOrigin: "center" });
    gsap.to(dotRefs.current[prev], { scale: 1, duration: 0.35, transformOrigin: "center" });

    setActiveStage(key);
  }, []);

  const startCycle = useCallback(() => {
    tweenRef.current?.kill();
    let i = STAGE_ORDER.indexOf(prevStage.current);
    tweenRef.current = gsap.to(
      {},
      {
        repeat: -1,
        duration: CYCLE_SECONDS,
        onRepeat() {
          i = (i + 1) % STAGE_ORDER.length;
          activateStage(STAGE_ORDER[i]);
        },
      },
    );
  }, [activateStage]);

  useEffect(() => {
    const section = sectionRef.current;
    const wrap = wrapRef.current;
    if (!section || !wrap) return;

    gsap.set(wrap, { opacity: 0, y: 40 });

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 72%",
      once: true,
      onEnter() {
        gsap.to(wrap, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
        activateStage("cattle");
        startCycle();
      },
    });

    return () => {
      st.kill();
      tweenRef.current?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlayPause = useCallback(() => {
    setIsPlaying((prev) => {
      const next = !prev;
      if (next) startCycle();
      else tweenRef.current?.pause();
      return next;
    });
  }, [startCycle]);

  const handleNodeClick = useCallback(
    (key: StageKey) => {
      setIsPlaying(true);
      activateStage(key);
      startCycle();
    },
    [activateStage, startCycle],
  );

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

        {/* Diagram — square, all children in %, so it scales cleanly at any width */}
        <div
          ref={wrapRef}
          className="relative mx-auto aspect-square w-full"
          style={{ maxWidth: "min(640px, 94vw)" }}
        >
          {/* Play / Pause */}
          <button
            onClick={handlePlayPause}
            aria-label={isPlaying ? "Pause cycle" : "Resume cycle"}
            className="absolute top-0 right-0 z-30 p-2 rounded-full bg-white border border-neutral-200 hover:bg-neutral-50 transition-colors text-[#6B6259] shadow-sm"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* SVG layer: connecting arrows + center ring */}
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
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
                <path d="M1,1 L9,5 L1,9" fill="none" stroke="#2E5F45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </marker>
            </defs>

            {STAGE_ORDER.map((key, i) => {
              const from = STAGE_ORDER[i];
              const to = STAGE_ORDER[(i + 1) % STAGE_ORDER.length];
              const d = arcBetween(STAGE_DATA[from].angle, STAGE_DATA[to].angle);
              return (
                <path
                  key={to}
                  ref={(el) => {
                    arcRefs.current[to] = el;
                  }}
                  d={d}
                  fill="none"
                  stroke="#2E5F45"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray="1 13"
                  opacity="0.4"
                  markerEnd="url(#arrowHead)"
                  className="animate-flow"
                />
              );
            })}

            {/* Thin center brand ring with a dot facing each stage */}
            <circle
              cx={CENTER}
              cy={CENTER}
              r={RING_R}
              fill="#FFFFFF"
              stroke="#BFE0CC"
              strokeWidth="2"
            />
            {STAGE_ORDER.map((key) => {
              const p = pointOnCircle(STAGE_DATA[key].angle, RING_R);
              return (
                <circle
                  key={key}
                  ref={(el) => {
                    dotRefs.current[key] = el;
                  }}
                  cx={p.x}
                  cy={p.y}
                  r="4.5"
                  fill="#3A7D5A"
                />
              );
            })}
          </svg>

          {/* Center brand mark */}
          <div
            className="absolute z-20 flex flex-col items-center justify-center text-center pointer-events-none"
            style={{
              left: toPct(CENTER),
              top: toPct(CENTER),
              width: toPct(RING_R * 2 - 20),
              height: toPct(RING_R * 2 - 20),
              transform: "translate(-50%, -50%)",
            }}
          >
            <Leaf className="mb-0.5 h-[clamp(12px,2.6vw,18px)] w-[clamp(12px,2.6vw,18px)] text-[#3A7D5A]" />
            <p className="font-heading font-extrabold leading-none text-[#3A7D5A]" style={{ fontSize: "clamp(14px, 3.6vw, 24px)" }}>
              Ingaju
            </p>
            <p
              className="mt-1 font-heading font-bold uppercase leading-tight text-[#1C2321]"
              style={{ fontSize: "clamp(7.5px, 1.7vw, 11px)" }}
            >
              Circular
              <br />
              Agriculture
              <br />
              System
            </p>
          </div>

          {/* Nodes */}
          {STAGE_ORDER.map((key) => {
            const s = STAGE_DATA[key];
            const c = pointOnCircle(s.angle, NODE_ORBIT_R);
            const isActive = activeStage === key;
            return (
              <div
                key={key}
                ref={(el) => {
                  nodeRefs.current[key] = el;
                }}
                role="button"
                tabIndex={0}
                onClick={() => handleNodeClick(key)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleNodeClick(key)}
                style={{
                  left: toPct(c.x),
                  top: toPct(c.y),
                  width: toPct(NODE_R * 2),
                  transform: "translate(-50%, -50%)",
                  boxShadow: "0 4px 14px rgba(28,35,33,0.08)",
                }}
                className={`group absolute z-10 flex aspect-square cursor-pointer flex-col overflow-hidden rounded-full border-2 bg-white transition-colors duration-300 ${
                  isActive ? "border-[#3A7D5A]" : "border-neutral-200 hover:border-[#3A7D5A]/50"
                }`}
              >
                {/* Photo */}
                <div className="relative h-[52%] w-full flex-shrink-0">
                  <Image src={s.imgSrc} alt={s.imgAlt} fill sizes="220px" className="object-cover" priority />
                </div>

                {/* Green fill with title — covers the full bottom half */}
                <div
                  ref={(el) => {
                    bannerRefs.current[key] = el;
                  }}
                  className="flex flex-1 w-full flex-col items-center justify-center bg-[#3A7D5A] px-[10%]"
                >
                  <span
                    className="text-center font-heading font-bold uppercase tracking-wide text-white leading-tight"
                    style={{ fontSize: "clamp(8.5px, 2vw, px)" }}
                  >
                    {s.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>


      </div>

      <style jsx>{`
        @keyframes flowDash {
          to {
            stroke-dashoffset: -280;
          }
        }
        .animate-flow {
          animation: flowDash 5.5s linear infinite;
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