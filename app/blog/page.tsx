export const dynamic = "force-dynamic";
import prisma from "@/libs/prisma";
import Link from "next/link";

export default async function BlogPage() {
  let blogs: any[] = []; // 

  try {
    blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("DB ERROR:", error);
  }

  return (
    <div className="max-w-5xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Our Blog
      </h1>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">
          No blogs found.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <Link key={blog.id} href={`/blog/${blog.slug}`}>
              <div className="p-6 shadow-lg rounded-lg hover:shadow-xl">
                <h2 className="text-xl font-semibold mb-2">
                  {blog.title}
                </h2>
                <p className="text-gray-600">
                  {blog.content.substring(0, 120)}...
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}