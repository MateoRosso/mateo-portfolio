"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

.cinematic-footer-wrapper {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  --pill-bg-1: rgba(163, 230, 53, 0.06);
  --pill-bg-2: rgba(163, 230, 53, 0.02);
  --pill-shadow: rgba(0,0,0,0.5);
  --pill-highlight: rgba(163, 230, 53, 0.12);
  --pill-inset-shadow: rgba(0,0,0,0.6);
  --pill-border: rgba(163, 230, 53, 0.15);
  --pill-bg-1-hover: rgba(163, 230, 53, 0.12);
  --pill-bg-2-hover: rgba(163, 230, 53, 0.04);
  --pill-border-hover: rgba(163, 230, 53, 0.4);
  --pill-shadow-hover: rgba(163, 230, 53, 0.15);
  --pill-highlight-hover: rgba(163, 230, 53, 0.25);
}

@keyframes footer-breathe {
  0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.4; }
  100% { transform: translate(-50%, -50%) scale(1.12); opacity: 0.7; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1);   filter: drop-shadow(0 0 5px rgba(163,230,53,0.5)); }
  15%, 45% { transform: scale(1.25); filter: drop-shadow(0 0 12px rgba(163,230,53,0.9)); }
  30%      { transform: scale(1); }
}

.animate-footer-breathe      { animation: footer-breathe 8s ease-in-out infinite alternate; }
.animate-footer-scroll-marquee{ animation: footer-scroll-marquee 35s linear infinite; }
.animate-footer-heartbeat     { animation: footer-heartbeat 2s cubic-bezier(0.25,1,0.5,1) infinite; }

.footer-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, rgba(163,230,53,0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(163,230,53,0.04) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    rgba(163,230,53,0.12) 0%,
    rgba(74,222,128,0.08) 40%,
    transparent 70%
  );
}

.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 0 10px 30px -10px var(--pill-shadow), inset 0 1px 1px var(--pill-highlight), inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 0 20px 40px -10px var(--pill-shadow-hover), inset 0 1px 1px var(--pill-highlight-hover);
  color: #ffffff;
}

.footer-giant-bg-text {
  font-size: 26vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(163,230,53,0.07);
  background: linear-gradient(180deg, rgba(163,230,53,0.1) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

.footer-text-glow {
  background: linear-gradient(180deg, #ffffff 0%, rgba(163,230,53,0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 24px rgba(163,230,53,0.2));
}
`;

export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { as?: React.ElementType };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

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
          (localRef as React.MutableRefObject<HTMLElement | null>).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
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
        className="absolute inset-0 flex items-center justify-center gap-2 text-[#a3e635] font-semibold transition-all duration-300"
        style={{ opacity: copied ? 1 : 0, transform: copied ? "translateY(0)" : "translateY(8px)" }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
        </svg>
        Copiado
      </span>
    </button>
  );
}

const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>Miniaturas que generan clics</span> <span className="text-[#a3e635]/60">✦</span>
    <span>Entrega en 24–48hs</span> <span className="text-[#4ade80]/60">✦</span>
    <span>Revisiones ilimitadas</span> <span className="text-[#a3e635]/60">✦</span>
    <span>Respuesta rápida</span> <span className="text-[#4ade80]/60">✦</span>
    <span>MateoGraphics</span> <span className="text-[#a3e635]/60">✦</span>
  </div>
);

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !wrapperRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, ease: "power3.out", duration: 0.8,
          scrollTrigger: { trigger: wrapperRef.current, start: "top 80%", toggleActions: "play none none none" } }
      );
    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div ref={wrapperRef} className="relative w-full">
        <footer className="relative flex w-full flex-col bg-[#0a0a0a] text-white cinematic-footer-wrapper">
          <div className="relative z-10 flex flex-col items-center pt-10 pb-8 md:py-24 px-4 md:px-6 w-full max-w-5xl mx-auto">

            <h2 ref={headingRef} className="text-[11vw] sm:text-6xl md:text-5xl lg:text-8xl font-black footer-text-glow tracking-tight mb-10 md:mb-20 text-center px-4 md:px-8 w-full pb-2 md:pb-4">
              <span className="md:hidden">¡Contactame!</span>
              <span className="hidden md:inline">¿Trabajamos juntos?</span>
            </h2>

            <div ref={linksRef} className="flex flex-col items-center gap-5 w-full">
              {/* Primary: WhatsApp + X + Instagram */}
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 w-full">
                <MagneticButton as="a" href="https://wa.me/5491167942862" target="_blank" rel="noopener noreferrer"
                  className="footer-glass-pill px-6 py-4 md:px-10 md:py-5 rounded-full text-white font-bold text-sm md:text-base flex items-center gap-3">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-[#a3e635]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp
                </MagneticButton>

                <MagneticButton as="a" href="https://x.com/maateographics" target="_blank" rel="noopener noreferrer"
                  className="footer-glass-pill px-6 py-4 md:px-10 md:py-5 rounded-full text-white font-bold text-sm md:text-base flex items-center gap-3">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-[#a3e635]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Twitter / X
                </MagneticButton>

                <MagneticButton as="a" href="https://www.instagram.com/mateoo.rosso/" target="_blank" rel="noopener noreferrer"
                  className="footer-glass-pill px-6 py-4 md:px-10 md:py-5 rounded-full text-white font-bold text-sm md:text-base flex items-center gap-3">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-[#a3e635]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                  Instagram
                </MagneticButton>
              </div>

              {/* Secondary: Discord + Email */}
              <div className="flex flex-wrap justify-center gap-3 md:gap-5 w-full">
                <CopyButton text="materosso" className="footer-glass-pill px-6 py-3 rounded-full text-[#a3e635]/70 font-medium text-xs md:text-sm hover:text-white cursor-pointer">
                  Discord: materosso
                </CopyButton>
                <CopyButton text="rossomateoe9@gmail.com" className="footer-glass-pill px-6 py-3 rounded-full text-[#a3e635]/70 font-medium text-xs md:text-sm hover:text-white cursor-pointer">
                  <span className="md:hidden">Email</span>
                  <span className="hidden md:inline">rossomateoe9@gmail.com</span>
                </CopyButton>
              </div>

              {/* Copyright + scroll to top inline */}
              <div className="flex items-center justify-between w-full mt-6 pt-6 border-t border-[#a3e635]/10">
                <span className="text-[#a3e635]/30 text-[10px] md:text-xs font-semibold tracking-widest uppercase">
                  © {new Date().getFullYear()} MateoGraphics
                </span>
                <MagneticButton as="button" onClick={scrollToTop}
                  className="w-10 h-10 rounded-full footer-glass-pill flex items-center justify-center text-[#a3e635]/50 hover:text-[#a3e635] group">
                  <svg className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </MagneticButton>
              </div>
            </div>
          </div>

        </footer>
      </div>
    </>
  );
}
