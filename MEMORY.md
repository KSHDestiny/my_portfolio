# MEMORY.md

## Project Identity

- This repo is a personal portfolio website for **Kaung Sat Hein**.
- Stack: **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, **Framer Motion**.
- This is primarily a **frontend/content portfolio app**, not an enterprise backend system.
- Main instruction source: **`CLAUDE.md`** (rules, architecture, content model, verification).
  `AGENT.md` is just a pointer to it — do not duplicate content between them.
- Recurring procedures live in **`.claude/skills/`** (7): `repo-structure`, `portfolio-content`,
  `screenshot-slides`, `ui-components`, `knowledge-content`, `seo-metadata`, `verify-portfolio`.

## App Shape

- Only one route-level page exists: `app/page.tsx`.
- Layout is in `app/layout.tsx` with:
  - fixed `Navbar`
  - `ThemeProvider`
  - dark theme by default, system theme enabled
  - `BuildInfoBadge` (global, floating, see below)
- Homepage section order (navbar matches). The user chose to keep Skills right after About
  (recruiters scan technologies first) rather than the proof-first order:
  - Hero
  - About
  - Skills
  - Projects
  - Experience
  - How We Ship (`components/how-we-ship.tsx`, id `shipping`)
  - Knowledge
  - Education
  - Contact
  - Footer
- Positioning: title is **Senior Backend Engineer** (actual role: Senior Web Backend Developer,
  Jul 2026). Scale claim is "100K+ users across 8 countries" — NOT "concurrent"; that was
  removed as unsubstantiated. Don't reintroduce it without evidence.

## Key Content Sources

- `lib/content/` — **card content lives here** (split out of `projects.ts`):
  - `production-projects.ts` exports `PRODUCTION_PROJECTS` → the **Projects** section
  - `key-features.ts` exports `KEY_FEATURES` → the **Feature Highlights** section
- `lib/projects.ts` — types, ordering registries, Notion sync, and loaders only (~378 lines).
  Edit it for behavior, not content.
  - Can optionally fetch projects from Notion using:
    - `NOTION_TOKEN`
    - `NOTION_PROJECTS_DATABASE_ID`
  - If Notion is missing/fails, app falls back to local data.
  - If Notion returns projects, `mergeCuratedProjects()` retains the three local flagship
    case studies and their editorial detail/feature catalog. Matching Notion cards keep
    their description, URL, and order; missing flagships are included from local content.
  - The `HR AI Chatbot Agent` entry is sourced from the real `backend/app/Ai/` module in
    the local `~/Desktop/BetterHR/betterhr-web-workspace-api` repo (Laravel, not the old Next.js agent).
    Its architecture is a two-tool loop: `introspectTool` (discover GraphQL schema) then
    `executeGraphQLTool` (run it), over an allow-list of 48 queries / 31 mutations, plus two canvas tools.
    Note: there is no "implementer" component - the second half of the loop is "execute".
  - The `CRM Publishing Portal` card lives in `lib/content/production-projects.ts` (the Projects
    section), not key features - it is a separate service, not an HRMS feature. It is sourced from `~/Desktop/BetterHR/betterhr-crm-api`
    (Laravel + Lighthouse GraphQL). It is NOT a sales CRM - it is an internal publishing portal
    with two domains: ReleaseNote and FeatureRequest, plus File uploads and JWT/Microsoft auth.
    Published release notes surface inside the HRMS tenant as an in-app modal.
  - `Candidate & Employee Analytics` (the "Analysis" screenshots) covers THREE surfaces, not one:
    Candidate Intelligence (Recruitment), Employee Intelligence (Employees), and the dashboard
    Human Capital Overview. Slides live in `public/analytics/slides/` and are ALSO appended to the
    Better HR (HRMS) project deck, so that deck is bhr/01-07 + analytics/01-03.
  - Source PNGs now live beside their decks as `<area>/source/*.png` with descriptive
    kebab-case names (e.g. `ats/source/bulk-upload/05-candidate-with-ai-rating.png`).
    The `public/images to move/` staging folder is gone. Only `slides/*.webp` is referenced
    by the app; `source/` is kept for re-exports.
  - Better HR (HRMS) has an `AI Integration` tag covering the agent, CV extraction (both sides),
    JD-driven talent search, analytics, and the scheduled background agent.
  - A third AI feature surfaced in the screenshots: `Search Talent With Job Description`
    (reads a pasted/uploaded JD and auto-fills talent search filters).
  - HR AI Chatbot Agent slides live in `public/ai-agent/slides/`; slide 3 visibly shows the
    introspect -> execute loop as two status lines above the answer.
  - Two distinct CV features: `CV Bulk Upload` (ATS, many candidates, includes AI rating)
    and `Extract CV to Employee` (HRMS employee Talent tab, single employee).
  - Only allowed Notion key-feature titles:
    - `ATS CV Upload & AI Profile Extraction`
    - `Expense Tracking System`
    - `KPI Module`
    - `Permission Group`
    - `Indonesia Payroll`

