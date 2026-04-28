"use client";

import { useEffect, useState } from "react";

const PHONE = "6580387071"; // +65 8038 7071, no plus, no spaces — WhatsApp format
const PRESET_MESSAGE =
  "Hi BrillianceAI, I'd like a free consultation about agentic AI for my business.";

const WHATSAPP_HREF = `https://wa.me/${PHONE}?text=${encodeURIComponent(PRESET_MESSAGE)}`;

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488" />
    </svg>
  );
}

export function FloatingWhatsApp() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[9998] flex items-center md:bottom-6 md:right-6">
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp for a free consultation"
        className="group pointer-events-auto relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/[0.08] bg-[#0c0c0f]/85 py-2.5 pl-2.5 pr-4 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-300 hover:border-[var(--gold-line)] hover:shadow-[0_0_0_1px_var(--gold-faint),0_12px_36px_-12px_var(--gold-glow)]"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_0_0_2px_rgba(37,211,102,0.15)] transition-transform duration-300 group-hover:scale-105">
          <WhatsAppIcon className="h-[18px] w-[18px]" />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/45">
            WhatsApp
          </span>
          <span className="text-[13px] font-medium tracking-[-0.01em] text-white/85 transition-colors group-hover:text-white">
            Get a free consultation
          </span>
        </span>
      </a>
    </div>
  );
}

export default FloatingWhatsApp;
