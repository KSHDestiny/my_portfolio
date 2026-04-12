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
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

export default function Home() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    url: SITE_URL,
    image: absoluteUrl("/images/profile.jpeg"),
    jobTitle: "Backend-Focused Full-Stack Developer",
    description: SITE_DESCRIPTION,
    email: "mailto:kaungsathein.5899@gmail.com",
    telephone: "+959788907030",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Yangon",
      addressCountry: "MM",
    },
    sameAs: [
      "https://linkedin.com/in/kaungsathein",
      "https://github.com/KSHDestiny",
    ],
    knowsAbout: [
      "Backend Development",
      "Full-Stack Development",
      "Node.js",
      "Laravel",
      "React",
      "API Architecture",
      "Workflow Automation",
      "RBAC Systems",
      "Scalable Systems",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  };

  return (
    <main id="top" className="min-h-screen">
      <h1 className="sr-only">
        Kaung Sat Hein Portfolio and Backend-Focused Full-Stack Developer
      </h1>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <ScrollProgress />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Knowledge />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}
