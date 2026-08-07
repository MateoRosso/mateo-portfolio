"use client";

import { Lightbulb, MessageSquare, PenTool, Send } from "lucide-react";
import { FeatureCard } from "@/components/ui/grid-feature-cards";
import { Reveal } from "@/components/ui/reveal";

// Placeholder process copy — swap for the real workflow.
const STEPS = [
  {
    step: "01",
    title: "Brief",
    icon: MessageSquare,
    description: "Me contás el video, el canal y qué querés lograr con la miniatura.",
  },
  {
    step: "02",
    title: "Concepto",
    icon: Lightbulb,
    description: "Propongo 2-3 direcciones visuales antes de tocar el diseño final.",
  },
  {
    step: "03",
    title: "Diseño",
    icon: PenTool,
    description: "Diseño la miniatura elegida con ajustes de composición, tipografía y color.",
  },
  {
    step: "04",
    title: "Entrega",
    icon: Send,
    description: "Recibís los archivos finales listos para subir, con revisiones incluidas.",
  },
];

export function ProcessSection() {
  return (
    <section id="proceso" className="mx-auto max-w-5xl px-4 py-24 md:px-8 md:py-32">
      <Reveal>
        <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.3em] text-[var(--fg-subtle)] uppercase">
          
        </span>
        <h2 className="text-heading mt-4 text-3xl md:text-5xl">
          Cómo trabajo, <span className="text-[var(--accent)]">revisiones ilimitadas</span>
        </h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((feature, i) => (
          <Reveal key={feature.step} delay={i * 0.06}>
            <FeatureCard feature={feature} className="h-full" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
