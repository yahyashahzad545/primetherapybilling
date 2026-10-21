import Link from "next/link";
import type { ReactNode } from "react";

// ── Card action ─────────────────────────────────────────────────
// The button at the foot of a card. With `href` it is a link to the related page on the site;
// without one it opens the site-wide lead pop-up (components/LeadPopup.tsx), headed with the card's
// title. Either way it looks the same: pass the button's own classes as `className`.
export default function CardAction({
  href,
  popupHeading,
  popupDescription,
  popupSource,
  className,
  children,
}: {
  href?: string;
  popupHeading: string;
  popupDescription?: string;
  popupSource?: string;
  className: string;
  children: ReactNode;
}) {
  if (href) {
    // Links get the buttons' hover circle through .btn-hover. A btn-plain (text-only) button has no
    // circle, so its link just turns coral on hover, as btn-plain buttons do
    const linkClass = className.includes("btn-plain")
      ? `${className.replace("btn-plain", "")} hover:text-[#d95959]`
      : `btn-hover ${className}`;
    return (
      <Link href={href} className={linkClass}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      data-lead-popup
      data-popup-heading={popupHeading}
      data-popup-description={popupDescription}
      data-popup-source={popupSource}
      className={className}
    >
      {children}
    </button>
  );
}
