type ReviewLicense =
  | "LCSW"
  | "LPC"
  | "LMFT"
  | "LMHC"
  | "Psychologist"
  | "PMHNP";

type VerifiedReview = {
  id: string;
  quote: string;
  firstName: string;
  credential: string;
  licenseType: ReviewLicense;
  state: string;
  verified: boolean;
  source: "google";
  sourceUrl: string;
};

type ClientFeedbackProps = {
  /** Connect these props to the CMS review toggle and verified review entries. */
  cmsEnabled?: boolean;
  verifiedReviews?: VerifiedReview[];
  googleReviewUrl?: string;
};

const DIVERSITY_GROUPS: ReviewLicense[][] = [
  ["LCSW", "LPC"],
  ["LMFT", "LMHC"],
  ["Psychologist", "PMHNP"],
];

const getWordCount = (quote: string) => quote.trim().split(/\s+/).filter(Boolean).length;

const isPublishableReview = (review: VerifiedReview) =>
  review.verified &&
  review.source === "google" &&
  Boolean(review.sourceUrl) &&
  getWordCount(review.quote) >= 25 &&
  getWordCount(review.quote) <= 35 &&
  /\d/.test(review.quote);

// SECTION 9: CLIENT FEEDBACK
export default function ClientFeedback({
  cmsEnabled = false,
  verifiedReviews = [],
  googleReviewUrl,
}: ClientFeedbackProps) {
  const eligibleReviews = verifiedReviews.filter(isPublishableReview);
  const selectedReviews = DIVERSITY_GROUPS.map((licenses) =>
    eligibleReviews.find((review) => licenses.includes(review.licenseType))
  );
  const reviewsAreReady = cmsEnabled && selectedReviews.every(Boolean);

  return (
    <section className="w-full bg-[#fbf6fa] overflow-hidden relative">
      <div className="relative w-full max-w-[1320px] mx-auto overflow-hidden rounded-[24px] bg-[#591e60] py-[60px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <svg aria-hidden="true" className="pointer-events-none absolute -left-[42px] top-[25%] h-[210px] w-[84px] -translate-y-1/2" viewBox="0 0 60 150" fill="none">
          <circle cx="22" cy="28" r="20" stroke="#d95959" strokeWidth="2.5" opacity=".7" />
          <circle cx="48" cy="62" r="5" fill="#d95959" opacity=".85" />
          <circle cx="26" cy="108" r="14" stroke="#c79bcc" strokeWidth="2" opacity=".6" />
        </svg>
        <svg aria-hidden="true" className="pointer-events-none absolute -left-[42px] top-[75%] h-[210px] w-[84px] -translate-y-1/2" viewBox="0 0 60 150" fill="none">
          <circle cx="22" cy="28" r="20" stroke="#d95959" strokeWidth="2.5" opacity=".7" />
          <circle cx="48" cy="62" r="5" fill="#d95959" opacity=".85" />
          <circle cx="26" cy="108" r="14" stroke="#c79bcc" strokeWidth="2" opacity=".6" />
        </svg>
        <svg aria-hidden="true" className="pointer-events-none absolute -right-[42px] top-[25%] h-[210px] w-[84px] -translate-y-1/2" viewBox="0 0 60 150" fill="none">
          <circle cx="34" cy="30" r="14" stroke="#c79bcc" strokeWidth="2" opacity=".6" />
          <circle cx="13" cy="14" r="4" fill="#c79bcc" opacity=".8" />
          <circle cx="38" cy="120" r="20" stroke="#d95959" strokeWidth="2.5" opacity=".7" />
        </svg>
        <svg aria-hidden="true" className="pointer-events-none absolute -right-[42px] top-[75%] h-[210px] w-[84px] -translate-y-1/2" viewBox="0 0 60 150" fill="none">
          <circle cx="34" cy="30" r="14" stroke="#c79bcc" strokeWidth="2" opacity=".6" />
          <circle cx="13" cy="14" r="4" fill="#c79bcc" opacity=".8" />
          <circle cx="38" cy="120" r="20" stroke="#d95959" strokeWidth="2.5" opacity=".7" />
        </svg>
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14 max-w-4xl mx-auto">
          <span className="font-heading bg-white text-[#591e60] border border-white/30 px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
            Client Feedback
          </span>
          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight mt-4 text-white">
            What Mental Health Practices Say{" "}
            <span className="text-[#d95959]">About Prime Therapy</span> Billing
          </h2>
        </div>

        {reviewsAreReady ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-[1180px] mx-auto">
            {selectedReviews.map((review) =>
              review ? (
                <article
                  key={review.id}
                  className="rounded-[24px] border border-white/15 bg-white/5 p-6 sm:p-8 text-white shadow-lg"
                >
                  <blockquote className="text-[16px] leading-[1.7]">
                    “{review.quote}”
                  </blockquote>
                  <p className="mt-6 text-[14px] font-semibold text-white/80">
                    {review.firstName}, {review.credential} · {review.licenseType}, {review.state}
                  </p>
                </article>
              ) : null
            )}
          </div>
        ) : (
          <div className="mx-auto max-w-[760px] rounded-[24px] border border-white/15 bg-white/5 px-6 py-8 text-center text-white/80">
            <p className="text-[16px] leading-relaxed">
              Verified client feedback will appear here when it is ready to share.
            </p>
          </div>
        )}

        {googleReviewUrl && (
          <div className="mt-8 text-center">
            <a
              href={googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-5 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              Read or leave a Google review
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
