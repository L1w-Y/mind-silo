"use client";

import { useState, useEffect, useRef } from "react";
import { Post } from "@/lib/content";
import { TableOfContents } from "@/components/TableOfContents";

interface ReadingPanelProps {
  post: Post | null;
  renderedContent: string;
  onClose: () => void;
}

export function ReadingPanel({
  post,
  renderedContent,
  onClose,
}: ReadingPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (post) {
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
    }
  }, [post]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!post) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          isVisible ? "bg-black/20 backdrop-blur-sm" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={`fixed top-0 right-0 z-50 h-full w-[65vw] max-w-4xl overflow-y-auto transition-transform duration-300 ease-out ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "var(--background)",
          borderLeft: "1px solid var(--border)",
          boxShadow: "var(--shadow-float)",
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="sticky top-4 left-4 z-10 w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer hover:bg-muted"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex px-12 pb-20 -mt-4">
          {/* Content */}
          <div className="flex-1 min-w-0 pr-8">
            {/* Header */}
            <header className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight mb-3">
                {post.title}
              </h1>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
              <div className="flex gap-2 mt-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            {/* Rendered MDX */}
            <div
              className="prose-custom"
              dangerouslySetInnerHTML={{ __html: renderedContent }}
            />
          </div>

          {/* TOC sidebar */}
          <aside className="hidden xl:block w-48 flex-shrink-0 sticky top-16 self-start">
            <TableOfContents content={post.content} />
          </aside>
        </div>
      </div>
    </>
  );
}
