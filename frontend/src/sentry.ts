import * as Sentry from '@sentry/react';

export function initSentry() {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  if (!dsn) return;

  Sentry.init({
    dsn,
    release: import.meta.env.VITE_COMMIT_SHA || 'unknown',
    environment: import.meta.env.MODE,
    tracesSampleRate: 0.1,
    // Sentry 11 collects user info, cookies, headers and bodies by default.
    dataCollection: {
      userInfo: false,
      cookies: false,
      httpHeaders: false,
      httpBodies: [],
      urlQueryParams: false,
    },
  });
}

export { Sentry };
