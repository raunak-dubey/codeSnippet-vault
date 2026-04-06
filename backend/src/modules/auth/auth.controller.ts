import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { authService } from './auth.service.js';
import { registerUserSchema, RegisterInput } from '@repo/shared';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const body: unknown = req.body;
  const data: RegisterInput = registerUserSchema.parse(body);

  const result = await authService.registerUser(data);
  res.status(201).json({
    success: true,
    data: result,
  });
});
