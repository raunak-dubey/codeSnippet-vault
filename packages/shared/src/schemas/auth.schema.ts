import { z } from 'zod';
import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  USERNAME_REGEX,
} from '../constants/regex.js';

export const registerUserSchema = z.object({
  username: z.string().min(3).max(30).regex(USERNAME_REGEX),
  email: z.string().email().regex(EMAIL_REGEX).trim().toLowerCase(),
  password: z.string().min(8).regex(PASSWORD_REGEX),
});

export type RegisterInput = z.infer<typeof registerUserSchema>;

export const loginUserSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z.string().min(1),
});

export type LoginInput = z.infer<typeof loginUserSchema>;
