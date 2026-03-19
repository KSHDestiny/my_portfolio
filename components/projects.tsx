"use client";

import {
  memo,
  startTransition,
  useRef,
  useState,
  type MouseEvent,
  type WheelEvent,
} from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import AnimateInView from "./animations/animate-in-view";
import SectionHeading from "./section-heading";

type Project = {
  title: string;
  period: string;
  description: string;
  tags: string[];
  url?: string;
};

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
];

const EXPERIMENTAL_PROJECTS: Project[] = [
  {
    title: "MVC Prototype using Pure PHP",
    period: "Experimental",
    description:
      "Demonstrated MVC architecture implementation from scratch using pure PHP and OOP patterns.",
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
    description:
      "Coffee shop frontend simulation project built for coursework.",
    tags: ["JavaScript", "jQuery", "Frontend"],
    url: "https://kshdestiny.github.io/Bean-Boutique",
  },
  {
    title: "Portfolio Website (React & TypeScript)",
    period: "Experimental",
    description:
      "Interactive personal portfolio website built with React and TypeScript.",
    tags: ["React", "TypeScript", "Portfolio"],
    url: "https://ksh-portfolio-nu.vercel.app",
  },
  {
    title: "AI Chat-Bot with Custom Data (Python)",
    period: "Experimental",
    description:
      "LLM chatbot prototype that answers questions using user-provided datasets.",
    tags: ["Python", "LLM", "RAG"],
    url: "https://github.com/KSHDestiny/ai_chatbot_with_own_data",
  },
  {
    title: "AI Chat-Bot with AWS S3 Storage (Python)",
    period: "Experimental",
    description:
      "Cloud-backed conversational agent using AWS storage integration.",
    tags: ["Python", "AWS S3", "FastAPI", "AI"],
    url: "https://github.com/KSHDestiny/aws_fastapi_chatagent",
  },
];

function wrapIndex(index: number, length: number) {
  return (index + length) % length;
}

function getCardPose(offset: number) {
  const distance = Math.abs(offset);

  if (distance > 3) {
    return {
      x: offset > 0 ? "150%" : "-150%",
      rotateY: offset > 0 ? -62 : 62,
      scale: 0.54,
      opacity: 0,
      zIndex: 0,
      filter: "blur(4px) saturate(0.55)",
    };
  }

  const positions = ["0%", "54%", "92%", "122%"];
  const x =
    offset === 0 ? "0%" : `${offset < 0 ? "-" : ""}${positions[distance]}`;

  return {
    x,
    rotateY: offset * -28,
    scale: 1 - distance * 0.18,
    opacity: Math.max(0.14, 1 - distance * 0.32),
    zIndex: 50 - distance,
    filter: `blur(${distance * 1.1}px) saturate(${Math.max(0.3, 1 - distance * 0.28)}) brightness(${Math.max(
      0.5,
      1 - distance * 0.18,
    )})`,
  };
}

const ProjectSlide = memo(function ProjectSlide({
  project,
  offset,
  isActive,
  onSelect,
  onStep,
}: {
  project: Project;
  offset: number;
  isActive: boolean;
  onSelect: () => void;
  onStep: (direction: 1 | -1) => void;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const maskImage = useMotionTemplate`radial-gradient(220px at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.18), transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };
  const pose = getCardPose(offset);

  return (
    <motion.div
      className="absolute left-[36%] top-0 w-[84vw] max-w-[430px] -translate-x-1/2 cursor-pointer md:left-[37%]"
      animate={pose}
      initial={false}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformStyle: "preserve-3d", perspective: 1800 }}
      onClick={onSelect}
      drag={isActive ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        if (info.offset.x > 80) onStep(-1);
        if (info.offset.x < -80) onStep(1);
      }}
    >
      <Card
        onMouseMove={handleMouseMove}
        className={`relative h-[360px] overflow-hidden border-primary/20 backdrop-blur-xl transition-all ${
          isActive
            ? "bg-background/95 shadow-2xl shadow-primary/15 ring-1 ring-primary/20"
            : "bg-background/30 shadow-lg shadow-black/5"
        }`}
      >
        <motion.div
          className={`pointer-events-none absolute inset-0 z-10 ${
            isActive ? "bg-primary/10" : "bg-background/20"
          }`}
          style={style}
          transition={{ duration: 0.12 }}
        />
        {!isActive && (
          <div className="pointer-events-none absolute inset-0 z-10 bg-background/55" />
        )}
        <CardHeader className="relative z-20 pb-3">
          <div className="flex items-start justify-between gap-3">
            <CardTitle
              className={`text-base md:text-lg ${
                isActive ? "text-foreground" : "text-foreground/45"
              }`}
            >
              {project.title}
            </CardTitle>
            <div
              className={`flex items-center text-xs md:text-sm shrink-0 ${
                isActive ? "text-muted-foreground" : "text-muted-foreground/40"
              }`}
            >
              <Calendar className="mr-1 h-4 w-4" />
              {project.period}
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className={
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "bg-primary/5 text-primary/45"
                }
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="relative z-20 flex h-[220px] flex-col justify-between">
          <CardDescription
            className={`text-sm leading-6 ${
              isActive ? "text-muted-foreground" : "text-muted-foreground/38"
            }`}
          >
            {project.description}
          </CardDescription>
          {project.url && (
            <Link
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 text-sm ${
                isActive ? "text-primary hover:underline" : "text-primary/45"
              }`}
            >
              Open Project
              <ExternalLink className="h-4 w-4" />
            </Link>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
});

