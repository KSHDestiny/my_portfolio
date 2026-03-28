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
    period: "View UI",
    periodCtaUrl: "/projects/bhr.gif",
    description:
      "Designed and delivered backend features across Better HR including Expense, KPI, Permission Group, and Indonesia Payroll, while optimizing high-traffic endpoints for 100K+ concurrent users across eight countries.",
    tags: [
      "Problem",
      "Solution",
      "Decisions",
      "Trade-offs",
      "Impact",
      "Additional Contributions",
    ],
    tagDetails: {
      Problem: {
        summary:
          "Better HR needed to support multiple operational domains inside one HRMS platform without letting country-specific rules, permissions, and reporting workflows become fragmented.",
        highlights: [
          "Core HR operations needed to scale across eight countries on one shared platform",
          "Features such as Expense, KPI, Permission Group, and Indonesia Payroll introduced very different business rules and access patterns",
          "Performance and data consistency mattered because these modules were used in daily business operations at large scale",
        ],
      },
      Solution: {
        summary:
          "Built and extended backend capabilities across the HRMS so finance, performance management, permissions, and payroll workflows could operate inside one production-ready system.",
        highlights: [
          "Delivered Expense, KPI, Permission Group, and Indonesia Payroll backend flows inside the broader HRMS platform",
          "Improved leave approval behavior, leave setting rules, duty roster analytics, and performance dynamic rating workflows",
          "Expanded ATS candidate database support and strengthened Excel export/import capabilities for business operations",
        ],
      },
      Decisions: {
        summary:
          "Made implementation decisions that favored modular backend behavior, stronger access control boundaries, and performance-aware data access for high-traffic operations.",
        highlights: [
          "Applied query optimization and caching to reduce response-time pressure on dashboards and other high-traffic endpoints",
          "Kept permission-sensitive behavior explicit so operational access could stay safer across admin and employee workflows",
          "Implemented business-rule-heavy logic carefully so approval, rating, and payroll-related behavior stayed predictable in production",
        ],
      },
      "Trade-offs": {
        summary:
          "Accepted higher backend complexity in exchange for better maintainability, country-specific flexibility, and production reliability.",
        highlights: [
          "Multi-country payroll and policy logic increased implementation complexity but kept regional behavior closer to real business needs",
          "More explicit permission handling added development overhead but reduced operational risk",
          "Performance tuning required extra effort in query and cache design, but it helped the system stay responsive at scale",
        ],
      },
      Impact: {
        summary:
          "The HRMS became stronger as a shared business platform, supporting multiple high-value workflows while remaining performant for large-scale usage.",
        highlights: [
          "Supported 100K+ concurrent users across eight countries with query and caching improvements",
          "Improved business coverage across Expense, KPI, Permission Group, and Indonesia Payroll",
          "Strengthened the platform's ability to handle both shared HR logic and country-specific operational requirements",
        ],
      },
      "Additional Contributions": {
        summary:
          "Contributed additional backend work across operational workflows, analytics, performance logic, and data-heavy business tooling within Better HR.",
        highlights: [
          "Leave second approval flow and leave setting rules improvements",
          "Duty roster analytics and dashboard endpoint optimization",
          "Performance dynamic rating system, ATS candidate database, and Excel export/import improvements",
        ],
      },
    },
    category: "production",
  },
  {
    title: "Application Tracking System (ATS)",
    period: "View UI",
    periodCtaMessage:
      "UI preview is not included here, but the feature was designed and documented end-to-end across upload, extraction, profile creation, and ATS synchronization.",
    description:
      "Designed and built ATS workflow automation from Screening to Offer, integrated ATS with HRMS, and implemented AI CV-to-JSON extraction in a single upload flow with atomic data consistency.",
    tags: ["Problem", "Solution", "Decisions", "Trade-offs", "Impact"],
    tagDetails: {
      Problem: {
        summary:
          "Recruitment operations needed one reliable system to move candidates from screening to offer while avoiding duplicate data entry between ATS and HRMS.",
        highlights: [
          "Manual CV handling slowed down recruiter workflows and created inconsistent candidate records",
          "Recruitment stages needed clearer backend state transitions from Screening to Offer",
          "Candidate data had to stay aligned between ATS workflows and downstream HRMS records",
        ],
      },
      Solution: {
        summary:
          "Built an ATS flow that combined workflow automation, HRMS integration, and AI CV-PDF extraction so recruiters could upload once and continue the hiring process from structured candidate data.",
        highlights: [
          "Implemented end-to-end recruitment stages with explicit progression through the hiring lifecycle",
          "Converted uploaded CV PDFs into structured JSON for candidate creation and downstream processing",
          "Integrated ATS records with HRMS so hiring data could move into broader people operations",
        ],
      },
      Decisions: {
        summary:
          "Made backend decisions that favored consistency, controlled workflow states, and integration safety over a looser but riskier pipeline.",
        highlights: [
          "Kept the upload-to-candidate creation flow atomic to avoid partial records across parsing and persistence",
          "Used structured JSON extraction instead of free-form AI output to make downstream mapping predictable",
          "Modeled workflow transitions explicitly so recruitment stages stayed auditable and easier to maintain",
        ],
      },
      "Trade-offs": {
        summary:
          "Accepted some implementation complexity in exchange for stronger data integrity and operational reliability.",
        highlights: [
          "Atomic orchestration added backend complexity but reduced inconsistent candidate states",
          "Schema-driven extraction required tighter validation but made recruiter-facing data safer to review",
          "Opinionated stage transitions reduced flexibility but kept workflow rules clearer for the product",
        ],
      },
      Impact: {
        summary:
          "The result was a more production-ready hiring flow that reduced repetitive recruiter work and connected ATS operations more cleanly with the rest of the HR platform.",
        highlights: [
          "Reduced duplicate manual entry by turning CV uploads into structured candidate data",
          "Improved operational consistency between recruitment workflows and HRMS integration points",
          "Strengthened reliability for a high-value business process that spans automation, AI parsing, and platform integration",
        ],
      },
    },
    category: "production",
  },
  {
    title: "Job Content Management System (CMS)",
    period: "View UI",
    periodCtaUrl: "/projects/job_cms.gif",
    description:
      "Built the content management system behind Job Landing, covering country-based pages, modular sections, job and company collections, search-term collections, push notifications, and complex filter logic with optimized endpoints.",
    tags: ["Problem", "Solution", "Decisions", "Trade-offs", "Impact"],
    tagDetails: {
      Problem: {
        summary:
          "Job Landing needed a flexible backend CMS so business teams could manage country-based landing pages, curated collections, and discovery flows without hardcoding page content into the frontend.",
        highlights: [
          "Each country homepage needed its own page structure and multiple configurable sections",
          "Content blocks had to support jobs, companies, and quick-search terms from different data sources",
          "Filtering and curation logic needed to handle complex unlimited AND/OR conditions for collections",
        ],
      },
      Solution: {
        summary:
          "Built a CMS that let internal teams compose country pages from modular sections, connect each section to different collection types, and manage push-notification content from one backend workflow.",
        highlights: [
          "Created page and section management for country-based homepages",
          "Implemented job collection, company collection, and search term collection support",
          "Added push-notification tooling, Google Indexing API integration, and 4-hourly cron updates so section data could refresh when newly added jobs matched saved filter conditions",
        ],
      },
      Decisions: {
        summary:
          "Made backend decisions that prioritized flexibility for content teams while keeping query behavior predictable enough for production traffic.",
        highlights: [
          "Modeled sections as reusable content containers so one page could mix multiple collection-driven blocks",
          "Supported nested AND/OR-style filter logic to avoid rebuilding new endpoints for each curation need",
          "Used caching and endpoint optimization to keep CMS-driven pages responsive while querying and presenting around 1,000 jobs",
          "Used a 4-hourly cron to refresh section results so newly added jobs could appear when they matched existing collection filters",
        ],
      },
      "Trade-offs": {
        summary:
          "Accepted more backend complexity in exchange for a CMS that could support richer business-controlled landing experiences without frequent code changes.",
        highlights: [
          "Unlimited filter combinations increased implementation complexity but gave the content team much more control",
          "Country-based page composition required more backend structure but reduced hardcoded frontend content maintenance",
          "Scheduled refresh logic added backend work, but it removed the need to manually rebuild section data whenever new matching jobs were added",
        ],
      },
      Impact: {
        summary:
          "The CMS turned Job Landing into a more configurable product surface where content, discovery, and engagement workflows could be managed operationally instead of manually coded each time.",
        highlights: [
          "Enabled country-specific homepage management from the backend",
          "Improved content curation through modular sections and flexible collection filtering",
          "Extended CMS operations into discoverability workflows through Google Indexing API integration while keeping filter-based sections up to date as new matching jobs were added",
        ],
      },
    },
    category: "production",
  },
  {
    title: "Job Landing Platform",
    period: "View UI",
    periodCtaUrl: "/projects/landing.gif",
    description:
      "Built the applicant-facing Job Landing platform covering SSO/email login, job applications, and inbox flows with a seamless and fast experience.",
    tags: ["Problem", "Solution", "Decisions", "Trade-offs", "Impact"],
    tagDetails: {
      Problem: {
        summary:
          "Applicants needed a reliable frontend platform where they could discover jobs, authenticate easily, apply quickly, and track communication in one place.",
        highlights: [
          "Job discovery and application flows needed to feel smooth for end users, not just operationally correct",
          "Authentication had to support both SSO and email login for different applicant preferences",
          "Applicants needed a single place to manage applications and inbox communication after applying",
        ],
      },
      Solution: {
        summary:
          "Built the applicant-facing layer for Job Landing with login, application, and inbox flows connected to the underlying recruitment platform.",
        highlights: [
          "Implemented SSO and email-based login flows for applicant access",
          "Built job application journeys that connected applicants directly into the hiring pipeline",
          "Added inbox capabilities so applicants could manage communication from the same platform",
        ],
      },
      Decisions: {
        summary:
          "Focused implementation decisions on reducing friction for applicants while keeping the platform aligned with backend recruitment workflows.",
        highlights: [
          "Supported multiple authentication methods so access would not depend on a single login path",
          "Kept the application journey streamlined so users could move from job discovery to submission with less friction",
          "Aligned inbox and application flows with the broader ATS ecosystem so user actions stayed consistent across platforms",
        ],
      },
      "Trade-offs": {
        summary:
          "Accepted additional integration and UX coordination work in exchange for a more cohesive applicant experience.",
        highlights: [
          "Multiple login options increased implementation scope but improved accessibility for different applicants",
          "A smoother applicant journey required tighter coordination with backend systems and recruitment workflows",
          "Inbox-style communication added product depth but also expanded state-management and integration responsibilities",
        ],
      },
      Impact: {
        summary:
          "The result was a more complete applicant platform where discovery, application, and communication could happen in one connected experience.",
        highlights: [
          "Improved the applicant experience with integrated login, application, and inbox flows",
          "Made the job platform feel faster and more seamless from an end-user perspective",
          "Strengthened the connection between public job interactions and the underlying recruitment system",
        ],
      },
    },
    url: "https://betterjobs.co",
    infoMessage:
      "Took over this platform from a previous developer and continued improving the applicant-facing experience on top of the existing system.",
    category: "production",
  },
  {
    title: "Middleware Service",
    period: "Jan 2024 - Present",
    description:
      "Built middleware flows for Thailand/Vietnam SMS OTP and Email OTP, supporting secure authentication and payroll authorization through reliable backend-to-backend transactions.",
    tags: ["Problem", "Solution", "Decisions", "Trade-offs", "Impact"],
    tagDetails: {
      Problem: {
        summary:
          "Authentication and payroll authorization flows needed a reliable middleware layer to coordinate external OTP providers and backend-to-backend verification across different country channels.",
        highlights: [
          "OTP delivery had to work across Thailand SMS, Vietnam SMS, and email-based verification paths",
          "Authentication and payroll authorization could not depend on fragile one-off integrations",
          "Middleware had to handle external service communication without breaking core business flows",
        ],
      },
      Solution: {
        summary:
          "Built middleware integrations that handled OTP delivery and verification for multiple channels while supporting secure backend-to-backend transaction flows.",
        highlights: [
          "Integrated Thailand and Vietnam SMS OTP providers",
          "Added Email OTP support for secure verification scenarios",
          "Implemented transaction handling between internal services and external providers for authentication and payroll-related approvals",
        ],
      },
      Decisions: {
        summary:
          "Made backend decisions that favored reliability, provider separation, and safer transaction handling across verification flows.",
        highlights: [
          "Kept provider-specific integration behavior isolated instead of mixing all OTP paths into one fragile flow",
          "Structured backend-to-backend communication so verification outcomes could be handled more predictably",
          "Focused the middleware layer on secure orchestration rather than pushing external-provider complexity into product modules",
        ],
      },
      "Trade-offs": {
        summary:
          "Accepted integration complexity in exchange for broader channel support and stronger operational reliability.",
        highlights: [
          "Multiple OTP channels increased maintenance scope but improved real-world coverage",
          "Middleware orchestration added an extra backend layer but reduced duplication across consuming services",
          "External provider handling required more defensive backend logic to account for variable delivery behavior",
        ],
      },
      Impact: {
        summary:
          "The middleware layer improved verification reliability for security-sensitive flows and made OTP-based business operations easier to support across multiple channels.",
        highlights: [
          "Expanded OTP support across SMS and email verification paths",
          "Improved the reliability of authentication and payroll authorization workflows",
          "Reduced the need for product modules to manage provider-specific verification behavior directly",
        ],
      },
    },
    category: "production",
  },
  {
    title: "Customer Management System (Internal)",
    period: "Nov 2024 - Present",
    description:
      "Built the internal customer management backend for Better HR, covering multi-country client operations, domain-level lifecycle controls, and integrations with Xero, Monday, and Notion.",
    tags: ["Problem", "Solution", "Decisions", "Trade-offs", "Impact"],
    tagDetails: {
      Problem: {
        summary:
          "Better HR needed an internal system to manage customer lifecycle operations across multiple countries while coordinating data and actions with several external business tools.",
        highlights: [
          "Customer operations required domain-level control instead of loose manual handling",
          "Different lifecycle steps had to stay aligned with tools such as Xero, Monday, and Notion",
          "The backend had to support internal business operations across multiple countries in one system",
        ],
      },
      Solution: {
        summary:
          "Built an internal customer management backend that centralized lifecycle controls and connected Better HR operations with the external platforms used by business teams.",
        highlights: [
          "Implemented customer-management flows for internal multi-country operations",
          "Added domain-level lifecycle controls for managing client states and actions",
          "Integrated Xero, Monday, and Notion into the backend workflow",
        ],
      },
      Decisions: {
        summary:
          "Made implementation decisions that favored operational control, integration clarity, and a backend model that could support internal process ownership.",
        highlights: [
          "Kept client lifecycle behavior explicit at the domain level so internal actions were easier to control and reason about",
          "Used backend integrations to reduce fragmented business handling across external tools",
          "Designed the system around internal operational workflows rather than exposing raw third-party logic directly to users",
        ],
      },
      "Trade-offs": {
        summary:
          "Accepted broader integration scope and internal-process complexity in exchange for a more manageable operational system.",
        highlights: [
          "Multiple external integrations increased maintenance work but created a more connected operational backend",
          "Domain-level lifecycle control required more backend modeling but improved internal governance",
          "Supporting multi-country operations added complexity but made the platform more useful to the business",
        ],
      },
      Impact: {
        summary:
          "The system gave internal teams a more controlled and connected way to manage customer operations across business tools and regional workflows.",
        highlights: [
          "Improved internal handling of multi-country customer operations",
          "Reduced fragmentation by connecting core lifecycle actions with external platforms",
          "Strengthened operational visibility and control at the backend level",
        ],
      },
    },
    category: "production",
  },
  {
    title: "HR AI Chatbot Agent",
    period: "Mar 2025 - Present",
    description:
      "Built released backend query and mutation endpoints for an HR AI chatbot agent, supporting business operations such as KPI data access, performance appraisal creation and approval flow, expense data, ATS candidate records, and other HR workflows.",
    tags: ["Problem", "Solution", "Decisions", "Trade-offs", "Impact"],
    tagDetails: {
      Problem: {
        summary:
          "HR workflows needed an agent-ready backend layer so AI-driven operations could safely interact with product functionality instead of relying on manual operations in the Better HR Dashboard.",
        highlights: [
          "The agent needed backend operations it could call reliably for real HR-related actions",
          "Queries and mutations had to map cleanly into HR workflows instead of relying on loosely structured responses",
          "Released product behavior required stronger backend support than a prototype-style assistant",
        ],
      },
      Solution: {
        summary:
          "Built backend queries and mutations for the HR AI agent so it could support operational HR workflows through structured agent actions.",
        highlights: [
          "Implemented agent-facing queries for KPI data, expense data, ATS candidate records, and other HR-related operational information",
          "Implemented mutations for business workflows such as performance appraisal creation and approval actions",
          "Structured backend operations so the released HR agent could interact with product workflows more safely and predictably",
        ],
      },
      Decisions: {
        summary:
          "Approached the work as production-facing backend integration, prioritizing structured operations and controllable agent behavior over a purely conversational implementation.",
        highlights: [
          "Exposed capabilities through explicit queries and mutations instead of opaque free-form backend behavior",
          "Kept the agent aligned with operational workflows by giving it structured access patterns into the system",
          "Wrote user-friendly, business-oriented descriptions for queries and mutations so the AI could perform better with real product operations",
        ],
      },
      "Trade-offs": {
        summary:
          "Accepted added backend complexity in exchange for making the agent more usable and safer in a real product environment.",
        highlights: [
          "Agent-ready operations required more structured backend design than a simple chat interface",
          "Queries and mutations needed clear boundaries so AI-driven actions would stay predictable",
          "Business-friendly endpoint descriptions required extra care, but they improved how well the AI understood and used operational capabilities",
        ],
      },
      Impact: {
        summary:
          "The released HR AI agent gained a more production-ready backend foundation through structured operation endpoints for real workflow support.",
        highlights: [
          "Enabled the HR AI agent to work with KPI data, expense data, ATS candidate records, and appraisal workflows through structured operations",
          "Improved AI performance by pairing backend endpoints with clearer business-oriented query and mutation descriptions",
          "Strengthened backend control over how AI-driven interactions connect with real HR operations",
        ],
      },
    },
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
    periodCtaUrl: "/permission_group/permission_group.gif",
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
