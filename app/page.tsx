import { bio, researchInterests } from "@/lib/data";

export default function Home() {
  return (
    <div className="space-y-20">
      {/* hero / bio */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-foreground via-accent to-foreground bg-[length:200%_auto] bg-clip-text text-transparent animate-shimmer">
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
        <div className="grid gap-4 sm:grid-cols-2">
          {researchInterests.map((interest) => (
            <div
              key={interest.title}
              className="rounded-lg border border-border bg-card p-4 space-y-2 transition-all duration-250 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:border-accent/40 hover:shadow-[0_4px_20px_rgba(167,139,250,0.12)]"
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

    </div>
  );
}
