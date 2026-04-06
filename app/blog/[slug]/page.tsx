export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import prisma from "@/libs/prisma";
import { notFound } from "next/navigation";

export const revalidate = 10;

export default async function BlogDetail({
  params,
}: {
  params: { slug: string };
}) {
  // ✅ FIX HERE
  const slug = decodeURIComponent(params.slug).trim();

  if (!slug) return notFound();

  let blog;

  try {
  console.log("DB URL:", process.env.DATABASE_URL);

  blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });

  console.log("BLOGS LIST:", blogs);
} catch (error) {
  console.error("Prisma Error:", error);
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