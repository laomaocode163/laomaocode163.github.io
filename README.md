# Nianmng 的技术博客

一个基于 [Astro](https://astro.build) + Tailwind CSS 构建的**静态个人技术博客**，支持 Markdown 写作、代码语法高亮、标签分类、暗色模式、站内搜索、RSS 订阅、评论系统与响应式布局。

## ✨ 功能特性

- 📝 **文章列表**：首页按时间倒序展示文章卡片（标题 / 摘要 / 标签 / 日期）
- 📖 **文章详情**：Markdown 渲染、代码语法高亮（亮/暗双主题）、文章目录（TOC）、上一篇/下一篇
- 🏷️ **标签分类**：标签聚合页 + 标签详情页，按标签检索文章
- 🔍 **站内搜索**：基于 [Pagefind](https://pagefind.app) 的全站搜索，构建后自动生成索引
- 📡 **RSS 订阅**：`/rss.xml` 自动生成，支持 RSS 阅读器订阅
- 💬 **评论系统（可选）**：内置 [Giscus](https://giscus.app) 组件（基于 GitHub Discussions），在 `consts.ts` 配置 `GISCUS` 后启用
- 👤 **关于页面**：独立的博主介绍页
- 🌗 **暗色模式**：亮/暗主题一键切换，偏好持久化 + 系统跟随（防闪烁）
- 🔎 **SEO 优化**：Sitemap 自动生成、OG 标签、Twitter Card、JSON-LD 结构化数据、规范链接
- 📱 **响应式**：移动端汉堡菜单，桌面多列网格

## 🧱 技术栈

| 类别 | 技术 |
| --- | --- |
| 框架 | Astro 5 |
| 样式 | Tailwind CSS 3 |
| 内容 | Astro Content Collections + zod |
| 代码高亮 | Shiki（构建期内联） |
| 搜索 | Pagefind（构建后索引） |
| RSS | @astrojs/rss |
| Sitemap | @astrojs/sitemap |
| 评论 | Giscus（GitHub Discussions） |
| 语言 | TypeScript |

## 🚀 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器（默认 http://localhost:4321）
npm run dev

# 类型检查
npm run check

# 生产构建（产物输出到 dist/，含 Pagefind 索引）
npm run build

# 本地预览构建产物
npm run preview
```

## ✍️ 写新文章

在 `src/content/posts/` 目录下新建一个 `.md` 文件，填写 Frontmatter 即可：

```markdown
---
title: 我的第一篇文章
description: 一句话摘要
pubDate: 2026-07-17
tags: [Astro, 前端]
author: Nianmng
draft: false
---

正文从这里开始，支持标准 Markdown 语法……
```

> 提示：`draft: true` 的文章不会被构建发布。

## 📁 目录结构

```
src/
├── consts.ts                # 站点配置（站名、作者、导航、社交链接）
├── utils.ts                 # 工具函数（读取文章、标签统计）
├── styles/global.css        # 全局样式与排版
├── content/
│   ├── config.ts            # 文章 schema 校验
│   └── posts/               # 你的 Markdown 文章
├── layouts/BaseLayout.astro # 基础布局（SEO / OG / JSON-LD）
├── components/              # 组件目录
│   ├── Header.astro         # 导航栏 + 主题切换
│   ├── Footer.astro         # 页脚
│   ├── PostCard.astro       # 文章卡片
│   ├── TagPill.astro        # 标签胶囊
│   ├── TableOfContents.astro # 文章目录
│   ├── JsonLd.astro         # 结构化数据
│   └── Giscus.astro         # 评论组件
├── pages/                   # 页面与路由
│   ├── index.astro          # 首页
│   ├── posts/[...slug].astro # 文章详情
│   ├── tags/index.astro     # 标签聚合
│   ├── tags/[tag].astro     # 标签详情
│   ├── search.astro         # 搜索页
│   ├── about.astro          # 关于页
│   └── rss.xml.js           # RSS 订阅源
├── .github/workflows/       # CI/CD 部署
│   └── deploy.yml           # GitHub Pages Actions
```

## ⚙️ 自定义

- 修改站点名、作者、导航：编辑 `src/consts.ts`
- 修改主题色 / 字体：编辑 `tailwind.config.mjs`
- 修改正式域名：编辑 `astro.config.mjs` 中的 `site`
- 配置 Giscus 评论（可选）：在 `src/consts.ts` 中填写并启用 `GISCUS`（repo / repoId / category / categoryId），默认未启用

## 📡 RSS 订阅

部署后访问 `https://你的域名/rss.xml` 即可订阅。

## 📄 需求文档

完整需求说明见 [`docs/requirements.md`](./docs/requirements.md)。

## 📦 部署

支持多种部署方式，选择最适合你的：

### GitHub Pages

推送 `main`/`master` 分支后自动触发。需在仓库 Settings → Pages 中启用 GitHub Actions。

配置文件：`.github/workflows/deploy.yml`

### Vercel

导入仓库后自动识别 Astro 项目，或使用 `vercel.json` 配置。

一键部署：[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Cloudflare Pages

**方式一（Dashboard）**：在 Cloudflare Pages 中连接 GitHub 仓库，构建设置：
- 构建命令：`npm run build`
- 输出目录：`dist`
- Node.js 版本：20

**方式二（CLI）**：使用 Wrangler CLI 部署
```bash
npm install -g wrangler
wrangler login
npx wrangler pages deploy dist --project-name=nianmng-blog
```

配置文件：`wrangler.toml`

### EdgeOne Pages

在 EdgeOne Pages 控制台中导入 GitHub 仓库，自动识别 Astro 框架。

配置文件：`edgeone.json`
