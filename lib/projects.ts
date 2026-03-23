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
  url?: string;
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

const NOTION_VERSION = "2022-06-28";

const TITLE_ALIASES = ["Name", "Title", "Project", "Project Name"];
const PERIOD_ALIASES = ["Period", "Timeline", "Date", "Dates"];
const DESCRIPTION_ALIASES = ["Description", "Summary", "Details", "Overview"];
const TAG_ALIASES = ["Tags", "Stack", "Technologies", "Skills"];
const URL_ALIASES = ["URL", "Link", "Website", "Project URL"];
const CATEGORY_ALIASES = ["Category", "Type", "Group"];
const ORDER_ALIASES = ["Order", "Sort", "Priority", "Rank"];
const VISIBILITY_ALIASES = ["Visible", "Published", "Show"];

const LOCAL_PRODUCTION_PROJECTS: Project[] = [
  {
    title: "Better HR (HRMS)",
    period: "Oct 2023 - Present",
    description:
      "Built Duty Roster Analytics, Leave Breakdown, KPI Tracker, Recruitment Module, HR Settings, Indonesia Payroll, Excel/PDF tools, and push notifications. Optimized queries and caching to support 100K+ concurrent users across six countries.",
    tags: ["HRMS", "Scalability", "Performance", "Multi-country"],
    category: "production",
  },
  {
    title: "History Logging Service",
    period: "Dec 2023 - Present",
    description:
      "Implemented Excel export for compliance and auditing, and strengthened security by validating JWT tokens against requested domains in a multi-tenant environment.",
    tags: ["Logging", "Auditing", "Security", "Multi-tenant"],
    category: "production",
  },
  {
    title: "Middleware Service",
    period: "Jan 2024 - Present",
    description:
      "Integrated Thailand/Vietnam SMS OTP and Email OTP for secure authentication and payroll authorization, with reliable backend-to-backend transaction handling.",
    tags: ["Middleware", "OTP", "Authentication", "Payroll"],
    category: "production",
  },
  {
    title: "Job Content Management System (CMS)",
    period: "Mar 2024 - Present",
    description:
      "Developed complete CMS features: job listings, sections, pages, mixed AND/OR filters, sorting, Google Indexing API integration, and ad push notifications with optimized cached endpoints.",
    tags: ["CMS", "Search", "Indexing", "Caching"],
    category: "production",
  },
  {
    title: "Application Tracking System (ATS)",
    period: "Jun 2024 - Present",
    description:
      "Built application workflow automation from Screening to Offer, integrated ATS with HRMS, and implemented AI CV-PDF extraction to JSON in a single upload flow with atomic data consistency.",
    tags: ["ATS", "Workflow Automation", "AI CV Parsing", "Integration"],
    category: "production",
  },
  {
    title: "Job Landing Platform",
    period: "Jul 2024 - Present",
    description:
      "Developed applicant-facing platform with SSO/email login, job applications, and inbox with a seamless and fast experience.",
    tags: ["Platform", "SSO", "Applications", "UX"],
    url: "https://betterjobs.co",
    category: "production",
  },
  {
    title: "Customer Management System (Internal)",
    period: "Nov 2024 - Present",
    description:
      "Developed multi-country customer management backend for Better HR with Xero, Monday, Google Indexing API, and Notion integrations; implemented domain-level client lifecycle controls.",
    tags: ["CMS", "Integrations", "Xero", "Notion", "Multi-country"],
    category: "production",
  },
  {
    title: "HR AI Chatbot Agent (Experimental)",
    period: "Mar 2025 - Present",
    description:
      "Researched and prototyped HR AI agent with NLP, LLM, LangChain, LangGraph, and RAG-based vector retrieval, including documented API workflows for integration.",
    tags: ["AI", "NLP", "LLM", "LangChain", "RAG"],
    category: "production",
  },
];

