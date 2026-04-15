# content — 历史内容目录

> ⚠️ **注意**：此目录中的 MDX 文件为历史内容，**已迁移到 Turso 数据库**。
> 
> 当前项目通过 `src/lib/content.ts` 从数据库读取内容，不再依赖这些文件。
> 保留仅供参考和数据库初始化脚本（`src/scripts/init-db.ts`）使用。

## 结构

```
content/
├── posts/       # 博客文章（MDX）→ 已迁移到 posts 表
└── journal/     # 日常记录（MDX）→ 已迁移到 journals 表
```

## MDX Frontmatter 格式（参考）

```yaml
---
title: "文章标题"
date: "YYYY-MM-DD"
tags: ["标签1", "标签2"]
summary: "文章摘要"
---
```
