import Image from "next/image"

const chips = ["React", "TypeScript", "Next.js", "디자인 시스템", "웹 성능"]

export default function Hero() {
  return (
    <section id="top">
      <div className="mx-auto grid max-w-page items-center gap-12 px-6 pt-section pb-[72px] md:grid-cols-[1.15fr_0.85fr] md:px-gutter">
        <div className="flex flex-col gap-[22px]">
          <p className="font-mono text-xs tracking-[0.1em] text-accent">
            FRONTEND DEVELOPER · 3 YEARS
          </p>

          <h1 className="text-display leading-[1.12] font-light tracking-display text-balance">
            복잡한 화면을
            <br />
            <span className="font-normal text-accent">빠르게 느껴지는</span>
            <br />
            흐름으로 만듭니다
          </h1>

          <p className="max-w-[40ch] text-base leading-[1.75] text-ink-muted text-pretty">
            커머스·대시보드 제품에서 화면 설계부터 성능 측정까지 맡아온
            프론트엔드 개발자 전병국입니다.
          </p>

          <ul className="flex flex-wrap gap-2">
            {chips.map((chip) => (
              <li
                key={chip}
                className="glass rounded-full px-[13px] py-1.5 font-mono text-xs text-ink-muted"
              >
                {chip}
              </li>
            ))}
          </ul>

          <div className="mt-2 flex gap-2.5">
            <a
              href="#work"
              className="rounded-full bg-ink px-[22px] py-3 text-sm text-surface transition-colors hover:bg-accent"
            >
              프로젝트 보기
            </a>
            <a
              href="#contact"
              className="glass rounded-full px-[22px] py-3 text-sm text-ink transition-colors hover:text-accent"
            >
              연락하기 →
            </a>
          </div>
        </div>

        <div className="glass relative aspect-[712/900] h-[240px] w-auto justify-self-center overflow-hidden rounded-[24px] md:h-[330px]">
          <Image
            src="/jeonbyeongguk.png"
            alt="프론트엔드 개발자 전병국 프로필 사진"
            fill
            preload
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
