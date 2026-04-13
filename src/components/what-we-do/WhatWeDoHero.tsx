"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function WhatWeDoHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[50vh] w-full flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-28 md:px-10 md:pb-20 md:pt-36">
      <div className="pointer-events-none absolute inset-0 opacity-[0.25]" aria-hidden>
        <div className="glow-orb glow-orb-white absolute left-1/2 top-[10%] h-[min(450px,65vw)] w-[min(450px,65vw)] -translate-x-1/2" />
      </div>

      <div className="relative z-[1] text-center">
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
          className="hero-headline mx-auto max-w-[800px] gradient-text"
          style={{ fontSize: "clamp(38px, 5.5vw, 68px)" }}
        >
          What we do.
        </motion.h1>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-[1] h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
}
