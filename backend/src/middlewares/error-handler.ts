import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../config/http-config';
import { AppError } from '../utils/AppError';
import { ZodError } from 'zod';
import { ErrorCodeEnumType } from '../enums/error-code.enum';

export const errorHandler: ErrorRequestHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  console.log(`error occurred: on path ${req.path}`);
  if (error instanceof SyntaxError) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: 'Invalid JSON payload passed.',
    });
  }

  if (error instanceof ZodError) {
    return zodError(res, error);
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errorCode: error.errorCode,
    });
  }

  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: 'Internal Server Error',
    error: error?.message || 'Unknown error occurred',
  });

  //   next();
};

function zodError(res: Response, error: ZodError) {
  const errors = error.errors.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
  }));

  return res.status(HTTP_STATUS.BAD_REQUEST).json({
    message: 'Validation Error',
    errors,
    errorCode: ErrorCodeEnumType.VERIFICATION_ERROR,
  });
}
