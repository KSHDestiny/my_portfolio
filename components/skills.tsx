import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Code,
  Database,
  Server,
  Shield,
  Cpu,
  GitBranch,
  Box,
  TestTube,
  Sparkles,
} from "lucide-react";
import StaggeredChildren from "./animations/staggered-children";
import AnimateInView from "./animations/animate-in-view";
import SkillProgress from "./animations/skill-progress";

export default function Skills() {
  const programmingSkills = [
    { name: "JavaScript", level: 80 },
    { name: "PHP", level: 90 },
    { name: "Python", level: 80 },
    { name: "Laravel", level: 100 },
  ];

  const databaseSkills = [
    { name: "SQL", level: 90 },
    { name: "NoSQL", level: 80 },
    { name: "Database Design", level: 85 },
  ];

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code className="h-5 w-5 text-primary" />,
      skills: ["JavaScript", "Python", "PHP"],
    },
    {
      title: "Frameworks",
      icon: <Server className="h-5 w-5 text-primary" />,
      skills: ["Laravel"],
    },
    {
      title: "Databases",
      icon: <Database className="h-5 w-5 text-primary" />,
      skills: ["SQL", "NoSQL", "Database Management"],
    },
    {
      title: "Security",
      icon: <Shield className="h-5 w-5 text-primary" />,
      skills: ["Cybersecurity", "Web Services API"],
    },
    {
      title: "Computer Science",
      icon: <Cpu className="h-5 w-5 text-primary" />,
      skills: [
        "Algorithms",
        "Data Structures",
        "Object-Oriented Programming (OOP)",
        "Design Patterns",
      ],
    },
    {
      title: "DevOps",
      icon: <GitBranch className="h-5 w-5 text-primary" />,
      skills: ["Version Control", "Containerization"],
    },
    {
      title: "Testing",
      icon: <TestTube className="h-5 w-5 text-primary" />,
      skills: ["Software Testing"],
    },
    {
      title: "AI",
      icon: <Sparkles className="h-5 w-5 text-primary" />,
      skills: ["Generative AI"],
    },
    {
      title: "Integrations",
      icon: <Box className="h-5 w-5 text-primary" />,
      skills: [
        "Payment Gateways (KBZPay, WavePay)",
        "SSO Logins (Microsoft, Google, LinkedIn)",
        "OTP Features (SMS, Email)",
        "WebSockets (Pusher, Socket.io)",
        "Third-Party Services (Xero Invoice, Monday, Google Indexing API)",
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
