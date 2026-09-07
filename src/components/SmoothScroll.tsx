"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// globals.css 의 scroll-padding-top, Lenis anchors offset 과 같은 값 (sticky 헤더 높이)
const HEADER_OFFSET = -72;

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

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false,
      // 앵커 링크를 브라우저에 맡기면 scrollTop 이 즉시 튀는데 Lenis 내부 위치는
      // 그대로라, 다음 프레임에 되돌아오면서 끊겨 보인다. Lenis 가 직접 처리하게 넘긴다.
      anchors: { offset: HEADER_OFFSET },
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Lenis 는 클릭만 가로챌 뿐 popstate 를 듣지 않는다. 내비게이션 앵커는 클릭할 때마다
    // 히스토리 항목을 남기므로, 뒤로가기로 그 항목들을 지날 때 URL 만 바뀌고 화면은
    // 그대로였다 — 뒤로가기가 아무리 눌러도 안 먹는 것처럼 보이던 원인이다
    const onPopState = () => syncToHash(lenis);
    window.addEventListener("popstate", onPopState);

    return () => {
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
  // 목적지를 여기서 직접 정한다. window.scrollY 를 읽어 맞추지 않는 이유는 Next 의
  // 스크롤과 Lenis 의 프레임 쓰기 중 어느 쪽이 먼저인지 보장되지 않아, 이전 페이지의
  // 위치를 그대로 굳혀버릴 수 있기 때문이다. Lenis 를 stop() 으로 멈추지도 않는다 —
  // start() 가 빠지는 경로가 하나라도 생기면 페이지 스크롤이 잠긴다.
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

  return <>{children}</>;
}
