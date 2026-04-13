import { Idea } from "@/lib/content";

export function IdeaCard({ idea }: { idea: Idea }) {
  return (
    <div
      className="rounded-xl px-5 py-4"
      style={{
        background: "var(--muted)",
        border: "1px solid var(--border)",
      }}
    >
      <p className="text-sm text-card-foreground leading-relaxed">
        {idea.content}
      </p>
      <div className="flex items-center gap-2 mt-3">
        {idea.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent"
          >
            {tag}
          </span>
        ))}
        <span className="text-xs text-muted-foreground ml-auto">
          {new Date(idea.createdAt).toLocaleDateString("zh-CN")}
        </span>
      </div>
    </div>
  );
}
