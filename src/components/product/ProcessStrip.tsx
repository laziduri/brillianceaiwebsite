"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ProcessStep } from "@/data/products";

export function ProcessStrip({ steps }: { steps: ProcessStep[] }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      aria-labelledby="process-heading"
      className="relative border-t border-white/[0.04]"
    >
      <div className="mx-auto max-w-[1200px] px-6 py-24 md:px-10 md:py-32 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 max-w-2xl md:mb-16"
        >
          <div className="mb-4 text-[12px] font-medium uppercase tracking-[0.15em] text-white/30">
            How we build it
          </div>
          <h2
            id="process-heading"
            className="gradient-text text-[clamp(28px,4vw,44px)] font-medium leading-[1.1] tracking-[-0.04em]"
          >
            From scope to live, in four weeks.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.15 + i * 0.1,
              }}
              className="group relative rounded-2xl border border-white/[0.06] bg-[#101014] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors hover:border-white/[0.12]"
            >
              <div
                className="absolute right-5 top-4 text-[44px] font-medium leading-none tracking-[-0.04em] text-white/[0.04]"
                aria-hidden
              >
                0{i + 1}
              </div>
              <div className="mb-3 inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/55">
                {step.duration}
              </div>
              <h3 className="text-[17px] font-medium tracking-[-0.02em] text-white md:text-[18px]">
                {step.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/55 md:text-[14px]">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
