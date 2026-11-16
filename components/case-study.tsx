import Image from "next/image";
import { ArrowUpRight, CheckCircle2, Compass, Scale, User } from "lucide-react";
import type { CaseStudy as CaseStudyData } from "@/lib/projects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DesignArtifacts({
  artifacts,
}: {
  artifacts: { label: string; url: string }[];
}) {
  if (artifacts.length === 0) return null;

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">
          Design Artifacts
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">
          Diagrams behind the work
        </h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {artifacts.map((artifact) => (
          <a
            key={artifact.url}
            href={artifact.url}
            target="_blank"
            rel="noreferrer"
            className="group overflow-hidden rounded-xl border border-primary/15 bg-background/80 transition hover:border-primary/45"
          >
            <div className="relative aspect-[4/3] w-full bg-white">
              <Image
                src={artifact.url}
                alt={artifact.label}
                fill
                className="object-contain p-3"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              />
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-primary/10 px-4 py-3 text-sm font-medium">
              {artifact.label}
              <ArrowUpRight className="h-4 w-4 text-primary transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export function FeatureCatalog({
  groups,
}: {
  groups: { area: string; items: string[] }[];
}) {
  if (groups.length === 0) return null;
  const total = groups.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">
          Features I Built
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">
          {total} capabilities across {groups.length} product areas
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {groups.map((group) => (
          <Card key={group.area} className="border-primary/15 bg-background/80">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between gap-3 text-base">
                {group.area}
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {group.items.length}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm leading-6 text-foreground/85">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/80" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function CaseStudy({ caseStudy }: { caseStudy: CaseStudyData }) {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-primary/15 bg-background/80">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="h-5 w-5 text-primary" />
              My Role
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7">
            <p className="text-foreground/90">{caseStudy.role}</p>
            <p className="text-muted-foreground">{caseStudy.context}</p>
          </CardContent>
        </Card>

        <Card className="border-primary/15 bg-background/80">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Compass className="h-5 w-5 text-primary" />
              Constraints
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm leading-6 text-foreground/85">
              {caseStudy.constraints.map((constraint) => (
                <li key={constraint} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/80" />
                  <span>{constraint}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">
            Key Decisions
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            What I chose, and what I traded for it
          </h2>
        </div>
        <ol className="space-y-3">
          {caseStudy.decisions.map((item, index) => (
            <li
              key={item.decision}
              className="rounded-xl border border-primary/15 bg-background/80 p-4 md:p-5"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {index + 1}
                </span>
                <div className="space-y-2">
                  <p className="font-medium leading-6 text-foreground">
                    {item.decision}
                  </p>
                  {item.instead ? (
                    <p className="flex items-start gap-2 text-sm leading-6 text-muted-foreground">
                      <Scale className="mt-1 h-3.5 w-3.5 shrink-0 text-primary/70" />
                      <span>
                        <span className="font-medium text-foreground/80">
                          Rather than:
                        </span>{" "}
                        {item.instead}
                      </span>
                    </p>
                  ) : null}
                  <p className="text-sm leading-6 text-muted-foreground">
                    {item.why}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            Outcomes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2 text-sm leading-6 text-foreground/85 md:grid-cols-2">
            {caseStudy.outcomes.map((outcome) => (
              <li key={outcome} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/80" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
