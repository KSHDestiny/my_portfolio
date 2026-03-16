# AGENT.md

## Purpose
This repository is a personal portfolio site built with Next.js (App Router), React, TypeScript, Tailwind CSS, and shadcn/ui components.

Use this document as the single source of truth for any coding agent modifying this project.

## Startup Protocol (Mandatory)
Every time a new chat starts, or when chat context changes, read files in this order:

1. `AGENT.md` (this file)
2. `MEMORY.md` (project memory, patterns, architecture)
3. `SKILL.md` (task playbooks/checklists)
4. `docs/features/README.md`
5. `docs/features/ARCHIVE.md`
6. relevant active feature note files in `docs/features/`

If one of these files is missing, continue with available files and state what is missing.

## Instruction Priority
When instructions conflict, resolve in this order:

1. `AGENT.md`
2. active feature note file (`docs/features/*.md`)
3. `SKILL.md`
4. `MEMORY.md`

## Sync Rule
- If `AGENT.md` is changed, `CLAUDE.md` must be updated in the same task to stay aligned.
- Do not introduce conflicting guidance between `AGENT.md` and `CLAUDE.md`.

## Markdown Update Confirmation Rule
- Before updating any project markdown rule or memory files, ask for user confirmation first.
- This applies to: `AGENT.md`, `CLAUDE.md`, `MEMORY.md`, `SKILL.md`, `AGENTS.md`, and `docs/features/*.md`.

## Quick Start
- Install: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Production run: `npm run start`
- Lint: `npm run lint`

If `pnpm` is available, `pnpm install` and `pnpm dev` are also valid (lockfile is `pnpm-lock.yaml`).

## Project Structure
- `app/`: Next.js App Router files (`layout.tsx`, `page.tsx`, global styles)
- `components/`: Page sections and reusable UI primitives
- `components/ui/`: shadcn/radix-based UI components
- `hooks/`: custom React hooks (`use-media-query`, `use-mobile`, toast hooks)
- `lib/`: shared utilities (`cn` helper)
- `public/`: static assets (images, certificates/PDFs)
- `scripts/`: helper scripts (PDF worker download script)

## Architecture Notes
- The homepage is section-based and assembled in `app/page.tsx`.
- Main sections: Hero, About, Skills, Experience, Projects, Education, Contact.
- Animations are primarily handled with Framer Motion.
- Theme toggling is handled via `next-themes`.
- Certificate PDFs are previewed with a browser-native embedded viewer (`iframe`) and include open/download actions.
- Contact form uses EmailJS directly from the client.

## Agent Workflow Expectations
- Before editing, read related files end-to-end and trace imports/usage.
- Keep changes small and focused; avoid unrelated refactors.
- Preserve existing style patterns (Tailwind utility style + shadcn component usage).
- Prefer TypeScript-safe changes; avoid `any` unless unavoidable.
- Keep UI responsive behavior intact across mobile and desktop.
- Do not remove existing assets in `public/certificates` unless explicitly requested.

## UI and UX Conventions
- Existing design supports both dark and light themes.
- Keep consistent class naming style and component layout conventions.
- Reuse existing shared components in `components/ui` before adding new primitives.
- Use smooth, minimal animations; avoid introducing heavy animation cost.

## Reliability and Safety
- Do not hardcode sensitive credentials.
- For client-side integrations (like EmailJS), prefer environment variables when changing config.
- Validate that new code does not break SSR/CSR boundaries (`"use client"` where needed).
- When adding browser-only APIs, guard against hydration issues.

## Verification Checklist (before finishing)
- `npm run lint` passes.
- `npm run build` succeeds.
- Key sections still render: hero, projects, education modal PDF, contact form UI.
- Theme toggle works in both directions.
- Mobile nav opens/closes correctly.

## Known Project-Specific Risks
- Browser PDF support varies by device/browser; open-in-new-tab and download options are provided as fallback.
- Contact form depends on valid EmailJS IDs/keys.
- This repo currently has many generated UI primitives; avoid accidental broad edits.
