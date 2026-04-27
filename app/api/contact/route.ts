import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

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

    const { name, email, practice, phone, message, source } = body;

    // ✅ validation
    if (!name || !email || !practice || !phone || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // ✅ USA phone validation
    const usPhoneRegex =
      /^(\+1\s?)?(\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}$/;

    if (!usPhoneRegex.test(phone)) {
      return NextResponse.json(
        { error: "Invalid US phone number" },
        { status: 400 }
      );
    }

    // ✅ transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ send email
    await transporter.sendMail({
      from: `"Website Lead" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,

      // ✅ DYNAMIC SUBJECT (FIXED ISSUE)
      subject: `New Lead - ${source || "Website"}`,

      html: `
        <h2>New Lead Received</h2>

        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Practice:</b> ${practice}</p>
        <p><b>Phone:</b> ${formatUSPhone(phone)}</p>
        <p><b>Message:</b> ${message}</p>

        <hr/>
        <p><b>Source:</b> ${source || "Website"}</p>
      `,

      replyTo: email,
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