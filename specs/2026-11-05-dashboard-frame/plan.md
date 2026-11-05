# Plan: Build the dashboard frame

## 1. Establish the dashboard entry point

- Inspect the existing experience shell and navigation.
- Identify the dashboard's place in the current structure and preserve the
  shared navigation patterns.

## 2. Build the dashboard overview

- Show the key areas agents and clinic staff need to reach.
- Use realistic sample data and clear labels; do not imply that sample
  information is live or persisted.
- Keep the dashboard focused on orientation and access to existing areas, not
  new care-coordination workflows.

## 3. Integrate and adapt the frame

- Integrate the dashboard with the existing application shell and navigation.
- Use semantic, keyboard-accessible structure and adapt the layout to narrow,
  medium, and wide viewports without horizontal overflow.

## 4. Verify the dashboard

- Add focused tests for the dashboard's key content and navigation.
- Run `npm run validate` and verify keyboard access and responsive behavior at
  narrow, medium, and wide viewport sizes.
