# src/app — Next.js App Router 入口

## 文件说明

| 文件 | 说明 |
|------|------|
| `layout.tsx` | 根布局：Geist 字体加载 + ThemeProvider 包装 |
| `page.tsx` | 主页面：scroll-snap 容器 + FloatingNav + ThemeToggle + 5 个 section |
| `providers.tsx` | 客户端 Provider：next-themes ThemeProvider |
| `globals.css` | 全局样式：Neo-Brutalism 设计系统、CSS 变量、scroll-snap、Shiki 主题 |
| `favicon.ico` | 网站图标 |

## 页面结构

```
<main snap-y snap-mandatory h-screen>
  <FloatingNav />        <!-- 固定侧边导航 -->
  <ThemeToggle />        <!-- 固定主题切换 -->
  <HomeSection />        <!-- snap-start -->
  <BlogSection />        <!-- snap-start -->
  <BookmarksSection />   <!-- snap-start -->
  <IdeasSection />       <!-- snap-start -->
  <JournalSection />     <!-- snap-start -->
</main>
```

## API Routes

### POST /api/collect

内容写入接口（OpenClaw / 外部调用），**直接写入 Turso 数据库**。

**请求体**：
```json
{
  "type": "bookmark | idea | post | journal",
  "content": "内容正文或 URL",
  "tags": ["可选标签"],
  "title": "可选标题",
  "summary": "可选摘要"
}
```

**认证**：`Authorization: Bearer <COLLECT_API_TOKEN>`

**行为**：
- `bookmark` → INSERT INTO bookmarks
- `idea` → INSERT INTO ideas
- `post` → INSERT INTO posts
- `journal` → INSERT INTO journals（每条独立记录）

### GET /api/meta

元数据接口，返回当前系统状态（供 OpenClaw 感知）。

**无需认证**，返回 JSON：
- `tags` — 各表已有标签列表
- `counts` — 各表数据量统计
- `schema` — 表结构及字段说明
- `collectAPI` — 写入 API 的请求格式
