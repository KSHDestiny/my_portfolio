// Project card content. Edit here to change what appears on the site.
// Types and loading logic live in ../projects.ts

import type { Project } from "../projects";

export const KEY_FEATURES: Project[] = [
  {
    title: "KPI Module",
    period: "View UI",
    periodCtaSlides: [
      "/kpi/slides/01.webp",
      "/kpi/slides/02.webp",
      "/kpi/slides/03.webp",
      "/kpi/slides/04.webp",
      "/kpi/slides/05.webp",
      "/kpi/slides/06.webp",
      "/kpi/slides/07.webp",
      "/kpi/slides/08.webp",
      "/kpi/slides/09.webp",
      "/kpi/slides/10.webp",
      "/kpi/slides/11.webp",
      "/kpi/slides/12.webp",
      "/kpi/slides/13.webp",
    ],
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
    periodCtaSlides: [
      "/permission_group/slides/01.webp",
      "/permission_group/slides/02.webp",
      "/permission_group/slides/03.webp",
      "/permission_group/slides/04.webp",
      "/permission_group/slides/05.webp",
      "/permission_group/slides/06.webp",
      "/permission_group/slides/07.webp",
    ],
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
    title: "Extract CV to Employee (AI)",
    period: "View UI",
    periodCtaSlides: [
      "/ats/slides/extract-cv/01.webp",
      "/ats/slides/extract-cv/02.webp",
      "/ats/slides/extract-cv/03.webp",
      "/ats/slides/extract-cv/04.webp",
      "/ats/slides/extract-cv/05.webp",
    ],
    description:
      "Brought AI CV extraction into the HRMS employee record: from an employee's Talent tab, upload a CV and have experience, industry, function, education, certificates, and languages parsed into structured talent fields instead of typed in by hand.",
    tags: ["Requirements", "Workflow", "Implementation", "Testing"],
    tagDetails: {
      Requirements: {
        summary:
          "Existing employees had rich talent history sitting in CV files that nobody had time to retype, leaving the employee record thin and unsearchable.",
        highlights: [
          "Employee Talent Information was mostly empty because manual entry across experience, education, and certificates was slow",
          "The same extraction capability already existed for candidates, so employees should benefit from it too",
          "HR needed the extracted result reviewable before it overwrote anything on a real employee record",
        ],
      },
      Workflow: {
        summary:
          "A two-step dialog on the employee Talent tab: upload the CV, then review what was extracted before it is written to the profile.",
        highlights: [
          "Step 1 accepts a single PDF up to 5MB, keeping the input predictable for the parser",
          "Step 2 shows the extracted fields so HR confirms rather than trusts the model blindly",
          "An Import from Candidate Database path reuses an existing candidate profile when the employee was hired through the ATS",
        ],
      },
      Implementation: {
        summary:
          "Extraction maps CV text into the same structured talent schema the ATS uses, so one profile shape serves both candidates and employees.",
        highlights: [
          "Parsed output populates experience, industry, function, education background, certificate, and language sections",
          "Writes land on the employee's talent record, keeping profile, job, and payroll data untouched",
          "Reusing the candidate extraction schema keeps one contract to maintain instead of two",
        ],
      },
      Testing: {
        summary:
          "Checks focused on the risk of an AI write path touching live employee records.",
        highlights: [
          "Reject non-PDF and oversized uploads before any extraction work starts",
          "Confirm a failed or partial extraction leaves the existing employee record unchanged",
          "Verify re-running extraction updates talent fields without duplicating experience rows",
        ],
      },
    },
    category: "key-feature",
  },
  {
    title: "Candidate & Employee Analytics",
    period: "View UI",
    periodCtaSlides: [
      "/analytics/slides/01.webp",
      "/analytics/slides/02.webp",
      "/analytics/slides/03.webp",
    ],
    description:
      "Analytics over the structured talent data on both sides of the hiring line: Candidate Intelligence profiles the applicant pool in Recruitment, Employee Intelligence profiles the workforce under Employees, and a Human Capital Overview rolls the same picture onto the company dashboard.",
    tags: ["Requirements", "Architecture", "Implementation", "Impact"],
    tagDetails: {
      Requirements: {
        summary:
          "CV extraction had already turned unstructured documents into structured talent fields, but nothing read across those records to describe a population.",
        highlights: [
          "Recruiters could not tell how senior, how experienced, or how local the applicant pool was without opening records one at a time",
          "The same questions applied to existing staff - demographics, seniority, skills, and qualifications had no aggregate view",
          "Company-level headcount context belonged on the dashboard, not buried inside a module",
        ],
      },
      Architecture: {
        summary:
          "One analytics approach applied to two populations, reading the same normalized talent schema that CV extraction writes.",
        highlights: [
          "Candidate Intelligence aggregates the applicant pool inside Recruitment, beside Candidate Database and Talent Search",
          "Employee Intelligence aggregates the workforce under Employees, beside Directory and Employee Documents",
          "Human Capital Overview surfaces the workforce rollup on the dashboard Daily Overview for company-wide visibility",
          "Because all three read the extracted talent fields, no separate reporting pipeline was needed",
        ],
      },
      Implementation: {
        summary:
          "Aggregate panels reported as both count and share of total, covering demographics, seniority, geography, and background.",
        highlights: [
          "Candidate side: experience level, experience year, experience location, current company, applied company, and industry",
          "Employee side: gender, age split, and nationality across total headcount, plus the same experience breakdowns",
          "Dashboard rollup adds education background, field of study, skills, languages, and certificates",
          "Every panel is filterable, so a population can be narrowed before it is read",
        ],
      },
      Impact: {
        summary:
          "Turned parsed CVs into a picture of who is applying and who already works here, answerable at a glance instead of record by record.",
        highlights: [
          "Hiring decisions gained pool-level context rather than only per-candidate detail",
          "Workforce composition - demographics, seniority, nationality, skills - became visible without manual reporting",
          "Demonstrates the payoff of structured extraction: the same normalized fields serve search, profiles, and analytics",
        ],
      },
    },
    category: "key-feature",
  },
  {
    title: "Indonesia Payroll",
    period: "View UI",
    periodCtaSlides: [
      "/indonesia/slides/01.webp",
      "/indonesia/slides/02.webp",
      "/indonesia/slides/03.webp",
      "/indonesia/slides/04.webp",
      "/indonesia/slides/05.webp",
      "/indonesia/slides/06.webp",
      "/indonesia/slides/07.webp",
      "/indonesia/slides/08.webp",
      "/indonesia/slides/09.webp",
      "/indonesia/slides/10.webp",
    ],
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
    periodCtaSlides: [
      "/expense/slides/01.webp",
      "/expense/slides/02.webp",
      "/expense/slides/03.webp",
      "/expense/slides/04.webp",
      "/expense/slides/05.webp",
      "/expense/slides/06.webp",
      "/expense/slides/07.webp",
      "/expense/slides/08.webp",
      "/expense/slides/09.webp",
      "/expense/slides/10.webp",
      "/expense/slides/11.webp",
      "/expense/slides/12.webp",
    ],
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
