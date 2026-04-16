import { z } from 'zod';

export const createSnippetSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Title must be at least 3 characters.')
    .max(100, 'Title is too long'),

  code: z
    .string()
    .min(1, 'Code is required.')
    .max(10000, 'Code must be at most 10000 characters'),

  programmingLanguage: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, 'Programming language is required.')
    .max(30, 'Programming language is too long'),

  description: z.string().trim().min(1).max(500).optional(),

  tags: z
    .array(z.string().trim().toLowerCase().min(1).max(30))
    .max(10)
    .optional(),

  visibility: z.enum(['private', 'public']).optional().default('private'),
});

export type CreateSnippetInput = z.infer<typeof createSnippetSchema>;

export const searchSnippetSchema = z.object({
  query: z
    .string()
    .trim()
    .min(2, 'Search query must be at least 2 characters')
    .max(100, 'Search query too long')
    .optional(),
  programmingLanguage: z.string().trim().toLowerCase().max(30).optional(),
  tags: z.string().trim().max(200).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

export type SearchSnippetInput = z.infer<typeof searchSnippetSchema>;
