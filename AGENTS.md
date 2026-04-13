# AGENTS.md — AI Agent 索引文档

## ⚠️ 环境变量（首次开发必读）

本项目依赖以下环境变量，存储在 `.env.local`（不在 Git 中）。

**如果 `.env.local` 不存在，必须先让用户提供以下信息：**

| 变量 | 必需 | 用途 | 获取方式 |
|------|------|------|---------|
| `GITHUB_USERNAME` | ✅ | GitHub 用户名 | 问用户 |
| `GITHUB_TOKEN` | ✅ | GitHub API Token | https://github.com/settings/tokens |
| `TURSO_DATABASE_URL` | ✅ | Turso 数据库地址 | `turso db show <name> --url` |
| `TURSO_AUTH_TOKEN` | ✅ | Turso 认证 Token | `turso db tokens create <name>` |
| `COLLECT_API_TOKEN` | 可选 | /api/collect 鉴权 | 用户自定义 |

**操作步骤**：
1. `cp .env.example .env.local`
2. 让用户填入真实值
3. 如果数据库是新建的，运行 `npx tsx src/scripts/init-db.ts` 建表

## 项目概览

基于 **Next.js 16 + TypeScript + Tailwind CSS v4** 的个人知识管理网站（Mind Silo），采用 Craft.do 风格设计。

**核心功能**：技术博客、日常记录、资源收藏、碎片想法、GitHub 活动展示。

**数据存储**：Turso（libSQL 云数据库），通过 `src/lib/db.ts` 连接，`src/lib/content.ts` 读取。

**部署**：Vercel，推送 main 分支自动部署。

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 16 (App Router) | 框架 |
| React | 19 | UI 库 |
| TypeScript | 5.x | 类型安全 |
| Tailwind CSS | 4 | 样式 |
| Turso (@libsql/client) | - | 云数据库 |
| next-themes | - | 暗/亮主题切换 |
| Shiki | - | 代码高亮 |
| @dnd-kit | - | 拖拽排序 |
| GlassSurface (ReactBits) | - | 玻璃折射特效 |

## 目录结构

```
mind-silo/
├── .env.example            # 环境变量模板（必看）
├── src/
│   ├── app/
│   │   ├── api/collect/    # OpenClaw webhook API（写入 Turso）
│   │   ├── globals.css     # 全局样式 + 设计 token
│   │   ├── layout.tsx      # 根布局
│   │   └── page.tsx        # 主页面
│   ├── components/
│   │   ├── sections/       # 五大模块区块组件
│   │   ├── GlassSurface.*  # 玻璃折射特效（ReactBits）
│   │   ├── FloatingNav.tsx  # 侧边导航
│   │   └── ...
│   ├── lib/
│   │   ├── db.ts           # Turso 数据库客户端
│   │   ├── content.ts      # 内容读取（async，从数据库）
│   │   └── github.ts       # GitHub API
│   └── scripts/
│       └── init-db.ts      # 数据库初始化 + 数据迁移
├── content/                # 历史 MDX 文件（已迁移到数据库）
└── data/                   # 历史 JSON 文件（已迁移到数据库）
```

## 关键架构约定

### 数据流

```
Turso 数据库 ← src/lib/db.ts ← src/lib/content.ts ← Server Components
                                                    ↑
                                          /api/collect (写入)
```

- **所有内容数据** 存储在 Turso 数据库中（bookmarks、ideas、posts、journals 四张表）
- `content.ts` 中所有函数都是 **async**，调用时必须 `await`
- `/api/collect` 直接写入数据库，实时生效

### Server / Client 组件分离

- **Server Components**（默认，async）：`HomeSection`、`BlogSection`、`BookmarksSection`、`JournalSection`、`IdeasSection`
- **Client Components**（`"use client"`）：`*Client.tsx`、`FloatingNav`、`ThemeToggle`、`ContributionGrid`、`RepoCarousel`、`GlassSurface`

### 设计风格

- Craft.do 风格天空渐变背景 + 毛玻璃卡片
- 外层留白 + 圆角 content-shell 容器
- 侧边栏 GlassSurface 玻璃折射高亮
- 设计 token 在 `globals.css` 的 CSS 变量中

### API

- `POST /api/collect` — 接收 `{ type, content, tags?, title?, summary? }` 写入数据库
  - type: `bookmark` | `idea` | `post` | `journal`
  - 鉴权：Bearer Token（通过 `COLLECT_API_TOKEN` 环境变量配置）

## 开发命令

```bash
npm run dev      # 启动开发服务器（Turbopack）
npm run build    # 生产构建
npm run start    # 启动生产服务器
npm run lint     # ESLint 检查
npx tsx src/scripts/init-db.ts  # 初始化数据库
```
