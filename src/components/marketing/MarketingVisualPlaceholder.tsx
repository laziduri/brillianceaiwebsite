import Image from "next/image";

type Props = {
  src?: string;
  alt?: string;
  aspectClass?: string;
  label?: string;
  variant?: "dark" | "light";
};

export default function MarketingVisualPlaceholder({
  src,
  alt = "",
  aspectClass = "aspect-[4/3]",
  label = "Your character",
  variant = "dark",
}: Props) {
  const isDark = variant === "dark";

  if (src) {
    return (
      <div
        className={`relative w-full overflow-hidden rounded-2xl border ${isDark ? "border-white/[0.08] bg-white/[0.02]" : "border-slate-200/80 bg-slate-50"} ${aspectClass}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 280px, 100vw"
        />
      </div>
    );
  }

  if (isDark) {
    return (
      <div
        className={`flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.02] ${aspectClass}`}
        aria-hidden
      >
        <span className="text-[12px] font-medium tracking-[-0.02em] text-white/35">
          {label}
        </span>
        <span className="mt-1 text-[10px] text-white/25">
          public/marketing/…
        </span>
      </div>
    );
  }

  return (
    <div
      className={`flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-gradient-to-br from-sky-50/90 via-white to-violet-50/50 ${aspectClass}`}
      aria-hidden
    >
      <span className="text-[13px] font-medium tracking-[-0.02em] text-slate-400">
        {label}
      </span>
      <span className="mt-1 text-[11px] text-slate-400/80">
        Drop image in public/marketing
      </span>
    </div>
  );
}
