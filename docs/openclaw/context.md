# Mind Silo — 数据与 API 参考文档

> 本文档描述 Mind Silo 的数据结构和 API 接口。
> 开发侧有变更时同步更新此文档，OpenClaw 通过 `git pull` 获取最新版。
> 动态数据（当前标签列表、统计）通过 `/api/meta` 实时获取。

---

## 动态元数据接口

```
GET https://<DOMAIN>/api/meta
```

返回 JSON：
- `tags.all` — 所有已有标签
- `tags.bookmarks` / `tags.ideas` / `tags.posts` — 各表标签
- `counts` — 各表数据量
- `schema` — 表结构说明
- `collectAPI` — 写入 API 格式

---

## 写入接口

```
POST https://<DOMAIN>/api/collect
Header: Authorization: Bearer <COLLECT_API_TOKEN>
Content-Type: application/json
```

```json
{
  "type": "bookmark | idea | post | journal",
  "content": "内容（必填）",
  "title": "标题（bookmark/post 建议填）",
  "summary": "摘要（可选）",
  "tags": ["标签1", "标签2"]
}
```

---

## 数据库表结构

### bookmarks（收藏）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | TEXT PK | 自动生成 `bm-{timestamp}` |
| url | TEXT | 链接地址（对应请求的 `content`） |
| title | TEXT | 标题 |
| summary | TEXT | 一句话摘要 |
| tags | TEXT | JSON 数组 `["React","前端"]` |
| favicon | TEXT | 图标 URL（可用 `https://www.google.com/s2/favicons?domain=xxx&sz=64`） |
| created_at | TEXT | ISO 8601 时间戳 |
| color | TEXT | 卡片颜色（可选） |
| card_width | TEXT | `full` / `half` / `third`，默认 `half` |

### ideas（想法）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | TEXT PK | 自动生成 `idea-{timestamp}` |
| content | TEXT | 想法内容 |
| tags | TEXT | JSON 数组 |
| created_at | TEXT | ISO 8601 时间戳 |
| color | TEXT | 卡片颜色（可选） |
| card_width | TEXT | 默认 `third` |

### posts（文章）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | TEXT PK | `post-{slug}` |
| slug | TEXT UNIQUE | URL 友好标识（从标题生成） |
| title | TEXT | 标题 |
| content | TEXT | 正文（Markdown） |
| summary | TEXT | 摘要 |
| tags | TEXT | JSON 数组 |
| date | TEXT | `YYYY-MM-DD` |
| color | TEXT | 卡片颜色（可选） |
| card_width | TEXT | 默认 `half` |

### journals（日常）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | TEXT PK | 自动生成 `journal-{timestamp}` |
| slug | TEXT UNIQUE | `YYYY-MM-DD-{timestamp}` |
| title | TEXT | 标题（默认日期） |
| content | TEXT | 内容（每条独立记录） |
| date | TEXT | `YYYY-MM-DD` |
| layout_width | TEXT | `full` / `half` / `third` |
| layout_order | INTEGER | 排序 |
| color | TEXT | 卡片颜色（可选） |
| card_width | TEXT | 默认 `full` |

---

## 标签命名规范

- 1-3 个标签/条
- 中文或常见英文术语（React、Go、AI）
- 简短 2-4 字
- 避免太宽泛或太具体

---

## 同步机制

- **静态内容**（表结构、API 格式）→ 本文档，`git pull` 同步
- **动态内容**（标签列表、数据统计）→ `GET /api/meta` 实时获取

---

## 变更日志

| 日期 | 变更 |
|------|------|
| 2026-04-15 | 初始版本：4 张表、/api/collect、/api/meta |
