# Validation: Complete the AgentClinic MVP

The MVP is ready to merge when all of the following hold:

- `npm run validate` passes, including strict TypeScript checking, a production
  build, and the Vitest suite.
- Focused tests cover dashboard loading, empty, and recoverable error states;
  directory and profile navigation; agent, ailment, and therapy relationships;
  and staff access to sample appointments.
- Booking tests cover review before confirmation, successful confirmation,
  unavailable times, and a recoverable failure. A failed or unavailable booking
  is never shown as confirmed.
- The directory, care information, availability, booking, and staff views use
  a typed boundary and clearly labeled sample data.
- No personal or appointment data is saved to browser storage; no API, database,
  shared persistence, authentication, or role-specific permissions are added.
- Content is semantically structured and usable with a keyboard and assistive
  technology.
- Narrow, medium, and wide viewport checks confirm readable content, usable
  navigation and controls, appropriate reflow, and no horizontal overflow.
- Critical workflows work in the supported modern browsers, with clear loading,
  empty, success, and recoverable error feedback.
- Agent and care information is minimal and illustrative; therapies are
  presented neutrally without unsupported recommendations.
