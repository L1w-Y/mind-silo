import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.GITHUB_TOKEN || "";
  const username = process.env.GITHUB_USERNAME || "";

  const result: Record<string, unknown> = {
    hasToken: !!token,
    tokenPrefix: token ? token.slice(0, 8) + "..." : "MISSING",
    username: username || "MISSING",
  };

  // 测试 GraphQL API
  if (token) {
    try {
      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `query($username: String!) {
            user(login: $username) {
              pinnedItems(first: 6, types: REPOSITORY) {
                nodes { ... on Repository { name } }
              }
            }
          }`,
          variables: { username },
        }),
        cache: "no-store",
      });

      result.graphqlStatus = res.status;
      const json = await res.json();
      if (json.errors) {
        result.graphqlErrors = json.errors;
      } else {
        const names = json?.data?.user?.pinnedItems?.nodes?.map(
          (n: { name: string }) => n.name
        );
        result.pinnedRepos = names;
      }
    } catch (err) {
      result.graphqlError = String(err);
    }
  }

  return NextResponse.json(result);
}
