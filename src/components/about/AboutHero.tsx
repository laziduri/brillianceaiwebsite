"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export default function AboutHero() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion();

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="relative overflow-hidden bg-black pt-28 pb-20 md:pt-32 md:pb-24">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 35%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.015) 45%, transparent 70%)",
        }}
        aria-hidden
      />

      <div ref={ref} className="mx-auto max-w-[1100px] px-6 md:px-10">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="mb-4 text-[12px] font-medium uppercase tracking-[0.15em] text-white/40"
        >
          About us
        </motion.p>

        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.05, ease }}
          className="text-[clamp(34px,5vw,64px)] font-medium leading-[1.02] tracking-[-0.06em] gradient-text"
        >
          Built for execution.
          <br />
          Designed for real work.
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.12, ease }}
          className="mt-5 max-w-2xl text-[16px] font-normal leading-relaxed tracking-[-0.02em] text-white/55 md:text-[18px]"
        >
          BrillianceAI designs and implements structured, agentic AI workflows
          across sales, marketing, and operations — so AI becomes part of how
          your business runs, not a side tool.
        </motion.p>

        <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>
    </section>
  );
}

