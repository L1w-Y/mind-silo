# AGENTS.md — AI Agent 索引文档

> AI Agent 必读: 本项目文档采用分层知识体系。请根据你的需求层级阅读，不要试图从文档中获取代码级的实现细节——代码才是唯一的真理。

## Project Overview

**Purpose**: Mind Silo（思维仓）— 个人知识管理网站，随时随地管理想法、收藏与代码。通过 OpenClaw 机器人或网页直接编辑，将碎片内容自动分拣入库。

**Key Characteristics**:
- **Neo-Brutalism 设计风格**：粗黑边框 + 硬阴影 + 彩色标签 + 每页独立背景色
- **Bento Grid 首页**：GitHub(2/3) + 想法(1/3) + 文章(2/3) + 收藏(1/3)
- **瀑布流布局**：想法和日常页使用 CSS `columns` 瀑布流
- **Scroll Snap**：CSS `snap-y snap-mandatory`，页面滚动自动吸附
- **Turso 数据库**：内容存储在云端 libSQL，读写实时生效
- **Vercel 部署**：push main 自动部署

**Tech Stack**:
- **Framework**: Next.js 16 (App Router), React 19, TypeScript 5.x
- **Styling**: Tailwind CSS 4, lucide-react icons
- **Database**: Turso (@libsql/client), libSQL
- **Deploy**: Vercel (auto-deploy on push)
- **Theme**: next-themes (dark/light toggle)
- **Code Highlight**: Shiki

---

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

---

## Directory Structure

| 路径 | 说明 |
|------|------|
| `src/app/` | Next.js App Router 入口（页面、API、样式） |
| `src/components/` | React 组件（通用 UI + sections 页面模块） |
| `src/lib/` | 工具库（数据库、内容读取、GitHub API、颜色映射） |
| `src/scripts/` | 数据库初始化脚本 |
| `docs/` | 项目文档（设计方案、实施计划） |
| `v0_design_plan/` | v0 设计参考源文件（不部署） |
| `content/` | 历史 MDX 文件（已迁移到数据库，仅保留参考） |
| `data/` | 历史 JSON 文件（已迁移到数据库，仅保留参考） |

---

## 文档索引 (Documentation Index)

### 设计规范
- **[DESIGN.md](DESIGN.md)** — Notion 风格设计系统参考（色板、排版、组件样式）
- **[v0_design_plan/](v0_design_plan/)** — v0.dev 生成的 Neo-Brutalism 设计原型

### 开发规范
- **[src/app/README.md](src/app/README.md)** — App Router 入口、API 接口规范
- **[src/components/README.md](src/components/README.md)** — 组件清单、Server/Client 分离规范
- **[src/lib/README.md](src/lib/README.md)** — 工具库函数清单、数据库架构

### 设计方案
- **[docs/plans/](docs/plans/)** — 历史设计方案和实施计划

### 修改特定内容时的联动要求
- 新增/修改组件 → 更新 `src/components/README.md`
- 新增/修改工具函数 → 更新 `src/lib/README.md`
- 修改 API 接口 → 更新 `src/app/README.md`
- 修改数据库表结构 → 更新 `src/lib/README.md` + 运行 `init-db.ts`
- 修改设计风格 → 更新 `DESIGN.md`

---

## 关键架构约定

### 设计风格（Neo-Brutalism）
- 粗边框：`border-3 border-black`
- 硬阴影：`shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`
- 页面背景色：首页 `#E8F4FD` / 博客 `#FFF5F5` / 收藏 `#F0F9FF` / 想法 `#FFFBEB` / 日常 `#F0FDF4`
- 彩色标签：每个标签有对应的 Tailwind 颜色类
- lucide-react 图标（注：GitHub logo 用自定义 SVG，lucide 不含）

### 数据流
```
Turso 数据库 ← src/lib/db.ts ← src/lib/content.ts ← Server Components
                                                    ↑
                                          /api/collect (写入)
```
- 所有内容数据存储在 Turso（bookmarks、ideas、posts、journals 四张表）
- `content.ts` 中所有函数都是 **async**，调用时必须 `await`
- Server Component 获取数据 → 传给同名 Client Component 渲染

### 页面滚动
- `page.tsx` 使用 `snap-y snap-mandatory h-screen overflow-y-scroll`
- 每个 section 用 `snap-start snap-always` 包裹
- 侧边栏 `FloatingNav` 用 IntersectionObserver 同步高亮

### API
- `POST /api/collect` — 接收 `{ type, content, tags?, title?, summary? }` 写入 Turso 数据库
  - type: `bookmark` | `idea` | `post` | `journal`
  - 鉴权：Bearer Token（通过 `COLLECT_API_TOKEN` 环境变量配置）

---

## 开发命令

```bash
npm run dev                          # 启动开发服务器
npm run build                        # 生产构建
npm run lint                         # ESLint 检查
npx tsx src/scripts/init-db.ts       # 初始化数据库（建表+迁移）
```
