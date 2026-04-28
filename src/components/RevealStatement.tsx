"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function RevealWord({
  word,
  scrollYProgress,
  enterStart,
  enterEnd,
  exitStart,
  exitEnd,
}: {
  word: string;
  scrollYProgress: import("framer-motion").MotionValue<number>;
  enterStart: number;
  enterEnd: number;
  exitStart: number;
  exitEnd: number;
}) {
  const opacity = useTransform(
    scrollYProgress,
    [enterStart, enterEnd, exitStart, exitEnd],
    [0, 1, 1, 0]
  );
  const blur = useTransform(
    scrollYProgress,
    [enterStart, enterEnd, exitStart, exitEnd],
    [6, 0, 0, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [enterStart, enterEnd, exitStart, exitEnd],
    [8, 0, 0, -4]
  );

  return (
    <motion.span
      className="inline-block mr-[0.28em] reveal-word"
      style={{
        opacity,
        y,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
      }}
    >
      {word}
    </motion.span>
  );
}

export default function RevealStatement() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const line1 = ["We", "build", "agentic", "AI", "workflows"];
  const line2 = ["that", "run", "your", "business", "so", "you", "don’t", "have", "to."];
  const subtitle = "We turn your operations into intelligent AI workflows that work 24/7.".split(" ");

  const allHeadline = [...line1, ...line2];
  const totalHeadline = allHeadline.length;
  const totalSub = subtitle.length;

  const headlineEnterRange = { start: 0.15, end: 0.48 };
  const headlineExitRange = { start: 0.56, end: 0.72 };
  const subtitleEnterRange = { start: 0.38, end: 0.52 };
  const subtitleExitRange = { start: 0.7, end: 0.84 };

  function getHeadlineTiming(index: number) {
    const t = index / totalHeadline;
    const stagger = (headlineEnterRange.end - headlineEnterRange.start) / (totalHeadline + 1);
    return {
      enterStart: headlineEnterRange.start + t * (headlineEnterRange.end - headlineEnterRange.start - stagger),
      enterEnd: headlineEnterRange.start + t * (headlineEnterRange.end - headlineEnterRange.start - stagger) + stagger * 1.5,
      exitStart: headlineExitRange.start + t * (headlineExitRange.end - headlineExitRange.start - stagger),
      exitEnd: headlineExitRange.start + t * (headlineExitRange.end - headlineExitRange.start - stagger) + stagger * 1.5,
    };
  }

  function getSubtitleTiming(index: number) {
    const t = index / totalSub;
    const stagger = (subtitleEnterRange.end - subtitleEnterRange.start) / (totalSub + 1);
    return {
      enterStart: subtitleEnterRange.start + t * (subtitleEnterRange.end - subtitleEnterRange.start - stagger),
      enterEnd: subtitleEnterRange.start + t * (subtitleEnterRange.end - subtitleEnterRange.start - stagger) + stagger * 1.8,
      exitStart: subtitleExitRange.start + t * (subtitleExitRange.end - subtitleExitRange.start - stagger),
      exitEnd: subtitleExitRange.start + t * (subtitleExitRange.end - subtitleExitRange.start - stagger) + stagger * 1.8,
    };
  }

  const lineOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.28, 0.5, 0.62, 0.82],
    [0, 0.5, 1, 0.5, 0]
  );
  const lineWidth = useTransform(
    scrollYProgress,
    [0.1, 0.32, 0.5, 0.6, 0.82],
    [0, 120, 200, 120, 0]
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#08090a] overflow-hidden"
      style={{ height: "110vh" }}
    >
      <div className="sticky top-0 flex h-screen items-center justify-center">
        <div className="mx-auto flex max-w-[1000px] flex-col items-center justify-center gap-7 px-6 text-center md:gap-9">
          <motion.div
            className="mx-auto h-px w-full max-w-md bg-gradient-to-r from-transparent via-white/10 to-transparent"
            style={{ width: lineWidth, opacity: lineOpacity }}
          />

          <h2
            className="hero-headline mb-1"
            style={{
              fontSize: "clamp(30px, 5vw, 64px)",
              lineHeight: 1.05,
              letterSpacing: "-0.05em",
            }}
          >
            <span className="flex flex-wrap justify-center gap-x-0">
              {line1.map((word, i) => {
                const timing = getHeadlineTiming(i);
                return <RevealWord key={`l1-${i}`} word={word} scrollYProgress={scrollYProgress} {...timing} />;
              })}
            </span>
            <span className="mt-1 flex flex-wrap justify-center gap-x-0">
              {line2.map((word, i) => {
                const globalIdx = line1.length + i;
                const timing = getHeadlineTiming(globalIdx);
                return <RevealWord key={`l2-${i}`} word={word} scrollYProgress={scrollYProgress} {...timing} />;
              })}
            </span>
          </h2>

          <p
            className="mx-auto max-w-xl text-[15px] font-normal leading-relaxed md:text-[17px]"
            style={{ letterSpacing: "-0.02em" }}
          >
            <span className="flex flex-wrap justify-center gap-x-0">
              {subtitle.map((word, i) => {
                const timing = getSubtitleTiming(i);
                return <RevealWord key={`sub-${i}`} word={word} scrollYProgress={scrollYProgress} {...timing} />;
              })}
            </span>
          </p>

          <motion.div
            className="mx-auto h-px w-full max-w-md bg-gradient-to-r from-transparent via-white/6 to-transparent"
            style={{
              width: useTransform(lineWidth, (v) => v * 0.7),
              opacity: useTransform(lineOpacity, (v) => v * 0.4),
            }}
          />
        </div>
      </div>
    </section>
  );
}
