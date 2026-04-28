"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Workflow } from "@/data/products";
import { WorkflowSurface } from "./WorkflowSurface";

export function WorkflowSection({
  workflow,
  reverse = false,
}: {
  workflow: Workflow;
  reverse?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id={workflow.id}
      aria-labelledby={`${workflow.id}-heading`}
      className="relative border-t border-white/[0.04]"
    >
      <div className="mx-auto max-w-[1200px] px-6 py-24 md:px-10 md:py-32 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 md:mb-14 max-w-3xl"
        >
          <div className="mb-4 flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.15em] text-white/30">
            <span className="tabular-nums text-white/60">{workflow.index}</span>
            <span className="h-px w-8 bg-white/15" aria-hidden />
            <span>Workflow</span>
          </div>
          <h2
            id={`${workflow.id}-heading`}
            className="gradient-text text-[clamp(28px,4vw,44px)] font-medium leading-[1.1] tracking-[-0.04em]"
          >
            {workflow.title}
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed tracking-[-0.01em] text-white/55 md:text-[16px]">
            {workflow.sub}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mb-12 md:mb-16"
        >
          <WorkflowSurface nodes={workflow.nodes} />
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-16">
          <div>
            <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.14em] text-white/30">
              What the agent does
            </div>
            <ol className="space-y-3.5">
              {workflow.steps.map((step, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : undefined}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.25 + i * 0.08,
                  }}
                  className="flex gap-3.5 text-[14px] leading-relaxed tracking-[-0.01em] text-white/65 md:text-[15px]"
                >
                  <span
                    className="mt-[2px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[10px] font-medium text-white/55"
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </motion.li>
              ))}
            </ol>
          </div>

          <div>
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-5 md:p-6">
              <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
                Outcome
              </div>
              <p className="text-[14px] leading-relaxed tracking-[-0.01em] text-white/80 md:text-[15px]">
                {workflow.outcome}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
