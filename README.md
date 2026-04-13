# Mind Silo

> 思维仓 — 随时随地管理你的想法、收藏与代码

个人知识管理网站，基于 Next.js 16 + TypeScript + Tailwind CSS v4，采用 Craft.do 风格的 Apple 式极简设计。

## 预览

- 线上地址：[mind-silo.vercel.app](https://mind-silo.vercel.app)

## 功能

- 🏠 **首页** — 天空渐变背景 + Bento 悬浮卡片布局
- 💻 **GitHub** — 真实贡献热力图 + 项目展示
- 📝 **博客** — MDX 文章，代码高亮（Shiki）
- 📔 **日常** — Notion 风格块编辑器，拖拽排序
- 🔖 **收藏** — 网页资源收藏，标签筛选
- 💡 **想法** — 碎片灵感记录
- 🤖 **API** — OpenClaw webhook 自动分类入库

## 技术栈

| 技术 | 用途 |
|------|------|
| Next.js 16 (App Router) | 框架 |
| React 19 | UI |
| TypeScript 5.x | 类型安全 |
| Tailwind CSS 4 | 样式 |
| Turso (libSQL) | 数据库 |
| next-themes | 暗/亮主题 |
| Shiki | 代码高亮 |
| @dnd-kit | 拖拽排序 |
| GlassSurface (ReactBits) | 玻璃折射特效 |

## 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/L1w-Y/mind-silo.git
cd mind-silo
npm install
```

### 2. 配置环境变量

复制模板文件并填入你的密钥：

```bash
cp .env.example .env.local
```

然后编辑 `.env.local`，填入以下变量（详见 `.env.example` 中的说明）：

| 变量 | 必需 | 说明 |
|------|------|------|
| `GITHUB_USERNAME` | ✅ | 你的 GitHub 用户名 |
| `GITHUB_TOKEN` | ✅ | GitHub Personal Access Token（需 `read:user` 权限） |
| `TURSO_DATABASE_URL` | ✅ | Turso 数据库连接地址 |
| `TURSO_AUTH_TOKEN` | ✅ | Turso 认证 Token |
| `COLLECT_API_TOKEN` | 可选 | /api/collect 接口的鉴权 Token |

### 3. 初始化数据库

首次使用需要建表：

```bash
npx tsx src/scripts/init-db.ts
```

### 4. 启动开发

```bash
npm run dev
```

## 部署

项目部署在 [Vercel](https://vercel.com)，推送到 `main` 分支自动部署。

**Vercel 环境变量**需要在 Settings → Environment Variables 中配置与 `.env.local` 相同的变量。

## 项目结构

```
mind-silo/
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── api/collect/    # OpenClaw webhook API（写入 Turso）
│   │   ├── globals.css     # 全局样式 + 设计 token
│   │   ├── layout.tsx      # 根布局
│   │   └── page.tsx        # 主页面
│   ├── components/         # React 组件
│   │   ├── sections/       # 五大模块区块组件
│   │   ├── GlassSurface.*  # 玻璃折射特效组件
│   │   ├── FloatingNav.tsx  # 侧边导航（GlassSurface 高亮）
│   │   └── ...
│   ├── lib/
│   │   ├── db.ts           # Turso 数据库客户端
│   │   ├── content.ts      # 内容读取（从数据库）
│   │   └── github.ts       # GitHub API
│   └── scripts/
│       └── init-db.ts      # 数据库初始化脚本
├── .env.example            # 环境变量模板
└── ...
```

## License

MIT
