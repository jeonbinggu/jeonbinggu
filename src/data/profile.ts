// 시안의 sc-for 루프에 들어가던 데이터. About / Work / Contact 세 섹션이 공유한다

export const stats = [
  { value: "3년", label: "프론트엔드 경력" },
  { value: "12", label: "출시한 서비스·기능" },
  { value: "1.2s", label: "최근 리뉴얼 LCP" },
];

export const expertise = [
  {
    no: "01",
    title: "제품 화면 구현",
    desc: "요구사항을 화면 상태로 쪼개고, 예외 흐름까지 포함해 끝까지 동작하는 UI로 만듭니다.",
    tools: "React · Next.js · TanStack Query",
  },
  {
    no: "02",
    title: "디자인 시스템",
    desc: "토큰과 컴포넌트로 반복을 걷어내 여러 팀이 같은 규칙 위에서 화면을 만들게 합니다.",
    tools: "Tailwind · Storybook · TypeScript",
  },
  {
    no: "03",
    title: "성능과 모션",
    desc: "지표를 먼저 재고 병목을 찾은 뒤, 체감 속도를 끌어올리는 인터랙션을 붙입니다.",
    tools: "GSAP · Lenis · Playwright",
  },
];

export const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind",
  "GSAP",
  "Lenis",
  "TanStack Query",
  "Storybook",
  "Vite",
  "Playwright",
];

// tint 는 globals.css 의 --tint-* 토큰. 테마별 알파는 CSS 가 처리한다
export const cases = [
  {
    title: "커머스 리뉴얼",
    period: "2025",
    role: "프론트엔드 리드",
    desc: "상품·검색·결제 흐름을 다시 설계하고 이미지·번들 로딩 전략을 바꿔 초기 로딩을 3배 가까이 줄였습니다.",
    metrics: [
      { label: "LCP", value: "3.4s → 1.2s" },
      { label: "번들", value: "-38%" },
    ],
    tint: "bg-tint-1",
    shot: "commerce renewal",
  },
  {
    title: "운영 대시보드",
    period: "2024",
    role: "프론트엔드 개발",
    desc: "실시간 데이터 스트림과 가상 스크롤을 붙여 수만 행 테이블에서도 끊기지 않는 조작감을 만들었습니다.",
    metrics: [
      { label: "행 수", value: "50,000+" },
      { label: "렌더", value: "16ms 이하" },
    ],
    tint: "bg-tint-2",
    shot: "ops dashboard",
  },
  {
    title: "디자인 시스템 Pebble",
    period: "2023 —",
    role: "메인테이너",
    desc: "토큰·컴포넌트·문서를 한 저장소에서 관리해 팀별로 흩어져 있던 UI 구현을 하나로 모았습니다.",
    metrics: [
      { label: "컴포넌트", value: "24개" },
      { label: "도입 팀", value: "4팀" },
    ],
    tint: "bg-tint-3",
    shot: "design system",
  },
];

export const filters = ["전체", "커머스", "대시보드", "시스템"] as const;

export const allProjects = [
  {
    name: "커머스 리뉴얼",
    category: "커머스",
    desc: "상품 탐색부터 결제까지 전 구간 재구현",
    status: "운영 중",
  },
  {
    name: "주문 관리 콘솔",
    category: "커머스",
    desc: "판매자용 주문·정산 화면",
    status: "운영 중",
  },
  {
    name: "운영 대시보드",
    category: "대시보드",
    desc: "실시간 지표 + 가상 스크롤 테이블",
    status: "운영 중",
  },
  {
    name: "지표 리포트 뷰어",
    category: "대시보드",
    desc: "차트·필터 조합 리포트 화면",
    status: "개선 중",
  },
  {
    name: "Pebble",
    category: "시스템",
    desc: "사내 디자인 시스템 (OSS 공개)",
    status: "유지보수",
  },
  {
    name: "Pebble Docs",
    category: "시스템",
    desc: "컴포넌트 문서 + 플레이그라운드",
    status: "유지보수",
  },
];

export const githubStats = [
  { value: "1,480+", label: "commits" },
  { value: "24", label: "repositories" },
  { value: "310+", label: "pull requests" },
  { value: "6", label: "open source 기여" },
];

export const process = [
  {
    no: "01",
    title: "구조 파악",
    desc: "화면을 상태와 데이터 흐름으로 먼저 나눕니다.",
  },
  {
    no: "02",
    title: "설계·합의",
    desc: "디자이너·백엔드와 경계를 맞추고 예외를 미리 정합니다.",
  },
  {
    no: "03",
    title: "구현·리뷰",
    desc: "작게 나눠 올리고 리뷰에서 규칙을 남깁니다.",
  },
  {
    no: "04",
    title: "측정·개선",
    desc: "지표를 재고 다음 사이클의 근거로 씁니다.",
  },
];

export const activities = [
  {
    date: "2025.11",
    title: "Pebble OSS 공개",
    desc: "사내 디자인 시스템을 외부에 공개하고 문서를 정리했습니다.",
  },
  {
    date: "2025.08",
    title: "FEConf 발표",
    desc: "대규모 테이블 렌더링 최적화 사례를 공유했습니다.",
  },
  {
    date: "매주",
    title: "프론트엔드 모임",
    desc: "스펙·성능 주제로 주 1회 스터디를 이어가고 있습니다.",
  },
];

export const email = "tinyjbk123@gmail.com";

export const contactCards = [
  {
    title: "채용 제안",
    desc: "제품 화면과 성능을 함께 맡길 프론트엔드를 찾고 계시다면.",
    cta: "메일 보내기",
    href: `mailto:${email}`,
  },
  {
    title: "이력서",
    desc: "경력과 프로젝트 상세를 문서로 정리해 두었습니다.",
    cta: "이력서 보기",
    href: "https://github.com/jeonbinggu",
  },
  {
    title: "코드 보기",
    desc: "실제 커밋과 리뷰 흔적으로 작업 방식을 확인하실 수 있습니다.",
    cta: "GitHub 방문",
    href: "https://github.com/jeonbinggu",
  },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/jeonbinggu" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jeonbinggu" },
  { label: "Blog", href: "https://github.com/jeonbinggu" },
];
