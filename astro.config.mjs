// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// 部署时请将 site 改为你的正式域名
const SITE = 'https://nianmng.example.com';

// CI 环境下强制校验：若仍为占位域名则阻断部署，避免全站绝对链接（canonical/OG/RSS/sitemap）错误
if (process.env.CI && SITE.includes('example.com')) {
  throw new Error(
    '[astro.config] site 仍为占位域名 example.com，请在部署前修改为正式域名。'
  );
}

export default defineConfig({
  site: SITE,
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('/search'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  markdown: {
    shikiConfig: {
      // 同时输出亮色与暗色主题，由 CSS 变量切换
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
  },
});