- `lib/knowledge.ts`
  - Builds the Knowledge section from markdown files under `knowledge/`.
  - Reads both:
    - `knowledge/<topic>/...`
    - `knowledge/brief/<topic>/...`
  - Topics are filesystem-driven, sorted by a custom topic order.
  - Preview text is auto-extracted from markdown.
  - Registry keys must match folder names EXACTLY or they are silently ignored. Real folders:
    `100 Days of Cloud (AWS)`, `100 Days of Cloud (Azure)`, `100 Days of DevOps`,
    `100 Days of MLOps`, `Docker`, `Laravel Concepts`, `Professional Experience`,
    `Software Engineering`.
  - The two Cloud tracks use a progress multiplier of `2` (2 files = 1 "day").
  - `Software Engineering` is not a day-based track; treat it as topic-based study notes.

## Important UX / Feature Notes

- `components/navbar.tsx`
  - Fixed top nav with active-section tracking on scroll.
  - Mobile menu closes automatically on desktop breakpoint.

- `components/build-info-badge.tsx`
  - Small, quiet `Info` button (fixed bottom-right), rendered globally from `app/layout.tsx`.
  - Popover text (keep verbatim): "This portfolio was built and shipped end-to-end by Claude, an
    AI coding agent — directed entirely from a phone." Closed by default; only
    opens on click/tap. The old 5s auto-open/auto-close timers were removed deliberately so the
    first impression stays on the engineering work.

