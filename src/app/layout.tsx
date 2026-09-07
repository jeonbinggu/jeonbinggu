import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio website",
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
