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
import { NotFoundException } from './utils/AppError';

//
const BASE_PATH = config.BASE_PATH;

const app = express();

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
app.use(
  cors({
    origin: config.FRONTEND_ORIGIN,
    credentials: true,
  }),
);

app.use(errorHandler);

// Routes
app.get('/config-details', (req, res) => {
  res.send(config);
});

app.post(
  BASE_PATH,
  asyncHandler(async (req: Request, res: Response) => {
    const { name, email } = req.body;
    res.status(200).json({ name, email });
  }),
);

// Server
app.listen(config.PORT, async () => {
  console.log(`Server is running on ${config.PORT} in ${config.NODE_ENV} mode`);
  await connectDB();
});
