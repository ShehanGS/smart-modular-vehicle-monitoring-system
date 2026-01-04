# Eco-Driving Assistant + Air Quality Monitoring (Frontend)

React 18 + TypeScript + Vite + Tailwind + shadcn/ui layout for the eco-driving research project. Includes admin/driver dashboards, unauthorized driver detection UI, real-time sensor visualisation, and alerting hooks.

## Quickstart

```bash
pnpm install   # or npm/yarn
pnpm dev       # start on http://localhost:5173
```

## Scripts

- `pnpm dev` – Vite dev server with React Refresh
- `pnpm build` – Type-check then build
- `pnpm preview` – Preview production build
- `pnpm lint` – ESLint (basic)

## Env

Copy `.env.example` to `.env` and adjust:

```
VITE_API_URL=http://localhost:8000/api
VITE_WS_URL=ws://localhost:8000/ws
```

## Structure

See `src/` for components grouped by feature (auth, dashboard, alerts, sensors, emissions, vehicles, drivers, trips). Hooks include auth, alerts, websocket, and camera. Services wrap Axios, camera helpers, and notifications. Zustand stores manage auth + alerts.

## Real-time + Samples

- WebSocket hook reconnects automatically and broadcasts new alerts.
- Sensor and trip dashboards use mocked live data; replace with API/WS streams.
- Unauthorized driver alert UI shows captured image, location, and actions.

## Notes

- Tailwind configured with project palette (primary/success/warning/danger).
- Components are mobile-first and include ARIA-friendly inputs/buttons.
- Dummy data + optimistic states used; wire to backend endpoints when ready.

