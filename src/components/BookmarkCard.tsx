import { Favicon } from "@/components/Favicon";
import { Bookmark } from "@/lib/content";

export function BookmarkCard({ bookmark }: { bookmark: Bookmark }) {
  return (
    <a
      href={bookmark.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background: "var(--card)",
        boxShadow: "var(--shadow-card)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="flex items-center gap-2.5 mb-3">
        <Favicon src={bookmark.favicon} />
        <h4 className="font-semibold text-sm text-card-foreground group-hover:text-accent transition-colors truncate">
          {bookmark.title}
        </h4>
      </div>
      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
        {bookmark.summary}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          {bookmark.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="text-xs text-muted-foreground">
          {new Date(bookmark.createdAt).toLocaleDateString("zh-CN")}
        </span>
      </div>
    </a>
  );
}
