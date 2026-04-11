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

  language: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, 'Language is required.')
    .max(30, 'Language is too long'),

  description: z.string().trim().min(1).max(500).optional(),

  tags: z.array(z.string().trim().toLowerCase().min(1)).optional(),

  visibility: z.enum(['private', 'public']).optional().default('private'),
});

export type CreateSnippetInput = z.infer<typeof createSnippetSchema>;