- Case studies (`app/projects/[slug]/page.tsx` + `components/case-study.tsx`)
  - Optional `caseStudy` on a Project: `role`, `context`, `constraints[]`,
    `decisions[{decision, instead?, why}]`, `outcomes[]`, `artifacts[{label,url}]`.
    Currently set on Better HR, ATS, and HR AI Chatbot Agent; those three also render as the
    "Start with these case studies" grid at the top of the Projects section.
  - `instead` is only filled where the source content states an explicit contrast.
  - Detail pages without `caseStudy.artifacts` auto-collect SVG `ctaUrl`s from `tagDetails`
    into a "Design Artifacts" gallery (SVGs render on a white panel for dark-mode legibility).
  - Optional `featureCatalog[{area, items[]}]` (Better HR only) renders "Features I Built".
    Sourced from the user's own commits (`git log --author="Kaung Sat Hein"`) in
    `~/Desktop/BetterHR/betterhr-web-workspace-api` (1,812 non-merge commits since 2023-11).
  - The detail-page eyebrow hides `period` when it is the "View UI" button label.
  - Cuvnora (the user's solo side project, `~/Desktop/KaungSatHein/cuvnora`,
    https://cuvnora.pages.dev) is deliberately NOT a project card. The user wants it only as a
    "how I face a problem and solve it" paragraph in the About → Profile card: he needed a PDF
    CV, so he built a local-first CV builder. Keep it to that one short story; the user removed
    the extra detail sentences (privacy, ATS/Word export, AI import).
  - "Fingerprint Device Sync (ZKT & HIK)" group comes from `Features/Integration/DeviceSync`
    (user's commits 9e4e65022b, 74d345ed17; on `main`, released 2026-10-23). It is NOT a daily
    cron: `device-attendance:sync` runs every 5 minutes (yesterday+today window) and
    `device-employee:sync` every 30 min, hitting 07:00/12:00/19:00 company-time windows.
    Don't publish tenant counts from its docs. User decision (explicit): site copy describes the
    sync as the product requested it - "triggered after the scheduled time and conclusion time of
    the HIK fingerprint device" - not the code's 5-minute interval. Keep the user's wording.
  - "Video Streaming & Training (Latest Work)" group comes from `Features/VideoLearning`
    (courses/lessons/quizzes, scoped access, S3 multipart presigned uploads, ffmpeg → HLS ladder
    up to 1080p on a dedicated `video` queue, presigned segment URLs, stale-upload rollback).
    As of 2026-11-16 it lives only on `feature/BHR-4570-video-learning` (not merged to `dev`),
    so copy says "Building" / "Latest Work", not "shipped".

- `components/how-we-ship.tsx` — "How We Ship Today" (Devin, Cognition's AI software engineer).
  Facts from the Better HR monorepo: 277 commits authored/co-authored by Devin since 2026-10-09;
  28 shared agent skills in `.agents/skills`; PR evidence template with Merge Danger;
  per-PR preview environments (copy-on-write DB templates); dev→staging, release PR→production.
  The infra (preview, Control Plane, CI) was mostly built by teammates — phrase it as "we",
  never as the user's own work. Internal hostnames are intentionally kept off the site.

- Experience: senior role includes the user's own account that he guides mid-level developers
  in the Myanmar region and explains product direction (also in About).

- Skills: the percentage skill bars were removed (SkillProgress is now unused by Skills).

- `components/hero.tsx`
  - Uses particles background and animated intro.
  - Profile image path: `public/images/profile.jpeg`
  - Resume link: `/KaungSatHein_cv.pdf` (hero button + icon, contact). The file is the user's
    4-page CV exported from Cuvnora (jsPDF, image-based pages); replace the file in place to update it.
    The hero also links an ATS-friendly, text-readable Word CV at `/KaungSatHein_cv_ats.docx`
    (from the user's `~/Downloads/Kaung_Sat_Hein_CV-2.docx`). Keep the chosen PDF as primary.

- `components/projects.tsx`
  - Server component that loads project data via `getProjects()`.
  - Real UI logic is delegated to `ProjectsClient`.

- `components/asset-preview.tsx`
  - Shared preview renderer used by both preview dialogs in `projects-client.tsx`.
  - Renders `slides` as a carousel: autoplays at 3s (`AUTOPLAY_MS`), large arrows both sides,
    dot indicators, arrow-key nav, play/pause, counter, and a progress bar.
  - Autoplay stops on the last slide (no wrap), stops permanently on any manual nav,
    pauses while hovering an arrow, and is disabled under `prefers-reduced-motion`.
  - Manual arrow/dot nav still wraps; only autoplay stops at the end.
  - Falls back to a single image, then an iframe, then a message.

- `components/knowledge.tsx`
  - Server component that loads knowledge topics via `getKnowledgeTopics()`.
  - Empty state tells users to add markdown under `knowledge/`.
  - `KnowledgeTopicsShell` (client-only, `ssr: false`) is wrapped in
    `components/knowledge-error-boundary.tsx` (`KnowledgeErrorBoundary`), a class-component
    error boundary. Added after a malformed/edge-case knowledge note triggered a client-side
    exception that blanked the entire page (server HTML was fine; the crash happened only
    after hydration, inside this client-only subtree). Now a bad note degrades to a small
    "couldn't load" card instead of taking down the whole site. Errors are still logged via
    `console.error` for debugging — this only contains the blast radius, it doesn't fix a bad
    note's content.

- `components/contact.tsx`
  - Uses **EmailJS in the client**.
  - EmailJS config is currently hardcoded in the component.
  - Contact details shown in UI include email, phone, and location.

## Public Assets / Documentation Surfaces

- `public/ats/`
  - ATS diagrams for use case, architecture, workflow, implementation.
- `public/expense/`
  - Expense module diagrams plus implementation diagram, and `slides/` UI screenshots.
- `public/kpi/`
  - KPI diagrams for use case, architecture, workflow, structure/ERD, implementation, and `slides/` UI screenshots.
- `public/permission_group/`
  - Permission Group diagrams for use case, architecture, workflow, structure/ERD, and implementation.
- `public/certificates/`
  - Certificate PDFs used by portfolio content.
- `public/images/profile.jpeg`
  - Main avatar/profile image.
- **UI previews are WebP slide decks, not GIFs.**
  - Slides live in `<project>/slides/` (or `public/projects/slides/<name>/` where one folder holds several projects).
  - Wired through `periodCtaSlides: string[]` in `lib/content/*.ts`; ordered by filename (`01.webp`, `02.webp`, ...).
  - The original GIFs were removed; to add or replace a preview, drop numbered `.webp` files in a `slides/` folder and list them in `periodCtaSlides`.

## Styling / Theme

- Global styles live in `app/globals.css`.
- Site supports light/dark themes, but layout defaults to dark.
- Uses gradient backgrounds, smooth scrolling, hidden scrollbars, and `full-height` section helpers.

## Practical Change Guidance

- If asked to update portfolio content, check:
  - section components in `components/`
  - `lib/content/*.ts` (card text), `lib/projects.ts` (behavior)
  - `knowledge/`
  - `public/` assets
- If asked to add project items, start with `lib/content/*.ts` unless user explicitly wants Notion-driven content changes.
- If asked to change learning notes, update markdown files under `knowledge/` rather than hardcoding UI.
- Avoid turning this repo into a backend-heavy architecture project unless explicitly requested.
