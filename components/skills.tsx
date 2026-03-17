import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import StaggeredChildren from "./animations/staggered-children";
import AnimateInView from "./animations/animate-in-view";
import SkillProgress from "./animations/skill-progress";

export default function Skills() {
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
      title: "Backend & Frameworks",
      icon: <Code className="h-5 w-5 text-primary" />,
      skills: ["PHP", "Laravel", "Node.js", "Python (AI/NLP)"],
    },
    {
      title: "Frontend & Frameworks",
      icon: <Server className="h-5 w-5 text-primary" />,
      skills: ["JavaScript", "TypeScript", "React.js", "Responsive UI"],
    },
    {
      title: "Databases",
      icon: <Database className="h-5 w-5 text-primary" />,
      skills: ["MySQL", "MongoDB", "Redis", "Query Optimization"],
    },
    {
      title: "API & Security",
      icon: <Shield className="h-5 w-5 text-primary" />,
      skills: ["RESTful APIs", "GraphQL", "JWT Auth", "Secure API Design", "Token Validation"],
    },
    {
      title: "DevOps & Tools",
      icon: <GitBranch className="h-5 w-5 text-primary" />,
      skills: ["Docker", "Git", "CI/CD", "AWS S3", "AWS Lambda", "CloudWatch", "Nginx"],
    },
    {
      title: "Integrations",
      icon: <Box className="h-5 w-5 text-primary" />,
      skills: [
        "Payment Gateways (KBZPay, WavePay)",
        "SSO (Microsoft, Google, LinkedIn)",
        "OTP (Thailand SMS, Vietnam SMS, Email)",
        "WebSockets (Pusher, Socket.io)",
        "Xero, Monday, Notion, Google Indexing API",
      ],
    },
    {
      title: "Workflow Engineering",
      icon: <Workflow className="h-5 w-5 text-primary" />,
      skills: [
        "Queue Jobs & Task Scheduling",
        "SQS + Lambda (Serverless)",
        "Supervisor Background Queues",
        "Atomic Backend-to-Backend Flows",
      ],
    },
    {
      title: "AI",
      icon: <Sparkles className="h-5 w-5 text-primary" />,
      skills: ["NLP", "LLM", "LangChain", "LangGraph", "RAG", "Vector Retrieval"],
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

        <StaggeredChildren
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          delay={0.4}
        >
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className="bg-background/60 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all"
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                  {category.icon}
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge
                      key={skillIndex}
                      variant="secondary"
                      className="text-xs md:text-sm py-1 bg-primary/10 text-primary"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </StaggeredChildren>
      </div>
    </section>
  );
}
