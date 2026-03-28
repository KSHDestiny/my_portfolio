import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import {
  getAllProjects,
  getProjectBySlug,
  slugifyProjectTitle,
} from "@/lib/projects";
import ProjectDetailClient from "./project-detail-client";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { allProjects } = await getAllProjects();

  return allProjects.map((project) => ({
    slug: slugifyProjectTitle(project.title),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Kaung Sat Hein`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border/60 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_50%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(239,246,255,0.92))] py-16 text-foreground dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_50%),linear-gradient(180deg,rgba(2,6,23,0.96),rgba(10,15,29,0.92))] dark:text-primary-foreground">
        <div className="container mx-auto px-4">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/70 px-4 py-2 text-sm text-muted-foreground transition hover:bg-background/90 hover:text-foreground dark:border-white/15 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Featured Work
          </Link>

          <div className="mt-8 max-w-4xl space-y-5">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary/80 dark:text-primary-foreground/65">
              <span>
                {project.category === "key-feature"
                  ? "Feature Highlight"
                  : "Project"}
              </span>
              <span className="h-1 w-1 rounded-full bg-primary/35 dark:bg-primary-foreground/35" />
              <span>{project.period}</span>
            </div>

            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-5xl">
                {project.title}
              </h1>
              <p className="max-w-3xl text-base leading-8 text-muted-foreground dark:text-primary-foreground/78 md:text-lg">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                View Portfolio Section
              </Link>

              {project.url ? (
                <Link
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/70 px-5 py-3 text-sm font-medium text-foreground transition hover:bg-background/90 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                >
                  Visit Project
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <ProjectDetailClient
            projectTitle={project.title}
            tags={project.tags}
            tagDetails={project.tagDetails}
          />
        </div>
      </section>
    </main>
  );
}
