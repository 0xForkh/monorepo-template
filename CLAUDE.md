# Project Architecture

## Stack
- **Monorepo**: Root `package.json` manages `frontend` and `backend`.
- **Frontend**: React 18 (Vite), TypeScript, TailwindCSS v4, Shadcn/UI.
- **Backend**: Node.js, Express, TypeScript, PostgreSQL, Prisma.
- **Package Manager**: npm (Workspaces not strictly enforced, simple subdirectory structure).

## Frontend (`/frontend`)
- **State**:
  - Server State: `@tanstack/react-query` (v5).
  - Auth/Global UI State: React Context (`src/context/`).
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
- `npm run dev`: Starts backend + frontend via PM2, tails logs.
- `npm start`: Builds frontend, starts production backend via PM2.
- `npm run stop` / `npm run delete`: Stop or remove PM2 processes.
- `npm run logs`: Tail PM2 logs.
- `npm run typecheck`: Runs `tsc` in both projects.
- `npm run install:all`: Installs dependencies for root and sub-projects.

## Conventions
- **Env Vars**: Must be validated in `src/config/env.ts` before use.
- **Async Handlers**: No `try/catch` in controllers (Express 5 handles it, or use wrappers if downgraded). Use `AppError` for logic errors.
- **Imports**: Use `@/` alias for `src/` in frontend.

## Dev ports (via `BACKEND_PORT` and `VITE_PORT` in `.env`)
- backend: 41938
- frontend: 41939

---

# Important Notes

## Environment Variables
- Single `.env` file at project root (not in subfolders).
- PM2 processes: loaded by `ecosystem.config.cjs` (parses `.env` and spreads into `env`).
- DB scripts: loaded via `dotenv -e .env` in root package.json scripts.
- Do NOT use `dotenv.config()` in backend code - env is pre-loaded.
- `DATABASE_URL` is optional — app starts without DB if not set.

## Prisma 7 Setup
Prisma 7 requires a driver adapter instead of `url` in schema:

1. **Schema** (`prisma/schema.prisma`): No `url` in datasource - it's defined in `prisma.config.ts`
2. **Dependencies**: `@prisma/adapter-pg` and `pg` are required
3. **Client Import**: Use `../generated/prisma/client` not `@prisma/client`
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
