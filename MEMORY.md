# MEMORY.md

## Project Snapshot
- Name: `my-v0-project`
- Type: personal portfolio website
- Stack: Next.js (App Router), React 19, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion

## Architecture Map
- `app/layout.tsx`: root layout, theme provider, global navbar wrapper
- `app/page.tsx`: section composition entry point
- `components/`: section components (`hero`, `about`, `skills`, `experience`, `projects`, `education`, `contact`, `footer`)
- `components/ui/`: shadcn + Radix UI primitives
- `hooks/`: shared hooks (`use-media-query`, `use-mobile`, toast hooks)
- `lib/utils.ts`: `cn` utility for class merging
- `public/`: static assets, certificates PDFs, profile images

## Behavioral Notes
- Theme toggle uses `next-themes` and class-based dark mode.
- Hero has particles background and typing animation.
- Education section opens certificate details in a dialog and previews PDFs with an embedded browser viewer (`iframe`).
- PDF preview no longer depends on a pdf worker file.
- Contact form submits through EmailJS in client-side code.

## Style and Conventions
- Tailwind utility-first styling with CSS variable tokens in `app/globals.css`.
- Preserve current section structure and motion style.
- Prefer editing existing components over introducing large abstractions.
- Keep client/server boundaries explicit (`"use client"` where browser APIs/hooks are used).

## Known Risks / Gotchas
- PDF rendering behavior can vary by browser; open/download actions remain available.
- EmailJS IDs/keys in code are functional but should be environment-driven if refactored.
- Mobile nav behavior depends on media query hook and mounted state.
- Many generated UI primitives exist; broad edits can create hidden regressions.

## Collaboration Rules Memory
- Before changing markdown rule/memory/process docs, obtain user confirmation first.
- Includes: `AGENT.md`, `CLAUDE.md`, `MEMORY.md`, `SKILL.md`, `AGENTS.md`, and `docs/features/*.md`.

## Useful Commands
- `npm run dev`
- `npm run lint`
- `npm run build`
