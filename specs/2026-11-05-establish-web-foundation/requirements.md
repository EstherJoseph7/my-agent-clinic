# Requirements: Establish the web foundation

## Scope

Establish a minimal browser-based application foundation for AgentClinic:

- Add a React UI scaffold bundled and served during development with Vite.
- Replace the current TypeScript console placeholder with a minimal AgentClinic home page.
- Show the AgentClinic name and a concise welcome reflecting the mission of helping users find care and coordinate it.
- Use semantic, accessible structure and responsive layouts for narrow, medium,
  and wide viewports; do not add workflows or extra features.
- Document commands for installing dependencies, running the development server, building for production, running tests, and validating the project.
- Use Vitest for the focused home-page smoke test that verifies the page renders its name and welcome; expose the combined build-and-test check as `npm run validate`.
- Preserve strict TypeScript checking.

This work does not add an API, database, persistence, hosting configuration, or product workflows beyond the informational home page.

## Context

The roadmap identifies this as phase 0, **Establish the web foundation**, following the current TypeScript console starter. The mission calls for a reliable, accessible, welcoming experience that helps users, agents, and clinic staff coordinate care. The technology guidance recommends a small TypeScript-first stack with React and Vite, while keeping persistence and additional frameworks out until required.

## Decisions

- Follow `specs/mission.md` and `specs/tech-stack.md`.
- Use stable, mutually compatible dependencies.
- Keep the initial UI to the AgentClinic name and a concise mission-oriented welcome; add no workflows or extra features.
- Use no API or persistence.
- Keep TypeScript strict checks enabled and make failures visible.
- Use Vitest as the test runner and include only a focused home-page render smoke test in this phase.
- Make `npm run validate` run both the strict production build and the Vitest suite.
- Ensure the page adapts to phone, tablet, and desktop widths without horizontal
  scrolling, and keeps navigation and primary links usable on touch and keyboard.
