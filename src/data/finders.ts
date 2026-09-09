// /work/finders 상세 페이지 콘텐츠. 시안(Finders 프로젝트 상세.dc.html)의 renderVals 를 옮겼다

export const finders = {
  no: "01",
  title: "Finders",
  lead: "필름 카메라 현상소 예약·커뮤니티 서비스. 하나의 React 코드베이스를 Capacitor로 패키징해 웹과 Android·iOS 양대 스토어에 출시하고 운영하고 있습니다.",
  stack: [
    "React 19",
    "TypeScript",
    "Vite",
    "Capacitor 8",
    "TanStack Query",
    "Zustand",
    "Tailwind CSS",
    "Sentry",
  ],
  // 비어 있으면 버튼 영역이 통째로 렌더되지 않는다. Play Store 링크는 아직 없음
  links: [
    {
      label: "레포지토리",
      href: "https://github.com/Finders-Official/FE",
      primary: true,
    },
    {
      label: "App Store",
      href: "https://apps.apple.com/us/app/finders/id6775152930",
    },
  ] as { label: string; href: string; primary?: boolean }[],
  facts: [
    { label: "PERIOD", value: "2025.12 — 진행 중" },
    { label: "TEAM", value: "웹 파트 4인" },
    { label: "RELEASE", value: "Play Store · App Store" },
  ],
  shots: [
    { label: "메인 화면", src: "/work/finders/main.webp" },
    { label: "사진 피드", src: "/work/finders/feed.webp" },
    { label: "마이페이지", src: "/work/finders/mypage.webp" },
  ],
  overview:
    "필름 사진을 찍는 사람이 현상소를 찾고 예약하고, 현상된 사진을 서로 나누는 서비스입니다. 웹으로 시작해 앱 출시까지 이어졌고, 지금도 운영 중입니다. 웹 파트 4인 중 한 명으로 참여했습니다.",
  scope: [
    {
      no: "01",
      title: "로그인 · 회원가입 · 마이페이지",
      desc: "소셜 로그인부터 가입 완료까지의 상태 분기와 마이페이지, 현상관리 화면을 담당했습니다.",
    },
    {
      no: "02",
      title: "앱 패키징 · 네이티브 계층",
      desc: "React 단일 코드베이스를 Capacitor로 감싸 양대 스토어에 출시하고, 네이티브 인증·파일 전송을 붙였습니다.",
    },
    {
      no: "03",
      title: "릴리즈 CI",
      desc: "GitHub Actions에서 Android AAB와 iOS IPA를 자동 생성하는 파이프라인을 만들었습니다.",
    },
    {
      no: "04",
      title: "푸시 알림 전반",
      desc: "FCM 등록·수신·딥링크와 서버와의 action 계약 설계까지 맡았습니다.",
    },
  ],
  takeaways: [
    {
      no: "01",
      body: "웹 계층 밖에서 생기는 문제는 로컬에서 재현되지 않고, 에러 메시지가 원인을 가리키지도 않습니다. release 빌드, CI 러너, 네이티브 브리지처럼 “내 손에서 도는 환경이 아닌 곳”을 다뤄본 것이 이 프로젝트에서 가장 크게 남았습니다.",
    },
    {
      no: "02",
      body: "조용히 실패하는 문제가 가장 오래 남습니다. 로그아웃 시 401, Firebase 콘솔이 감춘 APNs 에러, fallback이 삼킨 딥링크 오타 — 세 건 모두 사용자 눈에는 정상으로 보였습니다. 실패를 실패로 드러내는 설계를 먼저 생각하게 됐습니다.",
    },
    {
      no: "03",
      body: "진단 장치를 남기는 편이 낫습니다. Secret 크기와 매직 바이트를 찍던 가드를 지우지 않은 이유는, 정확히 그 정보가 없어서 하루를 헛짚었기 때문입니다.",
    },
  ],
};

