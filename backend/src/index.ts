import { Sentry } from './instrument';
import path from 'path';
import fs from 'fs';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { env } from './config/env';
import { errorHandler } from './middleware/errorHandler';
import { AppError } from './utils/AppError';
import helloRoutes from './routes/helloRoutes';

const app = express();
const PORT = env.PORT;

const sentryOrigins = [env.SENTRY_DSN, env.VITE_SENTRY_DSN]
  .filter((dsn): dsn is string => Boolean(dsn))
  .map((dsn) => new URL(dsn).origin);

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      connectSrc: ["'self'", ...sentryOrigins],
    },
  },
}));
// The SPA is same-origin (Vite proxy in dev, served below in prod); CORS is only for extra origins.
if (env.CORS_ORIGINS.length) {
  app.use(cors({ origin: env.CORS_ORIGINS, credentials: true }));
}
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/hello', helloRoutes);

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

const frontendDist = path.resolve(__dirname, '../../frontend/dist');
if (env.NODE_ENV === 'production' && fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist, { index: false }));
  app.get('{*path}', (req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith('/api/')) return next();
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

// Handle 404
app.all('{*path}', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Sentry error handler — must be before our error handler
Sentry.setupExpressErrorHandler(app);

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
