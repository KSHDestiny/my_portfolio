---
name: ui-components
description: Build or modify homepage sections and components following this repo's conventions - server/client split, animation wrappers, theming, and shadcn usage. Use when adding a section, changing layout or styling, or touching anything in components/.
user-invocable: true
---

# UI components

26 components plus 50 shadcn primitives. Match what's there rather than introducing a new
pattern.

## Server / client split

Data loading is a **server** component; interactivity is a sibling **client** component.

```
projects.tsx          server — calls getProjects()
projects-shell.tsx    layout wrapper
projects-client.tsx   "use client" — coverflow, dialogs, state
```

Don't mark a data-loading component `"use client"` to save a file. Keep the boundary: the
server half fetches, the client half handles interaction. `knowledge.tsx` /
`knowledge-topics-client.tsx` follow the same shape.

Only add `"use client"` when you actually need state, effects, refs, or browser APIs.

## Section anatomy

A homepage section is a component in `components/`, rendered from `app/page.tsx`:

```tsx
<section id="projects" className="py-12 md:py-16">
  <div className="container mx-auto px-4">
    <AnimateInView>
      <SectionHeading eyebrow="Selected Work" title="Featured Work" description="..." />
    </AnimateInView>
  </div>
</section>
```

- `id` must match the navbar link — `components/navbar.tsx` tracks the active section on scroll
- `SectionHeading` takes `eyebrow`, `title`, `description` (last two optional)
- Section padding is `py-12 md:py-16`; content sits in `container mx-auto px-4`

## Animation

Use the existing wrappers in `components/animations/` — don't hand-roll Framer Motion per
section:

| Wrapper | For |
| --- | --- |
| `AnimateInView` | Fade/slide in on scroll. Props: `delay`, `duration`, `initialY/X`, `variants` |
| `StaggeredChildren` | Sequencing a list |
| `TypingEffect` | Hero typing |
| `SkillProgress` | Animated skill bars |

Stagger sibling blocks with `delay`, not nested timers. Respect reduced motion for anything
that autoplays.

## Theming

Dark is the default; light is supported. Use semantic tokens only:

- `bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`,
  `bg-primary`, `text-primary-foreground`
- Opacity suffixes are idiomatic here: `bg-primary/10`, `border-primary/20`

Never hardcode a hex or a raw Tailwind color (`bg-slate-900`) — it breaks one theme. Check
both themes before calling a visual change done.

## shadcn primitives

`components/ui/` is generated. Compose around it; don't edit in place, or the next
`shadcn add` overwrites you. Need a variant? Wrap the primitive in your own component.

Dialogs use `Dialog` / `DialogContent` / `DialogHeader` / `DialogTitle` / `DialogClose` —
see `projects-client.tsx` for the established shape.

## Responsiveness

Mobile-first: base classes are mobile, `md:` and up override. `useMediaQuery` (in `hooks/`)
handles JS-side branching — `projects-client.tsx` uses `(max-width: 767px)` to switch the
coverflow layout.

Wide content (tables, code) scrolls inside its own `overflow-x: auto`; the page body must
never scroll horizontally. Check with:

```js
document.documentElement.scrollWidth > window.innerWidth   // must be false
```

## The projects coverflow

`projects-client.tsx` renders a 3D coverflow. Two things bite:

- Inactive cards are `pointer-events-none` and dimmed — only the active card is clickable
- Only cards near the active index are rendered at all

So a click test may not reach a distant card. That's expected behavior, not a bug — verify
those through the data layer or the `/projects/[slug]` page.

## Before done

`npm run build` (lint runs there — an unused import after a refactor fails the build but
passes `tsc`). Check both themes and a mobile viewport. See `verify-portfolio`.
