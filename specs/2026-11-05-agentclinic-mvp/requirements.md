# Requirements: Complete the AgentClinic MVP

## Scope

Complete the essential sample-data workflows that let people, agents, and
clinic staff understand care context and coordinate an appointment:

- Give the dashboard loading, empty, and recoverable error states.
- Provide a sample-data agent directory and profiles with useful summaries.
- Represent ailments and therapies and clearly connect them to agents without
  implying unsupported diagnosis or recommendations.
- Present selectable sample availability, a booking review, booking
  confirmation, and clear success, unavailable-time, and recoverable-failure
  feedback.
- Let clinic staff view relevant sample appointments.
- Verify critical workflows and the responsive, accessible experience.

## Context

The roadmap identifies the dashboard frame as the first remaining product
workflow, followed by dashboard states, the directory and profiles, ailments
and therapies, appointment coordination, staff appointment access, data
ownership, and critical-flow and release validation. The mission is to help
people get relief by making care and coordination clear to both agents and
staff.

Follow `specs/mission.md` and `specs/tech-stack.md`, and retain the conventions
in the existing `specs/2026-11-05-establish-web-foundation/` and
`specs/2026-11-05-dashboard-frame/` specifications. Use the existing
TypeScript/React/Vite stack, strict TypeScript checks, and Vitest. Keep the
experience semantic, keyboard accessible, and responsive across narrow,
medium, and wide viewports.

## Decisions

- **MVP data:** use clearly labeled illustrative sample data only. Keep
  interactions and booking state in application memory; do not store personal
  or appointment data in browser storage.
- **Data integration:** defer an API, database, hosting platform, and shared
  persistence until data ownership and responsibilities are agreed. Keep
  sample workflows behind a small typed data boundary that can be replaced
  later.
- **Permissions:** do not add accounts, authentication, or role-specific
  permission gates. Make staff appointment access clear in the shared
  application.
- **Privacy:** use only minimal, non-sensitive illustrative agent and ailment
  details; do not introduce real personal or health information.
- **Care information:** display the relationships among agents, ailments, and
  therapies for orientation. Describe therapies neutrally and do not claim
  they are clinically appropriate or recommended.
- **Appointments:** use simple, clearly labeled sample date/time slots. A
  booking contains only the selected agent, relevant care/therapy context,
  selected date/time, and a sample booking status/identifier needed to review
  and display it. Do not collect contact details or imply live availability.
- **Failure behavior:** demonstrate unavailable-slot and recoverable booking
  failure feedback with sample behavior; allow the user to recover or select
  another time. Do not report a failed booking as confirmed.
- **Feature boundary:** include the roadmap's dashboard validation, critical
  flow verification, and MVP-level browser/accessibility/responsive checks.
  Defer broader deployment or release infrastructure.

## Out of scope

- API, database, shared or durable persistence, hosting, or production
  integration.
- Authentication, accounts, staff permissions, or role-specific access.
- Real or sensitive personal, health, or appointment data.
- Clinical diagnosis, therapy recommendation, or claims that sample
  availability is current.
- Features beyond the roadmap workflows required for this MVP.
