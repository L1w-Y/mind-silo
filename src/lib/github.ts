export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "L1w-Y";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";

export async function getRepos(): Promise<GitHubRepo[]> {
  if (!GITHUB_TOKEN) {
    console.warn("[GitHub] No GITHUB_TOKEN, using sample repos");
    return getSampleRepos();
  }

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query($username: String!) {
          user(login: $username) {
            pinnedItems(first: 6, types: REPOSITORY) {
              nodes {
                ... on Repository {
                  name
                  description
                  url
                  stargazerCount
                  primaryLanguage { name }
                  updatedAt
                }
              }
            }
          }
        }`,
        variables: { username: GITHUB_USERNAME },
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn("[GitHub] GraphQL repos API failed:", res.status);
      return getSampleRepos();
    }

    const json = await res.json();
    if (json.errors) {
      console.warn("[GitHub] GraphQL errors:", json.errors);
      return getSampleRepos();
    }
    const nodes = json?.data?.user?.pinnedItems?.nodes;

    if (!nodes || nodes.length === 0) {
      console.warn("[GitHub] No pinned repos found");
      return getSampleRepos();
    }

    console.log("[GitHub] Loaded", nodes.length, "pinned repos");
    return nodes.map((repo: Record<string, unknown>) => ({
      name: repo.name as string,
      description: repo.description as string | null,
      html_url: repo.url as string,
      stargazers_count: repo.stargazerCount as number,
      language: (repo.primaryLanguage as Record<string, string> | null)?.name || null,
      updated_at: repo.updatedAt as string,
    }));
  } catch (err) {
    console.warn("[GitHub] Repos fetch error:", err);
    return getSampleRepos();
  }
}

export async function getContributions(): Promise<ContributionDay[]> {
  if (!GITHUB_TOKEN) return getSampleContributions();

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query($username: String!) {
            user(login: $username) {
              contributionsCollection {
                contributionCalendar {
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                      contributionLevel
                    }
                  }
                }
              }
            }
          }
        `,
        variables: { username: GITHUB_USERNAME },
      }),
      cache: "no-store",
    });

    if (!res.ok) return getSampleContributions();

    const json = await res.json();
    const weeks =
      json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;

    if (!weeks) return getSampleContributions();

    const levelMap: Record<string, 0 | 1 | 2 | 3 | 4> = {
      NONE: 0,
      FIRST_QUARTILE: 1,
      SECOND_QUARTILE: 2,
      THIRD_QUARTILE: 3,
      FOURTH_QUARTILE: 4,
    };

    const days: ContributionDay[] = [];
    for (const week of weeks) {
      for (const day of week.contributionDays) {
        days.push({
          date: day.date,
          count: day.contributionCount,
          level: levelMap[day.contributionLevel] ?? 0,
        });
      }
    }
    return days;
  } catch {
    return getSampleContributions();
  }
}

function getSampleRepos(): GitHubRepo[] {
  return [
    {
      name: "personal-blog",
      description: "我的个人博客，使用 Next.js + Tailwind CSS 构建",
      html_url: "https://github.com",
      stargazers_count: 12,
      language: "TypeScript",
      updated_at: "2026-04-13T10:00:00Z",
    },
    {
      name: "cli-toolkit",
      description: "一个实用的命令行工具集合",
      html_url: "https://github.com",
      stargazers_count: 45,
      language: "Go",
      updated_at: "2026-04-10T08:00:00Z",
    },
  ];
}

function getSampleContributions(): ContributionDay[] {
  const days: ContributionDay[] = [];
  const now = new Date();
  for (let i = 364; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    const rand = Math.random();
    let count = 0;
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (rand > 0.35) {
      count = Math.floor(Math.random() * 12) + 1;
      if (count <= 2) level = 1;
      else if (count <= 5) level = 2;
      else if (count <= 8) level = 3;
      else level = 4;
    }
    days.push({ date: dateStr, count, level });
  }
  return days;
}
