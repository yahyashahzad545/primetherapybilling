import nodemailer from "nodemailer";
import { randomUUID } from "node:crypto";
import { after, NextResponse } from "next/server";
import { BUSINESS_PHONE } from "@/config/contact";

const ATTRIBUTION_COOKIE = "ptb_lead_attribution";

// One pooled SMTP connection reused across requests, so each lead skips the connect and login handshake
const transporter = nodemailer.createTransport({
  pool: true,
  host: "smtp.hostinger.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getLeadAttribution(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  const cookieValue = cookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${ATTRIBUTION_COOKIE}=`))
    ?.slice(ATTRIBUTION_COOKIE.length + 1);

  let saved: Record<string, string> = {};
  if (cookieValue) {
    try {
      const parsed = JSON.parse(decodeURIComponent(cookieValue));
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        saved = parsed;
      }
    } catch {
      saved = {};
    }
  }

  const refererHeader = req.headers.get("referer") || "";
  let refererUrl: URL | undefined;
  try {
    if (refererHeader) refererUrl = new URL(refererHeader);
  } catch {
    refererUrl = undefined;
  }

  const sourcePage = refererUrl?.pathname || "/";
  const utm = (key: string, savedValue: string | undefined) =>
    savedValue || refererUrl?.searchParams.get(key) || "Not available";

  return {
    sourcePage,
    landingPage: saved.landingPage || sourcePage,
    referrer: saved.referrer || "Direct / Not available",
    utmSource: utm("utm_source", saved.utmSource),
    utmMedium: utm("utm_medium", saved.utmMedium),
    utmCampaign: utm("utm_campaign", saved.utmCampaign),
    utmTerm: utm("utm_term", saved.utmTerm),
    utmContent: utm("utm_content", saved.utmContent),
  };
}

// ✅ FORMAT FUNCTION (IMPORTANT FIX)
function formatUSPhone(phone: string) {
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }

  if (cleaned.length === 11 && cleaned.startsWith("1")) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }

  return phone; // fallback
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const attribution = getLeadAttribution(req);
    const leadId = randomUUID();

    const {
      name,
      email,
      practice,
      specialty,
      phone,
      message,
      source,
      agreeTerms,
      meetingType,
      date,
      time,
    } = body;
    const isBooking = source === "Book Slot Section";
    const additionalInfo = Object.fromEntries(
      Object.entries(body).filter(
        ([key, value]) =>
          ![
            "name",
            "email",
            "practice",
            "phone",
            "message",
            "source",
            "sourcePage",
            "landingPage",
            "referrer",
            "utmSource",
            "utmMedium",
            "utmCampaign",
            "utmTerm",
            "utmContent",
          ].includes(key) &&
          value !== undefined &&
          value !== null &&
          value !== ""
      )
    );

    // ✅ validation
    if (
      !name ||
      !email ||
      (isBooking && (!meetingType || !date || !time)) ||
      (!isBooking &&
        (!practice || !message || (!phone && source !== "Audit Contact Page" && source !== "Homepage Final CTA")))
    ) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // ✅ USA phone validation
    const usPhoneRegex =
      /^(\+1\s?)?(\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}$/;

    if (phone && !usPhoneRegex.test(phone)) {
      return NextResponse.json(
        { error: "Invalid US phone number" },
        { status: 400 }
      );
    }

    // ✅ send email after the response, so the visitor isn't kept waiting on the mail server
    after(async () => {
      try {
        await transporter.sendMail({
      from: `"Website Lead" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,

      // ✅ DYNAMIC SUBJECT (FIXED ISSUE)
      subject: `New Lead - ${source || "Website"}`,

      html: `
        <h2>New Lead Received</h2>
        <p><b>Name:</b><br/>${escapeHtml(name)}</p>
        <p><b>Email:</b><br/>${escapeHtml(email)}</p>
        <p><b>Practice:</b><br/>${escapeHtml(practice || "Not provided")}</p>
        <p><b>Specialty:</b><br/>${escapeHtml(specialty || "Not provided")}</p>
        <p><b>Phone:</b><br/>${escapeHtml(phone ? formatUSPhone(phone) : "Not provided")}</p>
        <p><b>Message:</b><br/><span style="white-space:pre-wrap">${escapeHtml(message)}</span></p>
        <p><b>Agreed to communications:</b><br/>${agreeTerms ? "Yes" : "No"}</p>
        <p><b>Meeting type:</b><br/>${escapeHtml(meetingType || "Not provided")}</p>
        <p><b>Requested date:</b><br/>${escapeHtml(date || "Not provided")}</p>
        <p><b>Requested time:</b><br/>${escapeHtml(time ? `${time} EST` : "Not provided")}</p>

        <hr/>
        <p><b>Form:</b><br/>${escapeHtml(source || "Website")}</p>
        <p><b>Source Page:</b><br/>${escapeHtml(attribution.sourcePage)}</p>
        <p><b>Landing Page:</b><br/>${escapeHtml(attribution.landingPage)}</p>
        <p><b>Referrer:</b><br/>${escapeHtml(attribution.referrer)}</p>
        <p><b>UTM Source:</b><br/>${escapeHtml(attribution.utmSource)}</p>
        <p><b>UTM Medium:</b><br/>${escapeHtml(attribution.utmMedium)}</p>
        <p><b>UTM Campaign:</b><br/>${escapeHtml(attribution.utmCampaign)}</p>
        <p><b>UTM Term:</b><br/>${escapeHtml(attribution.utmTerm)}</p>
        <p><b>UTM Content:</b><br/>${escapeHtml(attribution.utmContent)}</p>
        <p><b>Additional Information:</b></p>
        <pre style="background:#f6f7fb;padding:12px;border-radius:6px;white-space:pre-wrap">${escapeHtml(
          Object.keys(additionalInfo).length
            ? JSON.stringify(additionalInfo, null, 2)
            : "Not available"
        )}</pre>
        <hr/>
        <p><b>Lead ID:</b><br/>${leadId}</p>
        <p><b>Prime Therapy Billing phone:</b> <a href="${BUSINESS_PHONE.href}">${BUSINESS_PHONE.display}</a></p>
      `,

      replyTo: email,
        });
      } catch (error) {
        console.log("EMAIL ERROR:", { leadId, source, name, email, error });
      }
    });

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.log("EMAIL ERROR:", error);

    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
