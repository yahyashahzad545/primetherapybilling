import prisma from "@/libs/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { slug: string } }) {
  try {
    const blog = await prisma.blog.findFirst({
      where: {
        slug: params.slug,
      },
    });

    console.log("Slug:", params.slug);
    console.log("Blog:", blog);

    if (!blog) return notFound();

    return (
      <div style={{ padding: "40px" }}>
        <h1>{blog.title}</h1>

        <div
          dangerouslySetInnerHTML={{
            __html: blog.content || "",
          }}
        />
      </div>
    );
  } catch (error) {
    console.error("BLOG DETAIL ERROR:", error);

    return (
      <div style={{ padding: "40px" }}>
        <h1>Error loading blog</h1>
        <p>Check server logs</p>
      </div>
    );
  }
}