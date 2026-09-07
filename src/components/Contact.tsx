import ScrollReveal from "./ScrollReveal";
import SectionHead, { LabelRow } from "./SectionHead";
import { activities, contactCards, process } from "@/data/profile";

export default function Contact() {
  return (
    <>
      {/* 유일하게 배경이 깔리는 섹션이라 max-w 래퍼를 안쪽에 둔다 */}
      <section className="bg-accent-wash py-section">
        <div className="mx-auto max-w-page px-6 md:px-gutter">
          <ScrollReveal className="flex flex-col gap-7">
            <SectionHead kicker="PROCESS">추측을 계측으로 바꿉니다</SectionHead>

            <ol className="grid gap-4 md:grid-cols-4">
              {process.map(({ no, title, desc }) => (
                <li
                  key={no}
                  className="flex flex-col gap-2.5 border-t border-accent/30 pt-4"
                >
                  <span className="font-mono text-[22px] text-accent">
                    {no}
                  </span>
                  <h3 className="text-[17px] font-medium">{title}</h3>
                  <p className="text-[13.5px] leading-[1.7] text-ink-muted text-pretty">
                    {desc}
                  </p>
                </li>
              ))}
            </ol>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto max-w-page px-6 py-section md:px-gutter">
        <ScrollReveal>
          <LabelRow label="ACTIVITY">
            <ul>
              {activities.map(({ date, title, desc }) => (
                <li
                  key={title}
                  className="grid items-baseline gap-x-5 gap-y-1 border-b border-hairline py-[18px] md:grid-cols-[80px_1fr_1fr]"
                >
                  <span className="font-mono text-[13px] text-accent">
                    {date}
                  </span>
                  <h3 className="text-[17px]">{title}</h3>
                  <p className="text-sm text-ink-muted text-pretty">{desc}</p>
                </li>
              ))}
            </ul>
          </LabelRow>
        </ScrollReveal>
      </section>

      <section
        id="contact"
        className="mx-auto max-w-page px-6 pb-section md:px-gutter"
      >
        <ScrollReveal className="flex flex-col gap-7">
          <SectionHead kicker="CONTACT">편한 방법으로 연락 주세요</SectionHead>

          <ul className="grid gap-4 md:grid-cols-3">
            {contactCards.map(({ title, desc, cta, href }) => (
              <li
                key={title}
                className="glass flex flex-col gap-2.5 rounded-card p-[26px]"
              >
                <h3 className="text-lg font-medium">{title}</h3>
                <p className="text-sm leading-[1.7] text-ink-muted text-pretty">
                  {desc}
                </p>
                <a
                  href={href}
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer noopener" }
                    : {})}
                  className="mt-auto pt-1.5 text-sm text-accent transition-opacity hover:opacity-70"
                >
                  {cta} →
                </a>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </section>
    </>
  );
}
