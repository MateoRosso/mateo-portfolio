"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HeroBackground } from "@/components/ui/hero-background";
import { MarqueeRow } from "@/components/ui/marquee-row";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

function HeroMarquee({ images, reverse }: { images: string[]; reverse?: boolean }) {
  return (
    <MarqueeRow
      images={images}
      reverse={reverse}
      speed={110.95}
      fadeDelay={1}
      trackClassName="flex w-max items-center gap-2"
      renderTile={(src, i) => (
        <div
          key={i}
          className="relative h-[110px] w-[199px] flex-none overflow-hidden border border-[var(--border)] bg-black/40 shadow-[0_8px_24px_rgba(0,0,0,0.5)] sm:h-[132px] sm:w-[242px] md:h-[176px] md:w-[310px]"
        >
          <div
            className="absolute -inset-px bg-cover bg-center"
            style={{ backgroundImage: `url("${src}")` }}
          />
        </div>
      )}
    />
  );
}

const MARQUEE_ROW_COUNT = 4;

function splitIntoRows(images: string[], rowCount: number): string[][] {
  const rows: string[][] = Array.from({ length: rowCount }, () => []);
  images.forEach((src, i) => rows[i % rowCount].push(src));
  return rows;
}

function Hero({ images = [] }: { images?: string[] }) {
  const rows = splitIntoRows(images, MARQUEE_ROW_COUNT);

  return (
    <>
      <HeroBackground />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-28 pb-10 text-center">
      <motion.div
        initial={{ opacity: 0, transform: "translateY(28px)" }}
        animate={{ opacity: 1, transform: "translateY(0px)" }}
        transition={{ duration: 0.7, delay: 0.28, ease: EASE_OUT }}
        className="max-w-4xl"
      >
        {/* Placeholder headline — swap for the real pitch */}
        <h1 className="text-display text-[clamp(2.25rem,6.4vw,5.5rem)] [font-family:var(--font-garamond)] [font-weight:700]!">
          <span className="text-[var(--accent)]">Mereces ser visto.</span>
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, transform: "translateY(20px)" }}
        animate={{ opacity: 1, transform: "translateY(0px)" }}
        transition={{ duration: 0.7, delay: 0.4, ease: EASE_OUT }}
        className=" max-w-xl"
      >
        {/* Placeholder subhead — swap for the real pitch */}
        <p className="text-body text-base sm:text-lg">
          Diseño miniaturas para creadores de todo el mundo
          
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, transform: "translateY(16px)" }}
        animate={{ opacity: 1, transform: "translateY(0px)" }}
        transition={{ duration: 0.7, delay: 0.52, ease: EASE_OUT }}
        className="mt-9 flex flex-wrap items-center justify-center gap-3"
      >
        <Button
          variant="primary"
          onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
        >
          Aumenta tu CTR
        </Button>
        <Button
          variant="secondary"
          onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
        >
          Mis trabajos
        </Button>
      </motion.div>

      {images.length > 0 && (
        <div id="portfolio" className="mt-10 flex w-full flex-col gap-2.5">
          {rows.map((row, i) => (
            <HeroMarquee key={i} images={row} reverse={i % 2 === 1} />
          ))}
        </div>
      )}
      </div>
    </>
  );
}

export { Hero };
