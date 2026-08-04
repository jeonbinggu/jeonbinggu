import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ScrollReveal from "@/components/ScrollReveal";

// about / work / contact 는 다음 이슈에서 시안대로 교체한다. 지금은 앵커만 잡아둔 자리
const placeholders = [
  { id: "about", title: "About" },
  { id: "work", title: "Selected Work" },
  { id: "contact", title: "Contact" },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <Hero />

        {placeholders.map(({ id, title }) => (
          <section
            key={id}
            id={id}
            className="flex min-h-screen items-center justify-center px-6"
          >
            <ScrollReveal className="max-w-xl text-center">
              <h2 className="text-section font-light tracking-heading">
                {title}
              </h2>
              <p className="mt-4 text-ink-muted">다음 이슈에서 구현합니다.</p>
            </ScrollReveal>
          </section>
        ))}
      </main>
    </>
  );
}
