// /work/omechu 상세 페이지 콘텐츠. omechu_portfolio/ 의 초안 3편을 옮겼다.
//
// 초안의 "✍️ 채워야 할 부분" 은 본인만 답할 수 있는 자리라 지어내지 않고 비워 뒀다.
// 특히 초안 02 의 4-3(refetch 로딩 처리)과 4-4(찜 낙관적 업데이트)는 "코드를 확인하고
// 정확히 쓸 것" 으로 표시돼 있어, 확인된 증상·원인까지만 싣고 해결 방식은 넣지 않았다.

export const omechu = {
  no: "02",
  title: "오메추",
  lead: "사용자의 상태와 취향을 받아 메뉴와 근처 맛집을 추천하는 서비스. 메인페이지와 추천 플로우 전체를 맡았고, 페이지 폴더에 뭉쳐 있던 코드를 9개월에 걸쳐 FSD 구조로 옮겼습니다.",
  stack: [
    "Next.js",
    "React",
    "TypeScript",
    "TanStack Query",
    "Zustand",
    "Tailwind CSS",
    "FSD",
  ],
  links: [
    {
      label: "레포지토리",
      href: "https://github.com/Team-Omechu/omechu-v2",
      primary: true,
    },
    { label: "서비스 보기", href: "https://omechu.log8.kr" },
  ] as { label: string; href: string; primary?: boolean }[],
  facts: [
    { label: "PERIOD", value: "2025.07 — 2026.03" },
    { label: "TEAM", value: "4인 · UMC 8th" },
    { label: "DEPLOY", value: "omechu.log8.kr" },
    // 기여자 통계 기준 365 / 3,038 커밋 (2026.09 측정)
    { label: "COMMITS", value: "365개 (전체의 12%)" },
  ],
  shots: ["메인 추천 화면", "온보딩 5단계", "위치 기반 맛집"],
  overview:
    "무엇을 먹을지 정하지 못하는 사람에게 메뉴를 골라주고, 근처에서 그 메뉴를 파는 가게까지 이어주는 서비스입니다. 4인 팀에서 프론트엔드로 참여해 메인페이지와 추천 플로우 전체를 맡았고, 9개월 동안 구조·서버 상태·정책 세 축을 정리했습니다.",
  scope: [
    {
      no: "01",
      title: "메인페이지 · 추천 플로우",
      desc: "온보딩 5단계에서 추천 결과, 메뉴 상세, 랜덤 추천까지 이어지는 화면 전체를 구현했습니다.",
    },
    {
      no: "02",
      title: "위치 기반 맛집",
      desc: "Geolocation 으로 위치를 받아 근처 가게를 찾는 화면과 권한 거부 경로를 처리했습니다.",
    },
    {
      no: "03",
      title: "FSD 아키텍처 이동",
      desc: "페이지 폴더에 뭉쳐 있던 코드를 네 단계에 걸쳐 shared · entities · widgets 계층으로 옮겼습니다.",
    },
    {
      no: "04",
      title: "서버 상태 레이어",
      desc: "페이지마다 흩어져 있던 fetch 를 TanStack Query 기반 도메인 훅으로 모았습니다.",
    },
  ],
  takeaways: [
    {
      no: "01",
      body: "구조를 바꾸는 일은 한 번에 끝내려 하면 리뷰도 병합도 불가능해집니다. 내 소유 영역 → shared 전면 이동 → 중복 정리 → 계층 분리 순으로 네 번에 나눠 옮겼고, 특히 “중복 정리”를 구조 이동 뒤로 미룬 판단이 맞았습니다. 구조가 잡히기 전에는 무엇이 진짜 중복인지 알 수 없었습니다.",
    },
    {
      no: "02",
      body: "규칙을 도구로 강제하지 않으면 컨벤션은 샙니다. FSD 의 단방향 의존을 문서와 코드리뷰로만 지켰더니 이동 기간 중 임시 폴더가 오래 남았습니다. 지금이라면 ESLint 의 import 경계 규칙을 먼저 켜고 이동을 시작하겠습니다.",
    },
    {
      no: "03",
      body: "상태는 “어디서 왔는가”로 나누는 게 맞습니다. 서버에서 온 데이터를 전역 스토어에 넣기 시작하면 무효화 시점을 사람이 관리하게 됩니다. 서버 데이터는 Query, 온보딩 진행도·모달 열림 같은 클라이언트 상태는 Zustand 로 경계를 그었습니다.",
    },
  ],
};

