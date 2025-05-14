"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import AnimateInView from "./animations/animate-in-view"

export default function Projects() {
  const projects = [
    {
      title: "HR AI Chatbot Agent",
      period: "Mar 2025 - Present",
      description:
        "Developing an HR AI Agent Bot using NLP, LLM, LangChain, LangGraph, embedding, and vector store technologies (RAG) to handle HR-related queries. The bot retrieves real-time information, improving HR support efficiency and enhancing the user experience by automating routine tasks.",
      tags: ["AI", "NLP", "LLM", "LangChain", "RAG"],
    },
    {
      title: "Customer Management System (Internal)",
      period: "Nov 2024 - Present",
      description:
        "Developing a Customer Management System focusing on features like SSO login, Xero invoice, customer management, software payment, payroll authorizer, Monday integration, and customer health score. Ensuring smooth integration and efficient management of customer data, payments, and workflows.",
      tags: ["CMS", "SSO", "Integrations", "Payments"],
    },
    {
      title: "Job Landing Platform",
      period: "Jul 2024 - Present",
      description:
        "Developing a Job Landing Platform focusing on features like SSO login, email login, job apply, applications, and inbox for applicants. Ensuring a seamless and user-friendly experience for job seekers to easily apply for jobs and manage their applications.",
      tags: ["Job Platform", "SSO", "User Experience"],
    },
    {
      title: "Application Tracking System (ATS)",
      period: "Jun 2024 - Present",
      description:
        "Developing an Application Tracking System focusing on optimizing recruitment. Building the backend to track applications, automate candidate sorting, and streamline communication (Screening, Qualified, Interview, Shortlist, Offer). The ATS integrates with HRMS, making it easier for businesses to manage candidates and make faster, data-driven hiring decisions.",
      tags: ["ATS", "Recruitment", "Automation"],
    },
    {
      title: "Job Content Management System (CMS)",
      period: "Mar 2024 - Present",
      description:
        "Developing a Job Content Management System focusing on features like job listings collections, sections, pages, sorting/filtering jobs and integrating Google Indexing API. Ensuring all endpoints are optimized for querying under one second, providing a fast and efficient experience for applicants to browse and view job content.",
      tags: ["CMS", "API Integration", "Performance"],
    },
    {
      title: "Middleware Service",
      period: "Jan 2024 - Present",
      description:
        "Developing Middleware Services focusing on integrating SMS OTP for Thailand and Vietnam, as well as Email OTP for secure user authentication. Building the backend to seamlessly incorporate these services, ensuring secure and localized authentication options for users across regions.",
      tags: ["Middleware", "OTP", "Authentication"],
    },
    {
      title: "History Logging Service",
      period: "Dec 2023 - Present",
      description:
        "Developing the History Logging feature, tracking user actions and system events. Added the ability to download event logs in Excel format, allowing businesses to easily export and analyze historical data for auditing and compliance.",
      tags: ["Logging", "Auditing", "Excel Export"],
    },
    {
      title: "Better HR (HRMS)",
      period: "Oct 2023 - Present",
      description:
        "Working on building and maintaining a Human Resource Management System (HRMS). Focusing on developing and maintaining key features like employee management, attendance tracking, leave management, excel export/import and HR settings. Helping ensure the system is fast, reliable, and tailored to meet the needs of businesses in six countries including Singapore, making HR processes more efficient and easier to manage.",
      tags: ["HRMS", "HR Management", "Multi-country"],
    },
  ]

  const ProjectCard = ({ project, index }: { project: (typeof projects)[0]; index: number }) => {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
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
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        onMouseMove={handleMouseMove}
      >
        <Card className="bg-background/60 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all h-full relative overflow-hidden">
          <motion.div
            className="pointer-events-none absolute inset-0 z-10 bg-primary/5"
            style={style}
            transition={{ duration: 0.1 }}
          />
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base md:text-lg">{project.title}</CardTitle>
              <div className="flex items-center text-xs md:text-sm text-muted-foreground">
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
          <CardContent>
            <CardDescription className="text-xs md:text-sm text-muted-foreground">
              {project.description}
            </CardDescription>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <section id="projects" className="py-12 md:py-16 full-height">
      <div className="container mx-auto px-4">
        <AnimateInView>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Projects</h2>
        </AnimateInView>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
