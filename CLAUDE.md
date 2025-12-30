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
- `npm run dev`: Starts both servers concurrently (Ports: Backend `20001`, Frontend `20002` - via `.env`).
- `npm run typecheck`: Runs `tsc` in both projects.
- `npm run install:all`: Installs dependencies for root and sub-projects.

## Conventions
- **Env Vars**: Must be validated in `src/config/env.ts` before use.
- **Async Handlers**: No `try/catch` in controllers (Express 5 handles it, or use wrappers if downgraded). Use `AppError` for logic errors.
- **Imports**: Use `@/` alias for `src/` in frontend.
