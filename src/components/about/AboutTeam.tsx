"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function AboutTeam() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });
  const reduceMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="section-padding relative overflow-hidden">
      <div ref={ref} className="mx-auto max-w-[1200px] px-6 md:px-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="grid items-start gap-10 md:grid-cols-2 md:gap-14"
        >
          <div className="order-2 md:order-1">
            <p className="text-[12px] font-medium uppercase tracking-[0.15em] text-white/70">
              Our Team
            </p>
            <p className="mt-5 max-w-3xl whitespace-pre-line text-[14px] leading-relaxed tracking-[-0.01em] text-white/65 md:text-[15px]">
              Brilliance AI is a Singapore-based team with a dedicated development team also based in Singapore, focused on building agentic AI workflows for businesses.
              {"\n\n"}
              We design and implement agentic AI systems that fit how each business operates, ensuring every workflow is structured, reliable, and built for real use.
              {"\n\n"}
              Our goal is to help businesses across Singapore adopt agentic AI in a clear, practical, and effective way.
            </p>
          </div>

          <div className="order-1 w-full md:order-2">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[560px]">
              <Image
                src="/marketing/characters/Untitled%20design%20(1).png"
                alt=""
                fill
                priority
                className="object-contain"
                sizes="(min-width: 768px) 520px, 92vw"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

