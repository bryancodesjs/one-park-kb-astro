import { defineCollection, z } from 'astro:content'

const categories = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    icon: z.string(),
    color: z.string(),
    bgColor: z.string(),
    gradient: z.string(),
    description: z.string(),
    order: z.number(),
    featured: z.boolean().default(false),
  }),
})

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    dateCreated: z.string(),    // ISO date: '2026-04-08'
    summary: z.string(),
    tags: z.array(z.string()),
    readTime: z.string(),
    order: z.number().default(99),
    quickAccess: z.boolean().default(false),
  }),
})

export const collections = { categories, articles }
