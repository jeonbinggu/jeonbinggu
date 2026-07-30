import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-zinc-50 font-sans dark:bg-black">
      <section className="flex h-screen flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-6xl">
          Your Name
        </h1>
        <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
          Scroll down — smooth scroll is powered by Lenis and animations by
          GSAP ScrollTrigger.
        </p>
      </section>

      {["About", "Work", "Contact"].map((title) => (
        <section
          key={title}
          className="flex min-h-screen items-center justify-center px-8"
        >
          <ScrollReveal className="max-w-xl text-center">
            <h2 className="text-3xl font-semibold text-black dark:text-zinc-50">
              {title}
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              Replace this section with your own content.
            </p>
          </ScrollReveal>
        </section>
      ))}
    </main>
  );
}
