"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} id="contact" className="section-padding relative overflow-hidden">
      <div className="max-w-[800px] mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card rounded-2xl p-12 md:p-16 relative overflow-hidden"
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[12px] font-medium text-white/25 uppercase tracking-[0.15em] mb-5 block"
          >
            Get Started
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-[clamp(28px,4vw,48px)] font-medium leading-[1.1] tracking-[-0.04em] gradient-text-subtle mb-5"
          >
            Built for the future.
            <br />
            Available today.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-[14px] text-white/25 font-normal max-w-sm mx-auto mb-10 leading-relaxed tracking-[-0.01em]"
          >
            Book a free strategy call to discover how AI workflows can transform
            your business operations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <a href="#" className="btn-primary inline-flex items-center justify-center gap-2" id="cta-final-consultation">
              <span>Book a Free Consultation</span>
              <ArrowRight className="w-4 h-4 relative z-10" />
            </a>
            <a href="#services" className="btn-secondary" id="cta-final-systems">
              <span>See Our Systems</span>
            </a>
          </motion.div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[180px] h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
