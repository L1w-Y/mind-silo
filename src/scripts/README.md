# src/scripts — 脚本目录

## init-db.ts — 数据库初始化脚本

用途：创建 Turso 数据库表结构 + 从本地 JSON/MDX 文件迁移历史数据。

**运行方式**：
```bash
# 需要设置环境变量（或通过 .env.local）
npx tsx src/scripts/init-db.ts
```

**功能**：
1. 创建 4 张表（bookmarks, ideas, posts, journals）
2. 从 `data/bookmarks.json` 迁移收藏数据
3. 从 `data/ideas.json` 迁移想法数据
4. 从 `content/posts/*.mdx` 迁移博客文章
5. 从 `content/journal/*.mdx` 迁移日常记录

**注意**：使用 `INSERT OR IGNORE` 防止重复插入，可安全多次运行。
