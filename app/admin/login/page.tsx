"use client";

import { Suspense, useState } from "react";
import type { FormEvent } from "react";
import { useSearchParams } from "next/navigation";

const FONTS =
  "https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Google+Sans:wght@400;500;600&display=swap";

function LoginForm() {
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error || "Couldn't sign in.");
      setLoading(false);
      return;
    }
    // Only follow same-site paths after signing in
    const next = params.get("next");
    window.location.assign(next && next.startsWith("/") && !next.startsWith("//") ? next : "/admin/blog/create");
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[400px] rounded-2xl bg-white p-8 shadow-[0_12px_36px_rgba(89,30,96,0.12)]">
      <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#d95959]">Admin</span>
      <h1 className="font-heading mt-2 text-[28px] font-extrabold leading-tight text-[#591e60]">Sign in</h1>
      <p className="mt-1 text-[14px] text-[#6b5a70]">Enter the admin password to manage the blog.</p>

      <label htmlFor="admin-password" className="mt-6 block text-[13px] font-semibold text-[#591e60]">
        Password
      </label>
      <input
        id="admin-password"
        type="password"
        autoComplete="current-password"
        autoFocus
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-1.5 h-11 w-full rounded-lg border border-[#e3d6e6] bg-white px-3 text-[15px] text-[#2d1b36] outline-none transition-colors focus:border-[#591e60] focus:ring-2 focus:ring-[#591e60]/15"
      />
      {error && <p role="alert" className="mt-3 text-[13px] font-medium text-[#c0392b]">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 h-11 w-full cursor-pointer rounded-lg bg-[#591e60] text-[15px] font-semibold text-white disabled:cursor-wait disabled:opacity-70"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fbf6fa] px-4 pt-[120px] pb-16" style={{ fontFamily: "'Google Sans', sans-serif" }}>
      <link rel="stylesheet" href={FONTS} precedence="default" />
      <style>{`.font-heading { font-family: "Montserrat", sans-serif; }`}</style>
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
