"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { marketingClosingCta } from "@/data/marketing-landing";

export default function MarketingClosingCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      id="marketing-contact"
      className="section-padding relative overflow-hidden border-t border-white/[0.04]"
      aria-labelledby="marketing-closing-heading"
    >
      <div className="relative z-[1] mx-auto max-w-[800px] px-6 text-center md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card relative overflow-hidden rounded-2xl p-12 md:p-16"
        >
          <div className="absolute left-1/2 top-0 h-px w-[120px] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mb-5 block text-[12px] font-medium uppercase tracking-[0.15em] text-white/25"
          >
            Next step
          </motion.span>

          <motion.h2
            id="marketing-closing-heading"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="mb-5 text-[clamp(26px,4vw,44px)] font-medium leading-[1.1] tracking-[-0.04em] gradient-text-subtle"
          >
            {marketingClosingCta.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="mx-auto mb-10 max-w-md text-[14px] font-normal leading-relaxed tracking-[-0.01em] text-white/35"
          >
            {marketingClosingCta.line}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <Link href={marketingClosingCta.ctaPrimary.href} className="btn-primary-sm">
              <span>{marketingClosingCta.ctaPrimary.label}</span>
            </Link>
            <Link href={marketingClosingCta.ctaSecondary.href} className="btn-secondary-sm">
              <span>{marketingClosingCta.ctaSecondary.label}</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
