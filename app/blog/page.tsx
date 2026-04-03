export const dynamic = "force-dynamic";

import prisma from "@/libs/prisma";
import Link from "next/link";
import { unstable_noStore } from "next/cache";
import { Blog } from "@prisma/client";

export default async function BlogPage() {
  unstable_noStore();

  let blogs: Blog[] = [];

  try {
    blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Prisma Error:", error);
    blogs = [];
  }

  return (
    <div className="max-w-7xl mx-auto py-16 px-6">
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
                <img
                  src={blog.featuredImg}
                  alt={blog.imgAlt || blog.title}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-5">
                <h2 className="text-lg font-semibold mb-2 text-green-700">
                  {blog.title}
                </h2>

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
            No blogs found
          </p>
        )}
      </div>
    </div>
  );
}