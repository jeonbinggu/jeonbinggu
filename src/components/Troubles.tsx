"use client";

import { useId, useState } from "react";

export type Trouble = {
  no: string;
  tag: string;
  title: string;
  blocks: { label: string; body: string }[];
  code: string | null;
};

export default function Troubles({
  items,
  heading,
}: {
  items: Trouble[];
  heading: string;
}) {
  const [open, setOpen] = useState<number[]>([]);
  const baseId = useId();
  const anyOpen = open.length > 0;

  const toggle = (i: number) =>
    setOpen((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i],
    );

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-3">
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <p className="font-mono text-xs tracking-[0.1em] text-accent">
            TROUBLESHOOTING
          </p>
          <h2 className="text-section font-light tracking-heading text-balance">
            {heading}
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setOpen(anyOpen ? [] : items.map((_, i) => i))}
          className="glass shrink-0 rounded-full px-4 py-[9px] font-mono text-xs text-ink-muted transition-colors hover:text-accent"
        >
          {anyOpen ? "모두 접기" : "모두 펼치기"}
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {items.map(({ no, tag, title, blocks, code }, i) => {
          const isOpen = open.includes(i);
          const panelId = `${baseId}-${i}`;

          return (
            <article key={no} className="glass overflow-hidden rounded-case">
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="grid w-full grid-cols-[28px_1fr_32px] items-center gap-4 p-6 text-left md:grid-cols-[40px_1fr_32px] md:gap-5 md:px-7"
              >
                <span className="font-mono text-[13px] text-accent">{no}</span>

                <span className="flex min-w-0 flex-col gap-1.5">
                  <span className="text-[17px] leading-[1.35] tracking-heading text-pretty md:text-xl">
                    {title}
                  </span>
                  <span className="font-mono text-[11.5px] text-ink-subtle">
                    {tag}
                  </span>
                </span>

                <span
                  aria-hidden
                  className="glass flex size-8 items-center justify-center rounded-full text-[15px] text-ink-muted"
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {isOpen && (
                <div
                  id={panelId}
                  className="flex flex-col gap-5 border-t border-ink/[0.06] px-6 pt-1 pb-7 md:pr-7 md:pl-[88px]"
                >
                  {blocks.map(({ label, body }) => (
                    <div
                      key={label}
                      className="grid gap-2 pt-5 md:grid-cols-[84px_1fr] md:gap-5"
                    >
                      <p className="font-mono text-[11px] tracking-[0.08em] text-accent md:pt-1">
                        {label}
                      </p>
                      {/* 본문에 \n\n 로 문단을 나눠 두었다 */}
                      <p className="max-w-[62ch] text-[15px] leading-[1.78] whitespace-pre-line text-ink-muted text-pretty">
                        {body}
                      </p>
                    </div>
                  ))}

                  {code && (
                    <pre className="max-w-full overflow-x-auto rounded-shot bg-ink/[0.045] p-5 font-mono text-[12.5px] leading-[1.7] text-ink">
                      {code}
                    </pre>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
