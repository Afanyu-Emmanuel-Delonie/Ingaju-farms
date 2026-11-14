"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CountUpProps {
  to: number;
  duration?: number;
  className?: string;
}

export default function CountUp({ to, duration = 1.5, className }: CountUpProps) {
  // Initialized to the final value (not 0) so the server-rendered HTML -
  // what crawlers and no-JS visitors see - always shows the real number.
  // The count-up is a client-only visual flourish on top of that.
  const [count, setCount] = useState(to);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { val: 0 };

    const tween = gsap.to(obj, {
      val: to,
      duration,
      ease: "power2.out",
      onUpdate: () => setCount(Math.floor(obj.val)),
      onComplete: () => setCount(to),
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        once: true,
      },
    });

    return () => { tween.kill(); };
  }, [to, duration]);

  return <span ref={ref} className={className}>{count}</span>;
}
