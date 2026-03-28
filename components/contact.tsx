"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, ArrowUpRight, Download } from "lucide-react"
import AnimateInView from "./animations/animate-in-view"
import SectionHeading from "./section-heading"

export default function Contact() {
  const hiringFocus = [
    "Backend Developer roles with product and system ownership",
    "Full-stack opportunities with strong backend depth",
    "Teams building APIs, workflow systems, and internal platforms",
  ]

  const valueSignals = [
    "Production backend work across internal platforms, business workflows, and customer-facing systems",
    "Experience with business-rule-heavy systems, integrations, and workflow design",
    "Comfortable collaborating across product, operations, and engineering teams",
  ]

  return (
    <section id="contact" className="py-12 md:py-16 full-height">
      <div className="container mx-auto px-4">
        <AnimateInView>
          <SectionHeading
            eyebrow="Open To Opportunities"
            title="Let&apos;s Build Something Valuable"
            description="I&apos;m currently open to backend developer and backend-leaning full-stack roles where I can contribute to product delivery, business-critical workflows, and reliable system design."
          />
        </AnimateInView>

        <AnimateInView delay={0.15}>
          <div className="relative mx-auto mb-8 max-w-5xl overflow-hidden rounded-[2rem] border border-primary/20 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(239,246,255,0.96)_45%,rgba(219,234,254,0.92))] p-6 shadow-[0_28px_90px_-60px_rgba(59,130,246,0.35)] dark:bg-[linear-gradient(135deg,rgba(2,6,23,0.96),rgba(10,18,38,0.96)_45%,rgba(18,39,79,0.88))] dark:shadow-[0_28px_90px_-60px_rgba(59,130,246,0.9)] md:p-8">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:34px_34px] opacity-35" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.22),transparent_68%)]" />
            <div className="relative grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
              <div className="space-y-5">
                <div className="inline-flex rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.26em] text-primary/85">
                  Hiring Focus
                </div>
                <div className="space-y-3">
                  <h3 className="max-w-2xl text-2xl font-semibold tracking-[-0.04em] text-foreground md:text-4xl">
                    Looking for a developer who can own backend-heavy product work end to end.
                  </h3>
                  <p className="max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                    The best fit is a team that values reliable APIs, strong business logic, system clarity, and someone who can translate operational needs into production-ready features.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {hiringFocus.map((item) => (
                    <div
                      key={item}
                      className="rounded-full border border-primary/20 bg-background/65 px-3 py-1.5 text-xs text-foreground/85 backdrop-blur-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-primary/15 bg-background/55 p-5 backdrop-blur-sm">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary/80">
                  Why Reach Out
                </p>
                <div className="space-y-3">
                  {valueSignals.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <p className="text-sm leading-6 text-foreground/88">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimateInView>

        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-[0.95fr_1.05fr] max-w-5xl mx-auto">
          <div className="space-y-4 md:space-y-6">
            <AnimateInView delay={0.2}>
              <Card className="bg-background/60 backdrop-blur-sm border-primary/20">
                <CardHeader className="pb-2 px-4 py-4 md:p-6">
                  <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                    <Mail className="h-5 w-5 text-primary" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 md:px-6 md:pb-6">
                  <a
                    href="mailto:kaungsathein.5899@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm md:text-base"
                  >
                    kaungsathein.5899@gmail.com
                  </a>
                </CardContent>
              </Card>
            </AnimateInView>

            <AnimateInView delay={0.3}>
              <Card className="bg-background/60 backdrop-blur-sm border-primary/20">
                <CardHeader className="pb-2 px-4 py-4 md:p-6">
                  <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                    <Phone className="h-5 w-5 text-primary" />
                    Phone
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 md:px-6 md:pb-6">
                  <a
                    href="tel:+959788907030"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm md:text-base"
                  >
                    +959 788907030
                  </a>
                </CardContent>
              </Card>
            </AnimateInView>

            <AnimateInView delay={0.4}>
              <Card className="bg-background/60 backdrop-blur-sm border-primary/20">
                <CardHeader className="pb-2 px-4 py-4 md:p-6">
                  <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 md:px-6 md:pb-6">
                  <p className="text-muted-foreground text-sm md:text-base">Yangon, Myanmar</p>
                </CardContent>
              </Card>
            </AnimateInView>
          </div>

          <AnimateInView delay={0.5}>
            <Card className="bg-background/60 backdrop-blur-sm border-primary/20 shadow-[0_24px_70px_-50px_rgba(59,130,246,0.95)]">
              <CardHeader className="px-4 py-4 md:p-6">
                <CardTitle className="text-base md:text-lg">Direct Contact</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  If you&apos;re hiring or want to talk about an opportunity, email is the fastest way to reach me.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 pb-4 md:px-6 md:pb-6">
                <div className="space-y-5">
                  <div className="rounded-2xl border border-primary/15 bg-background/50 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/75">
                      Preferred Contact
                    </p>
                    <a
                      href="mailto:kaungsathein.5899@gmail.com?subject=Portfolio%20Inquiry"
                      className="mt-3 inline-flex items-center gap-2 text-base font-medium text-foreground transition hover:text-primary"
                    >
                      kaungsathein.5899@gmail.com
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      Include the role, team, or project context and I&apos;ll reply as soon as I can.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button asChild className="w-full">
                      <a href="mailto:kaungsathein.5899@gmail.com?subject=Portfolio%20Inquiry">
                        Email Me Directly
                        <Mail className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <a
                        href="/Kaung-Sat-Hein-CV.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download Resume
                        <Download className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>

                  <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4">
                    <p className="text-sm leading-6 text-muted-foreground">
                      Open to backend developer roles, backend-leaning full-stack work, and product teams that care about reliable systems, clean business logic, and steady delivery.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimateInView>
        </div>
      </div>
    </section>
  )
}
