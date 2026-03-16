# SKILL.md

## Purpose
Execution playbooks and checklists for common work types in this repository.

## Global Execution Flow
1. Read context files in `AGENTS.md` order.
2. Identify target files with `rg`.
3. Inspect related imports/usages before editing.
4. If updating markdown rule/memory/process docs, ask user confirmation first.
5. Implement smallest safe change.
6. Validate and report outcomes.
7. Update feature note + archive when appropriate.

## Playbook: New Feature
1. Confirm affected section(s) and user flow.
2. Reuse existing UI primitives from `components/ui`.
3. Keep responsive behavior (mobile + desktop).
4. Add/adjust animations only if they match existing tone.
5. Validate:
   - no runtime errors
   - lint/build where possible
   - feature works in expected section

## Playbook: Bug Fix
1. Reproduce (or reason from code path if reproduction unavailable).
2. Find root cause; avoid cosmetic-only fixes.
3. Patch with minimal surface area.
4. Check for regressions in adjacent behavior.
5. Validate with focused run-through + lint/build where possible.

## Playbook: UI/Content Update
1. Edit section component data/text first.
2. Keep existing typography/spacing rhythm.
3. Verify anchors and navigation still point correctly.
4. Validate on small and large viewport assumptions.

## Playbook: Dependency/Infra Changes
1. Change only required package/config.
2. Confirm impact to Next.js build/runtime.
3. Run lint + build after change.
4. Document migration notes in feature file.

## Done Checklist (Always)
- Requested change implemented.
- No unrelated files changed.
- Validation results reported clearly.
- Remaining risks and next steps noted.
