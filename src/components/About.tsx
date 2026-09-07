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
                문제를 재현할 수 있는 조건까지 좁힌 다음 고칩니다.
              </h2>
              <p className="text-base leading-[1.8] text-ink-muted text-pretty">
                필름 카메라 서비스 Finders에서 웹과 Android·iOS 앱을 하나의 React
                코드베이스로 만들어 출시하고 운영하고 있습니다. 화면을 만드는 일에서
                시작했지만, 앱이 실제 기기에서 죽는 문제를 만나며 네이티브 빌드와
                릴리즈 파이프라인까지 다루게 됐습니다.
              </p>
              <p className="text-base leading-[1.8] text-ink-muted text-pretty">
                release 빌드에서만 앱이 종료되는 크래시를 R8의 코드 제거까지 거슬러
                올라가 ProGuard 규칙 한 줄로 해결했고, CI에서 한 번도 성공한 적 없던
                iOS 아카이브를 서명 단계까지 계측해 통과시켰습니다. 두 경우 모두 에러
                메시지가 가리킨 곳이 실제 원인이 아니었습니다.
              </p>
              <p className="text-base leading-[1.8] text-ink-muted text-pretty">
                그래서 추측보다 계측을 먼저 넣는 편입니다. 재현이 어려운 버그에는
                회귀 테스트를 남기고, 다음 사람이 같은 벽에 부딪힐 지점에는 진단
                로그를 지우지 않고 둡니다.
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
