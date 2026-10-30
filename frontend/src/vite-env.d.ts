/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SENTRY_DSN?: string
  readonly VITE_COMMIT_SHA?: string
  readonly VITE_VIBEHUB_URL?: string
  readonly VITE_PROJECT_SLUG?: string
  readonly VITE_PROJECT_PATH?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
