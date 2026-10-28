import type { Metadata } from "next";
import type { ReactNode } from "react";
import { isValidElement } from "react";

// ── Site-wide SEO ───────────────────────────────────────────────
// One place for the site's details, each page's metadata (title, description, canonical URL,
// Open Graph, Twitter) and its JSON-LD structured data. Pages reference the organization and
// website defined in app/layout.tsx through their @id, so each fact is stated once.

export const SITE = {
  name: "Prime Therapy Billing",
  url: "https://primetherapybilling.com",
  phone: "+1-346-460-4441",
  email: "info@primetherapybilling.com",
  logo: "https://primetherapybilling.com/logo.png",
  description:
    "Therapy-only medical billing, credentialing, and revenue cycle management for PT, OT, SLP, ABA, and mental health practices nationwide.",
  sameAs: [
    "https://www.linkedin.com/company/prime-therapy-billing",
    "https://www.facebook.com/primetherapybilling",
    "https://www.instagram.com/primetherapybilling/",
  ],
} as const;

export const ORGANIZATION_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;

export const absoluteUrl = (path: string) => (path === "/" ? SITE.url : `${SITE.url}${path}`);

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  // Pages kept out of search results (thank-you, internal pages)
  noindex?: boolean;
  type?: "website" | "article";
  image?: string;
};

// Full metadata for a page; `title` is used exactly as written (no template added)
// The share image from app/opengraph-image.tsx, used unless a page has its own (e.g. a blog post)
const DEFAULT_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Prime Therapy Billing: therapy-only billing for PT, OT, SLP, ABA, and mental health practices",
};

export function pageMetadata({ title, description, path, noindex = false, type = "website", image }: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const images = image ? [{ url: image }] : [DEFAULT_IMAGE];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { type, url, title, description, siteName: SITE.name, locale: "en_US", images },
    twitter: { card: "summary_large_image", title, description, images: images.map((i) => i.url) },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
  };
}

// ── JSON-LD ─────────────────────────────────────────────────────

// Renders structured data; "<" is escaped so content can never close the script tag early
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE.name,
    url: SITE.url,
    logo: { "@type": "ImageObject", url: SITE.logo },
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone,
    areaServed: { "@type": "Country", name: "United States" },
    // As shown in the footer
    address: {
      "@type": "PostalAddress",
      streetAddress: "27120 Fulshear Bend Dr Ste 900 116",
      addressLocality: "Fulshear",
      addressRegion: "TX",
      postalCode: "77441",
      addressCountry: "US",
    },
    sameAs: SITE.sameAs,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: SITE.phone,
      email: SITE.email,
      areaServed: "US",
      availableLanguage: "English",
    },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE.name,
    url: SITE.url,
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "en-US",
  };
}

type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

type PageSchemaInput = {
  title: string;
  description: string;
  path: string;
  // WebPage, AboutPage, ContactPage, CollectionPage, ...
  type?: string;
  crumbs?: Crumb[];
  // Extra nodes for this page (Service, FAQPage, BlogPosting, ...)
  extra?: Record<string, unknown>[];
};

// A page's structured data as one @graph: the page itself, its breadcrumb trail and any extra nodes
export function PageSchema({ title, description, path, type = "WebPage", crumbs, extra = [] }: PageSchemaInput) {
  const url = absoluteUrl(path);
  const trail = crumbs ?? (path === "/" ? [{ name: "Home", path: "/" }] : [{ name: "Home", path: "/" }, { name: title.split(" | ")[0], path }]);
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": type,
            "@id": `${url}#webpage`,
            url,
            name: title,
            description,
            isPartOf: { "@id": WEBSITE_ID },
            about: { "@id": ORGANIZATION_ID },
            breadcrumb: { "@id": `${url}#breadcrumb` },
            inLanguage: "en-US",
          },
          { ...breadcrumbSchema(trail), "@id": `${url}#breadcrumb` },
          ...extra,
        ],
      }}
    />
  );
}

export function serviceSchema({ name, description, path, serviceType }: { name: string; description: string; path: string; serviceType: string }) {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name,
    description,
    serviceType,
    url: absoluteUrl(path),
    provider: { "@id": ORGANIZATION_ID },
    areaServed: { "@type": "Country", name: "United States" },
    audience: { "@type": "BusinessAudience", audienceType: "Therapy practices" },
  };
}

// ── FAQ ─────────────────────────────────────────────────────────

// Plain text of a React node (answers can hold links and emphasis), for structured data
export function nodeText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    const text = nodeText(node.props.children);
    return node.type === "li" || node.type === "p" ? ` ${text} ` : text;
  }
  return "";
}

// FAQPage structured data built from the same questions and answers the FAQ section shows
export function FaqSchema({ items }: { items: { question: ReactNode; answer: ReactNode }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map(({ question, answer }) => ({
          "@type": "Question",
          name: nodeText(question).replace(/\s+/g, " ").trim(),
          acceptedAnswer: { "@type": "Answer", text: nodeText(answer).replace(/\s+/g, " ").trim() },
        })),
      }}
    />
  );
}
