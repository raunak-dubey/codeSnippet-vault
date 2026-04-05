import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { authService } from './auth.service.js';
import { RegisterUserDto } from './dto/registerUser.dto.js';

export const register = asyncHandler(
  async (req: Request<object, object, RegisterUserDto>, res: Response) => {
    const dto = req.body;

    const result = await authService.registerUser(dto);
    res.status(201).json({
      success: true,
      data: result,
    });
  },
);
