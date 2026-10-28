import { marked } from "marked";
import { altFromSrc } from "@/utils/altFromSrc";

// Blog posts are written in Markdown (GitHub style: tables, lists, bold, links, images).
// The editor's Preview and the public post page both render through this one function,
// so what the admin previews is exactly what gets published.
// An image written without alt text (![](url)) gets one from its file name; uploads are
// saved as "name-<timestamp>.webp", so the timestamp is dropped and dashes become spaces.
marked.setOptions({ gfm: true, breaks: false });
marked.use({
  walkTokens(token) {
    if (token.type === "image" && !token.text.trim()) {
      const file = token.href.split("?")[0].replace(/-\d{10,}(?=\.\w+$)/, "");
      token.text = altFromSrc(file.replace(/[^/]*$/, (name: string) => name.replace(/-/g, " ")));
      token.tokens = [{ type: "text", raw: token.text, text: token.text }];
    }
  },
});

export function renderMarkdown(markdown: string): string {
  return marked.parse(markdown || "", { async: false }) as string;
}
