import ScrollReveal from "./ScrollReveal";
import SectionHead from "./SectionHead";
import { cases, email, githubStats, githubUrl } from "@/data/profile";

export default function Work() {
  return (
    <>
      <section
        id="work"
        className="mx-auto max-w-page px-6 pb-section md:px-gutter"
      >
        <ScrollReveal>
          <SectionHead kicker="SELECTED WORK">대표 프로젝트 2</SectionHead>
        </ScrollReveal>

        <div className="mt-6 flex flex-col gap-4">
          {cases.map(({ no, kicker, title, desc, result, shot, href, cta }) => (
            // 반투명 표면이라 페이드 중엔 색이 옅게 보인다. 여기는 이동만
            <ScrollReveal key={no} fade={false}>
              <article className="glass grid items-center gap-9 rounded-case p-7 md:grid-cols-[1fr_1.15fr]">
                <div className="flex flex-col gap-3">
                  <p className="flex gap-3 font-mono text-xs text-accent">
                    <span>{no}</span>
                    <span>{kicker}</span>
                  </p>
                  <h3 className="text-2xl font-normal tracking-[-0.025em] md:text-[30px]">
                    {title}
                  </h3>
                  <p className="text-[15px] leading-[1.7] text-ink-muted text-pretty">
                    {desc}
                  </p>
                  <p className="font-mono text-[13px] text-accent">{result}</p>
                  <a
                    href={href}
                    {...(href.startsWith("http")
                      ? { target: "_blank", rel: "noreferrer noopener" }
                      : {})}
                    className="mt-1 w-fit rounded-full bg-ink px-[18px] py-2.5 text-[13px] text-surface transition-colors hover:bg-accent"
                  >
                    {cta} →
                  </a>
                </div>

                {/* 실제 스크린샷이 들어올 자리 */}
                <div className="glass shot flex aspect-[16/10] items-end rounded-shot p-3">
                  <span className="font-mono text-[11px] text-ink-subtle">
                    {shot}
                  </span>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-page px-6 pb-section md:px-gutter">
        <ScrollReveal className="flex flex-col gap-7">
          <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2">
            <SectionHead kicker="GITHUB">코드로 남긴 기록</SectionHead>
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="font-mono text-[13px] text-accent transition-opacity hover:opacity-70"
            >
              github.com/jeonbinggu ↗
            </a>
          </div>

          <dl className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
            {githubStats.map(({ value, label }) => (
              <div key={label} className="glass rounded-card p-6">
                <dt className="sr-only">{label}</dt>
                <dd className="text-[30px] leading-none font-light tracking-[-0.03em]">
                  {value}
                </dd>
                <p className="mt-2 font-mono text-[11.5px] text-ink-subtle">
                  {label}
                </p>
              </div>
            ))}
          </dl>

          {/* glass 유틸은 배경색까지 잡아버려서, tint 를 얹는 배너는 테두리·그림자만 빌려 쓴다 */}
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-[24px] border border-[var(--glass-border)] bg-accent-veil p-7 shadow-[var(--glass-shadow)] backdrop-blur-[18px] md:px-8">
            <p className="text-xl font-light tracking-heading text-pretty">
              이력서와 프로젝트 상세 자료를 바로 보내드립니다.
            </p>
            <a
              href={`mailto:${email}?subject=${encodeURIComponent("이력서 요청")}`}
              className="shrink-0 rounded-full bg-ink px-[22px] py-3 text-sm text-surface transition-colors hover:bg-accent"
            >
              이력서 요청하기
            </a>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
