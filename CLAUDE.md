# CLAUDE.md

Guidance for AI agents working in this repository.

## What this is

A personal portfolio website for **Kaung Sat Hein** — Next.js 15 (App Router), React 19,
TypeScript, Tailwind, shadcn/ui, Framer Motion. Deployed on Vercel.

It is a **content-and-presentation project**. The engineering depth on display lives in
*other* repos; this one renders the story of that work. Treat it accordingly: changes should
improve how the work reads, not add backend machinery here.

## Read order

1. **`MEMORY.md`** — fast recall: section structure, content sources, asset conventions,
   and hard-won gotchas. Start here.
2. This file — rules and workflows.
3. **`.claude/skills/`** — step-by-step procedures for recurring tasks (see below).
4. Only then, the code. If `MEMORY.md` already answers the question, don't re-scan the repo.

Keep `MEMORY.md` current. When a change makes it stale, update it in the same turn.

## Skills

Recurring work is documented as skills in `.claude/skills/`. Invoke with `/<name>`, or just
follow the file.

| Skill | Use when |
| --- | --- |
| `repo-structure` | Finding the right file, or adding one and unsure where it belongs |
| `portfolio-content` | Adding or editing a project card, feature highlight, or its detail page |
| `screenshot-slides` | Turning raw screenshots (PNG/GIF) into a WebP slide deck |
| `ui-components` | Adding a section, changing layout/styling, touching `components/` |
| `knowledge-content` | Editing notes, topic order, or the Notion knowledge sync |
| `seo-metadata` | Changing titles, Open Graph, sitemap, robots, or `lib/site.ts` |
| `verify-portfolio` | Confirming a change actually works before reporting done |

## Architecture

```
app/                    Routes. page.tsx is the only real page; [slug] routes are generated.
  projects/[slug]/      Per-project detail pages (generated from lib/projects.ts)
  engineering-notes/    Per-note pages (generated from knowledge/)
components/             22 section components + 50 shadcn/ui primitives in components/ui/
lib/
  projects.ts           Types, ordering registries, Notion sync, loaders
  content/
    production-projects.ts   Project card data — edit here to change the site
    key-features.ts          Feature Highlight card data
  knowledge.ts          Builds knowledge topics from knowledge/*.md
  site.ts               Site-level metadata
public/<area>/
  slides/*.webp         Slide decks referenced by the app
  source/*.png          Original screenshots, kept for re-export. Never referenced by code.
knowledge/              Markdown notes; mirrored under knowledge/brief/ for previews
scripts/                sync-notion-knowledge.mjs (also runs via GitHub Action)
```

Homepage order: Hero → About → Skills → Projects → Experience → Knowledge → Education →
Contact → Footer.

## Content model

Card content lives in `lib/content/`, split by section:

- **`content/production-projects.ts`** → `PRODUCTION_PROJECTS`, renders under **Projects**.
  Whole systems and services.
- **`content/key-features.ts`** → `KEY_FEATURES`, renders under **Feature Highlights**.
  Features *inside* a system.

`lib/projects.ts` itself holds only types, registries, Notion sync, and loaders — leave the
content out of it.

Deciding which: if it has its own repo, deploy, or lifecycle, it's a Project. If it's a
capability within a larger product, it's a Feature Highlight.

A card's `tags` become interactive chips; `tagDetails[tag]` supplies the summary and
highlights shown when a chip is selected. Tags are free-form — pick names that reveal the
*structure* of the work (`Introspect`, `Execute`, `Guardrails`) over generic labels
(`Solution`, `Impact`) when the specifics are interesting. Add an icon for any new tag in
`getTagIcon()` in `components/projects-client.tsx`, or it silently falls back to a document icon.

`period` doubles as the preview button label. Cards with a slide deck use `"View UI"`; put
the real timeline in the description so it isn't lost.

## Rules

**Scope**

- Improve presentation, content, UX, accessibility, and mobile behavior.
- Don't design backend services, API contracts, or databases here — that work belongs to the
  systems this site *describes*.
- Don't add dependencies without a clear need; 51 are already installed.

**Truthfulness** — this is a portfolio, so accuracy is not optional.

- Write cards from what the code and screenshots actually show. Never infer a feature that
  isn't evidenced, and never inflate scope.
- When the user names a component that doesn't exist in the source, say so and describe what
  is actually there instead of quietly writing around it.
- Check authorship (`git log --author`) before claiming ownership of work in another repo,
  and treat every external repo as read-only.
- Name a card for what the system **is**, not what its repo is called — check the domain
  model first. A repo named `*-crm-api` whose models are `ReleaseNote` and `FeatureRequest`
  is a publishing portal, and calling it a CRM would mislead.
- Prefer exact counts pulled from source ("48 queries, 31 mutations") over vague scale
  language, and skip claims true of every project ("used best practices").

**Technical**

- Match existing patterns. TypeScript must stay clean.
- Preserve responsiveness and light/dark theming. Cards render in a 3D coverflow — inactive
  cards are `pointer-events-none`, which matters when testing.
- Images: WebP for screenshots (raster), SVG only for authored diagrams. Never trace one into
  the other — see `screenshot-slides`.

## Verification

`npm run build` is the real gate — it typechecks, lints, and generates every static page.
A passing build plus a served-asset check is the minimum before saying a change works.
See the `verify-portfolio` skill; don't claim a UI behavior works without exercising it.
