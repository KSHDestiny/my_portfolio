import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Briefcase, MapPin, TrendingUp } from "lucide-react";
import AnimateInView from "./animations/animate-in-view";
import SectionHeading from "./section-heading";
import StaggeredChildren from "./animations/staggered-children";

export default function Experience() {
  const experiences = [
    {
      step: 1,
      title: "Web Backend Engineer (Trainee)",
      company: "Better HR",
      location: "Yangon, Myanmar",
      period: "Oct 2023 - Jan 2024",
      status: "Foundation",
      current: false,
      highlight:
        "Started with backend fundamentals, delivery flow, and production support.",
      desktopOffset: "md:ml-0",
    },
    {
      step: 2,
      title: "Web Backend Engineer",
      company: "Better HR / Better Jobs",
      location: "Yangon, Myanmar / Phnom Penh, Cambodia",
      period: "Feb 2024 - Mar 2026",
      status: "Growth",
      current: false,
      highlight:
        "Expanded into larger product ownership across Better HR and Better Jobs, covering integrations, scalable backend work, and recruitment-facing platform systems.",
      desktopOffset: "md:ml-20",
    },
    {
      step: 3,
      title: "Senior Web Backend Engineer",
      company: "Better HR",
      location: "Yangon, Myanmar",
      period: "Apr 2026 - Present",
      status: "Leadership",
      current: true,
      highlight:
        "Leading backend delivery at Better HR with broader ownership across architecture, scalability, and cross-team execution.",
      desktopOffset: "md:ml-40",
    },
  ];

  const ladderSteps = [
    { label: "Web Backend Engineer (Trainee)", tone: "completed" },
    { label: "Web Backend Engineer", tone: "completed" },
    { label: "Senior Web Backend Engineer", tone: "active" },
  ] as const;

  return (
    <section
      id="experience"
      className="py-12 md:py-16 section-gradient full-height"
    >
      <div className="container mx-auto px-4">
        <AnimateInView>
          <SectionHeading
            eyebrow="Career Path"
            title="Work Experience"
            description="A stepped journey through the roles, teams, and responsibilities that shaped my backend engineering growth."
          />
        </AnimateInView>

        <AnimateInView delay={0.1} className="mx-auto mb-8 max-w-5xl">
          <Card className="border-primary/20 bg-background/60 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.24em] text-primary/80">
                <TrendingUp className="h-4 w-4" />
                Career Ladder
              </div>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-4">
                {ladderSteps.map((step, index) => {
                  const stepTone =
                    step.tone === "completed"
                      ? "border-primary/20 bg-primary/10 text-foreground"
                      : step.tone === "active"
                        ? "border-primary/40 bg-primary text-white shadow-lg shadow-primary/20"
                        : "border-dashed border-primary/30 bg-background text-muted-foreground";

                  const stepHeight =
                    index === 0
                      ? "md:translate-y-8"
                      : index === 1
                        ? "md:translate-y-4"
                        : "";

                  return (
                    <div
                      key={step.label}
                      className={`relative flex-1 ${stepHeight}`}
                    >
                      {index < ladderSteps.length - 1 && (
                        <div className="absolute left-1/2 top-[1.65rem] hidden h-px w-[calc(100%-1rem)] bg-gradient-to-r from-primary/50 to-primary/15 md:block" />
                      )}

                      <div
                        className={`relative rounded-2xl border px-4 py-4 transition-transform duration-500 md:min-h-[116px] ${stepTone}`}
                      >
                        <div className="mb-3 flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-current/25 bg-background/50 text-sm font-semibold">
                            {index + 1}
                          </div>
                          {index < ladderSteps.length - 1 && (
                            <ArrowUpRight className="h-4 w-4 text-current/70 md:hidden" />
                          )}
                        </div>
                        <p className="text-sm font-semibold leading-snug md:text-base">
                          {step.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </AnimateInView>

        <StaggeredChildren
          className="mx-auto max-w-5xl space-y-4 md:space-y-5"
          delay={0.2}
        >
          {experiences.map((exp) => (
            <div
              key={`${exp.company}-${exp.title}`}
              className={exp.desktopOffset}
            >
              <Card className="overflow-hidden border-primary/20 bg-background/60 backdrop-blur-sm">
                <CardHeader className="border-b border-primary/10 px-4 py-4 md:px-6">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-2">
                      <Badge
                        variant="outline"
                        className="w-fit border-primary/30 bg-primary/5 text-[11px] uppercase tracking-[0.2em] text-primary/80"
                      >
                        Step {exp.step} · {exp.status}
                      </Badge>
                      <CardTitle className="flex items-start gap-2 text-base md:text-lg">
                        <Briefcase className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <span>{exp.title}</span>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {exp.company}
                      </p>
                    </div>

                    <div className="flex flex-col items-start gap-2 md:items-end">
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          exp.current
                            ? "border-primary/25 bg-primary/12 text-foreground"
                            : ""
                        }`}
                      >
                        {exp.period}
                      </Badge>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        {exp.location}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="px-4 py-4 md:px-6">
                  <p className="text-sm leading-6 text-muted-foreground">
                    {exp.highlight}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </StaggeredChildren>
      </div>
    </section>
  );
}
