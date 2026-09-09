---
name: seo-metadata
description: Change site metadata, titles, Open Graph, sitemap, or robots. Use when editing SITE_ constants, page-level metadata, social share previews, or anything affecting how the site appears in search and link previews.
user-invocable: true
---

# SEO & metadata

The site is live on a real domain, so metadata changes are publicly visible. Titles and slugs
are especially costly to get wrong — changing a slug breaks every existing link to it.

## Where it lives

| Layer | File |
| --- | --- |
| Constants — URL, name, title, description, keywords, socials | `lib/site.ts` |
| Root metadata, Open Graph, Twitter, icons, robots directives | `app/layout.tsx` |
| Per-page metadata | `generateMetadata()` in each `[slug]/page.tsx` |
| Sitemap (auto-generated from real data) | `app/sitemap.ts` |
| Crawl rules | `app/robots.ts` |

Change values in `lib/site.ts` first — layout, sitemap, and robots all read from it, so a
single edit propagates. Don't hardcode the domain anywhere else; use `absoluteUrl(path)`.

## Conventions

- Title template is `"%s | Kaung Sat Hein"`. Page titles supply only the distinctive part —
  don't append the name yourself or it doubles.
- `metadataBase` is set, so relative paths resolve. Open Graph images still need absolute
  URLs — use `absoluteUrl()`.
- OG image is currently the profile photo at 1200×1200 (square, not the usual 1200×630).
  Twitter card is `summary_large_image`.
- `SITE_KEYWORDS` is a deliberate list targeting name and role searches. Add terms that match
  real content; don't stuff.

## Sitemap

`app/sitemap.ts` builds from `getAllProjects()` and `getKnowledgeTopics()` — every project
and note is included automatically. **Adding content requires no sitemap edit.** Only touch
it when adding a genuinely new *route type*.

Slugs come from `slugifyProjectTitle()` / `slugifyKnowledgeTitle()`. Renaming a card or note
changes its URL and orphans the old one. If a rename is requested, say that plainly — it's
usually still the right call, but the user should know.

## Verify

```bash
npm run build
npx next start -p 4000
curl -s http://localhost:4000/sitemap.xml | grep -c "<url>"    # count matches content
curl -s http://localhost:4000/robots.txt
curl -s http://localhost:4000/ | grep -o '<meta property="og:[^>]*>' | head
```

Titles containing `&` appear JSON-escaped in the payload — grep for the escaped form before
concluding something is missing.

Check that page count and sitemap entries move together: a new card should add one page
*and* one sitemap URL.
