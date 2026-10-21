-- Blog: author bio for the "About the author" box. Optional column only; nothing existing changes.
ALTER TABLE "Blog" ADD COLUMN IF NOT EXISTS "authorBio" TEXT;
