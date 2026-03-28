import dynamic from "next/dynamic";
import Hero from "@/components/hero";
import About from "@/components/about";
import Knowledge from "@/components/knowledge";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Footer from "@/components/footer";
import ScrollProgress from "@/components/scroll-progress";

const Skills = dynamic(() => import("@/components/skills"));
const Education = dynamic(() => import("@/components/education"));
const Contact = dynamic(() => import("@/components/contact"));

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
