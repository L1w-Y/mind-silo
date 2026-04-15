import { getJournalEntries } from "@/lib/content";
import { JournalSectionClient } from "./JournalSectionClient";

export async function JournalSection() {
  const entries = await getJournalEntries();
  return <JournalSectionClient entries={entries} />;
}
