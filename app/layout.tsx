import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "jason mclaren — researcher",
  description:
    "phd researcher in data-driven engineering and science at the university of bristol.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="sticky top-0 z-50 border-b border-border backdrop-blur-md bg-background/80">
          <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
            <Link href="/" className="font-medium text-foreground no-underline hover:no-underline">
              bucephelus
            </Link>
            <div className="flex gap-6 text-sm">
              <Link href="/" className="text-muted hover:text-foreground transition-colors">
                home
              </Link>
              <Link href="/projects" className="text-muted hover:text-foreground transition-colors">
                projects
              </Link>
            </div>
          </nav>
        </header>

        <main className="mx-auto max-w-3xl px-6 py-16">{children}</main>

        <footer className="border-t border-border">
          <div className="mx-auto max-w-3xl px-6 py-8 text-sm text-muted">
            <a href="mailto:qu21443@bristol.ac.uk">qu21443@bristol.ac.uk</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
