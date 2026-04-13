import FloatingNav from "@/components/FloatingNav";
import ThemeToggle from "@/components/ThemeToggle";
import { HomeSection } from "@/components/sections/HomeSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { JournalSection } from "@/components/sections/JournalSection";
import { BookmarksSection } from "@/components/sections/BookmarksSection";
import { IdeasSection } from "@/components/sections/IdeasSection";

export default function Home() {
  return (
    <div className="p-3 min-h-screen">
      <div className="content-shell relative">
        <FloatingNav />
        <ThemeToggle />

        {/* Home: full width, sky background covers nav area too */}
        <section id="home" className="border-none">
          <HomeSection />
        </section>

        {/* Other sections: offset for nav */}
        <main className="ml-24">
          <section id="blog" className="min-h-screen">
            <BlogSection />
          </section>
          <section id="journal" className="min-h-screen">
            <JournalSection />
          </section>
          <section id="bookmarks" className="min-h-screen">
            <BookmarksSection />
          </section>
          <section id="ideas" className="min-h-screen">
            <IdeasSection />
          </section>
        </main>
      </div>
    </div>
  );
}
