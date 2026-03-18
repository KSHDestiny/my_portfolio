"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Code,
  Database,
  Server,
  Shield,
  GitBranch,
  Box,
  Sparkles,
  Workflow,
} from "lucide-react";
import { useRef } from "react";
import AnimateInView from "./animations/animate-in-view";
import SkillProgress from "./animations/skill-progress";

export default function Skills() {
  const expertiseSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: expertiseSectionRef,
    offset: ["start start", "end end"],
  });
  const expertiseX = useTransform(scrollYProgress, [0, 1], ["0%", "-62%"]);

  const programmingSkills = [
    { name: "PHP", level: 92 },
    { name: "Laravel", level: 95 },
    { name: "React.js", level: 90 },
    { name: "JavaScript / TypeScript", level: 88 },
    { name: "Python (AI/NLP)", level: 78 },
  ];

  const databaseSkills = [
    { name: "MySQL", level: 92 },
    { name: "MongoDB", level: 86 },
    { name: "Redis / Caching", level: 88 },
  ];

  const skillCategories = [
    {
      id: "01",
      title: "Backend & Frameworks",
      icon: <Code className="h-5 w-5 text-primary" />,
      summary:
        "Building robust application logic, service layers, and production-ready backend architectures.",
      skills: ["PHP", "Laravel", "Node.js", "Python (AI/NLP)"],
    },
    {
      id: "02",
      title: "Frontend & Frameworks",
      icon: <Server className="h-5 w-5 text-primary" />,
      summary:
        "Crafting responsive interfaces with modern frontend patterns focused on clarity and usability.",
      skills: ["JavaScript", "TypeScript", "React.js", "Responsive UI"],
    },
    {
      id: "03",
      title: "Databases",
      icon: <Database className="h-5 w-5 text-primary" />,
      summary:
        "Designing efficient data models and improving performance across transactional and cached systems.",
      skills: ["MySQL", "MongoDB", "Redis", "Query Optimization"],
    },
    {
      id: "04",
      title: "API & Security",
      icon: <Shield className="h-5 w-5 text-primary" />,
      summary:
        "Designing API layers with practical authentication, authorization, and secure integration flows.",
      skills: [
        "RESTful APIs",
        "GraphQL",
        "JWT Auth",
        "Secure API Design",
        "Token Validation",
      ],
    },
    {
      id: "05",
      title: "DevOps & Tools",
      icon: <GitBranch className="h-5 w-5 text-primary" />,
      summary:
        "Supporting delivery pipelines, cloud services, and deployment tooling that keeps products moving.",
      skills: [
        "Docker",
        "Git",
        "CI/CD",
        "AWS S3",
        "AWS Lambda",
        "CloudWatch",
        "Nginx",
      ],
    },
    {
      id: "06",
      title: "Integrations",
      icon: <Box className="h-5 w-5 text-primary" />,
      summary:
        "Connecting products with third-party services, payments, messaging channels, and business systems.",
      skills: [
        "Payment Gateways (KBZPay, WavePay)",
        "SSO (Microsoft, Google, LinkedIn)",
        "OTP (Thailand SMS, Vietnam SMS, Email)",
        "WebSockets (Pusher, Socket.io)",
        "Xero, Monday, Notion, Google Indexing API",
      ],
    },
    {
      id: "07",
      title: "Workflow Engineering",
      icon: <Workflow className="h-5 w-5 text-primary" />,
      summary:
        "Orchestrating async jobs, serverless events, and resilient automation across product workflows.",
      skills: [
        "Queue Jobs & Task Scheduling",
        "SQS + Lambda (Serverless)",
        "Supervisor Background Queues",
        "Atomic Backend-to-Backend Flows",
      ],
    },
    {
      id: "08",
      title: "AI",
      icon: <Sparkles className="h-5 w-5 text-primary" />,
      summary:
        "Exploring AI-powered features that turn language models and retrieval into useful product flows.",
      skills: [
        "NLP",
        "LLM",
        "LangChain",
        "LangGraph",
        "RAG",
        "Vector Retrieval",
      ],
    },
  ];

  return (
    <section id="skills" className="py-12 md:py-16 full-height">
      <div className="container mx-auto px-4">
        <AnimateInView>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">
            Skills & Expertise
          </h2>
        </AnimateInView>

        <AnimateInView className="mb-8 md:mb-12" delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            <Card className="bg-background/60 backdrop-blur-sm border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Code className="h-5 w-5 text-primary" />
                  Programming Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {programmingSkills.map((skill, index) => (
                  <SkillProgress
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={0.2 + index * 0.1}
                  />
                ))}
              </CardContent>
            </Card>

            <Card className="bg-background/60 backdrop-blur-sm border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Database className="h-5 w-5 text-primary" />
                  Database Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {databaseSkills.map((skill, index) => (
                  <SkillProgress
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={0.2 + index * 0.1}
                  />
                ))}
              </CardContent>
            </Card>
          </div>
        </AnimateInView>

        <AnimateInView delay={0.4}>
          <div ref={expertiseSectionRef} className="relative h-[260vh]">
            <div className="sticky top-24 overflow-hidden rounded-3xl border border-primary/10 bg-gradient-to-br from-background via-background to-primary/5 px-4 py-6 md:px-6 md:py-8">
              <motion.div
                style={{ x: expertiseX }}
                className="flex w-max gap-5 will-change-transform"
              >
                {skillCategories.map((category, index) => (
                  <Card
                    key={index}
                    className="group relative w-[82vw] max-w-[360px] min-h-[300px] overflow-hidden whitespace-normal rounded-2xl border-primary/15 bg-background/75 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-xl hover:shadow-primary/10"
                  >
                    <div className="pointer-events-none absolute right-4 top-3 text-5xl font-bold tracking-tight text-primary/10 transition-colors duration-300 group-hover:text-primary/15">
                      {category.id}
                    </div>

                    <CardHeader className="pb-3">
                      <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-primary/70">
                        <span>{category.id}</span>
                        <span className="h-px flex-1 bg-primary/20" />
                      </div>
                      <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                        {category.icon}
                        {category.title}
                      </CardTitle>
                      <p className="pr-12 text-sm leading-6 text-muted-foreground">
                        {category.summary}
                      </p>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, skillIndex) => (
                          <Badge
                            key={skillIndex}
                            variant="secondary"
                            className="rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs md:text-sm text-primary"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </div>
          </div>
        </AnimateInView>
      </div>
    </section>
  );
}
