# AgentClinic implementation roadmap

Deliver the product in small, verifiable phases. Each phase should leave the
project buildable and keep the user-visible scope focused. Use realistic sample
data until an API or persistence requirement is agreed.

## 0. Establish the web foundation

1. **Confirm the browser entry point:** record the current TypeScript console
   starter and keep the existing strict compiler checks passing.
2. **Add the web scaffold:** introduce React and Vite with a minimal page that
   runs in a modern browser.
3. **Verify the development loop:** document install, development, and build
   commands; ensure the production build succeeds.
4. **Add focused checks:** establish a test command and one smoke test for the
   rendered application.

## 1. Create the experience shell

5. **Set visual foundations:** define basic color, type, spacing, and layout
   tokens.
6. **Build shared navigation:** add the main page structure and clear navigation
   for agent and staff tasks.
7. **Check accessibility and responsiveness:** verify semantic structure,
   keyboard navigation, and narrow-screen layout before adding workflows.

## 2. Make the dashboard useful

8. **Build the dashboard frame:** show the key areas agents and staff need to
   reach, using sample data.
9. **Add dashboard states:** cover loading, empty, and recoverable error states.
10. **Validate the dashboard:** test its main navigation and responsive layout.

## 3. Add agent and care information

11. **Create an agent directory:** show agents from sample data with a useful
   summary and a clear way to open a profile.
12. **Add agent profiles:** show the information needed to understand an agent.
13. **Represent ailments:** define and display the ailments associated with an
   agent.
14. **Add therapies:** present therapies and their relevant descriptions.
15. **Connect care information:** make the relationship between agents,
   ailments, and therapies clear without implying unsupported recommendations.

## 4. Support appointment coordination

16. **Define appointment information:** agree on the minimum appointment and
   availability fields before building booking behavior.
17. **Show available times:** present selectable appointment times using sample
   data.
18. **Add booking review:** let a user review the selected details before
   confirming.
19. **Confirm and display a booking:** provide clear success and failure
   feedback and show the resulting appointment.
20. **Add staff appointment access:** let staff view appointments relevant to
   their work.

## 5. Connect and harden

21. **Agree on data ownership and persistence:** choose an API and storage
   approach only after the required workflows and data responsibilities are
   clear.
22. **Replace sample data one workflow at a time:** connect the directory,
   therapies, and booking flow through a typed data boundary.
23. **Verify critical flows:** test booking success, unavailable times, and
   recoverable failures end to end.
24. **Prepare a release:** check modern-browser behavior, accessibility,
   reliability, and production build output.

## Decisions to resolve when needed

Confirm account and staff permissions, appointment availability rules, what
agent and ailment information is appropriate to display, and the required
browser support before implementing the workflows that depend on them.
