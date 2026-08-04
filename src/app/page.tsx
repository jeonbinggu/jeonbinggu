import About from "@/components/About";
import Contact from "@/components/Contact";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import { socials } from "@/data/profile";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <Hero />
        <About />
        <Work />
        <Contact />
      </main>

      <footer className="border-t border-hairline">
        <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-4 px-6 py-8 md:px-gutter">
          <p className="font-mono text-xs text-ink-subtle">
            © {new Date().getFullYear()} 전병국
          </p>
          <ul className="flex gap-5">
            {socials.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-mono text-xs text-ink-muted transition-colors hover:text-accent"
                >
                  {label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
}
