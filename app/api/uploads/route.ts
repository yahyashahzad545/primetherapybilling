import { NextResponse } from "next/server";
import sharp from "sharp";

// Image uploads for the blog editor (featured images, author photos, images inside posts).
// Every image is converted to WebP (max 1600px wide; author photos 400px) and stored in a public
// Supabase Storage bucket, so it works on any host. Only signed-in admins reach this route (proxy.ts).
export const runtime = "nodejs";

const BUCKET = "blog-images";
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];

function supabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? { url, key } : null;
}

// Creates the public bucket the first time it's needed ("already exists" is fine)
async function ensureBucket(url: string, key: string) {
  const res = await fetch(`${url}/storage/v1/bucket`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, apikey: key, "Content-Type": "application/json" },
    body: JSON.stringify({ id: BUCKET, name: BUCKET, public: true, file_size_limit: MAX_BYTES, allowed_mime_types: ["image/webp"] }),
  });
  if (!res.ok && res.status !== 409) {
    const text = await res.text();
    if (!/already exists|Duplicate/i.test(text)) throw new Error(`Bucket setup failed (${res.status})`);
  }
}

export async function POST(req: Request) {
  const supabase = supabaseConfig();
  if (!supabase) {
    return NextResponse.json({ error: "Image storage isn't configured (Supabase URL or service key missing)." }, { status: 503 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const kind = formData.get("kind") === "author" ? "author" : "post";

    if (!(file instanceof File)) return NextResponse.json({ error: "No image was uploaded." }, { status: 400 });
    if (!ALLOWED.includes(file.type)) return NextResponse.json({ error: "Use a JPG, PNG, WebP, GIF or AVIF image." }, { status: 400 });
    if (file.size === 0 || file.size > MAX_BYTES) return NextResponse.json({ error: "Images must be under 10 MB." }, { status: 400 });

    const input = Buffer.from(await file.arrayBuffer());
    const webp = await sharp(input)
      .rotate()
      .resize(kind === "author" ? { width: 400, height: 400, fit: "cover" } : { width: 1600, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();

    // Safe, unique object name: lowercase letters, digits and dashes from the original name
    const base = file.name.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "image";
    const objectPath = `${kind}/${base}-${Date.now()}.webp`;

    await ensureBucket(supabase.url, supabase.key);
    const upload = await fetch(`${supabase.url}/storage/v1/object/${BUCKET}/${objectPath}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${supabase.key}`,
        apikey: supabase.key,
        "Content-Type": "image/webp",
        "Cache-Control": "31536000",
        "x-upsert": "false",
      },
      body: new Uint8Array(webp),
    });
    if (!upload.ok) {
      console.error("Supabase upload failed:", upload.status, await upload.text());
      return NextResponse.json({ error: "The image couldn't be stored. Please try again." }, { status: 502 });
    }

    const url = `${supabase.url}/storage/v1/object/public/${BUCKET}/${objectPath}`;
    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error("Upload error:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "The image couldn't be processed. Please try another file." }, { status: 500 });
  }
}
