import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import sharp from "sharp";

// ✅ IMPORTANT: force Node runtime for sharp
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    // ✅ Validate file
    if (!file || typeof file === "string") {
      return NextResponse.json(
        { error: "No valid file uploaded" },
        { status: 400 }
      );
    }

    // ✅ Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // ✅ Extra safety (empty file check)
    if (!buffer || buffer.length === 0) {
      return NextResponse.json(
        { error: "File is empty or corrupted" },
        { status: 400 }
      );
    }

    // ✅ Convert to webp using sharp
    const webpBuffer = await sharp(buffer)
      .webp({ quality: 80 })
      .toBuffer();

    // ✅ Clean filename
    const originalName = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/\s+/g, "-")
      .toLowerCase();

    const filename = `${originalName}-${Date.now()}.webp`;

    // ✅ Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    // ✅ Save file
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, webpBuffer);

    // ✅ Return URL
    const url = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      url,
      filename,
    });

  } catch (error: any) {
    console.error("Upload error:", error);

    return NextResponse.json(
      {
        error: error?.message || "Upload failed",
      },
      { status: 500 }
    );
  }
}