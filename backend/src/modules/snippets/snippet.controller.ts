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

export const getSnippetById = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    if (!req.userId) {
      throw new UnauthorizedError('Unauthorized');
    }

    const { id } = req.params;
    const snippet = await snippetService.getSnippetById(
      req.userId,
      id as string,
    );

    res.status(200).json({
      success: true,
      data: snippet,
    });
  },
);

export const getAllSnippets = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    if (!req.userId) {
      throw new UnauthorizedError('Unauthorized');
    }

    const snippets = await snippetService.getAllSnippets(req.userId);

    res.status(200).json({
      success: true,
      data: snippets,
    });
  },
);

export const deleteSnippet = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    if (!req.userId) {
      throw new UnauthorizedError('Unauthorized');
    }

    const { id } = req.params;
    await snippetService.deleteSnippet(req.userId, id as string);

    res.status(200).json({
      success: true,
      data: null,
    });
  },
);
