"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { marketingRevealStatement } from "@/data/marketing-landing";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function MarketingRevealStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-120px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-white/[0.04] py-24 md:py-32"
    >
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        aria-hidden
      >
        <div className="glow-orb glow-orb-white absolute left-1/2 top-1/2 h-[min(500px,70vw)] w-[min(500px,70vw)] -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-[1] mx-auto max-w-[900px] px-6 text-center md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={
            inView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : {}
          }
          transition={{ duration: 0.9, ease: EASE }}
          className="hero-headline gradient-text"
          style={{ fontSize: "clamp(30px, 4.5vw, 56px)" }}
        >
          {marketingRevealStatement}
        </motion.p>
      </div>
    </section>
  );
}
