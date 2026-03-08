"use client";

import Link from "next/link";

import ThemeToggle from "./theme-toggle";

const links = [
  { href: "/", label: "home" },
  { href: "/projects", label: "projects" },
  { href: "/notes", label: "notes" },
];

export default function Nav() {
  return (
    <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
      <Link href="/" className="font-medium text-foreground no-underline hover:no-underline">
        bucephelus
      </Link>
      <div className="flex items-center gap-6 text-sm">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-muted hover:text-foreground transition-colors"
          >
            {label}
          </Link>
        ))}
        <ThemeToggle />
      </div>
    </nav>
  );
}
