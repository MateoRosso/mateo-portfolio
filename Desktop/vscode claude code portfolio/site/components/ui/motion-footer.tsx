"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STYLES = `
@keyframes footer-glow-pulse {
  0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
  50%      { opacity: 0.65; transform: translate(-50%, -50%) scale(1.08); }
}

.footer-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(92vw, 820px);
  height: clamp(120px, 24vw, 260px);
  background: radial-gradient(ellipse at center, rgba(163,230,53,0.14) 0%, rgba(163,230,53,0.04) 45%, transparent 72%);
  filter: blur(50px);
  pointer-events: none;
  animation: footer-glow-pulse 6s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .footer-glow { animation: none; }
}
`;

export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { as?: React.ElementType };

// Magnetic hover carries real momentum from the cursor, so a spring with a
// little bounce (rather than the critically-damped default) is the correct
// call here — this is exactly the "momentum-driven" exception.
const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const ctx = gsap.context(() => {
        const onMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(element, { x: x * 0.4, y: y * 0.4, rotationX: -y * 0.15, rotationY: x * 0.15, scale: 1.05, ease: "power2.out", duration: 0.4 });
        };
        const onLeave = () => {
          gsap.to(element, { x: 0, y: 0, rotationX: 0, rotationY: 0, scale: 1, ease: "elastic.out(1, 0.3)", duration: 1.2 });
        };
        element.addEventListener("mousemove", onMove as EventListener);
        element.addEventListener("mouseleave", onLeave);
        return () => {
          element.removeEventListener("mousemove", onMove as EventListener);
          element.removeEventListener("mouseleave", onLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as React.RefObject<HTMLElement | null>).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as React.RefObject<HTMLElement | null>).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

function CopyButton({ text, children, className }: { text: string; children: React.ReactNode; className: string }) {
  const [copied, setCopied] = useState(false);
  const handleClick = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleClick} className={cn("relative overflow-hidden", className)}>
      <span
        className="flex items-center gap-2 transition-all duration-300"
        style={{ opacity: copied ? 0 : 1, transform: copied ? "translateY(-8px)" : "translateY(0)" }}
      >
        {children}
      </span>
      <span
        className="absolute inset-0 flex items-center justify-center gap-2 font-semibold text-[var(--accent)] transition-all duration-300"
        style={{ opacity: copied ? 1 : 0, transform: copied ? "translateY(0)" : "translateY(8px)" }}
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
        </svg>
        Copiado
      </span>
    </button>
  );
}

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !wrapperRef.current) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        [dividerRef.current, headingRef.current, linksRef.current],
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.15, ease: "none",
          scrollTrigger: { trigger: wrapperRef.current, start: "top bottom", end: "top 50%", scrub: 0.6 },
        }
      );
    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  const pill =
    "material btn px-6 py-4 md:px-10 md:py-5 rounded-full text-[var(--fg)] font-bold text-sm md:text-base flex items-center gap-3";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div ref={wrapperRef} className="relative w-full overflow-hidden">
        <footer className="relative flex w-full flex-col text-[var(--fg)]">
          <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-4 pt-6 pb-10 md:px-6 md:pt-10 md:pb-16">

            <div ref={dividerRef} className="mb-8 flex w-full justify-center">
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-[var(--accent-border)] to-transparent" />
            </div>

            <div className="relative flex w-full flex-col items-center">
              <div aria-hidden="true" className="footer-glow" />
              <h2
                ref={headingRef}
                className="text-display mb-10 w-full px-4 pb-2 text-center text-[11vw] sm:text-6xl md:mb-16 md:px-8 md:pb-4 md:text-5xl lg:text-8xl"
              >
                <span className="md:hidden">¡Contactame!</span>
                <span className="hidden md:inline">¿Trabajamos juntos?</span>
              </h2>
            </div>

            <div ref={linksRef} className="flex w-full flex-col items-center gap-5">
              {/* Primary: WhatsApp + X */}
              <div className="flex w-full flex-wrap justify-center gap-3 md:gap-4">
                <MagneticButton as="a" href="https://wa.me/5491167942862" target="_blank" rel="noopener noreferrer" className={pill}>
                  <svg className="h-5 w-5 text-[var(--accent)] md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp
                </MagneticButton>

                <MagneticButton as="a" href="https://x.com/maateographics" target="_blank" rel="noopener noreferrer" className={pill}>
                  <svg className="h-5 w-5 text-[var(--accent)] md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Twitter / X
                </MagneticButton>
              </div>

              {/* Secondary: Discord + Email */}
              <div className="flex w-full flex-wrap justify-center gap-3 md:gap-4">
                <CopyButton text="materosso" className={pill}>
                  <svg className="h-5 w-5 text-[var(--accent)] md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.522 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                  </svg>
                  Discord: materosso
                </CopyButton>
                <CopyButton text="rossomateoe9@gmail.com" className={pill}>
                  <Mail className="h-5 w-5 text-[var(--accent)] md:h-6 md:w-6" />
                  <span className="md:hidden">Email</span>
                  <span className="hidden md:inline">rossomateoe9@gmail.com</span>
                </CopyButton>
              </div>
            </div>
          </div>

        </footer>
      </div>
    </>
  );
}
