"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent, ClipboardEvent, ReactNode } from "react";
import { renderMarkdown } from "@/libs/markdown";
import { htmlToMarkdown } from "@/libs/pasteToMarkdown";

// ─── Admin: publish and edit blog posts ──────────────────────────────────────
// Signed-in admins only (proxy.ts). Posts are written in Markdown; the Preview uses the same renderer
// as the public post page. Images are uploaded through /api/uploads (Supabase Storage).

type PostSummary = { id: string; title: string; slug: string; status: string; createdAt: string };

type Form = {
  title: string;
  slug: string;
  category: string;
  author: string;
  authorImage: string;
  authorLinkedin: string;
  authorEmail: string;
  authorPhone: string;
  authorBio: string;
  publishedAt: string;
  lastModifiedAt: string;
  featuredImg: string;
  imgAlt: string;
  metaTitle: string;
  metaDescription: string;
  content: string;
};

const EMPTY: Form = {
  title: "", slug: "", category: "", author: "", authorImage: "", authorLinkedin: "", authorEmail: "",
  authorPhone: "", authorBio: "", publishedAt: "", lastModifiedAt: "", featuredImg: "", imgAlt: "", metaTitle: "",
  metaDescription: "", content: "",
};

const FONTS =
  "https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Google+Sans:wght@400;500;600;700&display=swap";

const toSlug = (v: string) =>
  v.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/[\s-]+/g, "-");
const toDateInput = (v: string | null | undefined) => (v ? new Date(v).toISOString().slice(0, 10) : "");

const inputClass =
  "h-11 w-full rounded-lg border border-[#e3d6e6] bg-white px-3 text-[14px] text-[#2d1b36] outline-none transition-colors placeholder:text-[#a898ab] focus:border-[#591e60] focus:ring-2 focus:ring-[#591e60]/15";
const smallButton =
  "inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-[#d8c8dc] bg-white px-3 text-[13px] font-semibold text-[#591e60] disabled:cursor-wait disabled:opacity-60";

