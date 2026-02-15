import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { env } from '../config/env';

let prisma: PrismaClient | null = null;

if (env.DATABASE_URL) {
  const pool = new Pool({ connectionString: env.DATABASE_URL });
  const adapter = new PrismaPg(pool);

  const prismaClientSingleton = () => new PrismaClient({ adapter });

  declare global {
    var prismaGlobal: undefined | PrismaClient;
  }

  prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

  if (env.NODE_ENV !== 'production') {
    globalThis.prismaGlobal = prisma;
  }
} else {
  console.warn('DATABASE_URL not set — Prisma client not initialized');
}

export { prisma };
