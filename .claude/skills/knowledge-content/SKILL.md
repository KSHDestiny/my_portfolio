---
name: knowledge-content
description: Work with the knowledge/engineering-notes system - markdown notes, topic ordering, the brief mirror, and the Notion sync. Use when adding or editing notes, changing topic order or progress display, or debugging the daily knowledge sync.
user-invocable: true
---

# Knowledge content

The Knowledge section and every `/engineering-notes/[slug]` page are built from markdown on
disk by `lib/knowledge.ts`. 252 files across 8 topics.

## Layout

```
knowledge/
  <Topic Name>/
    1. First Note.md
    2. Second Note.md
  brief/
    <Topic Name>/
      1. First Note.md        # short version, SAME filename
```

Two parallel trees. `knowledge/<topic>/` holds the full note; `knowledge/brief/<topic>/`
holds a shorter version at the **identical path and filename**. The brief supplies the
preview text and the condensed view; a missing brief falls back to the full content
(`readFile(...).catch(() => null)`), so it degrades quietly rather than erroring.

Filenames are `<n>. <Title>.md`. The number drives ordering and the day number — it is
data, not decoration. Sorting is natural/numeric, so `10.` correctly follows `9.`.

## Editing

Edit the markdown. Never edit a generated page under `app/engineering-notes/` — routes come
from `generateStaticParams`.

When adding a note, add **both** files (full and brief) so previews read well. When renaming,
rename both, or the brief silently stops matching and the preview falls back to the full text.

Renaming changes the slug, which changes the URL. Existing links break.

## Registries in `lib/knowledge.ts`

Three lookup tables at the top, all keyed by **exact folder name**:

| Table | Effect |
| --- | --- |
| `KNOWLEDGE_TOPIC_ORDER` | Display order **fallback** — see precedence below |
| `TOPIC_BRIEF_DESCRIPTIONS` | Blurb shown under a topic |
| `TOPIC_PROGRESS_MULTIPLIER` | Divides progress — `2` means 2 files = 1 "day" |

**Gotcha:** these keys drift from the real folders and there's no error when they do — a
mismatched key just silently does nothing. (Five were stale until recently.) Before trusting
one, check:

```bash
ls knowledge/ | grep -v brief          # actual folder names
grep -n "KNOWLEDGE_TOPIC_ORDER\|MULTIPLIER" -A 8 lib/knowledge.ts
```

If you touch a registry, copy the folder name exactly — including parentheses and spacing.

**Sort precedence** (highest first):

1. `getTopicPriority()` in `lib/knowledge.ts`
2. `knowledge/.notion-sync-order.json` — written by the daily sync
3. `KNOWLEDGE_TOPIC_ORDER`
4. Natural alphabetical

So changing `KNOWLEDGE_TOPIC_ORDER` alone often has no visible effect: the sync file already
orders every topic and wins. To actually reorder the section, change the order in Notion (it
regenerates the file), or edit `.notion-sync-order.json` knowing the next sync overwrites it.

## Notion sync

`scripts/sync-notion-knowledge.mjs` (`npm run sync:knowledge`) pulls notes from Notion and
writes both trees, plus `knowledge/.notion-sync-order.json` to preserve ordering.

Needs `NOTION_TOKEN` and `NOTION_KNOWLEDGE_DATABASE_ID` (from `.env.local` or environment);
both are listed in `.env.example`.

A GitHub Action runs it daily at 17:30 UTC (00:00 Myanmar) and commits the result — this is
the source of the repeated `chore: daily knowledge sync` commits. It writes to `master`.

Because the sync overwrites these files, hand-edits to synced topics get clobbered on the
next run. Change the Notion source for those, not the markdown.

## Verify

`npm run build` — every note becomes a static page, so the page count reflects the note
count. Adding a note should raise it by one. If it doesn't, check the file is in a topic
folder (not loose in `knowledge/`) and isn't inside `brief/` only.
