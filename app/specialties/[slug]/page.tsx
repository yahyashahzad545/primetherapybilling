import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InquiryLandingPage from "@/components/header-inquiry/InquiryLandingPage";
import { HEADER_SPECIALTY_PAGES, type HeaderInquiryPageContent } from "@/components/header-inquiry/content";
import { PageSchema, pageMetadata, serviceSchema } from "@/libs/seo";

export function generateStaticParams() {
  return HEADER_SPECIALTY_PAGES.map(({ slug }) => ({ slug }));
}

// Search descriptions are cut off around 160 characters, so whole sentences are kept up to that length
function fitDescription(text: string, max = 160) {
  let out = "";
  for (const sentence of text.match(/[^.!?]+[.!?]+/g) ?? [text]) {
    if ((out + sentence).trim().length > max) break;
    out += sentence;
  }
  return out.trim() || `${text.slice(0, max - 3).replace(/\s+\S*$/, "")}...`;
}

// Title, description and URL come from the page's own heading and description in content.ts; the brand
// is added to the title when it still fits in the ~60 characters search results show
const pageDetails = (page: HeaderInquiryPageContent) => ({
  title: `${page.heading} | Prime Therapy Billing`.length <= 60 ? `${page.heading} | Prime Therapy Billing` : page.heading,
  description: fitDescription(page.description),
  path: `/specialties/${page.slug}`,
});

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = HEADER_SPECIALTY_PAGES.find((item) => item.slug === slug);
  return page ? pageMetadata(pageDetails(page)) : {};
}

export default async function SpecialtyInquiryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = HEADER_SPECIALTY_PAGES.find((item) => item.slug === slug);
  if (!page) notFound();
  const details = pageDetails(page);

  return (
    <>
      <PageSchema
        {...details}
        crumbs={[{ name: "Home", path: "/" }, { name: page.heading, path: details.path }]}
        extra={[serviceSchema({ name: page.heading, description: page.description, path: details.path, serviceType: page.eyebrow })]}
      />
      <InquiryLandingPage page={page} />
    </>
  );
}
