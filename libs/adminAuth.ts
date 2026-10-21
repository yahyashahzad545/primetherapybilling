// Admin session for the blog editor.
// One shared password (ADMIN_PASSWORD in .env). Signing in sets an http-only cookie holding
// "<expiry>.<signature>", signed with HMAC-SHA256. The key is ADMIN_SESSION_SECRET if set,
// otherwise ADMIN_PASSWORD, so changing the password signs everyone out.
// Uses Web Crypto only, so it runs in proxy.ts and in route handlers alike.

export const ADMIN_COOKIE = "ptb_admin";
export const SESSION_SECONDS = 60 * 60 * 24 * 7; // 7 days

const encoder = new TextEncoder();

function signingKey(): string | null {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || null;
}

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

async function hmac(message: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, "0")).join("");
}

// Compares two strings in constant time for equal lengths
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function passwordMatches(input: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || typeof input !== "string") return false;
  // Hash both so the comparison doesn't depend on length
  const [a, b] = await Promise.all([hmac(input, "pw-compare"), hmac(expected, "pw-compare")]);
  return safeEqual(a, b);
}

export async function createSessionToken(): Promise<string> {
  const secret = signingKey();
  if (!secret) throw new Error("ADMIN_PASSWORD is not set");
  const expires = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  return `${expires}.${await hmac(String(expires), secret)}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  const secret = signingKey();
  if (!secret || !token) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature || !/^\d+$/.test(expires)) return false;
  if (Number(expires) < Math.floor(Date.now() / 1000)) return false;
  return safeEqual(signature, await hmac(expires, secret));
}
