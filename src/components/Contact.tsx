import ScrollReveal from "./ScrollReveal";
import { activities, contactCards, email, process } from "@/data/profile";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto max-w-page overflow-hidden px-6 py-section md:px-gutter"
    >
      <div
        aria-hidden
        className="absolute -top-[120px] -right-[100px] size-[320px] rounded-full bg-[var(--orb)] blur-[12px] dark:blur-[24px]"
      />

      <ScrollReveal className="relative grid gap-10 md:grid-cols-2">
        <div>
          <p className="font-mono text-xs tracking-[0.1em] text-ink-subtle">
            HOW I WORK
          </p>
          <ol className="mt-5 flex flex-col">
            {process.map(({ no, title, desc }) => (
              <li
                key={no}
                className="flex gap-4 border-b border-hairline py-4 last:border-0"
              >
                <span className="font-mono text-xs text-accent">{no}</span>
                <div>
                  <h3 className="text-sm tracking-heading">{title}</h3>
                  <p className="mt-1 text-sm leading-[1.7] text-ink-muted text-pretty">
                    {desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <p className="font-mono text-xs tracking-[0.1em] text-ink-subtle">
            RECENT
          </p>
          <ul className="mt-5 flex flex-col">
            {activities.map(({ date, title, desc }) => (
              <li
                key={title}
                className="flex gap-4 border-b border-hairline py-4 last:border-0"
              >
                <span className="w-[52px] shrink-0 font-mono text-[11px] text-ink-subtle">
                  {date}
                </span>
                <div>
                  <h3 className="text-sm tracking-heading">{title}</h3>
                  <p className="mt-1 text-sm leading-[1.7] text-ink-muted text-pretty">
                    {desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>

      <ScrollReveal className="relative mt-16 flex flex-col gap-8 border-t border-hairline pt-12">
        <h2 className="text-title leading-[1.2] font-light tracking-heading text-balance">
          만들고 싶은 화면이 있다면
          <br />
          <span className="text-accent">편하게 연락 주세요</span>
        </h2>

        <a
          href={`mailto:${email}`}
          className="font-mono text-base text-ink underline decoration-hairline underline-offset-[6px] transition-colors hover:text-accent"
        >
          {email}
        </a>

        <ul className="grid gap-3 md:grid-cols-3">
          {contactCards.map(({ title, desc, cta, href }) => (
            <li key={title} className="glass flex flex-col gap-2.5 rounded-card p-5">
              <h3 className="text-base tracking-heading">{title}</h3>
              <p className="text-sm leading-[1.7] text-ink-muted text-pretty">
                {desc}
              </p>
              <a
                href={href}
                {...(href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
                className="mt-auto pt-3 font-mono text-xs text-accent transition-opacity hover:opacity-70"
              >
                {cta} →
              </a>
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </section>
  );
}
