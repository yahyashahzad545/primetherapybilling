import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { cleanPost, isDuplicateSlug } from "@/libs/blogPost";

export const dynamic = "force-dynamic";

// GET: every post (drafts too) for the editor's "Post" picker, newest first
export async function GET() {
  const posts = await prisma.blog.findMany({
    select: { id: true, title: true, slug: true, status: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ posts });
}

// POST: create a post (as a draft or published)
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const { post, error } = cleanPost(body);
  if (!post) return NextResponse.json({ error }, { status: 400 });

  const now = new Date();
  try {
    const created = await prisma.blog.create({
      data: {
        ...post,
        publishedAt: post.publishedAt ?? (post.status === "published" ? now : null),
        lastModifiedAt: post.lastModifiedAt ?? now,
      },
    });
    return NextResponse.json({ post: created });
  } catch (e) {
    if (isDuplicateSlug(e)) return NextResponse.json({ error: "Another post already uses this URL slug." }, { status: 409 });
    console.error("Blog create failed:", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "Couldn't save the post. Please try again." }, { status: 500 });
  }
}
