import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { env } from '../config/env';

// PrismaClient is imported from the generated output after running `prisma generate`.
// If this import fails, run: npm run db:generate
import { PrismaClient } from '../generated/prisma/client';

declare global {
  var prismaGlobal: PrismaClient | undefined;
}

let prisma: PrismaClient | null = null;

if (env.DATABASE_URL) {
  const pool = new Pool({ connectionString: env.DATABASE_URL });
  const adapter = new PrismaPg(pool);

  const prismaClientSingleton = () => new PrismaClient({ adapter });

  prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

  if (env.NODE_ENV !== 'production') {
    globalThis.prismaGlobal = prisma;
  }
} else {
  console.warn('DATABASE_URL not set — Prisma client not initialized');
}

export { prisma };