export const troubles = [
  {
    no: "01",
    tag: "Android · release build · #361",
    title: "release 빌드에서만 죽는 앱, 원인은 R8이 지운 클래스였다",
    blocks: [
      {
        label: "증상",
        body: "디버그 빌드에서는 멀쩡한 앱이 release 빌드로 올리면 첫 화면 직후 종료됐다. 로그인도 하기 전, 스플래시가 지나고 화면이 뜨자마자 앱이 사라진다. 디버그에서 재현되지 않는다는 게 이 문제의 핵심이었다.",
      },
      {
        label: "원인",
        body: "release 빌드는 debug와 달리 R8을 거친다. R8은 정적 분석으로 참조 여부를 판단하는데, 리플렉션으로 접근하는 클래스는 그 분석에 잡히지 않는다.\n\nkotlinx.serialization이 컴파일 시점에 생성하는 $$serializer 클래스를 카카오 SDK가 리플렉션으로 조회하고, R8은 아무도 참조하지 않는다고 판단해 제거했다. 앱이 포그라운드로 진입할 때 저장된 토큰을 역직렬화하는 순간 SerializationException이 터진다. 사용자가 뭘 누르지 않아도 라이프사이클만으로 실행되는 경로였다.",
      },
      {
        label: "해결",
        body: "proguard-rules.pro에 keep 룰 한 줄. SDK가 제공하는 consumer 룰은 액티비티만 keep해서 부족했고, SDK 전체를 유지하면 R8의 효과가 사라진다. @Serializable 클래스가 전부 *.model 패키지에 있다는 것을 확인하고 그 범위로만 제한했다. 직렬화는 필드 이름을 쓰므로 멤버도 필드로 한정했다.",
      },
      {
        label: "배운 것",
        body: "R8은 자기가 볼 수 있는 것만 판단한다. 리플렉션, JNI, 문자열 기반 클래스 로딩은 전부 사각지대다. 라이브러리를 추가할 때 “이 라이브러리가 리플렉션을 쓰는가”를 한 번 물어야 한다. 그리고 CI로 release 빌드를 자동화해둔 덕에 스토어 심사 전에 발견할 수 있었다.",
      },
    ],
    code: "-keep class com.kakao.sdk.**.model.* { <fields>; }",
  },
  {
    no: "02",
    tag: "FCM · iOS/Android · #345",
    title: "FCM 푸시를 붙이며 만난 다섯 가지 문제",
    blocks: [
      {
        label: "만든 것",
        body: "Capacitor 기반 앱에 FCM 푸시를 등록·수신·딥링크까지 붙였다. 로그인 시 리스너 4종을 먼저 등록하고, 권한을 요청해 허용되면 register()를 호출하고, registration 이벤트에서 확보한 토큰을 서버에 등록한다. 토큰은 회전될 수 있어 영속화하지 않고 메모리에만 둔다.",
      },
      {
        label: "문제 1",
        body: "iOS는 FCM 토큰을 주지 않는다. registration 이벤트가 iOS에서는 APNs 디바이스 토큰을 반환한다. 서버는 FCM으로 발송하니 “토큰은 잘 등록됐는데 알림만 안 오는” 상태가 된다. iOS에만 네이티브 플러그인과 JS 브리지를 추가해 FCM 토큰을 따로 조회했다.",
      },
      {
        label: "문제 2",
        body: "iOS 포그라운드 푸시가 전혀 표시되지 않았다. 백그라운드와 종료 상태는 정상이라 범위를 좁히기 어려웠다. presentationOptions를 설정하지 않으면 iOS 네이티브가 빈 배열로 해석해 표시할 항목이 하나도 없다는 뜻이 된다. 기본값이 없는 옵션은 문서를 안 보면 알 수 없다.",
      },
      {
        label: "문제 3",
        body: "리스너 등록 레이스 컨디션. requestPermissions()가 비동기라 응답을 기다리는 사이 effect가 재실행되면 리스너가 제거된 뒤에 register()가 호출된다. Capacitor는 registration 이벤트를 버퍼링하지 않으므로 토큰이 그대로 유실된다. cancelled 플래그로 cleanup 이후의 호출을 차단하고 회귀 테스트 2건을 추가했다. 실기기에서만 재현되는 문제라 손으로 확인하기가 너무 비쌌다.",
      },
      {
        label: "문제 4",
        body: "로그아웃·탈퇴 시 기기 토큰 해제가 항상 401이었다. onSuccess가 토큰을 먼저 지우고 onSettled에서 해제 요청을 보내니 Authorization 헤더가 없다. 사용자 입장에서는 로그아웃이 정상이라 오래 몰랐고, 서버에는 죽은 토큰만 쌓였다. accessToken이 살아 있는 시점으로 해제를 옮겼다. 단, 해제 실패가 로그아웃 자체를 막지는 않게 했다.",
      },
      {
        label: "문제 5",
        body: "APNs 인증키가 Production 전용으로 발급돼 있었다. 개발 빌드는 sandbox 토큰을 쓰므로 APNs가 BadEnvironmentKeyInToken으로 거부한다. Firebase 콘솔 테스트 발송은 이 에러를 표시하지 않고 성공으로 나오며, Android는 APNs를 거치지 않아 영향이 없다. 겸용 키로 교체하고, 코드에서도 환경 자동 판별에 맡기지 않고 명시적으로 분기했다.",
      },
      {
        label: "설계 변경",
        body: "딥링크를 문자열에서 계약으로 바꿨다. 서버가 경로 문자열을 그대로 보내면 관리자 오타를 앱의 fallback이 삼켜 실패 신호가 어디에도 남지 않는다. 서버가 action + resourceId를 보내고 앱이 매퍼로 경로를 만들게 했다.\n\n여기서 가장 신경 쓴 건 두 종류의 “모르는 값”을 구분한 것이다. action이 아예 없으면 계약 이전 서버가 보낸 메시지이므로 이동하지 않고, 모르는 action이면 앱보다 나중에 추가된 값이므로 홈으로 보낸다. 서버는 배포되고 앱은 심사를 거치니 배포 시차가 반드시 생기는데, 둘을 같게 처리하면 그 구간의 모든 알림 탭이 홈으로 튕긴다.",
      },
      {
        label: "한 문장",
        body: "푸시는 앱 코드만의 문제가 아니었다. 플러그인의 기본값, 네이티브 SDK의 토큰 종류, APNs 키 발급 환경, 서버와의 계약, OS 버전별 알림 정책까지 다섯 개 층위에서 각각 문제가 났고, 그중 셋은 조용히 실패하는 유형이라 로그를 봐도 드러나지 않았다.",
      },
    ],
    code: null,
  },
  {
    no: "03",
    tag: "GitHub Actions · iOS code signing · #312",
    title: "CI에서 iOS 코드 서명 디버깅 — 에러가 가리킨 곳은 범인이 아니었다",
    blocks: [
      {
        label: "목표",
        body: "매번 로컬에서 Android Studio와 Xcode를 열어 빌드하던 것을 GitHub Actions에서 AAB·IPA 자동 생성으로 옮겼다. Android는 수월했고 문제는 전부 iOS 쪽이었다.",
      },
      {
        label: "선행 문제",
        body: "Capacitor 8이 Node 22를 요구하는데 워크플로가 20에 고정돼 있었다. 기존 워크플로는 cap sync를 돌리지 않아 통과하던 상태였다.\n\nGoogleService-Info.plist가 없으면 Archive가 즉시 실패한다. Android는 파일 존재 체크가 있어 조용히 넘어가지만 iOS에는 그런 경로가 없다. public 레포라 gitignore 대상이어서 Secret에서 복원하는 스텝을 추가했다. 단 cap sync 뒤에 써야 한다 — 앞에 쓰면 sync가 덮어버린다.",
      },
      {
        label: "본론",
        body: "프로비저닝 프로파일 파싱이 “Cannot parse a NULL or zero-length data”로 실패했다. 메시지만 보면 Secret이 비어 있다는 뜻이라 처음엔 그렇게 판단하고 프로파일을 재발급받았다. 결과는 그대로였다.\n\n디코딩 결과의 바이트 수를 로그에 찍었더니 12539바이트. 비어 있는 문제가 아니었다. 다음으로 파일 앞부분을 hex로 찍었다. 30은 DER의 SEQUENCE 태그, 82는 길이가 2바이트로 표현된다는 뜻, 30f7은 12535다. 헤더 4바이트를 더하면 로그의 파일 크기와 정확히 일치한다. 파일은 완전히 정상이었다.\n\n한 스텝에 여러 명령이 묶여 있어 각 명령 앞뒤에 마커를 찍었다. 키체인 명령은 전부 통과하고 security cms만 실패했다.",
      },
      {
        label: "결론",
        body: "Secret은 처음부터 정상이었고, security cms가 정상 DER 프로파일을 파싱하지 못하는 도구 문제였다. 에러 메시지는 “데이터가 비었다”고 말했지만 실제로는 “이 도구가 이 데이터를 못 읽는다”였다. 같은 일을 하는 openssl smime으로 CMS 페이로드를 추출해 해결했다.",
      },
      {
        label: "그 밖에",
        body: "xcodebuild 커맨드라인에 넘긴 빌드 설정은 워크스페이스 전체 타깃에 적용된다. 그래서 프로파일 지정이 Pods 타깃 8개에도 걸려 “정적 프레임워크는 프로비저닝 프로파일을 가질 수 없다”는 에러가 났다. Podfile 훅으로는 막을 수 없다 — 커맨드라인 설정이 프로젝트 설정을 덮어쓰기 때문이다. 서명 설정을 App 타깃의 Release로 옮기고 커맨드라인에서 제거했다. Debug는 Automatic 그대로라 팀원들의 로컬 빌드는 영향받지 않는다.",
      },
      {
        label: "남긴 것",
        body: "Secret 디코딩 크기와 매직 바이트를 찍는 진단 가드는 해결 후에도 제거하지 않았다. 값이 잘못되면 모호한 에러 대신 어느 Secret이 문제인지 바로 알려준다. 이번에 오래 걸린 이유가 정확히 그 정보가 없어서였다. 디버깅 코드를 다 지우는 게 습관이지만, 다음 사람이 같은 벽에 부딪힐 곳에는 남겨두는 게 낫다고 판단했다.",
      },
      {
        label: "결과",
        body: "ARCHIVE·EXPORT 모두 성공. 이후 이 파이프라인으로 릴리즈를 계속 찍어 Android versionCode 16, iOS build 117.5까지 올라가 있다. 그리고 이 CI가 있었기 때문에 R8 크래시를 스토어 심사 전에 발견할 수 있었다.",
      },
    ],
    code: 'openssl smime -inform der -verify -noverify -in "$PROFILE_PATH" -out "$PROFILE_PLIST"\nPROFILE_UUID=$(/usr/libexec/PlistBuddy -c "Print UUID" "$PROFILE_PLIST")',
  },
  {
    no: "04",
    tag: "Auth · storage · interceptor",
    title: "웹과 앱이 토큰을 다르게 보관해야 할 때",
    blocks: [
      {
        label: "상황",
        body: "하나의 React 코드베이스로 웹과 앱을 모두 서비스하지만, 토큰 보관 방식은 두 환경에서 같을 수 없었다. 앱에서 localStorage를 쓰면 WebView 저장소에 평문으로 남는다. 네이티브 앱을 만드는 이상 OS의 Keychain·EncryptedSharedPreferences를 쓰는 게 맞다. 문제는 API가 다르다는 것 — localStorage는 동기, SecureStorage는 비동기다.",
      },
      {
        label: "추상화",
        body: "tokenStorage로 한 겹 감싸 호출부가 환경을 모르게 했다. 웹은 동기여도 되지만 인터페이스가 환경에 따라 달라지면 호출부가 분기를 알아야 하므로, 웹에서도 await을 붙이는 비용을 내고 인터페이스를 하나로 유지했다. SecureStorage는 키가 없으면 예외를 던지는데 localStorage는 null을 반환하니, 감싸는 층에서 동작을 맞춰줬다.",
      },
      {
        label: "토큰 두 종류",
        body: "accessToken 외에 signupToken이 있다. 소셜 로그인은 끝났지만 가입이 완료되지 않은 상태에서 쓰는 임시 토큰이다. 요청 인터셉터는 accessToken을 우선하고 없으면 signupToken을 붙이는데, 어느 쪽을 붙였는지 config에 기록한다. signupToken으로 보낸 요청이 401을 받았을 때 refresh를 시도하면 안 되기 때문이다.",
      },
      {
        label: "refresh 대기열",
        body: "화면 하나가 API 5개를 호출하는데 토큰이 만료되면 refresh가 5번 나간다. 서버는 하나만 유효하게 처리하고 나머지는 실패하거나 토큰을 덮어써 세션이 꼬인다. 첫 번째 401만 refresh를 실행하고 나머지는 Promise를 반환한 채 큐에서 대기하다가, 새 토큰으로 원래 요청을 재시도한다. 재시도한 요청이 또 401이면 더 시도하지 않고 세션을 정리한다.",
      },
      {
        label: "라우터 주입",
        body: "인터셉터는 모듈 스코프의 순수 함수라 navigate도 스토어도 직접 부를 수 없다. 세션이 끊겼을 때 호출할 콜백을 RootLayout이 등록하고, 인터셉터는 누가 무엇을 하는지 모른 채 호출만 한다.",
      },
      {
        label: "가장 마음에 든 부분",
        body: "accessToken을 버리는 경로를 clearSession 하나로 모았다. 두 문제를 동시에 막는다. 토큰만 지우고 앱 상태를 두면 로그인돼 보이는데 모든 요청이 401인 세션이 남고, 동시 요청이 각각 401을 받으면 로그인 화면 이동이 여러 번 트리거된다. “이미 토큰이 비어 있었다면 알리지 않는다”는 조건 하나로 첫 번째 호출만 통과시켰다.",
      },
      {
        label: "예외 경로",
        body: "인증 전 공개 엔드포인트는 401이 와도 refresh하면 안 된다. 로그인 실패의 원인이 “비밀번호가 틀렸다”인데 refresh를 시도해 그것도 실패하면, 사용자에게는 “세션이 만료됐다”는 엉뚱한 메시지가 간다. 로그아웃 요청도 별도 처리한다 — 로그아웃하다 401이 나는 건 이미 세션이 끝났다는 뜻이다.",
      },
      {
        label: "남은 것",
        body: "대기열이 모듈 전역 변수라 여러 axios 인스턴스를 쓰게 되면 상태가 섞인다. 지금은 인스턴스가 하나라 문제없지만 구조적으로는 인스턴스별 격리가 맞다. refreshToken은 httpOnly 쿠키로 다루는데, 네이티브 앱에서 쿠키 동작이 웹과 완전히 같은지 검증이 부족하다.",
      },
    ],
    code: "async function clearSession() {\n  const hadAccessToken = await tokenStorage.getAccessToken();\n  await tokenStorage.clear();\n  if (hadAccessToken) onSessionExpired?.();\n}",
  },
  {
    no: "05",
    tag: "Capacitor bridge · upload · #322",
    title: "Capacitor 브리지가 감당하지 못한 이미지 업로드",
    blocks: [
      {
        label: "증상",
        body: "사진 커뮤니티라 이미지 업로드가 핵심이다. presigned URL을 받아 직접 PUT하는 구조인데, 앱에서 대용량 이미지나 여러 장을 동시에 올리면 실패했다. 그런데 에러가 이상했다 — 진행 상황을 알리는 ProgressEvent가 그대로 reject로 올라왔다. 서버 응답도, HTTP 상태 코드도 없다. 에러 처리 경로 자체가 정상 동작하지 않고 있다는 뜻이다. 한 장씩 작은 이미지를 올릴 때는 재현되지 않았다.",
      },
      {
        label: "원인",
        body: "CapacitorHttp를 켜면 웹뷰의 fetch와 XMLHttpRequest를 가로채 네이티브 HTTP 클라이언트로 대신 보낸다. CORS를 우회할 수 있어 흔히 켜는 옵션이다. 문제는 그 과정에서 파일 전체가 JS와 네이티브 사이의 브리지를 통과해야 한다는 것이다. 원래 작은 JSON 메시지를 주고받으라고 만든 통로에 수 MB짜리 이미지를 여러 개 밀어 넣으면 감당하지 못한다. 브리지가 터지면 정상적인 HTTP 에러가 아니라 raw 이벤트가 그대로 튀어나온다.",
      },
      {
        label: "해결",
        body: "파일을 브리지에 태우지 않는다. JS는 파일을 캐시 디렉토리에 쓰고 경로 문자열만 네이티브에 넘기고, 네이티브가 그 경로의 파일을 직접 읽어 업로드한다. 브리지를 통과하는 건 짧은 문자열뿐이다. 웹은 네이티브 브리지가 없으므로 기존 fetch 경로를 유지했다.",
      },
      {
        label: "두 번째 버그",
        body: "전환하고 나서 Android에서만 새 에러가 났다. 처음엔 하위 디렉토리에 임시 파일을 썼는데, 두 파일을 Promise.all로 동시에 쓰면 같은 부모 디렉토리를 두 번 만들려는 경합이 발생한다. 해결은 코드가 아니라 경로 설계였다 — 캐시 디렉토리 바로 아래에 평평하게 쓰고, 파일명 충돌은 타임스탬프와 랜덤 문자열로 막았다.",
      },
      {
        label: "정리",
        body: "캐시에 파일을 쓰는 방식이라 반드시 지워야 한다. finally로 성공·실패 모두 정리하고, 삭제 자체가 실패해도 업로드 결과에는 영향을 주지 않게 했다. 임시 파일 하나 남는 것보다 업로드 성공을 알리는 게 우선이다. Cache 디렉토리를 쓴 것도 의도적이다 — OS가 공간이 부족할 때 알아서 비워주는 영역이라 정리에 실패해도 영구히 쌓이지 않는다.",
      },
      {
        label: "배운 것",
        body: "하이브리드 앱에서는 “어디서 실행되는가”가 성능 특성을 바꾼다. 같은 fetch 한 줄이 웹에서는 브라우저가 직접 처리하고 앱에서는 브리지를 왕복한다. 코드는 똑같이 생겼는데 동작이 다르다. 그리고 편의를 위해 켜는 옵션이 어디까지 개입하는지 알아야 한다 — CORS를 우회하려고 켠 설정이 파일 업로드 경로까지 바꿔놓고 있었다.",
      },
    ],
    code: 'const tempPath = `upload-${Date.now()}-${Math.random().toString(36).slice(2)}.tmp`;\nconst { uri } = await Filesystem.writeFile({\n  path: tempPath, data: base64Data,\n  directory: Directory.Cache, recursive: true,\n});\nawait FileTransfer.uploadFile({ url, path: uri, method: "PUT" });',
  },
];
