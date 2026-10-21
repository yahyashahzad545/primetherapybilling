import { marked } from "marked";

// Blog posts are written in Markdown (GitHub style: tables, lists, bold, links, images).
// The editor's Preview and the public post page both render through this one function,
// so what the admin previews is exactly what gets published.
marked.setOptions({ gfm: true, breaks: false });

export function renderMarkdown(markdown: string): string {
  return marked.parse(markdown || "", { async: false }) as string;
}
