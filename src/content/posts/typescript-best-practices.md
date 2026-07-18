---
title: 5 个让 TypeScript 代码更健壮的实践
description: 从 strict 模式到类型守卫，分享 5 个能显著提升 TypeScript 项目可维护性与安全性的实用技巧。
pubDate: 2026-07-08
tags: [测试]
author: 念铭
---

## 1. 开启 strict 模式

`strict` 会同时启用 `noImplicitAny`、`strictNullChecks` 等一系列检查。前期麻烦，后期省心。

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

## 2. 用类型守卫代替类型断言

不要随意使用 `as`，而是编写可复用的类型守卫：

```ts
function isUser(value: unknown): value is User {
  return typeof value === 'object' && value !== null && 'id' in value;
}
```

## 3. 优先使用 `type` 组合而非继承

组合往往比继承更灵活：

```ts
type Identifiable = { id: string };
type Timestamped = { createdAt: Date };
type Post = Identifiable & Timestamped & { title: string };
```

## 4. 用 `satisfies` 校验而不改变类型

`satisfies` 能在不拓宽类型的前提下做约束校验：

```ts
const routes = {
  home: '/',
  about: '/about',
} satisfies Record<string, string>;
```

## 5. 为函数返回定义明确类型

避免隐式 `any`，显式声明返回值：

```ts
function sum(a: number, b: number): number {
  return a + b;
}
```

## 小结

TypeScript 的价值在于把错误消灭在编译期。养成严格编码习惯，长期收益远大于短期的「多写几行类型」。
