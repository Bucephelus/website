import Link from "next/link";
import { bio, researchInterests, projects } from "@/lib/data";

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="space-y-20">
      {/* hero / bio */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            {bio.name}
          </h1>
          <p className="text-muted">
            {bio.title} &middot; {bio.department}
          </p>
          <p className="text-muted">{bio.institution}</p>
        </div>

        <p className="leading-relaxed text-foreground/90">{bio.summary}</p>

        <div className="flex gap-4 text-sm">
          {bio.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>

      {/* research interests */}
      <section className="space-y-6">
        <h2 className="text-lg font-medium text-foreground">
          research interests
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {researchInterests.map((interest) => (
            <div
              key={interest.title}
              className="rounded-lg border border-border bg-card p-4 space-y-2"
            >
              <h3 className="text-sm font-medium text-foreground">
                {interest.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {interest.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* featured projects */}
      <section className="space-y-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-medium text-foreground">
            featured projects
          </h2>
          <Link href="/projects" className="text-sm">
            all projects &rarr;
          </Link>
        </div>
        <div className="space-y-4">
          {featured.map((project) => (
            <div
              key={project.slug}
              className="rounded-lg border border-border bg-card p-6 space-y-3"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-medium text-foreground">{project.title}</h3>
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
      </section>
    </div>
  );
}
