---
title: Tailwind CSS 暗色模式的三种实现策略
description: 深入对比 Tailwind 中基于 class、media 与系统偏好的暗色模式方案，并给出防闪烁（FOUC）的最佳实践。
pubDate: 2026-07-12
tags: [Tailwind CSS, 前端, CSS]
author: Nianmng
---

## 暗色模式的常见策略

Tailwind 内置了三种暗色模式策略，通过 `darkMode` 配置切换：

| 策略 | 配置 | 触发方式 |
| --- | --- | --- |
| 跟随系统 | `media` | 根据 `prefers-color-scheme` |
| 手动切换 | `class` | 在 `<html>` 上添加 `dark` 类 |
| 选择器 | `selector` | 通过自定义 CSS 选择器 |

本项目使用的是 **`class` 策略**，因为它允许用户在亮/暗之间自由切换。

## 防止主题闪烁

如果在加载完成后再用 JS 设置主题，用户会先看到亮色再闪成暗色。解决办法是**在 `<head>` 内联一段同步脚本**：

```html
<script is:inline>
  const stored = localStorage.getItem('theme');
  if (stored === 'dark') document.documentElement.classList.add('dark');
</script>
```

## 双主题语法高亮

借助 Shiki 可以同时输出亮/暗两套配色，再由 CSS 变量切换：

```css
html.dark .astro-code,
html.dark .astro-code span {
  color: var(--shiki-dark) !important;
}
```

## 小结

合理的暗色模式不仅要「能切换」，更要「切换得不突兀」。内联脚本 + `class` 策略是目前最稳妥的组合。
