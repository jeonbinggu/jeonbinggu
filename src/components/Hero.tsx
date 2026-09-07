import Image from "next/image"

const chips = ["React", "TypeScript", "Capacitor", "앱 릴리즈"]

export default function Hero() {
  return (
    <section id="top">
      <div className="mx-auto grid max-w-page items-center gap-12 px-6 pt-section pb-[72px] md:grid-cols-[1.15fr_0.85fr] md:px-gutter">
        <div className="flex flex-col gap-[22px]">
          <p className="font-mono text-xs tracking-[0.1em] text-accent">
            FRONTEND DEVELOPER
          </p>

          <h1 className="text-display leading-[1.12] font-light tracking-display text-balance">
            React 코드베이스 하나로
            <br />
            웹과 <span className="font-normal text-accent">두 개의 스토어</span>를
            <br />
            운영합니다
          </h1>

          <p className="max-w-[46ch] text-base leading-[1.75] text-ink-muted text-pretty">
            React 단일 코드베이스를 Capacitor로 패키징해 웹과 Android·iOS에
            출시하고 운영하는 프론트엔드 개발자 전병국입니다. release 빌드에서만
            나는 크래시, CI 코드 서명 실패처럼 웹 계층 밖의 문제를 추적해 해결하는
            일을 해왔습니다.
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
