import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Work from "@/components/Work";

export default function Home() {
  return (
    <>
      <Header />
      {/* main 을 flex 컨테이너로 두면 mx-auto 를 가진 섹션이 flex 아이템이 되는데,
          교차축 margin 이 auto 면 stretch 가 꺼져 폭이 내용(fit-content)을 따라간다.
          아코디언을 펼칠 때 섹션이 넓어지던 원인 */}
      <main className="flex-1">
        <Hero />
        <About />
        <Work />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
