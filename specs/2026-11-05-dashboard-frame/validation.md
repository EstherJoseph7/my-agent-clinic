# Validation: Build the dashboard frame

The work is ready to merge when all of the following hold:

- The dashboard is integrated into the existing application shell and gives
  agents and clinic staff clear access to the key areas already represented by
  the application.
- Dashboard content uses sample data only and does not imply live or persisted
  information.
- Focused tests verify the dashboard's main content and navigation.
- Strict TypeScript checks and the production build pass through
  `npm run build`; the Vitest suite passes through `npm test` and the combined
  `npm run validate` command.
- The dashboard has semantic structure and can be navigated and used with a
  keyboard.
- At narrow, medium, and wide viewport sizes, content and navigation remain
  usable, reflow appropriately, and do not cause horizontal overflow.
- No dashboard loading/empty/error states, new care workflows, API, or
  persistence layer are added as part of this feature.
