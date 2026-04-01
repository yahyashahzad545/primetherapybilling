export const dynamic = "force-dynamic";
import prisma from "@/libs/prisma";
import Link from "next/link";

export default async function BlogPage() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-center mb-12">
        Our Latest Blog
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
          >
            {/* Image */}
            {blog.featuredImg && (
              <img
                src={blog.featuredImg}
                alt={blog.imgAlt || blog.title}
                className="w-full h-48 object-cover"
              />
            )}

            {/* Content */}
            <div className="p-5">
              <h2 className="text-lg font-semibold mb-2 text-green-700">
                {blog.title}
              </h2>

              <p className="text-gray-600 text-sm mb-4">
                {blog.content.replace(/<[^>]+>/g, "").substring(0, 120)}...
              </p>

              <Link href={`/blog/${blog.slug}`}>
                <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition">
                  Read More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}