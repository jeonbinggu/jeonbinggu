"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false,
      // 앵커 링크를 브라우저에 맡기면 scrollTop 이 즉시 튀는데 Lenis 내부 위치는
      // 그대로라, 다음 프레임에 되돌아오면서 끊겨 보인다. Lenis 가 직접 처리하게 넘긴다.
      // offset 은 sticky 헤더 높이 (globals.css 의 scroll-padding-top 과 같은 값)
      anchors: { offset: -72 },
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Lenis 는 스크롤 위치를 자기 내부(animatedScroll)에 들고 있고 매 프레임 DOM 에 써넣는다.
  // 라우트가 바뀌면 Next 가 DOM 스크롤을 옮기는데(맨 위로 · 해시 위치로 · 뒤로가기면
  // 복원 위치로) Lenis 는 그걸 모르고 다음 프레임에 이전 페이지의 위치를 도로 써넣는다.
  // 그래서 상세 페이지에서 뒤로 나오면 이전 화면의 스크롤 위치에 걸려 있었다.
  //
  // 이동하는 동안 Lenis 를 멈춰 Next 가 옮긴 위치를 그대로 두고, 끝난 뒤 그 위치로
  // 내부 상태를 맞춘 다음 다시 돌린다. ScrollTrigger 도 새 문서 높이로 다시 잰다.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    lenis.stop();

    // 두 프레임을 기다리는 건 Next 의 스크롤이 이 effect 보다 늦게 일어날 수 있어서다
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
        lenis.start();
        lenis.scrollTo(window.scrollY, { immediate: true, force: true });
        ScrollTrigger.refresh();
      });
    });

    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
      lenis.start();
    };
  }, [pathname]);

  return <>{children}</>;
}
