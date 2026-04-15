# src/components — 组件目录

## 概览

所有 React 组件按职责分为两层：

- **根目录**：通用 UI 组件，可在任意模块中复用
- **sections/**：五大页面模块组件，每个模块一对 Server + Client 组件

## 通用组件

| 组件 | 类型 | 说明 |
|------|------|------|
| `FloatingNav.tsx` | Client | 左侧固定导航，Logo + 图标文字 + 黑色高亮 + GitHub 链接 |
| `ThemeToggle.tsx` | Client | 右上角主题切换按钮 |
| `ContributionGrid.tsx` | Client | GitHub 贡献热力图（橙色色调） |
| `ReadingPanel.tsx` | Client | 博客右侧滑出阅读面板 |
| `ContentCard.tsx` | Server | 通用彩色卡片（左边条 + 淡彩背景 + Notion 阴影） |
| `GlassSurface.jsx` | Client | ReactBits 玻璃折射特效组件 |
| `GlassSurface.css` | — | GlassSurface 样式 |

## sections/ 模块组件

每个模块采用 **Server → Client 数据传递** 模式：

| Server 组件 | Client 组件 | 模块 | 背景色 |
|-------------|-------------|------|--------|
| `HomeSection.tsx` | `HomeSectionClient.tsx` | 首页 Bento Grid | `#E8F4FD` |
| `BlogSection.tsx` | `BlogSectionClient.tsx` | 博客列表+阅读面板 | `#FFF5F5` |
| `BookmarksSection.tsx` | `BookmarksSectionClient.tsx` | 收藏卡片网格 | `#F0F9FF` |
| `IdeasSection.tsx` | `IdeasSectionClient.tsx` | 想法瀑布流 | `#FFFBEB` |
| `JournalSection.tsx` | `JournalSectionClient.tsx` | 日常瀑布流 | `#F0FDF4` |

**数据流**：Server 组件调用 `lib/content.ts`（async）读取 Turso 数据库 → 序列化传递给 Client 组件 → Client 组件处理交互状态。

## 设计规范

- 卡片：`border-3 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]`
- Hover：`hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`
- 标签：彩色 pill `text-xs font-semibold px-3 py-1 rounded-full`
- 文字色：`text-[#0B0B0B]`（非纯黑）
- 想法/日常：CSS `columns` 瀑布流（`columns-1 md:columns-2 lg:columns-3 gap-4`）
