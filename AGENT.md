# AGENT.md

## Project Scope

This repository is a personal **portfolio website** built with Next.js, React, TypeScript, Tailwind CSS, and shadcn/ui.

The assistant must treat this as a **frontend portfolio project**, not a backend-integrated enterprise system.

## Core Rules

- Focus on portfolio presentation, content, and UX.
- Do not design or implement backend system architecture unless explicitly requested.
- Do not introduce enterprise workflow assumptions by default.
- Keep changes lightweight, visual, and content-driven.
- Preserve responsiveness and theme behavior.

## What Is In Scope

- Homepage sections and component improvements.
- Project/experience/skills content updates.
- UI polish, animation polish, accessibility improvements.
- Better readability, layout consistency, and mobile behavior.

## What Is Out of Scope (Unless Explicitly Requested)

- Backend service design.
- API contract design for non-portfolio products.
- Complex database architecture for external systems.
- Enterprise policy/workflow implementation that is unrelated to the portfolio app.

## Technical Guardrails

- Use existing project stack and patterns.
- Keep TypeScript-safe code.
- Avoid unnecessary dependencies.

## Directory Guidance

- `app/`: route-level pages/layout.
- `components/`: section and UI composition.
- `lib/`: shared data/utilities for portfolio content.
- `public/`: static assets used by portfolio pages.
- `knowledge/`: markdown content used by portfolio knowledge features.

## Final Expectation

Every change should improve or support the portfolio website experience.
