import { Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { snippetService } from './snippet.service.js';
import { AuthRequest } from '../../middlewares/auth.middleware.js';
import { createSnippetSchema, CreateSnippetInput } from '@repo/shared';
import { UnauthorizedError } from '../../utils/AppError.js';

export const createSnippet = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    if (!req.userId) {
      throw new UnauthorizedError('Unauthorized');
    }

    const data: CreateSnippetInput = createSnippetSchema.parse(req.body);
    const snippet = await snippetService.createSnippet(req.userId, data);

    res.status(201).json({
      success: true,
      data: snippet,
    });
  },
);
