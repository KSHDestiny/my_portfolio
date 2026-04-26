import type { MetadataRoute } from "next";
import {
  getKnowledgeTopics,
  slugifyKnowledgeTitle,
  slugifyKnowledgeTopic,
} from "@/lib/knowledge";
import { getAllProjects, slugifyProjectTitle } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ allProjects }, knowledgeTopics] = await Promise.all([
    getAllProjects(),
    getKnowledgeTopics(),
  ]);

  const now = new Date();
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

  const knowledgeNoteRoutes: MetadataRoute.Sitemap = knowledgeTopics
    .flatMap((topic) =>
      topic.days.map((dayItem) => ({
        topicSlug: slugifyKnowledgeTopic(topic.title),
        noteSlug: slugifyKnowledgeTitle(dayItem.title),
      })),
    )
    .map(({ topicSlug, noteSlug }) => ({
      url: `${SITE_URL}/engineering-notes/${topicSlug}--${noteSlug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...staticRoutes, ...projectRoutes, ...knowledgeNoteRoutes];
}
