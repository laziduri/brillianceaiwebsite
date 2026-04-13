"use client";

import { useCallback, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";

const SALES_EMAIL = "sales@brilliancetech.ai";

const inputClass =
  "w-full rounded-lg border border-white/[0.1] bg-white/[0.04] px-3.5 py-2.5 text-[14px] text-white/90 placeholder:text-white/25 outline-none transition-colors focus:border-white/[0.2] focus:ring-1 focus:ring-white/[0.08] tracking-[-0.01em]";

const labelClass =
  "mb-1.5 block text-[13px] font-medium text-white/45 tracking-[-0.01em]";

export function SalesContactForm() {
  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const companySize = String(fd.get("companySize") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    const lines = [
      name && `Name: ${name}`,
      email && `Work email: ${email}`,
      companySize && `Company size: ${companySize}`,
      "",
      message || "(No requirements provided.)",
    ].filter(Boolean);

    const body = lines.join("\n");
    window.location.href = `mailto:${SALES_EMAIL}?subject=${encodeURIComponent("Sales inquiry — BrillianceAI")}&body=${encodeURIComponent(body)}`;
  }, []);

  return (
    <form
      onSubmit={onSubmit}
      className="overflow-hidden rounded-xl border border-white/[0.1] bg-[#0c0c0f] shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset]"
    >
      <div className="border-b border-white/[0.08] px-6 py-5 md:px-8">
        <h2 className="text-[17px] font-semibold tracking-[-0.02em] text-white">
          Tell us how we can help
        </h2>
      </div>

      <div className="space-y-5 px-6 py-6 md:px-8 md:py-7">
        <div>
          <label htmlFor="sales-name" className={labelClass}>
            Full name
          </label>
          <input
            id="sales-name"
            name="name"
            type="text"
            autoComplete="name"
            className={inputClass}
            placeholder="Kevin Flynn"
          />
        </div>

        <div>
          <label htmlFor="sales-email" className={labelClass}>
            Work email
          </label>
          <input
            id="sales-email"
            name="email"
            type="email"
            autoComplete="email"
            className={inputClass}
            placeholder="kevin@encom.com"
          />
        </div>

        <div>
          <label htmlFor="sales-company-size" className={labelClass}>
            Company size
          </label>
          <div className="relative">
            <select
              id="sales-company-size"
              name="companySize"
              className={`${inputClass} appearance-none pr-10`}
              defaultValue="1-19"
            >
              <option value="1-19">1–19</option>
              <option value="20-49">20–49</option>
              <option value="50-199">50–199</option>
              <option value="200-499">200–499</option>
              <option value="500+">500+</option>
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35"
              aria-hidden
            />
          </div>
        </div>

        <div>
          <label htmlFor="sales-message" className={labelClass}>
            Tell us about your requirements
          </label>
          <textarea
            id="sales-message"
            name="message"
            rows={5}
            className={`${inputClass} min-h-[120px] resize-y py-3`}
            placeholder="I'm interested in BrillianceAI for my team…"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-white/[0.08] px-6 py-5 md:flex-row md:items-center md:justify-between md:px-8">
        <p className="text-[13px] leading-relaxed text-white/45 tracking-[-0.01em]">
          You can also email us at{" "}
          <a
            href={`mailto:${SALES_EMAIL}`}
            className="text-white/70 underline decoration-white/20 underline-offset-2 transition-colors hover:text-white hover:decoration-white/40"
          >
            {SALES_EMAIL}
          </a>
        </p>
        <button
          type="submit"
          className="shrink-0 rounded-lg border border-white/[0.12] bg-white/[0.1] px-5 py-2.5 text-[13px] font-medium text-white/95 transition-colors hover:border-white/[0.18] hover:bg-white/[0.14] tracking-[-0.01em]"
        >
          Send message
        </button>
      </div>
    </form>
  );
}
