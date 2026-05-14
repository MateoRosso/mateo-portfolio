"use client";

import IsoLevelWarp from "@/components/ui/isometric-wave-grid-background";
import { SlideTabs } from "@/components/ui/slide-tabs";
import { Hero } from "@/components/ui/animated-hero";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { KineticScrollGallery } from "@/components/ui/kinetic-scroll-gallery";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const MORE_IMAGES = [
  `${BASE}/more-thumbnails/FOCUS.png`,
  `${BASE}/more-thumbnails/candelstick.png`,
  `${BASE}/more-thumbnails/earn-money-on-2026-2.png`,
  `${BASE}/more-thumbnails/lead-tier-list.png`,
  `${BASE}/more-thumbnails/newone4.png`,
  `${BASE}/more-thumbnails/otra%20version.png`,
  `${BASE}/more-thumbnails/this%20prints2.png`,
  `${BASE}/more-thumbnails/thumbnail%20gym%20before%20after.png`,
  `${BASE}/more-thumbnails/todo%20versus%20mejorado.png`,
];

const THUMBNAIL_IMAGES = [
  `${BASE}/thumbnails/2025.png`,
  `${BASE}/thumbnails/250kminiatura%202.png`,
  `${BASE}/thumbnails/5-consejos.png`,
  `${BASE}/thumbnails/700k-per-month-brand-thumbnail.png`,
  `${BASE}/thumbnails/another%20arrow.png`,
  `${BASE}/thumbnails/averstimulated%20brain.png`,
  `${BASE}/thumbnails/burger-bash-2026.png`,
  `${BASE}/thumbnails/day-in-life-2.png`,
  `${BASE}/thumbnails/design1.png`,
  `${BASE}/thumbnails/detox-dollar-dorado.png`,
  `${BASE}/thumbnails/dropshipping-on-x.png`,
  `${BASE}/thumbnails/dropshipping-thumb.png`,
  `${BASE}/thumbnails/earn-money-with-ai.png`,
  `${BASE}/thumbnails/experiencia-banana-rancia.png`,
  `${BASE}/thumbnails/Henry-Purchase.png`,
  `${BASE}/thumbnails/jeffery-epstein.png`,
  `${BASE}/thumbnails/matias-bottero-miniatura-1.png`,
  `${BASE}/thumbnails/matias-bottero-miniatura.png`,
  `${BASE}/thumbnails/Pakow%20costa%20rica.png`,
  `${BASE}/thumbnails/retire-in-5-years.png`,
  `${BASE}/thumbnails/rubiks-cube.png`,
  `${BASE}/thumbnails/scrabble%201.png`,
  `${BASE}/thumbnails/setp-by-step.png`,
  `${BASE}/thumbnails/this%20keeps%20you%20broke.png`,
  `${BASE}/thumbnails/thumbnail%20revamp%20masato%20creator.png`,
  `${BASE}/thumbnails/thumbnail-leads.png`,
  `${BASE}/thumbnails/1m-month-youtube.png`,
];



export default function Home() {
  const [showMore, setShowMore] = useState(false);

  return (
    <main className="bg-[#0a0a0a]">
      {/* HERO */}
      <section id="inicio" className="relative h-screen overflow-hidden">
        <IsoLevelWarp color="74, 222, 128" speed={1.2} density={45} />
        <SlideTabs />
        <Hero />
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="relative bg-[#0a0a0a] pt-24 pb-10 md:min-h-screen">
        <div className="text-center px-4 mb-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-[#a3e635] mb-4">
              Mi trabajo
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-white">
              Portfolio
            </h2>
          </motion.div>
        </div>

        <div className="flex justify-center mb-8">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#a3e635]/50 to-transparent" />
        </div>

        {/* Button toggle all portfolio */}
        <div className="flex flex-col items-center px-4 max-w-5xl mx-auto">
          <button
            onClick={() => setShowMore((v) => !v)}
            className="group relative h-12 px-10 rounded-full overflow-hidden border border-[#a3e635]/30 bg-[#0a0a0a] transition-all duration-300 hover:border-[#a3e635]/60 hover:shadow-[0_0_24px_rgba(163,230,53,0.15)]"
          >
            <span className="relative flex items-center gap-2 text-sm font-semibold text-[#a3e635] tracking-wide">
              {showMore ? "Ver menos" : "Ver trabajos"}
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showMore ? "rotate-180" : ""}`} />
            </span>
          </button>

          <AnimatePresence>
            {showMore && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full overflow-hidden"
              >
                <KineticScrollGallery images={[...THUMBNAIL_IMAGES, ...MORE_IMAGES]} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* FOOTER */}
      <div id="contacto">
        <CinematicFooter />
      </div>
    </main>
  );
}
