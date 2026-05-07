import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://primetherapybilling.com'
  const currentDate = new Date()

  return [
    // MAIN PAGES

    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },

    {
      url: `${baseUrl}/about-us`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },

    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },

    {
      url: `${baseUrl}/specialties`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },

    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.95,
    },

    {
      url: `${baseUrl}/contact-us`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },

    // SERVICES

    {
      url: `${baseUrl}/services/medical-billing-services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    {
      url: `${baseUrl}/services/revenue-cycle-management`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    {
      url: `${baseUrl}/services/credentialing-contracting`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    {
      url: `${baseUrl}/services/prior-authorization-services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    {
      url: `${baseUrl}/services/denial-management-services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    {
      url: `${baseUrl}/services/ar-follow-up-services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    {
      url: `${baseUrl}/services/payment-posting-reconciliation`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },

    {
      url: `${baseUrl}/services/eligibility-verification`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },

    {
      url: `${baseUrl}/services/medical-coding`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },

    // SPECIALTIES

    {
      url: `${baseUrl}/specialties/behavioral-health`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },

    {
      url: `${baseUrl}/specialties/mental-health-counseling`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },

    {
      url: `${baseUrl}/specialties/physical-therapy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },

    {
      url: `${baseUrl}/specialties/occupational-therapy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },

    {
      url: `${baseUrl}/specialties/speech-therapy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },

    {
      url: `${baseUrl}/specialties/applied-behavior-analysis`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },

    {
      url: `${baseUrl}/specialties/psychiatry`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },

    {
      url: `${baseUrl}/specialties/psychology`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },

    {
      url: `${baseUrl}/specialties/marriage-family-therapy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    {
      url: `${baseUrl}/specialties/social-work`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    {
      url: `${baseUrl}/specialties/addiction-counseling`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    {
      url: `${baseUrl}/specialties/neuropsychology`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // LEGAL

    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },

    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}