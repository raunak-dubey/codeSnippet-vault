import { Response, Request } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { snippetService } from './snippet.service.js';
import { createSnippetSchema, searchSnippetSchema } from '@repo/shared';
import { sendRes } from '../../utils/sendRes.js';

export const createSnippet = asyncHandler(
  async (req: Request, res: Response) => {
    const data = createSnippetSchema.parse(req.body);
    const snippet = await snippetService.createSnippet(req.userId, data);

    sendRes(res, snippet, 201);
  },
);

export const getAllSnippets = asyncHandler(
  async (req: Request, res: Response) => {
    const snippets = await snippetService.getAllSnippets(req.userId);
    sendRes(res, snippets);
  },
);

export const searchSnippets = asyncHandler(
  async (req: Request, res: Response) => {
    const data = searchSnippetSchema.parse(req.query);
    const snippets = await snippetService.searchSnippets(req.userId, data);
    sendRes(res, snippets);
  },
);

export const getSnippetById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const snippet = await snippetService.getSnippetById(req.userId, id);
    sendRes(res, snippet);
  },
);

export const updateSnippet = asyncHandler(
  async (req: Request, res: Response) => {
    const id = String(req.params.id);

    const data = createSnippetSchema.parse(req.body);
    const snippet = await snippetService.updateSnippet(req.userId, id, data);
    sendRes(res, snippet);
  },
);

export const deleteSnippet = asyncHandler(
  async (req: Request, res: Response) => {
    const id = String(req.params.id);
    await snippetService.deleteSnippet(req.userId, id);
    res.status(204).send();
  },
);
