const fs = require('fs');
const path = require('path');

// Parse .env file and return as object
function loadEnv(filename = '.env') {
  const envPath = path.join(__dirname, filename);
  if (!fs.existsSync(envPath)) return {};

  const content = fs.readFileSync(envPath, 'utf-8');
  const env = {};
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [key, ...rest] = trimmed.split('=');
    if (key) env[key] = rest.join('=').replace(/^["']|["']$/g, '');
  }
  return env;
}

const env = loadEnv();

module.exports = {
  apps: [
    // ── Development ──────────────────────────────────────────────
    {
      name: 'dev-backend',
      cwd: path.join(__dirname, 'backend'),
      script: 'npx',
      args: 'nodemon src/index.ts',
      env: {
        NODE_ENV: 'development',
        ...env,
      },
      watch: false,
      autorestart: true,
      max_restarts: 10,
    },
    {
      name: 'dev-frontend',
      cwd: path.join(__dirname, 'frontend'),
      script: 'npx',
      args: `vite dev --port ${env.VITE_PORT || 41939} --host`,
      env: {
        NODE_ENV: 'development',
        ...env,
      },
      watch: false,
      autorestart: true,
      max_restarts: 10,
    },

    // ── Production ───────────────────────────────────────────────
    // Frontend is built and served by the backend.
    // Run `npm run build --prefix frontend` before starting.
    {
      name: 'prod-backend',
      cwd: path.join(__dirname, 'backend'),
      script: 'dist/index.js',
      env: {
        NODE_ENV: 'production',
        ...env,
      },
      autorestart: true,
      max_restarts: 10,
    },
  ],
};
