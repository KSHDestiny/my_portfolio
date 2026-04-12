"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useMediaQuery } from "@/hooks/use-media-query";

const NAV_ITEMS = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Knowledge", href: "#knowledge" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
] as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const pathname = usePathname();

  useEffect(() => {
    if (isDesktop) {
      setIsOpen(false);
    }
  }, [isDesktop]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (sectionId: string) => {
    if (pathname === "/") {
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sectionIds = NAV_ITEMS.map((item) => item.href.slice(1));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))
      .sort((a, b) => a.offsetTop - b.offsetTop);

    if (sections.length === 0) {
      setActiveSection("");
      return;
    }

    let ticking = false;

    const updateActiveSection = () => {
      const activationOffset = 120;
      const activeSectionInView = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= activationOffset && rect.bottom > activationOffset;
      });

      if (activeSectionInView) {
        setActiveSection(activeSectionInView.id);
        ticking = false;
        return;
      }

      if (window.scrollY + activationOffset < sections[0].offsetTop) {
        setActiveSection("");
        ticking = false;
        return;
      }

      const reachedSections = sections.filter((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= activationOffset;
      });

      setActiveSection(reachedSections[reachedSections.length - 1].id);
      ticking = false;
    };

    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);

      if (hash && sectionIds.includes(hash as (typeof sectionIds)[number])) {
        setActiveSection(hash);
        return;
      }

      updateActiveSection();
    };

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(updateActiveSection);
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [pathname]);

  return (
    <nav className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-primary/10 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="#top" className="text-xl font-bold">
          Kaung Sat Hein
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={pathname === "/" ? item.href : `/${item.href}`}
              aria-current={
                pathname === "/" && activeSection === item.href.slice(1)
                  ? "page"
                  : undefined
              }
              className={`rounded-full px-3 py-1.5 transition-all duration-200 ${
                pathname === "/" && activeSection === item.href.slice(1)
                  ? "bg-primary/12 text-primary shadow-sm shadow-primary/10"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
              onClick={() => handleNavClick(item.href.slice(1))}
            >
              {item.name}
            </Link>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden absolute w-full bg-background/80 backdrop-blur-md border-b border-primary/10 z-40">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={pathname === "/" ? item.href : `/${item.href}`}
                aria-current={
                  pathname === "/" && activeSection === item.href.slice(1)
                    ? "page"
                    : undefined
                }
                className={`rounded-xl px-3 py-2 transition-all duration-200 ${
                  pathname === "/" && activeSection === item.href.slice(1)
                    ? "bg-primary/12 text-primary"
                    : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
                onClick={() => {
                  handleNavClick(item.href.slice(1));
                  setIsOpen(false);
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
