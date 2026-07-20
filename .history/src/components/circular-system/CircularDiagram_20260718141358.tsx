"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Pause } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type StageKey = "milking" | "fertilizer" | "crop" | "milling";

interface StageDetail {
  title: string;
  shortDesc: string;
  metric: string;
  imgSrc: string;
  imgAlt: string;
  x: number;
  y: number;
  targetAngle: number;
  tooltipSide: "top" | "bottom" | "left" | "right";
}

const STAGE_DATA: Record<StageKey, StageDetail> = {
  milking: {
    title: "Milking Operations",
    shortDesc: "Hormone-free milk tracked from herd to storage.",
    metric: "100% Tracked Yields",
    imgSrc: "/images/circular-system/milking.png",
    imgAlt: "Modern Milking Process",
    x: 0,
    y: 230,
    targetAngle: 90,
    tooltipSide: "bottom",
  },
  fertilizer: {
    title: "Organic Fertilizer",
    shortDesc: "Manure converted into zero-chemical soil amendments.",
    metric: "0% Synthetic Inputs",
    imgSrc: "/images/circular-system/organic Manure.png",
    imgAlt: "Organic Manure",
    x: -230,
    y: 0,
    targetAngle: 180,
    tooltipSide: "left",
  },
  crop: {
    title: "Maize Cultivation",
    shortDesc: "Organic nutrients fuel regenerative crop fields.",
    metric: "Enhanced Soil Health",
    imgSrc: "/images/circular-system/crop-production.png",
    imgAlt: "Crop Production",
    x: 0,
    y: -230,
    targetAngle: 270,
    tooltipSide: "top",
  },
  milling: {
    title: "Forage Processing",
    shortDesc: "Crop residues milled into high-nutrition feedstock.",
    metric: "Zero-Waste Processing",
    imgSrc: "/images/circular-system/milling.png",
    imgAlt: "Forage Milling",
    x: 230,
    y: 0,
    targetAngle: 0,
    tooltipSide: "right",
  },
};

const STAGES = Object.keys(STAGE_DATA) as StageKey[];
const RADIUS = 160;
const CX = 250;
const CY = 250;

// Spoke endpoints (node positions in SVG coords)
const SPOKE_ENDS: Record<StageKey, [number, number]> = {
  milking: [CX, CY + RADIUS],
  fertilizer: [CX - RADIUS, CY],
  crop: [CX, CY - RADIUS],
  milling: [CX + RADIUS, CY],
};

// Corner data chips — positioned in the four quadrant gaps
const CHIPS = [
  { label: "Closed Loop", value: "4 Stages", corner: "top-6 left-6" },
  { label: "Waste Output", value: "~0%", corner: "top-6 right-6" },
  { label: "Soil Recovery", value: "+38%", corner: "bottom-6 left-6" },
  { label: "Feed Reuse", value: "100%", corner: "bottom-6 right-6" },
];

function angleToStage(a: number): StageKey {
  const n = ((a % 360) + 360) % 360;
  if (n >= 45 && n < 135) return "milking";
  if (n >= 135 && n < 225) return "fertilizer";
  if (n >= 225 && n < 315) return "crop";
  return "milling";
}

const TOOLTIP_CFG = {
  top: {
    from: { y: 10 },
    cls: "bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2",
  },
  bottom: {
    from: { y: -10 },
    cls: "top-[calc(100%+10px)] left-1/2 -translate-x-1/2",
  },
  left: {
    from: { x: 10 },
    cls: "right-[calc(100%+10px)] top-1/2 -translate-y-1/2",
  },
  right: {
    from: { x: -10 },
    cls: "left-[calc(100%+10px)] top-1/2 -translate-y-1/2",
  },
};

