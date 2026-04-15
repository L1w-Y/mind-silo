export const dynamic = "force-dynamic";

import FloatingNav from "@/components/FloatingNav";
import ThemeToggle from "@/components/ThemeToggle";
import { HomeSection } from "@/components/sections/HomeSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { BookmarksSection } from "@/components/sections/BookmarksSection";
import { IdeasSection } from "@/components/sections/IdeasSection";
import { JournalSection } from "@/components/sections/JournalSection";

export default function Home() {
  return (
    <main className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth">
      <FloatingNav />
      <ThemeToggle />

      <div className="snap-start snap-always">
        <HomeSection />
      </div>

      <div className="snap-start snap-always">
        <BlogSection />
      </div>

      <div className="snap-start snap-always">
        <BookmarksSection />
      </div>

      <div className="snap-start snap-always">
        <IdeasSection />
      </div>

      <div className="snap-start snap-always">
        <JournalSection />
      </div>
    </main>
  );
}
