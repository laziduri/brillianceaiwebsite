"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { marketingSolution } from "@/data/marketing-landing";
import { Sparkles, BarChart3, Send } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const ICONS = [Sparkles, BarChart3, Send] as const;

export default function MarketingSolution() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="border-t border-white/[0.06] py-20 md:py-28"
      aria-labelledby="marketing-solution-heading"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <motion.h2
          id="marketing-solution-heading"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE }}
          className="mx-auto mb-5 max-w-[820px] text-center text-[clamp(26px,3.5vw,40px)] font-medium leading-[1.12] tracking-[-0.04em] gradient-text-subtle"
        >
          {marketingSolution.headline}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="mx-auto mb-14 max-w-lg text-center text-[15px] leading-relaxed tracking-[-0.02em] text-white/40 md:mb-16 md:text-[16px]"
        >
          {marketingSolution.line}
        </motion.p>

        {"pillars" in marketingSolution && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-5 lg:gap-6">
            {(
              marketingSolution as typeof marketingSolution & {
                pillars: readonly { title: string; description: string }[];
              }
            ).pillars.map((pillar, i) => {
              const Icon = ICONS[i] ?? Sparkles;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + i * 0.12,
                    ease: EASE,
                  }}
                  className="glass-card hover-lift rounded-2xl border border-white/[0.06] p-8 md:p-10"
                >
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03]">
                    <Icon
                      className="h-5 w-5 text-white/50"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="mb-3 text-[17px] font-medium tracking-[-0.02em] text-white/85 md:text-[18px]">
                    {pillar.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed tracking-[-0.01em] text-white/40 md:text-[15px]">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
