import ThemeToggle from "@/components/ThemeToggle";

// 토큰 검증용 임시 페이지. 섹션 구현이 끝나면 이 라우트는 삭제한다.

const colors = [
  "bg-surface",
  "bg-surface-footer",
  "bg-accent",
  "bg-accent-dim",
  "bg-accent-wash",
  "bg-hairline",
];

const inks = ["text-ink", "text-ink-muted", "text-ink-subtle", "text-accent"];

const radii = ["rounded-shot", "rounded-card", "rounded-case"];

export default function TokensPage() {
  return (
    <main className="mx-auto w-full max-w-page px-6 py-16 md:px-gutter">
      <header className="mb-16 flex items-center justify-between">
        <h1 className="font-mono text-sm tracking-[0.1em] text-accent">
          DESIGN TOKENS
        </h1>
        <ThemeToggle />
      </header>

      <Group label="COLOR — surface">
        <div className="flex flex-wrap gap-3">
          {colors.map((c) => (
            <div key={c} className="flex flex-col gap-2">
              <div
                className={`${c} h-16 w-32 rounded-card border border-hairline`}
              />
              <span className="font-mono text-[11px] text-ink-subtle">{c}</span>
            </div>
          ))}
        </div>
      </Group>

      <Group label="COLOR — ink">
        <div className="flex flex-col gap-1">
          {inks.map((t) => (
            <p key={t} className={`${t} text-base`}>
              다크에서도 대비가 유지되는지 확인 — {t}
            </p>
          ))}
        </div>
      </Group>

      <Group label="TYPE">
        <h2 className="text-display font-light tracking-display">
          복잡한 화면을 흐름으로
        </h2>
        <h3 className="text-title font-light tracking-heading">
          함께 만들 화면이 있다면.
        </h3>
        <h4 className="text-section font-light tracking-heading">
          전문 분야와 사용 도구
        </h4>
        <p className="font-mono text-xs tracking-[0.1em] text-accent">
          SELECTED WORK
        </p>
      </Group>

      <Group label="GLASS + RADIUS">
        <div className="flex flex-wrap gap-4">
          {radii.map((r) => (
            <div
              key={r}
              className={`glass ${r} flex h-32 w-52 items-end p-4 font-mono text-[11px] text-ink-muted`}
            >
              {r}
            </div>
          ))}
        </div>
      </Group>

      <Group label="SPACING">
        <div className="bg-accent-wash py-section">
          <div className="bg-accent/20 px-gutter py-2 font-mono text-[11px] text-ink-muted">
            py-section (84px) · px-gutter (56px)
          </div>
        </div>
      </Group>
    </main>
  );
}

function Group({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-14 flex flex-col gap-4 border-t border-hairline pt-6">
      <div className="font-mono text-[11px] tracking-[0.1em] text-ink-subtle">
        {label}
      </div>
      {children}
    </section>
  );
}
