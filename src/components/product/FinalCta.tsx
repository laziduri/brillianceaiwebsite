"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function FinalCta({ headline, sub }: { headline: string; sub: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      aria-labelledby="final-cta-heading"
      className="relative border-t border-white/[0.04]"
    >
      <div className="relative mx-auto max-w-[1200px] overflow-hidden px-6 py-24 md:px-10 md:py-32 lg:py-40">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="glow-orb glow-orb-white absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative mx-auto max-w-3xl text-center">
          <motion.h2
            id="final-cta-heading"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="gradient-text text-[clamp(30px,4.4vw,52px)] font-medium leading-[1.08] tracking-[-0.04em]"
          >
            {headline}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed tracking-[-0.01em] text-white/55 md:text-[16px]"
          >
            {sub}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <Link href="/contact/sales" className="btn-primary">
              <span>Book a 30-min scope session</span>
            </Link>
            <Link href="/blog/what-is-agentic-ai" className="btn-secondary">
              <span>Read the guide</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
