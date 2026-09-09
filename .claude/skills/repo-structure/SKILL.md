---
name: repo-structure
description: Map of where everything lives and which file to edit for a given change. Use when you need to find the right file, are unsure whether something is content or component, or are adding a new file and need to know where it belongs.
user-invocable: true
---

# Repo structure

Orientation map. For *how* to change something, see the task-specific skill.

## Tree

```
app/                       Routes (App Router)
  page.tsx                 The homepage — the only hand-written page
  layout.tsx               Root layout: metadata, ThemeProvider, Navbar
  projects/[slug]/         Generated per project from lib/projects.ts
    page.tsx               Server component: resolves slug → project
    project-detail-client.tsx   Interactive tag panel
  engineering-notes/[slug]/    Generated per knowledge entry
  robots.ts, sitemap.ts    SEO surfaces, driven by lib/site.ts
  not-found.tsx            404

components/                26 files
  <section>.tsx            One per homepage section (hero, about, skills, …)
  *-shell.tsx              Server wrapper: loads data, renders the client part
  *-client.tsx             The interactive half ("use client")
  asset-preview.tsx        Shared slide carousel used by both preview dialogs
  animations/              animate-in-view, staggered-children, typing-effect,
                           skill-progress
  ui/                      50 shadcn/ui primitives — generated, don't hand-edit

lib/
  projects.ts              Types, registries, Notion sync, loaders
  content/
    production-projects.ts Project card data
    key-features.ts        Feature Highlight card data
  knowledge.ts             Builds knowledge topics from knowledge/*.md
  site.ts                  SITE_URL, titles, keywords, social links
  utils.ts                 cn() and helpers

hooks/                     use-media-query, use-mobile, use-toast
knowledge/                 252 markdown notes, one folder per topic
  brief/                   Mirror of the same tree holding short versions
public/<area>/
  slides/*.webp            Slide decks referenced by cards
  source/*.png             Originals kept for re-export; never referenced by code
scripts/sync-notion-knowledge.mjs    Pulls knowledge from Notion
.github/workflows/         Daily knowledge sync (17:30 UTC)
```

## Which file do I edit?

| Want to change | Edit |
| --- | --- |
| A project card's text, tags, or slides | `lib/content/*.ts` |
| Project types, ordering, Notion sync | `lib/projects.ts` |
| Icon for a new tag chip | `getTagIcon()` in `components/projects-client.tsx` |
| Homepage section order | `app/page.tsx` |
| A section's layout or copy | `components/<section>.tsx` |
| Slide carousel behavior | `components/asset-preview.tsx` |
| Site title, description, keywords, domain | `lib/site.ts` |
| Page `<head>` / Open Graph | `app/layout.tsx` |
| A knowledge note | the markdown in `knowledge/` (**not** the generated page) |
| Knowledge topic order or progress math | registries at the top of `lib/knowledge.ts` |
| A shadcn primitive | usually don't — wrap it in your own component instead |

## Conventions

**Server/client split.** Data loading is a server component; interactivity is a sibling
`*-client.tsx`. `projects.tsx` (server) → `projects-shell.tsx` → `projects-client.tsx`.
Follow this rather than marking a data-loading component `"use client"`.

**Generated routes.** `/projects/[slug]` and `/engineering-notes/[slug]` come from
`generateStaticParams`. You never create these files — add data and the page appears. Slugs
come from `slugifyProjectTitle()`, so renaming a card changes its URL.

**`components/ui/` is generated.** shadcn primitives. Compose around them; don't edit in
place or the next `shadcn add` overwrites your change.

**Assets.** Every area gets `slides/` (WebP, referenced) and `source/` (PNG originals, not
referenced). Authored diagrams stay SVG at the area root (`public/ats/ats-architecture.svg`).

## Adding a file

- New homepage section → `components/<name>.tsx`, then render it in `app/page.tsx`
- New shared helper → `lib/`; new React hook → `hooks/`
- New reusable animation → `components/animations/`
- New route → only if it's genuinely a new page; prefer extending existing data sources

Don't add a route to show content that `lib/projects.ts` or `knowledge/` could carry.
