import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
// Geist 는 라틴만 담고 있어 한글은 OS 기본 폰트로 떨어졌다. 한글은 Pretendard 가 받는다.
// 2MB 짜리 전체 파일 대신 unicode-range 로 92조각 낸 dynamic subset 을 쓴다 —
// 페이지에 실제로 쓰인 글자가 속한 조각만 내려받는다 (랜딩 기준 19조각 · 약 480KB)
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://jeonbinggu.vercel.app";
const DESCRIPTION =
  "React 단일 코드베이스를 Capacitor로 패키징해 웹과 Android·iOS에 출시하고 운영하는 프론트엔드 개발자 전병국의 포트폴리오.";

// 탭과 공유 링크에 이름이 나오도록. 상세 페이지는 template 으로 "Finders — 전병국" 이 된다
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "전병국 · Frontend Developer",
    template: "%s — 전병국",
  },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "전병국 · Frontend Developer",
    title: "전병국 · Frontend Developer",
    description: DESCRIPTION,
  },
};

// body 첫 자식으로 동기 실행돼 페인트 전에 테마가 확정된다 (FOUC 방지).
// className 이 아니라 data-theme 에 쓴다 — html 의 className 은 이 레이아웃이 렌더하는
// 값이라, 라우트 이동으로 루트 레이아웃이 다시 조정되면 명령형으로 붙인 클래스가 날아간다.
// data-theme 은 React 가 렌더하지 않는 속성이라 건드리지 않는다
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.dataset.theme="dark"}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      {/* html 에 height:100% 를 주면 Lenis 가 스크롤 한계를 뷰포트 높이로 고정해 버린다.
          푸터를 바닥에 붙이는 건 dvh 로 처리 */}
      <body className="flex min-h-dvh flex-col font-sans">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
