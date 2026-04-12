"use client";

import dynamic from "next/dynamic";
import type { Project, ProjectsSource } from "@/lib/projects";

function ProjectsFallback() {
  return (
    <section id="projects" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl animate-pulse space-y-4">
          <div className="h-4 w-32 rounded-full bg-primary/15" />
          <div className="h-10 w-72 rounded-full bg-muted" />
          <div className="h-[420px] rounded-[2rem] bg-muted/70" />
        </div>
      </div>
    </section>
  );
}

const ProjectsClient = dynamic(() => import("./projects-client"), {
  ssr: false,
  loading: () => <ProjectsFallback />,
});

type ProjectsShellProps = {
  productionProjects: Project[];
  keyFeatures: Project[];
  source: ProjectsSource;
};

export default function ProjectsShell(props: ProjectsShellProps) {
  return <ProjectsClient {...props} />;
}
