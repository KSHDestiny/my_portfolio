import Hero from "@/components/hero";
import About from "@/components/about";
import Skills from "@/components/skills";
import Knowledge from "@/components/knowledge";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Education from "@/components/education";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import ScrollProgress from "@/components/scroll-progress";

export default function Home() {
  return (
    <main id="top" className="min-h-screen">
      <ScrollProgress />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Knowledge />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}
