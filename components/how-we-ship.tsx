import {
  Bot,
  ClipboardCheck,
  GitPullRequest,
  Layers,
  Rocket,
  ServerCog,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AnimateInView from "./animations/animate-in-view";
import StaggeredChildren from "./animations/staggered-children";
import SectionHeading from "./section-heading";

const STATS = [
  { value: "277", label: "commits authored or co-authored by Devin since Oct 2026" },
  { value: "28", label: "shared agent skills encoding team conventions" },
  { value: "On demand", label: "isolated PR previews, torn down on merge" },
];

const STEPS = [
  {
    icon: ClipboardCheck,
    title: "Scope the ticket",
    body: "An engineer frames the problem, the domain rules, and what done looks like. Product judgment stays with people; Devin gets a well-defined task.",
  },
  {
    icon: Layers,
    title: "Build with repo context",
    body: "Devin works in the monorepo with 28 shared skills covering backend patterns, permissions, PHP style, Lighthouse GraphQL, test-coverage review, and DevOps. A one-command local stack with a seeded demo tenant means payroll can actually be run before a PR opens.",
  },
  {
    icon: GitPullRequest,
    title: "Prove it in the PR",
    body: "Every PR follows an evidence template: what was tested and where, the scenario, observed before and after, nearby controls, and a Merge Danger rating - one-way or two-way door, plus blast radius. Evidence is attached to the PR, never committed.",
  },
  {
    icon: ServerCog,
    title: "Preview per pull request",
    body: "A label spins up an isolated preview with its own database, cloned copy-on-write from a stopped template instead of re-importing data. Closing or merging the PR tears it down.",
  },
  {
    icon: Rocket,
    title: "Promote deliberately",
    body: "CI runs on every pull request. Merging to dev deploys staging; production only moves through an explicit release pull request from dev to main.",
  },
  {
    icon: Bot,
    title: "Infrastructure too, not just features",
    body: "Devin also works on the delivery system itself: CI workflows, preview environments, and the internal Control Plane for audited tenant operations on Cloud Run and Cloud Tasks.",
  },
];

export default function HowWeShip() {
  return (
    <section id="shipping" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <AnimateInView>
          <SectionHeading
            eyebrow="Delivery"
            title="How We Ship Today"
            description="At Better HR, engineers direct Devin, Cognition's AI software engineer, across application code and infrastructure. People own the scope, the design, and the review; Devin does implementation and verification inside guardrails the team built."
          />
        </AnimateInView>

        <AnimateInView delay={0.1} className="mx-auto mb-8 max-w-5xl">
          <div className="grid gap-3 md:grid-cols-3">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-primary/20 bg-background/60 px-5 py-4 backdrop-blur-sm"
              >
                <p className="text-2xl font-semibold tracking-tight text-primary">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </AnimateInView>

        <StaggeredChildren
          className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2 lg:grid-cols-3"
          childrenClassName="h-full"
          delay={0.2}
        >
          {STEPS.map((step, index) => (
            <Card
              key={step.title}
              className="h-full border-primary/15 bg-background/60 backdrop-blur-sm"
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-3 text-base">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <step.icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="mr-1.5 text-primary/60">{index + 1}.</span>
                    {step.title}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">
                  {step.body}
                </p>
              </CardContent>
            </Card>
          ))}
        </StaggeredChildren>

        <AnimateInView delay={0.3} className="mx-auto mt-6 max-w-5xl">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4 text-sm leading-6 text-foreground/85">
            <span className="font-semibold text-foreground">My part: </span>
            I run my own tickets through this loop and own their design and
            review. Recent examples include General Ledger settings with
            payroll GL export, month-over-month dynamic payroll comparison,
            second and third approval layers for remote attendance, and
            provider fallback for the background agent.
          </div>
        </AnimateInView>
      </div>
    </section>
  );
}
