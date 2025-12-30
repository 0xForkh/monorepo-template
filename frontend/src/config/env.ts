import { z } from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.string().url().default('http://localhost:20001'),
  // Add more frontend env vars here
});

// Vite exposes env vars on import.meta.env
const _env = envSchema.safeParse({
  VITE_API_URL: import.meta.env.VITE_API_URL,
});

if (!_env.success) {
  console.error('❌ Invalid frontend environment variables:', _env.error.format());
  // In frontend we can't process.exit, but we can log error or throw
  throw new Error('Invalid environment variables');
}

export const env = _env.data;
