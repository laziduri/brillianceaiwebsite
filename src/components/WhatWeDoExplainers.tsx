"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Workflow, Plug, ShieldCheck } from "lucide-react";

const ITEMS = [
  {
    title: "Designed around your process",
    description:
      "We map your real workflow end-to-end — then design agents that follow it reliably, with clear handoffs and guardrails.",
    icon: Workflow,
  },
  {
    title: "Integrated into your stack",
    description:
      "Connect to the tools you already use: CRM, email, WhatsApp, calendars, docs, and internal systems — without breaking what works.",
    icon: Plug,
  },
  {
    title: "Built for control and safety",
    description:
      "Structured outputs, approvals where needed, audit-friendly logs, and fallbacks that keep operations moving when edge cases happen.",
    icon: ShieldCheck,
  },
];

export default function WhatWeDoExplainers() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-[#050507]"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-14 flex flex-col gap-6 md:mb-18 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-4 block text-[12px] font-medium uppercase tracking-[0.15em] text-white/25"
            >
              What you get
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="text-[clamp(28px,4vw,48px)] font-medium leading-[1.1] tracking-[-0.04em] gradient-text-subtle"
            >
              Systems that behave.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="max-w-lg text-[14px] font-normal leading-relaxed tracking-[-0.01em] text-white/35 md:text-right"
          >
            Not “chatbots” — production workflows designed for consistency,
            uptime, and real outcomes.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.18 + idx * 0.08 }}
                className="glass-card hover-lift relative overflow-hidden p-7"
              >
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 60% at 40% 20%, rgba(255,255,255,0.05) 0%, transparent 60%)",
                  }}
                  aria-hidden
                />
                <div className="relative">
                  <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.04]">
                    <Icon className="h-4 w-4 text-white/55" />
                  </div>
                  <h3 className="mb-2 text-[15px] font-medium tracking-[-0.02em] text-white/75">
                    {item.title}
                  </h3>
                  <p className="text-[12.5px] font-normal leading-relaxed tracking-[-0.01em] text-white/22">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

