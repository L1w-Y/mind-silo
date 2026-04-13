import { getBookmarks } from "@/lib/content";
import { BookmarksSectionClient } from "./BookmarksSectionClient";

export function BookmarksSection() {
  const bookmarks = getBookmarks();
  return <BookmarksSectionClient bookmarks={bookmarks} />;
}
