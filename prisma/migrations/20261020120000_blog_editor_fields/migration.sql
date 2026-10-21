-- Blog editor: author box, dates and draft/published status.
-- Adds optional columns only; nothing existing is changed or removed.
-- IF NOT EXISTS makes it safe to run more than once.
ALTER TABLE "Blog" ADD COLUMN IF NOT EXISTS "authorImage" TEXT;
ALTER TABLE "Blog" ADD COLUMN IF NOT EXISTS "authorLinkedin" TEXT;
ALTER TABLE "Blog" ADD COLUMN IF NOT EXISTS "authorEmail" TEXT;
ALTER TABLE "Blog" ADD COLUMN IF NOT EXISTS "authorPhone" TEXT;
ALTER TABLE "Blog" ADD COLUMN IF NOT EXISTS "publishedAt" TIMESTAMP(3);
ALTER TABLE "Blog" ADD COLUMN IF NOT EXISTS "lastModifiedAt" TIMESTAMP(3);
ALTER TABLE "Blog" ADD COLUMN IF NOT EXISTS "status" TEXT NOT NULL DEFAULT 'published';
