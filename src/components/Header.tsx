import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { githubUrl } from "@/data/profile";

const navLinks = [
  { hash: "#about", label: "소개" },
  { hash: "#work", label: "프로젝트" },
  { hash: "#contact", label: "연락처" },
];

// 상세 페이지에서는 랜딩으로 돌아가야 하므로 "/" 를 붙인 Link.
// 랜딩에서는 순수 해시 <a> 여야 Lenis 가 앵커 이동을 가로채 부드럽게 처리한다
function NavAnchor({
  home,
  hash,
  className,
  children,
}: {
  home: boolean;
  hash: string;
  className: string;
  children: React.ReactNode;
}) {
  return home ? (
    <Link href={`/${hash}`} className={className}>
      {children}
    </Link>
  ) : (
    <a href={hash} className={className}>
      {children}
    </a>
  );
}

export default function Header({ home = false }: { home?: boolean }) {
  return (
    <header className="glass-bar sticky top-0 z-50">
      {/* 항목이 전부 40px 이라 세로 패딩 16px 로 헤더 72px 을 맞춘다 (scroll-padding-top 과 같은 값) */}
      <div className="mx-auto flex max-w-page items-center justify-between gap-4 px-6 py-4 md:px-gutter">
        <NavAnchor
          home={home}
          hash="#top"
          className="flex min-h-10 items-center gap-2.5 text-sm whitespace-nowrap text-ink"
        >
          <span className="size-[9px] shrink-0 rounded-full bg-accent" />
          <span className="font-medium">전병국</span>
          {/* 390px 에서는 이름 · GitHub · 토글만 남긴다. 부제까지 두면 두 줄로 꺾인다 */}
          <span className="hidden font-mono text-ink-subtle md:inline">
            Frontend Developer
          </span>
        </NavAnchor>

        <nav className="flex items-center gap-3 text-sm text-ink-muted md:gap-[26px]">
          {/* 시안은 1180px 데스크톱 기준이라 좁은 폭에서는 텍스트 링크를 접는다 */}
          <div className="hidden items-center gap-[26px] md:flex">
            {navLinks.map(({ hash, label }) => (
              // 글자는 20px 이지만 탭 타깃은 40px. 패딩으로만 키운다
              <NavAnchor
                key={hash}
                home={home}
                hash={hash}
                className="py-2.5 transition-colors hover:text-accent"
              >
                {label}
              </NavAnchor>
            ))}
          </div>

          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-full bg-accent px-4 py-2.5 text-sm whitespace-nowrap text-surface transition-opacity hover:opacity-85"
          >
            GitHub ↗
          </a>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