const LOCAL_KEY_FEATURES: Project[] = [
  {
    title: "Expense Tracking System",
    period: "View UI",
    periodCtaUrl: "/expense/expense.gif",
    description:
      "Designed and documented complete expense module scope: use cases, system architecture, flowcharts, ERD, implementation plan, and testing/edge cases. Includes sequential multi-level approval, paid-out handling, and final reclassification.",
    tags: [
      "Requirements",
      "Architecture",
      "Workflow",
      "ERD",
      "Implementation",
      "Testing",
    ],
    tagDetails: {
      Requirements: {
        summary:
          "Mapped complete product scope and user journeys for dashboard, policy, finance, inbox, and mobile.",
        highlights: [
          "Role-based use cases and permissions",
          "Clear request and approval status definitions",
          "Business rules for category and approval lifecycle",
        ],
        ctaLabel: "Open Use Case Diagram",
        ctaUrl: "/expense/expense-usecase.svg",
      },
      Architecture: {
        summary:
          "Defined service boundaries and integration points for expense flow, approvals, files, and notifications, where Setting is reference-only and not tightly coupled to Expense runtime operations.",
        highlights: [
          "Setting data is used as reference metadata only",
          "No tight coupling between Setting and Expense module behaviors",
          "Web and mobile client channels",
          "Workflow and notification orchestration",
          "Security and audit boundaries",
        ],
        ctaLabel: "Open Architecture Diagram",
        ctaUrl: "/expense/expense-architecture.svg",
      },
      Workflow: {
        summary:
          "Designed sequential approval lifecycle with immutable snapshots and controlled finance transitions.",
        highlights: [
          "Up to 4 approvers in strict order",
          "Approval to paid-out lifecycle transition",
          "Policy-change safety rules",
        ],
        ctaLabel: "Open Workflow Diagram",
        ctaUrl: "/expense/expense-workflow.svg",
      },
      ERD: {
        summary:
          "Created a relational model covering categories, policy mapping, expenses, approvers, and file attachments.",
        highlights: [
          "Loose coupling via request-time approver snapshot",
          "Policy updates do not mutate existing expense records",
          "Attachment + proof-of-payment traceability",
        ],
        ctaLabel: "Open ERD Diagram",
        ctaUrl: "/expense/expense-structure.svg",
      },
      Implementation: {
        summary:
          "Prepared phased rollout plan with API tasks, UI tasks, permissions, and migration strategy.",
        highlights: [
          "Dashboard + mobile delivery slices",
          "Feature-ready validation gates",
          "Safe rollout checklist and fallback",
        ],
      },
      Testing: {
        summary:
          "Specified unit, integration, and E2E coverage with high-risk edge cases.",
        highlights: [
          "Sequential approval race-condition checks",
          "Policy updates do not impact existing expenses",
          "Paid-out and finance field access guards",
        ],
      },
    },
    category: "key-feature",
  },
  {
    title: "MVC Prototype using Pure PHP",
    period: "Key Feature",
    description:
      "Demonstrated MVC architecture implementation from scratch using pure PHP and OOP patterns.",
    tags: ["PHP", "OOP", "MVC"],
    url: "https://github.com/KSHDestiny/PHP_OOP_Paradigm",
    category: "key-feature",
  },
  {
    title: "Learning Review Blog (Statamic CMS)",
    period: "Key Feature",
    description: "Personal learning blog built on Laravel-based CMS.",
    tags: ["Laravel", "Statamic", "CMS"],
    url: "https://main--buildyourlaravelskillsblog.netlify.app",
    category: "key-feature",
  },
  {
    title: "NCC Project (JavaScript & jQuery)",
    period: "Key Feature",
    description:
      "Coffee shop frontend simulation project built for coursework.",
    tags: ["JavaScript", "jQuery", "Frontend"],
    url: "https://kshdestiny.github.io/Bean-Boutique",
    category: "key-feature",
  },
  {
    title: "Portfolio Website (React & TypeScript)",
    period: "Key Feature",
    description:
      "Interactive personal portfolio website built with React and TypeScript.",
    tags: ["React", "TypeScript", "Portfolio"],
    url: "https://ksh-portfolio-nu.vercel.app",
    category: "key-feature",
  },
  {
    title: "AI Chat-Bot with Custom Data (Python)",
    period: "Key Feature",
    description:
      "LLM chatbot prototype that answers questions using user-provided datasets.",
    tags: ["Python", "LLM", "RAG"],
    url: "https://github.com/KSHDestiny/ai_chatbot_with_own_data",
    category: "key-feature",
  },
  {
    title: "AI Chat-Bot with AWS S3 Storage (Python)",
    period: "Key Feature",
    description:
      "Cloud-backed conversational agent using AWS storage integration.",
    tags: ["Python", "AWS S3", "FastAPI", "AI"],
    url: "https://github.com/KSHDestiny/aws_fastapi_chatagent",
    category: "key-feature",
  },
];

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

function getLocalProjects(): ProjectsPayload {
  return {
    productionProjects: LOCAL_PRODUCTION_PROJECTS,
    keyFeatures: LOCAL_KEY_FEATURES,
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
      keyFeatures: sortProjects(
        notionProjects.filter((project) => project.category === "key-feature"),
      ),
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
