"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { marketingHero } from "@/data/marketing-landing";

const EASE = [0.22, 1, 0.36, 1] as const;
const HERO_VIDEO = "/character-videos/heromarketing.mp4";

export default function MarketingHero() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoMissing, setVideoMissing] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || reduce) return;
    el.play().catch(() => {});
  }, [reduce]);

  return (
    <section
      className="relative flex min-h-[85vh] w-full items-center overflow-hidden px-6 pb-20 pt-28 md:px-10 md:pb-28 md:pt-32"
      aria-labelledby="marketing-hero-heading"
    >
      {/* background glow orbs */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.3]"
        aria-hidden
      >
        <div className="glow-orb glow-orb-white absolute -left-[18%] top-[5%] h-[min(480px,65vw)] w-[min(480px,65vw)]" />
        <div className="glow-orb glow-orb-white absolute -right-[12%] top-[15%] h-[min(380px,50vw)] w-[min(380px,50vw)]" />
      </div>

      <div className="relative z-[1] mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* LEFT — text content */}
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0, ease: EASE }}
            className="mb-6 text-[13px] font-normal tracking-[-0.01em] text-white/55"
          >
            AI Marketing
          </motion.p>

          <motion.h1
            id="marketing-hero-heading"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            className="hero-headline mx-auto max-w-[600px] lg:mx-0"
            style={{ fontSize: "clamp(34px, 5vw, 60px)" }}
          >
            <span className="block gradient-text">{marketingHero.headline}</span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16, ease: EASE }}
            className="mx-auto mt-8 max-w-md text-[16px] font-normal leading-relaxed tracking-[-0.02em] text-white/40 md:text-[18px] lg:mx-0"
          >
            {marketingHero.subline}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.24, ease: EASE }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <a href={marketingHero.ctaPrimary.href} className="btn-primary-sm">
              <span>{marketingHero.ctaPrimary.label}</span>
            </a>
            <a
              href={marketingHero.ctaSecondary.href}
              className="btn-secondary-sm"
            >
              <span>{marketingHero.ctaSecondary.label}</span>
            </a>
          </motion.div>
        </div>

        {/* RIGHT — video */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          className="order-1 flex items-center justify-center lg:order-2"
        >
          {!reduce && !videoMissing ? (
            <div className="relative aspect-square w-full max-w-[480px]">
              {/* subtle glow behind video */}
              <div
                className="pointer-events-none absolute inset-0 -z-10 scale-110 rounded-full opacity-25"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 55%, rgba(255,255,255,0.1) 0%, transparent 65%)",
                  filter: "blur(30px)",
                }}
                aria-hidden
              />
              <video
                ref={videoRef}
                className="h-full w-full object-contain"
                src={HERO_VIDEO}
                muted
                loop
                playsInline
                preload="auto"
                onError={() => setVideoMissing(true)}
              />
            </div>
          ) : (
            <div className="flex aspect-square w-full max-w-[480px] items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <span className="text-[13px] text-white/25">
                AI Marketing Team
              </span>
            </div>
          )}
        </motion.div>
      </div>

      {/* bottom fade line */}
      <div className="absolute bottom-0 left-0 right-0 z-[1] h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
}
