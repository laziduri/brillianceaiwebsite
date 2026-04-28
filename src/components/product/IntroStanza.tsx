"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function IntroStanza({
  eyebrow,
  heading,
  body,
}: {
  eyebrow: string;
  heading: string;
  body: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      aria-labelledby="intro-heading"
      className="relative border-t border-white/[0.04]"
    >
      <div className="mx-auto max-w-[1200px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-[12px] font-medium uppercase tracking-[0.15em] text-white/30"
          >
            {eyebrow}
          </motion.div>

          <div className="max-w-3xl">
            <motion.h2
              id="intro-heading"
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1,
              }}
              className="gradient-text text-[clamp(24px,3.2vw,36px)] font-medium leading-[1.2] tracking-[-0.035em]"
            >
              {heading}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2,
              }}
              className="mt-6 text-[15px] leading-relaxed tracking-[-0.01em] text-white/55 md:text-[16px]"
            >
              {body}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
