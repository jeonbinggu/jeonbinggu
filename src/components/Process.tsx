import ScrollReveal from "./ScrollReveal";
import SectionHead from "./SectionHead";
import { process } from "@/data/profile";

// 유일하게 배경이 깔리는 섹션이라 max-w 래퍼를 안쪽에 둔다
export default function Process() {
  return (
    <section className="bg-accent-wash py-section">
      <div className="mx-auto max-w-page px-6 md:px-gutter">
        <ScrollReveal className="flex flex-col gap-7">
          <SectionHead kicker="PROCESS">문제를 좁혀 들어갑니다</SectionHead>

          <ol className="grid gap-4 md:grid-cols-4">
            {process.map(({ no, title, desc, example }) => (
              <li
                key={no}
                className="flex flex-col gap-2.5 border-t border-accent/30 pt-4"
              >
                <span className="font-mono text-xl text-accent">{no}</span>
                <h3 className="text-lg font-medium">{title}</h3>
                <p className="text-sm leading-[1.7] text-ink-muted text-pretty">
                  {desc}
                </p>
                {/* 원칙 뒤에 실제 사례 한 줄. 들여쓰기 대신 색으로 구분한다 */}
                <p className="text-sm leading-[1.7] text-ink-subtle text-pretty">
                  — {example}
                </p>
              </li>
            ))}
          </ol>
        </ScrollReveal>
      </div>
    </section>
  );
}
