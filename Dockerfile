FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.26.0 --activate

# --- Backend dependencies ---
FROM base AS deps-backend
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY backend/package.json backend/
RUN pnpm install --filter backend --frozen-lockfile

# --- Frontend dependencies ---
FROM base AS deps-frontend
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY frontend/package.json frontend/
RUN pnpm install --filter frontend --frozen-lockfile

# --- Build frontend ---
FROM deps-frontend AS build-frontend
WORKDIR /app/frontend
COPY frontend/ .
ARG VITE_SENTRY_DSN
ARG VITE_COMMIT_SHA
ENV NODE_ENV=production
RUN pnpm run build

# --- Generate Prisma client ---
FROM deps-backend AS build-backend
WORKDIR /app/backend
COPY backend/ .
RUN pnpm exec prisma generate

# --- Production ---
FROM base AS production
WORKDIR /app

COPY --from=build-backend /app/backend/node_modules backend/node_modules
COPY --from=build-backend /app/node_modules node_modules
COPY --from=build-backend /app/backend/src backend/src
COPY --from=build-backend /app/backend/package.json backend/
COPY --from=build-backend /app/backend/prisma backend/prisma
COPY --from=build-backend /app/backend/prisma.config.ts backend/
COPY --from=build-backend /app/backend/entrypoint.sh backend/
COPY --from=build-frontend /app/frontend/dist frontend/dist

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

WORKDIR /app/backend
ENTRYPOINT ["sh", "entrypoint.sh"]
