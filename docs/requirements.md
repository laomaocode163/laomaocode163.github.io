# 个人博客 —— 需求文档

> 版本：v1.1 ｜ 更新日期：2026-07-17 ｜ 状态：已实现（评论为可选，默认未启用）

## 1. 产品概述

一个面向开发者群体、基于 **Astro** 构建的**静态个人博客**。博主以 Markdown 为主要写作方式，分享编程、开发与效率工具相关内容，也记录生活与思考。网站强调清晰的阅读体验、代码展示能力与极简专业的视觉风格，支持亮/暗双主题与响应式布局。

### 1.1 目标用户

- 关注技术分享的开发者、学生与工程师；
- 希望通过博客沉淀与检索个人技术笔记的作者本人。

### 1.2 核心价值

- **写作友好**：纯 Markdown 写作，新增文章仅需新增 `.md` 文件，无需改动代码。
- **阅读友好**：舒适排版、代码语法高亮、文章目录（TOC）。
- **检索友好**：基于标签（Tag）分类 + 全站搜索（Pagefind）。
- **零运行时**：纯静态构建，加载快、易部署、成本低。

## 2. 功能需求

### 2.1 文章列表页（首页）

- 按发布时间**倒序**展示文章卡片；
- 每张卡片包含：标题、摘要（description）、标签、发布日期；
- 卡片支持 hover 微交互（抬升 + 阴影）；
- 支持响应式网格（移动端单列、平板 2 列、桌面 3 列）。

### 2.2 文章详情页

- 基于 Content Collections 渲染 Markdown 正文；
- 支持 Frontmatter 元数据：标题、摘要、发布日期、更新日期、标签、作者；
- **代码块语法高亮**（构建期由 Shiki 完成，零运行时开销，亮/暗双主题）；
- 自动生成**文章目录（TOC）**，点击锚点平滑跳转；
- 显示文章元信息（作者 / 日期 / 标签）；
- 文末提供「上一篇 / 下一篇」导航；
- **Giscus 评论系统（可选）**：基于 GitHub Discussions，配置后启用。

### 2.3 标签分类

- **标签聚合页**（`/tags`）：列出全部标签，按文章数量排序，以胶囊（Tag Pill）呈现，并显示各标签文章数；
- **标签详情页**（`/tags/[tag]`）：展示该标签下所有文章列表（复用文章卡片）。

### 2.4 关于页面

- 独立页面（`/about`）：博主头像、简介、技术栈 / 兴趣标签、联系方式；
- 复用全局布局与导航。

### 2.5 Markdown 渲染

- 支持标准 Markdown 语法（标题、列表、引用、表格、图片、链接、代码块）；
- 支持 Frontmatter 元数据校验（zod schema）；
- 行内代码与代码块差异化样式；
- `draft: true` 的文章在构建时被排除。

### 2.6 全局能力

- **亮 / 暗双主题**：通过 `class` 策略切换，`localStorage` 持久化偏好；首屏内联脚本防止主题闪烁（FOUC）；
- **响应式布局**与移动端汉堡菜单；
- **站内搜索**：基于 Pagefind 的全文检索，构建后自动生成索引；
- **RSS 订阅**：`/rss.xml` 自动生成文章 feed；
- **SEO 增强**：Sitemap 自动生成、OG 标签、Twitter Card、JSON-LD 结构化数据、规范链接（canonical）。

## 3. 非功能需求

| 类别 | 要求 |
| --- | --- |
| 性能 | 纯静态、零运行时 JS（仅主题切换、移动菜单、搜索有少量脚本）；首屏尽可能轻量 |
| 可访问性 | 语义化 HTML、合理的对比度与可聚焦元素 |
| 兼容性 | 现代浏览器（Chrome / Edge / Firefox / Safari 近两个大版本） |
| 可维护性 | 站点配置集中于 `src/consts.ts`；布局与组件复用 |
| 可扩展性 | 新增文章仅需新增 `.md`；新增页面遵循既有布局约定 |
| 可发现性 | RSS / Sitemap / 搜索引擎友好的结构化数据 |

## 4. 页面与路由

| 路由 | 页面 | 说明 |
| --- | --- | --- |
| `/` | 首页 / 文章列表 | 文章卡片网格 |
| `/posts/[slug]` | 文章详情 | 动态路由，按 slug 渲染 + 评论 |
| `/tags` | 标签聚合 | 全部标签列表 |
| `/tags/[tag]` | 标签详情 | 单标签文章列表 |
| `/search` | 搜索页 | Pagefind 全站搜索 |
| `/about` | 关于 | 博主介绍 |
| `/rss.xml` | RSS 源 | Atom/RSS feed |

## 5. 技术架构

### 5.1 技术栈

- **框架**：Astro 5（静态站点生成，原生支持 Markdown）
- **样式**：Tailwind CSS 3（暗色模式 `class` 策略）
- **内容管理**：Astro Content Collections + zod 校验
- **语法高亮**：Shiki（构建期内联，零运行时）
- **搜索**：Pagefind（构建后索引，纯客户端）
- **RSS**：@astrojs/rss
- **Sitemap**：@astrojs/sitemap
- **评论（可选）**：Giscus（GitHub Discussions），配置后启用
- **语言**：TypeScript

### 5.2 目录结构

```
src/
├── consts.ts                # 站点级配置（站名、作者、导航、社交链接）
├── utils.ts                 # 工具函数（读取文章、标签统计）
├── styles/global.css        # 全局样式、正文排版、Shiki 双主题
├── content/
│   ├── config.ts            # 文章集合 schema（zod 校验）
│   └── posts/               # Markdown 文章（新增文章放这里）
├── layouts/BaseLayout.astro # 基础布局（HTML 骨架、SEO、OG、JSON-LD）
├── components/              # Header / Footer / PostCard / TagPill / TableOfContents / JsonLd / Giscus
└── pages/                   # 页面路由
```

### 5.3 数据流

```
Markdown 文章 → Content Collections（config.ts + zod）
            → getCollection('posts')
            → 首页列表 / 文章详情 / 标签聚合 / RSS / 搜索索引
            → Pagefind 后构建索引
            → 静态 HTML 构建产物（dist/）
```

## 6. 内容规范（作者约定）

每篇文章需在文件头部提供 Frontmatter：

```yaml
---
title: 文章标题
description: 一句话摘要，用于列表与 SEO
pubDate: 2026-07-17
updatedDate: 2026-07-18   # 可选
tags: [Astro, 前端]
author: Nianmng            # 可选，默认取站点配置
draft: false               # 可选，草稿设为 true 不发布
---
```

## 7. 部署方案

支持两种部署方式：

| 平台 | 方案 | 配置文件 |
| --- | --- | --- |
| GitHub Pages | Actions 自动构建部署 | `.github/workflows/deploy.yml` |
| Vercel | 导入仓库自动识别 | `vercel.json` |

## 8. 验收标准

- [x] 本地 `npm run dev` 可启动并访问所有页面；
- [x] `npm run build` 成功产出 `dist/` 静态文件 + Pagefind 索引；
- [x] 文章列表、详情、标签、搜索、关于、RSS 全部可用；
- [x] Markdown 正文与代码高亮正确渲染；
- [x] 亮/暗主题切换正常且刷新后保持；
- [x] Sitemap 自动生成；
- [x] JSON-LD 结构化数据正确输出；
- [x] 移动端布局正常、菜单可展开。

## 9. 后续可扩展项（非本次范围）

- 文章分页与「更多文章」；
- 国际化（i18n）；
- 图片优化（@astrojs/image）；
- 统计分析（Umami / Plausible）。

