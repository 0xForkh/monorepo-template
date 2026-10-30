import { defineConfig } from "prisma/config";

// process.env instead of env(): env() throws when unset, which breaks
// `prisma generate` in Docker builds and fresh clones without a database.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
