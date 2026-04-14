import { Types } from 'mongoose';
import snippetModel from './snippet.model.js';
import { CreateSnippetInput } from '@repo/shared';
import { isValidObjectId } from '../../utils/isValid.js';
import { NotFoundError } from '../../utils/AppError.js';

export const snippetService = {
  async createSnippet(userId: string, data: CreateSnippetInput) {
    return snippetModel.create({ userId: new Types.ObjectId(userId), ...data });
  },

  async getAllSnippets(userId: string) {
    isValidObjectId(userId, 'Invalid user ID');

    const snippets = await snippetModel.find({
      userId: new Types.ObjectId(userId),
    });
    return snippets;
  },

  async getSnippetById(userId: string, id: string) {
    isValidObjectId(id, 'Invalid snippet ID');
    const snippet = await snippetModel.findOne({
      _id: id,
      userId: new Types.ObjectId(userId),
    });

    if (!snippet) {
      throw new NotFoundError('Snippet not found');
    }
    return snippet;
  },

  async updateSnippet(userId: string, id: string, data: CreateSnippetInput) {
    isValidObjectId(id, 'Invalid snippet ID');
    isValidObjectId(userId, 'Invalid user ID');

    const snippet = await snippetModel.findOne({
      _id: new Types.ObjectId(id),
      userId: new Types.ObjectId(userId),
    });

    if (!snippet) {
      throw new NotFoundError('Snippet not found');
    }

    snippet.set(data);
    await snippet.save();

    return snippet;
  },

  async deleteSnippet(userId: string, id: string) {
    isValidObjectId(id, 'Invalid snippet ID');

    const snippet = await snippetModel.findByIdAndDelete({
      _id: id,
      userId: new Types.ObjectId(userId),
    });

    if (!snippet) {
      throw new NotFoundError('Snippet not found');
    }
    return snippet;
  },
};
