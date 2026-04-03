export const dynamic = "force-dynamic";
import prisma from "@/libs/prisma";
import { notFound } from "next/navigation";

export default async function BlogDetail({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) return notFound();

  const blog = await prisma.blog.findUnique({
    where: { slug },
  });

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