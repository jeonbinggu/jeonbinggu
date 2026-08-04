"use client";

import { useState } from "react";

import ScrollReveal from "./ScrollReveal";
import { allProjects, cases, filters, githubStats } from "@/data/profile";

export default function Work() {
  const [active, setActive] = useState<(typeof filters)[number]>("전체");
  const visible =
    active === "전체"
      ? allProjects
      : allProjects.filter((p) => p.category === active);

  return (
    <section id="work" className="mx-auto max-w-page px-6 py-section md:px-gutter">
      <ScrollReveal className="flex flex-col gap-3">
        <p className="font-mono text-xs tracking-[0.1em] text-accent">
          SELECTED WORK
        </p>
        <h2 className="text-title leading-[1.2] font-light tracking-heading text-balance">
          측정 가능한 결과가 남은 작업들
        </h2>
      </ScrollReveal>

      <div className="mt-12 flex flex-col gap-4">
        {cases.map(({ title, period, role, desc, metrics, tint, shot }) => (
          <ScrollReveal key={title}>
            <article
              className={`grid gap-6 rounded-case border border-hairline p-6 md:grid-cols-[1fr_0.8fr] md:p-8 ${tint}`}
            >
              <div className="flex flex-col gap-3.5">
                <p className="font-mono text-[11px] tracking-[0.08em] text-ink-subtle">
                  {period} · {role}
                </p>
                <h3 className="text-section font-light tracking-heading">
                  {title}
                </h3>
                <p className="max-w-[46ch] text-sm leading-[1.8] text-ink-muted text-pretty">
                  {desc}
                </p>

                <dl className="mt-auto flex gap-8 pt-4">
                  {metrics.map(({ label, value }) => (
                    <div key={label}>
                      <dt className="font-mono text-[11px] text-ink-subtle">
                        {label}
                      </dt>
                      <dd className="mt-1 font-mono text-sm text-accent">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* 실제 스크린샷이 들어올 자리 */}
              <div className="glass shot flex h-[180px] items-end rounded-shot p-3.5 md:h-auto md:min-h-[200px]">
                <span className="font-mono text-[11px] text-ink-subtle">
                  {shot}
                </span>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal className="mt-16 flex flex-col gap-5 border-t border-hairline pt-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-xs tracking-[0.1em] text-ink-subtle">
            ALL PROJECTS
          </p>
          <ul className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <li key={filter}>
                <button
                  type="button"
                  onClick={() => setActive(filter)}
                  aria-pressed={active === filter}
                  className={`rounded-full border px-3.5 py-1.5 font-mono text-xs transition-colors ${
                    active === filter
                      ? "border-accent text-accent"
                      : "border-hairline text-ink-muted hover:text-ink"
                  }`}
                >
                  {filter}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <ul>
          {visible.map(({ name, desc, status }) => (
            <li
              key={name}
              className="flex flex-wrap items-baseline gap-x-5 gap-y-1 border-b border-hairline py-4"
            >
              <h3 className="text-base tracking-heading">{name}</h3>
              <p className="flex-1 text-sm text-ink-muted">{desc}</p>
              <span className="font-mono text-[11px] text-ink-subtle">
                {status}
              </span>
            </li>
          ))}
        </ul>
      </ScrollReveal>

      <ScrollReveal className="mt-14">
        <dl className="glass grid grid-cols-2 gap-6 rounded-card p-6 md:grid-cols-4">
          {githubStats.map(({ value, label }) => (
            <div key={label}>
              <dt className="sr-only">{label}</dt>
              <dd className="font-mono text-xl text-accent">{value}</dd>
              <p className="mt-1.5 font-mono text-[11px] text-ink-subtle">
                {label}
              </p>
            </div>
          ))}
        </dl>
      </ScrollReveal>
    </section>
  );
}
