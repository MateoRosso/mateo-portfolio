import { MeshGradientBackground } from "@/components/ui/mesh-gradient-background";

// Layered, blurred accent glows standing in for a flat black hero background.
// Motion is kept to ambient drift only — decorative motion is allowed here
// because it's a rare, first-impression element. The mesh gradient sits at
// very low opacity, purely as texture — the lime accent still carries the
// page's actual color identity.
export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[var(--bg)]" />

      <MeshGradientBackground className="absolute inset-0 h-full w-full opacity-[0.10]" />

      <div
        className="hero-beam -top-1/3 -left-1/4 h-[70vh] w-[70vh]"
        style={{
          background:
            "conic-gradient(from 210deg at 50% 50%, rgba(163,230,53,0.32), transparent 55%)",
        }}
      />
      <div
        className="hero-beam -top-1/4 right-[-18%] h-[60vh] w-[60vh]"
        style={{
          background:
            "conic-gradient(from 20deg at 50% 50%, rgba(163,230,53,0.22), transparent 60%)",
          animationDelay: "3s",
        }}
      />
      <div
        className="hero-beam bottom-[-30%] left-1/3 h-[55vh] w-[55vh]"
        style={{
          background: "radial-gradient(circle, rgba(163,230,53,0.14), transparent 70%)",
          animationDelay: "6s",
        }}
      />

      {/* Vignette: keeps the edges heavy and pulls focus back to the center */}
      <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_30%,rgba(5,5,5,0.75)_100%)]" />
    </div>
  );
}
