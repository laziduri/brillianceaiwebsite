import type { ReactNode } from "react";
import type { BlogSection, FaqItem } from "@/data/blog";
import { Diagram } from "./BlogDiagrams";

/* Minimal inline-markdown: **bold** and *em* only. Everything else is plain text. */
function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={`b-${i++}`} className="font-medium text-white/90">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      nodes.push(
        <em key={`e-${i++}`} className="italic text-white/80">
          {token.slice(1, -1)}
        </em>,
      );
    }
    lastIndex = match.index + token.length;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

function TLDR({ content }: { content: string }) {
  return (
    <aside
      className="my-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 md:p-6"
      aria-label="Summary"
    >
      <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-white/45">
        TL;DR
      </div>
      <p className="text-[15px] leading-relaxed tracking-[-0.01em] text-white/75 md:text-[16px]">
        {renderInline(content)}
      </p>
    </aside>
  );
}

function Callout({ title, body }: { title: string; body: string }) {
  return (
    <aside className="my-8 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 md:p-6">
      <div className="mb-1.5 text-[14px] font-medium tracking-[-0.02em] text-white">
        {title}
      </div>
      <p className="text-[14px] leading-relaxed text-white/65 md:text-[15px]">
        {renderInline(body)}
      </p>
    </aside>
  );
}

function BlogHeading({ level, text, id }: { level: 2 | 3; text: string; id: string }) {
  if (level === 2) {
    return (
      <h2
        id={id}
        className="mt-14 mb-5 scroll-mt-28 text-[24px] font-medium tracking-[-0.03em] text-white md:text-[28px]"
      >
        {text}
      </h2>
    );
  }
  return (
    <h3
      id={id}
      className="mt-8 mb-3 scroll-mt-28 text-[17px] font-medium tracking-[-0.02em] text-white md:text-[19px]"
    >
      {text}
    </h3>
  );
}

function Paragraph({ content }: { content: string }) {
  return (
    <p className="my-5 text-[15px] leading-[1.75] tracking-[-0.01em] text-white/65 md:text-[16px]">
      {renderInline(content)}
    </p>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="my-6 space-y-3">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex gap-3 text-[15px] leading-[1.7] tracking-[-0.01em] text-white/65 md:text-[16px]"
        >
          <span
            className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/35"
            aria-hidden
          />
          <span>{renderInline(item)}</span>
        </li>
      ))}
    </ul>
  );
}

function Numbered({ items }: { items: string[] }) {
  return (
    <ol className="my-6 space-y-4">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex gap-4 text-[15px] leading-[1.7] tracking-[-0.01em] text-white/65 md:text-[16px]"
        >
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-[11px] font-medium text-white/60"
            aria-hidden
          >
            {i + 1}
          </span>
          <span>{renderInline(item)}</span>
        </li>
      ))}
    </ol>
  );
}

function Quote({ text, attribution }: { text: string; attribution?: string }) {
  return (
    <blockquote className="my-10 border-l-2 border-white/20 pl-6">
      <p className="text-[20px] font-medium leading-[1.35] tracking-[-0.02em] text-white md:text-[24px]">
        {renderInline(text)}
      </p>
      {attribution && (
        <footer className="mt-3 text-[13px] text-white/45">— {attribution}</footer>
      )}
    </blockquote>
  );
}

function Comparison2({
  caption,
  headers,
  rows,
}: {
  caption?: string;
  headers: [string, string];
  rows: [string, string][];
}) {
  return (
    <figure className="my-10">
      <div className="overflow-hidden rounded-2xl border border-white/[0.08]">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{caption ?? "Comparison"}</caption>
          <thead>
            <tr className="bg-white/[0.03]">
              <th
                scope="col"
                className="border-b border-white/[0.08] px-5 py-4 text-[13px] font-medium tracking-[-0.01em] text-white/60 md:px-6"
              >
                {headers[0]}
              </th>
              <th
                scope="col"
                className="border-b border-l border-white/[0.08] px-5 py-4 text-[13px] font-medium tracking-[-0.01em] text-white md:px-6"
              >
                {headers[1]}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="odd:bg-white/[0.008]">
                <td className="border-b border-white/[0.05] px-5 py-4 text-[14px] leading-relaxed text-white/55 last:border-b-0 md:px-6 md:text-[15px]">
                  {renderInline(row[0])}
                </td>
                <td className="border-b border-l border-white/[0.05] px-5 py-4 text-[14px] leading-relaxed text-white/80 last:border-b-0 md:px-6 md:text-[15px]">
                  {renderInline(row[1])}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-[12px] tracking-[-0.01em] text-white/35">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function Comparison3({
  caption,
  headers,
  rows,
}: {
  caption?: string;
  headers: [string, string, string];
  rows: [string, string, string][];
}) {
  return (
    <figure className="my-10">
      <div className="overflow-x-auto rounded-2xl border border-white/[0.08]">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <caption className="sr-only">{caption ?? "Comparison"}</caption>
          <thead>
            <tr className="bg-white/[0.03]">
              {headers.map((h, i) => (
                <th
                  key={i}
                  scope="col"
                  className={`border-b border-white/[0.08] px-5 py-4 text-[13px] font-medium tracking-[-0.01em] md:px-6 ${
                    i === 2 ? "text-white" : "text-white/55"
                  } ${i > 0 ? "border-l" : ""}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="odd:bg-white/[0.008]">
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`border-b border-white/[0.05] px-5 py-4 text-[14px] leading-relaxed last:border-b-0 md:px-6 md:text-[15px] ${
                      j === 2 ? "text-white/85" : "text-white/55"
                    } ${j > 0 ? "border-l" : ""}`}
                  >
                    {renderInline(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-[12px] tracking-[-0.01em] text-white/35">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function SectionRenderer({ section }: { section: BlogSection }) {
  switch (section.type) {
    case "tldr":
      return <TLDR content={section.content} />;
    case "heading":
      return <BlogHeading level={section.level} text={section.text} id={section.id} />;
    case "paragraph":
      return <Paragraph content={section.content} />;
    case "bullets":
      return <Bullets items={section.items} />;
    case "numbered":
      return <Numbered items={section.items} />;
    case "quote":
      return <Quote text={section.text} attribution={section.attribution} />;
    case "callout":
      return <Callout title={section.title} body={section.body} />;
    case "comparison2":
      return (
        <Comparison2 caption={section.caption} headers={section.headers} rows={section.rows} />
      );
    case "comparison3":
      return (
        <Comparison3 caption={section.caption} headers={section.headers} rows={section.rows} />
      );
    case "diagram":
      return <Diagram variant={section.variant} />;
  }
}

export function FAQList({ faqs }: { faqs: FaqItem[] }) {
  return (
    <div className="mt-2 divide-y divide-white/[0.06] rounded-2xl border border-white/[0.06]">
      {faqs.map((f, i) => (
        <details key={i} className="group px-5 py-4 md:px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-medium tracking-[-0.01em] text-white md:text-[16px]">
            {f.q}
            <span
              className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/55 transition-transform duration-200 group-open:rotate-45"
              aria-hidden
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M5 1v8M1 5h8"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </summary>
          <p className="mt-3 text-[14px] leading-relaxed text-white/60 md:text-[15px]">
            {renderInline(f.a)}
          </p>
        </details>
      ))}
    </div>
  );
}

export function TableOfContents({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  return (
    <nav aria-label="Table of contents" className="sticky top-28">
      <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-white/35">
        On this page
      </div>
      <ul className="space-y-2 border-l border-white/[0.08] pl-4">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="block text-[13px] leading-relaxed text-white/45 transition-colors hover:text-white/85"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
