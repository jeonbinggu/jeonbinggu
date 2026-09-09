<div align="center">

# 전병국 · Jeon Byeongguk

**브라우저에서 시작해 스토어에서 끝냅니다**

React 단일 코드베이스를 Capacitor로 패키징해 웹과 Android · iOS에 출시하고 운영합니다.
release 빌드에서만 나는 크래시, CI 코드 서명 실패처럼 웹 계층 밖의 문제를 추적해 해결해 왔습니다.

[![Portfolio](https://img.shields.io/badge/Portfolio-jeonbinggu.vercel.app-000000?style=flat-square&logo=vercel&logoColor=white)](https://jeonbinggu.vercel.app/)
[![Email](https://img.shields.io/badge/Email-tinyjbk123@gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:tinyjbk123@gmail.com)

</div>

---

## 이런 걸 합니다

- **크로스플랫폼 앱 출시** — 하나의 React 코드베이스를 Capacitor로 감싸 웹과 Android · iOS에 동시에 냅니다. 네이티브 SDK 연동, 플랫폼별 분기, 스토어 심사 대응까지 다룹니다.
- **인증과 네트워크 계층** — 웹은 `localStorage`, 앱은 OS 보안 저장소로 토큰을 나눠 보관하고, 동시 401에서 refresh가 중복 실행되지 않도록 대기열을 직접 구현했습니다.
- **릴리즈와 디버깅** — GitHub Actions로 AAB · IPA 산출물을 자동 생성하고, release 빌드에서만 나는 크래시를 계측으로 좁혀 해결합니다.

---

## Stack

**Core**

![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)

**State & Data**

![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-2D3748?style=flat-square)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat-square&logo=zod&logoColor=white)

**Mobile / Native**

![Capacitor](https://img.shields.io/badge/Capacitor_8-119EFF?style=flat-square&logo=capacitor&logoColor=white)
![Android](https://img.shields.io/badge/Android-3DDC84?style=flat-square&logo=android&logoColor=white)
![iOS](https://img.shields.io/badge/iOS-000000?style=flat-square&logo=apple&logoColor=white)
![Firebase](https://img.shields.io/badge/FCM-FFCA28?style=flat-square&logo=firebase&logoColor=black)

**Styling**

![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

**Test & Quality**

![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white)
![Testing Library](https://img.shields.io/badge/Testing_Library-E33332?style=flat-square&logo=testinglibrary&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black)

**Infra & Ops**

![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![Sentry](https://img.shields.io/badge/Sentry-362D59?style=flat-square&logo=sentry&logoColor=white)

---

## Projects

### 🎞️ Finders — 필름 카메라 현상소 예약 · 커뮤니티

> 2025.12 ~ 진행 중 · 웹 파트 4인 · **커밋 567개 (32%)**

하나의 React 코드베이스를 Capacitor로 패키징해 **웹과 Android · iOS 양대 스토어에 출시**하고 운영 중입니다.
앱 패키징, 네이티브 인증, 릴리즈 CI, 푸시 알림을 담당했습니다.

`React 19` `TypeScript` `Vite` `Capacitor 8` `TanStack Query` `Zustand` `Tailwind v4`

**주요 작업**

| 작업 | 내용 |
|---|---|
| 앱 패키징 | Capacitor 초기 구축, 딥링크 스킴, 플랫폼별 분기 |
| 네이티브 인증 | 카카오 네이티브 SDK · Apple Sign In, 웹/앱 토큰 저장소 이중화 |
| 릴리즈 CI | GitHub Actions에서 AAB · IPA 자동 생성, iOS 코드 서명 자동화 |
| 푸시 알림 | FCM 등록 · 수신 · 딥링크, 서버와 `action` 기반 계약 설계 |
| 크래시 대응 | R8이 제거한 SDK serializer 추적, iOS 심사 반려 대응 |

[![Repo](https://img.shields.io/badge/Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Finders-Official/FE)
[![Case Study](https://img.shields.io/badge/Case_Study-000000?style=flat-square&logo=vercel&logoColor=white)](https://jeonbinggu.vercel.app/work/finders)

---

### 🍜 오메추 — 상황 맞춤 메뉴 추천

> 2025.07 ~ 2026.03 · 팀 4인 · **커밋 378개**

메인 · 온보딩 5단계 · 추천 결과와 위치 기반 맛집 화면을 맡았고,
페이지 폴더에 뭉쳐 있던 코드를 **9개월에 걸쳐 FSD 구조로** 옮겼습니다.

`Next.js 16` `React 19` `TypeScript` `TanStack Query` `Zustand` `Tailwind v4` `Sentry`

**주요 작업**

| 작업 | 내용 |
|---|---|
| 서버 상태 레이어 | 프로젝트에 TanStack Query 최초 도입, 쿼리키 · 캐시 전략 설계 |
| FSD 마이그레이션 | shared 레이어 전면 이동, barrel export 도입 (파일 90여 개) |
| 온보딩 플로우 | 5단계 질문 · 위치 응답, 이탈 경로별 상태 리셋 체계 |
| 정책 분리 | 비로그인 재추천 제한을 UI에서 분리해 훅으로 추상화 |

[![Repo](https://img.shields.io/badge/Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Team-Omechu/Omechu-web)
[![Live](https://img.shields.io/badge/Live-omechu.log8.kr-000000?style=flat-square&logo=vercel&logoColor=white)](https://omechu.log8.kr)
[![Case Study](https://img.shields.io/badge/Case_Study-000000?style=flat-square&logo=vercel&logoColor=white)](https://jeonbinggu.vercel.app/work/omechu)

---

## 일하는 방식

1. **재현 조건을 먼저 고정합니다.** "가끔 안 된다"를 "release 빌드에서, 실기기에서, 세션이 만료된 상태로 켜면 반드시 난다"로 바꾸는 것부터 시작합니다.
2. **추측 대신 계측을 넣습니다.** 원인을 짐작해 고쳐보는 대신, 어디까지 정상인지 확인하는 로그를 먼저 넣습니다.
3. **가장 작은 수정으로 끝냅니다.** 라이브러리 전체를 예외 처리하면 문제는 사라지지만 도구를 쓰는 의미가 없어집니다.
4. **다음 사람을 위해 남깁니다.** 재현이 어려웠던 버그에는 회귀 테스트를, 같은 벽에 다시 부딪힐 지점에는 진단 로그를 지우지 않고 둡니다.

---


<div align="center">


</div>
