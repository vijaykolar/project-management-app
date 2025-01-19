import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/async-handler';
import { config } from '../config/app-config';

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
