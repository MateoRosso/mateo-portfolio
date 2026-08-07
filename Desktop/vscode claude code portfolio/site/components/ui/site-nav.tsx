"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const LINKS = [
  { href: "#proceso", label: "Proceso" },
  { href: "#contacto", label: "Contacto" },
];

export function SiteNav() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <div
      className="fixed top-4 left-1/2 z-50 -translate-x-1/2"
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <motion.header
        initial={false}
        animate={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0px)" : "translateY(-12px)",
        }}
        transition={{ duration: 0.3, ease: EASE_OUT }}
        className="material-strong flex items-center gap-1 rounded-full py-1.5 pr-1.5 pl-4"
      >
        <span className="mr-2 hidden text-xs font-semibold tracking-tight text-[var(--fg)] sm:inline">
          MateoGraphics
        </span>
        <nav className="flex items-center gap-1">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleClick(link.href)}
              className="btn rounded-full px-3.5 py-2 text-xs font-medium text-[var(--fg-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--fg)]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </motion.header>
    </div>
  );
}
