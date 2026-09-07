// 시안의 sc-for 루프에 들어가던 데이터. About / Work / Contact 세 섹션이 공유한다

export const githubUrl = "https://github.com/jeonbinggu";

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

// 카드는 모두 같은 glass 표면을 쓴다. 구분은 tint 가 아니라 no · kicker 로.
// href 가 내부 경로면 상세 페이지, 외부 URL 이면 배포된 서비스로 나간다
export const cases = [
  {
    no: "01",
    kicker: "Mobile · Web · 2025.12 —",
    title: "Finders",
    desc: "필름 카메라 현상소 예약·커뮤니티 서비스. 하나의 React 코드베이스를 Capacitor로 패키징해 웹과 Android·iOS 양대 스토어에 출시하고 운영하고 있습니다.",
    result: "커밋 540개 (31%) · Play Store · App Store",
    shot: "finders",
    href: "/work/finders",
    cta: "상세 보기",
  },
  {
    no: "02",
    kicker: "Web · 2025.07 — 2026.03",
    title: "오메추",
    desc: "무엇을 먹을지 정해주는 메뉴 추천 서비스. 메인·온보딩 5단계·추천 결과와 위치 기반 맛집 화면을 맡았고, 페이지 폴더에 뭉쳐 있던 코드를 9개월에 걸쳐 FSD 구조로 옮겼습니다.",
    result: "커밋 365개 · 9개월 · 팀 4인",
    shot: "omechu",
    href: "https://omechu.log8.kr",
    cta: "서비스 보기",
  },
];

// GitHub API 실측치 (2026.09 측정). 최근 1년 = contributionsCollection 기본 범위.
// 갱신하려면: gh api graphql -f query='{user(login:"jeonbinggu"){contributionsCollection{
//   totalCommitContributions totalRepositoriesWithContributedCommits
//   contributionCalendar{totalContributions}}}}'
// 머지된 PR: gh api "search/issues?q=is:pr+author:jeonbinggu+is:merged" --jq .total_count
export const githubStats = [
  { value: "687", label: "최근 1년 커밋" },
  { value: "929", label: "최근 1년 기여" },
  { value: "99", label: "머지된 Pull Request" },
  { value: "5", label: "커밋을 남긴 리포지토리" },
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
    href: githubUrl,
  },
  {
    title: "코드 보기",
    desc: "실제 커밋과 리뷰 흔적으로 작업 방식을 확인하실 수 있습니다.",
    cta: "GitHub 방문",
    href: githubUrl,
  },
];

export const socials = [
  { label: "GitHub", href: githubUrl },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jeonbinggu" },
  { label: "Blog", href: githubUrl },
];
