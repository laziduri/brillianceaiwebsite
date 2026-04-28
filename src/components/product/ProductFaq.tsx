"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { FaqItem } from "@/data/products";
import { FAQList } from "@/components/blog/BlogRenderer";

export function ProductFaq({ faqs }: { faqs: FaqItem[] }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      aria-labelledby="faq-heading"
      className="relative border-t border-white/[0.04]"
    >
      <div className="mx-auto max-w-[1200px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-4 text-[12px] font-medium uppercase tracking-[0.15em] text-white/30">
              Questions
            </div>
            <h2
              id="faq-heading"
              className="gradient-text text-[clamp(24px,3.2vw,36px)] font-medium leading-[1.15] tracking-[-0.035em]"
            >
              The ones we get asked most.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <FAQList faqs={faqs} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
