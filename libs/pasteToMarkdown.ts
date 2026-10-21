import TurndownService from "turndown";
// @ts-expect-error -- the plugin ships without type definitions
import { gfm } from "turndown-plugin-gfm";

// Converts rich text pasted from Google Docs or Word (HTML on the clipboard) into Markdown,
// keeping headings, bold/italic, lists, links and tables.
const turndown = new TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
  emDelimiter: "*",
});
turndown.use(gfm);

// Google Docs wraps everything in <b style="font-weight:normal"> — unwrap it so the whole paste isn't bold
turndown.addRule("googleDocsWrapper", {
  filter: (node) => node.nodeName === "B" && /font-weight:\s*normal/i.test(node.getAttribute("style") || ""),
  replacement: (content) => content,
});
// Inline spans styled bold/italic (Docs and Word style text this way instead of <b>/<i>)
turndown.addRule("styledSpans", {
  filter: (node) => node.nodeName === "SPAN" && /font-weight:\s*(700|bold)|font-style:\s*italic/i.test(node.getAttribute("style") || ""),
  replacement: (content, node) => {
    const style = (node as HTMLElement).getAttribute("style") || "";
    const trimmed = content.trim();
    if (!trimmed) return content;
    let out = trimmed;
    if (/font-style:\s*italic/i.test(style)) out = `*${out}*`;
    if (/font-weight:\s*(700|bold)/i.test(style)) out = `**${out}**`;
    return content.replace(trimmed, out);
  },
});
// Word/Docs clutter that has no Markdown meaning
turndown.remove(["style", "script", "meta", "title"]);

export function htmlToMarkdown(html: string): string {
  return turndown
    .turndown(html)
    .replace(/ /g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
