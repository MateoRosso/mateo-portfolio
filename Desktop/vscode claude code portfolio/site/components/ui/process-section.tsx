"use client";

import { Pin } from "lucide-react";
import { cn } from "@/lib/utils";
import { MeshGradientBackground } from "@/components/ui/mesh-gradient-background";
import { Reveal } from "@/components/ui/reveal";

// Placeholder process copy — swap for the real workflow.
// `color` stays close to the site's own accent (--accent, lime) — same
// brightness/saturation family, just rotated in hue per card.
const STEPS = [
  {
    step: "01",
    title: "Idea",
    description: "Me contás el video y qué querés lograr con la miniatura.",
    color: "#9dff00",
  },
  {
    step: "02",
    title: "Concepto",
    description: "Propongo 2-3 direcciones visuales antes de tocar el photoshop",
    color: "#ffb020",
  },
  {
    step: "03",
    title: "Diseño",
    description: "Diseño la miniatura elegida con ajustes de composición, tipografía y color.",
    color: "#38bdf8",
  },
  {
    step: "04",
    title: "Entrega",
    description: "Recibís los archivos finales listos para subir, con revisiones incluidas.",
    color: "#c084fc",
  },
];

// Card position + rotation match the 1.txt reference's DEFAULT_CARD_POSITIONS
// exactly (indices 0-3, 280px cards, 1000x900 canvas).
const POSITIONS = [
  { wrap: "md:top-0 md:left-[15%]", rotate: "rotate-[8deg]" },
  { wrap: "md:top-[120px] md:right-[15%]", rotate: "-rotate-[8deg]" },
  { wrap: "md:top-[450px] md:left-[15%]", rotate: "rotate-[8deg]" },
  { wrap: "md:top-[570px] md:right-[10%]", rotate: "-rotate-[8deg]" },
];

// Connector segments live only in the gaps between consecutive cards (never
// under them, since the cards aren't opaque enough to hide it) and fade from
// the color of the card they leave to the color of the card they enter.
// Coordinates come from the actual measured (rotated) bounding boxes of the
// rendered cards at the positions above, not estimates.
const CONNECTORS = [
  { d: "M 452 175 C 480 178, 520 182, 548 188", x1: 452, y1: 175, x2: 548, y2: 188 },
  { d: "M 568 397 C 520 410, 470 420, 432 440", x1: 568, y1: 397, x2: 432, y2: 440 },
  { d: "M 452 605 C 490 608, 560 605, 598 612", x1: 452, y1: 605, x2: 598, y2: 612 },
];

export function ProcessSection() {
  return (
    <section id="proceso" className="relative overflow-hidden">
      <MeshGradientBackground className="absolute inset-0 -z-10 h-full w-full opacity-[0.08]" />

      <div className="mx-auto max-w-5xl px-4 py-24 md:px-8 md:py-32">
      <Reveal>
        <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.3em] text-[var(--fg-subtle)] uppercase">

        </span>
        <h2 className="text-heading mt-4 text-3xl md:text-5xl">
          Cómo trabajo, <span className="text-[1.2em] text-[var(--accent)] [font-family:var(--font-garamond)]">revisiones ilimitadas</span>
        </h2>
      </Reveal>

      <div className="relative mx-auto mt-16 flex w-full max-w-[1000px] flex-col gap-8 md:mt-20 md:block md:h-[900px] md:gap-0">
        <svg
          className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full md:block"
          viewBox="0 0 1000 900"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            {CONNECTORS.map((seg, i) => (
              <linearGradient
                key={i}
                id={`connector-${i}`}
                gradientUnits="userSpaceOnUse"
                x1={seg.x1}
                y1={seg.y1}
                x2={seg.x2}
                y2={seg.y2}
              >
                <stop offset="0%" stopColor={STEPS[i].color} />
                <stop offset="100%" stopColor={STEPS[i + 1].color} />
              </linearGradient>
            ))}
          </defs>
          {CONNECTORS.map((seg, i) => (
            <path
              key={seg.d}
              d={seg.d}
              fill="none"
              stroke={`url(#connector-${i})`}
              strokeOpacity={0.85}
              strokeWidth="2"
              strokeDasharray="8 6"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              className="process-path"
            />
          ))}
        </svg>

        {STEPS.map((step, i) => (
          <div key={step.step} className={cn("z-10 md:absolute", POSITIONS[i].wrap)}>
            <Reveal delay={i * 0.08}>
              {/* Outer frame stays neutral (the site's own material), like the
                  card mat of a pinned photo — color lives only in the pin,
                  number, inner panel and shadow, so it reads as an accent
                  rather than a colored outline. */}
              <div
                className={cn(
                  "material-strong relative flex w-full flex-col rounded-[26px] p-3 transition-transform duration-300 hover:z-30 hover:scale-[1.03] md:w-[280px]",
                  POSITIONS[i].rotate
                )}
                style={{
                  boxShadow: `0 24px 44px -22px rgba(0,0,0,0.8), 0 14px 30px -16px ${step.color}66`,
                }}
              >
                <Pin
                  className="mx-auto mb-4 size-8"
                  style={{ color: step.color }}
                  strokeWidth={1.5}
                  aria-hidden
                />
                <div
                  className="flex flex-col gap-3 rounded-[18px] p-5"
                  style={{ background: `${step.color}14` }}
                >
                  <span className="text-4xl italic [font-family:var(--font-garamond)]" style={{ color: step.color }}>
                    {step.step}
                  </span>
                  <h3 className="text-heading text-xl">{step.title}</h3>
                  <p className="text-body text-sm">{step.description}</p>
                </div>
              </div>
            </Reveal>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