function ProjectCoverflowSection({
  title,
  projects,
  delay,
}: {
  title: string;
  projects: Project[];
  delay: number;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const lastWheelAtRef = useRef(0);
  const wheelLockRef = useRef(false);

  function goTo(index: number) {
    startTransition(() => {
      setActiveIndex(wrapIndex(index, projects.length));
    });
  }

  function goNext() {
    goTo(activeIndex + 1);
  }

  function goPrev() {
    goTo(activeIndex - 1);
  }

  function goToDelta(direction: 1 | -1) {
    goTo(activeIndex + direction);
  }

  function handleWheel(event: WheelEvent<HTMLDivElement>) {
    const isHorizontalIntent =
      event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) * 1.2;

    if (!isHorizontalIntent) return;

    const dominantDelta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;

    if (Math.abs(dominantDelta) < 24) return;

    if (wheelLockRef.current) return;

    const now = Date.now();
    if (now - lastWheelAtRef.current < 550) {
      return;
    }

    lastWheelAtRef.current = now;
    wheelLockRef.current = true;
    event.preventDefault();
    window.setTimeout(() => {
      wheelLockRef.current = false;
    }, 520);

    goToDelta(dominantDelta > 0 ? 1 : -1);
  }

  return (
    <AnimateInView delay={delay} className="mb-14">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          {/* <h3 className="text-lg md:text-xl font-semibold">{title}</h3> */}
        </div>
        <div className="hidden gap-2 md:flex">
          <button
            type="button"
            onClick={goPrev}
            className="rounded-full border border-primary/20 bg-background/70 p-3 text-primary transition hover:border-primary/50"
            aria-label={`Previous ${title}`}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="rounded-full border border-primary/20 bg-background/70 p-3 text-primary transition hover:border-primary/50"
            aria-label={`Next ${title}`}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        className="relative overflow-hidden rounded-[2rem] border border-primary/15 bg-gradient-to-br from-background via-background to-primary/5 px-4 py-8 md:px-8 md:py-10"
        onWheel={handleWheel}
        style={{ overscrollBehaviorX: "contain" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_55%)]" />
        <div className="relative h-[410px]" style={{ perspective: 2200 }}>
          {projects.map((project, index) => {
            const offset = index - activeIndex;
            return (
              <ProjectSlide
                key={project.title}
                project={project}
                offset={offset}
                isActive={index === activeIndex}
                onStep={goToDelta}
                onSelect={() => {
                  if (index === activeIndex) return;
                  goTo(index);
                }}
              />
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {projects.map((project, index) => (
            <button
              key={project.title}
              type="button"
              onClick={() => goTo(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === activeIndex
                  ? "w-10 bg-primary"
                  : "w-2.5 bg-primary/25"
              }`}
              aria-label={`Show ${project.title}`}
            />
          ))}
        </div>
      </div>
    </AnimateInView>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-12 md:py-16 full-height">
      <div className="container mx-auto px-4">
        <AnimateInView>
          <SectionHeading
            eyebrow="Selected Work"
            title="Projects"
            description="A mix of production systems and experiments that show how I approach scale, product problems, and engineering detail."
          />
        </AnimateInView>

        <ProjectCoverflowSection
          title="Production Projects"
          projects={PRODUCTION_PROJECTS}
          delay={0.1}
        />
        {/*
        <ProjectCoverflowSection
          title="Experimental Projects"
          projects={EXPERIMENTAL_PROJECTS}
          delay={0.2}
        />
        */}
      </div>
    </section>
  );
}
