# Personal Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 在 `/data/workspace/blog` 下搭建一个 Craft 风格的个人网站，包含首页、博客、日常、收藏、想法五大模块，左侧悬浮胶囊导航，暗/亮主题切换，博客侧边阅读面板。

**Architecture:** Next.js App Router 单页长滚动架构，所有模块纵向排列，左侧固定悬浮导航同步高亮。内容数据通过 MDX 文件和 JSON 文件管理，Vercel 部署，API Route 作为 OpenClaw webhook。

**Tech Stack:** Next.js 15, React 19, Tailwind CSS 4, next-themes, MDX, Shiki, Flexsearch, @dnd-kit (拖拽)

---

### Task 1: 项目初始化与基础配置

**Files:**
- Create: `blog/` (Next.js 项目)
- Create: `blog/tailwind.config.ts`
- Create: `blog/src/app/layout.tsx`
- Create: `blog/src/app/page.tsx`
- Create: `blog/src/app/globals.css`

**Step 1: 创建 Next.js 项目**

```bash
cd /data/workspace/blog
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

**Step 2: 安装核心依赖**

```bash
cd /data/workspace/blog
npm install next-themes @next/mdx @mdx-js/loader @mdx-js/react rehype-slug rehype-autolink-headings remark-gfm shiki flexsearch gray-matter reading-time
npm install -D @types/flexsearch
```

**Step 3: 配置 Tailwind 自定义主题**

在 `tailwind.config.ts` 中添加 Craft 风格的设计 token：
- 大圆角 (rounded-2xl = 16px)
- 柔和阴影 (shadow-soft)
- 自定义字体
- 暗/亮色变量

**Step 4: 配置 next-themes**

修改 `src/app/layout.tsx`：
- 包裹 `<ThemeProvider attribute="class" defaultTheme="system">`
- 设置基础字体和全局样式

**Step 5: 验证项目启动**

```bash
cd /data/workspace/blog && npm run dev
```
Expected: 项目在 localhost:3000 正常启动

**Step 6: Commit**

```bash
git add . && git commit -m "feat: init next.js project with tailwind and next-themes"
```

---

### Task 2: 左侧悬浮胶囊导航

**Files:**
- Create: `blog/src/components/FloatingNav.tsx`
- Modify: `blog/src/app/page.tsx`

**Step 1: 创建 FloatingNav 组件**

创建 `blog/src/components/FloatingNav.tsx`：
- 固定定位 (`fixed left-6 top-1/2 -translate-y-1/2`)
- 竖排胶囊容器，大圆角 + 柔和阴影 + 毛玻璃背景
- 五个导航项：首页、博客、日常、收藏、想法
- Hover 时高亮背景跟随滑块动画 (用 `motion` 的 `layoutId` 或 CSS transition)
- 点击导航项平滑滚动到对应 section
- 使用 IntersectionObserver 监听各 section，滚动时自动同步高亮

**Step 2: 在 page.tsx 中添加五个 section 占位**

```tsx
<main>
  <section id="home">首页</section>
  <section id="blog">博客</section>
  <section id="journal">日常</section>
  <section id="bookmarks">收藏</section>
  <section id="ideas">想法</section>
