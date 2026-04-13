export const dynamic = "force-dynamic";
import prisma from "@/libs/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Function to process content and preserve table formatting and paragraph spacing
    const processContent = (content: string) => {
      if (!content) return content;

      // Check if content contains table markdown syntax
      const hasTable = content.includes("|");

      if (hasTable) {
        // Convert markdown tables to HTML tables
        const processedContent = content.replace(
          /(\|[^\n]+\|\n)((?:\|[-:]+[-| :]*\|\n))((?:\|[^\n]+\|\n?)*)/g,
          (match: string, header: string, separator: string, rows: string) => {
            // Process header row
            const headerCells = header
              .split("|")
              .filter((cell: string) => cell.trim() !== "")
              .map(
                (cell: string) =>
                  `<th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; text-align: left;">${cell.trim()}</th>`
              )
              .join("");

            // Process data rows
            const dataRows = rows
              .split("\n")
              .filter((row: string) => row.trim() !== "")
              .map((row: string) => {
                const cells = row
                  .split("|")
                  .filter((cell: string) => cell.trim() !== "")
                  .map(
                    (cell: string) =>
                      `<td style="border: 1px solid #ddd; padding: 8px;">${cell.trim()}</td>`
                  )
                  .join("");
                return `<tr>${cells}</tr>`;
              })
              .join("");

            return `
              <table style="border-collapse: collapse; width: 100%; margin: 16px 0;">
                <thead>
                  <tr>${headerCells}</tr>
                </thead>
                <tbody>
                  ${dataRows}
                </tbody>
              </table>
            `;
          }
        );

        // Add automatic paragraph spacing to non-table content
        const finalContent = processedContent
          .split("\n")
          .map((line: string) => {
            // Skip lines that are part of HTML table tags
            if (
              line.trim().startsWith("<table") ||
              line.trim().startsWith("</table") ||
              line.trim().startsWith("<thead") ||
              line.trim().startsWith("</thead") ||
              line.trim().startsWith("<tbody") ||
              line.trim().startsWith("</tbody") ||
              line.trim().startsWith("<tr") ||
              line.trim().startsWith("</tr") ||
              line.trim().startsWith("<th") ||
              line.trim().startsWith("</th") ||
              line.trim().startsWith("<td") ||
              line.trim().startsWith("</td")
            ) {
              return line;
            }
            // Wrap non-empty, non-table lines in paragraph tags
            if (line.trim() !== "") {
              return `<p style="margin-bottom: 16px;">${line.trim()}</p>`;
            }
            return line;
          })
          .join("\n");

        return finalContent;
      }

      // Add automatic paragraph spacing for content without tables
      const contentWithParagraphs = content
        .split("\n")
        .map((line: string) => {
          // Wrap non-empty lines in paragraph tags
          if (line.trim() !== "") {
            return `<p style="margin-bottom: 16px;">${line.trim()}</p>`;
          }
          return line;
        })
        .join("\n");

      return contentWithParagraphs;
    };

    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        slug: body.slug,
        metaTitle: body.metaTitle,
        metaDescription: body.metaDescription,
        content: processContent(body.content),
        featuredImg: body.featuredImg,
        imgAlt: body.imgAlt,
        author: body.author,
        category: body.category,
      },
    });

    return Response.json(blog);
  } catch (error) {
    console.log(error);
    return new Response("Error creating blog", { status: 500 });
  }
}