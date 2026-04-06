export const runtime = "nodejs";
import prisma from "@/libs/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const blog = await prisma.blog.findUnique({
    where: {
      slug: params.slug,
    },
  });

  if (!blog) return notFound();

  return (
    <div>
      {/* ✅ HERO SECTION */}
      <div
        style={{
          background: "linear-gradient(to right, #2e7d6b, #3aa88f)",
          color: "white",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>
          {blog.title}
        </h1>
        <p style={{ marginTop: "10px" }}>
          Category: {blog.category || "Medical Coding"}
        </p>
      </div>

      {/* ✅ MAIN LAYOUT */}
      <div
        style={{
          display: "flex",
          gap: "30px",
          padding: "40px",
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        {/* ✅ LEFT CONTENT */}
        <div style={{ flex: 3 }}>
          {/* Featured Image */}
          {blog.featuredImg && (
            <img
              src={blog.featuredImg}
              alt={blog.imgAlt || blog.title}
              style={{
                width: "100%",
                borderRadius: "12px",
                marginBottom: "20px",
              }}
            />
          )}

          {/* Meta Info */}
          <p style={{ marginBottom: "10px", color: "#666" }}>
            Posted By: {blog.author || "Admin"} |{" "}
            {new Date(blog.createdAt).toDateString()}
          </p>

          {/* CONTENT */}
          <div
            style={{
              lineHeight: "1.8",
              fontSize: "16px",
            }}
            dangerouslySetInnerHTML={{
              __html: blog.content || "",
            }}
          />
        </div>

        {/* ✅ RIGHT SIDEBAR */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>Get Free Consultation</h3>

            <input placeholder="Name" style={inputStyle} />
            <input placeholder="Email" style={inputStyle} />
            <input placeholder="Phone" style={inputStyle} />
            <textarea placeholder="Message" style={inputStyle} />

            <button
              style={{
                marginTop: "10px",
                width: "100%",
                background: "#2e7d6b",
                color: "white",
                padding: "10px",
                borderRadius: "6px",
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  border: "1px solid #ccc",
  borderRadius: "6px",
};