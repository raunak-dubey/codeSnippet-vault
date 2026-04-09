import { Router } from 'express';
import {
  register,
  login,
  verifyEmail,
  getMe,
  refresh,
  logout,
} from './auth.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const authRouter = Router();

authRouter.post('/register', register);

authRouter.get('/verify-email', verifyEmail);

authRouter.post('/login', login);

authRouter.get('/get-me', authMiddleware, getMe);

authRouter.post('/refresh', refresh);

authRouter.post('/logout', logout);

export default authRouter;
