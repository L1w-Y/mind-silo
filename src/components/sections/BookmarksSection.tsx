import { getBookmarks } from "@/lib/content";
import { BookmarksSectionClient } from "./BookmarksSectionClient";

export async function BookmarksSection() {
  const bookmarks = await getBookmarks();
  return <BookmarksSectionClient bookmarks={bookmarks} />;
}
