"use client";

import { useCallback, useState, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";

const inputClass =
  "w-full rounded-lg border border-white/[0.1] bg-white/[0.04] px-3.5 py-2.5 text-[14px] text-white/90 placeholder:text-white/25 outline-none transition-colors focus:border-white/[0.2] focus:ring-1 focus:ring-white/[0.08] tracking-[-0.01em]";

const labelClass =
  "mb-1.5 block text-[13px] font-medium text-white/45 tracking-[-0.01em]";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "ok" }
  | { kind: "error"; message: string };

export function SalesContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status.kind === "sending") return;

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      companySize: String(fd.get("companySize") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
      // Honeypot — hidden from users; bots fill it
      website: String(fd.get("website") ?? "").trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus({ kind: "error", message: "Please fill in name, email, and a short message." });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        setStatus({
          kind: "error",
          message:
            data?.error ??
            "Could not send right now. Please reach us on WhatsApp or email info@brilliancetech.ai directly.",
        });
        return;
      }
      setStatus({ kind: "ok" });
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus({
        kind: "error",
        message:
          "Network error. Please reach us on WhatsApp or email info@brilliancetech.ai directly.",
      });
    }
  }, [status.kind]);

  return (
    <form
      onSubmit={onSubmit}
      className="overflow-hidden rounded-xl border border-white/[0.1] bg-[#0c0c0f] shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset]"
    >
      <div className="border-b border-white/[0.08] px-6 py-5 md:px-8">
        <h2 className="text-[18px] font-medium tracking-[-0.02em] text-white">
          Send us a message
        </h2>
        <p className="mt-1 text-[13px] leading-relaxed text-white/45">
          We typically respond within one business day.
        </p>
      </div>

      <div className="space-y-5 px-6 py-6 md:px-8 md:py-7">
        {/* Honeypot field — hidden from real users */}
        <div className="hidden" aria-hidden>
          <label>
            Website
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>

        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your full name"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@yourcompany.com"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="companySize" className={labelClass}>
            Company size
          </label>
          <div className="relative">
            <select
              id="companySize"
              name="companySize"
              defaultValue=""
              className={`${inputClass} appearance-none pr-10`}
            >
              <option value="" disabled>
                Select…
              </option>
              <option value="1-10">1–10</option>
              <option value="11-50">11–50</option>
              <option value="51-200">51–200</option>
              <option value="200+">200+</option>
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35"
              strokeWidth={1.5}
              aria-hidden
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className={labelClass}>
            What are you trying to solve?
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Tell us a little about your business and the workflow you want to improve."
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="pt-1">
          <button
            type="submit"
            disabled={status.kind === "sending"}
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span>
              {status.kind === "sending" ? "Sending…" : "Send message"}
            </span>
          </button>
        </div>

        {status.kind === "ok" && (
          <p
            role="status"
            className="rounded-lg border border-emerald-400/20 bg-emerald-400/[0.04] px-3.5 py-2.5 text-[13px] text-emerald-200/90"
          >
            Thanks — we got your message. We&apos;ll reply within one business day.
          </p>
        )}

        {status.kind === "error" && (
          <p
            role="alert"
            className="rounded-lg border border-red-400/20 bg-red-400/[0.04] px-3.5 py-2.5 text-[13px] text-red-200/90"
          >
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
