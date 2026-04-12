import { getProjects } from "@/lib/projects";
import ProjectsShell from "./projects-shell";

export default async function Projects() {
  const { productionProjects, keyFeatures, source } = await getProjects();

  return (
    <ProjectsShell
      productionProjects={productionProjects}
      keyFeatures={keyFeatures}
      source={source}
    />
  );
}
