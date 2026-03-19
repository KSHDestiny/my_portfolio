"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("about")
  const isDesktop = useMediaQuery("(min-width: 768px)")

  useEffect(() => {
    if (isDesktop) {
      setIsOpen(false)
    }
  }, [isDesktop])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Knowledges", href: "#knowledges" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ]

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.slice(1))
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))

    if (sections.length === 0) return

    const updateActiveSection = () => {
      const navbarOffset = 140
      const activationY = window.scrollY + navbarOffset

      let currentSection = sections[0].id

      for (const section of sections) {
        if (activationY >= section.offsetTop) {
          currentSection = section.id
        }
      }

      const nearPageBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 8

      if (nearPageBottom) {
        setActiveSection(sections[sections.length - 1].id)
        return
      }

      setActiveSection(currentSection)
    }

    updateActiveSection()
    window.addEventListener("scroll", updateActiveSection, { passive: true })
    window.addEventListener("resize", updateActiveSection)

    return () => {
      window.removeEventListener("scroll", updateActiveSection)
      window.removeEventListener("resize", updateActiveSection)
    }
  }, [])

  return (
    <nav className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-primary/10 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Kaung Sat Hein
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              aria-current={activeSection === item.href.slice(1) ? "page" : undefined}
              className={`rounded-full px-3 py-1.5 transition-colors ${
                activeSection === item.href.slice(1)
                  ? "bg-primary/12 text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
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
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                aria-current={activeSection === item.href.slice(1) ? "page" : undefined}
                className={`rounded-xl px-3 py-2 transition-colors ${
                  activeSection === item.href.slice(1)
                    ? "bg-primary/12 text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
