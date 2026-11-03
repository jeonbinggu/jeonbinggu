"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function ScrollReveal({
  children,
  className,
  // 반투명 배경을 가진 요소는 페이드 중에 색이 옅게 보인다. 그런 곳은 이동만
  fade = true,
}: {
  children: ReactNode;
  className?: string;
  fade?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // reduced-motion 이면 아무것도 하지 않는다. gsap.from 을 등록하지 않으면
      // 요소는 처음부터 제자리에 보인다
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(ref.current, {
          y: 24,
          opacity: fade ? 0 : 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            // 한 번 나타난 섹션은 그대로 둔다. 전에는 toggleActions 의 reverse 로
            // 위로 스크롤하면 지나온 섹션이 다시 사라졌다가 내려오면 또 나타났다
            once: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
