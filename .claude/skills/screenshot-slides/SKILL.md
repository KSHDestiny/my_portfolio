---
name: screenshot-slides
description: Convert raw screenshots or GIFs into a WebP slide deck for a project card's "View UI" preview. Use when the user provides PNG/GIF screenshots of a feature, asks to add or replace a UI preview, or wants to reduce image weight in public/.
user-invocable: true
allowed-tools:
  - Read
  - Bash
  - Edit
---

# Screenshot → slide deck

Project cards show a **carousel**, not an animated GIF: the viewer controls the pace, and the
payload is far smaller.

## Format: WebP, not SVG

This comes up repeatedly, so decide it by origin:

| Content | Format | Why |
| --- | --- | --- |
| Screenshots, photos | **WebP** | Raster in, raster out |
| Authored diagrams (`*-architecture.svg`) | **SVG** | Real shapes, scale cleanly |

Never convert a screenshot to SVG. Wrapping raster in `<svg><image>` is ~8× larger for
identical pixels; true vector tracing turns anti-aliased text into thousands of polygons —
bigger *and* blurrier. Sharper screenshots come from re-exporting at higher resolution, not
from changing format.

## Layout

```
public/<area>/slides/01.webp      # referenced by lib/projects.ts
public/<area>/source/01-name.png  # originals, kept for re-export, never referenced
```

Slides are `01.webp`, `02.webp`, … — filename order *is* display order. When one folder holds
several decks, nest by feature: `public/ats/slides/bulk-upload/01.webp`.

Name source files descriptively in kebab-case with their number prefix
(`05-candidate-with-ai-rating.png`). Open each screen before naming it; a folder of
`01-cv-upload.png … 09-cv-upload.png` carries no information.

## Converting

Pillow isn't a project dependency. Use a scratchpad venv so nothing lands in `package.json`:

```bash
SP=<scratchpad>
python3 -m venv $SP/venv && $SP/venv/bin/pip install --quiet Pillow
```

```python
from PIL import Image, ImageSequence
import os, hashlib

MAXW = 1600          # sharp in the dialog, keeps files small
out = "public/<area>/slides"
os.makedirs(out, exist_ok=True)

# PNGs: sort by the number in the filename, not lexically (10 before 2 otherwise)
im = Image.open(src).convert("RGB")
if im.width > MAXW:
    im = im.resize((MAXW, round(im.height * MAXW / im.width)), Image.LANCZOS)
im.save(f"{out}/{i:02d}.webp", "WEBP", quality=82, method=6)
```

For **GIFs**, iterate `ImageSequence.Iterator` and dedupe frames by MD5 of `tobytes()` —
screen-recording GIFs in this repo were already slideshows (4–13 frames held ~2s each), so
every frame is a distinct screen worth keeping. Typical result: **~70–90% smaller**.

Expect ~1600px wide, quality 82, `method=6`. Check one output with Read before wiring it up —
text must stay crisp.

## Wiring

```ts
periodCtaSlides: [
  "/area/slides/01.webp",
  "/area/slides/02.webp",
],
```

Then set `period: "View UI"` so the button reads correctly, and delete any
`periodCtaMessage` apologizing that no preview exists.

Both portrait (mobile UI) and landscape decks work — `object-contain` letterboxes as needed.

## The carousel

`components/asset-preview.tsx` renders it, shared by both preview dialogs. Behavior:

- Autoplays every **3s** (`AUTOPLAY_MS`), **stops on the last slide** — no wrap
- Any manual navigation stops autoplay permanently (`tookControlRef`)
- Play resumes, restarting from slide 1 if already at the end
- Hover-pause is scoped to **the arrow buttons only**

That last point is a real bug worth not reintroducing: pausing on hover over the *image*
means autoplay never starts, because after clicking "View UI" the cursor is usually sitting
over the image. It looks identical to a broken timer.

- Respects `prefers-reduced-motion` (no autoplay)
- All slides stay mounted and cross-fade, so stepping is instant

## Verify

```bash
# every slide serves
for f in $(find public/<area> -name "*.webp" | sed 's|^public||'); do
  curl -s -o /dev/null -w "%{http_code} $f\n" http://localhost:PORT$f
done
```

Then confirm the deck is actually referenced:
`curl -s http://localhost:PORT/ | grep -o '/area/slides/[0-9]*\.webp' | sort -u`

Note the homepage coverflow only renders cards near the active index, so a Playwright click
test may not reach a distant card. That's a test limitation, not an app bug — check the data
layer and the detail page instead.
