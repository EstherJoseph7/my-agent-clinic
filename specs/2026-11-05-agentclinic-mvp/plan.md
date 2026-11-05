# Plan: Complete the AgentClinic MVP

## 1. Complete dashboard states and navigation

- Preserve the shared application shell and dashboard frame.
- Add clear loading, empty, and recoverable error states for dashboard
  information, using sample data and a consistent way to retry recoverable
  errors.
- Keep agent and staff entry points understandable without account or role
  setup.

## 2. Add the sample-data agent directory

- Define typed, illustrative agent records with only the minimum non-sensitive
  fields needed by the interface.
- Show a useful directory summary and a clear path to each profile.
- Cover populated and empty directory states.

## 3. Add agent profiles and care information

- Show the selected agent's illustrative profile information.
- Define and display associated ailments and therapies, and make their
  relationships to the agent clear.
- Describe therapies neutrally; do not imply diagnosis or unsupported
  recommendations.

## 4. Define appointment data and availability

- Establish the minimum typed appointment and availability fields needed for
  the sample workflow.
- Present clearly labeled sample availability and let a user select a time.
- Explain unavailable or no-longer-selectable times without suggesting that
  sample availability is live.

## 5. Add booking review and confirmation

- Let the user review the selected agent, care context, and appointment details
  before confirming.
- Confirm a sample booking and show a clear success summary.
- Provide clear unavailable-time and recoverable-failure feedback, with a way
  to recover or choose another time.
- Keep booking changes in application state only; do not persist personal or
  appointment data.

## 6. Add staff appointment access

- Provide a clear staff-facing entry point to view appointments relevant to
  clinic work, using the sample booking data.
- Show useful appointment details and a clear empty state.
- Do not add authentication, permissions, or separate role-specific data
  access.

## 7. Connect sample data through a typed boundary

- Keep sample records and workflow operations behind a small typed data
  boundary so UI components do not depend on data representation details.
- Use the boundary consistently for directory, care information, availability,
  booking, and staff appointment views.
- Do not add an API, database, hosting platform, or shared persistence.

## 8. Verify critical user and staff flows

- Add focused tests for dashboard states, directory/profile navigation,
  agent-care relationships, booking review and success, unavailable times,
  recoverable failures, and staff appointment access.
- Verify loading, empty, success, and error feedback without hiding failures
  behind success-shaped fallbacks.
- Keep the strict TypeScript checks passing.

## 9. Verify accessibility, responsiveness, and browser behavior

- Verify semantic structure, keyboard access, readable content, and usable
  controls.
- Check narrow, medium, and wide viewports for appropriate reflow and no
  horizontal overflow.
- Check supported modern-browser behavior for the critical workflows.

## 10. Prepare the MVP for merge

- Run `npm run validate` and resolve any build or test failures.
- Review scope against this spec; defer account permissions, APIs, persistence,
  and release infrastructure until their requirements are agreed.
