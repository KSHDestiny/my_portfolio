# MEMORY.md

## Project Identity

- This repo is a personal portfolio website for **Kaung Sat Hein**.
- Stack: **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, **Framer Motion**.
- This is primarily a **frontend/content portfolio app**, not an enterprise backend system.
- Main instruction source: `AGENT.md` says keep work portfolio-focused, lightweight, responsive, and theme-safe.

## App Shape

- Only one route-level page exists: `app/page.tsx`.
- Layout is in `app/layout.tsx` with:
  - fixed `Navbar`
  - `ThemeProvider`
  - dark theme by default, system theme enabled
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

- `lib/projects.ts`
  - Main source for portfolio project data.
  - Has two groups:
    - `productionProjects`
    - `keyFeatures`
  - The second group is presented in the UI as `Feature Highlights`.
  - Local fallback data is hardcoded here.
  - Can optionally fetch projects from Notion using:
    - `NOTION_TOKEN`
    - `NOTION_PROJECTS_DATABASE_ID`
  - If Notion is missing/fails, app falls back to local data.
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
  - `100 Days of Azure` and `100 Days of AWS Cloud` use a progress multiplier of `2`.
  - `Advanced Software Engineering` is not a day-based track; treat it as topic-based study notes.

## Important UX / Feature Notes

- `components/navbar.tsx`
  - Fixed top nav with active-section tracking on scroll.
  - Mobile menu closes automatically on desktop breakpoint.

- `components/hero.tsx`
  - Uses particles background and animated intro.
  - Profile image path: `public/images/profile.jpeg`
  - Resume link: `/Kaung-Sat-Hein-CV.pdf`

- `components/projects.tsx`
  - Server component that loads project data via `getProjects()`.
  - Real UI logic is delegated to `ProjectsClient`.

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
  - Expense module diagrams plus animated GIF preview and implementation diagram.
- `public/kpi/`
  - KPI diagrams for use case, architecture, workflow, structure/ERD, implementation, and GIF preview.
- `public/permission_group/`
  - Permission Group diagrams for use case, architecture, workflow, structure/ERD, and implementation.
- `public/certificates/`
  - Certificate PDFs used by portfolio content.
- `public/images/profile.jpeg`
  - Main avatar/profile image.

## Styling / Theme

- Global styles live in `app/globals.css`.
- Site supports light/dark themes, but layout defaults to dark.
- Uses gradient backgrounds, smooth scrolling, hidden scrollbars, and `full-height` section helpers.

## Practical Change Guidance

- If asked to update portfolio content, check:
  - section components in `components/`
  - `lib/projects.ts`
  - `knowledge/`
  - `public/` assets
- If asked to add project items, start with `lib/projects.ts` unless user explicitly wants Notion-driven content changes.
- If asked to change learning notes, update markdown files under `knowledge/` rather than hardcoding UI.
- Avoid turning this repo into a backend-heavy architecture project unless explicitly requested.
