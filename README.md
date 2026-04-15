# Mind Silo

> 思维仓 — 随时随地管理你的想法、收藏与代码

个人知识管理网站，基于 Next.js 16 + TypeScript + Tailwind CSS v4，采用 Neo-Brutalism 设计风格。

## 预览

- 线上地址：[https://xxxlite.vercel.app](https://xxxlite.vercel.app/)

## 功能

- 🏠 **首页** — Bento Grid 布局
- 💻 **GitHub** — 真实贡献热力图 + 仓库卡片 3×2 网格
- 📝 **博客** — 文章列表，彩色标签，搜索，阅读面板
- 🔖 **收藏** — 分类筛选 + 搜索，卡片网格
- 💡 **想法** — 瀑布流，彩色标签
- 📔 **日常** — 瀑布流，多种内容块
- 🤖 **API** — OpenClaw webhook 自动分类入库

## 技术栈

| 技术 | 用途 |
|------|------|
| Next.js 16 (App Router) | 框架 |
| React 19 | UI |
| TypeScript 5.x | 类型安全 |
| Tailwind CSS 4 | 样式 |
| Turso (libSQL) | 数据库（9GB 免费） |
| lucide-react | 图标 |
| next-themes | 暗/亮主题 |
| Shiki | 代码高亮 |

## 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/L1w-Y/mind-silo.git
cd mind-silo
npm install
```

### 2. 配置环境变量

```bash
cp .env.example .env.local
```

编辑 `.env.local`：

| 变量 | 必需 | 说明 |
|------|------|------|
| `GITHUB_USERNAME` | ✅ | GitHub 用户名 |
| `GITHUB_TOKEN` | ✅ | GitHub Token（`read:user` 权限） |
| `TURSO_DATABASE_URL` | ✅ | Turso 数据库地址 |
| `TURSO_AUTH_TOKEN` | ✅ | Turso Token |
| `COLLECT_API_TOKEN` | 可选 | API 鉴权 Token |

### 3. 初始化数据库

```bash
npx tsx src/scripts/init-db.ts
```

### 4. 启动

```bash
npm run dev
```

## 部署

Vercel 自动部署。环境变量在 Vercel Settings → Environment Variables 配置。

## License

MIT
