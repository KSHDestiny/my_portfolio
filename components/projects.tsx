import { getProjects } from "@/lib/projects";
import ProjectsClient from "./projects-client";

export default async function Projects() {
  const { productionProjects, keyFeatures, source } = await getProjects();

  return (
    <ProjectsClient
      productionProjects={productionProjects}
      keyFeatures={keyFeatures}
      source={source}
    />
  );
}
