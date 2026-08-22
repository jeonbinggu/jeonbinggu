"use client";

import { useEffect, useRef } from "react";
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

  return <>{children}</>;
}
