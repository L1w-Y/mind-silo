export const dynamic = "force-dynamic";

import FloatingNav from "@/components/FloatingNav";
import ThemeToggle from "@/components/ThemeToggle";
import SmoothScroll from "@/components/SmoothScroll";
import { HomeSection } from "@/components/sections/HomeSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { BookmarksSection } from "@/components/sections/BookmarksSection";
import { IdeasSection } from "@/components/sections/IdeasSection";
import { JournalSection } from "@/components/sections/JournalSection";

export default function Home() {
  return (
    <SmoothScroll>
      <FloatingNav />
      <ThemeToggle />

      <div data-section="home">
        <HomeSection />
      </div>

      <div data-section="blog">
        <BlogSection />
      </div>

      <div data-section="bookmarks">
        <BookmarksSection />
      </div>

      <div data-section="thoughts">
        <IdeasSection />
      </div>

      <div data-section="daily">
        <JournalSection />
      </div>
    </SmoothScroll>
  );
}
