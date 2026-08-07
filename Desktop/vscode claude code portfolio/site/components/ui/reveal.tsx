"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/**
 * Scroll-reveal wrapper: fades + rises into place once, the first time it
 * enters the viewport. `delay` is meant to be stacked in small increments
 * (40-80ms) across siblings to create a stagger, not used standalone.
 */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, transform: reduceMotion ? "none" : `translateY(${y}px)` }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: reduceMotion ? 0.3 : 0.55,
        delay: reduceMotion ? 0 : delay,
        ease: EASE_OUT,
      }}
    >
      {children}
    </motion.div>
  );
}
