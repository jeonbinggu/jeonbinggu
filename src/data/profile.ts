// 사이트 문구. 원칙 하나 — "이 문장을 다른 지원자 100명도 쓸 수 있는가?"
// 쓸 수 있으면 지우고, 실제 커밋·이슈로 확인되는 문장으로 바꾼다.
// 숫자는 여기 적지 않는다. GitHub 지표는 전부 src/lib/github.ts 에서 온다

export const githubUrl = "https://github.com/jeonbinggu";

export const expertise = [
  {
    no: "01",
    title: "크로스플랫폼 앱 출시",
    desc: "하나의 React 코드베이스를 Capacitor로 감싸 웹과 Android·iOS에 동시에 냅니다. 네이티브 SDK 연동, 플랫폼별 분기, 스토어 심사 대응까지 다룹니다.",
    tools: "React · Capacitor · Xcode · Gradle",
  },
  {
    no: "02",
    title: "인증과 네트워크 계층",
    desc: "웹은 localStorage, 앱은 OS 보안 저장소로 토큰을 나눠 보관하고, 동시 401에서 refresh가 중복 실행되지 않도록 대기열을 직접 구현했습니다.",
    tools: "TypeScript · Axios · TanStack Query · Zustand",
  },
  {
    no: "03",
    title: "릴리즈와 디버깅",
    desc: "GitHub Actions로 AAB·IPA 산출물을 자동 생성하고, release 빌드에서만 나는 크래시를 계측으로 좁혀 해결합니다.",
    tools: "GitHub Actions · Sentry · Vitest · Firebase",
  },
];

// 카드는 모두 같은 glass 표면을 쓴다. 구분은 tint 가 아니라 no · kicker 로.
// result 에 커밋 수는 없다 — Work 가 GitHub API 값으로 앞에 붙인다
export const cases = [
  {
    no: "01",
    kicker: "Mobile · Web · 2025.12 —",
    title: "Finders",
    desc: "필름 카메라 현상소 예약·커뮤니티 서비스. 하나의 React 코드베이스를 Capacitor로 패키징해 웹과 Android·iOS 양대 스토어에 출시하고 운영하고 있습니다. 앱 패키징과 네이티브 인증, 릴리즈 CI, 푸시 알림을 담당했습니다.",
    result: "Play Store · App Store · 운영 중",
    shot: "finders",
    metric: "findersCommits" as const,
    href: "/work/finders",
    cta: "상세 보기",
  },
  {
    no: "02",
    kicker: "Web App · 2025.07 — 2026.03",
    title: "오메추",
    desc: "무엇을 먹을지 정해주는 메뉴 추천 서비스. 메인·온보딩 5단계·추천 결과와 위치 기반 맛집 화면을 맡았고, 페이지 폴더에 뭉쳐 있던 코드를 9개월에 걸쳐 FSD 구조로 옮겼습니다.",
    result: "9개월 · 팀 4인",
    shot: "omechu",
    metric: "omechuCommits" as const,
    href: "/work/omechu",
    cta: "상세 보기",
  },
];

export const process = [
  {
    no: "01",
    title: "재현 조건을 먼저 고정한다",
    desc: "“가끔 안 된다”를 “release 빌드에서, 실기기에서, 세션이 만료된 상태로 켜면 반드시 난다”로 바꾸는 것부터 시작합니다. 조건이 좁혀지지 않으면 고쳤는지 확인할 방법도 없습니다.",
  },
  {
    no: "02",
    title: "추측 대신 계측을 넣는다",
    desc: "원인을 짐작해 고쳐보는 대신, 어디까지 정상인지 확인하는 로그를 먼저 넣습니다. CI에서 서명이 실패했을 때 Secret이 비었다는 첫 가설이 틀렸다는 걸 파일 크기와 매직 바이트를 찍어보고서야 알았습니다.",
  },
  {
    no: "03",
    title: "가장 작은 수정으로 끝낸다",
    desc: "카카오 SDK 전체를 난독화에서 제외하면 문제는 사라지지만 R8을 쓰는 의미가 없어집니다. 직렬화 대상이 어느 패키지에 모여 있는지 확인하고 그 범위로만 규칙을 썼습니다.",
  },
  {
    no: "04",
    title: "다음 사람을 위해 남긴다",
    desc: "재현이 어려웠던 버그에는 회귀 테스트를, 같은 벽에 다시 부딪힐 지점에는 진단 로그를 지우지 않고 둡니다. 원인과 근거는 커밋 메시지와 문서에 남깁니다.",
  },
];

// 날짜는 Finders 이슈·PR 기록으로 확인한 값이다.
// #363 merged 2026-08-12 (R8 크래시) · #356 merged 2026-08-11 (FCM) · #312 2026-07-02 부터 (CI)
export const activities = [
  {
    date: "2026.08",
    title: "Android release 크래시 해결",
    desc: "R8이 제거한 직렬화 클래스를 찾아 ProGuard 규칙 한 줄로 좁혀 고쳤습니다.",
  },
  {
    date: "2026.08",
    title: "FCM 푸시 알림 도입",
    desc: "등록·수신·딥링크를 구현하고, 서버와의 딥링크 계약을 경로 문자열에서 action 기반으로 재설계했습니다.",
  },
  {
    date: "2026.07 —",
    title: "릴리즈 CI 구축",
    desc: "GitHub Actions에서 AAB·IPA 산출물을 자동 생성합니다. iOS 코드 서명 실패를 단계별로 계측해 해결했습니다.",
  },
  {
    date: "진행 중",
    title: "기능별 문서화",
    desc: "구현한 기능의 트러블슈팅 과정을 문서로 남기고 있습니다.",
  },
];

export const email = "tinyjbk123@gmail.com";

export const contactCards = [
  {
    title: "채용 제안",
    desc: "웹과 앱을 함께 만들 프론트엔드를 찾고 계시다면.",
    cta: "메일 보내기",
    href: `mailto:${email}`,
  },
  {
    title: "이력서",
    desc: "경력과 프로젝트 상세를 문서로 정리해 보내드립니다.",
    cta: "이력서 요청하기",
    href: `mailto:${email}?subject=${encodeURIComponent("이력서 요청")}`,
  },
  {
    title: "코드 보기",
    desc: "실제 커밋과 리뷰 흔적으로 작업 방식을 확인하실 수 있습니다.",
    cta: "GitHub 방문",
    href: githubUrl,
  },
];

// Blog 는 실제 블로그가 없어 GitHub 로 가 있었다. 링크가 생기면 다시 추가한다
export const socials = [
  { label: "GitHub", href: githubUrl },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jeonbinggu" },
];
