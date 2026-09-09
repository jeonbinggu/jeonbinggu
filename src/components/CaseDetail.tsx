import Image from "next/image";
import Link from "next/link";
import Footer from "./Footer";
import Header from "./Header";
import ScrollReveal from "./ScrollReveal";
import { LabelRow } from "./SectionHead";
import Troubles, { type Trouble } from "./Troubles";

// 상세 페이지 두 곳(Finders · 오메추)이 데이터만 바꿔 쓰는 본문
export type CaseProject = {
  no: string;
  title: string;
  lead: string;
  stack: string[];
  links: { label: string; href: string; primary?: boolean }[];
  facts: { label: string; value: string }[];
  shots: { label: string; src?: string }[];
  overview: string;
  scope: { no: string; title: string; desc: string }[];
  takeaways: { no: string; body: string }[];
};

export default function CaseDetail({
  project,
  troubles,
  troublesHeading,
  next,
}: {
  project: CaseProject;
  troubles: Trouble[];
  troublesHeading: string;
  next: { href: string; title: string };
}) {
  const { no, title, lead, stack, links, facts, shots, overview, scope } =
    project;

  return (
    <>
      <Header home />
      {/* flex 컨테이너면 안 된다 — mx-auto 섹션이 flex 아이템이 되면 stretch 가 꺼져 폭이 내용을 따라간다 */}
      <main className="flex-1">
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
          {shots.map(({ label, src }) => (
            <div
              key={label}
              className="glass shot relative flex aspect-[9/16] items-end overflow-hidden rounded-case p-3.5"
            >
              {src && (
                <Image
                  src={src}
                  alt={`${title} ${label}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 30vw"
                  className="object-cover object-top"
                />
              )}
              {/* 이미지 위에 얹히면 대비가 죽는다 — src 가 있을 때만 스크림을 깐다 */}
              <span
                className={`relative font-mono text-[11px] ${
                  src
                    ? "rounded-full bg-black/45 px-2.5 py-1 text-white backdrop-blur-sm"
                    : "text-ink-subtle"
                }`}
              >
                {label}
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
          <Troubles items={troubles} heading={troublesHeading} />
        </section>

        <section className="bg-accent-wash py-section">
          <div className="mx-auto max-w-page px-6 md:px-gutter">
            <ScrollReveal>
              <LabelRow label="TAKEAWAYS">
                <ul className="flex flex-col gap-[18px]">
                  {project.takeaways.map(({ no: n, body }) => (
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

        <section className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-6 px-6 py-10 md:px-gutter">
          <Link
            href="/#work"
            className="font-mono text-[13px] text-accent transition-opacity hover:opacity-70"
          >
            ← 프로젝트 목록
          </Link>

          <Link
            href={next.href}
            className="flex flex-col items-end gap-1.5 transition-opacity hover:opacity-70"
          >
            <span className="font-mono text-[11px] tracking-[0.08em] text-ink-subtle">
              NEXT
            </span>
            <span className="text-[22px] font-light tracking-display">
              {next.title} →
            </span>
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
