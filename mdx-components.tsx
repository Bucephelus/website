import type { MDXComponents } from "mdx/types";
import { ImageLightbox } from "@/app/components/image-lightbox";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <h1
        className="mt-10 mb-4 text-2xl font-semibold tracking-tight text-foreground"
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className="mt-8 mb-3 text-xl font-semibold tracking-tight text-foreground"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="mt-6 mb-2 text-lg font-medium text-foreground"
        {...props}
      />
    ),
    p: (props) => (
      <p className="mb-4 leading-relaxed text-foreground/90" {...props} />
    ),
    a: (props) => (
      <a
        className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
        {...props}
      />
    ),
    ul: (props) => (
      <ul className="mb-4 ml-6 list-disc space-y-1 text-foreground/90" {...props} />
    ),
    ol: (props) => (
      <ol className="mb-4 ml-6 list-decimal space-y-1 text-foreground/90" {...props} />
    ),
    li: (props) => <li className="leading-relaxed" {...props} />,
    blockquote: (props) => (
      <blockquote
        className="mb-4 border-l-2 border-accent pl-4 italic text-muted"
        {...props}
      />
    ),
    code: (props) => (
      <code
        className="rounded bg-card px-1.5 py-0.5 font-mono text-sm text-foreground"
        {...props}
      />
    ),
    pre: (props) => (
      <pre
        className="mb-4 overflow-x-auto rounded-lg border border-border bg-card p-4 text-sm"
        {...props}
      />
    ),
    table: (props) => (
      <div className="mb-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm" {...props} />
      </div>
    ),
    th: (props) => (
      <th
        className="border border-border bg-card px-3 py-2 text-left font-medium text-foreground"
        {...props}
      />
    ),
    td: (props) => (
      <td className="border border-border px-3 py-2 text-foreground/90" {...props} />
    ),
    hr: (props) => <hr className="my-8 border-border" {...props} />,
    img: (props) => <ImageLightbox {...props} />,
    ...components,
  };
}
