import { Router } from 'express';
import {
  createSnippet,
  getSnippetById,
  getAllSnippets,
} from './snippet.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const snippetRouter = Router();

snippetRouter.use(authMiddleware);

// ? Create snippet route
snippetRouter.post('/', createSnippet);

// ? Get snippet By id route
snippetRouter.get('/:id', getSnippetById);

// ? Get All snippets of user
snippetRouter.get('/', getAllSnippets);

export default snippetRouter;
