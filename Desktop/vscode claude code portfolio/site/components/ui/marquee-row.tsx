"use client";

import { motion, useMotionValue, useAnimationFrame, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/**
 * Infinite horizontal marquee — constant-speed scroll (the correct use of
 * `linear`-style motion per the animation-vocabulary skill), slows on hover,
 * respects reduced motion. Shared by the hero and the work carousel so the
 * scroll/measurement logic isn't forked between the two.
 */
export function MarqueeRow({
  images,
  reverse = false,
  speed = 30,
  hoverSlowdown = 3,
  fadeDelay = 0,
  trackClassName = "flex w-max items-center gap-4",
  renderTile,
}: {
  images: string[];
  reverse?: boolean;
  speed?: number;
  hoverSlowdown?: number;
  fadeDelay?: number;
  trackClassName?: string;
  renderTile: (src: string, index: number) => ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [repeatCount, setRepeatCount] = useState(2);
  const unitWidth = useRef(0);
  const initialized = useRef(false);
  const hovered = useRef(false);
  const x = useMotionValue(0);
  const reduceMotion = useReducedMotion();

  const track = Array.from({ length: repeatCount }, () => images).flat();

  useEffect(() => {
    const container = containerRef.current;
    const trackEl = trackRef.current;
    if (!container || !trackEl) return;

    const measure = () => {
      const currentUnit = trackEl.scrollWidth / repeatCount;
      if (!currentUnit) return;
      unitWidth.current = currentUnit;

      // Keep enough repeated copies rendered that the visible width is always
      // covered, even mid-loop, so the track never runs out and shows a gap.
      const needed = Math.ceil(container.clientWidth / currentUnit) + 2;
      if (needed > repeatCount) {
        setRepeatCount(needed);
        return;
      }

      if (!initialized.current) {
        initialized.current = true;
        x.set(reverse ? -currentUnit : 0);
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    return () => ro.disconnect();
  }, [images, repeatCount, reverse, x]);

  useAnimationFrame((_, delta) => {
    if (reduceMotion || !unitWidth.current) return;
    const currentSpeed = hovered.current ? speed / hoverSlowdown : speed;
    const dir = reverse ? 1 : -1;
    let next = x.get() + dir * currentSpeed * (delta / 1000);
    if (dir === -1 && next <= -unitWidth.current) next += unitWidth.current;
    if (dir === 1 && next >= 0) next -= unitWidth.current;
    x.set(next);
  });

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: fadeDelay, ease: EASE_OUT }}
      onMouseEnter={() => (hovered.current = true)}
      onMouseLeave={() => (hovered.current = false)}
      className="relative w-full max-w-[100vw] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
    >
      <motion.div ref={trackRef} className={trackClassName} style={{ x }}>
        {track.map((src, i) => renderTile(src, i))}
      </motion.div>
    </motion.div>
  );
}
