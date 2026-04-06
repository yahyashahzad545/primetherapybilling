import prisma from "@/libs/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page({ params }: any) {
  const blog = await prisma.blog.findFirst({
    where: {
      slug: params.slug,
    },
  });

  if (!blog) return notFound();

  return (
    <div>
      <h1>{blog.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  );
}