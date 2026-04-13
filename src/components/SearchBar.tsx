"use client";

import { useState, useMemo } from "react";

interface SearchBarProps {
  items: { title: string; slug: string }[];
  onSelect: (slug: string) => void;
}

export function SearchBar({ items, onSelect }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return items.filter((item) => item.title.toLowerCase().includes(q));
  }, [query, items]);

  return (
    <div className="relative mb-6">
      <div
        className="flex items-center gap-2 rounded-xl px-4 py-2.5 transition-all duration-200"
        style={{
          background: "var(--muted)",
          border: `1px solid ${isFocused ? "var(--accent)" : "var(--border)"}`,
        }}
      >
        <svg
          className="w-4 h-4 text-muted-foreground flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input
          type="text"
          placeholder="搜索文章..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Results dropdown */}
      {query && results.length > 0 && isFocused && (
        <div
          className="absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden z-20"
          style={{
            background: "var(--card)",
            boxShadow: "var(--shadow-float)",
            border: "1px solid var(--border)",
          }}
        >
          {results.map((item) => (
            <button
              key={item.slug}
              onClick={() => {
                onSelect(item.slug);
                setQuery("");
              }}
              className="w-full text-left px-4 py-3 text-sm hover:bg-muted transition-colors cursor-pointer"
            >
              {item.title}
            </button>
          ))}
        </div>
      )}

      {query && results.length === 0 && isFocused && (
        <div
          className="absolute top-full left-0 right-0 mt-2 rounded-xl px-4 py-3 text-sm text-muted-foreground z-20"
          style={{
            background: "var(--card)",
            boxShadow: "var(--shadow-float)",
            border: "1px solid var(--border)",
          }}
        >
          未找到匹配的文章
        </div>
      )}
    </div>
  );
}
