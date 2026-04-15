import { getIdeas } from "@/lib/content";
import { IdeasSectionClient } from "./IdeasSectionClient";

export async function IdeasSection() {
  const ideas = await getIdeas();
  return <IdeasSectionClient ideas={ideas} />;
}
