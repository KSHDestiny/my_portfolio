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
- Homepage section order:
  - Hero
  - About
  - Skills
  - Projects
  - Experience
  - Knowledge
  - Education
  - Contact
  - Footer

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
  - Client-only floating badge (fixed bottom-right), rendered globally from `app/layout.tsx`
    (not gated to `app/page.tsx`), so it shows on every route.
  - `Info` icon button (shadcn `Popover`, not `Tooltip`, so it works on tap/mobile as well as
    click) with a `motion-safe:animate-ping` ring to draw the eye until first opened.
  - Auto-opens itself 10s after mount via `setTimeout` to surface a one-line note that the
    site was built end-to-end by an AI coding agent (Claude) from a mobile device.
  - Auto-closes itself 10s after opening (separate timer keyed on `open`) if the user doesn't
    interact — the icon and ability to reopen manually persist either way.
  - Fully dismissible (X button unmounts it for the session, skipping future auto-opens);
    otherwise the `Popover` stays externally controlled (`open`/`onOpenChange`) so it can
    reopen/close automatically as well as by tap.

- `components/hero.tsx`
  - Uses particles background and animated intro.
  - Profile image path: `public/images/profile.jpeg`
  - Resume link: `/Kaung-Sat-Hein-CV.pdf`

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
