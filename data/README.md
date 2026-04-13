# data — 数据目录

## 文件说明

### bookmarks.json

资源收藏数据，数组格式：

```json
{
  "id": "bm-{timestamp}",
  "url": "https://...",
  "title": "标题",
  "summary": "简要描述",
  "tags": ["标签"],
  "favicon": "https://.../favicon.ico",
  "createdAt": "ISO 8601 时间"
}
```

### ideas.json

碎片想法数据，数组格式：

```json
{
  "id": "idea-{timestamp}",
  "content": "想法内容",
  "tags": ["标签"],
  "createdAt": "ISO 8601 时间"
}
```

### journal-layout.json

日常块编辑器布局元数据，数组格式：

```json
{
  "id": "block-{timestamp}",
  "entryFile": "2026-04-13.mdx",
  "width": "full | half | third",
  "order": 0
}
```

## 数据写入

这些文件可通过以下方式更新：
1. **手动编辑** — 直接修改 JSON 文件
2. **API 写入** — 通过 `POST /api/collect` webhook 自动追加
3. **OpenClaw 机器人** — 通过聊天自动分类并调用 API 写入
