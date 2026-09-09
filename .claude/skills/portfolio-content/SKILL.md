---
name: portfolio-content
description: Add or edit a project card, feature highlight, or its detail page in lib/content/. Use when the user wants to add a new project/feature, rewrite a card's content, move a card between Projects and Feature Highlights, or change tags shown on a card.
user-invocable: true
---

# Portfolio content

Card content lives in **`lib/content/`**. There is no CMS for it; the detail pages at
`/projects/[slug]` are generated from these arrays at build time.

`lib/projects.ts` holds the types, ordering registries, Notion sync, and loaders — edit it
only for behavior, not for content.

## Which array

| File / export | Renders under | Holds |
| --- | --- | --- |
| `content/production-projects.ts` → `PRODUCTION_PROJECTS` | **Projects** | Whole systems and services |
| `content/key-features.ts` → `KEY_FEATURES` | **Feature Highlights** | Features *inside* a product |

Test: does it have its own repo, deploy, or lifecycle? Then it's a Project. Is it a
capability within a larger system? Feature Highlight.

Getting this wrong is a real error — a separate service listed as a "feature" understates it.

## Card shape

```ts
{
  title: "Thing I Built",
  period: "View UI",              // button label; "View UI" when a deck exists
  periodCtaSlides: [              // optional deck, ordered
    "/area/slides/01.webp",
  ],
  description: "...",             // 1-3 sentences; lead with what it does, then how
  tags: ["Problem", "Architecture", "Guardrails", "Impact"],
  tagDetails: {
    Problem: {
      summary: "One sentence framing the constraint.",
      highlights: ["...", "...", "..."],   // 3-4, each a complete claim
    },
  },
  category: "production",         // or "key-feature" — must match the array
}
```

## Writing tags

Tags are free-form chips. Prefer names that expose the **structure of the work** over
generic scaffolding:

- Weak: `Problem` · `Solution` · `Decisions` · `Trade-offs` · `Impact`
- Strong: `Agent Architecture` · `Introspect` · `Execute` · `Guardrails`

The generic set is fine when the work genuinely is a standard build. Use specific names when
there's a real mechanism worth showing — that's the part a reader remembers.

**Every new tag needs an icon.** Add it to `getTagIcon()` in
`components/projects-client.tsx` and import the lucide icon, or it silently falls back to a
plain document icon:

```ts
const tagMap: Record<string, typeof FileText> = {
  "AI Integration": Sparkles,
  Introspect: Search,
  Guardrails: ShieldCheck,
};
```

## Ordering and registries (key features only)

Feature highlights are sorted by `KEY_FEATURE_ORDER`. Adding one means:

1. Add the title to `KEY_FEATURE_ORDER` with its position
2. Renumber the entries after it — leave no gaps
3. Add the title to `ALLOWED_KEY_FEATURE_TITLES`

That allow-list only gates the **Notion** sync path; `getLocalProjects()` ignores it. But a
card missing from it would vanish if Notion sync were ever enabled, so keep it in step.

Production projects have no registry — array order is display order.

## Moving a card between sections

1. Cut the object from one array, paste into the other
2. Flip `category` to match (`"production"` ⟷ `"key-feature"`)
3. If leaving key features: remove from both registries and renumber
4. If joining key features: add to both registries
5. Keep `period: "View UI"` if it has a deck — production cards with previews all use it

Verify by checking the detail page eyebrow reads `Project ·` vs `Feature Highlight ·`.

## Accuracy

This is a portfolio; a card that overstates is worse than one that omits.

- Write only what the source code, screenshots, or the user's own account support
- Don't invent a component, tool, or metric that isn't evidenced
- If the user names something that doesn't exist in the source, say so plainly and describe
  what is actually there
- Prefer concrete counts pulled from the source ("48 queries, 31 mutations") over vague
  scale language

## After editing

`npm run build` — it typechecks, lints, and regenerates every `[slug]` page. Page count
should rise by one per new card. See the `verify-portfolio` skill.
