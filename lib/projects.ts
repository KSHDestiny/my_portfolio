// Project data: types, ordering registries, Notion sync, and the public loaders.
// The card content itself lives in ./content/ - edit there to change the site.

import { PRODUCTION_PROJECTS } from "./content/production-projects";
import { KEY_FEATURES } from "./content/key-features";


// ----------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------

export type ProjectTagDetail =
  | string
  | {
      summary: string;
      highlights?: string[];
      ctaLabel?: string;
      ctaUrl?: string;
    };

export type Project = {
  title: string;
  period: string;
  description: string;
  tags: string[];
  tagDetails?: Record<string, ProjectTagDetail>;
  periodCtaUrl?: string;
  periodCtaSlides?: string[];
  periodCtaMessage?: string;
  url?: string;
  infoMessage?: string;
  category?: "production" | "key-feature";
  order?: number;
};

export type ProjectsSource = "local" | "notion";

type ProjectsPayload = {
  productionProjects: Project[];
  keyFeatures: Project[];
  source: ProjectsSource;
};

type NotionRichText = {
  plain_text: string;
};

type NotionProperty =
  | {
      type: "title";
      title: NotionRichText[];
    }
  | {
      type: "rich_text";
      rich_text: NotionRichText[];
    }
  | {
      type: "multi_select";
      multi_select: { name: string }[];
    }
  | {
      type: "url";
      url: string | null;
    }
  | {
      type: "checkbox";
      checkbox: boolean;
    }
  | {
      type: "number";
      number: number | null;
    }
  | {
      type: "select";
      select: { name: string } | null;
    }
  | {
      type: "status";
      status: { name: string } | null;
    }
  | {
      type: "date";
      date: { start: string; end: string | null } | null;
    };

type NotionPage = {
  id: string;
  properties: Record<string, NotionProperty>;
};

type NotionQueryResponse = {
  results: NotionPage[];
};


// ----------------------------------------------------------------------
// Ordering & visibility registries
// ----------------------------------------------------------------------

const ALLOWED_KEY_FEATURE_TITLES = new Set([
  "ATS CV Upload & AI Profile Extraction",
  "Extract CV to Employee (AI)",
  "Candidate & Employee Analytics",
  "Expense Tracking System",
  "KPI Module",
  "Permission Group",
  "Indonesia Payroll",
]);

const KEY_FEATURE_ORDER: Record<string, number> = {
  "ATS CV Upload & AI Profile Extraction": 1,
  "Extract CV to Employee (AI)": 2,
  "Candidate & Employee Analytics": 3,
  "Expense Tracking System": 4,
  "KPI Module": 5,
  "Permission Group": 6,
  "Indonesia Payroll": 7,
};


// ----------------------------------------------------------------------
// Notion sync
// ----------------------------------------------------------------------

const NOTION_VERSION = "2022-06-28";

const TITLE_ALIASES = ["Name", "Title", "Project", "Project Name"];
const PERIOD_ALIASES = ["Period", "Timeline", "Date", "Dates"];
const DESCRIPTION_ALIASES = ["Description", "Summary", "Details", "Overview"];
const TAG_ALIASES = ["Tags", "Stack", "Technologies", "Skills"];
const URL_ALIASES = ["URL", "Link", "Website", "Project URL"];
const CATEGORY_ALIASES = ["Category", "Type", "Group"];
const ORDER_ALIASES = ["Order", "Sort", "Priority", "Rank"];
const VISIBILITY_ALIASES = ["Visible", "Published", "Show"];

function getProperty(
  properties: Record<string, NotionProperty>,
  aliases: string[],
) {
  const entries = Object.entries(properties);

  for (const alias of aliases) {
    const exactMatch = entries.find(([key]) => key === alias);
    if (exactMatch) return exactMatch[1];
  }

  const lowerAliases = aliases.map((alias) => alias.toLowerCase());
  return entries.find(([key]) => lowerAliases.includes(key.toLowerCase()))?.[1];
}

function toPlainText(property?: NotionProperty) {
  if (!property) return "";

  if (property.type === "title") {
    return property.title
      .map((item) => item.plain_text)
      .join("")
      .trim();
  }

  if (property.type === "rich_text") {
    return property.rich_text
      .map((item) => item.plain_text)
      .join("")
      .trim();
  }

  if (property.type === "select") {
    return property.select?.name?.trim() ?? "";
  }

  if (property.type === "status") {
    return property.status?.name?.trim() ?? "";
  }

  if (property.type === "url") {
    return property.url?.trim() ?? "";
  }

  if (property.type === "date" && property.date) {
    return property.date.end
      ? `${property.date.start} - ${property.date.end}`
      : property.date.start;
  }

  return "";
}

