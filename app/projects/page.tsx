import type { Metadata } from "next";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "projects — jason mclaren",
  description: "research projects and software.",
};

export default function ProjectsPage() {
  const sorted = [...projects].sort((a, b) => b.year - a.year);

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          projects
        </h1>
        <p className="text-muted">
          research projects, tools, and open-source software.
        </p>
      </div>

      <div className="space-y-6">
        {sorted.map((project) => (
          <div
            key={project.slug}
            className="rounded-lg border border-border bg-card p-6 space-y-3"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-medium text-foreground">{project.title}</h2>
              <span className="shrink-0 font-mono text-sm text-muted">
                {project.year}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-4 text-sm">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  paper
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  code
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
