# Requirements: Build the dashboard frame

## Scope

Build the first dashboard overview for AgentClinic:

- Present the key areas agents and clinic staff need to reach, using the
  existing experience shell and navigation.
- Use realistic sample data and make the interface understandable without
  requiring a backend.
- Keep the interface semantic, keyboard accessible, and responsive across
  narrow, medium, and wide viewports.

This feature establishes the dashboard frame only. Dashboard loading, empty,
and recoverable error states; agent directory and profile details; ailments,
therapies; appointment workflows; APIs; and persistence remain out of scope.

## Context

The roadmap marks the experience shell complete and lists **Build the dashboard
frame** as the first task in phase 2, **Build the dashboard and care
coordination workflows**. The mission calls for a clear, reliable experience
that helps agents and clinic staff find and coordinate care. The technology
guidance calls for a small TypeScript-first React/Vite application, focused
Vitest checks, and responsive layouts, without adding an API or persistence
before a confirmed requirement.

## Decisions

- Use the existing shared shell and navigation; do not create a parallel
  navigation model.
- Show the key agent and staff areas as clear dashboard content/access points,
  using the areas already represented by the application.
- Use sample data only; add no API, database, or persistence.
- Keep this work to the dashboard frame. The roadmap's next dashboard-state
  task and subsequent care-coordination workflows are separate work.
- Follow `specs/mission.md` and `specs/tech-stack.md`; retain strict TypeScript
  checks and use Vitest for focused tests.
- Support narrow, medium, and wide viewports, keyboard access, and layouts
  without horizontal overflow.
