# AGENTS.md — AI Agent 索引文档

## 项目概览

这是一个基于 **Next.js 16 + TypeScript + Tailwind CSS v4** 的个人网站，采用 Craft.do 风格的 Apple 式极简设计。

**核心功能**：技术博客、日常记录（Notion 风格块编辑器）、资源收藏、碎片想法、GitHub 活动展示。

**架构**：单页长滚动，五大模块纵向排列，左侧悬浮胶囊导航同步高亮，暗/亮主题切换。

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 16 (App Router) | 框架 |
| React | 19 | UI 库 |
| TypeScript | 5.x | 类型安全 |
| Tailwind CSS | 4 | 样式（`@import "tailwindcss"` 语法） |
| next-themes | - | 暗/亮主题切换 |
| Shiki | - | 代码高亮 |
| @dnd-kit | - | 拖拽排序（日常块编辑器） |
| gray-matter | - | MDX frontmatter 解析 |
| reading-time | - | 阅读时间估算 |

## 目录结构

```
blog/
├── content/                # 内容文件（MDX）
│   ├── posts/              # 博客文章
│   └── journal/            # 日常记录
├── data/                   # 数据文件（JSON）
│   ├── bookmarks.json      # 资源收藏
│   ├── ideas.json          # 碎片想法
│   └── journal-layout.json # 日常块布局元数据
├── plans/                  # 设计与实现文档
├── public/                 # 静态资源
└── src/
    ├── app/                # Next.js App Router 入口
    │   ├── api/collect/    # OpenClaw webhook API
    │   ├── globals.css     # 全局样式 + 设计 token
    │   ├── layout.tsx      # 根布局（字体 + ThemeProvider）
    │   ├── page.tsx        # 主页面（五大模块组合）
    │   └── providers.tsx   # 客户端 Provider 包装
    ├── components/         # React 组件
    │   ├── sections/       # 五大模块区块组件
    │   └── *.tsx           # 通用 UI 组件
    └── lib/                # 工具库
        ├── content.ts      # 内容读取（MDX/JSON 解析）
        └── github.ts       # GitHub API 数据获取
```

## 关键架构约定

### Server / Client 组件分离

本项目严格遵循 Next.js App Router 的 Server/Client 组件模式：

- **Server Components**（默认）：`sections/*.tsx`（无 Client 后缀的）、`HomeSection`、`BlogSection`、`BookmarksSection`、`JournalSection`、`IdeasSection`
- **Client Components**（`"use client"`）：`*Client.tsx`、`FloatingNav`、`ThemeToggle`、`ReadingPanel`、`SearchBar`、`BlockEditor`、`Block`、`TagFilter`、`ContributionGrid`

模式：Server Component 读取数据 → 传递给同名 Client Component 渲染交互。

### 设计 Token

所有设计变量定义在 `src/app/globals.css` 的 CSS 变量中：

- `--background`, `--foreground` — 基础色
- `--card`, `--card-foreground` — 卡片色
- `--muted`, `--muted-foreground` — 次要色
- `--accent`, `--accent-foreground` — 强调色
- `--glass`, `--glass-border` — 毛玻璃效果
- `--shadow-soft`, `--shadow-card`, `--shadow-float` — 三级阴影
- `--contrib-0` ~ `--contrib-4` — GitHub 贡献网格色

暗色主题通过 `.dark` 类切换全套变量。

### 内容管理

- **博客文章**：`content/posts/*.mdx`，frontmatter 包含 `title`, `date`, `tags`, `summary`
- **日常记录**：`content/journal/*.mdx`，布局元数据在 `data/journal-layout.json`
- **收藏**：`data/bookmarks.json`，字段：`id`, `url`, `title`, `summary`, `tags`, `favicon`, `createdAt`
- **想法**：`data/ideas.json`，字段：`id`, `content`, `tags`, `createdAt`

### API

- `POST /api/collect` — OpenClaw 机器人 webhook，接收 `{ type, content, tags?, title?, layout? }` 自动分类写入对应文件

## 开发命令

```bash
npm run dev      # 启动开发服务器（Turbopack）
npm run build    # 生产构建
npm run start    # 启动生产服务器
npm run lint     # ESLint 检查
```

## 编辑指南

- 修改样式变量 → `src/app/globals.css`
- 添加新模块 → 创建 `src/components/sections/XxxSection.tsx` + 在 `page.tsx` 中注册 section + 在 `FloatingNav.tsx` 中添加导航项
- 添加内容 → 直接创建 MDX 文件或编辑 JSON 文件
- 修改 GitHub 用户名 → `src/lib/github.ts` 中的 `GITHUB_USERNAME`
