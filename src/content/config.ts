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
    // New fields — admin-readiness
    group: z.enum(['processes', 'scripts', 'policy', 'call-library']).optional(),
    parent: z.string().optional(),
    draft: z.boolean().default(false),
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
    // New fields — admin-readiness
    author: z.string().optional(),
    draft: z.boolean().default(false),
  }),
})

const announcements = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    role: z.string().optional(),
    initials: z.string(),
    avatarGradient: z.string().default('linear-gradient(135deg, #012d53 0%, #1e5c9e 100%)'),
    datePosted: z.string(),
    isNew: z.boolean().default(false),
    linkText: z.string().optional(),
    linkHref: z.string().optional(),
    linkIcon: z.string().optional(),
    draft: z.boolean().default(false),
  }),
})

const alerts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    body: z.string(),
    kind: z.enum(['info', 'warning', 'danger', 'weather']).default('info'),
    datePosted: z.string(),
    expiresOn: z.string().optional(),
    draft: z.boolean().default(false),
  }),
})

export const collections = { categories, articles, announcements, alerts }
