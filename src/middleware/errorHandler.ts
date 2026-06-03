import { Request, Response, NextFunction } from 'express';

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', err);

  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    error: message,
    message: message,
  } as ApiResponse);
};
