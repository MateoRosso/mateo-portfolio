"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const TABS = ["Inicio", "Portfolio", "Contacto"];
const SECTION_IDS = ["inicio", "portfolio", "contacto"];

export const SlideTabs = () => {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });
  const [selected, setSelected] = useState(0);
  const tabsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const selectedTab = tabsRef.current[selected];
    if (selectedTab) {
      const { width } = selectedTab.getBoundingClientRect();
      setPosition({ left: selectedTab.offsetLeft, width, opacity: 1 });
    }
  }, [selected]);

  const handleTabClick = (index: number) => {
    setSelected(index);
    const el = document.getElementById(SECTION_IDS[index]);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4">
      <ul
        onMouseLeave={() => {
          const selectedTab = tabsRef.current[selected];
          if (selectedTab) {
            const { width } = selectedTab.getBoundingClientRect();
            setPosition({ left: selectedTab.offsetLeft, width, opacity: 1 });
          }
        }}
        className="relative flex w-fit rounded-full border border-[#a3e635]/30 bg-black/60 backdrop-blur-md p-1 shadow-[0_0_20px_rgba(163,230,53,0.15)]"
      >
        {TABS.map((tab, i) => (
          <Tab
            key={tab}
            ref={(el) => { tabsRef.current[i] = el; }}
            setPosition={setPosition}
            onClick={() => handleTabClick(i)}
          >
            {tab}
          </Tab>
        ))}
        <Cursor position={position} />
      </ul>
    </nav>
  );
};

interface TabProps {
  children: React.ReactNode;
  setPosition: (pos: { left: number; width: number; opacity: number }) => void;
  onClick: () => void;
}

const Tab = React.forwardRef<HTMLLIElement, TabProps>(
  ({ children, setPosition, onClick }, ref) => {
    return (
      <li
        ref={ref}
        onClick={onClick}
        onMouseEnter={() => {
          if (!ref || typeof ref === "function" || !ref.current) return;
          const { width } = ref.current.getBoundingClientRect();
          setPosition({ left: ref.current.offsetLeft, width, opacity: 1 });
        }}
        className="relative z-10 block cursor-pointer px-4 py-2 text-xs uppercase tracking-widest text-white mix-blend-difference md:px-6 md:py-2.5 md:text-sm font-medium select-none"
      >
        {children}
      </li>
    );
  }
);
Tab.displayName = "Tab";

const Cursor = ({ position }: { position: { left: number; width: number; opacity: number } }) => (
  <motion.li
    animate={{ ...position }}
    className="absolute z-0 h-8 rounded-full bg-[#a3e635] md:h-9"
  />
);
