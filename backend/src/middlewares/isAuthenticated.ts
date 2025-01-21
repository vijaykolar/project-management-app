import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../config/http-config';
import { UnauthorizedException } from '../utils/AppError';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || !req.user._id) {
    throw new UnauthorizedException('Unauthorized');
  }

  next();
};
