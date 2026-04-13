# content — 内容目录

## 结构

```
content/
├── posts/       # 博客文章（MDX 格式）
└── journal/     # 日常记录（MDX 格式）
```

## 博客文章 (`posts/`)

每篇文章为一个 `.mdx` 文件，必须包含以下 frontmatter：

```yaml
---
title: "文章标题"
date: "YYYY-MM-DD"
tags: ["标签1", "标签2"]
summary: "文章摘要"
---
```

正文使用标准 Markdown 语法，支持代码块高亮（Shiki）。

**文件名即 slug**：`hello-world.mdx` → slug 为 `hello-world`。

## 日常记录 (`journal/`)

每条记录为一个 `.mdx` 文件，推荐以日期命名：

```yaml
---
title: "2026年4月13日"
date: "2026-04-13"
---
```

布局元数据存储在 `data/journal-layout.json`，控制每个块的宽度和排序。
