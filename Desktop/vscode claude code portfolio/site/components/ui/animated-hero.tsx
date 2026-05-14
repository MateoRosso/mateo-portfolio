"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["impactantes", "creativas", "únicas", "profesionales", "memorables"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((n) => (n === titles.length - 1 ? 0 : n + 1));
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <h1 className="text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] font-black tracking-tighter text-white leading-none">
          Miniaturas
        </h1>
        <div className="relative text-4xl sm:text-5xl md:text-7xl lg:text-8xl h-[1.2em] overflow-hidden -mt-2">
          {titles.map((title, index) => (
            <motion.span
              key={index}
              className="absolute inset-0 flex items-center justify-center font-black tracking-tighter"
              style={{
                background: "linear-gradient(135deg, #a3e635 0%, #4ade80 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              initial={{ opacity: 0, y: 160 }}
              transition={{ type: "spring", stiffness: 55, damping: 18 }}
              animate={
                titleNumber === index
                  ? { y: 0, opacity: 1 }
                  : { y: titleNumber > index ? -160 : 160, opacity: 0 }
              }
            >
              {title}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="text-lg md:text-xl text-gray-400 tracking-wide mt-6 max-w-md"
      >
        Miniaturas que generan clics
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Scroll</span>
        <div className="h-10 w-px bg-gradient-to-b from-[#a3e635]/60 to-transparent animate-pulse" />
      </motion.div>
    </div>
  );
}

export { Hero };
