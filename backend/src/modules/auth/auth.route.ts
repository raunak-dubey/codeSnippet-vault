import { Router } from 'express';
import { register, login, verifyEmail } from './auth.controller.js';

const authRouter = Router();

authRouter.post('/register', register);

authRouter.get('/verify-email', verifyEmail);

authRouter.post('/login', login);

export default authRouter;
