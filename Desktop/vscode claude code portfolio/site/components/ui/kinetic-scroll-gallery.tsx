"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Tile, TileConfig, Side } from "@/components/ui/scroll-tilted-grid";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isDesktop;
}

const DESKTOP_SIDES: Side[] = ["L", "C", "R"];

export function KineticScrollGallery({ images }: { images: readonly string[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const isDesktop = useIsDesktop();

  const config = useMemo<TileConfig>(
    () => ({ aspectRatio: "16/9", perspective: 900, maxTilt: 70, maxBlur: 8, rounded: "0.75rem" }),
    []
  );

  return (
    <>
      <div className="mx-auto mt-[10vh] mb-[10vh] grid w-full grid-cols-2 md:grid-cols-3 max-w-2xl md:max-w-5xl px-4 md:px-6 py-[10vh] gap-4 md:gap-10">
        {images.map((img, i) => (
          <Tile
            key={img}
            src={img}
            side={isDesktop ? DESKTOP_SIDES[i % 3] : "C"}
            config={config}
            onClick={() => setSelected(img)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-999 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full max-h-[90vh] rounded-2xl overflow-hidden"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selected}
                alt="Miniatura"
                width={1280}
                height={720}
                className="w-full h-auto object-contain"
              />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/90 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
