---
title: Drawio 集成测试（方案 A）
description: 验证博客通过 draw.io 导出 SVG 嵌入示意图的方案 A 可行性。
pubDate: 2026-07-18
tags: [测试]
author: 念铭
draft: false
---

## 方案 A：draw.io 导出 SVG 直接嵌入

在 draw.io 中画好图后，菜单 **File → Export as → SVG**，勾选 *Include a copy of my diagram*（可选），
把生成的 `.svg` 放到 `public/` 目录，然后在 Markdown 里用普通图片语法引用即可：

```md
![流程图](/drawio-demo.svg)
```

下面是实际渲染效果：

![流程图](/drawio-demo.svg)

> 这种方式零运行时 JavaScript，加载最快；缺点是图本身是静态图片，不能在网页里再编辑。
> 若要可编辑/可缩放交互，需改用方案 B（前端加载 draw.io viewer）。
