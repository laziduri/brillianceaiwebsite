"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { marketingStats } from "@/data/marketing-landing";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function MarketingStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="border-t border-white/[0.06] py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-5 lg:gap-6">
          {marketingStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.1 + i * 0.12,
                ease: EASE,
              }}
              className="glass-card hover-lift rounded-2xl border border-white/[0.06] p-8 text-center md:p-10"
            >
              <span className="block text-[clamp(36px,5vw,52px)] font-semibold leading-none tracking-[-0.04em] gradient-text">
                {stat.number}
              </span>
              <span className="mt-3 block text-[15px] font-medium tracking-[-0.02em] text-white/70 md:text-[16px]">
                {stat.label}
              </span>
              <span className="mt-1.5 block text-[13px] tracking-[-0.01em] text-white/30">
                {stat.sublabel}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
