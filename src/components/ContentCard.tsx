import { getCardColor } from "@/lib/colors";

interface ContentCardProps {
  children: React.ReactNode;
  tags?: string[];
  color?: string | null;
  className?: string;
}

export function ContentCard({ children, tags, color, className = "" }: ContentCardProps) {
  const cardColor = getCardColor(color, tags);

  return (
    <div
      className={`content-card relative rounded-2xl overflow-hidden ${className}`}
      style={{
        background: `var(--card-bg, ${cardColor.bg})`,
        border: `1px solid rgba(0,0,0,0.08)`,
        borderLeft: `3px solid ${cardColor.border}`,
        boxShadow: "rgba(0,0,0,0.04) 0px 4px 18px, rgba(0,0,0,0.027) 0px 2px 8px, rgba(0,0,0,0.02) 0px 0.8px 3px",
      }}
    >
      <div className="p-5">{children}</div>
    </div>
  );
}
