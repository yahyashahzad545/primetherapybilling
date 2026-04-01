export const dynamic = "force-dynamic";
import prisma from "@/libs/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        slug: body.slug,
        metaTitle: body.metaTitle,
        metaDescription: body.metaDescription,
        content: body.content,
        featuredImg: body.featuredImg,
        imgAlt: body.imgAlt,
        author: body.author,
        category: body.category,
      },
    });

    return Response.json(blog);
  } catch (error) {
    console.log(error);
    return new Response("Error creating blog", { status: 500 });
  }
}