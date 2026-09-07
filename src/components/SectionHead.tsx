import type { ReactNode } from "react";

// 시안이 섹션 머리를 두 가지로만 쓴다.
// 1) kicker 와 제목이 같은 베이스라인에 붙는 형태 — EXPERTISE / WORK / GITHUB / PROCESS / CONTACT
export default function SectionHead({
  kicker,
  children,
}: {
  kicker: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
      <p className="font-mono text-xs tracking-[0.1em] text-accent">{kicker}</p>
      <h2 className="text-section font-light tracking-heading text-balance">
        {children}
      </h2>
    </div>
  );
}

// 2) 라벨이 왼쪽 170px 컬럼에 서는 형태 — ABOUT / ACTIVITY.
//    좁은 폭에서는 라벨이 본문 위로 올라간다
export function LabelRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-[170px_1fr] md:gap-10">
      <p className="font-mono text-xs tracking-[0.1em] text-accent">{label}</p>
      <div>{children}</div>
    </div>
  );
}
