# src/lib — 工具库

## 模块说明

### db.ts — Turso 数据库客户端

通过 `@libsql/client` 连接 Turso 云数据库。

```typescript
import db from "@/lib/db";
const result = await db.execute({ sql: "SELECT * FROM bookmarks", args: [] });
```

**数据库表结构**：

| 表名 | 字段 | 说明 |
|------|------|------|
| `bookmarks` | id, url, title, summary, tags(JSON), favicon, created_at, color, card_width | 资源收藏 |
| `ideas` | id, content, tags(JSON), created_at, color, card_width | 碎片想法 |
| `posts` | id, slug(唯一), title, content, summary, tags(JSON), date, color, card_width | 博客文章 |
| `journals` | id, slug(唯一), title, content, date, layout_width, layout_order, color, card_width | 日常记录 |

### content.ts — 内容读取

**所有函数都是 async，调用时必须 `await`**。

| 函数 | 返回类型 | 说明 |
|------|----------|------|
| `getPosts()` | `Promise<Post[]>` | 从 Turso 读取文章，按日期降序 |
| `getPostBySlug(slug)` | `Promise<Post \| undefined>` | 按 slug 查找文章 |
| `getBookmarks()` | `Promise<Bookmark[]>` | 读取收藏，按创建时间降序 |
| `getIdeas()` | `Promise<Idea[]>` | 读取想法，按创建时间降序 |
| `getJournalEntries()` | `Promise<JournalEntry[]>` | 读取日常，按日期降序 |
| `getJournalLayout()` | `Promise<JournalBlock[]>` | 读取日常布局元数据 |

**类型定义**：`Post`, `Bookmark`, `Idea`, `JournalEntry`, `JournalBlock` 均在此文件中导出。每个类型包含 `color?` 和 `cardWidth?` 字段。

### github.ts — GitHub API

| 函数 | 返回类型 | 说明 |
|------|----------|------|
| `getRepos()` | `Promise<GitHubRepo[]>` | GitHub REST API 获取仓库（1h 缓存） |
| `getContributions()` | `Promise<ContributionDay[]>` | GitHub GraphQL API 获取贡献数据 |

**环境变量**：`GITHUB_USERNAME` + `GITHUB_TOKEN`（从 `.env.local` 读取）
**Fallback**：API 失败时自动返回示例数据。

### colors.ts — 卡片颜色映射

8 色色板 + 标签 hash 自动分配 + 手动覆盖。

| 函数 | 说明 |
|------|------|
| `getCardColor(color?, tags?)` | 获取卡片颜色（手动 > 标签映射 > 默认蓝） |
| `getCardWidthClass(width?)` | 获取卡片宽度 Tailwind 类名 |

### utils.ts — 通用工具

shadcn/ui 的 `cn()` class 合并工具。
