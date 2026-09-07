import { email, socials } from "@/data/profile";

// 구분선은 hairline 이 푸터 배경에 묻혀서 ink 알파로 잡는다 (양 테마 모두 보임)
export default function Footer() {
  return (
    <footer className="bg-surface-footer text-ink">
      <div className="mx-auto flex max-w-page flex-col gap-[22px] px-6 py-[90px] md:px-gutter">
        <p className="font-mono text-xs tracking-[0.1em] text-accent">
          LET&apos;S WORK TOGETHER
        </p>

        <h2 className="max-w-[18ch] text-title leading-[1.2] font-light tracking-display">
          함께 만들 화면이 있다면.
        </h2>

        <a
          href={`mailto:${email}`}
          className="font-mono text-xl text-accent transition-opacity hover:opacity-70"
        >
          {email}
        </a>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-[22px] font-mono text-xs text-ink-muted">
          <p>© {new Date().getFullYear()} 전병국 · Seoul, KR</p>
          <ul className="flex gap-[18px]">
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
