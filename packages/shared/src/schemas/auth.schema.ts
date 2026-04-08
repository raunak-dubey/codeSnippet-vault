import { z } from 'zod';
import { PASSWORD_REGEX, USERNAME_REGEX } from '../constants/regex.js';

const usernameSchema = z
  .string()
  .min(3, 'Username must be at least 3 characters')
  .max(30, 'Username must be at most 30 characters')
  .refine((val) => USERNAME_REGEX.test(val), {
    message: 'Username can only contain letters, numbers and underscores',
  });

const emailSchema = z
  .string()
  .email('Invalid email format')
  .trim()
  .toLowerCase();

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .refine((val) => PASSWORD_REGEX.test(val), {
    message:
      'Password must include uppercase, lowercase, number and special character',
  });

export const registerUserSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export type RegisterInput = z.infer<typeof registerUserSchema>;

export const loginUserSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginInput = z.infer<typeof loginUserSchema>;
