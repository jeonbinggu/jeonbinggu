"use client";

/**
 * 상태를 React 에 두지 않고 DOM 클래스만 뒤집는다.
 * 아이콘도 dark: 변형으로 CSS 가 고르므로 hydration 불일치나 첫 프레임 깜빡임이 없다.
 */
export default function ThemeToggle() {
  return (
    <button
      type="button"
      aria-label="라이트/다크 테마 전환"
      onClick={() => {
        const dark = document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", dark ? "dark" : "light");
      }}
      className="glass flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full text-xs text-ink-muted transition-colors hover:text-accent"
    >
      <span className="dark:hidden">☾</span>
      <span className="hidden dark:inline">☀</span>
    </button>
  );
}
