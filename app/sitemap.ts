import type { MetadataRoute } from "next";
import { getKnowledgeTopics, slugifyKnowledgeTitle } from "@/lib/knowledge";
import { getAllProjects, slugifyProjectTitle } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ allProjects }, knowledgeTopics] = await Promise.all([
    getAllProjects(),
    getKnowledgeTopics(),
  ]);

  const now = new Date();
  const engineeringTopic = knowledgeTopics.find(
    (topic) => topic.title === "Advanced Software Engineering",
  );

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = allProjects.map((project) => ({
    url: `${SITE_URL}/projects/${slugifyProjectTitle(project.title)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const engineeringNoteRoutes: MetadataRoute.Sitemap =
    engineeringTopic?.days.map((dayItem) => ({
      url: `${SITE_URL}/engineering-notes/${slugifyKnowledgeTitle(dayItem.title)}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    })) ?? [];

  return [...staticRoutes, ...projectRoutes, ...engineeringNoteRoutes];
}
