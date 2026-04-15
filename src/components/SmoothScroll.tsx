"use client";

import { useEffect, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const createScrollSnap = require("scroll-snap").default || require("scroll-snap");

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const { unbind } = createScrollSnap(el, {
      snapDestinationY: "100%",
      timeout: 50,
      duration: 750,
      threshold: 0.15,
      snapStop: false,
      // 阻尼缓动：快速启动 → 逐渐减速 → 末端轻微黏滞
      easing: (t: number) => 1 - Math.pow(1 - t, 3.5),
    });

    return () => unbind();
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-auto"
      style={{ scrollBehavior: "auto" }}
    >
      {children}
    </div>
  );
}
