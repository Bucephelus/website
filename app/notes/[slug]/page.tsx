import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllNoteSlugs, getNoteMetadata } from "@/lib/notes";
import { ReadingProgress } from "@/app/components/reading-progress";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllNoteSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const meta = getNoteMetadata(slug);
    return {
      title: `${meta.title} — jason mclaren`,
      description: meta.summary,
    };
  });
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const slugs = getAllNoteSlugs();
  if (!slugs.includes(slug)) {
    notFound();
  }

  const meta = getNoteMetadata(slug);

  // Dynamic import — @next/mdx compiles the .mdx through webpack
  const { default: Content } = await import(
    `@/content/notes/${slug}.mdx`
  );

  return (
    <article>
      <ReadingProgress />
      <header className="mb-10 space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {meta.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-muted">
          <time>{meta.date}</time>
          <span>&middot;</span>
          <span>{meta.readingTime}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {meta.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>
      <div>
        <Content />
      </div>
    </article>
  );
}
