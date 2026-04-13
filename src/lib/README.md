# src/lib — 工具库

## 模块说明

### content.ts

内容读取工具，提供以下函数：

| 函数 | 返回类型 | 说明 |
|------|----------|------|
| `getPosts()` | `Post[]` | 读取 `content/posts/*.mdx`，解析 frontmatter，计算阅读时间，按日期降序 |
| `getPostBySlug(slug)` | `Post \| undefined` | 按 slug 查找文章 |
| `getBookmarks()` | `Bookmark[]` | 读取 `data/bookmarks.json`，按创建时间降序 |
| `getIdeas()` | `Idea[]` | 读取 `data/ideas.json`，按创建时间降序 |
| `getJournalEntries()` | `JournalEntry[]` | 读取 `content/journal/*.mdx`，按日期降序 |
| `getJournalLayout()` | `JournalBlock[]` | 读取 `data/journal-layout.json` 布局元数据 |

**类型定义**：`Post`, `Bookmark`, `Idea`, `JournalEntry`, `JournalBlock` 均在此文件中导出。

### github.ts

GitHub 数据获取工具：

| 函数 | 返回类型 | 说明 |
|------|----------|------|
| `getRepos()` | `GitHubRepo[]` | 获取用户仓库列表（GitHub REST API，1h 缓存） |
| `getContributions()` | `ContributionDay[]` | 获取贡献网格数据（当前为示例数据） |

**配置**：修改 `GITHUB_USERNAME` 常量设置 GitHub 用户名。

**Fallback**：API 请求失败时自动返回示例数据，确保开发环境正常运行。
