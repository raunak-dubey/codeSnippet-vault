import { Router } from 'express';
import { createSnippet, getSnippetById } from './snippet.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const snippetRouter = Router();

snippetRouter.use(authMiddleware);

// ? Create snippet route
snippetRouter.post('/', createSnippet);

// ? Get snippet By id route
snippetRouter.get('/:id', getSnippetById);

export default snippetRouter;
