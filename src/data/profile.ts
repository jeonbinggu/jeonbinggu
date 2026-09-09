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
    shotSrc: "/work/finders/landing.webp",
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
    shotSrc: "/work/omechu/landing.webp",
    metric: "omechuCommits" as const,
    href: "/work/omechu",
    cta: "상세 보기",
  },
];

export const process = [
  {
    no: "01",
    title: "실패 경로를 먼저 정의한다",
    desc: "기능은 “될 때”보다 “안 될 때”에서 무너집니다. 데이터가 비었을 때, 권한이 거부됐을 때, 중간에 이탈했을 때를 화면 상태로 먼저 정의하고 시작합니다.",
    example:
      "위치 권한 거부를 원인별로 나눠 처리하고, 다단계 온보딩의 이탈 경로마다 무엇을 남기고 지울지 표로 정리했습니다.",
  },
  {
    no: "02",
    title: "추측하기 전에 계측한다",
    desc: "원인을 짐작해 고쳐보면 맞았는지 틀렸는지도 알 수 없습니다. 어디까지가 정상인지 확인하는 장치를 먼저 넣고, 재현되지 않는 문제는 재현 조건부터 좁힙니다.",
    example:
      "CI 서명 실패를 Secret 문제로 판단했다가, 파일 크기와 매직 바이트를 확인하고 가설이 틀렸음을 알았습니다.",
  },
  {
    no: "03",
    title: "바뀔 지점에 경계를 긋는다",
    desc: "요구사항을 그대로 옮기면 정책이 바뀔 때마다 화면 코드를 열게 됩니다. 무엇이 바뀔 값이고 무엇이 고정된 구조인지 나눠 두는 편입니다.",
    example:
      "사용 제한 정책을 훅으로 분리하고, 푸시 딥링크를 경로 문자열 대신 action 기반 계약으로 바꿨습니다.",
  },
  {
    no: "04",
    title: "남는 형태로 마무리한다",
    desc: "고친 것보다 왜 그렇게 고쳤는지가 오래 남습니다. 재현이 어려웠던 버그에는 회귀 테스트를, 다시 부딪힐 지점에는 진단 장치를 지우지 않고 둡니다.",
    example:
      "원인과 판단 근거는 커밋 메시지에, 기능 단위 트러블슈팅은 문서로 정리해 팀이 찾아볼 수 있게 합니다.",
  },
];

// 동아리 활동 이력. 개발 내역은 위의 프로젝트 카드가 맡는다
export const activities = [
  { term: "8기", role: "Web 파트 수료", note: "데모데이 장려상 — 오메추" },
  {
    term: "9기",
    role: "Web 파트장",
    note: "데모데이 최우수상(2위) — Finders · 진행 중",
  },
  { term: "10기", role: "부회장", note: "2026.03.02 — 2026.06.23" },
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
