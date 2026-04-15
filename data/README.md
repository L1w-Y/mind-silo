# data — 历史数据目录

> ⚠️ **注意**：此目录中的 JSON 文件为历史数据，**已迁移到 Turso 数据库**。
> 
> 当前项目通过 `src/lib/db.ts` 直接读写 Turso，不再依赖这些文件。
> 保留仅供参考和数据库初始化脚本（`src/scripts/init-db.ts`）使用。

## 文件说明

| 文件 | 对应数据库表 | 说明 |
|------|-------------|------|
| `bookmarks.json` | `bookmarks` | 资源收藏 |
| `ideas.json` | `ideas` | 碎片想法 |
| `journal-layout.json` | `journals.layout_*` | 日常块布局元数据 |
