import { notFound } from "next/navigation";
import InquiryLandingPage from "@/components/header-inquiry/InquiryLandingPage";
import { HEADER_SPECIALTY_PAGES } from "@/components/header-inquiry/content";

export function generateStaticParams() {
  return HEADER_SPECIALTY_PAGES.map(({ slug }) => ({ slug }));
}

export default async function SpecialtyInquiryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = HEADER_SPECIALTY_PAGES.find((item) => item.slug === slug);
  if (!page) notFound();

  return <InquiryLandingPage page={page} />;
}
