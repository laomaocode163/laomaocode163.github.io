import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 文章集合：所有 Markdown 文章存放于 src/content/posts 目录。
// 使用 Astro 5 的 Content Layer（glob loader），在构建期统一校验 frontmatter。
const posts = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    author: z.string().default(''),
    // draft=true 的文章不会出现在构建产物中
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
