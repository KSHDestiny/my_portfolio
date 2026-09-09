// Project card content. Edit here to change what appears on the site.
// Types and loading logic live in ../projects.ts

import type { Project } from "../projects";

export const PRODUCTION_PROJECTS: Project[] = [
  {
    title: "Better HR (HRMS)",
    period: "View UI",
    periodCtaSlides: [
      "/projects/slides/bhr/01.webp",
      "/projects/slides/bhr/02.webp",
      "/projects/slides/bhr/03.webp",
      "/projects/slides/bhr/04.webp",
      "/projects/slides/bhr/05.webp",
      "/projects/slides/bhr/06.webp",
      "/projects/slides/bhr/07.webp",
      "/analytics/slides/01.webp",
      "/analytics/slides/02.webp",
      "/analytics/slides/03.webp",
    ],
    description:
      "Designed and delivered backend features across Better HR including Expense, KPI, Permission Group, and Indonesia Payroll, then extended the platform with an AI layer: a conversational HRIS agent, AI CV extraction for candidates and employees, JD-driven talent search, and analytics over the extracted data - all while optimizing high-traffic endpoints for 100K+ concurrent users across eight countries.",
    tags: [
      "Problem",
      "Solution",
      "AI Integration",
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
          "Layered AI capabilities onto the same backend - a conversational agent, CV extraction, and JD-driven search - rather than building them as a separate product",
        ],
      },
      "AI Integration": {
        summary:
          "Added an AI layer on top of the existing HRMS backend, deliberately built on the platform's own operations so the model worked with real HR data under the same rules as any other client.",
        highlights: [
          "Conversational HRIS agent that discovers GraphQL operations at runtime and executes them, covering 48 read and 31 write operations across HR workflows",
          "AI CV extraction on both sides of hiring: bulk candidate intake in the ATS with automatic rating against the job, and single-employee extraction into the employee Talent tab",
          "Search Talent With Job Description reads a pasted or uploaded JD and fills the talent search filters automatically, replacing manual criteria entry",
          "Candidate and employee analytics built on the normalized fields extraction produces, so the AI work compounds into reporting rather than sitting isolated",
          "Scheduled background agent runs recurring HR tasks unattended using the same tool loop as the interactive agent",
        ],
      },
      Decisions: {
        summary:
          "Made implementation decisions that favored modular backend behavior, stronger access control boundaries, and performance-aware data access for high-traffic operations.",
        highlights: [
          "Applied query optimization and caching to reduce response-time pressure on dashboards and other high-traffic endpoints",
          "Kept permission-sensitive behavior explicit so operational access could stay safer across admin and employee workflows",
          "Implemented business-rule-heavy logic carefully so approval, rating, and payroll-related behavior stayed predictable in production",
          "Exposed AI capability through the platform's existing operations and permission boundaries instead of giving the model its own privileged data path",
        ],
      },
      "Trade-offs": {
        summary:
          "Accepted higher backend complexity in exchange for better maintainability, country-specific flexibility, and production reliability.",
        highlights: [
          "Multi-country payroll and policy logic increased implementation complexity but kept regional behavior closer to real business needs",
          "More explicit permission handling added development overhead but reduced operational risk",
          "Performance tuning required extra effort in query and cache design, but it helped the system stay responsive at scale",
          "Letting an AI agent write to live HR records demanded far more guardrail work than a read-only assistant, but it made the agent genuinely useful instead of merely descriptive",
        ],
      },
      Impact: {
        summary:
          "The HRMS became stronger as a shared business platform, supporting multiple high-value workflows while remaining performant for large-scale usage.",
        highlights: [
          "Supported 100K+ concurrent users across eight countries with query and caching improvements",
          "Improved business coverage across Expense, KPI, Permission Group, and Indonesia Payroll",
          "Strengthened the platform's ability to handle both shared HR logic and country-specific operational requirements",
          "Shipped AI as a working part of the product - conversational HR actions, automated CV intake, and JD-driven search - rather than a bolt-on demo",
        ],
      },
      "Additional Contributions": {
        summary:
          "Contributed additional backend work across operational workflows, analytics, performance logic, and data-heavy business tooling within Better HR.",
        highlights: [
          "Leave second approval flow and leave setting rules improvements",
          "Duty roster analytics and dashboard endpoint optimization",
          "Candidate and employee analytics surfacing workforce composition, seniority, and qualifications across the applicant pool, the workforce, and the company dashboard",
          "Performance dynamic rating system, ATS candidate database, and Excel export/import improvements",
        ],
      },
    },
    category: "production",
  },
  {
    title: "Application Tracking System (ATS)",
    period: "View UI",
    periodCtaSlides: [
      "/ats/slides/bulk-upload/01.webp",
      "/ats/slides/bulk-upload/02.webp",
      "/ats/slides/bulk-upload/03.webp",
      "/ats/slides/bulk-upload/04.webp",
      "/ats/slides/bulk-upload/05.webp",
      "/ats/slides/bulk-upload/06.webp",
      "/ats/slides/bulk-upload/07.webp",
      "/ats/slides/bulk-upload/08.webp",
      "/ats/slides/bulk-upload/09.webp",
    ],
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
    periodCtaSlides: [
      "/projects/slides/job_cms/01.webp",
      "/projects/slides/job_cms/02.webp",
      "/projects/slides/job_cms/03.webp",
      "/projects/slides/job_cms/04.webp",
      "/projects/slides/job_cms/05.webp",
      "/projects/slides/job_cms/06.webp",
      "/projects/slides/job_cms/07.webp",
    ],
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
    periodCtaSlides: [
      "/projects/slides/landing/01.webp",
      "/projects/slides/landing/02.webp",
      "/projects/slides/landing/03.webp",
      "/projects/slides/landing/04.webp",
    ],
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
    period: "View UI",
    periodCtaSlides: [
      "/ai-agent/slides/01.webp",
      "/ai-agent/slides/02.webp",
      "/ai-agent/slides/03.webp",
    ],
    description:
      "Built the backend for a released HRIS agent (Mar 2025 - Present) that answers questions and performs real HR actions in conversation. Instead of hardcoding one endpoint per intent, the agent discovers the GraphQL schema at runtime through an introspect tool, then executes the operation it just learned - covering 48 read operations and 31 write operations across KPI, payroll, attendance, leave, ATS, and appraisal workflows.",
    tags: [
      "Problem",
      "Agent Architecture",
      "Introspect",
      "Execute",
      "Guardrails",
      "Impact",
    ],
    tagDetails: {
      Problem: {
        summary:
          "HR workflows needed an agent that could act on real product data, not a chat wrapper that could only describe what a user should go and click.",
        highlights: [
          "A prompt-only assistant could answer questions but could not apply leave, create an appraisal, or record a promotion",
          "Hardcoding one backend endpoint per intent would not scale across dozens of HR operations and would drift as the schema changed",
          "Because the agent writes to live HR records, wrong or duplicated actions carry real payroll and compliance cost",
        ],
      },
      "Agent Architecture": {
        summary:
          "A two-tool loop lets the agent learn an operation before it runs one, so backend capability is discovered at runtime rather than duplicated in agent code.",
        highlights: [
          "introspectTool reads the live GraphQL schema and returns the operation's arguments, types, and selectable fields",
          "executeGraphQLTool then runs the operation the agent just learned, in-process against the same schema",
          "A curated allow-list of 48 queries and 31 mutations bounds what the agent may reach, each carrying business-language guidance for the model",
          "Two canvas tools render long-form output - contracts, policies, reports, CSV - into a document panel beside the chat instead of flooding the conversation",
        ],
      },
      Introspect: {
        summary:
          "The discovery half of the loop: the agent asks the schema what an operation looks like before attempting it, which removes guesswork about arguments and field names.",
        highlights: [
          "Walks the schema and renders arguments, return types, and nested fields as markdown the model can read",
          "Recursion is bounded by a depth cap and a shared byte budget, so a deep type graph cannot blow the context window",
          "Cycle detection tracks ancestor types so self-referencing schemas terminate instead of expanding forever",
          "Truncation is explicit - the agent is told detail was withheld and can ask for a field by name, rather than silently seeing a partial schema",
        ],
      },
      Execute: {
        summary:
          "The action half of the loop: run the operation in-process, then normalize the result so the model reads success and failure the same way every time.",
        highlights: [
          "Executes against the agent GraphQL schema in-process, replacing the previous agent's HTTP round trip",
          "Legacy resolvers return JSON-encoded strings for data and paginated items; these are recursively decoded so the model sees structured data",
          "Every response is flattened to a consistent success / errorCode / errorMessage envelope, so GraphQL errors become something the agent can act on and retry",
          "Runs behind schema-swap and auth middleware, so the agent resolves against the agent schema as the authenticated user",
        ],
      },
      Guardrails: {
        summary:
          "Most of the engineering went into constraining a model that can write to production HR data, encoded as prompt rules the tools enforce in practice.",
        highlights: [
          "Write-once discipline: a successful mutation is never re-run to confirm, since a null body is a valid success and a repeat call would duplicate the record",
          "Leave correctness: booking leave and adjusting a balance are separate operations, and balance changes are deltas read from current state, never target values",
          "Job changes route to an audit-trailed activity record rather than a silent profile edit, so promotions, transfers, and resignations stay traceable",
          "System identifiers are tool-call-only and never surface in replies; salary data is exposed only when the user is explicitly asking about compensation",
        ],
      },
      Impact: {
        summary:
          "Shipped as a released feature backed by 25 test suites, letting the agent complete real multi-step HR work end to end instead of handing the user back a set of instructions.",
        highlights: [
          "Covers KPI, payroll, attendance, duty roster, leave, recruitment, and appraisal workflows through one discovery-driven interface",
          "Adding a backend operation extends the agent through the allow-list, with no new agent code per capability",
          "Runs on a 50-step tool loop with high reasoning effort, so multi-part requests resolve in a single turn",
          "The same tool loop backs a scheduled background agent, reusing the architecture for unattended recurring HR tasks",
        ],
      },
    },
    category: "production",
  },
  {
    title: "CRM Publishing Portal",
    period: "View UI",
    periodCtaSlides: [
      "/crm/slides/01.webp",
      "/crm/slides/02.webp",
    ],
    description:
      "A separate Laravel + Lighthouse GraphQL service behind an internal publishing portal: the team writes release notes and tracks customer feature requests in one app, and the published notes surface to every tenant inside the HRMS product itself.",
    tags: ["Problem", "Architecture", "Implementation", "Impact"],
    tagDetails: {
      Problem: {
        summary:
          "Product updates and customer requests were scattered, so tenants did not reliably learn what shipped and requests had no tracked state.",
        highlights: [
          "Release announcements had no single authoring surface or consistent format",
          "Customer feature requests arrived through ad-hoc channels with no status anyone could check",
          "Whatever the team published had to reach tenants inside the product, not in a separate place they would never visit",
        ],
      },
      Architecture: {
        summary:
          "A standalone GraphQL API for the internal portal, deliberately kept separate from the main HRMS backend, whose published content is consumed by the product.",
        highlights: [
          "Laravel with Lighthouse exposing a small, focused schema rather than extending the main HRMS API",
          "Two domains only - release notes and feature requests - each with create, update, and delete plus filtered pagination",
          "JWT auth with a Microsoft login path, so internal staff sign in with existing company accounts",
          "S3-backed file uploads for the images embedded in release note content",
        ],
      },
      Implementation: {
        summary:
          "A rich-text authoring portal on one side, and in-product delivery to tenants on the other.",
        highlights: [
          "Release notes are tagged as new feature, improvement, bug fix, or security enhancement, and filterable by tag and title",
          "Feature requests carry a status lifecycle - in review, accepted, started working, released, non-priority - plus the domains that requested them",
          "Authored content is HTML-sanitized before storage, since it is written rich-text and rendered inside the product",
          "Published notes appear to tenants as an in-app release note modal, with a feature request panel on the dashboard",
        ],
      },
      Impact: {
        summary:
          "Gave the team one place to publish and one place to track demand, with tenants seeing updates where they already work.",
        highlights: [
          "Release communication became consistent and tagged instead of ad-hoc",
          "Feature requests gained a visible status trail from request through release",
          "Keeping the service separate let the portal evolve without adding surface area to the main HRMS API",
        ],
      },
    },
    category: "production",
  },
];
