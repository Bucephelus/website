import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const notesDir = path.join(process.cwd(), "content", "notes");

export type NoteMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  readingTime: string;
};

export function getAllNoteSlugs(): string[] {
  return fs
    .readdirSync(notesDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getNoteMetadata(slug: string): NoteMeta {
  const filePath = path.join(notesDir, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    summary: data.summary ?? "",
    tags: data.tags ?? [],
    readingTime: data.readingTime ?? stats.text,
  };
}

export function getAllNotes(): NoteMeta[] {
  return getAllNoteSlugs()
    .map(getNoteMetadata)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}
