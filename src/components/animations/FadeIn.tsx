"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const offsets = {
  up:    { y: 48, x: 0 },
  down:  { y: -48, x: 0 },
  left:  { x: 48, y: 0 },
  right: { x: -48, y: 0 },
  none:  { x: 0, y: 0 },
};

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: keyof typeof offsets;
  duration?: number;
  stagger?: number;
  className?: string;
}

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  duration = 0.8,
  stagger,
  className = "",
}: FadeInProps) {
  if (stagger) {
    const container: Variants = {
      hidden: {},
      show: { transition: { staggerChildren: stagger, delayChildren: delay } },
    };
    const item: Variants = {
      hidden: { opacity: 0, ...offsets[direction] },
      show:   { opacity: 1, x: 0, y: 0, transition: { duration, ease: EASE } },
    };
    return (
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-8%" }}
        className={className}
      >
        {Array.isArray(children)
          ? children.map((child, i) => (
              <motion.div key={i} variants={item}>{child}</motion.div>
            ))
          : <motion.div variants={item}>{children}</motion.div>}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