function toTags(property?: NotionProperty) {
  if (!property) return [];

  if (property.type === "multi_select") {
    return property.multi_select.map((item) => item.name).filter(Boolean);
  }

  const plainText = toPlainText(property);
  if (!plainText) return [];

  return plainText
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

function toNumber(property?: NotionProperty) {
  if (!property || property.type !== "number") return undefined;
  return property.number ?? undefined;
}

function toCheckbox(property?: NotionProperty) {
  if (!property || property.type !== "checkbox") return undefined;
  return property.checkbox;
}

function normalizeCategory(value: string) {
  const normalized = value.toLowerCase();
  return normalized.includes("large") || normalized.includes("key")
    ? "key-feature"
    : "production";
}

function mapNotionProject(page: NotionPage): Project | null {
  const title = toPlainText(getProperty(page.properties, TITLE_ALIASES));
  const description =
    toPlainText(getProperty(page.properties, DESCRIPTION_ALIASES)) ||
    "Project details coming soon.";

  if (!title) return null;

  const visible = toCheckbox(getProperty(page.properties, VISIBILITY_ALIASES));
  if (visible === false) return null;

  const period =
    toPlainText(getProperty(page.properties, PERIOD_ALIASES)) || "In progress";
  const category =
    normalizeCategory(
      toPlainText(getProperty(page.properties, CATEGORY_ALIASES)) ||
        "production",
    ) || "production";

  return {
    title,
    period,
    description,
    tags: toTags(getProperty(page.properties, TAG_ALIASES)),
    url: toPlainText(getProperty(page.properties, URL_ALIASES)) || undefined,
    category,
    order: toNumber(getProperty(page.properties, ORDER_ALIASES)),
  };
}

function sortProjects(projects: Project[]) {
  return [...projects].sort((left, right) => {
    const leftOrder = left.order ?? Number.MAX_SAFE_INTEGER;
    const rightOrder = right.order ?? Number.MAX_SAFE_INTEGER;

    if (leftOrder !== rightOrder) {
      return leftOrder - rightOrder;
    }

    return left.title.localeCompare(right.title);
  });
}

function isAllowedKeyFeature(project: Project) {
  return (
    project.category === "key-feature" &&
    ALLOWED_KEY_FEATURE_TITLES.has(project.title)
  );
}

function sortKeyFeatures(projects: Project[]) {
  return [...projects].sort((left, right) => {
    const leftOrder = KEY_FEATURE_ORDER[left.title] ?? Number.MAX_SAFE_INTEGER;
    const rightOrder =
      KEY_FEATURE_ORDER[right.title] ?? Number.MAX_SAFE_INTEGER;

    if (leftOrder !== rightOrder) {
      return leftOrder - rightOrder;
    }

    return sortProjects([left, right])[0] === left ? -1 : 1;
  });
}

function getLocalProjects(): ProjectsPayload {
  return {
    productionProjects: PRODUCTION_PROJECTS,
    keyFeatures: sortKeyFeatures(KEY_FEATURES),
    source: "local",
  };
}

async function getNotionProjects(): Promise<Project[] | null> {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_PROJECTS_DATABASE_ID;

  if (!token || !databaseId) {
    return null;
  }

  const response = await fetch(
    `https://api.notion.com/v1/databases/${databaseId}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Notion-Version": NOTION_VERSION,
      },
      body: JSON.stringify({
        page_size: 100,
      }),
      next: { revalidate: 300 },
    },
  );

  if (!response.ok) {
    throw new Error(`Notion request failed with status ${response.status}`);
  }

  const data = (await response.json()) as NotionQueryResponse;

  return data.results
    .map(mapNotionProject)
    .filter((project): project is Project => Boolean(project));
}

export async function getProjects(): Promise<ProjectsPayload> {
  try {
    const notionProjects = await getNotionProjects();

    if (!notionProjects || notionProjects.length === 0) {
      return getLocalProjects();
    }

    return {
      productionProjects: sortProjects(
        notionProjects.filter((project) => project.category !== "key-feature"),
      ),
      keyFeatures: sortKeyFeatures(notionProjects.filter(isAllowedKeyFeature)),
      source: "notion",
    };
  } catch (error) {
    console.error(
      "Falling back to local projects after Notion sync failed.",
      error,
    );
    return getLocalProjects();
  }
}

// ----------------------------------------------------------------------
// Public API
// ----------------------------------------------------------------------

export function slugifyProjectTitle(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function getAllProjects() {
  const { productionProjects, keyFeatures, source } = await getProjects();

  return {
    productionProjects,
    keyFeatures,
    source,
    allProjects: [...productionProjects, ...keyFeatures],
  };
}

export async function getProjectBySlug(slug: string) {
  const { allProjects } = await getAllProjects();
  return allProjects.find((project) => slugifyProjectTitle(project.title) === slug);
}
