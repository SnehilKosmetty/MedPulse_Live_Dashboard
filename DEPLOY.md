# MedPulse — production deployment

This is a two-part app: **MedPulse.Api** (ASP.NET Core) and **medpulse-client** (Vite + React). The steps below cover HTTPS, secrets, CORS, and how the client finds the API.

## 1. API environment and HTTPS

- **JWT signing key (required in production):** The API reads `Jwt:Secret` from configuration. In production, do **not** put the real key in `appsettings.Production.json`. Set an environment variable instead (Azure App Service, Docker, or your host):

  - `Jwt__Secret` — long random string (32+ bytes as UTF-8 is a reasonable minimum; use a strong secret generator).

- **Other JWT settings** (`Issuer`, `Audience`, `ExpiresMinutes`) can stay in `appsettings.json` or be overridden with `Jwt__Issuer`, `Jwt__Audience`, etc.

- **HTTPS:** Put TLS on your reverse proxy (IIS, nginx, Caddy) or use your cloud’s managed certificate. The API uses `UseHttpsRedirection` by default; ensure the public URL is HTTPS.

- **CORS:** Set `Cors:AllowedOrigins` in `appsettings.Production.json` (or override with environment variable `Cors__AllowedOrigins` as a semicolon‑separated list in some hosts, or use the JSON config array in file). The origin must match the **browser origin** of your React app exactly (scheme + host + port), e.g. `https://app.example.com` (no trailing slash).

## 2. React client and API base URL

- **Local dev:** Leave `VITE_API_BASE_URL` unset. The Vite dev server proxies `/api` and `/hubs` to the API (see `vite.config.ts`).

- **Production build:** If the static site is on a **different** host than the API, create `medpulse-client/.env.production` (or your CI env) with:

  - `VITE_API_BASE_URL=https://api.yourdomain.com`  
  (no trailing slash)

  The client builds with `api` and SignalR using that base. If the SPA and API are served from the **same** origin (e.g. API also serves the `dist` folder), you can leave this unset and use relative paths.

## 3. Build and run (reference)

- API: `dotnet publish MedPulse.Api -c Release -o ./publish` then run the published DLL on the server with `ASPNETCORE_ENVIRONMENT=Production` and the secrets above.
- Client: `npm run build` in `medpulse-client` and deploy the `dist` folder to static hosting or the same site as the API.

## 4. Operational checklist

- Rotate `Jwt__Secret` if it was ever committed or exposed.
- Restrict CORS to known front-end origins only.
- Prefer short JWT lifetimes in production; use refresh tokens if you add a real user store later.
