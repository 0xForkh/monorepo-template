import express, { Request, Response } from 'express';
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

// Middleware
app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:20002', 
    'https://vay.leetlabs.ai', 
    'http://vay.leetlabs.ai'
  ], // Frontend URLs
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// CSRF protection would typically go here, but requires session or cookie setup first.
// We will implement it fully in the auth phase.

// Routes
app.use('/hello', helloRoutes);

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// Handle 404
app.all('{*path}', (req: Request, res: Response, next: Function) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
