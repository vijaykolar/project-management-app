export type AppConfig = () => {
  NODE_ENV: string;
  PORT: string;
  BASE_PATH: string;
  MONGO_URI: string;

  SESSION_SECRET: string;
  SESSION_EXPIRES_IN: string;

  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CALLBACK_URL: string;

  FRONTEND_ORIGIN: string;
  FRONTEND_GOOGLE_CALLBACK_URL: string;
};
