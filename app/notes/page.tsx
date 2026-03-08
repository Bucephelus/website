import type { Metadata } from "next";
import Link from "next/link";
import { getAllNotes } from "@/lib/notes";

export const metadata: Metadata = {
  title: "notes — jason mclaren",
  description: "technical notes and writing.",
};

export default function NotesPage() {
  const notes = getAllNotes();

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          notes
        </h1>
        <p className="text-muted">technical notes and writing.</p>
      </div>

      <div className="space-y-6">
        {notes.map((note) => (
          <Link
            key={note.slug}
            href={`/notes/${note.slug}`}
            className="block rounded-lg border border-border bg-card p-6 space-y-3 no-underline transition-colors hover:border-accent/40 hover:no-underline"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-medium text-foreground">{note.title}</h2>
              <span className="shrink-0 font-mono text-sm text-muted">
                {note.date}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted">
              {note.summary}
            </p>
            <div className="flex items-center gap-4">
              <div className="flex flex-wrap gap-2">
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="ml-auto shrink-0 text-xs text-muted">
                {note.readingTime}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
