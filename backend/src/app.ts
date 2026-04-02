import express, { type Express } from 'express';
import { errorHandler } from './middlewares/errorHandler.middleware.ts';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(errorHandler);

export default app;
