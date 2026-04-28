"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** On disk: `public/character-videos/hero2.mp4` → `/character-videos/hero2.mp4` (change filename + constant together). */
const HERO_ROBOT_VIDEO = "/character-videos/hero2.mp4";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroVideoMissing, setHeroVideoMissing] = useState(false);

  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const vh = window.innerHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / (vh * 0.8)));
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || reduceMotion) return;
    el.play().catch(() => {
      /* autoplay may be blocked; muted + playsInline usually succeeds */
    });
  }, [reduceMotion]);

  const textOpacity = Math.max(0, 1 - scrollProgress * 2.5);
  const textTranslateY = scrollProgress * 40;

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black"
    >

      {!reduceMotion && !heroVideoMissing && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: textOpacity * 0.92, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 1.15, ease }}
          className="pointer-events-none absolute z-[6] aspect-square w-[clamp(100px,28vw,140px)] md:w-[clamp(180px,18vw,240px)]"
          style={{
            right: "clamp(4%, 5vw, 10%)",
            bottom: "clamp(5%, 8vh, 14%)",
          }}
          aria-hidden
        >
          <video
            ref={videoRef}
            className="h-full w-full object-contain object-center"
            src={HERO_ROBOT_VIDEO}
            muted
            loop
            playsInline
            preload="auto"
            onError={() => setHeroVideoMissing(true)}
          />
        </motion.div>
      )}

      {/* Content */}
      <div
        className="relative z-10 w-full max-w-[1000px] mx-auto px-6 text-center"
        style={{
          opacity: textOpacity,
          transform: `translateY(-${textTranslateY}px)`,
          willChange: "opacity, transform",
        }}
      >
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hero-headline mb-10"
          style={{ fontSize: "clamp(36px, 5.5vw, 72px)" }}
        >
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease }}
              className="block gradient-text"
            >
              Build a business
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease }}
              className="block gradient-text"
            >
              that runs without you
            </motion.span>
          </div>
        </motion.h1>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1, ease }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <a
            href="/contact/sales"
            className="btn-primary-sm"
            id="cta-book-consultation"
          >
            <span>Book a Free Consultation</span>
          </a>
          <a href="/about" className="btn-secondary-sm" id="cta-see-what-we-build">
            <span>See What We Build</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{ opacity: textOpacity * 0.3 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-6 bg-gradient-to-b from-white/15 to-transparent"
        />
      </motion.div>

      {/* Bottom fade line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent z-[5]" />
    </section>
  );
}
