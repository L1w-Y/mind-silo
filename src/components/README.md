# src/components — 组件目录

## 概览

所有 React 组件按职责分为两层：

- **根目录**：通用 UI 组件，可在任意模块中复用
- **sections/**：五大页面模块组件，每个模块一对 Server + Client 组件

## 通用组件

| 组件 | 类型 | 说明 |
|------|------|------|
| `FloatingNav.tsx` | Client | 左侧悬浮胶囊导航，IntersectionObserver 滚动同步高亮，hover 滑块跟随 |
| `ThemeToggle.tsx` | Client | 右上角主题切换按钮，太阳/月亮旋转动画 |
| `ReadingPanel.tsx` | Client | 博客右侧滑出阅读面板，backdrop + 滑入动画 |
| `SearchBar.tsx` | Client | 搜索栏，即时搜索 + 下拉结果 |
| `TableOfContents.tsx` | Client | 文章目录导航，提取 h2/h3，滚动高亮 |
| `MDXRenderer.tsx` | Server | Markdown → HTML 渲染器，集成 Shiki 代码高亮 |
| `BlockEditor.tsx` | Client | 日常块编辑器，@dnd-kit 拖拽排序 |
| `Block.tsx` | Client | 单个内容块，支持 full/half/third 宽度切换 |
| `BookmarkCard.tsx` | Server | 收藏卡片（favicon + 标题 + 摘要 + 标签） |
| `IdeaCard.tsx` | Server | 想法卡片（内容 + 标签 + 时间戳） |
| `TagFilter.tsx` | Client | 标签筛选栏，点击切换高亮 |
| `ContributionGrid.tsx` | Client | GitHub 贡献网格（类似 GitHub Profile 绿色格子） |
| `GitHubActivity.tsx` | Server | GitHub 模块组合（贡献网格 + 仓库卡片） |
| `LatestContent.tsx` | Server | 最新内容聚合（博客 + 收藏 + 想法） |
| `Favicon.tsx` | Client | favicon 图片组件，加载失败自动隐藏 |

## sections/ 模块组件

每个模块采用 **Server → Client 数据传递** 模式：

| Server 组件 | Client 组件 | 模块 |
|-------------|-------------|------|
| `HomeSection.tsx` | — (子组件为 Client) | 首页 |
| `BlogSection.tsx` | `BlogSectionClient.tsx` | 博客 |
| `JournalSection.tsx` | `JournalSectionClient.tsx` | 日常 |
| `BookmarksSection.tsx` | `BookmarksSectionClient.tsx` | 收藏 |
| `IdeasSection.tsx` | — (纯服务端渲染) | 想法 |

**数据流**：Server 组件调用 `lib/content.ts` 读取数据 → 序列化传递给 Client 组件 → Client 组件处理交互状态。
