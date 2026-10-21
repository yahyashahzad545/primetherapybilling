import { NextResponse } from "next/server";
import { ADMIN_COOKIE, SESSION_SECONDS, adminConfigured, createSessionToken, passwordMatches } from "@/libs/adminAuth";

export async function POST(req: Request) {
  if (!adminConfigured()) {
    return NextResponse.json({ error: "Admin sign-in is not set up yet. Add ADMIN_PASSWORD to the .env file." }, { status: 503 });
  }

  const body = await req.json().catch(() => ({}));
  // A short delay on every attempt slows down password guessing
  await new Promise((r) => setTimeout(r, 400));
  if (!(await passwordMatches(String(body?.password ?? "")))) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set(ADMIN_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_SECONDS,
  });
  return res;
}
