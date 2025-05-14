import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase } from "lucide-react"
import StaggeredChildren from "./animations/staggered-children"
import AnimateInView from "./animations/animate-in-view"

export default function Experience() {
  const experiences = [
    {
      title: "Web Backend Developer",
      company: "Better Jobs Myanmar",
      location: "Phnom Penh, Cambodia",
      period: "Dec 2024 - Present",
      current: true,
    },
    {
      title: "Web Backend Developer",
      company: "Better HR",
      location: "Yangon, Myanmar",
      period: "Feb 2024 - Present",
      current: true,
    },
    {
      title: "Web Backend Developer Trainee",
      company: "Better HR",
      location: "Yangon, Myanmar",
      period: "Oct 2023 - Jan 2024",
      current: false,
    },
  ]

  return (
    <section id="experience" className="py-12 md:py-16 section-gradient full-height">
      <div className="container mx-auto px-4">
        <AnimateInView>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Work Experience</h2>
        </AnimateInView>

        <StaggeredChildren className="space-y-4 md:space-y-6 max-w-3xl mx-auto" delay={0.2}>
          {experiences.map((exp, index) => (
            <Card key={index} className="bg-background/60 backdrop-blur-sm border-primary/20">
              <CardHeader className="pb-2 px-4 py-4 md:p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 md:gap-0">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                      <Briefcase className="h-5 w-5 text-primary" />
                      {exp.title}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm">{exp.company}</p>
                  </div>
                  <div className="md:text-right">
                    <Badge variant={exp.current ? "default" : "outline"} className="text-xs">
                      {exp.period}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{exp.location}</p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </StaggeredChildren>
      </div>
    </section>
  )
}
