"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  {
    number: "10x",
    label: "Faster Operations",
    sublabel: "Average speed improvement",
  },
  {
    number: "85%",
    label: "Less Manual Work",
    sublabel: "Reduction in repetitive tasks",
  },
  {
    number: "24/7",
    label: "Always Running",
    sublabel: "Uninterrupted operation",
  },
];

type BrandIntroContentProps = {
  className?: string;
};

export function BrandIntroContent({ className = "" }: BrandIntroContentProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rootRef, { once: true, margin: "-100px" });

  return (
    <div ref={rootRef} className={`max-w-[1200px] mx-auto w-full ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[12px] font-medium text-white/25 uppercase tracking-[0.15em] mb-5 block"
          >
            Why Choose Us
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[clamp(28px,4vw,48px)] font-medium leading-[1.1] tracking-[-0.04em] mb-6"
          >
            <span className="gradient-text-subtle">Built for businesses</span>
            <br />
            <span className="gradient-text">that scale.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[15px] text-white/30 font-normal leading-[1.7] max-w-md tracking-[-0.01em]"
          >
            We create intelligent systems that reduce manual work, improve
            response speed, and help businesses operate with immense clarity.
            Our workflows integrate seamlessly with your existing tools.
          </motion.p>
        </div>

        <div className="flex flex-col gap-4">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
              className="glass-card p-7 flex items-center gap-7 group hover-lift"
            >
              <span className="text-[clamp(32px,3.5vw,48px)] font-medium gradient-text tracking-[-0.04em] min-w-[100px]">
                {stat.number}
              </span>
              <div>
                <span className="text-[14px] text-white/50 font-medium block tracking-[-0.01em]">
                  {stat.label}
                </span>
                <span className="text-[12px] text-white/20 font-normal mt-1 block">
                  {stat.sublabel}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BrandIntro() {
  return (
    <section className="section-padding relative overflow-hidden">
      <BrandIntroContent />
    </section>
  );
}
