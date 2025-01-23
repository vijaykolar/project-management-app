import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import session from 'cookie-session';
import cors from 'cors';

import { config } from './config/app-config';
import { connectDB } from './config/database-config';
import { errorHandler } from './middlewares/error-handler';
import { asyncHandler } from './middlewares/async-handler';

import './config/passport-config';
import passport from 'passport';
import { authRouter } from './routes/auth-route';
import { userRouter } from './routes/user-route';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { workspaceRouter } from './routes/workspace-route';
import { memberRouters } from './routes/member-route';

// App
const app = express();
// Constants
const BASE_PATH = config.BASE_PATH;

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    name: 'session',
    keys: [config.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000,
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: config.FRONTEND_ORIGIN,
    credentials: true,
  }),
);

// Routes
app.get('/api/config-details', (req, res) => {
  res.send(config);
});

app.use(`${BASE_PATH}/auth`, authRouter);
app.use(`${BASE_PATH}/user`, isAuthenticated, userRouter);
app.use(`${BASE_PATH}/workspace`, isAuthenticated, workspaceRouter);
app.use(`${BASE_PATH}/member`, isAuthenticated, memberRouters);

app.post(
  BASE_PATH,
  asyncHandler(async (req: Request, res: Response) => {
    const { name, email } = req.body;
    res.status(200).json({ name, email });
  }),
);

app.use(errorHandler);

// Server
app.listen(config.PORT, async () => {
  console.log(`Server is running on http://localhost:${config.PORT} in ${config.NODE_ENV} mode`);
  await connectDB();
});
