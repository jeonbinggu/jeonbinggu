import { contactCards, email, socials } from "@/data/profile";

// CONTACT 섹션을 푸터에 합쳤다. 연락 CTA 가 배너 · 카드 · 푸터 세 곳에 흩어져 있던 것을
// 한 곳으로 모은다. 헤더의 #contact 와 스크롤 스파이가 이 푸터를 가리킨다.
// 구분선은 hairline 이 푸터 배경에 묻혀서 ink 알파로 잡는다 (양 테마 모두 보임)
export default function Footer() {
  return (
    <footer id="contact" className="bg-surface-footer text-ink">
      <div className="mx-auto flex max-w-page flex-col gap-[22px] px-6 py-[90px] md:px-gutter">
        <p className="font-mono text-xs tracking-[0.1em] text-accent">CONTACT</p>

        <h2 className="max-w-[18ch] text-title leading-[1.2] font-light tracking-display">
          함께 만들 제품이 있다면.
        </h2>

        <a
          href={`mailto:${email}`}
          className="w-fit font-mono text-xl text-accent transition-opacity hover:opacity-70"
        >
          {email}
        </a>

        <ul className="mt-2 grid gap-x-8 gap-y-5 md:grid-cols-3">
          {contactCards.map(({ title, desc, cta, href }) => (
            <li
              key={title}
              className="flex flex-col gap-1.5 border-t border-ink/10 pt-4"
            >
              <h3 className="text-base font-medium">{title}</h3>
              <p className="text-sm leading-[1.7] text-ink-muted text-pretty">
                {desc}
              </p>
              <a
                href={href}
                {...(href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
                className="mt-1 w-fit text-sm text-accent transition-opacity hover:opacity-70"
              >
                {cta} →
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-[22px] text-xs text-ink-muted">
          <p>© {new Date().getFullYear()} 전병국 · Seoul, KR</p>
          <ul className="flex gap-[18px] font-mono">
            {socials.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition-colors hover:text-accent"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
