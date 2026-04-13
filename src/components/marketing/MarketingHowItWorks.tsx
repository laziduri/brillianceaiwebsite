"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link2, CalendarDays, Sparkles, Send } from "lucide-react";
import { marketingHowItWorks } from "@/data/marketing-landing";

const EASE = [0.22, 1, 0.36, 1] as const;
const ICONS = { Link2, CalendarDays, Sparkles, Send } as const;

export default function MarketingHowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="border-t border-white/[0.06] py-20 md:py-28"
      aria-labelledby="marketing-how-heading"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-3 text-center text-[12px] font-medium uppercase tracking-[0.14em] text-white/35"
        >
          {marketingHowItWorks.eyebrow}
        </motion.p>
        <motion.h2
          id="marketing-how-heading"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
          className="mx-auto mb-14 max-w-[720px] text-center text-[clamp(26px,3.5vw,40px)] font-medium leading-[1.12] tracking-[-0.04em] gradient-text-subtle md:mb-16"
        >
          {marketingHowItWorks.headline}
        </motion.h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {marketingHowItWorks.steps.map((step, i) => {
            const Icon =
              ICONS[step.icon as keyof typeof ICONS] ?? Sparkles;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + i * 0.1,
                  ease: EASE,
                }}
                className="glass-card hover-lift relative overflow-hidden rounded-2xl border border-white/[0.06] p-7 md:p-8"
              >
                {/* watermark number */}
                <span
                  className="pointer-events-none absolute -right-1 -top-3 select-none text-[72px] font-bold leading-none tracking-[-0.06em] text-white/[0.03] md:text-[80px]"
                  aria-hidden
                >
                  {step.step}
                </span>

                <div className="relative z-[1]">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] transition-colors duration-300 group-hover:border-white/[0.12]">
                    <Icon
                      className="h-5 w-5 text-white/50"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="mb-2.5 text-[16px] font-medium tracking-[-0.02em] text-white/85 md:text-[17px]">
                    {step.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed tracking-[-0.01em] text-white/40 md:text-[15px]">
                    {step.description}
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