// ─── Field wrapper: label, control, character count and help text ────────────
function Field({ id, label, count, help, children }: { id: string; label: string; count?: number; help?: ReactNode; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-semibold text-[#591e60]">{label}</label>
      {children}
      <div className="mt-1 flex items-start justify-between gap-3">
        {help ? <p className="text-[12px] leading-snug text-[#7a6a7e]">{help}</p> : <span />}
        {count !== undefined && <span className="shrink-0 text-[11px] text-[#9a8a9e]">{count} characters</span>}
      </div>
    </div>
  );
}

export default function PublishBlogPage() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [slugTouched, setSlugTouched] = useState(false);
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const [saving, setSaving] = useState<"" | "draft" | "published">("");
  const [uploading, setUploading] = useState<"" | "author" | "featured" | "inline">("");
  const [preview, setPreview] = useState(false);
  const [linkPanel, setLinkPanel] = useState(false);
  const [link, setLink] = useState({ text: "", url: "" });

  const contentRef = useRef<HTMLTextAreaElement>(null);
  const authorFileRef = useRef<HTMLInputElement>(null);
  const featuredFileRef = useRef<HTMLInputElement>(null);
  const inlineFileRef = useRef<HTMLInputElement>(null);

  const set = (key: keyof Form, value: string) => setForm((f) => ({ ...f, [key]: value }));
  const onInput = (key: keyof Form) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => set(key, e.target.value);

  const loadPosts = useCallback(async () => {
    const res = await fetch("/api/blog/posts");
    if (res.ok) setPosts((await res.json()).posts);
  }, []);
  useEffect(() => { void loadPosts(); }, [loadPosts]);

  // ─── Post picker ───────────────────────────────────────────────────────────
  async function selectPost(id: string) {
    setMessage(null);
    setPreview(false);
    setSelectedId(id);
    if (!id) {
      setForm(EMPTY);
      setSlugTouched(false);
      setStatus("draft");
      return;
    }
    const res = await fetch(`/api/blog/posts/${id}`);
    if (!res.ok) {
      setMessage({ type: "error", text: "Couldn't load that post." });
      return;
    }
    const p = (await res.json()).post;
    setForm({
      title: p.title ?? "", slug: p.slug ?? "", category: p.category ?? "", author: p.author ?? "",
      authorImage: p.authorImage ?? "", authorLinkedin: p.authorLinkedin ?? "", authorEmail: p.authorEmail ?? "",
      authorPhone: p.authorPhone ?? "", authorBio: p.authorBio ?? "", publishedAt: toDateInput(p.publishedAt), lastModifiedAt: toDateInput(p.lastModifiedAt),
      featuredImg: p.featuredImg ?? "", imgAlt: p.imgAlt ?? "", metaTitle: p.metaTitle ?? "",
      metaDescription: p.metaDescription ?? "", content: p.content ?? "",
    });
    setSlugTouched(true);
    setStatus(p.status === "draft" ? "draft" : "published");
  }

  // ─── Image uploads ─────────────────────────────────────────────────────────
  async function upload(file: File, kind: "author" | "post"): Promise<string | null> {
    const body = new FormData();
    body.append("file", file);
    body.append("kind", kind);
    const res = await fetch("/api/uploads", { method: "POST", body });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.url) {
      setMessage({ type: "error", text: data.error || "Image upload failed." });
      return null;
    }
    return data.url as string;
  }

  async function onAuthorImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading("author");
    const url = await upload(file, "author");
    if (url) set("authorImage", url);
    setUploading("");
  }

  async function onFeaturedImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading("featured");
    const url = await upload(file, "post");
    if (url) set("featuredImg", url);
    setUploading("");
  }

  // ─── Content helpers ───────────────────────────────────────────────────────
  // Inserts text at the cursor (replacing any selection) and puts the cursor after it
  function insertAtCursor(text: string) {
    const el = contentRef.current;
    const start = el?.selectionStart ?? form.content.length;
    const end = el?.selectionEnd ?? form.content.length;
    const next = form.content.slice(0, start) + text + form.content.slice(end);
    set("content", next);
    requestAnimationFrame(() => {
      if (!el) return;
      el.focus();
      el.selectionStart = el.selectionEnd = start + text.length;
    });
  }

  // Images go after the paragraph the cursor is in, as their own block
  async function onInlineImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading("inline");
    const url = await upload(file, "post");
    setUploading("");
    if (!url) return;
    const alt = file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim() || "Blog image";
    const el = contentRef.current;
    const cursor = el?.selectionEnd ?? form.content.length;
    const paragraphEnd = form.content.indexOf("\n\n", cursor);
    const at = paragraphEnd === -1 ? form.content.length : paragraphEnd;
    const block = `\n\n![${alt}](${url})\n\n`;
    set("content", (form.content.slice(0, at).replace(/\s+$/, "") + block + form.content.slice(at).replace(/^\s+/, "")).replace(/^\n+/, ""));
    setMessage({ type: "ok", text: "Image added. Edit the text in [ ] to change its alt text." });
  }

  function insertLink() {
    const url = link.url.trim();
    if (!/^(https?:\/\/|\/|mailto:)/i.test(url)) {
      setMessage({ type: "error", text: "Links should start with https://, / or mailto:" });
      return;
    }
    const el = contentRef.current;
    const selected = el ? form.content.slice(el.selectionStart, el.selectionEnd) : "";
    const text = link.text.trim() || selected || url;
    insertAtCursor(`[${text}](${url})`);
    setLink({ text: "", url: "" });
    setLinkPanel(false);
  }

  // Rich text from Google Docs / Word becomes Markdown; plain text pastes as usual
  function onPaste(e: ClipboardEvent<HTMLTextAreaElement>) {
    const html = e.clipboardData.getData("text/html");
    if (!html) return;
    e.preventDefault();
    insertAtCursor(htmlToMarkdown(html));
  }

  // ─── Save ──────────────────────────────────────────────────────────────────
  async function save(target: "draft" | "published") {
    setSaving(target);
    setMessage(null);
    const res = await fetch(selectedId ? `/api/blog/posts/${selectedId}` : "/api/blog/posts", {
      method: selectedId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, status: target }),
    });
    const data = await res.json().catch(() => ({}));
    setSaving("");
    if (res.status === 401) {
      window.location.assign("/admin/login?next=/admin/blog/create");
      return;
    }
    if (!res.ok) {
      setMessage({ type: "error", text: data.error || "Couldn't save the post." });
      return;
    }
    const p = data.post;
    setSelectedId(p.id);
    setStatus(p.status === "draft" ? "draft" : "published");
    setForm((f) => ({ ...f, slug: p.slug, publishedAt: toDateInput(p.publishedAt), lastModifiedAt: toDateInput(p.lastModifiedAt) }));
    setSlugTouched(true);
    setMessage({ type: "ok", text: target === "draft" ? "Draft saved." : "Published." });
    void loadPosts();
  }

  async function signOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.assign("/admin/login");
  }

  const previewHtml = useMemo(() => (preview ? renderMarkdown(form.content) : ""), [preview, form.content]);

  return (
    <div className="min-h-screen bg-[#fbf6fa] px-4 pt-[120px] pb-16 sm:px-6" style={{ fontFamily: "'Google Sans', sans-serif" }}>
      <link rel="stylesheet" href={FONTS} precedence="default" />
      <style>{`.font-heading { font-family: "Montserrat", sans-serif; }`}</style>

      <div className="mx-auto w-full max-w-[1100px]">
        <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#d95959]">Admin</span>
        <h1 className="font-heading mt-1 text-[clamp(28px,3vw,36px)] font-extrabold leading-tight text-[#591e60]">Publish Blog</h1>
        <p className="mt-1 text-[14px] text-[#6b5a70]">Fill in your blog details, then save a draft or publish.</p>

        {/* Post picker + sign out */}
        <label htmlFor="post-picker" className="mt-6 mb-1.5 block text-[13px] font-semibold text-[#591e60]">Post</label>
        <div className="flex gap-3">
          <select
            id="post-picker"
            value={selectedId}
            onChange={(e) => void selectPost(e.target.value)}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="">New post</option>
            {posts.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title} {p.status === "draft" ? "(draft)" : ""}
              </option>
            ))}
          </select>
          <button type="button" onClick={() => void signOut()} className="h-11 shrink-0 cursor-pointer rounded-lg border border-[#d8c8dc] bg-white px-5 text-[14px] font-semibold text-[#591e60]">
            Sign out
          </button>
        </div>

        <div className="mt-5 rounded-2xl bg-white p-5 shadow-[0_12px_36px_rgba(89,30,96,0.08)] sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
            <Field id="title" label="Blog Title" count={form.title.length}>
              <input
                id="title"
                value={form.title}
                placeholder="Enter blog title"
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value, slug: slugTouched ? f.slug : toSlug(e.target.value) }))}
                className={inputClass}
              />
            </Field>
            <Field id="slug" label="URL Slug" count={form.slug.length} help={form.slug ? `primetherapybilling.com/blog/${form.slug}` : undefined}>
              <input
                id="slug"
                value={form.slug}
                placeholder="therapy-billing-guide"
                onChange={(e) => { setSlugTouched(true); set("slug", toSlug(e.target.value)); }}
                className={inputClass}
              />
            </Field>

            <Field id="category" label="Category" count={form.category.length}>
              <input id="category" value={form.category} placeholder="Therapy Billing" onChange={onInput("category")} className={inputClass} />
            </Field>
            <Field id="author" label="Author" count={form.author.length}>
              <input id="author" value={form.author} placeholder="Prime Therapy Billing" onChange={onInput("author")} className={inputClass} />
            </Field>

            <Field id="authorImage" label="Author Image" help="Optional. Square photo, at least 200×200px. Shown in the author box.">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#e3d6e6] bg-[#f6eff6] text-[10px] text-[#9a8a9e]">
                  {form.authorImage ? <img src={form.authorImage} alt="" className="h-full w-full object-cover" /> : "None"}
                </span>
                <input id="authorImage" value={form.authorImage} placeholder="Upload a photo or paste its link" onChange={onInput("authorImage")} className={inputClass} />
              </div>
              <button type="button" onClick={() => authorFileRef.current?.click()} disabled={uploading === "author"} className={`${smallButton} mt-2`}>
                {uploading === "author" ? "Uploading..." : "Upload image"}
              </button>
              <input ref={authorFileRef} type="file" accept="image/*" hidden onChange={(e) => void onAuthorImage(e)} />
            </Field>
            <Field id="authorLinkedin" label="Author LinkedIn Profile URL" count={form.authorLinkedin.length} help="Optional. Shown as a LinkedIn button in the author box.">
              <input id="authorLinkedin" type="url" value={form.authorLinkedin} placeholder="https://www.linkedin.com/in/author-name/" onChange={onInput("authorLinkedin")} className={inputClass} />
            </Field>

            <Field id="authorEmail" label="Author Email" count={form.authorEmail.length} help="Optional. Shown in the author box; clicking it opens an email.">
              <input id="authorEmail" type="email" value={form.authorEmail} placeholder="author@primetherapybilling.com" onChange={onInput("authorEmail")} className={inputClass} />
            </Field>
            <Field id="authorPhone" label="Author Phone" count={form.authorPhone.length} help="Optional. Shown in the author box; tapping it calls on mobile.">
              <input id="authorPhone" type="tel" value={form.authorPhone} placeholder="+1 (346) 460-4441" onChange={onInput("authorPhone")} className={inputClass} />
            </Field>

            <div className="md:col-span-2">
              <Field id="authorBio" label="Author Bio" count={form.authorBio.length} help="Optional. A few sentences about the author, shown in the About the author box at the end of the post.">
                <textarea id="authorBio" rows={3} value={form.authorBio} placeholder="Who the author is, what they do, and why readers can trust them." onChange={onInput("authorBio")} className={`${inputClass} h-auto resize-y py-2.5 leading-relaxed`} />
              </Field>
            </div>

            <Field id="publishedAt" label="Published Date" help="Set automatically the first time you publish, if left empty.">
              <input id="publishedAt" type="date" value={form.publishedAt} onChange={onInput("publishedAt")} className={`${inputClass} cursor-pointer`} />
            </Field>
            <Field id="lastModifiedAt" label="Last Modified Date" help="Updated to today on every save, if left empty.">
              <input id="lastModifiedAt" type="date" value={form.lastModifiedAt} onChange={onInput("lastModifiedAt")} className={`${inputClass} cursor-pointer`} />
            </Field>

            <Field id="featuredImg" label="Featured Image" count={form.featuredImg.length} help="Upload an image or paste its link. Shown at the top of the post.">
              <div className="flex gap-3">
                <input id="featuredImg" value={form.featuredImg} placeholder="Upload an image or paste its link" onChange={onInput("featuredImg")} className={inputClass} />
                <button type="button" onClick={() => featuredFileRef.current?.click()} disabled={uploading === "featured"} className={`${smallButton} h-11 shrink-0`}>
                  {uploading === "featured" ? "Uploading..." : "Upload"}
                </button>
              </div>
              <input ref={featuredFileRef} type="file" accept="image/*" hidden onChange={(e) => void onFeaturedImage(e)} />
              {form.featuredImg && <img src={form.featuredImg} alt="" className="mt-2 h-24 w-auto rounded-lg border border-[#e3d6e6] object-cover" />}
            </Field>
            <Field id="imgAlt" label="Featured Image Alt Text" count={form.imgAlt.length} help="Describe the image for screen readers and search engines.">
              <input id="imgAlt" value={form.imgAlt} placeholder="Therapist reviewing a billing report" onChange={onInput("imgAlt")} className={inputClass} />
            </Field>

            <Field id="metaTitle" label="Meta Title" count={form.metaTitle.length} help="Shown as the title in Google results. Aim for 50–60 characters.">
              <input id="metaTitle" value={form.metaTitle} placeholder="Enter SEO meta title" onChange={onInput("metaTitle")} className={inputClass} />
            </Field>
            <Field id="metaDescription" label="Meta Description" count={form.metaDescription.length} help="Shown under the title in Google results. Aim for 140–160 characters.">
              <textarea id="metaDescription" rows={2} value={form.metaDescription} placeholder="Enter SEO meta description" onChange={onInput("metaDescription")} className={`${inputClass} h-auto resize-y py-2.5`} />
            </Field>
          </div>

          {/* Content */}
          <div className="mt-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <label htmlFor="content" className="text-[13px] font-semibold text-[#591e60]">Blog Content</label>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => inlineFileRef.current?.click()} disabled={uploading === "inline" || preview} className={smallButton}>
                  {uploading === "inline" ? "Uploading..." : "+ Insert Image"}
                </button>
                <button type="button" onClick={() => setLinkPanel((v) => !v)} disabled={preview} className={smallButton}>Insert Link</button>
                <button type="button" onClick={() => setPreview((v) => !v)} className={smallButton}>{preview ? "Edit" : "Preview"}</button>
              </div>
            </div>
            <p className="mt-1 text-[12px] leading-snug text-[#7a6a7e]">
              Paste from Google Docs or Word to keep headings, lists, tables, links and bold (they are converted to Markdown). Separate paragraphs with a blank line. Put the cursor where an image should go and click Insert Image; it is placed after that paragraph.
            </p>
            <input ref={inlineFileRef} type="file" accept="image/*" hidden onChange={(e) => void onInlineImage(e)} />

            {linkPanel && !preview && (
              <div className="mt-3 flex flex-col gap-2 rounded-lg border border-[#e3d6e6] bg-[#fbf6fa] p-3 sm:flex-row">
                <input aria-label="Link text" value={link.text} placeholder="Link text (or select text first)" onChange={(e) => setLink((l) => ({ ...l, text: e.target.value }))} className={inputClass} />
                <input aria-label="Link URL" value={link.url} placeholder="https://… or /pricing" onChange={(e) => setLink((l) => ({ ...l, url: e.target.value }))} className={inputClass} />
                <button type="button" onClick={insertLink} className="h-11 shrink-0 cursor-pointer rounded-lg bg-[#591e60] px-5 text-[14px] font-semibold text-white">Insert</button>
              </div>
            )}

            {preview ? (
              <div className="blog-content mt-3 min-h-[420px] rounded-lg border border-[#e3d6e6] bg-white p-5" dangerouslySetInnerHTML={{ __html: previewHtml || "<p><em>Nothing to preview yet.</em></p>" }} />
            ) : (
              <textarea
                id="content"
                ref={contentRef}
                value={form.content}
                onChange={onInput("content")}
                onPaste={onPaste}
                placeholder={"Write your complete blog here.\n\nSeparate paragraphs with a blank line."}
                className={`${inputClass} mt-3 h-auto min-h-[420px] resize-y py-3 font-mono text-[13px] leading-relaxed`}
              />
            )}
            <div className="mt-1 text-right text-[11px] text-[#9a8a9e]">{form.content.length} characters</div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col-reverse gap-3 border-t border-[#f0e6f2] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-h-[20px] text-[13px]" role="status">
              {message && <span className={message.type === "ok" ? "font-medium text-[#2e7d4f]" : "font-medium text-[#c0392b]"}>{message.text}</span>}
              {!message && selectedId && (
                <span className="text-[#7a6a7e]">
                  Status: <strong className="text-[#591e60]">{status === "draft" ? "Draft" : "Published"}</strong>
                  {status === "published" && form.slug && (
                    <> · <a href={`/blog/${form.slug}`} target="_blank" rel="noreferrer" className="font-semibold text-[#d95959] underline underline-offset-2">View post</a></>
                  )}
                </span>
              )}
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => void save("draft")} disabled={!!saving} className="h-11 cursor-pointer rounded-lg border border-[#591e60] bg-white px-5 text-[14px] font-semibold text-[#591e60] disabled:cursor-wait disabled:opacity-60">
                {saving === "draft" ? "Saving..." : status === "published" && selectedId ? "Move to draft" : "Save draft"}
              </button>
              <button type="button" onClick={() => void save("published")} disabled={!!saving} className="h-11 cursor-pointer rounded-lg bg-[#d95959] px-6 text-[14px] font-semibold text-white disabled:cursor-wait disabled:opacity-60">
                {saving === "published" ? "Publishing..." : status === "published" && selectedId ? "Update post" : "Publish"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
