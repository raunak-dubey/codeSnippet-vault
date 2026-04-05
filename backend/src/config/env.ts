import dotenv from 'dotenv';
import { NotFoundError } from '../utils/AppError.js';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

function getEnv(key: keyof NodeJS.ProcessEnv, required = true): string {
  const value = process.env[key];

  if (required && !value) {
    throw new NotFoundError(`Missing environment variable: ${key}`);
  }

  return value as string;
}

export const env = {
  NODE_ENV: getEnv('NODE_ENV'),
  PORT: Number(getEnv('PORT')),
  MONGO_URI: getEnv('MONGO_URI'),
  JWT_SECRET: getEnv('JWT_SECRET'),
  LOG_LEVEL: getEnv('LOG_LEVEL'),
  MAIL_HOST: getEnv('MAIL_HOST'),
  MAIL_PORT: getEnv('MAIL_PORT'),
  MAIL_USER: getEnv('MAIL_USER'),
  MAIL_PASS: getEnv('MAIL_PASS'),
  EMAIL_FROM: getEnv('EMAIL_FROM'),
  APP_URL: getEnv('APP_URL'),
};
