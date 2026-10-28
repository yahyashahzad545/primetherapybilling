import InquiryLandingPage from "@/components/header-inquiry/InquiryLandingPage";
import { CLAIM_SUBMISSION_PAGE } from "@/components/header-inquiry/content";
import { PageSchema, pageMetadata, serviceSchema } from "@/libs/seo";

const PAGE = {
  title: "Therapy Claim Submission Services | Prime Therapy Billing",
  description:
    "Clean therapy claims out within one business day. We check every claim before submission, track payer responses, and follow up on denials and unpaid balances.",
  path: "/services/claim-submission",
};

export const metadata = pageMetadata(PAGE);

export default function ClaimSubmissionPage() {
  return (
    <>
      <PageSchema
        {...PAGE}
        crumbs={[{ name: "Home", path: "/" }, { name: "Claim Submission", path: PAGE.path }]}
        extra={[serviceSchema({ name: "Claim Submission Services", description: PAGE.description, path: PAGE.path, serviceType: "Medical claim submission" })]}
      />
      <InquiryLandingPage page={CLAIM_SUBMISSION_PAGE} />
    </>
  );
}
