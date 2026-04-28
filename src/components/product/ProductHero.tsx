"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ProductHeroVideo } from "@/components/ProductHeroVideo";

export function ProductHero({
  kicker,
  headline,
  sub,
  videoSrc,
}: {
  kicker: string;
  headline: string;
  sub: string;
  videoSrc: string;
}) {
  return (
    <section
      aria-label={`${kicker} hero`}
      className="relative overflow-hidden bg-[#050507]"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="glow-orb glow-orb-white absolute -left-20 top-20 h-[420px] w-[420px]" />
        <div className="glow-orb glow-orb-white absolute -right-24 bottom-10 h-[360px] w-[360px]" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-6 pb-20 pt-28 md:px-10 md:pb-28 md:pt-36 lg:pb-36 lg:pt-44">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-16">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1,
              }}
              className="hero-headline gradient-text"
              style={{ fontSize: "clamp(36px, 5.4vw, 64px)" }}
            >
              {headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.25,
              }}
              className="mt-6 max-w-xl text-[15px] font-normal leading-relaxed tracking-[-0.01em] text-white/55 md:text-[17px]"
            >
              {sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.4,
              }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link href="/contact/sales" className="btn-primary-sm">
                <span>Book a 30-min scope session</span>
              </Link>
              <Link href="#workflow-01" className="btn-secondary-sm">
                <span>See how it works</span>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.2,
            }}
            className="relative mx-auto w-full max-w-[440px]"
          >
            <ProductHeroVideo src={videoSrc} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
