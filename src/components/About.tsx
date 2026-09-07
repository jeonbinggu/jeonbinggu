import ScrollReveal from "./ScrollReveal";
import SectionHead, { LabelRow } from "./SectionHead";
import { expertise } from "@/data/profile";

export default function About() {
  return (
    <>
      <section
        id="about"
        className="mx-auto max-w-page px-6 py-section md:px-gutter"
      >
        <ScrollReveal>
          <LabelRow label="ABOUT">
            <div className="flex max-w-[56ch] flex-col gap-5">
              <h2 className="text-lead leading-[1.45] font-light tracking-heading text-pretty">
                코드로 문제를 좁히고, 시스템으로 팀 속도를 올립니다.
              </h2>
              <p className="text-base leading-[1.8] text-ink-muted text-pretty">
                커머스와 운영 대시보드처럼 상태가 많은 제품에서 화면을 만들어
                왔습니다. 시안을 그대로 옮기는 데서 멈추지 않고, 데이터가 비었을
                때·느릴 때·실패했을 때까지 화면으로 정의하는 걸 기본으로 봅니다.
                최근에는 디자인 시스템과 성능 측정을 붙여 팀이 같은 규칙 위에서
                빠르게 화면을 찍어낼 수 있게 만드는 일에 시간을 쓰고 있습니다.
              </p>
            </div>
          </LabelRow>
        </ScrollReveal>
      </section>

      <section className="mx-auto max-w-page px-6 pb-section md:px-gutter">
        <ScrollReveal className="flex flex-col gap-7">
          <SectionHead kicker="EXPERTISE">전문 분야와 사용 도구</SectionHead>

          <ul className="grid gap-4 md:grid-cols-3">
            {expertise.map(({ no, title, desc, tools }) => (
              <li
                key={no}
                className="glass flex flex-col gap-3 rounded-card p-[26px]"
              >
                <span className="font-mono text-xs text-accent">{no}</span>
                <h3 className="text-[19px] font-medium tracking-heading">
                  {title}
                </h3>
                <p className="text-sm leading-[1.7] text-ink-muted text-pretty">
                  {desc}
                </p>
                <p className="mt-auto pt-1 font-mono text-[11px] text-ink-subtle">
                  {tools}
                </p>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </section>
    </>
  );
}
