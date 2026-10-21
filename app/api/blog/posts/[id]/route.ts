import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { cleanPost, isDuplicateSlug } from "@/libs/blogPost";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

// GET: one post, to load it into the editor
export async function GET(_req: Request, { params }: Ctx) {
  const { id } = await params;
  const post = await prisma.blog.findUnique({ where: { id } });
  if (!post) return NextResponse.json({ error: "Post not found." }, { status: 404 });
  return NextResponse.json({ post });
}

// PUT: save changes to an existing post
export async function PUT(req: Request, { params }: Ctx) {
  const { id } = await params;
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const existing = await prisma.blog.findUnique({ where: { id }, select: { publishedAt: true } });
  if (!existing) return NextResponse.json({ error: "Post not found." }, { status: 404 });

  const { post, error } = cleanPost(body);
  if (!post) return NextResponse.json({ error }, { status: 400 });

  const now = new Date();
  try {
    const updated = await prisma.blog.update({
      where: { id },
      data: {
        ...post,
        // keep the first publish date; set it the first time a draft is published
        publishedAt: post.publishedAt ?? existing.publishedAt ?? (post.status === "published" ? now : null),
        lastModifiedAt: post.lastModifiedAt ?? now,
      },
    });
    return NextResponse.json({ post: updated });
  } catch (e) {
    if (isDuplicateSlug(e)) return NextResponse.json({ error: "Another post already uses this URL slug." }, { status: 409 });
    console.error("Blog update failed:", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "Couldn't save the post. Please try again." }, { status: 500 });
  }
}
