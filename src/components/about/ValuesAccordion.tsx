"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useId, useMemo, useState } from "react";

type ValueItem = {
  title: string;
  body: string;
};

const VALUE_ICONS: Record<string, { src: string; alt: string }> = {
  "Built on Quality": {
    src: "/Built-on-Quality-icon.png",
    alt: "Built on Quality icon",
  },
  "Driven by Clarity": {
    src: "/Driven-by-clarity-icon.png",
    alt: "Driven by Clarity icon",
  },
  "Delivered with Honesty": {
    src: "/Delivered-with-honesty-icon.png",
    alt: "Delivered with Honesty icon",
  },
  "Results Through Execution": {
    // Note: filename includes a typo ("rhrough").
    src: "/results-rhrough-execution-icon.png",
    alt: "Results Through Execution icon",
  },
  "Systems That Last": {
    src: "/systems-that-last-icon.png",
    alt: "Systems That Last icon",
  },
};

const VALUES: readonly ValueItem[] = [
  {
    title: "Built on Quality",
    body: "We do not build off-the-shelf systems.\n\nEvery workflow is designed around your business, your processes, and how your team actually operates.\n\nWe take the time to understand your flow before building anything, ensuring the system fits naturally into your operations and delivers consistent results.",
  },
  {
    title: "Driven by Clarity",
    body: "AI should not feel confusing.\n\nWe guide you through the entire process, from understanding your workflow to building systems that fit how your business operates.\n\nEvery step is explained clearly, so you know exactly what is being built, how it works, and where it creates value.\n\nNo unnecessary complexity. No hidden processes.\nJust clear systems designed to work.",
  },
  {
    title: "Delivered with Honesty",
    body: "We approach things differently.\n\nAs AI evolves, the way systems are built is changing. Delivery is faster and more efficient, and businesses should benefit from that.\n\nOur pricing reflects real value, clear scope, and what is actually being delivered.\n\nNo inflated costs. No unnecessary complexity.\nWhat we promise is what we deliver.",
  },
  {
    title: "Results Through Execution",
    body: "Ideas do not create results. Execution does.\n\nWe build workflows that improve how work is actually done across sales, marketing, and operations.\n\nEverything we deliver is designed to create measurable impact.",
  },
  {
    title: "Systems That Last",
    body: "AI is evolving quickly, and most systems are not built to keep up.\n\nWe approach it differently.\n\nOur workflows are designed to adapt as technology improves and as your business grows.\n\nWe do not leave you with a static system that becomes outdated.\nWe provide ongoing support to refine, improve, and keep your workflows relevant over time.\n\nIn a fast-changing environment, longevity matters.",
  },
];

export default function ValuesAccordion() {
  const reduceMotion = useReducedMotion();
  const baseId = useId();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const items = useMemo(() => VALUES, []);
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="mb-10 text-center md:mb-12">
          <h2 className="mx-auto mt-3 max-w-3xl text-[clamp(34px,6vw,72px)] font-medium leading-[1.02] tracking-[-0.07em] gradient-text">
            Our values
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[14px] leading-relaxed tracking-[-0.01em] text-white/65">
            The principles behind every workflow we design.
          </p>
        </div>

        <div className="mx-auto max-w-[980px] space-y-3">
          {items.map((item, idx) => {
            const isOpen = openIdx === idx;
            const panelId = `${baseId}-panel-${idx}`;
            const buttonId = `${baseId}-button-${idx}`;
            const icon = VALUE_ICONS[item.title];

            return (
              <div key={item.title} className="glass-card rounded-2xl">
                <button
                  id={buttonId}
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIdx((cur) => (cur === idx ? null : idx))}
                >
                  <span className="flex items-center gap-3">
                    {icon ? (
                      <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02]">
                        <Image
                          src={icon.src}
                          alt={icon.alt}
                          fill
                          sizes="36px"
                          className="object-cover"
                        />
                      </span>
                    ) : null}
                    <span className="text-[15px] font-medium tracking-[-0.02em] text-white/80">
                      {item.title}
                    </span>
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-white/40 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    strokeWidth={1.8}
                    aria-hidden
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={
                        reduceMotion
                          ? { opacity: 1 }
                          : { height: "auto", opacity: 1 }
                      }
                      exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1">
                        <p className="whitespace-pre-line text-[14px] leading-relaxed tracking-[-0.01em] text-white/65">
                          {item.body}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

