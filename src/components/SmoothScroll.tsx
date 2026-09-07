"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// globals.css 의 scroll-padding-top 과 같은 값 (sticky 헤더 높이)
const HEADER_OFFSET = -72;

// 스크롤 스파이가 훑는 랜딩 섹션. 문서에 놓인 순서 그대로여야 한다.
// 상세 페이지에는 이 중 #top 만 있고 나머지는 없어서 스파이가 그냥 쉰다
const SPY_IDS = ["top", "about", "work", "contact"];

// 현재 URL 의 해시가 가리키는 곳으로 (해시가 없으면 맨 위로) 즉시 이동
function syncToHash(lenis: Lenis) {
  const hash = window.location.hash;
  const target =
    hash.length > 1 ? document.querySelector<HTMLElement>(hash) : null;

  lenis.scrollTo(target ?? 0, {
    immediate: true,
    force: true,
    offset: target ? HEADER_OFFSET : 0,
  });
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const firstRender = useRef(true);
  // 클릭으로 시작한 스크롤이 끝날 때까지는 스파이가 주소를 건드리지 않는다.
  // 지나치는 섹션마다 주소가 깜빡이지 않도록
  const clickUntil = useRef(0);

  useEffect(() => {
    // Lenis 의 anchors 옵션은 쓰지 않는다. 그 구현은 스크롤만 대신 해줄 뿐
    // preventDefault 를 부르지 않아서, 브라우저의 기본 해시 이동이 그대로 함께
    // 일어난다. 그래서 내비게이션을 누를 때마다 히스토리 항목이 하나씩 쌓였고,
    // 상세 페이지에서 뒤로가기를 하면 #top · #work · #about 을 하나씩 되짚느라
    // 페이지를 빠져나가지 못했다. 아래에서 직접 처리한다
    const lenis = new Lenis({ autoRaf: false });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // 같은 문서 안의 해시 링크만 가로챈다. Lenis 가 부드럽게 옮기고,
    // 주소는 pushState 가 아니라 replaceState 로 바꿔 히스토리를 쌓지 않는다.
    // 덕분에 상세 페이지에서 뒤로가기 한 번이면 목록으로 돌아온다
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;

      const anchor = (event.target as Element | null)?.closest?.("a");
      if (
        !anchor ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download")
      )
        return;

      const url = new URL(anchor.href, window.location.href);
      if (
        url.origin !== window.location.origin ||
        url.pathname !== window.location.pathname ||
        url.hash.length <= 1
      )
        return;

      const target = document.querySelector<HTMLElement>(url.hash);
      if (!target) return;

      event.preventDefault();

      // duration 과 lock 이 둘 다 필요하다. Lenis 의 기본 scrollTo 는 lerp 기반이라
      // 끝나는 시점이 없고, 애니메이션 도중 휠·터치 입력 한 번에 취소돼 목적지에
      // 닿지 못한 채 멈춘다. 전에는 브라우저의 기본 해시 점프가 함께 일어나
      // 어떻게든 꽂혔지만 이제 preventDefault 로 그 경로가 없다
      lenis.scrollTo(target, {
        offset: HEADER_OFFSET,
        duration: 0.8,
        lock: true,
        force: true,
      });

      clickUntil.current = performance.now() + 900;
      window.history.replaceState(null, "", url.hash);
    };

    // Lenis 는 클릭만 볼 뿐 popstate 를 듣지 않는다. 뒤로가기로 해시가 바뀌어도
    // 화면이 그대로 있던 이유다
    const onPopState = () => syncToHash(lenis);

    window.addEventListener("click", onClick);
    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("click", onClick);
      window.removeEventListener("popstate", onPopState);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Lenis 는 스크롤 위치를 자기 내부(animatedScroll)에 들고 매 프레임 DOM 에 써넣는데,
  // 루트 레이아웃에서 한 번 만들어질 뿐 라우트 변경을 모른다. 그래서 페이지를 옮겨도
  // 이전 페이지의 스크롤 위치가 그대로 남아 있었다.
  //
  // 목적지는 URL 해시에서 직접 정한다. window.scrollY 를 읽어 맞추지 않는 이유는 Next 의
  // 스크롤과 Lenis 의 프레임 쓰기 중 어느 쪽이 먼저인지 보장되지 않아, 이전 페이지의
  // 위치를 그대로 굳혀버릴 수 있기 때문이다
  useEffect(() => {
    // 첫 렌더는 건너뛴다. 새로고침 시 브라우저가 복원한 위치를 덮어쓰지 않도록
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const lenis = lenisRef.current;
    if (!lenis) return;

    syncToHash(lenis);

    // 위치를 먼저 잡고 다음 프레임에 다시 잰다. 순서가 반대면 refresh 가 저장해 둔
    // 이전 스크롤 위치를 되돌려 놓는다
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  // 스크롤 스파이. 지금까지 주소의 해시는 앵커를 클릭할 때만 바뀌어서, 손으로
  // 스크롤해 프로젝트까지 내려와도 주소는 마지막에 눌렀던 #about · #contact 그대로였다.
  //
  // 프레임마다 위치를 재지 않고 IntersectionObserver 를 쓴다. Lenis 가 같은 프레임에
  // scrollTop 을 쓰기 때문에, 거기서 getBoundingClientRect 를 읽으면 강제 리플로가 난다
  useEffect(() => {
    const sections = SPY_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const visible = new Set<string>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }

        // 문서 순서상 첫 번째로 걸친 것이 헤더 바로 아래를 차지한 섹션이다.
        // 하나도 안 걸치면(푸터 구간) 마지막 값을 그대로 둔다
        const active = SPY_IDS.find((id) => visible.has(id));
        if (!active || performance.now() < clickUntil.current) return;

        // 히어로에서는 해시를 지운다. pushState 가 아니라 replaceState 라 히스토리는 그대로
        const next =
          active === SPY_IDS[0] ? window.location.pathname : `#${active}`;
        const current = window.location.hash || window.location.pathname;
        if (next !== current) window.history.replaceState(null, "", next);
      },
      // 헤더(72px) 아래부터 화면 40% 지점까지의 띠
      { rootMargin: `${HEADER_OFFSET}px 0px -60% 0px` },
    );

    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return <>{children}</>;
}
