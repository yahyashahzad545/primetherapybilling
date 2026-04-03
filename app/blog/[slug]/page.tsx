export const dynamic = "force-dynamic";
import prisma from "@/libs/prisma";
import { notFound } from "next/navigation";

// ✅ stable ISR
export const revalidate = 10;

export default async function BlogDetail({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;

  if (!slug) return notFound();

  let blog;

  try {
    blog = await prisma.blog.findUnique({
      where: { slug },
    });

    console.log("BLOG DETAIL:", blog); // debug
  } catch (error) {
    console.error("DB Error:", error);
    return notFound(); // crash avoid
  }

  if (!blog) return notFound();

  return (
    <div className="max-w-3xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold mb-6">
        {blog.title}
      </h1>

      <p className="text-gray-500 mb-4">
        {new Date(blog.createdAt).toDateString()}
      </p>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
}