# src/app — Next.js App Router 入口

## 文件说明

| 文件 | 说明 |
|------|------|
| `layout.tsx` | 根布局：Geist 字体加载 + ThemeProvider 包装 + HTML lang/suppressHydrationWarning |
| `page.tsx` | 主页面：组合 FloatingNav + ThemeToggle + 五大 section 模块 |
| `providers.tsx` | 客户端 Provider：next-themes 的 ThemeProvider（`attribute="class"`） |
| `globals.css` | 全局样式：Tailwind 导入 + 设计 token + 暗/亮主题变量 + Shiki 代码主题 + 滚动条 |
| `favicon.ico` | 网站图标 |

## API Routes

### POST /api/collect

OpenClaw 机器人 webhook 接口。

**请求体**：
```json
{
  "type": "bookmark | idea | post | journal",
  "content": "内容正文或 URL",
  "tags": ["可选标签"],
  "title": "可选标题",
  "layout": { "width": "full | half | third", "order": 0 }
}
```

**认证**：通过 `Authorization: Bearer <token>` 头认证，token 配置在环境变量 `COLLECT_API_TOKEN`。

**行为**：
- `bookmark` → 追加到 `data/bookmarks.json`
- `idea` → 追加到 `data/ideas.json`
- `post` → 创建 `content/posts/<slug>.mdx`
- `journal` → 创建或追加 `content/journal/<date>.mdx` + 更新 `data/journal-layout.json`