</main>
<FloatingNav />
```

**Step 3: 验证导航功能**

- 点击导航项能平滑滚动到对应 section
- 滚动页面时导航高亮自动切换
- Hover 高亮跟随动画流畅

**Step 4: Commit**

```bash
git add . && git commit -m "feat: add floating capsule navigation with scroll sync"
```

---

### Task 3: 右上角主题切换按钮

**Files:**
- Create: `blog/src/components/ThemeToggle.tsx`
- Modify: `blog/src/app/page.tsx`

**Step 1: 创建 ThemeToggle 组件**

创建 `blog/src/components/ThemeToggle.tsx`：
- 固定定位右上角 (`fixed top-6 right-6`)
- 圆润胶囊外观，与导航同风格（大圆角、柔和阴影、毛玻璃背景）
- 太阳/月亮图标切换，带旋转过渡动画
- 使用 next-themes 的 `useTheme()` 切换

**Step 2: 添加到页面**

在 `page.tsx` 中引入 `<ThemeToggle />`

**Step 3: 验证主题切换**

- 点击按钮能切换暗/亮主题
- 图标动画流畅
- 刷新后主题持久化

**Step 4: Commit**

```bash
git add . && git commit -m "feat: add theme toggle button with animation"
```

---

### Task 4: 示例数据与内容目录结构

**Files:**
- Create: `blog/content/posts/hello-world.mdx`
- Create: `blog/content/posts/nextjs-guide.mdx`
- Create: `blog/content/journal/2026-04-13.mdx`
- Create: `blog/data/bookmarks.json`
- Create: `blog/data/ideas.json`
- Create: `blog/data/journal-layout.json`
- Create: `blog/src/lib/content.ts`

**Step 1: 创建示例 MDX 博客文章**

创建 2 篇示例文章，带 frontmatter（title, date, tags, summary）。

**Step 2: 创建示例 JSON 数据**

`bookmarks.json` — 5 条示例收藏，含 url, title, summary, tags, favicon, createdAt
`ideas.json` — 5 条示例想法，含 content, tags, createdAt
`journal-layout.json` — 日常块布局元数据

**Step 3: 创建内容读取工具库 `src/lib/content.ts`**

- `getPosts()` — 读取 content/posts/*.mdx，解析 frontmatter，计算阅读时间
- `getBookmarks()` — 读取 data/bookmarks.json
- `getIdeas()` — 读取 data/ideas.json
- `getJournalEntries()` — 读取 content/journal/*.mdx + layout

**Step 4: Commit**

```bash
git add . && git commit -m "feat: add sample content and content utility library"
```

---

### Task 5: 首页模块

**Files:**
- Create: `blog/src/components/sections/HomeSection.tsx`
- Create: `blog/src/components/GitHubActivity.tsx`
- Create: `blog/src/components/LatestContent.tsx`
- Create: `blog/src/lib/github.ts`
- Modify: `blog/src/app/page.tsx`

**Step 1: 创建 GitHub 数据获取工具 `src/lib/github.ts`**

- `getRepos(username)` — GitHub REST API 获取仓库列表
- `getRecentCommits(username)` — 获取最近提交记录

**Step 2: 创建 GitHubActivity 组件**

- 仓库卡片网格：名称、描述、星标数、语言标签
- 最近提交时间线：提交信息、时间、仓库名
- Craft 风格：大圆角卡片、柔和阴影

**Step 3: 创建 LatestContent 组件**

- 最近 3 篇博客摘要卡片
- 最近 5 条收藏卡片
- 最近几条想法

**Step 4: 组合为 HomeSection**

个人签名 + GitHubActivity + LatestContent

**Step 5: 集成到 page.tsx 的 #home section**

**Step 6: 验证首页渲染**

**Step 7: Commit**

```bash
git add . && git commit -m "feat: add home section with github activity and latest content"
```

---

### Task 6: 博客模块（列表 + 侧边阅读面板）

**Files:**
- Create: `blog/src/components/sections/BlogSection.tsx`
- Create: `blog/src/components/ArticleList.tsx`
- Create: `blog/src/components/ReadingPanel.tsx`
- Create: `blog/src/components/TableOfContents.tsx`
- Create: `blog/src/components/MDXRenderer.tsx`
- Create: `blog/src/components/SearchBar.tsx`

**Step 1: 创建 MDXRenderer 组件**

- 使用 MDX + Shiki 渲染 Markdown 内容
- 代码块高亮，支持暗/亮主题自动切换
- 自定义 MDX 组件样式（h1-h6, p, ul, ol, blockquote, code 等）

**Step 2: 创建 TableOfContents 组件**

- 从文章内容中提取 h2/h3 标题
- 浮动在阅读面板右侧
- 点击跳转到对应标题
- 滚动时高亮当前章节

**Step 3: 创建 ReadingPanel 组件**

- 右侧滑出面板（从右向左滑入动画）
- 顶部：文章标题、日期、标签、阅读时间
- 中间：MDXRenderer 渲染正文
- 右侧浮动：TableOfContents
- 关闭按钮

**Step 4: 创建 SearchBar 组件**

- Flexsearch 客户端搜索
- 即时搜索，高亮匹配结果
- Craft 风格输入框

**Step 5: 创建 ArticleList 组件**

- 文章列表：标题 + 日期 + 标签 + 阅读时间
- 点击文章打开 ReadingPanel

**Step 6: 组合为 BlogSection**

SearchBar + ArticleList + ReadingPanel

**Step 7: 集成到 page.tsx 的 #blog section**

**Step 8: 验证博客模块**

- 文章列表正确渲染
- 点击打开侧边阅读面板，动画流畅
- TOC 目录导航正常
- 代码高亮正确
- 搜索功能生效

**Step 9: Commit**

```bash
git add . && git commit -m "feat: add blog section with reading panel, TOC and search"
```

---

### Task 7: 日常模块（块编辑器布局）

**Files:**
- Create: `blog/src/components/sections/JournalSection.tsx`
- Create: `blog/src/components/BlockEditor.tsx`
- Create: `blog/src/components/Block.tsx`

**Step 1: 安装拖拽库**

```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

