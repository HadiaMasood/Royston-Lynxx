import { Request, Response, NextFunction } from 'express';

export interface CustomError extends Error {
  statusCode?: number;
}

export function errorHandler(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const statusCode = err.statusCode || 500;
  
  // Log the complete error stack trace server-side for developer diagnostics
  console.error(`[Error Handler] ${req.method} ${req.url} - Status ${statusCode}:`, err.stack || err.message);

  // Return a generic error message to client without exposing sensitive internal details/stack traces
  res.status(statusCode).json({
    status: 'error',
    message: statusCode === 500 ? 'An unexpected internal server error occurred.' : err.message
  });
}
