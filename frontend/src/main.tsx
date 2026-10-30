import { initSentry, Sentry } from './sentry'
initSentry()

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/context/AuthContext'
import './index.css'
import App from './App.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Sentry.ErrorBoundary fallback={<p>Something went wrong</p>}>
          <App />
        </Sentry.ErrorBoundary>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)

const vibehubUrl = import.meta.env.VITE_VIBEHUB_URL
if (import.meta.env.DEV && vibehubUrl) {
  import('@vibehub/devtools').then(({ initVibehubDevtools }) => {
    initVibehubDevtools({
      vibehubUrl,
      projectSlug: import.meta.env.VITE_PROJECT_SLUG || '',
      projectPath: import.meta.env.VITE_PROJECT_PATH,
    })
  })
}
