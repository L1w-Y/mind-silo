"use client";

import { useEffect, useState, useRef } from "react";

const NAV_ITEMS = [
  { id: "home", label: "首页" },
  { id: "blog", label: "博客" },
  { id: "journal", label: "日常" },
  { id: "bookmarks", label: "收藏" },
  { id: "ideas", label: "想法" },
];

export default function FloatingNav() {
  const [activeId, setActiveId] = useState("home");
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // IntersectionObserver: sync active section on scroll
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id);
          }
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Update indicator position
  useEffect(() => {
    const targetIdx =
      hoverIdx !== null
        ? hoverIdx
        : NAV_ITEMS.findIndex((item) => item.id === activeId);
    const el = itemRefs.current[targetIdx];
    if (el && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setIndicatorStyle({
        top: elRect.top - navRect.top,
        height: elRect.height,
      });
    }
  }, [activeId, hoverIdx]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed left-8 top-1/2 -translate-y-1/2 z-50"
      onMouseLeave={() => setHoverIdx(null)}
    >
      <div
        className="relative flex flex-col gap-1 rounded-2xl px-2 py-2"
        style={{
          background: "var(--glass)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: "1px solid var(--glass-border)",
          boxShadow: "var(--shadow-float)",
        }}
      >
        {/* Sliding indicator */}
        <div
          className="absolute left-2 right-2 rounded-xl bg-accent/10 transition-all duration-300 ease-out"
          style={{
            top: indicatorStyle.top,
            height: indicatorStyle.height,
          }}
        />

        {NAV_ITEMS.map((item, idx) => (
          <button
            key={item.id}
            ref={(el) => {
              itemRefs.current[idx] = el;
            }}
            onClick={() => scrollTo(item.id)}
            onMouseEnter={() => setHoverIdx(idx)}
            className={`relative z-10 px-4 py-2.5 text-sm font-medium rounded-xl transition-colors duration-200 cursor-pointer ${
              activeId === item.id
                ? "text-accent"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
