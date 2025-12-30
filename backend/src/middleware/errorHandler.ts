import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { ZodError } from 'zod';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;
  
  if (!(error instanceof AppError)) {
    console.error('UNKNOWN ERROR:', err);
  }

  let statusCode = 500;
  let message = 'Something went wrong';
  let status = 'error';

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    status = error.status;
  } else if (error instanceof ZodError) {
    statusCode = 400;
    message = 'Validation Error';
    status = 'fail';
    // You might want to return detailed validation errors here
    return res.status(statusCode).json({
      status,
      message,
      errors: error.errors,
    });
  }

  res.status(statusCode).json({
    status,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
