"use client";

import { useEffect, useRef } from "react";

export function ProductHeroVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    ref.current?.play().catch(() => {});
  }, [src]);
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/[0.1] bg-black md:aspect-video">
      <video
        ref={ref}
        className="absolute inset-0 z-[1] h-full w-full object-cover object-center"
        src={src}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />
    </div>
  );
}
