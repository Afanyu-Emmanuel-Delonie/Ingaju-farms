"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  stagger?: number;
  className?: string;
}

const getClip = (direction: NonNullable<FadeInProps["direction"]>) => {
  const clips = {
    up:    { from: "inset(100% 0 0 0)",    to: "inset(0% 0 0 0)" },
    down:  { from: "inset(0 0 100% 0)",    to: "inset(0 0 0% 0)" },
    left:  { from: "inset(0 0 0 100%)",    to: "inset(0 0 0 0%)" },
    right: { from: "inset(0 100% 0 0)",    to: "inset(0 0% 0 0)" },
    none:  { from: "inset(0 0 0 0)",       to: "inset(0 0 0 0)" },
  };
  return clips[direction];
};

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  duration = 0.7,
  stagger,
  className = "",
}: FadeInProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const clip = getClip(direction);
    const targets = stagger ? Array.from(el.children) : [el];

    gsap.set(targets, { clipPath: clip.from, opacity: direction === "none" ? 0 : 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        once: true,
      },
    });

    if (stagger) {
      tl.to(targets, {
        clipPath: clip.to,
        opacity: 1,
        duration,
        ease: "power3.out",
        stagger,
        delay,
      });
    } else {
      tl.to(el, {
        clipPath: clip.to,
        opacity: 1,
        duration,
        ease: "power3.out",
        delay,
      });
    }

    return () => { tl.kill(); };
  }, [direction, duration, delay, stagger]);

  return (
    <div ref={wrapperRef} className={className}>
      {children}
    </div>
  );
}
