export const runtime = "nodejs";

import prisma from "@/libs/prisma";
import { notFound } from "next/navigation";
import { renderMarkdown } from "@/libs/markdown";
import AuthorBox from "@/components/blog/AuthorBox";
import AboutAuthor from "@/components/blog/AboutAuthor";
import type { Metadata } from "next";
import type { Blog } from "@prisma/client";
import { ORGANIZATION_ID, PageSchema, absoluteUrl, pageMetadata } from "@/libs/seo";

// The post's search details: its meta title and description, or its title and opening text
function postDetails(blog: Blog) {
  const opening = (blog.content || "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`|~-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const description = blog.metaDescription || (opening.length > 155 ? `${opening.slice(0, 152).replace(/\s+\S*$/, "")}...` : opening);
  return {
    title: blog.metaTitle || `${blog.title} | Prime Therapy Billing`,
    description,
    path: `/blog/${blog.slug}`,
    published: (blog.publishedAt ?? blog.createdAt).toISOString(),
    modified: (blog.lastModifiedAt ?? blog.publishedAt ?? blog.createdAt).toISOString(),
  };
}

// ✅ SEO (Meta Title & Description - page par show nahi honge)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const blog = await prisma.blog.findFirst({
    where: {
      slug: {
        equals: slug,
        mode: "insensitive",
      },
      status: { not: "draft" },
    },
  });

  if (!blog) return {};

  const details = postDetails(blog);
  const metadata = pageMetadata({ ...details, type: "article", image: blog.featuredImg || undefined });
  return {
    ...metadata,
    authors: blog.author ? [{ name: blog.author }] : undefined,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: details.published,
      modifiedTime: details.modified,
      ...(blog.author ? { authors: [blog.author] } : {}),
      ...(blog.category ? { section: blog.category } : {}),
    },
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
        status: { not: "draft" },
      },
    });
  } catch (error) {
    return notFound();
  }

  if (!blog) return notFound();

  const details = postDetails(blog);

  return (
    <div>
      <PageSchema
        {...details}
        crumbs={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: blog.title, path: details.path }]}
        extra={[{
          "@type": "BlogPosting",
          "@id": `${absoluteUrl(details.path)}#article`,
          headline: blog.title,
          description: details.description,
          mainEntityOfPage: { "@id": `${absoluteUrl(details.path)}#webpage` },
          datePublished: details.published,
          dateModified: details.modified,
          ...(blog.featuredImg ? { image: blog.featuredImg } : {}),
          ...(blog.category ? { articleSection: blog.category } : {}),
          author: blog.author
            ? { "@type": "Person", name: blog.author, ...(blog.authorLinkedin ? { sameAs: [blog.authorLinkedin] } : {}) }
            : { "@id": ORGANIZATION_ID },
          publisher: { "@id": ORGANIZATION_ID },
          inLanguage: "en-US",
        }]}
      />
      {/* ✅ HERO SECTION */}
      <div
        style={{
          background: "linear-gradient(to right, #45134b, #591e60)",
          color: "white",
          padding: "40px",
          paddingTop: "130px",
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
              fetchPriority="high"
              decoding="async"
              style={{
                width: "100%",
                borderRadius: "12px",
                marginBottom: "20px",
              }}
            />
          )}

          {/* Author and dates */}
          <AuthorBox blog={blog} />

          {/* CONTENT */}
          <div
            className="blog-content"
            style={{
              lineHeight: "1.8",
              fontSize: "16px",
            }}
            dangerouslySetInnerHTML={{
              __html: renderMarkdown(blog.content || ""),
            }}
          />

          {/* About the author, at the end of the post */}
          <AboutAuthor blog={blog} />
        </div>

        {/* ✅ RIGHT SIDEBAR */}
        <div style={{ flex: 1 }}>
          {/* CTA BOX */}
          <div
            style={{
              background: "#591e60",
              color: "white",
              padding: "20px",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            <h3 className="text-[22px]">Certified Medical Billing Services</h3>
            <p style={{ fontSize: "14px", marginTop: "10px" }}>
              Improve claim accuracy and maximize reimbursements.
            </p>

            <button
              type="button"
              data-lead-popup
              data-popup-heading="Get Your Billing Quote"
              data-popup-description="Tell us about your practice and we'll put together a quote built around your collections."
              data-popup-source="Blog sidebar — Get Billing Quote"
              style={{
                marginTop: "10px",
                background: "white",
                color: "#591e60",
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
            <h3 className="text-[22px]">Get Free Consultation</h3>

            <input placeholder="Name" style={inputStyle} />
            <input placeholder="Email" style={inputStyle} />
            <input type="tel" placeholder="Phone" style={inputStyle} />
            <textarea placeholder="Message" style={inputStyle} />

            <button
              style={{
                marginTop: "10px",
                width: "100%",
                background: "#591e60",
                color: "white",
                padding: "10px",
                borderRadius: "8px",
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
  borderRadius: "8px",
};
