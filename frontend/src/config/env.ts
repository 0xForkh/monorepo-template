import { z } from 'zod';

const envSchema = z.object({
  // Add frontend env vars here
});

// Vite exposes env vars on import.meta.env
const _env = envSchema.safeParse({});

if (!_env.success) {
  console.error('❌ Invalid frontend environment variables:', _env.error.format());
  throw new Error('Invalid environment variables');
}

export const env = _env.data;
