import { Types } from 'mongoose';
import snippetModel from './snippet.model.js';
import { CreateSnippetInput } from '@repo/shared';
import { isValidObjectId } from '../../utils/isValid.js';

export const snippetService = {
  async createSnippet(userId: string, data: CreateSnippetInput) {
    return snippetModel.create({ userId: new Types.ObjectId(userId), ...data });
  },

  async getSnippetById(id: string) {
    isValidObjectId(id, 'Invalid snippet ID');
    return snippetModel.findById(id);
  },

  async getAllSnippets(userId: string) {
    isValidObjectId(userId, 'Invalid user ID');

    const snippets = await snippetModel.find({
      userId: new Types.ObjectId(userId),
    });
    return snippets;
  },
};
