// 站点级配置：新增页面或修改信息时，集中在此维护即可。
export const SITE_TITLE = '念铭的技术博客';
export const SITE_DESCRIPTION =
  '一个专注于编程、开发与工具分享的个人技术博客。记录学习过程中的思考与实践。';
export const AUTHOR = {
  name: '念铭',
  avatar: '/avatar.svg',
  bio: '全栈开发者，喜欢折腾前端工程化、DevOps 与各种效率工具。',
  email: 'hello@nianmng.example.com',
  github: 'https://github.com/nianmng',
  twitter: 'https://twitter.com/nianmng',
};

// 顶部导航链接（about 单独维护在 /about）
export const NAV_LINKS = [
  { href: '/', label: '首页' },
  { href: '/tags', label: '标签' },
  { href: '/search', label: '搜索' },
  { href: '/about', label: '关于' },
];

// 社交链接（显示在页脚）
export const SOCIAL_LINKS = [
  { href: AUTHOR.github, label: 'GitHub' },
  { href: AUTHOR.twitter, label: 'Twitter' },
  { href: `mailto:${AUTHOR.email}`, label: 'Email' },
];

// 评论系统（可选）：填写真实配置后取消下方注释即可启用 Giscus
// 详见 https://giscus.app —— 需先在 GitHub 仓库开启 Discussions 并安装 Giscus App
// export const GISCUS = {
//   repo: 'owner/repo',
//   repoId: 'REPO_ID',
//   category: 'Announcements',
//   categoryId: 'CATEGORY_ID',
// };
export const GISCUS:
  | { repo: string; repoId: string; category: string; categoryId: string }
  | undefined = undefined;