export const omechuTroubles = [
  {
    no: "01",
    tag: "Architecture · FSD · #193 #202 #214 #382",
    title: "페이지 폴더에 뭉쳐 있던 코드를 9개월에 걸쳐 옮긴 이야기",
    blocks: [
      {
        label: "상황",
        body: "초기 구조는 Next.js App Router 의 기본 형태를 그대로 따랐다. app/mainpage/components 와 app/components/mainpage 가 동시에 존재했고, 그 아래로 hooks · api · constant 가 각자 흩어져 있었다.",
      },
      {
        label: "문제",
        body: "기능이 늘면서 세 가지가 동시에 터졌다.\n\n같은 컴포넌트가 여러 곳에 복제됐다. 버튼·모달·카드가 두 폴더에 비슷하게 흩어졌고, 내 커밋 중 remove 태그가 붙은 10건은 대부분 이 중복을 지우는 작업이었다.\n\n어디에 무엇을 둘지 매번 고민했다. 새 컴포넌트를 만들 때 판단 기준이 없어 팀원마다 다른 곳에 넣었고, 그래서 중복이 더 심해졌다.\n\nimport 경로가 길고 리팩토링에 취약했다. ../../../components/common/Button 같은 상대경로가 페이지마다 다르게 박혀 있어 파일 하나를 옮기면 수십 개 파일을 함께 고쳐야 했다.",
      },
      {
        label: "왜 FSD",
        body: "Atomic Design 은 atoms/molecules/organisms 의 경계가 주관적이라 “어디에 둘까” 문제가 그대로 남고, 비즈니스 도메인을 표현하지 못한다. 도메인별 분리는 응집도는 높지만 도메인 간 참조 방향에 규칙이 없어 순환 참조가 생기기 쉽다.\n\n결정적이었던 건 FSD 의 단방향 규칙이었다. app → widgets → entities → shared 방향으로만 import 를 허용하면 “어디에 둘까”라는 질문이 “이건 어느 레이어의 책임인가”로 바뀐다. 판단 기준이 생기는 것이다.",
      },
      {
        label: "네 단계",
        body: "전체를 한 PR 로 옮기면 리뷰가 불가능하고 그 기간 동안 다른 팀원의 작업과 충돌한다. 그래서 네 번에 나눴다.\n\n#193 (2025.11) — 내가 담당한 메인페이지와 랜덤 추천만 먼저 옮겼다. 충돌 위험이 적고, 팀에 “이렇게 하면 이런 모습이 된다”는 실물을 보여줄 수 있었다.\n\n#202 (2025.12) — shared 레이어 전면 이동. 커밋 9개, 파일 90여 개, 약 4,200줄로 가장 규모가 컸다. 이 단계에서 index.ts barrel export 를 도입했다. 한 번에 다 고칠 수 없는 구간은 re-export 로 기존 import 호환을 유지했다.\n\n#214 (2026.01) — 중복 정리. 구조가 잡히고 나서야 어떤 파일이 진짜 중복인지 보였다. 순서를 반대로 했다면 무엇을 남길지 판단할 기준이 없었을 것이다.\n\n#382 (2026.03) — 페이지에 남아 있던 로직을 widgets · entities 계층으로 올렸다.",
      },
      {
        label: "대가",
        body: "단방향 의존을 도구로 강제하지 못했다. ESLint 의 import/no-restricted-paths 같은 규칙으로 레이어 위반을 막을 수 있었는데 컨벤션 문서와 코드리뷰에만 의존했다. 그래서 이동 기간 중 shared_FSD 와 shared 폴더가 한동안 공존했고, 어느 쪽을 import 해야 하는지 헷갈리는 구간이 있었다.\n\nbarrel export 는 import 를 깔끔하게 만들지만, 번들러가 트리 셰이킹을 제대로 못 하면 쓰지 않는 모듈까지 딸려 들어올 수 있다. 이 프로젝트에서 실제로 그런지는 번들 분석기로 확인하지 못했다.\n\n그리고 이동 자체가 기능을 개선하지는 않는다. 9개월간 refactor 커밋이 152개, feat 이 59개였다. 팀 프로젝트에서 이 배분이 옳았는지는 지금도 확신하기 어렵다.",
      },
      {
        label: "지금이라면",
        body: "먼저 ESLint 규칙으로 레이어 경계를 강제하고 이동을 시작하겠다. 규칙이 없으면 이동 중에 새 위반이 계속 생긴다.\n\nshared_FSD 같은 임시 폴더를 만들지 않고 폴더 단위로 잘게 잘라 옮기고 그때그때 정리하겠다. 임시 폴더는 “나중에 정리하자”가 되어 오래 남는다.\n\n이동 전후로 번들 사이즈를 측정해두겠다. 근거가 없으면 “깔끔해졌다”고만 말하게 된다.",
      },
    ],
    code: "// before\nimport Button from \"../../../components/common/Button\";\nimport BaseModal from \"../../components/common/BaseModal\";\n\n// after\nimport { BaseModal, Button, Header } from \"@/shared\";",
  },
  {
    no: "02",
    tag: "TanStack Query · #96 #117 #161",
    title: "페이지마다 흩어져 있던 fetch 를 서버 상태 레이어로 모으기",
    blocks: [
      {
        label: "상황",
        body: "추천 플로우의 API 연동을 맡게 됐다. 붙여야 할 도메인은 메뉴 추천·상세·랜덤 추천, 위치 기반 맛집 검색, 찜 등록·해제·목록, 먹부림(식사 기록) 네 개였다.\n\n당시 프로젝트에는 서버 상태를 다루는 공통 레이어가 없었다. 각 페이지가 useEffect 안에서 직접 요청을 보내고 로딩과 에러 상태를 각자 useState 로 들고 있었다.",
      },
      {
        label: "문제",
        body: "같은 코드가 페이지마다 반복됐다. 로딩 플래그, 에러 플래그, try/catch, cleanup — 페이지가 늘어날수록 복사가 늘었다.\n\n화면 간 이동에서 같은 데이터를 다시 받았다. 추천 결과 → 메뉴 상세 → 뒤로가기를 하면 추천 결과를 처음부터 다시 요청했다. 캐시가 없으니 당연했다.\n\n상태를 어디에 둘지 애매했다. 서버에서 받아온 데이터를 Zustand 전역 스토어에 넣는 코드가 생기기 시작했다. 이러면 서버 데이터와 클라이언트 상태의 경계가 무너지고, 무효화 시점을 사람이 일일이 관리해야 한다.",
      },
      {
        label: "선택",
        body: "자체 useFetch 훅은 초기 비용이 가장 낮지만 캐시 무효화·중복 요청 제거·리트라이를 결국 다시 만들게 된다. SWR 은 가볍고 API 가 단순하지만 무한 스크롤과 낙관적 업데이트에 손이 더 간다.\n\nTanStack Query 는 쿼리키 기반 캐시, useMutation 의 롤백, useInfiniteQuery 가 이미 있다. 프로젝트에 무한 스크롤과 찜 토글이 예정돼 있어서 이게 맞다고 판단했다.",
      },
      {
        label: "Provider",
        body: "new QueryClient() 를 모듈 최상단이 아니라 useState 초기화 함수 안에 둔 것이 핵심이다. App Router 에서는 모듈이 서버에서도 평가되는데, 최상단에 두면 여러 요청이 같은 QueryClient 인스턴스를 공유하게 된다. 사용자 A 의 캐시가 사용자 B 에게 보일 수 있다는 뜻이다. useState 의 초기화 함수는 클라이언트에서 마운트될 때 한 번만 실행되므로 이 문제가 없다.",
      },
      {
        label: "도메인 훅",
        body: "컴포넌트가 useQuery 를 직접 부르지 않고 도메인 훅을 거치게 했다. entities/menu 아래에 api(getMenu · getMenuDetail · getRandomMenu)와 model(useGetMenu · useGetMenuDetail · useGetRandomMenu)을 두는 식이다. 이렇게 하면 쿼리키 문자열이 화면 코드에 흩어지지 않고 한 곳에서 관리된다.",
      },
      {
        label: "남은 것",
        body: "쿼리키 규칙을 문서로 남기지 않아서, 팀원이 새 쿼리를 추가할 때 형식이 조금씩 달라졌다.\n\nstaleTime 을 도메인 특성에 맞게 설계하지 않고 기본값으로 뒀다. 위치 기반 맛집처럼 자주 바뀌지 않는 데이터는 더 길게 잡을 수 있었다.\n\n에러 처리를 각 훅에서 개별로 했다. QueryCache 의 전역 onError 로 공통 토스트를 띄우는 편이 나았다.",
      },
    ],
    code: '"use client";\nimport { ReactNode, useState } from "react";\nimport { QueryClient, QueryClientProvider } from "@tanstack/react-query";\n\nexport function Providers({ children }: { children: ReactNode }) {\n  // 클라이언트에서만 실행되도록 useState 안에서 생성\n  const [queryClient] = useState(() => new QueryClient());\n\n  return (\n    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>\n  );\n}',
  },
  {
    no: "03",
    tag: "useReshufflePolicy · #382",
    title: "“비로그인은 3번까지”라는 정책을 화면에서 떼어내기",
    blocks: [
      {
        label: "요구사항",
        body: "메인페이지의 “다시 추천받기” 버튼은 지금 보이는 메뉴 3개를 제외 목록에 넣고 추천을 다시 요청한다. 여기에 기획이 붙었다 — 로그인하지 않은 사용자도 써볼 수 있게 하되 3번을 넘기면 로그인 모달을 띄우고, 로그인한 사용자는 제한 없이 쓴다.",
      },
      {
        label: "문제",
        body: "처음엔 이 조건을 메인페이지 컴포넌트 안에서 처리했다. 그러다 보니 한 컴포넌트 안에 화면을 그리는 일, 추천 API 를 다시 부르는 일, 시도 횟수를 세는 일, 로그인 여부로 분기하는 일, 모달을 여닫는 일이 전부 섞였다.\n\n이게 왜 문제냐면 “3번”이라는 숫자가 화면 코드 한가운데 박혀 있기 때문이다. 기획이 5번으로 바꾸자고 하면 페이지 컴포넌트를 열어야 하고, “이 정책이 지금 어떻게 동작하지”를 확인하려면 렌더링 코드 사이를 뒤져야 한다.",
      },
      {
        label: "왜 ref",
        body: "setState 는 비동기인데, 이 핸들러는 이전 상태를 읽어서 조건 분기까지 해야 했다. setCount(count + 1) 로 올린 값을 같은 핸들러 안에서 읽으면 이번 렌더의 값이라 신뢰할 수 없다. 함수형 업데이트(setCount(c => c + 1))를 쓰면 카운트는 정확해지지만, 업데이트된 값을 같은 핸들러 안에서 즉시 읽어 조건 분기할 수는 없다.\n\n그래서 판단에 쓰는 값과 화면에 보여줄 값을 나눴다. 판단용은 useRef — 대입 직후 바로 읽히고 렌더를 유발하지 않는다. 표시용은 useState — 화면에 노출할 필요가 있을 때만.",
      },
      {
        label: "설계",
        body: "Args 와 Return 타입을 인라인이 아니라 위에 따로 선언했다. 동작은 같지만 이 훅이 무엇을 받고 무엇을 주는지가 한눈에 보인다. 훅의 계약을 문서처럼 만든 셈이다.\n\n의존성을 전부 인자로 주입받게 했다. 훅 안에서 useAuthStore() 를 직접 부르지 않으므로 특정 스토어나 특정 페이지에 묶이지 않고, 테스트할 때도 가짜 함수를 넣어주면 된다.\n\n추천된 3개 중 같은 메뉴가 겹치는 경우는 Set 으로 방어했다. 그리고 정책 변경 지점이 한 곳이다 — 3번을 5번으로 바꾸려면 조건 한 줄만 고치면 된다.",
      },
      {
        label: "남은 것",
        body: "상수 3 이 훅 안에 하드코딩돼 있다. MAX_ANONYMOUS_RESHUFFLE 같은 상수로 빼거나 인자로 받게 하면 더 낫다.\n\n시도 횟수가 새로고침하면 초기화된다. 즉 비로그인 사용자는 새로고침으로 제한을 우회할 수 있다. 다만 이 정책의 목적이 로그인 유도이지 보안 장치가 아니라면 이 정도로 충분하다는 판단도 가능하다.\n\n훅 이름이 useReshufflePolicy 인데 로그인 모달 상태까지 들고 있다. 정책과 UI 상태가 아직 섞여 있는 셈이다.",
      },
    ],
    code: "const handleReshuffle = useCallback(() => {\n  if (!isLoggedIn) {\n    const next = attemptsRef.current + 1;\n    attemptsRef.current = next;\n    setReshuffleAttemptCount(next);\n\n    if (next >= 3) {\n      setShowLoginModalForReshuffle(true);\n      return;\n    }\n\n    applyExceptionsAndRefetch();\n    return;\n  }\n\n  // 로그인 상태면 무제한\n  applyExceptionsAndRefetch();\n}, [isLoggedIn, applyExceptionsAndRefetch]);",
  },
];
