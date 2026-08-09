"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

// "Portfolio" is the first thing to drop on very narrow screens — Proceso +
// Contacto always fit, Portfolio only rejoins once there's room (380px+).
const LINKS = [
  { href: "#portfolio", label: "Portfolio", className: "hidden min-[380px]:flex" },
  { href: "#proceso", label: "Proceso" },
];

export function SiteNav() {
  const reduceMotion = useReducedMotion();

  const handleClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <div className="absolute top-4 left-1/2 z-50 w-[92%] max-w-2xl -translate-x-1/2">
      <motion.header
        initial={{ opacity: 0, transform: "translateY(-12px)" }}
        animate={{ opacity: 1, transform: "translateY(0px)" }}
        transition={{ duration: 0.4, delay: 0.1, ease: EASE_OUT }}
        className="material-strong flex items-center justify-between gap-5 rounded-full py-2.5 pr-2.5 pl-6"
      >
        <span className="hidden text-2xl tracking-tight text-[var(--accent)] [-webkit-text-stroke:0.7px_var(--accent)] sm:block">
          MateoGraphics
        </span>
        <nav className="flex items-center gap-1">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleClick(link.href)}
              className={cn(
                "btn rounded-full px-4.5 py-2.5 text-sm font-medium text-[var(--fg-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--fg)]",
                link.className
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <Button variant="primary" size="default" onClick={handleClick("#contacto")}>
          Contacto
        </Button>
      </motion.header>
    </div>
  );
}
