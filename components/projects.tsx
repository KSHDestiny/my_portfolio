import dynamic from "next/dynamic";
import { getProjects } from "@/lib/projects";

const ProjectsClient = dynamic(() => import("./projects-client"));

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