export default function CircularDiagram() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const particleRef = useRef<SVGCircleElement>(null);
  const pulseRef = useRef<SVGCircleElement>(null);
  const arcRef = useRef<SVGLineElement>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nodeRefs = useRef<Record<StageKey, HTMLButtonElement | null>>({
    milking: null,
    fertilizer: null,
    crop: null,
    milling: null,
  });
  const tooltipRefs = useRef<Record<StageKey, HTMLDivElement | null>>({
    milking: null,
    fertilizer: null,
    crop: null,
    milling: null,
  });
  const spokeRefs = useRef<Record<StageKey, SVGLineElement | null>>({
    milking: null,
    fertilizer: null,
    crop: null,
    milling: null,
  });

  const angleRef = useRef(90);
  const playingRef = useRef(true);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const prevStage = useRef<StageKey>("milking");

  const [activeStage, setActiveStage] = useState<StageKey>("milking");
  const [isPlaying, setIsPlaying] = useState(true);

  const applyParticle = useCallback((deg: number) => {
    const rad = (deg * Math.PI) / 180;
    const x = CX + RADIUS * Math.cos(rad);
    const y = CY + RADIUS * Math.sin(rad);
    particleRef.current?.setAttribute("cx", String(x));
    particleRef.current?.setAttribute("cy", String(y));
    pulseRef.current?.setAttribute("cx", String(x));
    pulseRef.current?.setAttribute("cy", String(y));
    // Move the live arc line from center to particle
    arcRef.current?.setAttribute("x2", String(x));
    arcRef.current?.setAttribute("y2", String(y));
  }, []);

  const showTooltip = useCallback((key: StageKey) => {
    const el = tooltipRefs.current[key];
    if (!el) return;
    const { from } = TOOLTIP_CFG[STAGE_DATA[key].tooltipSide];
    gsap.fromTo(
      el,
      { opacity: 0, ...from, pointerEvents: "none" },
      {
        opacity: 1,
        x: 0,
        y: 0,
        pointerEvents: "auto",
        duration: 0.3,
        ease: "power3.out",
      },
    );
  }, []);

  const hideTooltip = useCallback((key: StageKey) => {
    const el = tooltipRefs.current[key];
    if (!el) return;
    const { from } = TOOLTIP_CFG[STAGE_DATA[key].tooltipSide];
    gsap.to(el, {
      opacity: 0,
      ...from,
      pointerEvents: "none",
      duration: 0.18,
      ease: "power2.in",
    });
  }, []);

  const activateStage = useCallback(
    (key: StageKey) => {
      if (prevStage.current === key) return;
      const prev = prevStage.current;
      prevStage.current = key;

      // Node scale
      gsap.to(nodeRefs.current[prev], {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(nodeRefs.current[key], {
        scale: 1.08,
        duration: 0.35,
        ease: "back.out(1.7)",
      });

      // Spoke brightness
      gsap.to(spokeRefs.current[prev], { opacity: 0.08, duration: 0.3 });
      gsap.to(spokeRefs.current[key], { opacity: 0.5, duration: 0.35 });

      hideTooltip(prev);
      showTooltip(key);
      setActiveStage(key);
    },
    [hideTooltip, showTooltip],
  );

  const startOrbit = useCallback(() => {
    tweenRef.current?.kill();
    const proxy = { val: angleRef.current };
    tweenRef.current = gsap.to(proxy, {
      val: angleRef.current + 360,
      duration: 22,
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

    // Float the corner chips independently
    chipRefs.current.forEach((chip, i) => {
      if (!chip) return;
      gsap.to(chip, {
        y: i % 2 === 0 ? -8 : 8,
        duration: 2.8 + i * 0.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 0.3,
      });
    });

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 72%",
      once: true,
      onEnter() {
        gsap.to(wrap, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
      },
    });

    return () => {
      st.kill();
      tweenRef.current?.kill();
    };
  }, [applyParticle, startOrbit, showTooltip]);

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

      let dest = STAGE_DATA[key].targetAngle;
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
          angleRef.current = STAGE_DATA[key].targetAngle;
          applyParticle(STAGE_DATA[key].targetAngle);
        },
      });

      activateStage(key);
    },
    [applyParticle, activateStage],
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
        <div className="text-center mb-16">
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

        {/* Diagram wrapper */}
        <div
          ref={wrapRef}
          className="relative flex items-center justify-center"
          style={{ padding: "120px 140px" }}
        >
          {/* Ambient background orbs */}
          <div className="absolute top-0 left-0 w-48 h-48 rounded-full bg-[#3A7D5A]/6 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-56 h-56 rounded-full bg-[#3A7D5A]/8 blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-36 h-36 rounded-full bg-[#6DBE8C]/6 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-[#6DBE8C]/5 blur-2xl pointer-events-none" />

          {/* Play/Pause */}
          <button
            onClick={handlePlayPause}
            className="absolute top-4 right-[168px] z-30 p-2 rounded-full bg-white border border-neutral-200 hover:bg-neutral-50 transition-colors text-[#6B6259] shadow-sm"
            title={isPlaying ? "Pause cycle" : "Resume cycle"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </button>

          {/* SVG ring */}
          <svg
            viewBox="0 0 500 500"
            className="w-full max-w-[460px] h-auto select-none pointer-events-none"
          >
            {/* Outer ghost ring */}
            <circle
              cx={CX}
              cy={CY}
              r={RADIUS + 28}
              fill="none"
              stroke="#3A7D5A"
              strokeWidth="1"
              opacity="0.07"
              strokeDasharray="2 10"
            />
            {/* Inner ghost ring */}
            <circle
              cx={CX}
              cy={CY}
              r={RADIUS - 32}
              fill="none"
              stroke="#3A7D5A"
              strokeWidth="1"
              opacity="0.07"
              strokeDasharray="2 10"
            />

            {/* Spokes — one per node, dim by default, lit when active */}
            {STAGES.map((key) => {
              const [ex, ey] = SPOKE_ENDS[key];
              return (
                <line
                  key={key}
                  ref={(el) => {
                    spokeRefs.current[key] = el;
                  }}
                  x1={CX}
                  y1={CY}
                  x2={ex}
                  y2={ey}
                  stroke="#3A7D5A"
                  strokeWidth="1"
                  strokeDasharray="3 5"
                  opacity="0.08"
                />
              );
            })}

            {/* Live arc — thin line from center to particle */}
            <line
              ref={arcRef}
              x1={CX}
              y1={CY}
              x2={CX}
              y2={CY + RADIUS}
              stroke="#3A7D5A"
              strokeWidth="1.5"
              opacity="0.35"
              strokeLinecap="round"
            />

            {/* Main orbit ring */}
            <circle
              cx={CX}
              cy={CY}
              r={RADIUS}
              fill="none"
              stroke="#E5E5E5"
              strokeWidth="2"
              strokeDasharray="4 8"
            />
            <circle
              cx={CX}
              cy={CY}
              r={RADIUS}
              fill="none"
              stroke="#3A7D5A"
              strokeWidth="1.5"
              opacity="0.15"
            />

            {/* Particle */}
            <circle
              ref={particleRef}
              cx={CX}
              cy={CY + RADIUS}
              r="7"
              fill="#3A7D5A"
            />
            <circle
              ref={pulseRef}
              cx={CX}
              cy={CY + RADIUS}
              r="16"
              fill="none"
              stroke="#3A7D5A"
              strokeWidth="2"
              opacity="0.3"
              className="animate-ping"
            />
          </svg>

          {/* Brand centerpiece */}
          <div className="absolute inset-0 m-auto h-[140px] w-[140px] rounded-full bg-[#1C2321] flex flex-col items-center justify-center text-center p-3 shadow-lg border border-[#3A7D5A]/30 z-20 pointer-events-none">
            <span className="text-[9px] font-bold font-body text-[#6DBE8C] tracking-wider uppercase mb-0.5">
              Ingaju Farms
            </span>
            <p className="text-[11px] font-heading font-bold text-white leading-tight">
              Circular
              <br />
              System
            </p>
            <div className="w-5 h-0.5 bg-[#3A7D5A] mt-2 rounded-full opacity-60 animate-pulse" />
          </div>

          {/* Nodes */}
          {STAGES.map((key) => {
            const s = STAGE_DATA[key];
            const cfg = TOOLTIP_CFG[s.tooltipSide];
            return (
              <button
                key={key}
                ref={(el) => {
                  nodeRefs.current[key] = el;
                }}
                onClick={() => handleNodeClick(key)}
                style={{ transform: `translate(${s.x}px, ${s.y}px)` }}
                className={`absolute inset-0 m-auto w-[110px] h-[110px] rounded-2xl border-2 bg-white shadow-lg overflow-visible group z-10 transition-[border-color,box-shadow] duration-300 ${
                  activeStage === key
                    ? "border-[#3A7D5A] ring-4 ring-[#3A7D5A]/15 shadow-[0_8px_32px_rgba(58,125,90,0.18)]"
                    : "border-neutral-200 hover:border-[#3A7D5A]/40"
                }`}
              >
                <div className="w-full h-full rounded-[14px] overflow-hidden relative">
                  <Image
                    src={s.imgSrc}
                    alt={s.imgAlt}
                    fill
                    sizes="110px"
                    className="object-cover"
                    priority
                  />
                  <div
                    className={`absolute inset-0 rounded-[14px] transition-opacity duration-300 ${activeStage === key ? "opacity-0" : "opacity-20 bg-white group-hover:opacity-0"}`}
                  />
                </div>

                {/* Short tooltip */}
                <div
                  ref={(el) => {
                    tooltipRefs.current[key] = el;
                  }}
                  style={{ opacity: 0, pointerEvents: "none" }}
                  className={`absolute ${cfg.cls} z-50 w-44 bg-white rounded-xl shadow-lg border border-neutral-100 px-3 py-2.5 text-left`}
                >
                  <p className="text-[11px] font-heading font-bold text-[#1C2321] mb-1">
                    {s.title}
                  </p>
                  <p className="text-[10px] font-body text-[#6B6259] leading-snug">
                    {s.shortDesc}
                  </p>
                  <span className="mt-2 block text-[9px] font-mono font-bold text-[#3A7D5A] uppercase tracking-wider">
                    {s.metric}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-center gap-3 -mt-4">
          <div className="h-px w-16 bg-[#3A7D5A]/20" />
          <span className="text-xs font-body text-[#6B6259]">
            {isPlaying ? "System tracing running..." : "System trace paused"}
          </span>
          <div className="h-px w-16 bg-[#3A7D5A]/20" />
        </div>
      </div>
    </section>
  );
}
