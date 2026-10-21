import type { Blog } from "@prisma/client";

// Author box at the top of a blog post: photo, name, and any of LinkedIn / email / phone that the post
// has, plus the published and last-updated dates. Everything except the name is optional.
const fmt = (d: Date) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

export default function AuthorBox({ blog }: { blog: Blog }) {
  const name = blog.author || "Prime Therapy Billing";
  const published = blog.publishedAt ?? blog.createdAt;
  const updated = blog.lastModifiedAt;
  const showUpdated = updated && fmt(updated) !== fmt(published);
  const initials = name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-[#eadfec] bg-[#fbf6fa] p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        {blog.authorImage ? (
          <img src={blog.authorImage} alt={name} width={56} height={56} loading="lazy" decoding="async" className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-white" />
        ) : (
          <span aria-hidden="true" className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#591e60] text-[16px] font-bold text-white">
            {initials}
          </span>
        )}
        <div className="min-w-0">
          <p className="text-[15px] font-bold text-[#591e60]">{name}</p>
          <p className="text-[13px] text-[#6b5a70]">
            Published <time dateTime={new Date(published).toISOString()}>{fmt(published)}</time>
            {showUpdated && (
              <> · Updated <time dateTime={new Date(updated).toISOString()}>{fmt(updated)}</time></>
            )}
          </p>
        </div>
      </div>

      {(blog.authorLinkedin || blog.authorEmail || blog.authorPhone) && (
        <div className="flex flex-wrap gap-2">
          {blog.authorLinkedin && (
            <a href={blog.authorLinkedin} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#591e60] px-3.5 text-[13px] font-semibold text-white">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.86-3.06-1.87 0-2.15 1.46-2.15 2.96V21H9z" /></svg>
              LinkedIn
            </a>
          )}
          {blog.authorEmail && (
            <a href={`mailto:${blog.authorEmail}`} className="inline-flex h-9 items-center rounded-full border border-[#591e60]/30 bg-white px-3.5 text-[13px] font-semibold text-[#591e60]">
              Email
            </a>
          )}
          {blog.authorPhone && (
            <a href={`tel:${blog.authorPhone.replace(/[^\d+]/g, "")}`} className="inline-flex h-9 items-center rounded-full border border-[#591e60]/30 bg-white px-3.5 text-[13px] font-semibold text-[#591e60]">
              Call
            </a>
          )}
        </div>
      )}
    </div>
  );
}
