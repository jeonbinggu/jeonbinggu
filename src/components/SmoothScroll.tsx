"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// globals.css 의 scroll-padding-top 과 같은 값 (sticky 헤더 높이)
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
      lenis.scrollTo(target, { offset: HEADER_OFFSET });
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

  return <>{children}</>;
}
