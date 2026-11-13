import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const baseSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  description: z.string(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: baseSchema,
});

const thoughts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/thoughts' }),
  schema: baseSchema,
});

const books = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/books' }),
  schema: baseSchema.extend({
    author: z.string(),
    rating: z.number().min(1).max(5),
    coverImage: z.string().optional(),
  }),
});

export const collections = { blog, thoughts, books };
