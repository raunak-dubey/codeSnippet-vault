import { Types } from 'mongoose';
import snippetModel from './snippet.model.js';
import { CreateSnippetInput } from '@repo/shared';

export const snippetService = {
  async createSnippet(userId: string, data: CreateSnippetInput) {
    return snippetModel.create({ userId: new Types.ObjectId(userId), ...data });
  },

  async getSnippetById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid snippet ID');
    }
    return snippetModel.findById(id);
  },
};
