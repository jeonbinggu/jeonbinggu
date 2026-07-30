## 전병국 포트폴리오 웹사이트

Next.js 기반 개인 포트폴리오 웹사이트.

## Stack

- [Next.js](https://nextjs.org) (App Router, TypeScript)
- [Tailwind CSS](https://tailwindcss.com)
- [Lenis](https://lenis.darkroom.engineering) — 부드러운 스크롤
- [GSAP](https://gsap.com) + ScrollTrigger — 스크롤 기반 애니메이션

`src/components/SmoothScroll.tsx`에서 Lenis와 GSAP ScrollTrigger를 동기화하며,
`src/app/layout.tsx`에서 전역으로 감싸고 있습니다. 새로운 스크롤 애니메이션은
`src/components/ScrollReveal.tsx`를 참고하거나 `@gsap/react`의 `useGSAP` 훅으로
직접 작성하면 됩니다.

## Getting Started

```bash
pnpm dev
```

[http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

```bash
pnpm build   # 프로덕션 빌드
pnpm start   # 프로덕션 서버 실행
pnpm lint    # ESLint 검사
```
