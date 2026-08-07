"use client";

import { Reveal } from "@/components/ui/reveal";

// Placeholder metrics — swap for real numbers.
const STATS = [
  { value: "+3", label: "Años de experiencia" },
  { value: "48h", label: "Tiempo de entrega promedio" },
  { value: "+500", label: "Miniaturas" },
];

export function StatsStrip() {
  return (
    <section className="border-y border-[var(--border)]">
      <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-[var(--border)] px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:px-8">
        {STATS.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 0.06}
            className="flex flex-col items-center gap-2 py-10 text-center"
          >
            <span className="text-heading text-4xl md:text-5xl">{stat.value}</span>
            <span className="text-body text-xs tracking-[0.2em] text-[var(--fg-subtle)] uppercase">
              {stat.label}
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
