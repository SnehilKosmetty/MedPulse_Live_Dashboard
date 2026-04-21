# MedPulse Live Dashboard

A full-stack demo dashboard for simulated medical/device monitoring: live metrics (SignalR), alerts with acknowledge, case list and detail views with per-case charts, JWT-protected APIs, and an in-memory mock data layer suitable for learning or as a prototype.

## Stack

| Layer | Technology |
|--------|------------|
| API | ASP.NET Core 8 Web API, SignalR, JWT Bearer |
| Client | React 19, TypeScript, Vite, Tailwind CSS, Recharts, Axios |

## Repository layout

- **`MedPulse.Api/`** — REST controllers, SignalR hub, mock services, JWT and CORS configuration.
- **`medpulse-client/`** — React SPA (login, dashboard, cases, case detail).
- **`DEPLOY.md`** — Production notes: HTTPS, `Jwt__Secret`, CORS, `VITE_API_BASE_URL`, publish commands.

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (LTS recommended) and npm

## Run locally

1. **Start the API** (default HTTP profile listens on port **5001**):

   ```bash
   cd MedPulse.Api
   dotnet run
   ```

   Swagger UI is available in Development at `/swagger`.

2. **Start the client** (port **5173**; proxies `/api` and `/hubs` to the API):

   ```bash
   cd medpulse-client
   npm install
   npm run dev
   ```

3. Open **http://localhost:5173**. Sign in with any username and password (the API issues a JWT for demo purposes).

## What you can try in the UI

- **Dashboard** — Summary cards, Recharts trend chart, active alerts (with **Acknowledge**), recent cases.
- **Cases** — Filter by status; open a case for details.
- **Case detail** — Live vitals badge; chart fed by `GET /api/cases/{id}/metrics` and refreshed when SignalR broadcasts metrics.

## Configuration (short)

- **Development:** JWT signing key lives in `MedPulse.Api/appsettings.Development.json` (`Jwt:Secret`). Do not use that value in production.
- **Production:** Set **`Jwt__Secret`** and align **`Cors:AllowedOrigins`** with your real front-end origin. See **[DEPLOY.md](./DEPLOY.md)**.
- **Client on a different host than the API:** set **`VITE_API_BASE_URL`** (see `medpulse-client/.env.example`).

## Build for release

```bash
dotnet build MedPulse.Api
cd medpulse-client && npm run build
```

Output for the SPA is under `medpulse-client/dist/`.

## License

This repository is a learning/demo project; use and adapt it as you see fit for your own work.
