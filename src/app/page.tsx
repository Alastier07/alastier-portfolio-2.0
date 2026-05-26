import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import FadeIn from "@/components/FadeIn";

export default function Home() {
  return (
    <>
      <FadeIn>
        <Hero />
      </FadeIn>
      <FadeIn>
        <Projects />
      </FadeIn>
      <FadeIn>
        <Skills />
      </FadeIn>
      <FadeIn>
        <Experience />
      </FadeIn>
      <FadeIn>
        <Contact />
      </FadeIn>
      <footer className="border-t pt-6 pb-2 text-sm text-muted text-center">
        <p>&copy; {new Date().getFullYear()} — Alastier C.</p>
      </footer>
    </>
  );
}
