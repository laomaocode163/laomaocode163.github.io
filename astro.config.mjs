// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// 部署时请将 site 改为你的正式域名
export default defineConfig({
  site: 'https://nianmng.example.com',
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
