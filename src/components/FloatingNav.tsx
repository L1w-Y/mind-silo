"use client";

import { useEffect, useState } from "react";
import { Home, FileText, Bookmark, Lightbulb, Calendar } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

const navItems = [
  { id: "home", label: "首页", icon: Home },
  { id: "blog", label: "博客", icon: FileText },
  { id: "bookmarks", label: "收藏", icon: Bookmark },
  { id: "thoughts", label: "想法", icon: Lightbulb },
  { id: "daily", label: "日常", icon: Calendar },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-50">
      <div className="flex flex-col items-stretch gap-1 bg-white/95 backdrop-blur-md border-3 border-black rounded-2xl p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        {/* Logo */}
        <button
          onClick={() => scrollToSection("home")}
          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors mb-1 cursor-pointer"
        >
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0">
            <div className="w-4 h-4 bg-white rounded-full" />
          </div>
          <span className="font-bold text-sm text-[#0B0B0B]">Mind Silo</span>
        </button>

        <div className="h-px bg-gray-200 mx-2 mb-1" />

        {/* Nav Items */}
        <div className="flex flex-col gap-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                  activeSection === item.id
                    ? "bg-black text-white"
                    : "text-[#0B0B0B] hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="h-px bg-gray-200 mx-2 mt-1" />

        {/* GitHub Link */}
        <a
          href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME || "L1w-Y"}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors mt-1"
        >
          <GithubIcon className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium text-[#0B0B0B]">GitHub</span>
        </a>
      </div>
    </nav>
  );
}
