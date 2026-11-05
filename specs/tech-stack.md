# AgentClinic technology stack

## Recommendation

Use a small, TypeScript-first web stack:

- **Language:** TypeScript with strict type checking.
- **Web UI:** React, bundled and served during development with Vite.
- **Runtime and package manager:** Node.js and npm.
- **API:** add a Node.js/TypeScript API when the product needs shared or
  persistent data; keep its contract independent of the UI.
- **Testing:** use Vitest for focused component and unit tests, with
  browser-level tests for critical user flows as those flows are implemented.
  Run `npm run validate` to check the production build and Vitest suite.

Use stable, mutually compatible releases when each part of the stack is adopted.
Do not add a database, hosting platform, or additional framework until a
confirmed product requirement calls for it.

## Why this stack

It meets engineering's request for a reliable, popular TypeScript foundation
while supporting an interactive dashboard and a modern browser experience. It
also keeps early work small: the UI can be built and verified before committing
to a persistence or deployment design.

## Current repository baseline

The repository currently has a minimal TypeScript 5 Node project, compiled with
`tsc` using strict checking and NodeNext module settings. Its entry point is a
console placeholder; there is no web framework, API, or persistence layer yet.
Adopting the recommended web UI should be an explicit, incremental change rather
than an assumption that those pieces already exist.

## Engineering constraints

- Keep strict TypeScript checks enabled and make failures visible.
- Use Vitest as the standard test runner for validating UI and unit behavior.
- Prefer small dependencies and clear boundaries between UI and data access.
- Provide loading, empty, success, and error states for user-facing workflows.
- Verify responsive layout, keyboard access, and supported modern browsers.
- Avoid storing or logging personal or appointment data unless required.
