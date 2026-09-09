import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Mail, Phone } from "lucide-react";
import AnimateInView from "./animations/animate-in-view";
import SectionHeading from "./section-heading";

export default function About() {
  return (
    <section id="about" className="py-12 md:py-16 section-gradient full-height">
      <div className="container mx-auto px-4">
        <AnimateInView>
          <SectionHeading
            eyebrow="Introduction"
            title="About Me"
            description="A quick introduction to how I work, what I build, and the kinds of engineering problems I enjoy solving."
          />
        </AnimateInView>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <AnimateInView className="md:col-span-2" delay={0.2}>
            <Card className="bg-background/60 backdrop-blur-sm border-primary/20 h-full">
              <CardContent className="pt-6">
                <h3 className="text-lg md:text-xl font-semibold mb-4">
                  Profile
                </h3>
                <div className="space-y-4 text-muted-foreground">
                  <p className="text-sm md:text-base">
                    I&apos;m a backend-focused senior full-stack engineer who
                    likes building web apps, production APIs, AI-powered
                    features, and n8n automations that solve real business
                    problems.
                  </p>
                  <p className="text-sm md:text-base">
                    Most of my work has been around HRMS, ATS, payroll,
                    permissions, and internal platforms used by 100K+ users
                    across multiple countries. I care a lot about clean
                    backend architecture, reliable data, and business logic
                    that stays easy to understand, extend, and operate.
                  </p>
                  <p className="text-sm md:text-base">
                    I enjoy taking messy workflows and turning them into
                    systems that are easier to trust: clear domain models, RBAC
                    boundaries, faster queries, caching, integrations, and
                    event-driven flows.
                  </p>
                  <p className="text-sm md:text-base">
                    I also like building practical n8n automations for sales
                    bots, daily reminders, and sales analysis. Even this
                    portfolio runs on automation, with a daily cron sync from
                    my Notion notes into a living engineering knowledge base.
                  </p>
                </div>
              </CardContent>
            </Card>
          </AnimateInView>

          <AnimateInView delay={0.4}>
            <Card className="bg-background/60 backdrop-blur-sm border-primary/20 h-full">
              <CardContent className="pt-6">
                <h3 className="text-lg md:text-xl font-semibold mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a
                        href="mailto:kaungsathein.5899@gmail.com"
                        className="hover:underline text-sm md:text-base"
                      >
                        kaungsathein.5899@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <a
                        href="tel:+959788907030"
                        className="hover:underline text-sm md:text-base"
                      >
                        +959 788907030
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="text-sm md:text-base">Yangon, Myanmar</p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground">Focus</p>
                    <p className="text-sm md:text-base">
                      Backend, integrations, and scalable systems
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">LinkedIn</p>
                    <a
                      href="https://linkedin.com/in/kaungsathein"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-sm md:text-base"
                    >
                      linkedin.com/in/kaungsathein
                    </a>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Portfolio</p>
                    <a
                      href="https://kaungsathein.online"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-sm md:text-base"
                    >
                      kaungsathein.online
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimateInView>
        </div>
      </div>
    </section>
  );
}
