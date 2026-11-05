# AgentClinic

A React + Vite sample-data application for exploring AgentClinic's care
coordination workflows.

## Local setup

```bash
npm install
```

## Useful commands

```bash
npm run dev
npm run build
npm test
npm run validate
```

- `npm run dev`: serves the app locally in development mode.
- `npm run build`: runs strict TypeScript validation and creates the production bundle.
- `npm test`: runs the focused Vitest suite for dashboard, profile, and booking
  workflows.
- `npm run validate`: runs the production build and Vitest suite together.

The directory, care information, appointment availability, and bookings use
illustrative sample data. Booking state exists only in memory for the current
page session; there is no API or persistence. Sample therapies are informational
and are not clinical recommendations.