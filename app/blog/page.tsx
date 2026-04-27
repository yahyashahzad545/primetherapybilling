export const runtime = "nodejs";

import prisma from "@/libs/prisma";
import Link from "next/link";
import { Blog } from "@prisma/client";

export const revalidate = 10;

export default async function BlogPage() {
  let blogs: Blog[] = [];

  try {
    blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Debug (remove later)
    console.log("DB URL:", process.env.DATABASE_URL);
  } catch (error: any) {
    console.error("❌ DB ERROR:", error.message);

    // ❗ IMPORTANT: DB fail ho to fallback empty array
    blogs = [];
  }

  return (
    <div className="max-w-7xl mx-auto py-16 px-6 pt-32">
      <h1 className="text-4xl font-bold text-center mb-12">
        Our Latest Blog
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >
              {blog.featuredImg && (
                <Link href={`/blog/${blog.slug}`}>
                  <img
                    src={blog.featuredImg}
                    alt={blog.imgAlt || blog.title}
                    className="w-full h-48 object-cover cursor-pointer"
                  />
                </Link>
              )}

              <div className="p-5">
                <Link href={`/blog/${blog.slug}`}>
                  <h2 className="text-lg font-semibold mb-2 text-green-700 cursor-pointer hover:underline">
                    {blog.title}
                  </h2>
                </Link>

                <p className="text-gray-600 text-sm mb-4">
                  {blog.content
                    ?.replace(/<[^>]+>/g, "")
                    .substring(0, 120)}
                  ...
                </p>

                {blog.slug && (
                  <Link href={`/blog/${blog.slug}`}>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition">
                      Read More
                    </button>
                  </Link>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">
            No blogs found or database not connected
          </p>
        )}
      </div>
    </div>
  );
}