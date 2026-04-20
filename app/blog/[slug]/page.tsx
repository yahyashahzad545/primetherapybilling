export const runtime = "nodejs";

import prisma from "@/libs/prisma";
import { notFound } from "next/navigation";

// ✅ SEO (Meta Title & Description - page par show nahi honge)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blog = await prisma.blog.findFirst({
    where: {
      slug: {
        equals: slug,
        mode: "insensitive",
      },
    },
  });

  if (!blog) return {};

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || "",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug) return notFound();

  let blog;

  try {
    blog = await prisma.blog.findFirst({
      where: {
        slug: {
          equals: slug,
          mode: "insensitive",
        },
      },
    });
  } catch (error) {
    return notFound();
  }

  if (!blog) return notFound();

  return (
    <div>
      {/* ✅ Table Styles for Blog Content */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .blog-content table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
              font-size: 15px;
            }
            .blog-content table thead {
              background-color: #2e7d6b;
              color: #ffffff;
            }
            .blog-content table th,
            .blog-content table td {
              border: 1px solid #ddd;
              padding: 12px 15px;
              text-align: left;
            }
            .blog-content table th {
              font-weight: 600;
            }
            .blog-content table tbody tr:nth-child(even) {
              background-color: #f9f9f9;
            }
            .blog-content table tbody tr:hover {
              background-color: #f1f1f1;
            }
          `,
        }}
      />

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
            className="blog-content"
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
          {/* CTA BOX */}
          <div
            style={{
              background: "#2e7d6b",
              color: "white",
              padding: "20px",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            <h3>Certified Medical Billing Services</h3>
            <p style={{ fontSize: "14px", marginTop: "10px" }}>
              Improve claim accuracy and maximize reimbursements.
            </p>

            <button
              style={{
                marginTop: "10px",
                background: "white",
                color: "#2e7d6b",
                padding: "10px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Get Billing Quote
            </button>
          </div>

          {/* FORM */}
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
                border: "none",
                cursor: "pointer",
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

// ✅ Reusable input style
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  border: "1px solid #ccc",
  borderRadius: "6px",
};
