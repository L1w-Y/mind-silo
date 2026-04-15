import { getRepos, getContributions } from "@/lib/github";
import { getPosts, getBookmarks, getIdeas } from "@/lib/content";
import { HomeSectionClient } from "./HomeSectionClient";

export async function HomeSection() {
  const [repos, contributions] = await Promise.all([
    getRepos(),
    getContributions(),
  ]);

  const posts = await getPosts();
  const bookmarks = await getBookmarks();
  const ideas = await getIdeas();

  return (
    <HomeSectionClient
      repos={repos}
      contributions={contributions}
      posts={posts}
      bookmarks={bookmarks}
      ideas={ideas}
    />
  );
}
