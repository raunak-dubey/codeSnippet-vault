import { Types, PipelineStage } from 'mongoose';
import snippetModel, { ISnippet } from './snippet.model.js';
import { CreateSnippetInput, SearchSnippetInput } from '@repo/shared';
import { isValidObjectId } from '../../utils/isValid.js';
import { NotFoundError } from '../../utils/AppError.js';
import { escapeRegex } from '../../utils/regex.js';
import { env } from '../../config/env.js';

const SNIPPET_LIST_PROJECTION = {
  title: 1,
  programmingLanguage: 1,
  description: 1,
  tags: 1,
  visibility: 1,
  createdAt: 1,
  updatedAt: 1,
} as const;

interface FacetResult {
  data: ISnippet[];
  totalCount: [{ count: number }] | [];
}

type MatchDoc = Record<string, unknown>;

export const snippetService = {
  async createSnippet(userId: string, data: CreateSnippetInput) {
    return snippetModel.create({ userId: new Types.ObjectId(userId), ...data });
  },

  async getAllSnippets(userId: string) {
    isValidObjectId(userId, 'Invalid user ID');

    return snippetModel
      .find({ userId: new Types.ObjectId(userId) })
      .select(SNIPPET_LIST_PROJECTION)
      .sort({ createdAt: -1 })
      .lean();
  },

  async searchSnippets(userId: string, query: SearchSnippetInput) {
    isValidObjectId(userId, 'Invalid user ID');

    const { query: searchText, programmingLanguage, tags, page, limit } = query;

    const _page = Number(page) || 1;
    const _limit = Number(limit) || 10;
    const skip = (_page - 1) * _limit;

    const baseFilter: MatchDoc = {
      userId: new Types.ObjectId(userId),
    };

    if (programmingLanguage) {
      baseFilter.programmingLanguage = {
        $regex: `^${escapeRegex(programmingLanguage)}$`,
        $options: 'i',
      };
    }

    if (tags) {
      const tagList = tags
        .split(',')
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean)
        .splice(0, 10);

      if (tagList.length > 0) {
        baseFilter.tags = {
          $in: tagList,
        };
      }
    }

    if (!searchText) {
      const [snippets, total] = await Promise.all([
        snippetModel
          .find(baseFilter)
          .select(SNIPPET_LIST_PROJECTION)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(_limit)
          .lean(),
        snippetModel.countDocuments(baseFilter),
      ]);

      return buildPaginatedResult(snippets, total, _page, _limit);
    }

    const escapedText = escapeRegex(searchText);

    const pipeline: PipelineStage[] = [
      {
        $match: {
          ...baseFilter,
          $text: { $search: searchText },
        },
      },

      {
        $addFields: {
          _textScore: { $meta: 'textScore' },
          _titlePrefixBoost: {
            $cond: [
              {
                $regexMatch: {
                  input: '$title',
                  regex: `^${escapedText}`,
                  options: 'i',
                },
              },
              3,
              0,
            ],
          },

          _langBoost: {
            $cond: [
              {
                $regexMatch: {
                  input: '$programmingLanguage',
                  regex: `^${escapedText}`,
                  options: 'i',
                },
              },
              2,
              0,
            ],
          },
        },
      },

      {
        $addFields: {
          _score: {
            $add: ['$_textScore', '$_titlePrefixBoost', '$_langBoost'],
          },
        },
      },
      {
        $sort: { _score: -1, createdAt: -1 },
      },

      {
        $facet: {
          data: [
            { $skip: skip },
            { $limit: _limit },
            {
              $project: {
                ...SNIPPET_LIST_PROJECTION,
                ...(env.NODE_ENV !== 'production' && { _score: 1 }),
                _textScore: 0,
                _titlePrefixBoost: 0,
                _langBoost: 0,
              },
            },
          ],
          totalCount: [{ $count: 'count' }],
        },
      },
    ];

    const rawResult = await snippetModel.aggregate<FacetResult>(pipeline);
    const result = rawResult[0];

    const snippets = result.data ?? [];
    const total = result.totalCount[0]?.count ?? 0;

    return buildPaginatedResult(snippets, total, _page, _limit);
  },

  async getSnippetById(userId: string, id: string) {
    isValidObjectId(id, 'Invalid snippet ID');
    isValidObjectId(userId, 'Invalid user ID');

    const snippet = await snippetModel
      .findOne({
        _id: new Types.ObjectId(id),
        userId: new Types.ObjectId(userId),
      })
      .lean();

    if (!snippet) {
      throw new NotFoundError('Snippet not found');
    }
    return snippet;
  },

  async updateSnippet(userId: string, id: string, data: CreateSnippetInput) {
    isValidObjectId(id, 'Invalid snippet ID');
    isValidObjectId(userId, 'Invalid user ID');

    const snippet = await snippetModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(id),
        userId: new Types.ObjectId(userId),
      },
      { $set: data },
      { new: true, runValidators: true },
    );

    if (!snippet) throw new NotFoundError('Snippet not found');
    return snippet;
  },

  async deleteSnippet(userId: string, id: string) {
    isValidObjectId(id, 'Invalid snippet ID');
    isValidObjectId(userId, 'Invalid user ID');

    const snippet = await snippetModel.findByIdAndDelete({
      _id: new Types.ObjectId(id),
      userId: new Types.ObjectId(userId),
    });

    if (!snippet) {
      throw new NotFoundError('Snippet not found');
    }
    return snippet;
  },
};

// ? ----- helpers --------
function buildPaginatedResult<T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
) {
  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
    },
  };
}
