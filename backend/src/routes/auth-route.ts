import { config } from './../config/app-config';
import { Router } from 'express';
import passport from 'passport';
import { googleLoginCallback, registerUserController } from '../controllers/auth-controller';

const authRouter = Router();

const failedUrl = `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`;

authRouter.post('/register', registerUserController);

authRouter.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    // session: false,
  }),
);

authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: failedUrl,
  }),
  googleLoginCallback,
);

export { authRouter };
