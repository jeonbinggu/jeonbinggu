import type { ReactNode } from "react";

import ScrollReveal from "./ScrollReveal";
import { expertise, skills, stats } from "@/data/profile";

// 시안의 라벨(160px) + 본문 2컬럼. 좁은 폭에서는 라벨이 위로 올라간다
function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-5 border-t border-hairline pt-10 md:grid-cols-[160px_1fr] md:gap-10">
      <p className="font-mono text-xs tracking-[0.1em] text-ink-subtle">
        {label}
      </p>
      <div>{children}</div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-page px-6 py-section md:px-gutter">
      <ScrollReveal className="flex flex-col gap-12">
        <h2 className="text-title leading-[1.2] font-light tracking-heading text-balance">
          화면을 만들기 전에
          <br />
          <span className="text-accent">무엇을 재야 하는지</span>부터 정합니다
        </h2>

        <Row label="ABOUT">
          <p className="max-w-[62ch] text-base leading-[1.85] text-ink-muted text-pretty">
            커머스와 운영 대시보드처럼 상태가 많은 제품에서 화면을 만들어
            왔습니다. 디자인 시안을 그대로 옮기는 데서 멈추지 않고, 데이터가
            비었을 때·느릴 때·실패했을 때까지 화면으로 정의하는 걸 기본으로
            봅니다. 최근에는 디자인 시스템과 성능 측정을 붙여 팀이 같은 규칙
            위에서 빠르게 화면을 찍어낼 수 있게 만드는 일에 시간을 쓰고
            있습니다.
          </p>

          <dl className="mt-8 grid grid-cols-3 gap-4">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-mono text-2xl text-accent">{value}</dd>
                <p className="mt-1.5 text-[13px] text-ink-subtle">{label}</p>
              </div>
            ))}
          </dl>
        </Row>

        <Row label="EXPERTISE">
          <ul className="grid gap-3 md:grid-cols-3">
            {expertise.map(({ no, title, desc, tools }) => (
              <li
                key={no}
                className="glass flex flex-col gap-2.5 rounded-card p-5"
              >
                <span className="font-mono text-xs text-accent">{no}</span>
                <h3 className="text-base tracking-heading">{title}</h3>
                <p className="text-sm leading-[1.7] text-ink-muted text-pretty">
                  {desc}
                </p>
                <p className="mt-auto pt-2 font-mono text-[11px] text-ink-subtle">
                  {tools}
                </p>
              </li>
            ))}
          </ul>
        </Row>

        <Row label="STACK">
          <ul className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-hairline px-[13px] py-1.5 font-mono text-xs text-ink-muted"
              >
                {skill}
              </li>
            ))}
          </ul>
        </Row>
      </ScrollReveal>
    </section>
  );
}
