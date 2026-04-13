"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export interface BlockData {
  id: string;
  content: string;
  title: string;
  date: string;
  width: "full" | "half" | "third";
}

const WIDTH_MAP = {
  full: "100%",
  half: "calc(50% - 6px)",
  third: "calc(33.333% - 8px)",
};

const WIDTH_CYCLE: BlockData["width"][] = ["full", "half", "third"];

interface BlockProps {
  block: BlockData;
  onWidthChange: (id: string, width: BlockData["width"]) => void;
}

export function Block({ block, onWidthChange }: BlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: WIDTH_MAP[block.width],
    opacity: isDragging ? 0.5 : 1,
    background: "var(--card)",
    boxShadow: "var(--shadow-card)",
    border: "1px solid var(--border)",
  };

  const cycleWidth = () => {
    const currentIdx = WIDTH_CYCLE.indexOf(block.width);
    const nextWidth = WIDTH_CYCLE[(currentIdx + 1) % WIDTH_CYCLE.length];
    onWidthChange(block.id, nextWidth);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group rounded-2xl p-5 transition-shadow duration-200 flex-shrink-0"
      {...attributes}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-3 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Drag handle */}
        <button
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 rounded-lg hover:bg-muted text-muted-foreground"
          aria-label="拖拽排序"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        {/* Width toggle */}
        <button
          onClick={cycleWidth}
          className="text-xs px-2 py-1 rounded-lg hover:bg-muted text-muted-foreground cursor-pointer"
          aria-label="切换宽度"
        >
          {block.width === "full" ? "全宽" : block.width === "half" ? "半宽" : "1/3"}
        </button>
      </div>

      {/* Content */}
      <div>
        <h4 className="font-semibold text-card-foreground mb-1">{block.title}</h4>
        <p className="text-xs text-muted-foreground mb-3">{block.date}</p>
        <div className="text-sm text-card-foreground leading-relaxed whitespace-pre-wrap">
          {block.content}
        </div>
      </div>
    </div>
  );
}
