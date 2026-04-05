import { Router } from 'express';
import { register } from './auth.controller.js';

const authRouter = Router();

authRouter.post('/register', register);

// authRouter.post('/login');

export default authRouter;
