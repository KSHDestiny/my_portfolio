"use client"

import { memo, type MouseEvent } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ExternalLink } from "lucide-react"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import AnimateInView from "./animations/animate-in-view"

type Project = {
  title: string
  period: string
  description: string
  tags: string[]
  url?: string
}

const PRODUCTION_PROJECTS: Project[] = [
  {
    title: "Better HR (HRMS)",
    period: "Oct 2023 - Present",
    description:
      "Built Duty Roster Analytics, Leave Breakdown, KPI Tracker, Recruitment Module, HR Settings, Indonesia Payroll, Excel/PDF tools, and push notifications. Optimized queries and caching to support 100K+ concurrent users across six countries.",
    tags: ["HRMS", "Scalability", "Performance", "Multi-country"],
  },
  {
    title: "History Logging Service",
    period: "Dec 2023 - Present",
    description:
      "Implemented Excel export for compliance and auditing, and strengthened security by validating JWT tokens against requested domains in a multi-tenant environment.",
    tags: ["Logging", "Auditing", "Security", "Multi-tenant"],
  },
  {
    title: "Middleware Service",
    period: "Jan 2024 - Present",
    description:
      "Integrated Thailand/Vietnam SMS OTP and Email OTP for secure authentication and payroll authorization, with reliable backend-to-backend transaction handling.",
    tags: ["Middleware", "OTP", "Authentication", "Payroll"],
  },
  {
    title: "Job Content Management System (CMS)",
    period: "Mar 2024 - Present",
    description:
      "Developed complete CMS features: job listings, sections, pages, mixed AND/OR filters, sorting, Google Indexing API integration, and ad push notifications with optimized cached endpoints.",
    tags: ["CMS", "Search", "Indexing", "Caching"],
  },
  {
    title: "Application Tracking System (ATS)",
    period: "Jun 2024 - Present",
    description:
      "Built application workflow automation from Screening to Offer, integrated ATS with HRMS, and implemented AI CV-PDF extraction to JSON in a single upload flow with atomic data consistency.",
    tags: ["ATS", "Workflow Automation", "AI CV Parsing", "Integration"],
  },
  {
    title: "Job Landing Platform",
    period: "Jul 2024 - Present",
    description:
      "Developed applicant-facing platform with SSO/email login, job applications, and inbox with a seamless and fast experience.",
    tags: ["Platform", "SSO", "Applications", "UX"],
    url: "https://betterjobs.co",
  },
  {
    title: "Customer Management System (Internal)",
    period: "Nov 2024 - Present",
    description:
      "Developed multi-country customer management backend for Better HR with Xero, Monday, Google Indexing API, and Notion integrations; implemented domain-level client lifecycle controls.",
    tags: ["CMS", "Integrations", "Xero", "Notion", "Multi-country"],
  },
  {
    title: "HR AI Chatbot Agent (Experimental)",
    period: "Mar 2025 - Present",
    description:
      "Researched and prototyped HR AI agent with NLP, LLM, LangChain, LangGraph, and RAG-based vector retrieval, including documented API workflows for integration.",
    tags: ["AI", "NLP", "LLM", "LangChain", "RAG"],
  },
]

const EXPERIMENTAL_PROJECTS: Project[] = [
  {
    title: "MVC Prototype using Pure PHP",
    period: "Experimental",
    description: "Demonstrated MVC architecture implementation from scratch using pure PHP and OOP patterns.",
    tags: ["PHP", "OOP", "MVC"],
    url: "https://github.com/KSHDestiny/PHP_OOP_Paradigm",
  },
  {
    title: "Learning Review Blog (Statamic CMS)",
    period: "Experimental",
    description: "Personal learning blog built on Laravel-based CMS.",
    tags: ["Laravel", "Statamic", "CMS"],
    url: "https://main--buildyourlaravelskillsblog.netlify.app",
  },
  {
    title: "NCC Project (JavaScript & jQuery)",
    period: "Experimental",
    description: "Coffee shop frontend simulation project built for coursework.",
    tags: ["JavaScript", "jQuery", "Frontend"],
    url: "https://kshdestiny.github.io/Bean-Boutique",
  },
  {
    title: "Portfolio Website (React & TypeScript)",
    period: "Experimental",
    description: "Interactive personal portfolio website built with React and TypeScript.",
    tags: ["React", "TypeScript", "Portfolio"],
    url: "https://ksh-portfolio-nu.vercel.app",
  },
  {
    title: "AI Chat-Bot with Custom Data (Python)",
    period: "Experimental",
    description: "LLM chatbot prototype that answers questions using user-provided datasets.",
    tags: ["Python", "LLM", "RAG"],
    url: "https://github.com/KSHDestiny/ai_chatbot_with_own_data",
  },
  {
    title: "AI Chat-Bot with AWS S3 Storage (Python)",
    period: "Experimental",
    description: "Cloud-backed conversational agent using AWS storage integration.",
    tags: ["Python", "AWS S3", "FastAPI", "AI"],
    url: "https://github.com/KSHDestiny/aws_fastapi_chatagent",
  },
]

const ProjectCard = memo(function ProjectCard({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const maskImage = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.15), transparent)`
  const style = { maskImage, WebkitMaskImage: maskImage }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onMouseMove={handleMouseMove}
    >
      <Card className="bg-background/60 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all h-full relative overflow-hidden">
        <motion.div className="pointer-events-none absolute inset-0 z-10 bg-primary/5" style={style} transition={{ duration: 0.1 }} />
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-base md:text-lg">{project.title}</CardTitle>
            <div className="flex items-center text-xs md:text-sm text-muted-foreground shrink-0">
              <Calendar className="h-4 w-4 mr-1" />
              {project.period}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags.map((tag, tagIndex) => (
              <Badge key={tagIndex} variant="secondary" className="text-xs bg-primary/10 text-primary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <CardDescription className="text-xs md:text-sm text-muted-foreground">{project.description}</CardDescription>
          {project.url && (
            <Link
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              Open Project
              <ExternalLink className="h-3 w-3" />
            </Link>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
})

export default function Projects() {
  return (
    <section id="projects" className="py-12 md:py-16 full-height">
      <div className="container mx-auto px-4">
        <AnimateInView>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Projects</h2>
        </AnimateInView>

        <AnimateInView delay={0.1}>
          <h3 className="text-lg md:text-xl font-semibold mb-4">Production Projects</h3>
        </AnimateInView>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-10">
          {PRODUCTION_PROJECTS.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <AnimateInView delay={0.2}>
          <h3 className="text-lg md:text-xl font-semibold mb-4">Experimental Projects</h3>
        </AnimateInView>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {EXPERIMENTAL_PROJECTS.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index + PRODUCTION_PROJECTS.length} />
          ))}
        </div>
      </div>
    </section>
  )
}
