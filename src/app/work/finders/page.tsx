import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollReveal from "@/components/ScrollReveal";
import { LabelRow } from "@/components/SectionHead";
import Troubles from "@/components/Troubles";
import { finders } from "@/data/finders";

export const metadata: Metadata = {
  title: "Finders — 전병국",
  description: finders.lead,
};

export default function FindersPage() {
  const { no, title, lead, stack, links, facts, shots, overview, scope } =
    finders;

  return (
    <>
      <Header home />
      <main className="flex flex-1 flex-col">
        <section
          id="top"
          className="mx-auto flex max-w-page flex-col gap-[22px] px-6 pt-11 pb-[60px] md:px-gutter"
        >
          <nav className="flex items-center gap-2.5 font-mono text-xs tracking-[0.06em] text-ink-subtle">
            <Link href="/#work" className="text-accent hover:opacity-70">
              SELECTED WORK
            </Link>
            <span>/</span>
            <span>
              {no} {title.toUpperCase()}
            </span>
          </nav>

          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="flex max-w-[640px] flex-col gap-[18px]">
              <h1 className="text-display leading-[1.08] font-light tracking-display">
                {title}
              </h1>
              <p className="text-lead leading-[1.6] font-light tracking-[-0.01em] text-ink-muted text-pretty">
                {lead}
              </p>
              <ul className="mt-1 flex flex-wrap gap-2">
                {stack.map((s) => (
                  <li
                    key={s}
                    className="glass rounded-full px-3.5 py-[7px] font-mono text-[12.5px] text-ink-muted"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* links 가 비어 있으면 통째로 렌더되지 않는다 */}
            {links.length > 0 && (
              <div className="flex shrink-0 flex-col gap-2.5">
                {links.map(({ label, href, primary }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={
                      primary
                        ? "rounded-full bg-ink px-[22px] py-3 text-center text-sm text-surface transition-colors hover:bg-accent"
                        : "glass rounded-full px-[22px] py-3 text-center text-sm text-ink transition-colors hover:text-accent"
                    }
                  >
                    {label} ↗
                  </a>
                ))}
              </div>
            )}
          </div>

          <dl className="mt-[18px] grid grid-cols-2 gap-3.5 md:grid-cols-4">
            {facts.map(({ label, value }) => (
              <div
                key={label}
                className="glass flex flex-col gap-2 rounded-card px-6 py-[22px]"
              >
                <dt className="font-mono text-[11px] tracking-[0.08em] text-accent">
                  {label}
                </dt>
                <dd className="text-[19px] leading-[1.35] font-light tracking-heading">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* 실제 스크린샷이 들어올 자리 */}
        <section className="mx-auto grid max-w-page grid-cols-3 gap-3.5 px-6 pb-section md:px-gutter">
          {shots.map((shot) => (
            <div
              key={shot}
              className="glass shot flex aspect-[9/16] items-end rounded-case p-3.5"
            >
              <span className="font-mono text-[11px] text-ink-subtle">
                {shot}
              </span>
            </div>
          ))}
        </section>

        <section className="mx-auto max-w-page px-6 pb-section md:px-gutter">
          <ScrollReveal>
            <LabelRow label="OVERVIEW">
              <div className="flex flex-col gap-[34px]">
                <p className="max-w-[60ch] text-[19px] leading-[1.72] font-light tracking-[-0.01em] text-pretty">
                  {overview}
                </p>

                <div className="flex flex-col gap-4">
                  <p className="font-mono text-[11.5px] tracking-[0.08em] text-ink-subtle">
                    MY SCOPE
                  </p>
                  <ul className="grid gap-3.5 md:grid-cols-2">
                    {scope.map(({ no: n, title: t, desc }) => (
                      <li
                        key={n}
                        className="glass flex flex-col gap-2.5 rounded-card p-6"
                      >
                        <span className="font-mono text-xs text-accent">
                          {n}
                        </span>
                        <h3 className="text-lg font-medium tracking-[-0.01em]">
                          {t}
                        </h3>
                        <p className="text-sm leading-[1.7] text-ink-muted text-pretty">
                          {desc}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </LabelRow>
          </ScrollReveal>
        </section>

        <section className="mx-auto max-w-page px-6 pb-section md:px-gutter">
          <Troubles />
        </section>

        <section className="bg-accent-wash py-section">
          <div className="mx-auto max-w-page px-6 md:px-gutter">
            <ScrollReveal>
              <LabelRow label="TAKEAWAYS">
                <ul className="flex flex-col gap-[18px]">
                  {finders.takeaways.map(({ no: n, body }) => (
                    <li
                      key={n}
                      className="grid gap-3 border-b border-accent/30 pb-[18px] md:grid-cols-[28px_1fr] md:gap-[18px]"
                    >
                      <span className="font-mono text-[13px] text-accent">
                        {n}
                      </span>
                      <p className="max-w-[58ch] text-lg leading-[1.68] font-light tracking-[-0.01em] text-pretty">
                        {body}
                      </p>
                    </li>
                  ))}
                </ul>
              </LabelRow>
            </ScrollReveal>
          </div>
        </section>

        <section className="mx-auto max-w-page px-6 py-10 md:px-gutter">
          <Link
            href="/#work"
            className="font-mono text-[13px] text-accent transition-opacity hover:opacity-70"
          >
            ← 프로젝트 목록
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
