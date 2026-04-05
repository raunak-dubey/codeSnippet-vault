import express, { type Express } from 'express';
import { errorHandler } from './middlewares/errorHandler.middleware.js';
import authRouter from './modules/auth/auth.route.js';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRouter);

app.use(errorHandler);

export default app;
