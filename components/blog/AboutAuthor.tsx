import Link from "next/link";
import type { Blog } from "@prisma/client";

// "About the author" box at the end of a blog post: a purple header band, the author's photo (or initials),
// name, bio, and LinkedIn / email / phone buttons for whichever of those the post has.
// Preceded by an "All articles" link back to /blog.
export default function AboutAuthor({ blog }: { blog: Blog }) {
  const name = blog.author || "Prime Therapy Billing";
  const initials = name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const hasLinks = blog.authorLinkedin || blog.authorEmail || blog.authorPhone;

  return (
    <div className="mt-12 border-t border-[#eadfec] pt-6">
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#591e60] hover:text-[#d95959]">
        <span aria-hidden="true">←</span> All articles
      </Link>

      <section aria-labelledby="about-author-heading" className="mt-6 overflow-hidden rounded-2xl border border-[#eadfec] bg-white shadow-[0_8px_24px_rgba(89,30,96,0.08)]">
        <div className="flex items-center gap-2 bg-[#591e60] px-5 py-2.5">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#d95959]" />
          <h2 id="about-author-heading" className="text-[12px] font-bold uppercase tracking-[0.12em] text-white">About the author</h2>
        </div>

        <div className="flex flex-col gap-5 p-5 sm:flex-row sm:p-6">
          {blog.authorImage ? (
            <img src={blog.authorImage} alt={name} width={80} height={80} loading="lazy" decoding="async" className="h-20 w-20 shrink-0 rounded-full object-cover ring-4 ring-[#f6eff6]" />
          ) : (
            <span aria-hidden="true" className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#591e60] text-[22px] font-bold text-white ring-4 ring-[#f6eff6]">
              {initials}
            </span>
          )}

          <div className="min-w-0">
            <p className="text-[20px] font-extrabold leading-tight text-[#591e60]">{name}</p>
            {blog.authorBio && <p className="mt-2 whitespace-pre-line text-[15px] leading-relaxed text-[#4a3b4e]">{blog.authorBio}</p>}

            {hasLinks && (
              <div className="mt-4 flex flex-wrap gap-2.5">
                {blog.authorLinkedin && (
                  <a href={blog.authorLinkedin} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#591e60] px-3.5 text-[13px] font-semibold text-[#591e60] hover:bg-[#591e60] hover:text-white">
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.86-3.06-1.87 0-2.15 1.46-2.15 2.96V21H9z" /></svg>
                    LinkedIn
                  </a>
                )}
                {blog.authorEmail && (
                  <a href={`mailto:${blog.authorEmail}`} className="inline-flex h-9 max-w-full items-center gap-2 rounded-lg border border-[#591e60] px-3.5 text-[13px] font-semibold text-[#591e60] hover:bg-[#591e60] hover:text-white">
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                    <span className="truncate">{blog.authorEmail}</span>
                  </a>
                )}
                {blog.authorPhone && (
                  <a href={`tel:${blog.authorPhone.replace(/[^\d+]/g, "")}`} className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#591e60] px-3.5 text-[13px] font-semibold text-[#591e60] hover:bg-[#591e60] hover:text-white">
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>
                    {blog.authorPhone}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
