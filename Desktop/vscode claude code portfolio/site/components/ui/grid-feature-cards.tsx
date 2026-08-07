"use client";

import { cn } from "@/lib/utils";
import React from "react";

type FeatureType = {
  step: string;
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
};

type FeatureCardProps = React.ComponentProps<"div"> & {
  feature: FeatureType;
};

export function FeatureCard({ feature, className, ...props }: FeatureCardProps) {
  // Deterministic (not Math.random()) so server and client render the same
  // squares — a random pattern here would mismatch and trigger a hydration error.
  const p = seededPattern(feature.step);

  return (
    <div className={cn("material relative overflow-hidden p-7", className)} {...props}>
      <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
        <div className="absolute inset-0 opacity-100 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
          <GridPattern
            width={20}
            height={20}
            x="-12"
            y="4"
            squares={p}
            className="absolute inset-0 h-full w-full fill-white/[0.03] stroke-white/[0.06] mix-blend-overlay"
          />
        </div>
      </div>
      <span className="text-heading text-xs text-[var(--fg-subtle)]">{feature.step}</span>
      <feature.icon className="mt-4 size-5 text-[var(--fg)]" strokeWidth={1.5} aria-hidden />
      <h3 className="text-heading mt-4 text-lg">{feature.title}</h3>
      <p className="text-body relative z-20 mt-2 text-sm">{feature.description}</p>
    </div>
  );
}

function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  ...props
}: React.ComponentProps<"svg"> & { width: number; height: number; x: string; y: string; squares?: number[][] }) {
  const patternId = React.useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y], index) => (
            <rect strokeWidth="0" key={index} width={width + 1} height={height + 1} x={x * width} y={y * height} />
          ))}
        </svg>
      )}
    </svg>
  );
}

function seededPattern(seed: string, length = 5): number[][] {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) | 0;

  return Array.from({ length }, (_, i) => {
    const n = Math.abs(hash + i * 2654435761);
    return [7 + (n % 4), 1 + (Math.floor(n / 4) % 6)];
  });
}
