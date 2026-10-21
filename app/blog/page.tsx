export const runtime = "nodejs";

import prisma from "@/libs/prisma";
import Link from "next/link";
import { Blog } from "@prisma/client";
import { renderMarkdown } from "@/libs/markdown";

export const revalidate = 10;

export default async function BlogPage() {
  let blogs: Blog[] = [];

  try {
    blogs = await prisma.blog.findMany({
      where: { status: { not: "draft" } },
      orderBy: { createdAt: "desc" },
    });
  } catch (error: any) {
    console.error("❌ DB ERROR:", error.message);

    // ❗ IMPORTANT: DB fail ho to fallback empty array
    blogs = [];
  }

  return (
    <div className="min-h-screen bg-white text-[#171717]">
      <div className="max-w-7xl mx-auto py-16 px-6 pt-32">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#591e60]">
          Our Latest Blog
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <div
                key={blog.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
              >
                {blog.featuredImg && (
                  <Link href={`/blog/${blog.slug}`}>
                    <img
                      src={blog.featuredImg}
                      alt={blog.imgAlt || blog.title}
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      decoding="async"
                      className="w-full h-48 object-cover cursor-pointer"
                    />
                  </Link>
                )}

                <div className="p-5">
                  <Link href={`/blog/${blog.slug}`}>
                    <h2 className="text-lg font-semibold mb-2 text-[#591e60] cursor-pointer hover:underline">
                      {blog.title}
                    </h2>
                  </Link>

                  <p className="text-gray-700 text-sm mb-4">
                    {/* Plain-text excerpt: rendered Markdown with the tags removed */}
                    {renderMarkdown(blog.content || "")
                      .replace(/<[^>]+>/g, " ")
                      .replace(/&[a-z#0-9]+;/gi, " ")
                      .replace(/\s+/g, " ")
                      .trim()
                      .substring(0, 120)}
                    ...
                  </p>

                  {blog.slug && (
                    <Link href={`/blog/${blog.slug}`}>
                      <button className="bg-[#591e60] text-white px-4 py-2 rounded-full hover:bg-[#45134b] transition">
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
    </div>
  );
}
