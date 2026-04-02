import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger.ts';
import { AppError } from '../utils/AppError.ts';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;

  logger.error('Error occurred', {
    message: err.message,
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
  });

  res.status(statusCode).json({
    success: false,
    message: err instanceof AppError ? err.message : 'Internal Server Error',
  });
};
