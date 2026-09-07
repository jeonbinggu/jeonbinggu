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
      gsap.from(ref.current, {
        y: 60,
        opacity: fade ? 0 : 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
