---
name: verify-portfolio
description: Verify a portfolio change actually works before reporting it done - build, serve, check assets and pages, and drive the UI when behavior changed. Use after editing project content, slides, or components.
user-invocable: true
allowed-tools:
  - Read
  - Bash
---

# Verifying a change

"It compiles" is not "it works". Match the check to what changed.

| Changed | Minimum check |
| --- | --- |
| Card text only | `npm run build` |
| Added/renamed a card | build + page count + detail page loads |
| Slides / assets | build + every asset serves 200 + deck is referenced |
| Component behavior | all of the above + drive it in a browser |

## Build

```bash
npm run build
```

This is the real gate — it typechecks, lints, and generates every static page. `npx tsc
--noEmit` is a faster pre-check but misses lint errors that fail the build (an unused import
after a refactor will pass tsc and fail the build).

Watch the page count. It should rise by exactly one per new card. Unchanged after adding a
card means the card isn't rendering; up by two means something duplicated.

## Serve and check

```bash
npx next start -p 4000   # run in background
```

Wait for readiness with a condition, never a fixed sleep:

```bash
until curl -sf -o /dev/null http://localhost:4000/; do sleep 0.5; done
```

Starting the server before `npm run build` finishes writing `.next/` fails with
"Could not find a production build" — build first, then start.

**Assets serve:**

```bash
for f in $(find public/<area> -name "*.webp" | sed 's|^public||'); do
  c=$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:4000$f")
  [ "$c" = 200 ] || echo "FAIL $c $f"
done
```

**Content is actually wired** — a file existing doesn't mean it's referenced:

```bash
curl -s http://localhost:4000/ | grep -o '/<area>/slides/[0-9]*\.webp' | sort | uniq -c
```

Note titles containing `&` appear JSON-escaped as `&` in the HTML payload. Grepping for
the literal title returns nothing and looks like a failure — search for the escaped form.

## Driving the UI

When behavior changed (carousel, dialog, autoplay), exercise it. Playwright isn't a project
dependency — install it in the scratchpad so `package.json` stays clean:

```bash
cd $SCRATCHPAD && npm install --no-save playwright && npx playwright install chromium
```

Assert on observable state, and cover the failure path — a test that only checks the happy
path stays silent when the feature is dead:

```js
const counter = () => p.locator('[role="dialog"] >> text=/^\d+ \/ \d+$/').first().innerText();
await p.mouse.move(5, 5);              // move away from hover-sensitive controls
const before = await counter();
await p.waitForTimeout(3300);
console.log(before, '->', await counter());   // expect it to advance
```

**Known trap:** the homepage coverflow only renders cards near the active index, and inactive
cards are `pointer-events-none`. A click test may not reach a distant card. That's a test
limitation, not an app bug — verify those through the data layer and the `/projects/[slug]`
detail page instead, and say which path you used.

Use `reducedMotion: 'reduce'` for stable screenshots — but not when testing autoplay, since
the carousel disables it under that setting.

## Reporting

State what you verified and how, and name what you didn't. If a check failed or a path went
unexercised, say so — don't round up to "works". When a test fails, first ask whether the
test is wrong before changing the app.
