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
  periodCtaMessage?: string;
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

const ALLOWED_KEY_FEATURE_TITLES = new Set([
  "ATS CV Upload & AI Profile Extraction",
  "Expense Tracking System",
  "KPI Module",
  "Permission Group",
  "Indonesia Payroll",
]);

const KEY_FEATURE_ORDER: Record<string, number> = {
  "ATS CV Upload & AI Profile Extraction": 1,
  "Expense Tracking System": 2,
  "KPI Module": 3,
  "Permission Group": 4,
  "Indonesia Payroll": 5,
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
    title: "KPI Module",
    period: "View UI",
    periodCtaUrl: "/kpi/kpi.gif",
    description:
      "Designed and delivered a complete KPI module covering KPI group management, KPI creation, target assignment, user-level performance tracking, export workflows, and mobile visibility for continuous performance management.",
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
          "Defined the KPI product scope around template setup, KPI definition, target assignment, score tracking, exports, and mobile visibility for employees and managers.",
        highlights: [
          "Create KPI groups and reusable KPI structures for different teams or roles",
          "Assign KPI targets to individual users with clear ownership and status visibility",
          "Support manager review, admin oversight, export workflows, and mobile access",
        ],
        ctaLabel: "Open Use Case Diagram",
        ctaUrl: "/kpi/kpi-usecase.svg",
      },
      Architecture: {
        summary:
          "Structured the module so KPI configuration, user assignment, score tracking, and reporting could evolve independently while still supporting one coherent performance workflow.",
        highlights: [
          "Separate admin setup concerns from day-to-day employee KPI tracking",
          "Keep KPI templates, user assignments, and reporting flows logically isolated",
          "Support both web operations and mobile-facing KPI visibility from the same feature domain",
        ],
        ctaLabel: "Open Architecture Diagram",
        ctaUrl: "/kpi/kpi-architecture.svg",
      },
      Workflow: {
        summary:
          "Mapped the KPI lifecycle from group creation through assignment, target definition, progress review, and reporting so each stage has a clear operational handoff.",
        highlights: [
          "Create KPI groups first, then define KPI items and scoring expectations",
          "Assign KPIs to users and set measurable targets before tracking begins",
          "Review progress by person and export results for broader reporting needs",
        ],
        ctaLabel: "Open Workflow Diagram",
        ctaUrl: "/kpi/kpi-workflow.svg",
      },
      ERD: {
        summary:
          "Modeled the KPI domain around reusable group definitions, KPI records, user assignments, target values, and performance results without blending setup data into runtime tracking.",
        highlights: [
          "KPI groups act as reusable containers for related KPI definitions",
          "User-level assignment records connect people, targets, and KPI ownership",
          "Reporting depends on stable score and progress data captured per assignment",
        ],
        ctaLabel: "Open ERD Diagram",
        ctaUrl: "/kpi/kpi-structure.svg",
      },
      Implementation: {
        summary:
          "Delivered the module in slices spanning admin setup, KPI creation, user assignment, person-based tracking, export support, and mobile-ready access.",
        highlights: [
          "Admin flows for KPI group and KPI item creation",
          "Assignment and target-setting flows for user-specific performance management",
          "Reporting and export capabilities layered on top of live KPI tracking",
        ],
        ctaLabel: "Open Implementation Diagram",
        ctaUrl: "/kpi/kpi-implementation.svg",
      },
      Testing: {
        summary:
          "Covered the highest-risk scenarios around setup correctness, assignment accuracy, score visibility, export consistency, and cross-platform KPI access.",
        highlights: [
          "Verify KPI assignments and targets are mapped to the correct users",
          "Ensure exports reflect the same KPI data shown in the application views",
          "Check mobile and web experiences stay consistent for score visibility and progress tracking",
        ],
      },
    },
    category: "key-feature",
  },
  {
    title: "Permission Group",
    period: "View UI",
    periodCtaMessage:
      "UI preview is not included here, but the permission group module was designed around manager/admin visibility scope based on configured organizational dimensions.",
    description:
      "Designed a permission group module to control what a manager or admin can see and access based on configured permission groups, using department, position, location, and status scope as the visibility boundary.",
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
          "Defined the module around centralized permission setup and reusable group mapping so managers and admins only see records inside their configured organizational scope.",
        highlights: [
          "Manage permission definitions and map them into reusable groups",
          "Restrict manager visibility by department, position, location, and status scope",
          "Reduce one-off access maintenance by standardizing visibility rules through grouped structures",
        ],
        ctaLabel: "Open Use Case Diagram",
        ctaUrl: "/permission_group/permission_group-usecase.svg",
      },
      Architecture: {
        summary:
          "Structured the feature so permission definitions, group mapping, and visibility evaluation stay separated while still supporting one coherent access-control flow.",
        highlights: [
          "Permission setup is isolated from runtime visibility evaluation",
          "Reference tables support access filtering without becoming the permission source of truth",
          "Group-based mapping makes visibility management easier to scale across managers and admins",
        ],
        ctaLabel: "Open Architecture Diagram",
        ctaUrl: "/permission_group/permission_group-architecture.svg",
      },
      Workflow: {
        summary:
          "Mapped the flow from permission creation to group mapping and visibility evaluation so manager access can be managed consistently and updated safely.",
        highlights: [
          "Create or maintain permission definitions first",
          "Map permissions into groups before applying them to managers or admins",
          "Use reference dimensions to control who can be seen or accessed inside the system",
        ],
        ctaLabel: "Open Workflow Diagram",
        ctaUrl: "/permission_group/permission_group-workflow.svg",
      },
      ERD: {
        summary:
          "Modeled the module around permissions and group mappings, supported by organizational reference tables such as departments, positions, locations, statuses, and employees that are evaluated for visibility scope.",
        highlights: [
          "Permissions are stored independently from scoped visibility evaluation",
          "Group mapping acts as the bridge between permission definitions and access grouping",
          "Employees and reference tables support targeted visibility filtering",
        ],
        ctaLabel: "Open ERD Diagram",
        ctaUrl: "/permission_group/permission_group-structure.svg",
      },
      Implementation: {
        summary:
          "Planned the rollout in slices covering permission setup, group mapping, manager visibility evaluation, scoped filtering, and release hardening.",
        highlights: [
          "Admin flows for permission and group management",
          "Visibility evaluation flows backed by reference data",
          "Controlled rollout to protect existing manager access behavior while introducing grouped permissions",
        ],
        ctaLabel: "Open Implementation Diagram",
        ctaUrl: "/permission_group/permission_group-implementation.svg",
      },
      Testing: {
        summary:
          "Focused testing on permission accuracy, group mapping correctness, visibility scope safety, and filtering consistency across reference dimensions.",
        highlights: [
          "Ensure managers only see records inside the departments or scopes configured in their permission group",
          "Verify department, position, location, and status references do not grant unintended visibility",
          "Check updates to permission groups propagate safely without widening manager access unexpectedly",
        ],
      },
    },
    category: "key-feature",
  },
  {
    title: "ATS CV Upload & AI Profile Extraction",
    period: "View UI",
    periodCtaMessage:
      "UI preview is not included here, but the feature was designed and documented end-to-end across upload, extraction, profile creation, and ATS synchronization.",
    description:
      "Designed the end-to-end ATS CV upload flow covering file intake, AI extraction, profile creation, async notifications, and cross-platform synchronization between BetterHR, AI services, and Job Landing.",
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
          "Defined the applicant intake journey from CV upload to parsed profile presentation inside the ATS dashboard.",
        highlights: [
          "Upload CV and extract structured applicant data with AI",
          "Populate profile cards with bio, education, experience, skills, languages, certificates, and social links",
          "Notify HR stakeholders and invite new applicants into Job Landing when needed",
        ],
        ctaLabel: "Open Use Case Diagram",
        ctaUrl: "/ats/ats-usecase.svg",
      },
      Architecture: {
        summary:
          "Outlined a business-friendly system flow where BetterHR handles the ATS experience, a queue runs the full background process.",
        highlights: [
          "File, queue, AI extraction, and applicant services are separated by clear runtime responsibilities",
          "The platform stores the CV and starts the full background workflow through a queue",
          "Notification, email, and push services keep recruiters and hiring teams informed",
        ],
        ctaLabel: "Open Architecture Diagram",
        ctaUrl: "/ats/ats-architecture.svg",
      },
      Workflow: {
        summary:
          "Modeled an asynchronous upload-to-profile pipeline so recruiters do not wait on extraction before continuing ATS work.",
        highlights: [
          "Upload CV file and store it in S3-compatible storage",
          "Run extraction asynchronously and publish completion via popup notification",
          "Refresh ATS dashboard with parsed applicant data after profile build succeeds",
        ],
        ctaLabel: "Open Workflow Diagram",
        ctaUrl: "/ats/ats-workflow.svg",
      },
      ERD: {
        summary:
          "Captured the core applicant profile domains created from a single CV source while keeping service ownership clear across systems.",
        highlights: [
          "Applicant basic information as root profile record",
          "Education, work experience, skills, languages, certificates, and social links as structured child datasets",
          "Unique email per job post prevents duplicate candidate records for the same opening",
        ],
      },
      Implementation: {
        summary:
          "Planned the feature in delivery slices spanning storage upload, AI extraction, event-driven notifications, and downstream profile synchronization.",
        highlights: [
          "Storage upload plus AI project handoff",
          "Async completion handling with Pusher and email services",
          "Conditional invitation flow for first-time applicants on Job Landing",
        ],
        ctaLabel: "Open Implementation Diagram",
        ctaUrl: "/ats/ats-implementation.svg",
      },
      Testing: {
        summary:
          "Specified validation around atomic processing, async completion, and profile consistency across ATS and Job Landing.",
        highlights: [
          "Prevent duplicate applicants by enforcing unique email within the same job post",
          "Verify success notifications only fire after extraction and profile creation complete",
          "Ensure parsed CV fields map safely into recruiter-facing applicant cards",
        ],
      },
    },
    category: "key-feature",
  },
  {
    title: "Indonesia Payroll",
    period: "View UI",
    periodCtaUrl: "/indonesia/indonesia.gif",
    description:
      "Built Indonesia payroll around real tax and salary calculation logic: annualize taxable earnings, subtract PTKP-style personal and family relief plus allowed job and social-security deductions, apply progressive PPh 21 brackets, then offset prior withheld tax to produce the current payroll tax, net salary, and year-end reconciliation.",
    tags: [
      "Taxable Income",
      "Relief & Deductions",
      "Tax Brackets",
      "Tax Reconciliation",
    ],
    tagDetails: {
      "Taxable Income": {
        summary:
          "The payroll flow starts by projecting annual taxable earnings from salary components such as base pay, fixed allowances, and other recurring taxable income.",
        highlights: [
          "Combine taxable monthly salary elements into yearly gross income",
          "Separate taxable earnings from non-taxable payroll items before calculation",
          "Use annualized income as the basis for later PPh 21 computation",
        ],
      },
      "Relief & Deductions": {
        summary:
          "After annual income is established, the calculation reduces it with PTKP-style personal relief and permitted deductions to reach net taxable income.",
        highlights: [
          "Apply personal or family non-taxable income relief based on employee status",
          "Deduct job-expense allowance within its capped monthly and yearly limits",
          "Subtract pension or old-age security contributions that are allowed in payroll tax treatment",
        ],
      },
      "Tax Brackets": {
        summary:
          "Net taxable income is then processed through Indonesia's progressive PPh 21 brackets so each income layer is taxed at its own rate.",
        highlights: [
          "Lower income layer taxed at 5%, followed by higher progressive bands",
          "Bracket-by-bracket calculation prevents the full income being taxed at one flat rate",
          "The final yearly tax reflects the cumulative result of all applicable bands",
        ],
      },
      "Tax Reconciliation": {
        summary:
          "The yearly tax result is reconciled against tax already withheld in prior payroll periods to determine the current deduction and keep payroll balanced.",
        highlights: [
          "Subtract previous months' paid income tax from the current annual liability",
          "Calculate the remaining tax to withhold in the active payroll run",
          "Produce clearer net salary, tax receipt, and year-end reconciliation values",
        ],
      },
    },
    category: "key-feature",
  },
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
        ctaLabel: "Open Implementation Diagram",
        ctaUrl: "/expense/expense-implementation.svg",
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
    productionProjects: LOCAL_PRODUCTION_PROJECTS,
    keyFeatures: sortKeyFeatures(LOCAL_KEY_FEATURES),
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
