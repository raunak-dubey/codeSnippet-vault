import express, { type Express } from 'express';
import { errorHandler } from './middlewares/errorHandler.middleware.js';
import authRouter from './modules/auth/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

// Routes
app.use('/auth', authRouter);

app.use(errorHandler);

export default app;
