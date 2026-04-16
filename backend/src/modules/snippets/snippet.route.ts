import { Router } from 'express';
import {
  createSnippet,
  getSnippetById,
  getAllSnippets,
  deleteSnippet,
  updateSnippet,
  searchSnippets,
} from './snippet.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const snippetRouter = Router();

snippetRouter.use(authMiddleware);

// ? Create snippet route
snippetRouter.post('/', createSnippet);

// ? Get All snippets of user
snippetRouter.get('/', getAllSnippets);

// ? Search snippets route
snippetRouter.get('/search', searchSnippets);

// ? Get snippet By id route
snippetRouter.get('/:id', getSnippetById);

// ? Update snippet route
snippetRouter.patch('/:id', updateSnippet);

// ? Delete snippet route
snippetRouter.delete('/:id', deleteSnippet);

export default snippetRouter;
