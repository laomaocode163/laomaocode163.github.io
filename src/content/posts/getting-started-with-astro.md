---
title: 使用 Astro 快速搭建一个静态博客
description: 从零开始，用 Astro + Content Collections 构建一个支持 Markdown 的静态个人博客，体验零运行时 JS 的极速体验。
pubDate: 2026-07-15
tags: [测试]
author: 念铭
---

## 为什么选择 Astro

Astro 是一个面向内容驱动网站的静态站点生成器。它的核心理念是 **默认零运行时 JavaScript**——最终产物是纯 HTML，只在交互需要时加载脚本。

> 对博客这类以阅读为主的站点来说，这意味着更快的首屏与更好的 SEO。

## 初始化项目

使用官方脚手架快速创建：

```bash
npm create astro@latest
```

选择空模板后，安装依赖并启动开发服务器：

```bash
npm install
npm run dev
# 默认地址 http://localhost:4321
```

## 用 Content Collections 管理文章

在 `src/content/config.ts` 中定义文章 schema：

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { posts };
```

所有 Markdown 文章只需放进 `src/content/posts/`，并填写 Frontmatter，Astro 会在构建期统一校验。

## 小结

Astro 让「写文章」回归纯粹：新增一篇博客就是新增一个 `.md` 文件。配合 Tailwind 与 Shiki，我们可以零成本获得现代化的阅读体验。