**Step 2: 创建 Block 组件**

- 单个内容块，支持三种宽度：full (100%) / half (50%) / third (33.3%)
- 渲染 Markdown 内容
- 拖拽手柄
- 宽度调整控件

**Step 3: 创建 BlockEditor 组件**

- 使用 @dnd-kit 实现拖拽排序
- 块布局基于 CSS Grid / Flexbox wrap
- 从 journal-layout.json 读取布局元数据
- 拖拽和调整宽度后更新布局状态

**Step 4: 组合为 JournalSection**

**Step 5: 集成到 page.tsx 的 #journal section**

**Step 6: 验证日常模块**

- 块正确渲染，宽度生效
- 拖拽排序流畅
- 宽度调整正常

**Step 7: Commit**

```bash
git add . && git commit -m "feat: add journal section with block editor layout"
```

---

### Task 8: 收藏模块

**Files:**
- Create: `blog/src/components/sections/BookmarksSection.tsx`
- Create: `blog/src/components/BookmarkCard.tsx`
- Create: `blog/src/components/TagFilter.tsx`

**Step 1: 创建 TagFilter 组件**

- 横向标签栏，支持点击筛选
- 当前选中标签高亮
- "全部" 选项

**Step 2: 创建 BookmarkCard 组件**

- 卡片样式：favicon + 标题 + 摘要 + 标签 + 收藏时间
- Craft 风格大圆角卡片
- 点击新标签页打开原链接

**Step 3: 组合为 BookmarksSection**

- TagFilter + 搜索 + 卡片网格
- 标签筛选和搜索联动

**Step 4: 集成到 page.tsx 的 #bookmarks section**

**Step 5: 验证收藏模块**

**Step 6: Commit**

```bash
git add . && git commit -m "feat: add bookmarks section with tag filter and search"
```

---

### Task 9: 想法模块

**Files:**
- Create: `blog/src/components/sections/IdeasSection.tsx`
- Create: `blog/src/components/IdeaCard.tsx`

**Step 1: 创建 IdeaCard 组件**

- 轻量卡片：内容文本 + 标签 + 时间戳
- 短文本直接展示

**Step 2: 组合为 IdeasSection**

- 时间线倒序排列
- 按日期分组

**Step 3: 集成到 page.tsx 的 #ideas section**

**Step 4: 验证想法模块**

**Step 5: Commit**

```bash
git add . && git commit -m "feat: add ideas section with timeline layout"
```

---

### Task 10: API Route — OpenClaw Webhook

**Files:**
- Create: `blog/src/app/api/collect/route.ts`

**Step 1: 创建 `/api/collect` POST 接口**

```typescript
// 接收请求体
interface CollectRequest {
  type: 'bookmark' | 'idea' | 'post' | 'journal'
  content: string
  tags?: string[]
  title?: string
  layout?: { width: 'full' | 'half' | 'third'; order: number }
}
```

- 根据 type 写入对应文件
- 通过 GitHub API (Octokit) 提交到仓库
- 返回成功/失败状态

**Step 2: 安装 Octokit**

```bash
npm install octokit
```

**Step 3: 验证 API**

用 curl 测试 POST 请求

**Step 4: Commit**

```bash
git add . && git commit -m "feat: add /api/collect webhook for OpenClaw"
```

---

### Task 11: 全局打磨与最终验证

**Files:**
- Modify: `blog/src/app/globals.css`
- Modify: 各组件文件

**Step 1: 全局视觉打磨**

- 检查所有组件 Craft 风格一致性（圆角、阴影、间距、字体）
- 暗/亮主题下所有模块渲染正确
- 过渡动画流畅

**Step 2: 构建测试**

```bash
cd /data/workspace/blog && npm run build
```
Expected: 构建成功，无错误

**Step 3: Final Commit**

```bash
git add . && git commit -m "feat: polish UI and finalize personal website v1"
```
