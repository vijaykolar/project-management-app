import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/async-handler';
import { config } from '../config/app-config';
import { registerSchema } from '../validation/auth-validation';
import { registerUserService } from '../services/auth-service';
import { HTTP_STATUS } from '../config/http-config';

// const BASE_PATH = config.FRONTEND_GOOGLE_CALLBACK_URL;
// const BASE_PATH = config.FRONTEND_GOOGLE_CALLBACK_URL;

const { FRONTEND_GOOGLE_CALLBACK_URL, FRONTEND_ORIGIN } = config;

export const googleLoginCallback = asyncHandler(async (req: Request, res: Response) => {
  const currentWorkspace = req.user?.currentWorkspace;
  if (!currentWorkspace) {
    return res.redirect(`${FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`);
  }
  return res.redirect(`${FRONTEND_ORIGIN}/workspace/${currentWorkspace}`);
});

export const registerUserController = asyncHandler(async (req: Request, res: Response) => {
  const body = registerSchema.parse({
    ...req.body,
  });

  await registerUserService(body);
  return res.status(HTTP_STATUS.CREATED).json({ message: 'User registered successfully' });
});
