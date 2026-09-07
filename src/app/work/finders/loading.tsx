import Header from "@/components/Header";

// Link 프리페치가 걸려 있어 평소엔 거의 보이지 않는다. 느린 연결에서만 나오는 자리표시자.
// 실제 페이지의 상단 골격(제목 → 리드 → 칩 → 4칸 지표)과 높이를 맞춰 전환 시 튀지 않게 했다
export default function Loading() {
  return (
    <>
      <Header home />
      <main className="flex flex-1 flex-col">
        <div
          aria-busy
          aria-label="Finders 프로젝트 상세를 불러오는 중"
          className="mx-auto flex w-full max-w-page flex-col gap-[22px] px-6 pt-11 pb-[60px] md:px-gutter"
        >
          <div className="h-4 w-40 animate-pulse rounded-full bg-ink/10" />
          <div className="h-[62px] w-56 animate-pulse rounded-2xl bg-ink/10" />
          <div className="flex flex-col gap-2.5">
            <div className="h-5 w-full max-w-[640px] animate-pulse rounded-full bg-ink/[0.07]" />
            <div className="h-5 w-full max-w-[540px] animate-pulse rounded-full bg-ink/[0.07]" />
          </div>

          <div className="mt-[18px] grid grid-cols-2 gap-3.5 md:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="glass h-[92px] animate-pulse rounded-card"
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
