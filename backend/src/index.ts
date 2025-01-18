import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import session from 'cookie-session';
import cors from 'cors';

import { config } from './config/app-config';

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

// Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Server
app.listen(config.PORT, () => {
  console.log(`Server is running on ${config.PORT} in ${config.NODE_ENV} mode`);
});
