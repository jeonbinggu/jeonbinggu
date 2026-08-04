import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "#about", label: "소개" },
  { href: "#work", label: "프로젝트" },
  { href: "#contact", label: "연락처" },
];

export default function Header() {
  return (
    <header className="glass-bar sticky top-0 z-50">
      <div className="mx-auto flex max-w-page items-center justify-between px-6 py-[18px] md:px-gutter">
        <a
          href="#top"
          className="flex items-center gap-2.5 font-mono text-sm text-ink"
        >
          <span className="size-[9px] rounded-full bg-accent" />
          전병국
          <span className="text-ink-subtle">Frontend Developer</span>
        </a>

        <nav className="flex items-center gap-[26px] text-sm text-ink-muted">
          {/* 시안은 1180px 데스크톱 기준이라 좁은 폭에서는 텍스트 링크를 접는다 */}
          <div className="hidden items-center gap-[26px] md:flex">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="transition-colors hover:text-accent"
              >
                {label}
              </a>
            ))}
          </div>

          <a
            href="https://github.com/jeonbinggu"
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-full bg-accent px-4 py-[9px] text-[13px] text-surface transition-opacity hover:opacity-85"
          >
            GitHub ↗
          </a>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
