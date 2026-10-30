# Project Architecture

## Stack
- **Monorepo**: Root `package.json` manages `frontend` and `backend`.
- **Frontend**: React 19 (Vite 8), TypeScript 6, TailwindCSS v4, Shadcn/UI.
- **Backend**: Node.js, Express, TypeScript, PostgreSQL, Prisma.
- **Package Manager**: pnpm (workspaces via `pnpm-workspace.yaml`, enforced by `packageManager` field in `package.json`).

## Frontend (`/frontend`)
- **State**:
  - Server State: `@tanstack/react-query` (v5).
  - Auth/Global UI State: React Context (`src/context/`), consumed via hooks in `src/hooks/` (e.g. `useAuth`).
- **Routing**: `react-router-dom` (`src/router.tsx`).
- **Styling**: Tailwind v4, Shadcn/UI components (`src/components/ui`).
- **API**: `axios` client (`src/lib/axios.ts`) with `zod` env validation (`src/config/env.ts`).
- **Structure**:
  - `src/api/`: API definition functions.
  - `src/pages/`: Route components.
  - `src/components/layout/`: Layout wrappers.

## Backend (`/backend`)
- **Architecture**: Layered (Clean-ish).
  - `routes/`: definitions -> `controllers/`: HTTP logic -> `services/`: Business logic -> `lib/prisma.ts`: DB access.
- **Validation**: `zod` middleware (`validateRequest`).
- **Error Handling**: Global `errorHandler` middleware, `AppError` class.
- **Config**: Strict `zod` env validation (`src/config/env.ts`).
- **DB**: Prisma ORM with Singleton pattern (`src/lib/prisma.ts`).

## Key Commands
- `pnpm run dev` / `vhdev up`: Starts backend + frontend via vhdev (dynamic ports).
- `pnpm run stop` / `vhdev stop`: Stop dev services.
- `pnpm run down` / `vhdev down`: Stop + deregister portless routes.
- `pnpm run logs` / `vhdev logs [service]`: Tail dev logs.
- `pnpm run build`: Builds frontend (backend runs via `tsx`, no build step).
- `pnpm run typecheck`: Runs `prisma generate` + `tsc` in both projects (also `:backend` / `:frontend`).
- `pnpm --filter frontend run lint`: ESLint (vendored `components/ui` and `hooks/use-mobile.ts` have relaxed rules).
- `pnpm run install:all`: Installs dependencies for root and sub-projects.
- `pnpm run db:migrate -- --name <name>`: Create a new Prisma migration.
- `pnpm run db:migrate:deploy`: Apply pending migrations (production).
- `pnpm run db:push`: Push schema without migrations (prototyping).
- `pnpm run db:generate`: Regenerate Prisma client.
- `pnpm run db:studio`: Open Prisma Studio.
- `pnpm run db:reset`: Reset database and re-apply all migrations.

## Conventions
- **Env Vars**: Must be validated in `src/config/env.ts` before use.
- **Async Handlers**: No `try/catch` in controllers (Express 5 handles it, or use wrappers if downgraded). Use `AppError` for logic errors.
- **Imports**: Use `@/` alias for `src/` in frontend.

## Testing
- **Dev servers**: Both frontend and backend run with hot-reload via vhdev. Don't spawn new dev servers.
- **You don't need to restart** backend or frontend to pick up changes — hot-reload handles it.
- **Typecheck**: Run `pnpm run typecheck` (or `:frontend`/`:backend`) from the project root. Never `cd` into subdirectories.
- **Manual testing**: Run `vhdev ps` to see assigned ports and URLs. Ports are dynamic (not hardcoded).
- **Logs**: Run `vhdev logs` or `vhdev logs frontend` / `vhdev logs backend` to inspect runtime errors.

## Dev Server (vhdev)
- Configured via `portless.json` at project root.
- Ports are dynamically assigned by vhdev (4000-4999 range). No port env vars in `.env`.
- Backend exports its port as `BACKEND_PORT` to the frontend via `exportPort`, so Vite's proxy config picks it up automatically.

## Vibehub Devtools
- `@vibehub/devtools` (dev dependency, from the Verdaccio registry set in `.npmrc`) adds the component picker + agent chat overlay.
- Loaded in `src/main.tsx` only when `import.meta.env.DEV` and `VITE_VIBEHUB_URL` are set; the production bundle never includes it.
- `VITE_PROJECT_PATH` defaults to the repo root (set in `vite.config.ts`), so devtools sessions open here.

## Production (Docker)
- Single image: Express serves `/api` and the built SPA from `frontend/dist` (SPA fallback for other GETs) on `PORT` (3000).
- Frontend build-time vars (`VITE_SENTRY_DSN`, `VITE_COMMIT_SHA`) are Docker build args.
- CORS is off by default (same-origin); set `CORS_ORIGINS` to allow other origins with credentials.
- Helmet CSP `connect-src` allows `'self'` plus the origins of `SENTRY_DSN` / `VITE_SENTRY_DSN`; add other API origins there.
- Sentry/GlitchTip is optional (no DSN = disabled). `dataCollection` disables PII capture; keep it that way.

---

# Important Notes

## Environment Variables
- Single `.env` file at project root (not in subfolders).
- Dev: vhdev loads `.env` automatically on every start/restart (no caching).
- Production: Docker — env vars injected by the container runtime.
- DB scripts: loaded via `dotenv -e .env` in root package.json scripts.
- Do NOT use `dotenv.config()` in backend code - env is pre-loaded.
- `DATABASE_URL` is optional — app starts without DB if not set, and `prisma generate` works without it.
- See `.env.example` for all supported variables.

## Prisma 7 Setup
Prisma 7 requires a driver adapter instead of `url` in schema:

1. **Schema** (`prisma/schema.prisma`): No `url` in datasource - it's defined in `prisma.config.ts`
2. **Dependencies**: `@prisma/adapter-pg` and `pg` are required
3. **Client Import**: Use `../generated/prisma/client` not `@prisma/client` (generated into `backend/src/generated/`, gitignored)
4. **Initialization**: Must pass adapter to PrismaClient constructor

```typescript
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: env.DATABASE_URL });
const adapter = new PrismaPg(pool);
new PrismaClient({ adapter });
```

## Zod 4 Changes
- `AnyZodObject` removed - use `z.ZodObject<z.ZodRawShape>` instead
