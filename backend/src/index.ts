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
const PORT = env.BACKEND_PORT;

// Middleware
app.use(helmet());
app.use(cors({
  origin: [
    `http://localhost:${process.env.VITE_PORT || 41939}`,
  ],
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/hello', helloRoutes);

app.get('/api/health', (req: Request, res: Response) => {
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
