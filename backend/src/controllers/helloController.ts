import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export const getHello = async (req: Request, res: Response, next: NextFunction) => {
  // Simulating async operation
  // No try/catch needed thanks to Express 5
  res.status(200).json({
    status: 'success',
    message: 'Hello World from Express Controller!',
  });
};

export const getError = async (req: Request, res: Response, next: NextFunction) => {
  throw new AppError('This is a test error', 400);
};
