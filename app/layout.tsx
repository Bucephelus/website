import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Nav from "./components/nav";
import PacmanBg from "./components/pacman-bg";
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

const themeScript = `
  (function() {
    var t = localStorage.getItem('theme');
    if (t) {
      document.documentElement.setAttribute('data-theme', t);
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PacmanBg />
        <header className="sticky top-0 z-50 border-b border-border backdrop-blur-md bg-background/80">
          <Nav />
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
