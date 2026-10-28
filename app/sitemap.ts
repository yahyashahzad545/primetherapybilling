import { MetadataRoute } from 'next'
import prisma from '@/libs/prisma'
import { HEADER_SPECIALTY_PAGES } from '@/components/header-inquiry/content'
import { SITE } from '@/libs/seo'

// Every public, indexable page, by its canonical URL. Pages kept out of search results
// (thank-you, states, testing, admin) are left out on purpose.
export const revalidate = 3600

type Entry = MetadataRoute.Sitemap[number]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE.url
  const currentDate = new Date()
  const page = (path: string, changeFrequency: Entry['changeFrequency'], priority: number): Entry => ({
    url: path === '/' ? baseUrl : `${baseUrl}${path}`,
    lastModified: currentDate,
    changeFrequency,
    priority,
  })

  // Published blog posts; the rest of the sitemap still works if the database can't be reached
  let posts: Entry[] = []
  try {
    const blogs = await prisma.blog.findMany({
      where: { status: { not: 'draft' } },
      select: { slug: true, createdAt: true, publishedAt: true, lastModifiedAt: true },
    })
    posts = blogs.map((blog) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: blog.lastModifiedAt ?? blog.publishedAt ?? blog.createdAt,
      changeFrequency: 'monthly',
      priority: 0.7,
    }))
  } catch {
    posts = []
  }

  return [
    // MAIN PAGES
    page('/', 'weekly', 1),
    page('/pricing', 'monthly', 0.9),
    page('/about-us', 'monthly', 0.8),
    page('/contact-us', 'monthly', 0.8),
    page('/blog', 'weekly', 0.7),

    // SERVICES
    page('/services/medical-billing-therapists', 'monthly', 0.9),
    page('/aba-therapy-billing', 'monthly', 0.9),
    page('/insurance-credentialing-for-therapists', 'monthly', 0.9),
    page('/mental-health-billing-services', 'monthly', 0.9),
    page('/physical-therapy-billing', 'monthly', 0.9),
    page('/services/claim-submission', 'monthly', 0.8),

    // SPECIALTIES
    ...HEADER_SPECIALTY_PAGES.map(({ slug }) => page(`/specialties/${slug}`, 'monthly', 0.7)),

    // BLOG POSTS
    ...posts,

    // LEGAL
    page('/privacy-policy', 'yearly', 0.3),
    page('/terms-of-service', 'yearly', 0.3),
  ]
}
