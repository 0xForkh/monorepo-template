import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  BACKEND_PORT: z.string().default('41938').transform((val) => parseInt(val, 10)),
  DATABASE_URL: z.string().url().optional(),
  // Add more env vars here as needed (e.g. JWT_SECRET, REDIS_URL)
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('Invalid environment variables:', _env.error.format());
  process.exit(1);
}

export const env = _env.data;
