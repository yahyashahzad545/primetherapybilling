import prisma from "@/libs/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { slug: string } }) {
  const blog = await prisma.blog.findUnique({
    where: {
      slug: params.slug,
    },
  });

  // 🔍 Debug (optional)
  console.log("Slug:", params.slug);
  console.log("Blog:", blog);

  if (!blog) return notFound();

  return (
    <div style={{ padding: "40px" }}>
      <h1>{blog.title}</h1>

      {/* ✅ HTML content render */}
      <div
        dangerouslySetInnerHTML={{
          __html: blog.content || "",
        }}
      />
    </div>
  );
}